# Sales Inventory Backend API

This project is a backend API for a sales inventory system built with Node.js, Express, and MongoDB. It provides endpoints for managing products, categories, orders, users, and product variations in an e-commerce application. The system is designed for both admin and client usage.

## Features
- **Category Management**: Create, update, delete, and list product categories.
- **Product Management**: Create, update, delete, and list products. Filter products by categories and hide/unhide products for clients.
- **Order Management**: Place, update, delete, and view orders. Track the order status (e.g., pending, shipped, delivered).
- **User Management**: Register and authenticate users, get user details, and manage user accounts.
- **Variations Management**: Manage product variations such as sizes, colors, and brands.
- **Stock Tracking**: Deduct stock based on purchases and track product availability.
- **Sales Tracking**: View total sales, order history, and product statistics.

## Project Structure

├── backend
  ├── models
  │ ├── category.js
  │ ├── order.js
  │ ├── order-item.js
  │ ├── product.js
  │ ├── user.js
  │ ├── variation.js
  ├── routes
  │ ├── categories.js
  │ ├── orders.js
  │ ├── products.js
  │ ├── users.js
  │ ├── variations.js
  ├── helpers
  │ ├── error-handler.js
  │ ├── jwt.js
  ├── app.js
  ├── package.json
  ├── .env


## Installation

1. Clone the repository:

```bash```
git clone https://github.com/Blink17072002/Inventory_management_API.git
cd backend

2. Install the dependencies:
```bash```
npm install

3. Set up the environment variables by creating a .env file in the root directory with the following variables:
```bash```
CONNECTION_STRING=your_mongodb_connection_string
API_URL=/api/v1
SECRET=your_jwt_secret

4. Start the server:
```bash```
npm start
The server will run on http://localhost:3000.

### API Endpoints
- Categories
  GET /api/v1/categories - Get list of categories,
  GET /api/v1/categories/:id - Get category by ID,
  POST /api/v1/categories - Create a new category,
  PUT /api/v1/categories/:id - Update a category,
  DELETE /api/v1/categories/:id - Delete a category,
  
- Products
  GET /api/v1/products - Get list of products (supports filtering by category),
  GET /api/v1/products/:id - Get product details by ID,
  POST /api/v1/products - Create a new product,
  PUT /api/v1/products/:id - Update a product,
  PUT /api/v1/products/:id/hide - Hide a product from users,
  POST /api/v1/products/:id/purchase - Purchase a product and update stock,
  DELETE /api/v1/products/:id - Delete a product
  
- Orders
  GET /api/v1/orders - Get list of all orders,
  GET /api/v1/orders/:id - Get order details by ID,
  POST /api/v1/orders - Create a new order,
  PUT /api/v1/orders/:id - Update order status,
  DELETE /api/v1/orders/:id - Delete an order,
  GET /api/v1/orders/get/totalsales - Get total sales,
  GET /api/v1/orders/get/count - Get the number of orders,
  GET /api/v1/orders/get/userorders/:userid - Get order history for a user
  
- Users
  GET /api/v1/users - Get list of users (admin only),
  GET /api/v1/users/:id - Get user details by ID,
  POST /api/v1/users - Register a new user,
  POST /api/v1/users/login - Log in a user,
  GET /api/v1/users/get/count - Get the number of users,
  DELETE /api/v1/users/:id - Delete a user
  
- Variations
  GET /api/v1/variations - Get list of variations,
  GET /api/v1/variations/:id - Get variation by ID,
  POST /api/v1/variations - Create a new variation,
  PUT /api/v1/variations/:id - Update a variation,
  DELETE /api/v1/variations/:id - Delete a variation
  
# Security
  The project uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token, which can be obtained via the login endpoint. The token should be included in the Authorization header as a Bearer token.
