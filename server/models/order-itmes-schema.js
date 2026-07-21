const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/db');

const OrderItemSchema = sequelize.define('order_items', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = {
    OrderItemSchema
    }