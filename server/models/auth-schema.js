const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/db');

const UserSchema = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        defaultValue: 'customer'
    }, },
    {
    tableName: 'users'
});

module.exports = {
    UserSchema
    }