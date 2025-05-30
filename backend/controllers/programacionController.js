const Programacion=require('../models/Programacion');
const validarSolapamiento= require('../utils/validateOverlap');

const crearProgramacion = async (req,res) =>{
    try{
        const{ salon, curso, fechaInicio, fechaFin}= req.body;

        if(!salon || !curso || !fechaInicio || !fechaFin){
            return res.status(400).json({message: 'Todos los campos son obligatorios'})
        }

        //validar las fechas
        if (new Date(fechaInicio)>= new Date(fechaFin)){
            return res.status(400).json({ message:'la fecha de inicio debe ser antes de la fecha final'});
        }

        //validar solapamientos
        const existeSolapamiento= await validarSolapamiento(salon, fechaInicio, fechaFin);
        if (existeSolapamiento){
            return res.status(409).json({message:' el salon ya esta ocupado en ese horario'});
        }

        //crear programacion
        const nuevaProgramacion = new Programacion({
            salon,
            curso,
            fechaInicio,
            fechaFin,
            creadoPor: req.user.id
        });

        const programacionGuardada = await nuevaProgramacion.save();

        res.sattus(201).json(programacionGuardada);
    } catch (error){
        console.error(error);
        res.status(500).json({message:'error al crear la programacion'});
    }
};

module.exports ={ crearProgramacion};
