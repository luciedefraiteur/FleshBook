const express = require('express');
const router = express.Router();
const { createCercle, getCercles, getCercleById, updateCercle, deleteCercle, addUserToCercle, removeUserFromCercle } = require('../controllers/cercleController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createCercle).get(protect, getCercles);
router.route('/:id').get(protect, getCercleById).put(protect, updateCercle).delete(protect, deleteCercle);
router.route('/:id/members').post(protect, addUserToCercle);
router.route('/:id/members/:userId').delete(protect, removeUserFromCercle);

module.exports = router;