const {z} = require('zod');
const {sequelize} = require('../utils/db');
const {OrderSchema: Order} = require('../models/orders-schema');
const {OrderItemSchema: OrderItem} = require('../models/order-itmes-schema');
const {CartSchema: Cart, CartItemSchema: CartItem} = require('../models/cart-schema');
const {ProductSchema: Product} = require('../models/products-schema');

const orderSchema = z.object({
    shippingAddress: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zipCode: z.string()
    }),
    notes: z.string().optional(),
    currency: z.string().default('USD'),
});
const cancelOrderSchema = z.object({
  cancelReason: z.string().min(1, 'Cancel reason is required'),
});
async function getMyOrders (req, res) {
    const userId = req.user.id;
    try {
        const orders = await Order.findAll({where: {userId}});
        if(!orders) {
            return res.status(404).json({success: false, message: 'Orders not found'});
        }
        res.status(200).json({success: true, message: 'Orders found', data: orders});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
async function getOneOrder (req, res) {
    const userId = req.user.id;
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId);
        const orderItems = await OrderItem.findAll({where: {orderId}});
        if(!order) {
            return res.status(404).json({success: false, message: 'Order not found'});
        }
        if(order.userId !== userId) {
            return res.status(403).json({success: false, message: 'Access denied. Insufficient permissions.'});
        }
        res.status(200).json({success: true, message: 'Order found', data: order, orderItems});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
async function getAllOrders (req, res) {
    try {
        const orders = await Order.findAll();
        if(!orders) {
            return res.status(404).json({success: false, message: 'Orders not found'});
        }
        res.status(200).json({success: true, message: 'Orders found', data: orders});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
async function createOrder (req, res) {
    const userId = req.user.id;
    const validOrder = orderSchema.safeParse(req.body);
    if(!validOrder.success) {
        return res.status(400).json({success: false, message: validOrder.error.issues});
    }
    const orderData = validOrder.data;
    const t = await sequelize.transaction();
    try {
        const cart = await Cart.findOne({where: {userId}, transaction: t});
        if(!cart) {
            await t.rollback();
            return res.status(404).json({success: false, message: 'Cart not found'});
        }
       const cartItems = await CartItem.findAll({where: {cartId: cart.id}, transaction: t, lock: t.LOCK.UPDATE});
       if (cartItems.length === 0) {
            await t.rollback();
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        const productIds = await cartItems.map(item => item.productId);
        const products = await Product.findAll({where: {id: productIds}, transaction: t, lock: t.LOCK.UPDATE});
        const productsMap = new Map(products.map(product => [product.id, product]));

        let totalAmount = 0;
        const orderItemsData = [];

        for (const ci of cartItems) {
            const product = productsMap.get(ci.productId);
            if (!product) {
                await t.rollback();
                return res.status(400).json({ success: false, message: `Product ${ci.productId} no longer exists` });
            }
            if (product.stock < ci.quantity) {
                await t.rollback();
                return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
            }
            const unitPrice = product.discountedPrice || product.price; // server-trusted price, not cart's
            const subtotal = unitPrice * ci.quantity;
            totalAmount += subtotal;

            orderItemsData.push({
                productId: product.id,
                quantity: ci.quantity,
                unitPrice,
                subtotal,
            });
        }
        const newOrder = await Order.create({...orderData, userId, totalAmount}, {transaction: t});

        await OrderItem.bulkCreate(orderItemsData.map(item => ({ ...item, orderId: newOrder.id })), {transaction: t});
         for (const item of orderItemsData) {
            await Product.decrement('stock', {
                by: item.quantity,
                where: { id: item.productId },
                transaction: t,
            });
        }
        await CartItem.destroy({where: {cartId: cart.id}, transaction: t});
        await t.commit();
        res.status(201).json({success: true, message: 'Order created', data: newOrder});
    } catch (error) {
        console.log(error);
        await t.rollback();
        res.status(500).json({success: false, message: error.message});
    }
}

async function cancelOrder (req, res) {
    console.log(req.body.cancelReason);
    const CANCELLABLE_STATUSES = ['pending', 'processing'];
    const userId = req.user.id;
    const orderId = req.params.id;
    const validCancelOrder = cancelOrderSchema.safeParse(req.body);
    if(!validCancelOrder.success) {
        return res.status(400).json({success: false, message: validCancelOrder.error.errors});
    }
    try {
        const order = await Order.findByPk(orderId);
        if(!order) {
            return res.status(404).json({success: false, message: 'Order not found'});
        }
        if(order.userId !== userId) {
            return res.status(403).json({success: false, message: 'Access denied. Insufficient permissions.'});
        }
        if(!CANCELLABLE_STATUSES.includes(order.status)) {
            return res.status(409).json({success: false, message: 'Order with status ' + order.status + ' cannot be cancelled'});
        }
        await order.update({status: 'cancelled', cancelledAt: new Date(), cancelReason: req.body.cancelReason});
        res.status(200).json({success: true, message: 'Order cancelled', data: order});
    } catch (error) {
        console.error(`cancelOrder failed [orderId=${orderId}, userId=${userId}]:`, error);
        res.status(500).json({success: false, message: 'an unexpected error occurred'});
    }
}   

async function updateOrderStatus (req, res) {
    const orderId = req.params.id;
    const status = req.body.status;
    try {
        const order = await Order.findByPk(orderId);
        if(!order) {
            return res.status(404).json({success: false, message: 'Order not found'});
        }
        order.status = status;
        await order.save();
        res.status(200).json({success: true, message: 'Order status updated', data: order});
    } catch (error) {
        console.error(`updateOrderStatus failed [orderId=${orderId}]:`, error);
        res.status(500).json({success: false, message: 'an unexpected error occurred'});
    }
}
async function getAnyOrder (req, res) {
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId);
        if(!order) {
            return res.status(404).json({success: false, message: 'Order not found'});
        }
        res.status(200).json({success: true, message: 'Order found', data: order});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
module.exports = {
    getAllOrders,
    createOrder,
    cancelOrder,
    updateOrderStatus,
    getMyOrders,
    getOneOrder,
    getAnyOrder
}