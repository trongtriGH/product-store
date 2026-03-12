# 🛒 Product Store

A full-stack **Product Store application** built with the **PERN stack** (PostgreSQL, Express, React, Node.js).
The app provides a clean interface for managing products while implementing modern best practices such as **rate limiting, bot detection, global state management, and full-stack error handling**.

🌐 **Live Demo:**
https://product-store-fed9.onrender.com

---

# ✨ Features

* 🧱 **Full-stack PERN application**
* 🎨 **Modern UI** built with **TailwindCSS** and **DaisyUI**
* 🚀 **Rate limiting & bot detection** using Arcjet
* 🗂 **Global state management** with Zustand
* 🐞 **Error handling** on both client and server
* 🌍 **Deployed on Render**

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* Arcjet (rate limiting & bot detection)

### Frontend

* React
* TailwindCSS
* DaisyUI
* Zustand
* Axios

### Deployment

* Render

---

# ⚙️ Environment Variables

Create a `.env` file in the **root directory**:

```
PORT=3000

PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGHOST=your_postgres_host
PGDATABASE=your_postgres_database

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

# 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/product-store.git
cd product-store
```

---

### 2. Install dependencies

Install backend dependencies:

```
npm install
```

Install frontend dependencies:

```
npm install --prefix frontend
```

---

### 3. Run the backend API

```
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

### 4. Run the frontend

```
cd frontend
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📦 Production Build

To build the frontend and run the production server:

```
npm run build
npm start
```

---

# 🌍 Deployment

This project is deployed using **Render**.
The frontend is built and served by the backend in production.

Live deployment:
https://product-store-fed9.onrender.com
