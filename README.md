# 👔 DripWear — AI-Powered Fashion & Virtual Wardrobe OS

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Frontend: React + Vite](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)](frontend)
[![Backend: FastAPI + Python](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12-green)](backend)
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue.svg)](backend)
[![Auth: Firebase](https://img.shields.io/badge/Auth-Firebase%20Authentication-orange.svg)](https://firebase.google.com/)

> **Form is Temporary. Drip is Permanent.**  
> **DripWear** is an enterprise-grade digital wardrobe operating system and AI fashion assistant. Digitization of physical clothing, AI background removal, automated garment tagging, personalized outfit building, weather-aware recommendations, and cost-per-wear analytics — all powered by a production-ready PostgreSQL and Firebase multi-user infrastructure.

---

## 🌟 Key Features

### 📸 1. Digital Wardrobe & Garment Ingestion
- **AI Background Removal & Upload**: Upload garment photos; automatically store high-res images in server media storage.
- **Categorization**: Sort garments into **Tops**, **Bottoms**, **Footwear**, and **Outerwear**.
- **Full Garment Management (CRUD)**: Edit names, prices, brands, seasons, occasions, colors, or replace photos. Change category (e.g. move miscategorized items from *Tops* to *Bottoms*) with instant UI filtering and database sync.
- **Laundry Status Tracking**: Toggle garment status between `Clean` and `Dirty/Laundry`.

### 🎨 2. Interactive Outfit Canvas Builder
- **Visual Canvas**: Drag and drop clothing items on a digital canvas.
- **Outfit Scoring**: Real-time AI style and color harmony matching algorithms.
- **Save & Export**: Store created outfits for any occasion or season.

### 🤖 3. Weather-Aware AI Recommendations
- **Dynamic Suggestions**: Generates curated outfits tailored to your local weather (temperature, humidity, condition) and event occasion.
- **Personalized Palette**: Matches outfits using your active **Style DNA**.

### 📊 4. Wardrobe Analytics & Cost-Per-Wear
- **Metric Insights**: Tracks garment wear counts, total wardrobe valuation (₹), and calculated Cost-Per-Wear metrics.
- **Utilization Charts**: Identify underutilized clothing items in your wardrobe.

### 🔐 5. Multi-User Authentication & Data Isolation
- **Firebase Authentication**: Support for Google 1-Click OAuth and Email/Password sign-in.
- **Persistent Sessions**: Firebase `browserLocalPersistence` maintains user sessions across refreshes and server restarts.
- **Strict Data Scoping**: All database records (garments, outfits, profiles) are strictly isolated by `firebase_uid`.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend UI** | React 18, Vite, TypeScript, TailwindCSS, Framer Motion, Lucide Icons, Zustand (State Management) |
| **Backend API** | Python 3.12, FastAPI, SQLAlchemy 2.0, Pydantic V2, Uvicorn |
| **Database** | PostgreSQL (Production), SQLite (Local Fallback option) |
| **Authentication** | Firebase Auth (Google OAuth & Email/Password), JWT Session Tokens |
| **File Storage** | Server Static Media Storage (`/static/uploads`), Firebase Storage |
| **Deployment** | Netlify (Frontend SPA), PostgreSQL Server / Docker / Render / Railway |

---

## 📁 Repository Structure

```
dripwear/
├── frontend/                     # React + Vite Frontend Application
│   ├── public/
│   │   └── _redirects            # Netlify SPA rewrite rules (/* -> /index.html)
│   ├── src/
│   │   ├── api/                  # Axios API services (auth, wardrobe, media, etc.)
│   │   ├── components/           # UI components, layout shell, modals, drawers
│   │   ├── core/                 # Firebase initialization & auth helpers
│   │   ├── pages/                # Application routes (Wardrobe, OutfitBuilder, Auth, etc.)
│   │   ├── theme/                # Zustand global state store & design tokens
│   │   └── types/                # TypeScript interface definitions
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                      # FastAPI Modular Backend Application
│   ├── app/
│   │   ├── core/                 # Database config, security, JWT dependencies
│   │   ├── domains/              # Domain-Driven Modules
│   │   │   ├── auth/             # User auth sync & user repository
│   │   │   ├── wardrobe/         # Wardrobe items CRUD & PostgreSQL mapping
│   │   │   ├── outfits/          # Outfit canvas builder & relationships
│   │   │   ├── media/            # Image upload handling & static pathing
│   │   │   ├── recommendations/  # AI style recommendation engine
│   │   │   └── users/            # Profile preferences & Style DNA
│   │   ├── uploads/              # Physical server image upload directory
│   │   └── main.py               # FastAPI application entrypoint
│   ├── requirements.txt
│   └── alembic/                  # Database migration configuration
│
├── firestore.rules               # Production Firebase Firestore security rules
├── storage.rules                 # Production Firebase Storage security rules
├── netlify.toml                  # Netlify deployment configuration & redirect rules
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v18+`
- **Python**: `v3.10+`
- **PostgreSQL**: Local PostgreSQL server or PostgreSQL connection string

---

### 1. Backend Setup (FastAPI + PostgreSQL)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables (.env in backend directory)
```

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/dripwear
JWT_SECRET_KEY=your_production_jwt_secret_key_here
JWT_REFRESH_SECRET_KEY=your_production_refresh_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

```bash
# Start FastAPI backend server
uvicorn app.main:app --reload --port 8000
```

The API will be live at `http://localhost:8000`. API Documentation (Swagger) is available at `http://localhost:8000/docs`.

---

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure Environment Variables (.env in frontend directory)
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

```bash
# Run local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 Netlify Deployment Guide

### Why "Page Not Found" (404) Happens on Single Page Apps (SPAs)
Single Page Applications using client-side routing (React Router) require all route paths (e.g., `/dashboard`, `/wardrobe`, `/auth`) to be rewritten to `/index.html` by Netlify's web server.

### Solutions Included
1. **`frontend/public/_redirects`**:
   ```
   /*    /index.html   200
   ```
2. **`netlify.toml`** (Repository Root):
   ```toml
   [build]
     base = "frontend"
     publish = "dist"
     command = "npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Deployment Configuration on Netlify Dashboard
- **Repository**: `https://github.com/Uday-Bhoi/DRIP-WEAR.git`
- **Base Directory**: `frontend`
- **Build Command**: `npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variables**: Add your `VITE_FIREBASE_*` and `VITE_API_BASE_URL` keys in Netlify Site Settings.

---

## 🗺️ Roadmap & Future Enhancements

- [ ] **AI Try-On Simulator**: Virtual mannequin rendering with real-time pose adjustment.
- [ ] **Automated SAM-2 Segmentation**: Instant automatic garment segmentation on mobile upload.
- [ ] **Social Drip Feed**: Share curated outfit capsules with community feedback.
- [ ] **Sub-Category Analytics**: Deep-dive analytics on color palettes and brand frequency.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

<p align="center">Made with ❤️ by the DripWear Team</p>
