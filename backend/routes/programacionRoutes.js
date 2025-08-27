const express = require('express');
const router = express.Router();

const { crearProgramacion, obtenerProgramaciones } = require('../controllers/programacionController');
const { protect, autorizado } = require('../middlewares/authMiddleware');

// Solo admin puede crear una programación
router.post('/', protect, autorizado('admin'), crearProgramacion);

// Solo admin puede listar programaciones
router.get('/', protect, autorizado('admin'), obtenerProgramaciones);

module.exports = router;