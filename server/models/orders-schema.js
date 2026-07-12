const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/db');

const OrderSchema = sequelize.define('orders', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'USD',
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
        defaultValue: 'pending',
        allowNull: false,
    },
     cancelledAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cancelReason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }, }
, {
    tableName: 'orders'
});

module.exports = {
    OrderSchema
    }