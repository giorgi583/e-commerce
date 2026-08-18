# E-buy 🛒

E-buy is a full-stack e-commerce web application built as a learning project to practice modern frontend and backend web development. The application provides a complete shopping experience for customers, along with an administration interface for managing products, users, and orders.

## 🚀 Features

### 👤 Customer Features

- 🔐 User registration and authentication
- 🏠 Product browsing
- 🔎 Product search
- 📄 Product pagination
- 🏷️ Product filtering
- ↕️ Product sorting
- 📋 Detailed product pages
- ⚖️ Product comparison
- ⭐ Product reviews
- 🛒 Add products to cart
- 📦 Place orders
- 📋 View previous orders
- 👤 User profile page

### 🛠️ Admin Features

Administrators have access to additional functionality for managing the store:

- 👥 View all registered users
- 📦 View all orders
- 🔄 Update order statuses
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products

## 🧰 Technologies

### Frontend

- **React** – UI development
- **Vite** – Development environment and build tool
- **Tailwind CSS** – Styling and responsive design
- **React Router** – Client-side routing
- **Redux** – State management
- **React Hot Toast** – Notifications
- **Lucide React** – Icons

### Backend

- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **Sequelize** – ORM
- **PostgreSQL** – Relational database
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **CORS** – Cross-origin resource sharing

## 🏗️ Architecture

E-buy follows a typical full-stack architecture:

```text
┌──────────────────────┐
│      React + Vite    │
│      Frontend        │
└──────────┬───────────┘
           │
           │ HTTP / REST API
           ▼
┌──────────────────────┐
│   Node.js + Express  │
│      Backend         │
└──────────┬───────────┘
           │
           │ Sequelize
           ▼
┌──────────────────────┐
│     PostgreSQL       │
│      Database        │
└──────────────────────┘
📁 Main Functionality
Product Management

Users can browse products using:

Pagination
Search
Filtering
Sorting

Each product has its own details page where users can view information, reviews, and related functionality.

Product Comparison

Users can select products and compare them to make it easier to evaluate different products before purchasing.

Shopping Cart & Orders

Authenticated users can:

Add products to their cart
Review their cart
Place an order
View their previous orders
Reviews

Users can leave reviews on products and view reviews submitted by other users.

Authentication

Authentication is implemented using:

JWT-based authentication
Password hashing with bcrypt
Protected API routes
User/admin authorization
Admin Dashboard

Administrators can manage the store through dedicated functionality for:

Users
Products
Orders

Admins can also update order statuses to keep track of the order lifecycle.

⚙️ Installation
Prerequisites

Make sure you have installed:

Node.js
PostgreSQL
Git
1. Clone the repository
git clone https://github.com/giorgi583/e-commerce.git
cd e-buy
2. Install dependencies

Install the frontend dependencies:

cd client
npm install

Install the backend dependencies:

cd ../server
npm install
3. Configure environment variables

Create a .env file in the backend directory.

Example:

PORT=8080


DATABASE_URL=your_postgresql_connection_string


JWT_SECRET=your_jwt_secret

Adjust the environment variables according to your database and application configuration.

4. Start the backend
cd server
npm run dev
5. Start the frontend

In another terminal:

cd client
npm run dev

The application should now be available at the local Vite development URL.

📦 Dependencies
Frontend
react
react-router-dom
react-hot-toast
redux
lucide-react
tailwindcss
vite
Backend
node.js
express
sequelize
postgresql
bcrypt
jsonwebtoken
cors
🔒 Security

The application includes several basic security-related mechanisms:

Password hashing using bcrypt
JWT-based authentication
Protected routes
Role-based access for administrative functionality
CORS configuration
Database interaction through Sequelize

This project was developed primarily for educational purposes and should not be considered production-ready without additional security auditing and hardening.

📱 Responsive Design

The frontend is designed to work across different screen sizes using Tailwind CSS and responsive layouts.

🎯 Project Goals

The main goals of E-buy were to practice:

Building a full-stack application
Developing React components and interfaces
Managing application state with Redux
Creating REST APIs with Express
Working with relational databases
Using Sequelize as an ORM
Implementing authentication and authorization
Building search, filtering, sorting, and pagination
Managing e-commerce functionality
Creating responsive user interfaces
🔮 Future Improvements

Potential improvements include:

Payment integration
Image upload and storage
Advanced product filtering
Improved admin dashboard
Email notifications
Wishlist functionality
Product stock management
Improved validation and error handling
Automated testing
More advanced security measures
📄 License

This project was created for educational purposes.