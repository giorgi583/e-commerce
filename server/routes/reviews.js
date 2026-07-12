const express = require('express');
const reviewRouter = express.Router();
const  {getAllReviewsByProductId, getAnyReview, postReview, editReview, deleteReview}  = require('../services/review-service');
const { authenticate, authorize } = require('../middlewares/authmiddleware');

reviewRouter.get('/', getAllReviewsByProductId);
reviewRouter.post('/:productId', authenticate, postReview);
reviewRouter.get('/:id', getAnyReview);
reviewRouter.put('/:id', authenticate, editReview);
reviewRouter.delete('/:id', authenticate, deleteReview);

module.exports = reviewRouter