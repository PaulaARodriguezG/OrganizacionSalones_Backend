const express = require ('express');
const router = express.Router();

const {crearSalon, obtenerSalones}= require ('../controllers/salonController');
const {protect} = require ('../middlewares/authMiddleware');

//rutas de gestion salones

router.post('/', protect(['admin']), crearSalon); //solo admin puede crear un salon
router.get('/', protect(), obtenerSalones); // usuario autenticado puede ver los salones

module.exports = router;
