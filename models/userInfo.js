const {DataTypes} = require('sequelize');
const {sequelize }= require('../utils/db');

const userInfoSchema = sequelize.define('userInfo', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.STRING,
        maxLength: 200,
        allowNull: true
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM(['male', 'female', 'other']),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = {
    userInfoSchema
}