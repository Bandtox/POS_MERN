# POS-MERN

A Point of Sale (POS) application built with the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Introduction

POS-MERN is a robust and user-friendly Point of Sale application designed to streamline retail operations. It enables retailers to manage sales, inventory, and customer data efficiently.

## Features

- User authentication and authorization
- Dual role: User and Admin
- Inventory management (CRUD Operations)
- Real-time data updates
- Sales Dashboard
- Transactions management
- Online Food ordering
- Cart

## Installation

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bandtox/POS-MERN.git
   cd POS-MERN

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```
3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```
   
5.**Run the application:**

SERVER
   ```bash
   cd server
   node server.js
   ```

CLIENT
   ```bash
   cd ../client
   npm start
   ```

6. **Access the application:**Open your browser and go to http://localhost:3000.

## Usage

- **Login/Register**: Create an account or log in with existing credentials.
- **Product Management**: Add, edit, or delete products.
- **Inventory Management**: Keep track of stock.
- **Sales Processing**: Process sales transactions.
- **Customer Management**: Manage customer information and purchase history.
- **Admin Login**: To login as admin use "admin@pos.com" for username and password as "admin" 

## Technologies Used

### Frontend:
- React
- Redux
- React Router
- Axios

### Backend:
- Node.js
- Express
- MongoDB
- Mongoose


