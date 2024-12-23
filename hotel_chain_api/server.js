const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Import routes
const hotelRoutes = require('./routes/hotelRoutes');

// Use routes
app.use('/api', hotelRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
