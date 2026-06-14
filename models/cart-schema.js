const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/db');

const CartSchema = sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
     status: {
    type: DataTypes.ENUM('active', 'checkedout', 'abandoned'),
    defaultValue: 'active'
  }
},
{
    tableName: 'carts'
}
);

const CartItemSchema = sequelize.define('CartItem', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'carts', key: 'id' }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'cart_items'
});


module.exports = {
    CartSchema,
    CartItemSchema
}   