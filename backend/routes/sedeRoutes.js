const express = require("express");
const router = express.Router();

const { crearSede, obtenerSedes } = require("../controllers/sedeController");
const { protect, autorizado } = require("../middlewares/authMiddleware");

// Solo admin puede crear una sede
router.post('/', protect, autorizado('admin'), crearSede);

// Solo admin puede obtener la lista de sedes
router.get('/', protect, autorizado('admin'), obtenerSedes);

module.exports = router;