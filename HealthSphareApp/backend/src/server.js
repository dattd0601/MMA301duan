require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const exerciseRoutes = require('./routes/exerciseRoutes');
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Content API Routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('HealthSphareApp API is running');
});

// Database connection
const PORT = process.env.PORT || 5005;
const MONGODB_URI = process.env.MONGODB_URI;

console.log(`Attempting to start server on port: ${PORT}`);
if (!MONGODB_URI) {
  console.error('CRITICAL ERROR: MONGODB_URI is not defined in environment variables!');
  process.exit(1);
}

// Masking URI for security in logs
const maskedURI = MONGODB_URI.replace(/:([^@]+)@/, ':****@');
console.log(`Connecting to MongoDB Atlas...`);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error details:', err.message);
    process.exit(1);
  });
