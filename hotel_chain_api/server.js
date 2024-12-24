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
const shiftRoutes = require('./routes/shiftRoutes');
const hotelRevenueRoutes = require('./routes/hotelRevenueRoutes');
// const departmentRoutes = require('./routes/departmentRoutes');  
// const staffRoutes = require('./routes/staffRoutes');
// const jobAssignmentRoutes = require('./routes/jobAssignmentRoutes');

// Use routes
app.use('/api', hotelRoutes);
app.use('/api', guestRoutes);
app.use('/api', shiftRoutes);
app.use('/api', hotelRevenueRoutes);
// app.use('/api', departmentRoutes);
// app.use('/api', staffRoutes);
// app.use('/api', jobAssignmentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
