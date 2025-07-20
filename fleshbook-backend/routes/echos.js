const express = require('express');
const router = express.Router();
const { createEcho, getEchosForOffrande, updateEcho, deleteEcho } = require('../controllers/echoController');
const { protect } = require('../middleware/authMiddleware');

// Note: On passe l'ID de l'offrande en paramètre pour récupérer les échos
router.route('/offrande/:offrandeId').get(protect, getEchosForOffrande);
router.route('/').post(protect, createEcho);
router.route('/:id').put(protect, updateEcho).delete(protect, deleteEcho);

module.exports = router;