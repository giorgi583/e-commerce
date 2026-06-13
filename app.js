const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./utils/db');
app.use(bodyParser.json());
require('dotenv').config({ path: './.env' , quiet: true });
require('./relations')  
// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

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