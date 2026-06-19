const express = require('express');
const orderRouter = express.Router();
const { getAllOrders, getMyOrders, createOrder, cancelOrder, updateOrderStatus, getOneOrder, getAnyOrder } = require('../services/order-service');
const { authenticate, authorize } = require('../middlewares/authmiddleware');

orderRouter.get('/', authenticate, authorize('admin'), getAllOrders);
orderRouter.get('/me', authenticate, getMyOrders);
orderRouter.get('/me/:id', authenticate, getOneOrder);
orderRouter.post('/', authenticate, createOrder);
orderRouter.patch('/:id', authenticate, authorize('admin'), updateOrderStatus);
orderRouter.patch('/:id/cancelOrder', authenticate, cancelOrder);
orderRouter.get('/:id', authenticate, authorize('admin'), getAnyOrder);

module.exports = orderRouter