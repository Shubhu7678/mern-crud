require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// 1. Explicit CORS configuration
const corsOptions = {
  origin: '*', // Or specify your frontend URL: 'https://your-frontend.vercel.app'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

app.use(express.json());

// 2. Cached Database Connection Middleware for Serverless Environment
let isConnected = false;

const connectDB = async (req, res, next) => {
  if (isConnected) {
    return next();
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(500).json({ message: 'Database connection failed' });
  }
};

// Apply DB connection to all API routes
app.use('/api', connectDB);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: Object.values(error.errors).map((item) => item.message).join(', ')
    });
  }

  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

// 3. Local Development vs. Vercel Export
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
}

// Export app for Vercel Serverless Function
module.exports = app;