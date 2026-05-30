# E-Commerce Product API Documentation

This API supports user authentication (registration, login, logout) and complete product CRUD operations (creating, reading, updating, deleting products, uploading multiple images, and filtering by category).

## Table of Contents
1. [Authentication API](#authentication-api)
   - [Register User](#register-user)
   - [Login User](#login-user)
   - [Logout User](#logout-user)
2. [Product API](#product-api)
   - [Create Product](#create-product)
   - [Get All Products](#get-all-products)
   - [Get Product by ID](#get-product-by-id)
   - [Update Product](#update-product)
   - [Delete Product](#delete-product)

---

## Authentication API

### Register User
* **Route:** `/api/user/register`
* **Method:** `POST`
* **Authentication:** Public
* **Required Fields:**
  * `name` (string)
  * `email` (string)
  * `password` (string)

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Success Response (201 Created)
*Sets `token` in httpOnly cookie.*
```json
{
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "_id": "65f0e34c9c8ef7812345678a",
    "name": "john doe",
    "email": "john.doe@example.com",
    "createdAt": "2026-05-30T14:00:00.000Z",
    "updatedAt": "2026-05-30T14:00:00.000Z"
  }
}
```

#### Error Response (400 Bad Request)
```json
{
  "message": "User already exist",
  "errors": []
}
```

---

### Login User
* **Route:** `/api/user/login`
* **Method:** `POST`
* **Authentication:** Public
* **Required Fields:**
  * `email` (string)
  * `password` (string)

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Success Response (200 OK)
*Sets `token` in httpOnly cookie.*
```json
{
  "statusCode": 200,
  "message": "User LoggedIn successfully",
  "data": {
    "_id": "65f0e34c9c8ef7812345678a",
    "name": "john doe",
    "email": "john.doe@example.com",
    "createdAt": "2026-05-30T14:00:00.000Z",
    "updatedAt": "2026-05-30T14:00:00.000Z"
  }
}
```

#### Error Response (400 Bad Request / 401 Unauthorized)
```json
{
  "message": "Invalid Credentials",
  "errors": []
}
```

---

### Logout User
* **Route:** `/api/user/logout`
* **Method:** `POST`
* **Authentication:** Public

#### Request Body
None

#### Success Response (200 OK)
*Clears `token` cookie.*
```json
{
  "statusCode": 200,
  "message": "User LoggedOut",
  "data": null
}
```

---

## Product API

### Create Product
* **Route:** `/api/products`
* **Method:** `POST`
* **Authentication:** Private (JWT Cookie Required)
* **Required Fields:**
  * `name` (string)
  * `price` (number, must be >= 0)
* **Optional Fields:**
  * `description` (string)
  * `category` (string)
  * `images` (multipart/form-data upload, field name: `images`, maximum 5 files)

#### Request Body (Multipart Form Data or JSON if no files)
```json
{
  "name": "Premium Wireless Headset",
  "price": 99.99,
  "description": "High fidelity noise-cancelling wireless headphones",
  "category": "Electronics"
}
```

#### Success Response (201 Created)
```json
{
  "statusCode": 201,
  "message": "Product created successfully",
  "data": {
    "_id": "65f0e4b29c8ef7812345679c",
    "name": "Premium Wireless Headset",
    "price": 99.99,
    "description": "High fidelity noise-cancelling wireless headphones",
    "category": "electronics",
    "images": [
      "images-1717075200000-847294827.jpg",
      "images-1717075200002-984729384.png"
    ],
    "createdBy": "65f0e34c9c8ef7812345678a",
    "createdAt": "2026-05-30T14:10:00.000Z",
    "updatedAt": "2026-05-30T14:10:00.000Z"
  }
}
```

#### Error Response (401 Unauthorized)
```json
{
  "message": "token not found",
  "errors": []
}
```

#### Error Response (400 Bad Request)
```json
{
  "message": "Product price is required",
  "errors": []
}
```

---

### Get All Products
* **Route:** `/api/products`
* **Method:** `GET`
* **Authentication:** Public
* **Query Parameters:**
  * `category` (string, optional) - Filter products by category (case-insensitive)

#### Request Example
`GET /api/products?category=electronics`

#### Success Response (200 OK)
```json
{
  "statusCode": 200,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "65f0e4b29c8ef7812345679c",
      "name": "Premium Wireless Headset",
      "price": 99.99,
      "description": "High fidelity noise-cancelling wireless headphones",
      "category": "electronics",
      "images": [
        "images-1717075200000-847294827.jpg"
      ],
      "createdBy": "65f0e34c9c8ef7812345678a",
      "createdAt": "2026-05-30T14:10:00.000Z",
      "updatedAt": "2026-05-30T14:10:00.000Z"
    }
  ]
}
```

---

### Get Product by ID
* **Route:** `/api/products/:id`
* **Method:** `GET`
* **Authentication:** Public

#### Success Response (200 OK)
```json
{
  "statusCode": 200,
  "message": "Product fetched successfully",
  "data": {
    "_id": "65f0e4b29c8ef7812345679c",
    "name": "Premium Wireless Headset",
    "price": 99.99,
    "description": "High fidelity noise-cancelling wireless headphones",
    "category": "electronics",
    "images": [
      "images-1717075200000-847294827.jpg"
    ],
    "createdBy": "65f0e34c9c8ef7812345678a",
    "createdAt": "2026-05-30T14:10:00.000Z",
    "updatedAt": "2026-05-30T14:10:00.000Z"
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "message": "Product not found",
  "errors": []
}
```

#### Error Response (400 Bad Request)
```json
{
  "message": "Invalid product ID",
  "errors": []
}
```

---

### Update Product
* **Route:** `/api/products/:id`
* **Method:** `PUT`
* **Authentication:** Private (JWT Cookie Required)
* **Required Fields:** At least one of `name`, `price`, `description`, `category`, or new file uploads.

#### Request Body (Multipart Form Data or JSON if no files)
```json
{
  "price": 89.99
}
```

#### Success Response (200 OK)
```json
{
  "statusCode": 200,
  "message": "Product updated successfully",
  "data": {
    "_id": "65f0e4b29c8ef7812345679c",
    "name": "Premium Wireless Headset",
    "price": 89.99,
    "description": "High fidelity noise-cancelling wireless headphones",
    "category": "electronics",
    "images": [
      "images-1717075200000-847294827.jpg"
    ],
    "createdBy": "65f0e34c9c8ef7812345678a",
    "createdAt": "2026-05-30T14:10:00.000Z",
    "updatedAt": "2026-05-30T14:20:00.000Z"
  }
}
```

#### Error Response (404 Not Found)
```json
{
  "message": "Product not found",
  "errors": []
}
```

---

### Delete Product
* **Route:** `/api/products/:id`
* **Method:** `DELETE`
* **Authentication:** Private (JWT Cookie Required)

#### Success Response (200 OK)
```json
{
  "statusCode": 200,
  "message": "Product deleted successfully",
  "data": null
}
```

#### Error Response (404 Not Found)
```json
{
  "message": "Product not found",
  "errors": []
}
```
