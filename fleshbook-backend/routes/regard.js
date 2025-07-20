const express = require('express');
const router = express.Router();
const { getRegardAbyssal } = require('../controllers/regardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRegardAbyssal);

module.exports = router;