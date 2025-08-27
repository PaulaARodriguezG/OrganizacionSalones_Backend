const express = require('express');
const router = express.Router();

const { crearUsuario, obtenerUsuarios } = require('../controllers/userController');
const { protect, autorizado } = require('../middlewares/authMiddleware');

// Solo admin puede crear un usuario
router.post('/', protect, autorizado('admin'), crearUsuario);

// Solo admin puede listar usuarios
router.get('/', protect, autorizado('admin'), obtenerUsuarios);

module.exports = router;