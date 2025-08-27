const Programacion = require('../models/Programacion');
const validarSolapamiento = require('../utils/validateOverlap');

const crearProgramacion = async (req, res) => {
  try {
    const { salon, curso, fechaInicio, fechaFin } = req.body;

    if (!salon || !curso || !fechaInicio || !fechaFin) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar que la fecha de inicio sea antes de la fecha final
    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      return res.status(400).json({ message: 'La fecha de inicio debe ser antes de la fecha final' });
    }

    // Validar solapamientos
    const existeSolapamiento = await validarSolapamiento(salon, fechaInicio, fechaFin);
    if (existeSolapamiento) {
      return res.status(409).json({ message: 'El salón ya está ocupado en ese horario' });
    }

    // Crear la programación
    const nuevaProgramacion = new Programacion({
      salon,
      curso,
      fechaInicio,
      fechaFin,
      creadoPor: req.user.id
    });

    const programacionGuardada = await nuevaProgramacion.save();
    return res.status(201).json(programacionGuardada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la programación' });
  }
};

const obtenerProgramaciones = async (req, res) => {
  try {
    const programaciones = await Programacion.find();
    return res.status(200).json(programaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las programaciones' });
  }
};

module.exports = { crearProgramacion, obtenerProgramaciones };