# Project Proposal

## Project Description
The goal of this project is to develop a full-stack e-commerce web application that provides users with a seamless online shopping experience. The application will feature a user-friendly front-end built with React, a robust back-end using Node.js with Express, and a PostgreSQL database for managing data.  The application will also implement secure user authentication using JWT.

## Objectives
* Develop a responsive and intuitive user interface using React
* Create a secure and efficient back-end with Node.js and Express
* Design and implement a PostgreSQL database schema for managing users, products, carts, and orders
* Integrate user authentication and authorization using JWT
* Implement core e-commerce features: product catalog, shopping cart, and checkout process

## Scope of Work
### Frontend Development (React)
1. Project setup
  * Initialize React project with Vite
  * Set up project structure and install necessary dependencies
2. Navigation Bar
  * Implement a responsive navigation bar 
  * Links: Home, Products, Cart, Login/Signup, and Logout
  * Show different links based on authentication state.
3. Authentication Pages
  * Create Signup and Login pages with forms for user registration and authentication
4. Home Page
  * Design a welcoming home page with promotional content and links to the product catalog
5. Product Catalog
  * Fetch and display products in a grid or list view
  * Implement search and filter functionalities
6. Product Details Page
  * Display detailed information about a selected product
  * Provide an option to add the product to the cart
7. Shopping Cart
  * Show items added to the cart, allowing updates to quantity or removal of items
  * Calculate the total price of items in the cart
8. Checkout Page
  * Display a summary of cart items and total cost
  * Display PayPal buttons for payment processing
9. Order Confirmation Page
  * Display a confirmation message after successful checkout

### Backend Development (Node.js + Express)
1. Project Setup
  * Initialize Node.js project and install necessary dependencies
2. Database Schema (PostgreSQL)
  * Design and create tables for users, categories, products, carts, cart items, orders, and order items
3. User Authentication
  * Implement endpoints for user signup and login
  * Use JWT for secure authentication and protect routes.
4. Product Management
  * Create endpoints to fetch all categories, products, and single product details
5. Shopping Cart Management
  * Develop endpoints for creating a cart, adding items to the cart, removing items, and updating item quantities
6. Checkout Process
  * Create endpoints for creating orders, processing payments, and confirming orders

### Integration and Testing
1. API Integration in Frontend
  * Connect React components to backend API endpoints
  * Handle API responses and update the UI accordingly
  * 
2. Testing
  * Write unit tests for frontend components
  * Write integration tests for backend endpoints
  * Perform end-to-end tests for user flows (e.g., signup, login, add to cart, checkout)
3. Deployment
  * Set up a hosting service
  * Configure environment variables for production
  * Deploy the frontend and backend
  * Set up a CI/CD pipeline

## Database Schema
* Users Table: id, username, first name, last name, email, password_hash
* Categories Table: id, name, image url
* Products Table: id, name, description, price, image url, stock
* Carts Table: id, user id
* Cart Items Table: id, cart id, product id, quantity, price
* Orders Table: id, user id, name, total items, total amount, status, address, city, state, country
* Order Items Table: id, order id, product id, quantity, price

## Conclusion
This project aims to deliver a comprehensive e-commerce web application, providing a valuable and practical experience in full-stack development. The project plan outlines the steps required to build a robust application, ensuring a structured approach to development.