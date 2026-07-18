const express = require('express');
const productRouter = express.Router();
const { getAllProducts, createProduct, getOneProduct, updateProduct, deleteProduct, getCategories, getProductsByCategory, getTopProducts } = require('../services/products-service');
const { authenticate, authorize, } = require('../middlewares/authmiddleware');


productRouter.get('/', getAllProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/top', getTopProducts);
productRouter.get('/categories/:category', getProductsByCategory);
productRouter.post('/', authenticate, authorize('admin'), createProduct);
productRouter.get('/:id', getOneProduct);
productRouter.put('/:id', authenticate, authorize('admin'), updateProduct);
productRouter.delete('/:id', authenticate, authorize('admin'), deleteProduct);



module.exports = productRouter