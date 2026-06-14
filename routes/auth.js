const express = require('express');
const authRouter = express.Router();
const { register, login, getMe, logout, changePassword, deleteUserAccount } = require('../services/auth-service');
const {updateUserInfo, getUserInfo, getAllUserInfo} = require('../services/userInfo-service');
const { authenticate, validateChangePassword, authorize } = require('../middlewares/authmiddleware');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authenticate, getMe);
authRouter.post('/logout', authenticate, logout);
authRouter.put('/me/user-info', authenticate, updateUserInfo);
authRouter.get('/me/user-info', authenticate, getUserInfo);
authRouter.get('/user-info', authenticate, authorize('admin'), getAllUserInfo);
authRouter.put('/me/change-password', authenticate, validateChangePassword, changePassword);
authRouter.delete('/me', authenticate, deleteUserAccount);


module.exports = authRouter