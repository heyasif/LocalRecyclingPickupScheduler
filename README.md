# Local Recycling Pickup Scheduler

## Overview

A full-stack MERN application that enables users to schedule recycling pickups with local vendors.  
Users can sign up, log in, schedule pickups, and view their pickup history. Vendors can log in, view assigned pickups, and mark them as completed.

## Live Demo

- **Frontend:** [https://local-recycling-pickup-scheduler.vercel.app/](https://local-recycling-pickup-scheduler.vercel.app/)
- **Backend:** [https://localrecyclingpickupscheduler.onrender.com/](https://localrecyclingpickupscheduler.onrender.com/)

## Demo Credentials

### User

- **Email:** eve.holt@reqres.in
- **Password:** cityslicka

### Vendor

- **Email:** vendor@example.com
- **Password:** vendor123

## Features

- User registration & authentication (JWT-based)
- Vendor authentication
- Schedule new pickup (select material, date, time, address or use current location)
- View user pickup history
- Vendor view of assigned pickups with filtering (All, Scheduled, Completed) and pagination
- Mark pickups as completed
- Responsive UI built with React & Material UI
- Toast notifications for feedback

## Technologies

- **Frontend:** React, Vite, React Router, Material UI, Notistack for toasts
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **APIs:** OpenStreetMap Nominatim for reverse geocoding
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure

```
frontend/       // React app
  src/
    components/
    pages/
    services/
    App.jsx
    main.jsx
backend/        // Express server
  controllers/
  models/
  routes/
  server.js
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/local-recycling-pickup-scheduler.git
   cd local-recycling-pickup-scheduler
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file:

   ```env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=5001
   JWT_SECRET=<your_jwt_secret>
   ```

   Start the backend server:

   ```bash
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   ```

   Create a `.env` file:

   ```env
   VITE_API_BASE_URL=https://localrecyclingpickupscheduler.onrender.com/api
   ```

   Start the frontend dev server:

   ```bash
   npm run dev
   ```

## API Endpoints

- **POST** `/api/signup` — User registration
- **POST** `/api/login` — User login
- **POST** `/api/vendor-login` — Vendor login
- **GET** `/api/my-pickups` — Get user pickups (auth required)
- **POST** `/api/schedule-pickup` — Schedule a new pickup (auth required)

- **GET** `/api/vendor/pickups` — Get vendor-assigned pickups (vendor auth)
- **PATCH** `/api/vendor/complete/:id` — Mark pickup completed (vendor auth)

## Environment Variables

| Name              | Description                         |
| ----------------- | ----------------------------------- |
| MONGO_URI         | MongoDB connection string           |
| PORT              | Backend server port (default: 5001) |
| JWT_SECRET        | Secret key for JWT token signing    |
| VITE_API_BASE_URL | Base URL for frontend API calls     |

## License

This project is licensed under the MIT License.

---

Feel free to customize any part of this README to fit your repository.
