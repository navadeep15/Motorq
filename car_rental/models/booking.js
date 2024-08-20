const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    customerName: String,
    customerEmail: String,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Booking', bookingSchema);
