const express = require('express');
const router = express.Router();

const {crearUsuario, obtenerUsuarios}= require ('../controllers/userController');
const {protect} = require ('../middlewares/authMiddleware');

//solo admin crear ususario
router.post('/', protect(['admin']), crearUsuario);

// solo admin listar usuarios
router.get('/', protect(['admin']), obtenerUsuarios);

module.exports = router;


