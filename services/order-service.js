const {z} = require('zod');
const {sequelize} = require('../utils/db');
const {OrderSchema: Order} = require('../models/orders-schema');
const {OrderItemSchema: OrderItem} = require('../models/order-itmes-schema');
const orderItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().positive(),
    unitPrice: z.number().positive(),
});
const orderSchema = z.object({
    totalAmount: z.number().positive(),
    currency: z.string().default('USD'),
    shippingAddress: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zipCode: z.string()
    }),
    notes: z.string().optional(),
    items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
    status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).default('pending')
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
    const t = await sequelize.transaction();
    const userId = req.user.id;
    const validOrder = orderSchema.safeParse(req.body);
    if(!validOrder.success) {
        return res.status(400).json({success: false, message: validOrder.error.errors});
    }
    const {items, ...orderData} = validOrder.data;
    try {
        const t = await sequelize.transaction();
        const newOrder = await Order.create({...orderData, userId}, {transaction: t});
        const orderItems = items.map(item => ({...item, orderId: newOrder.id, subtotal: item.unitPrice * item.quantity}));
        await OrderItem.bulkCreate(orderItems, {transaction: t});
        await t.commit();
        res.status(201).json({success: true, message: 'Order created', data: newOrder});
    } catch (error) {
        await t.rollback();
        res.status(500).json({success: false, message: error.message});
    }
}

async function cancelOrder (req, res) {
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
        await order.update({status: 'cancelled', cancelledAt: new Date(), cancellReason: req.body.reason});
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