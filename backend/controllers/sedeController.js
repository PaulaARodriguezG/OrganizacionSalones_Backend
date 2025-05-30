const asyncHandler = require("express-async-handler");
const Sede = require("../models/sede");

// @desc    Crear una nueva sede
// @route   POST /api/sedes
// @access  Private/Admin
const crearSede = asyncHandler(async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    res.status(400);
    throw new Error("Debe ingresar el nombre de la sede");
  }
  if (nombre !== "Sur" && nombre !== "Norte") {
    res.status(400);
    throw new Error("El nombre de la sede debe ser 'Sur' o 'Norte'.");
  }

  const sedeExists = await Sede.findOne({ nombre });
  if (sedeExists) {
    res.status(400);
    throw new Error("La sede ya existe");
  }

  const sede = await Sede.create({
    nombre,
  });
  if (sede) {
    res.status(201).json(sede);
  } else {
    res.status(400);
    throw new Error("Datos de sede invalidos");
  }
});

const obtenerSedes = async (req, res) => {
  const sedes = await Sede.find();
  res.json(sedes);
};

module.exports = { crearSede, obtenerSedes };
