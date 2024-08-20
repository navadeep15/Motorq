const Car = require('../models/car');
const Booking = require('../models/booking');

// Browse available cars (Customer)
exports.browseCars = async (req, res) => {
    const filters = {};
    if (req.query.fuelType) filters.fuelType = req.query.fuelType;
    if (req.query.make) filters.make = req.query.make;
    if (req.query.minRent && req.query.maxRent) {
        filters.rentPerDay = { $gte: req.query.minRent, $lte: req.query.maxRent };
    }

    const cars = await Car.find({ available: true, ...filters });
    res.render('customer/browseCars', { cars });
};

// Book a car (Customer)
exports.bookCar = async (req, res) => {
    const { carId, customerName, customerEmail, startDate, endDate } = req.body;
    
    const overlappingBookings = await Booking.find({
        carId,
        $or: [
            { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
        ]
    });

    if (overlappingBookings.length > 0) {
        return res.send("Car is already booked for the selected dates.");
    }

    const booking = new Booking({
        carId,
        customerName,
        customerEmail,
        startDate,
        endDate
    });

    await booking.save();

    await Car.findByIdAndUpdate(carId, { available: false });

    res.redirect('/cars');
};
