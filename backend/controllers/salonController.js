const Salon = require('../models/salon');

const crearSalon = async (req, res) => {
  const { nombre, capacidadMaxima, sede, dispositivos } = req.body;

  const nuevoSalon = new Salon({ nombre, capacidadMaxima, sede, dispositivos });
  const guardado = await nuevoSalon.save();

  res.status(201).json(guardado);
};

const obtenerSalones = async (req, res) => {
  const salones = await Salon.find().populate('sede', 'nombre');
  res.json(salones);
};

module.exports = { crearSalon, obtenerSalones };