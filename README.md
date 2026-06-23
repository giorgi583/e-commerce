# E-Commerce Backend API

A RESTful e-commerce backend built with **Express.js**, **PostgreSQL**, and **Sequelize ORM**. The API provides user authentication, product management, shopping cart functionality, order processing, and product reviews.

## Features

### Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Role-based access control
* Roles:

  * Admin
  * Customer
* Password hashing with bcrypt

### Product Management

* Create products (Admin)
* Update products (Admin)
* Delete products (Admin)
* Retrieve all products
* Retrieve product details
* Product search
* Product filtering
* Product sorting
* Pagination support

### Shopping Cart

* Add products to cart
* Update cart item quantities
* Remove products from cart
* View current cart

### Order Management

* Create orders
* View order history
* View order details
* Store shipping information
* Track order status

### Reviews

* Create product reviews
* Update reviews
* Delete reviews
* Retrieve product reviews

### Validation & Security

* Request validation with Zod
* Password hashing with bcrypt
* JWT authentication middleware
* Protected routes
* Error handling middleware

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Sequelize ORM

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Validation

* Zod

---

## Database Schema

### Users

Stores authentication and account information.

### UserInfo

Stores additional user profile information.

### Products

Stores product details.

### Orders

Stores customer orders.

### OrderItems

Stores products associated with each order.

### Cart

Stores customer carts.

### CartItems

Stores products currently in a cart.

### Reviews

Stores product reviews and ratings.

---

## Entity Relationships

```text
User
 ├── UserInfo (1:1)
 ├── Cart (1:1)
 ├── Orders (1:M)
 └── Reviews (1:M)

Cart
 └── CartItems (1:M)

Products
 ├── CartItems (1:M)
 ├── OrderItems (1:M)
 └── Reviews (1:M)

Orders
 └── OrderItems (1:M)
```

---

## Project Structure

```text
src/
├── utils/
├── services/
├── swagger/
├── middlewares/
├── models/
├── relations.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── cart.js
│   └── reviews.js
└── app.js

```

---

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_jwt_secret
```

### Start the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## API Routes

get information about routes on api-docs page

## Authentication

Protected endpoints require a valid JWT access token.

Example:

```http
Authorization: Bearer <access_token>
```

---

## Validation

All incoming request data is validated using Zod schemas before reaching business logic.

Example validations include:

* User registration
* User login
* Product creation
* Order creation
* Review creation

---

## Error Handling

The API returns standardized HTTP status codes:

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Validation Error      |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource Not Found    |
| 500         | Internal Server Error |

---

## Future Improvements

* Refresh tokens
* Password reset functionality
* Email verification
* Product image uploads
* Wishlist support
* Payment gateway integration
* Order status notifications

---

## License

This project is intended for educational and portfolio purposes.
