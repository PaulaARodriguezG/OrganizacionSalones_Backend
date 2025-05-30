const express = require('express');
const router = express.Router();

const {crearSede, obtenerSedes}= require ('../controllers/sedeController');
const {protect} = require ('../middlewares/authMiddleware');

//solo admin crea sede
router.post('/', protect(['admin']),crearSede);

//usuarios visualizan sedes
router.get('/', protect(), obtenerSedes);

module.exports = router;
