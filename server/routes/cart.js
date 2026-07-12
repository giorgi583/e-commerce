const express = require('express');
const cartRouter = express.Router();
const {getCartItems, addToCart, deleteCartItem, updateCartItem, clearCart} = require('../services/cart-services')
const { authenticate } = require('../middlewares/authmiddleware');

cartRouter.get('/', authenticate, getCartItems);
cartRouter.post('/', authenticate, addToCart);
cartRouter.delete('/:id', authenticate, deleteCartItem);
cartRouter.patch('/:id', authenticate, updateCartItem);
cartRouter.delete('/', authenticate, clearCart);


module.exports = cartRouter