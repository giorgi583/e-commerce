const { z, success} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserSchema: User } = require('../models/auth-schema');
const { userInfoSchema: userInfo } = require('../models/userInfo');
const { CartSchema: Cart } = require('../models/cart-schema')
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
dotenv.config({ path: './.env' , quiet: true });

const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['customer', 'admin']).default('customer')
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
const userInfoValidation = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    contactNumber: z.string().regex(/^\+?[0-9\s\-().]{7,15}$/, 'Invalid phone number'),
    address: z.string().optional(),
    gender: z.string().optional()
});
const register = async (req, res) => {
    const { username, email, password, role, firstName, lastName, contactNumber } = req.body;
    const registervalidationResult = registerSchema.safeParse({ username, email, password, role });
    const userInfoValidationResult = userInfoValidation.safeParse({ firstName, lastName, contactNumber });
    if (!registervalidationResult.success) {
  return res.status(400).json({ success: false, message: registervalidationResult.error.errors });
}
if (!userInfoValidationResult.success) {
   const error = JSON.parse(userInfoValidationResult.error.message);
  return res.status(400).json({ success: false, message: error[0].message});
}
console.log(userInfoValidationResult);
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role });
        const newuserInfo = await userInfo.create({ firstName, lastName, contactNumber, userId: user.id });
        const newCart = await Cart.create({userId: user.id})
        if(!user || !userInfo) {
            throw new Error('User not created');
        }
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};  

const login = async (req, res) => {
    const validLogin = loginSchema.safeParse(req.body);
    if (!validLogin.success) {
        return res.status(400).json({ success: false, message: validLogin.error.errors });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid input' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false, message: error.message });
    }
};
const getMe = async (req, res) => {
   const user = req.user
  if(!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({success: true, message: 'User found', user});
}

const logout = async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
}
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
   try {
const user = await User.findByPk(userId);
if(!user) {
    return res.status(404).json({success: false, message: 'User not found'});
}
const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
if(!isPasswordValid) {
    return res.status(401).json({success: false, message: 'Invalid current password'});
}
const isSame = await bcrypt.compare(newPassword, user.password);
if(isSame) {
    return res.status(400).json({success: false, message: 'New password must be different from the current password'});
}
const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword;
await user.save();
res.status(200).json({success: true, message: 'Password changed successfully'});
   }
   catch(err) {
return ress.status(500).json({success: false, message: err.message});
   }
}

const deleteUserAccount = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        await user.destroy();
        res.status(200).json({success: true, message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    changePassword,
    deleteUserAccount
};