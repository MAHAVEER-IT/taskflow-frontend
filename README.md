# TaskFlow React Frontend

🚀 Production-quality React frontend for TaskFlow Support Assistant

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Configuration](#environment-configuration)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)

---

## Overview

TaskFlow Frontend is a modern React application for an AI-powered customer support system featuring:

- 🔐 **Google OAuth** - Secure authentication
- 💬 **AI Chat Widget** - Real-time chat with assistant
- 🎫 **Ticket Management** - Create, view, and track tickets
- 📊 **Dashboard** - Personalized overview
- 👨‍💼 **Admin Panel** - Manage all tickets
- 📱 **Responsive** - Works on all devices
- 🎨 **Light SaaS Theme** - Clean, modern design

---

## Tech Stack

- **React 19** - UI framework
- **Vite 8** - Build tool
- **React Router 7** - Routing
- **Tailwind CSS 3** - Styling
- **Axios** - HTTP client
- **Google OAuth** - Authentication
- **React Icons** - Icon library

---

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm run dev
```

Access at: **http://localhost:5173**

---

## Project Structure

```
src/
├── pages/               # Page components
├── components/          # Reusable components
├── context/             # Auth context
├── services/            # API services
├── routes/              # Route protection
├── layouts/             # Layout components
├── App.jsx              # Main app
├── main.jsx             # Entry point
└── index.css            # Global styles
```

---

## Features

✅ Google OAuth login  
✅ Floating chat widget  
✅ Chat history view  
✅ Ticket creation & tracking  
✅ User dashboard  
✅ Admin ticket management  
✅ Role-based access control  
✅ Responsive design  
✅ Light theme (no dark mode)  
✅ Production-ready code

---

## Environment Configuration

Create `.env`:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
VITE_API_URL=http://localhost:5000
VITE_APP_ENV=development
```

---

## Running Locally

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## API Integration

Endpoints used:
- `POST /api/auth/google` - Login
- `POST /api/chat` - Send message
- `GET /api/chat/history` - Get history
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - Get tickets
- `PATCH /api/tickets/:id` - Update ticket

---

## Deployment

### Vercel (Recommended)

```bash
git push origin main
# Connect to Vercel - auto-deploys
```

### Netlify

```bash
npm run build
# Deploy dist/ folder
```

---

**Version 1.0.0** | Made for TaskFlow Support Assistant
