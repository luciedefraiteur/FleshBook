const express = require('express');
const router = express.Router();
const { getSinnerProfile, updateSinnerProfile, getSinnerById } = require('../controllers/sinnerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getSinnerProfile).put(protect, updateSinnerProfile);
router.route('/:id').get(protect, getSinnerById);

module.exports = router;