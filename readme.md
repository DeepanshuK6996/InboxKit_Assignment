# 🗺️Conquest.io

A real-time multiplayer territory claiming game where players compete to claim cells on a shared grid. Built with React, Node.js, Socket.IO, and PostgreSQL.

## ✨ Features

### Real-Time Gameplay
- **Live Multiplayer**: See other players' moves in real-time
- **Active Player Tracking**: View how many players are online
- **Instant Updates**: Cell claims are synchronized across all connected clients

### Interactive Map
- **Dot Grid Visualization**: Clean, scalable grid-based map
- **Color-Coded Territories**: Each player gets a unique random color
- **Hover Effects**: Visual feedback when hovering over cells
- **Glow Effects**: Claimed cells glow with their owner's color

### Player Stats & Leaderboard
- **Real-Time Leaderboard**: Top 3 players with most claimed cells
- **Personal Stats**: Track your own claimed territories
- **Live Statistics**: See total claimed vs unclaimed cells
- **Trophy System**: First place gets a trophy emoji 🏆

### Modern UI/UX
- **Dark Theme**: Sleek black background with white accents
- **Animated Background**: Dotted glow background effect
- **Smooth Transitions**: Fast hover animations (150ms)
- **Responsive Layout**: Optimized for full-screen viewing
- **Glass Morphism**: Cards with backdrop blur effects

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **Socket.IO Client** - Real-time bidirectional communication
- **Tailwind CSS** - Utility-first styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - WebSocket implementation
- **Drizzle ORM** - TypeScript ORM
- **PostgreSQL (Neon)** - Database

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Neon account)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/territory-conquest.git
cd territory-conquest
```

### 2. Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the backend directory:
```env
DATABASE_URL=your_postgresql_connection_string
```

### 4. Database Setup

The database uses the following schema:

```sql
CREATE TABLE cells (
  id SERIAL PRIMARY KEY,
  x INTEGER,
  y INTEGER,
  owner TEXT,
  color TEXT
);
```

### 5. Run the application

**Start Backend Server:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173` (or your Vite default port).

## 🎮 How to Play

1. **Enter Your Username**: Set your player name in the "Your Profile" card
2. **Your Color**: You're automatically assigned a unique color
3. **Claim Cells**: Click on any gray (unclaimed) cell to claim it
4. **Track Progress**: Watch your claimed cell count increase
5. **Compete**: Climb the leaderboard by claiming more cells than others
6. **Watch Others**: See other players claiming cells in real-time

## 📁 Project Structure

```
Conquest.io/
├── backend/
│   ├── db/
│   │   ├── db.js                          # Database connection
│   │   └── schema.js                      # Drizzle schema definition
│   ├── .env                               # Environment variables
│   ├── drizzle.config.js                  # Drizzle ORM configuration
│   └── index.js                           # Express + Socket.IO server
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── Globe.jsx                  # Globe component
│   │   │   ├── Grid.jsx                   # Grid component
│   │   │   └── NavBar.jsx                 # Navigation bar
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx            # Landing/home page
│   │   │   └── MapPage.jsx                # Main game page
│   │   ├── App.css                        # Global styles
│   │   ├── App.jsx                        # Root component
│   │   ├── index.css                      # Base CSS
│   │   └── main.jsx                       # App entry point
│   ├── components.json                    # UI components config
│   ├── index.html                         # HTML template
│   └── vite.config.js                     # Vite configuration
|
|── .gitignore
│
└── README.md                              # Main project documentation
```