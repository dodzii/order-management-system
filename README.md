# Order Management System (OMS) for E-commerce Mobile App

## Introduction

This Order Management System (OMS) is designed for an e-commerce mobile app. It is built using the NestJS framework, Prisma as the ORM, and PostgreSQL as the database. This README provides instructions on setting up the development environment, running the application, and testing the endpoints.

## Table of Contents

- [Environment Setup](#environment-setup)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Documentation](#documentation)

## Environment Setup

### Prerequisites

Ensure you have the following tools installed on your machine:

- Node.js (>= 14.x)
- npm (>= 6.x)
- Docker (for PostgreSQL setup)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/dodzii/order-management-system.git
    cd order-management-system
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the PostgreSQL database using Docker:

    ```bash
    docker run --name order_management_system -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=oms -p 5434:5432 -d postgres
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    DATABASE_URL="postgresql://postgres:postgres@localhost:5434/order_management_system?schema=public"
    ```

5. Generate Prisma client:

    ```bash
    npx prisma generate
    ```

6. Run the database migrations:

    ```bash
    npx prisma migrate dev
    ```

7. Seed the database:

    ```bash
    npx ts-node prisma/seed.ts
    ```

## Database Schema

The database schema includes the following entities:

### Users
- `userId` BigInt @id @default(autoincrement())
- `name` String
- `email` String
- `password` String
- `address` String

### Products
- `productId` BigInt @id @default(autoincrement())
- `name` String
- `description` String
- `price` Decimal @db.Decimal(10, 2)
- `stock` Int
- `cartItems` CartItem[]

### Orders
- `orderId` BigInt @id @default(autoincrement())
- `orderDate` DateTime @default(now())
- `status` String
- `userId` BigInt
- `cartId` BigInt
- `totalPrice` Decimal @db.Decimal(10, 2)
- `user` User @relation(fields: [userId], references: [userId])
- `cart` Cart @relation(fields: [cartId], references: [cartId])

### Cart
- `cartId` BigInt @id @default(autoincrement())
- `userId` BigInt
- `cartTotalPrice` Decimal @db.Decimal(10, 2) @default(0)
- `user` User @relation(fields: [userId], references: [userId])
- `cartItems` CartItem[]
- `orders` Order[]

### CartItem
- `cartId` BigInt
- `productId` BigInt
- `quantity` Int
- `cart` Cart @relation(fields: [cartId], references: [cartId])
- `product` Product @relation(fields: [productId], references: [productId])

- @@id([cartId, productId])

### Schema Diagram

![Database Schema](order-management-system/erd.png)

## API Endpoints

### Add to Cart

- **Endpoint**: POST `/api/cart/add`
- **Functionality**: Adds a product to the user's cart or updates the quantity if the product is already in the cart.

### View Cart

- **Endpoint**: GET `/api/cart/:userId`
- **Functionality**: Retrieves the user's cart.

### Update Cart

- **Endpoint**: PUT `/api/cart/update`
- **Functionality**: Updates the quantity of a product in the cart.

### Remove from Cart

- **Endpoint**: DELETE `/api/cart/remove`
- **Functionality**: Removes a product from the cart.

### Create Order

- **Endpoint**: POST `/api/orders`
- **Functionality**: Creates a new order for the specified user with the products in their cart.

### Get Order by ID

- **Endpoint**: GET `/api/orders/:orderId`
- **Functionality**: Retrieves the order details by order ID.

### Update Order Status

- **Endpoint**: PUT `/api/orders/:orderId/status`
- **Functionality**: Updates the status of an order.

## Running the Application

1. Start the NestJS application:

    ```bash
    npm run start:dev
    ```

2. The application will be running at `http://localhost:3000`.

## Testing

Use tools like Postman or curl to test the API endpoints. Ensure the PostgreSQL container is running and the NestJS application is started before testing.

### Example Tests

- **Add to Cart**:

    ```bash
    curl -X POST http://localhost:3000/api/cart/add -H "Content-Type: application/json" -d '{"userId": "1", "productId": "1", "quantity": 2}'
    ```

- **View Cart**:

    ```bash
    curl -X GET http://localhost:3000/api/cart/1
    ```

- **Update Cart**:

    ```bash
    curl -X PUT http://localhost:3000/api/cart/update -H "Content-Type: application/json" -d '{"userId": "1", "productId": "1", "quantity": 3}'
    ```

- **Remove from Cart**:

    ```bash
    curl -X DELETE http://localhost:3000/api/cart/remove -H "Content-Type: application/json" -d '{"userId": "1", "productId": "1"}'
    ```

- **Create Order**:

    ```bash
    curl -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -d '{"userId": "1"}'
    ```

- **Get Order by ID**:

    ```bash
    curl -X GET http://localhost:3000/api/orders/1
    ```

- **Update Order Status**:

    ```bash
    curl -X PUT http://localhost:3000/api/orders/1/status -H "Content-Type: application/json" -d '{"status": "Shipped"}'
    ```

## Documentation

API documentation is generated using Swagger. Access the Swagger UI at `https://app.swaggerhub.com/apis/ABDULLAHMAHMOUD289/order-managment-system/1.0.0#/`.

## License

This project is licensed under the MIT License.
