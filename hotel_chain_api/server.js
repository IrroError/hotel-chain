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
const guestRoutes = require('./routes/guestRoutes');
const roomRoutes = require('./routes/roomRoutes');
const cors = require('cors');
app.use(cors());
// Use routes
app.use('/api', hotelRoutes);
app.use('/api', guestRoutes);
app.use('/api', roomRoutes)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
