# TaskFlow React Frontend - Installation & Setup Guide

Complete step-by-step guide to install, configure, and run the TaskFlow React frontend.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** 16.0.0 or higher
- **npm** (comes with Node.js) or **yarn**
- **Backend API** running on `http://localhost:5000`
- **Google OAuth Client ID** (obtain from Google Cloud Console)
- A text editor (VS Code recommended)

---

## ✅ Step-by-Step Installation

### Step 1: Navigate to Frontend Directory

```bash
cd taskflow
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- React 19.2.6
- Vite 8.0.12
- React Router 7.0.0
- Tailwind CSS 3.4.1
- Axios 1.6.5
- And more...

Wait for installation to complete (usually 2-5 minutes).

### Step 3: Configure Environment Variables

#### Option A: Using the Example File (Recommended)

```bash
cp .env.example .env
```

Then edit `.env` and update the values.

#### Option B: Create .env File Manually

Create `.env` file in the root directory:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE

# Backend API URL
VITE_API_URL=http://localhost:5000

# Environment
VITE_APP_ENV=development
```

### Step 4: Get Google Client ID

If you don't have a Google Client ID:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable Google+ API:
   - Search "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 Credentials:
   - Go to "Credentials" tab
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add authorized origins:
     - `http://localhost`
     - `http://localhost:5173`
   - Add authorized redirect URIs:
     - `http://localhost:5173/`
   - Click Create
5. Copy the "Client ID" value
6. Paste into `.env` as `VITE_GOOGLE_CLIENT_ID`

Example:
```env
VITE_GOOGLE_CLIENT_ID=306724752669-lpvnl2g5chl0isske6i02r0dbtfqjdgt.apps.googleusercontent.com
```

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Output will show:
```
  VITE v8.0.12  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open **http://localhost:5173** in your browser.

### Verify Installation

1. **Landing Page** - You should see the TaskFlow home page
2. **Try Login** - Click "Sign in with Google"
3. **Google Dialog** - Select your Google account
4. **Dashboard** - You should be redirected to your dashboard

---

## 🔧 Troubleshooting

### Issue: "Cannot find module..."

**Solution:**
```bash
# Clear dependencies
rm -rf node_modules

# Reinstall
npm install

# Try again
npm run dev
```

### Issue: Port 5173 Already in Use

**Solution:**
```bash
# Use different port
npm run dev -- --port 5174
```

Or kill the process using port 5173:

**Windows:**
```powershell
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :5173
kill -9 <PID>
```

### Issue: Google OAuth Not Working

**Problem:** "Invalid Client ID" or blank login button

**Solution:**
1. Check Google Client ID in `.env`
2. Verify `localhost:5173` is in authorized origins (Google Console)
3. Restart dev server (Ctrl+C, then `npm run dev`)
4. Clear browser cache: Ctrl+Shift+Delete

### Issue: Can't Connect to Backend

**Problem:** "Failed to connect to server" or 503 error

**Solution:**
1. Check backend is running:
   ```bash
   # In backend directory
   npm run dev
   ```
2. Verify backend URL in `.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
3. Check backend is listening on port 5000:
   ```bash
   netstat -ano | findstr :5000  # Windows
   lsof -i :5000                  # macOS/Linux
   ```

### Issue: Chat Widget Not Appearing

**Problem:** No chat button visible on dashboard

**Solution:**
1. Check browser console for errors (F12)
2. Verify backend is running and healthy
3. Check that RAG service is running:
   ```bash
   # In RAG_MODEL directory
   python app.py
   ```

### Issue: Styling Looks Wrong

**Problem:** Tailwind styles not applied

**Solution:**
```bash
# Restart dev server
npm run dev

# If still broken:
rm -rf node_modules/.vite
npm run dev
```

---

## 📦 Project Structure

```
taskflow/
├── src/
│   ├── pages/                 # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ChatHistoryPage.jsx
│   │   ├── TicketsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Hero.jsx
│   │   ├── ChatWidget.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── TicketCard.jsx
│   │   ├── LoginButton.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── context/               # State management
│   │   └── AuthContext.jsx
│   │
│   ├── services/              # API services
│   │   ├── authService.js
│   │   ├── chatService.js
│   │   └── ticketService.js
│   │
│   ├── routes/                # Route protection
│   │   └── ProtectedRoute.jsx
│   │
│   ├── layouts/               # Layout components
│   │   ├── UserLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles (Tailwind)
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
│
├── public/                    # Static assets
│   └── vite.svg
│
├── .env.example               # Environment template
├── .env                       # Environment config (actual)
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies
├── README.md                  # Quick start guide
├── tailwind.config.js         # Tailwind config
├── postcss.config.js          # PostCSS config
└── vite.config.js             # Vite config
```

---

## 🎨 Customization

### Change Color Scheme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#2563EB',  // Change this to your color
      },
    },
  },
}
```

### Update Google Client ID

Edit `.env`:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID
```

### Change API URL

Edit `.env`:

```env
VITE_API_URL=http://your-api-url:5000
```

---

## 🧪 Testing the Application

### Test Authentication

1. Open http://localhost:5173
2. Click "Sign in with Google"
3. Select your Google account
4. You should see the dashboard

### Test Chat

1. Go to Dashboard
2. Click the chat button (bottom right)
3. Type a question
4. You should get an AI response

### Test Tickets

1. Go to "My Tickets" page
2. Click "New Ticket"
3. Type a question and submit
4. Ticket should appear in the list

### Test Admin Features

1. Log in with an admin email:
   - `mahaveer.k2023it@sece.ac.in`
   - `madhavakrishnan.t2023cse@sece.ac.in`
2. Click settings icon (⚙️) in navbar
3. You should see admin dashboard
4. You can filter and update tickets

---

## 📱 Testing Responsive Design

### Using Chrome DevTools

1. Open Developer Tools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select different devices:
   - iPhone 12 (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)
4. Test functionality on each

### Testing specific breakpoints

- **Mobile** (320px - 640px): Single column, full-width
- **Tablet** (640px - 1024px): Two columns
- **Desktop** (1024px+): Full layout

---

## 🚀 Building for Production

### Create Production Build

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Preview Production Build

```bash
npm run preview
```

Opens the production build locally (before deployment).

### Build Output

```
dist/
├── index.html             # Main HTML file
├── assets/
│   ├── index-xxx.js       # Main JavaScript bundle
│   ├── index-xxx.css      # Compiled CSS
│   └── ...
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import this repository
4. Set environment variables:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_API_URL` (production URL)
   - `VITE_APP_ENV=production`
5. Click Deploy

### Option 2: Netlify

```bash
npm run build

# Deploy dist/ folder to Netlify
# Or use Netlify CLI:
netlify deploy --prod --dir=dist
```

### Option 3: Self-Hosted (nginx)

```bash
# Build
npm run build

# Copy to nginx
sudo cp -r dist/* /var/www/html/

# Configure nginx for SPA routing (index.html for all 404s)
```

---

## 📊 Performance Tips

- Use production build (`npm run build`)
- Enable gzip compression on server
- Use CDN for static assets
- Cache HTTP headers appropriately
- Monitor bundle size with `npm run build`

---

## 🔒 Security Checklist

- ✅ Use HTTPS in production
- ✅ Set secure cookie flags (httpOnly, secure)
- ✅ Validate inputs on both client and server
- ✅ Use environment variables for secrets
- ✅ Enable CORS properly on backend
- ✅ Regular security audits: `npm audit`

---

## 📚 Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Check code for issues
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Check security issues
npm audit fix        # Fix security issues
```

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Review browser console** (F12 → Console tab)
3. **Check backend logs** in another terminal
4. **Check backend is running** on port 5000
5. **Verify Google OAuth configuration**
6. **Check .env file** for correct values

---

## 📝 Next Steps

1. ✅ Install dependencies (`npm install`)
2. ✅ Configure `.env` with Google Client ID
3. ✅ Start backend API (`npm run dev`)
4. ✅ Start frontend (`npm run dev`)
5. ✅ Test login and features
6. ✅ Deploy when ready

---

**Happy coding! 🎉**

For more info, see [README.md](./README.md)

Version: 1.0.0  
Last Updated: 2024-01-15
