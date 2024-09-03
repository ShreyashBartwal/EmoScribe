const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const entryRoutes = require('./routes/entryRoutes'); // Import entryRoutes
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const DB_URI = 'mongodb://localhost:27017/mood_journal'; // Adjust the URI as needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes); // Ensure correct route
app.use('/api', entryRoutes); // Ensure correct route

// Connect to MongoDB
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

module.exports = app;
