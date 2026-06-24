# E-Commerce Product API

A RESTful API for managing products with user authentication, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication** — Register, login, logout with JWT stored in httpOnly cookies
- **Product CRUD** — Create, read, update, and soft-delete products
- **Image Uploads** — Upload up to 5 images per product (JPEG, PNG, WEBP)
- **Category Filtering** — Filter products by category
- **Pagination** — Paginated product listing
- **Rate Limiting** — Global and auth-specific rate limiters
- **Input Validation** — Server-side validation for all inputs
- **Ownership Enforcement** — Only product owners can update/delete their products

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT (jsonwebtoken) via httpOnly cookies
- **Password Hashing:** bcryptjs
- **File Uploads:** Multer
- **Rate Limiting:** express-rate-limit

## Prerequisites

- Node.js v18+
- MongoDB instance (local or MongoDB Atlas)

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd review3
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example env file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   Required variables:
   | Variable | Description |
   |----------|-------------|
   | `MONGO_URI` | MongoDB connection string |
   | `JWT_SECRET` | Secret key for JWT signing |
   | `CLIENT_URL` | Frontend URL for CORS (e.g., `http://localhost:3000`) |
   | `CLIENT_URL_PROD` | Production frontend URL |
   | `NODE_ENV` | `development` or `production` |

4. **Start the server**

   ```bash
   # Development (auto-restart on changes)
   npm run dev

   # Production
   npm start
   ```

   The server runs on `http://localhost:8000` by default.

## API Endpoints

### Authentication

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| `POST` | `/api/user/register` | Register a new user | Public |
| `POST` | `/api/user/login` | Login and receive JWT cookie | Public |
| `POST` | `/api/user/logout` | Clear JWT cookie | Public |

### Products

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| `GET` | `/api/products` | List products (supports `?category`, `?page`, `?limit`) | Public |
| `GET` | `/api/products/:id` | Get product by ID | Public |
| `POST` | `/api/products` | Create product (multipart/form-data) | Private |
| `PUT` | `/api/products/:id` | Update product | Private (owner) |
| `DELETE` | `/api/products/:id` | Soft-delete product | Private (owner) |

### Health Check

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/check` | API health check |

## Project Structure

```
src/
├── config/          # Environment config, database connection
├── controllers/     # Request handlers
├── middlewares/      # Auth, rate limiting, error handling, file upload
├── models/          # Mongoose schemas (User, Product)
├── routes/          # Route definitions
├── services/        # Business logic
├── utils/           # ApiError, ApiResponse, token generation
└── validators/      # Input validation functions
```

## License

ISC
