const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/cars', carController.getAllCars);
router.get('/cars/add', (req, res) => res.render('admin/addCar'));
router.post('/cars/add', carController.addCar);
router.get('/cars/edit/:id', carController.editCar);
router.post('/cars/edit/:id', carController.updateCar);
router.post('/cars/delete/:id', carController.deleteCar);

module.exports = router;
