const express = require('express');
const router = express.Router();
const {
  getApartments,
  getApartment,
  createApartment,
  updateApartment,
  deleteApartment
} = require('../controllers/apartmentController');

// Public routes
router.route('/').get(getApartments);
router.route('/:id').get(getApartment);

// Protected routes (admin only)
router.route('/').post(createApartment);
router.route('/:id')
.put(updateApartment)
.delete(deleteApartment);

module.exports = router;
