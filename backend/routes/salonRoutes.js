const express = require('express');
const router = express.Router();

const { crearSalon, obtenerSalones } = require('../controllers/salonController');
const { protect, autorizado } = require('../middlewares/authMiddleware');

// Solo admin puede crear un salón
router.post('/', protect, autorizado('admin'), crearSalon);

// Solo admin puede listar salones
router.get('/', protect, autorizado('admin'), obtenerSalones);

module.exports = router;