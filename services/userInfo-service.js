const {z} = require('zod');
const {userInfoSchema: userInfo} = require('../models/userInfo');

const userInfoValidation = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    contactNumber: z.string(),
    address: z.string().optional(),
    gender: z.string().optional()
});

async function getUserInfo(req, res) {
    const userId = req.user.id;
    try {
        const myuserInfo = await userInfo.findOne({where: {userId}});
        if(!myuserInfo) {
            return res.status(404).json({success: false, message: 'User info not found'});
        }
        res.status(200).json({success: true, message: 'User info found', myuserInfo});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function updateUserInfo(req, res) {
    const userId = req.user.id;
    const userInfoValidationResult = userInfoValidation.partial().safeParse(req.body);
    if(!userInfoValidationResult.success) {
        return res.status(400).json({success: false, message: 'Invalid user info'});
    }
    try {
        
        const myuserInfo = await userInfo.findOne({where: {userId}});
        if(!myuserInfo) {
            return res.status(404).json({success: false, message: 'User info not found'});
        }
        const updateduserInfo = await myuserInfo.update({ ...userInfoValidationResult.data });
        res.status(200).json({success: true, message: 'User info updated', updateduserInfo});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function getAllUserInfo (req, res) {
    try {
        const AlluserInfo = await userInfo.findAll();
        if(!AlluserInfo) {
            return res.status(404).json({success: false, message: 'Users info not found'});
        }
        res.status(200).json({success: true, message: 'Users info found', AlluserInfo});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = { updateUserInfo, getUserInfo, getAllUserInfo };