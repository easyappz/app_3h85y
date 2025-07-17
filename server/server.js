const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./apiRoutes');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost/social_network';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
