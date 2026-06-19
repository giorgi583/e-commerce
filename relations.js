const { OrderSchema: Order } = require('./models/orders-schema');
const { OrderItemSchema: OrderItem } = require('./models/order-itmes-schema');
const { UserSchema: User } = require('./models/auth-schema');
const { userInfoSchema: userInfo } = require('./models/userInfo');
const { CartSchema: Cart } = require('./models/cart-schema');
const { CartItemSchema: CartItem } = require('./models/cart-schema');
const { ProductSchema: Product } = require('./models/products-schema');
const { ReviewSchema: Review } = require('./models/reviews-schema');

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'customer' });

User.hasOne(userInfo, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
userInfo.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId', as: 'cart', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

CartItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });

Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    Order,
    OrderItem,
    User,
    userInfo,
    Cart,
    CartItem,
    Product,
    Review
}