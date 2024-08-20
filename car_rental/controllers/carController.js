const Car = require('../models/car');

// Add a new car
exports.addCar = async (req, res) => {
    const car = new Car(req.body);
    car.available = true;
    await car.save();
    res.redirect('/admin/cars');
};

// Get all cars
exports.getAllCars = async (req, res) => {
    const cars = await Car.find();
    res.render('admin/index', { cars });
};

// Edit a car
exports.editCar = async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.render('admin/editCar', { car });
};

// Update a car
exports.updateCar = async (req, res) => {
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/cars');
};

// Delete a car
exports.deleteCar = async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/admin/cars');
};
