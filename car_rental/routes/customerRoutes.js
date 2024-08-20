const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/cars', bookingController.browseCars);
router.post('/cars/book', bookingController.bookCar);

module.exports = router;
