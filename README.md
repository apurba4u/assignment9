# 📚 StudyNook – Study Room Booking Platform

## 📖 Description

StudyNook is a modern full-stack web application that enables students and library users to easily discover, book, and manage study rooms. Room owners can list and manage their available study spaces, while registered users can browse, search, filter, and reserve rooms for specific dates and time slots. The platform prevents double bookings through automatic time-conflict detection and provides secure authentication using JWT stored in HTTP-only cookies.

---

## 🌐 Live Project

🔗 https://frontend-opal-theta-mydgygpet3.vercel.app/

---

# 🚀 Technologies Used

### Frontend
- React.js
- Next.js
- Tailwind CSS
- JavaScript (ES6+)
- Axios
- React Hook Form
- Framer Motion

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- HTTP-only Cookies

### Deployment
- Vercel
- Render

---

# 📌 Project Overview

StudyNook provides a complete study room reservation system where room owners can publish available study rooms, and users can search, filter, and reserve them based on availability. The application automatically detects booking conflicts to prevent overlapping reservations while offering personalized dashboards for both users and room owners.

---

# ✨ Core Features

- 🔐 Secure user authentication using JWT
- 📚 Browse all available study rooms
- 🔍 Search and filter study rooms
- 📅 Book rooms by selecting date and time
- ⛔ Automatic time-conflict detection to prevent double bookings
- 🏠 Room owners can add, edit, and delete listings
- 📊 User dashboard for managing bookings
- 📱 Fully responsive design for all devices
- ⚡ Fast and intuitive user experience

---

# 📦 Dependencies

### Client

- React
- Next.js
- Tailwind CSS
- Axios
- React Hook Form
- Framer Motion
- React Hot Toast
- Lucide React

### Server

- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- bcryptjs
- dotenv
- CORS

---

# ⚙️ Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/your-username/studynook.git
```

## 2. Move into the project

```bash
cd studynook
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file and add the following variables:

```env
PORT=5000
MONGODB_URI=your_database_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

## 5. Start the backend

```bash
npm run dev
```

## 6. Start the frontend

```bash
npm run dev
```

## 7. Open your browser

```
http://localhost:3000
```

---

# 📂 Project Structure

```
client/
│── app/
│── components/
│── hooks/
│── lib/
│── assets/

server/
│── controllers/
│── middleware/
│── models/
│── routes/
│── utils/
```

---

# 🔗 Resources

### Live Project

https://frontend-opal-theta-mydgygpet3.vercel.app/

### Frontend Repository

https://github.com/your-username/studynook-client

### Backend Repository

https://github.com/your-username/studynook-server

---

# 📄 License

This project is developed for educational and portfolio purposes.
