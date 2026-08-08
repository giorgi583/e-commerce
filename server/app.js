const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./utils/db');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
app.use(cors({
    origin: 'https://e-commerce-owmt.onrender.com'}));
const swaggerDocument = require('./swagger/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config({ path: './.env' , quiet: true });
require('./relations')  
// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const reviewRoutes = require('./routes/reviews');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);

// Test database connection and sync models
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
// Start the server
const port = 6600;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});