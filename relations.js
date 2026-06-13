const { OrderSchema: Order } = require('./models/orders-schema');
const { OrderItemSchema: OrderItem } = require('./models/order-itmes-schema');
const { UserSchema: User } = require('./models/auth-schema');
const { userInfoSchema: userInfo } = require('./models/userInfo');

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'customer' });

User.hasOne(userInfo, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
userInfo.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    Order,
    OrderItem,
    User,
    userInfo
}