const express = require('express');
const orderRouter = express.Router();
const { getAllOrders, getMyOrders, createOrder, cancelOrder, updateOrderStatus, getOneOrder } = require('../services/order-service');
const { authenticate, authorize } = require('../middlewares/authmiddleware');

orderRouter.get('/', authenticate, authorize('admin'), getAllOrders);
orderRouter.get('/me', authenticate, getMyOrders);
orderRouter.get('/me/:id', authenticate, getOneOrder);
orderRouter.post('/', authenticate, createOrder);
orderRouter.put('/:id', authenticate, authorize('admin'), updateOrderStatus);
orderRouter.put('/:id/cancelOrder', authenticate, cancelOrder);
orderRouter.get('/me/:id/items', authenticate, getOneOrder);

module.exports = orderRouter