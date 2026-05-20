# StudyNook

A full-stack library study room booking platform where students can browse, list, and book study rooms with real-time conflict detection.

## Features

- **Room Management** - Create, edit, and delete study room listings
- **Smart Booking** - Book rooms with real-time conflict detection preventing overlapping reservations
- **Advanced Search** - Filter rooms by name, amenities, capacity, and hourly rate
- **JWT Authentication** - Secure cookie-based authentication with HTTP-only cookies
- **Google Login** - Quick sign-in with Google OAuth simulation
- **Dark/Light Theme** - Persistent theme toggle with system preference detection
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Protected Routes** - Role-based access control for private pages

## Tech Stack

### Frontend
- React 18 + Vite
- React Router DOM v6
- Tailwind CSS 3
- Framer Motion
- Axios
- React Hook Form
- Lucide React Icons
- React Hot Toast

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser
- CORS

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd Assignment9

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Environment Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/studynook?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Run Commands

```bash
# Start backend (from backend/ directory)
npm run dev

# Start frontend (from frontend/ directory)
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to the backend at `http://localhost:5000`.

## API Routes

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/me` | Get current user (protected) |
| POST | `/api/auth/logout` | Logout and clear cookie |

### Rooms
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/rooms` | List rooms with filters |
| GET | `/api/rooms/latest` | Get 6 latest rooms |
| GET | `/api/rooms/my-listings` | Get user's rooms (protected) |
| GET | `/api/rooms/:id` | Get room by ID |
| POST | `/api/rooms` | Create room (protected) |
| PUT | `/api/rooms/:id` | Update room (owner only) |
| DELETE | `/api/rooms/:id` | Delete room (owner only) |

### Bookings
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/bookings` | Create booking (protected) |
| GET | `/api/bookings/my` | Get user's bookings (protected) |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking (protected) |
| GET | `/api/bookings/room/:roomId` | Get room's bookings |

## Folder Structure

```
Assignment9/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── roomController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Room.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── roomRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── LoadingSkeleton.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── SectionTitle.jsx
│   │   │   │   └── StatusBadge.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── RoomCard.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useDocumentTitle.js
│   │   ├── layouts/
│   │   │   ├── PrivateLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   ├── pages/
│   │   │   ├── AddRoom.jsx
│   │   │   ├── EditRoom.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── MyListings.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── RoomDetails.jsx
│   │   │   └── Rooms.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Deployment

### Backend (e.g., Render, Railway)
1. Set environment variables in your hosting dashboard
2. Set `NODE_ENV=production`
3. Deploy the `backend/` directory

### Frontend (e.g., Vercel, Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Configure API proxy or update `baseURL` in `src/api/axios.js`

## Booking Conflict Detection

The system prevents overlapping bookings using MongoDB comparison operators:

```javascript
const conflictingBooking = await Booking.findOne({
  roomId,
  date,
  status: 'confirmed',
  $and: [
    { startTime: { $lt: endTime } },
    { endTime: { $gt: startTime } },
  ],
});
```

This ensures no two confirmed bookings can overlap for the same room on the same date.

## License

MIT
