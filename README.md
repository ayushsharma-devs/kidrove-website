# 🚀 AI & Robotics Summer Workshop

A modern, responsive workshop landing page inspired by Kidrove, built using React, TypeScript, Tailwind CSS, and Express.js.

Designed to provide a smooth registration experience for parents and students while demonstrating clean component architecture, API integration, responsive UI design, and frontend engineering best practices.

---

## 🌐 Live Demo

**Frontend:** `ADD_DEPLOYMENT_LINK_HERE`

---

## ✨ Features

### 🎨 Modern Responsive UI

* Mobile-first responsive design
* Colorful and kid-friendly interface inspired by Kidrove
* Fully adaptive layout for desktop, tablet, and mobile devices
* Smooth section transitions and modern card-based layouts

### 📚 Workshop Information

* Hero section with call-to-action
* Workshop overview
* Detailed workshop information
* Learning outcomes section
* FAQ section

### 📝 Registration System

* Interactive registration form
* Real-time client-side validation
* Loading states during submission
* Success and error handling
* Backend API integration

### ⚙️ Backend API

Implemented a custom Express.js API endpoint:

```http
POST /api/enquiry
```

Features:

* Request validation
* Error handling
* JSON responses
* CORS support
* RESTful architecture

### 💾 Lightweight Persistence Layer

Instead of relying on an external database, enquiries are persisted locally using JSON storage.

Each enquiry contains:

* Name
* Email
* Phone number
* Submission timestamp

This approach keeps the application lightweight while maintaining a clean separation between frontend and backend layers.

---

## 🏗 Architecture

```text
Frontend (React + TypeScript)
            ↓
Form Validation
            ↓
Express REST API
            ↓
Enquiry Processing
            ↓
JSON Persistence Layer
```

---

## 📂 Project Structure

```text
kidrove-workshop/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── server/
│   ├── index.js
│   ├── enquiries.json
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Data Layer

* JSON Persistence

### Tooling

* ESLint
* npm

---

## 📱 Responsive Design

Designed and tested for:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

---

### Install frontend dependencies

```bash
cd client
npm install
```

Run frontend:

```bash
npm run dev
```

---

### Install backend dependencies

```bash
cd server
npm install
```

Run backend:

```bash
node index.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## Example API Request

### POST /api/enquiry

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

Response:

```json
{
  "success": true,
  "message": "Enquiry submitted successfully"
}
```

---

## Highlights

* Component-driven architecture
* TypeScript support
* Tailwind CSS styling
* Responsive design
* REST API integration
* Input validation
* Loading states
* Error handling
* Local data persistence
* Clean project structure

---

Built as a frontend engineering assignment showcasing modern React development practices and backend API integration.
