const express = require('express');
const router = express.Router();
const { createOffrande, getOffrandes, getOffrandeById, updateOffrande, deleteOffrande } = require('../controllers/offrandeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOffrande).get(protect, getOffrandes);
router.route('/:id').get(protect, getOffrandeById).put(protect, updateOffrande).delete(protect, deleteOffrande);

module.exports = router;