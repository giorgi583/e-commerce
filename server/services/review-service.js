const {ReviewSchema: Review} = require('../models/reviews-schema');
const {UserSchema: User} = require('../models/auth-schema');
const {z} = require('zod');

const reviewValidation = z.object({
    rating: z.number().positive().optional(),
    comment: z.string().min(1).max(200)
});


async function getAllReviewsByProductId (req, res) {
    const productId = req.query.productId;
    if(!productId) {
        return res.status(400).json({success: false, message: 'Product id is required'});
    }
    try {
        const reviews = await Review.findAll({where: {productId}});
        if(!reviews) {
            return res.status(404).json({success: false, message: 'Reviews not found'});
        }
        res.status(200).json({success: true, message: 'Reviews found successfully', reviews: reviews});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function getAnyReview (req, res) {
    const reviewId = req.params.id;
    if(!reviewId) {
        return res.status(400).json({success: false, message: 'Review id is required'});
    }
    try {
        const review = await Review.findByPk(reviewId);
        if(!review) {
            return res.status(404).json({success: false, message: 'Review not found'});
        }
        res.status(200).json({success: true, message: 'Review found', data: review});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function postReview(req, res) {

    const userId = req.user.id;
    const productId = req.params.productId;
    const reviewValidationResult = reviewValidation.safeParse(req.body);
    console.log(reviewValidationResult, userId, productId);
    if(!reviewValidationResult.success) {
        return res.status(400).json({success: false, message: 'Invalid review'});
    }
    try {
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        const review = await Review.create({...reviewValidationResult.data, userId, username: user.username, productId});
        res.status(201).json({success: true, message: 'Comment created', data: review});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});w
    }
}

async function editReview(req, res) {
    const userId = req.user.id;
    const reviewId = req.params.id;
    const reviewValidationResult = reviewValidation.safeParse(req.body);
    if(!reviewValidationResult.success) {
        return res.status(400).json({success: false, message: 'Invalid review'});
    }
    try {
        const review = await Review.findByPk(reviewId);
        if(!review) {
            return res.status(404).json({success: false, message: 'Review not found'});
        }
        if(review.userId !== userId) {
            return res.status(403).json({success: false, message: 'Access denied. Insufficient permissions.'});
        }
        const newReview = await review.update({...reviewValidationResult.data});
        res.status(200).json({success: true, message: 'Review updated', data: newReview});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function deleteReview(req,res) {
    const reviewId = req.params.id
    const userId = req.user.id
    try {
    const review = await Review.findByPk(reviewId)
    if(!review) {
        return res.status(404).json({success: false, message: 'Review not found'})
    }
    if(review.userId !== userId) {
        return res.status(403).json({success: false, message: 'Access denied. Insufficient permissions.'});
    }
    const deletedReview = await Review.destroy({where: {id: reviewId}})
    res.status(200).json({success: true, message: 'Review deleted', data: deletedReview})
    }
    catch(error) {
    res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {getAllReviewsByProductId, getAnyReview, postReview, editReview, deleteReview};