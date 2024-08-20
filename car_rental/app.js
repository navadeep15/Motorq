const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// Database connection
mongoose.connect('mongodb://localhost/car_rental_service_1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/cars');
});


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/admin', adminRoutes);
app.use('/', customerRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
