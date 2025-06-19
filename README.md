# MERN Stack E-Commerce Web Application

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a modern, scalable approach to online shopping, including user authentication, product management, and a responsive UI.

---

## Features

- **User Authentication:** Register, login, and manage user sessions securely.
- **Product Catalog:** Browse, search, and filter products with detailed views.
- **Shopping Experience:** Add to cart, view product details, and filter by price.
- **Admin Panel:** Add new products, manage users, and perform admin actions.
- **Responsive Design:** Fully responsive UI with modern navigation and layout.
- **Search Functionality:** Real-time product search with instant results.
- **Secure Payments (UI):** UI ready for payment integration (Visa, Mastercard, UPI, PayPal).
- **User Profile (UI):** User profile page (expandable for order history, etc.).
- **24x7 Support (UI):** UI elements for customer support and return policy.

---

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **API Requests:** Axios
- **Development Tools:** Nodemon, dotenv, express-validator

---

## Folder Structure

```
e-commerce-webapp/
  client/         # React frontend
    src/
      component/  # UI and layout components
      pages/      # Main pages (Home, Shop, Product, Auth, Admin)
      redux/      # Redux store and slices
      data/       # Static data
      helpers/    # Helper functions
  server/         # Node.js/Express backend
    controller/   # Route controllers
    model/        # Mongoose models
    routes/       # API routes
    configs/      # Config files (DB, JWT, bcrypt)
```

---

## Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/LuvAgrawal/e-commerce-webapp.git
cd e-commerce-webapp
```

### 2. Install dependencies

#### For the backend:

```bash
cd server
npm install
```

#### For the frontend:

```bash
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server/` directory with:

```
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_NUM=SaltRound
```

### 4. Run the application

#### Start the backend server:

```bash
cd server
npm run dev
```

#### Start the frontend React app:

```bash
cd ../client
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080](http://localhost:8080)

---

## API Overview

### Product Routes

- `GET /products` — List all products

### User Routes

- `POST /users/register` — Register a new user
- `POST /users/login` — Login user

### Admin Routes

- `GET /admin` — List all users (admin only)
- `DELETE /admin/:_id` — Delete user (admin only)
- `PUT /admin/:_id` — Update user (admin only)

---

## Contribution

Contributions are welcome! Please open issues or submit pull requests for improvements and new features.

---

## License

This project is licensed under the [ISC License](LICENSE).

---

## Contact

- **Author:** Luv Agrawal
- **Email:** la24092002@gmail.com
- **Project Link:** [https://github.com/LuvAgrawal/e-commerce-webapp](https://github.com/LuvAgrawal/e-commerce-webapp) 