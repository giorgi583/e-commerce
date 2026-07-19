const { z, success } = require('zod')
const { CartSchema: Cart, CartItemSchema: CartItem } = require('../models/cart-schema');
const { ProductSchema: Product} = require('../models/products-schema')

const cartItemValidation = z.object({
    productId: z.number().positive(),
    quantity: z.number().positive()
});

async function addToCart (req, res) {
    const userId = req.user.id;
    const validation = cartItemValidation.safeParse(req.body);
    if(!validation.success) {
        return res.status(400).json({success: false, message: validation.error.issues});
    }
    const {productId, quantity} = validation.data;
    try {
        const product = await Product.findOne({where: {id: productId}});
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
    const cart = await Cart.findOne({where: {userId}});
    if(!cart) {
        return res.status(404).json({success: false, message: 'Cart not found'});
    }
    const cartItem = await CartItem.findOne({where: {cartId: cart.id, productId}});
    if(cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    } else {
        await CartItem.create({cartId: cart.id, productId, quantity, unitPrice: product.discountedPrice || product.price});
    }
    res.status(200).json({success: true, message: 'Item added to cart'}); }
    catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


async function getCartItems(req, res) {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({where: {userId}});
        if(!cart) {
            return res.status(404).json({success: false, message: 'Cart not found'});
        }
        const cartItems = await CartItem.findAll({where: {cartId: cart.id}, include: [Product]});
        res.status(200).json({success: true, message: 'Cart items found', cartItems});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

async function deleteCartItem (req, res) {
    const userId = req.user.id
    const productId = req.params.id;
    try {
    const cart = await Cart.findOne({where: {userId}})
    if (!cart) {
        return res.status(404).json({status: false, message: 'Cart not found'})
    }
    const deletedcartItem = await CartItem.destroy({where: {cartId: cart.id, productId}})
    if(!deletedcartItem) {
        return res.status(404).json({status: false, message: 'item not found'})
    }
    res.status(200).json({success: true, message: 'cart item deleted successfully'})
    }
    catch(err) {
        return res.status(500).json({success: false, message: err.message})
    }
}

async function updateCartItem (req, res) {
const userId = req.user.id;
const productId = req.params.id;
const {quantity} = req.body;
try {
    const cart = await Cart.findOne({where: {userId}});
    if(!cart) {
        return res.status(404).json({success: false, message: 'Cart not found'});
    }
    const cartItem = await CartItem.findOne({where: {cartId: cart.id, productId}});
    if(!cartItem) {
        return res.status(404).json({success: false, message: 'Item not found'});
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({success: true, message: 'Item updated successfully'});
}
catch (error) {
    res.status(500).json({success: false, message: error.message});
}
}
async function clearCart (req, res) {
const userId = req.user.id;
try {
    const cart = await Cart.findOne({where: {userId}});
    if(!cart) {
        return res.status(404).json({success: false, message: 'Cart not found'});
    }
    await CartItem.destroy({where: {cartId: cart.id}});
    res.status(200).json({success: true, message: 'Cart cleared successfully'});
}
catch (error) {
    res.status(500).json({success: false, message: error.message});
}
}

module.exports = {
    getCartItems,
    deleteCartItem,
    addToCart,
    updateCartItem,
    clearCart
}