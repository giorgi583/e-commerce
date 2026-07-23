const {z} = require('zod');
const {userInfoSchema: userInfo} = require('../models/userInfo');
const {UserSchema: User} = require('../models/auth-schema');

const userInfoValidation = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    avatar: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    contactNumber: z.string(),
    address: z.string().nullable().optional(),
    gender: z.string().nullable().optional()
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
    console.log(req.body);
    const userId = req.user.id;
    const userInfoValidationResult = userInfoValidation.partial().safeParse(req.body);
    if(!userInfoValidationResult.success) {
        const error = JSON.parse(userInfoValidationResult.error.message);
        console.log(error);
        return res.status(400).json({success: false, message: 'Invalid input'});
    }
    try {
        
        const myuserInfo = await userInfo.findOne({where: {userId}});
        if(!myuserInfo) {
            return res.status(404).json({success: false, message: 'User info not found'});
        }
        const updateduserInfo = await myuserInfo.update({ ...userInfoValidationResult.data });
        res.status(200).json({success: true, message: 'User info updated successfully', updateduserInfo});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function getAllUserInfo (req, res) {
    try {
        const AlluserInfo = await userInfo.findAll();
        const Allusers = await User.findAll();
        if(!AlluserInfo) {
            return res.status(404).json({success: false, message: 'Users info not found'});
        }
        res.status(200).json({success: true, message: 'Users info found', AlluserInfo, Allusers});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = { updateUserInfo, getUserInfo, getAllUserInfo };