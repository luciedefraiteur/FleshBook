const express = require('express');
const router = express.Router();
const { registerSinner, loginSinner } = require('../controllers/authController');

router.post('/register', registerSinner);
router.post('/login', loginSinner);

module.exports = router;