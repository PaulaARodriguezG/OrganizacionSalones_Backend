const Programacion=require('../models/Programacion');
const validarSolapamiento= async (salonId, nuevaFechaInicio, nuevaFechaFin)=>{
    const conflicto =await Programacion.findOne({
        salon:salonId,
        fechaInicio:{$lt:nuevaFechaFin},
        fechaFin: {$gt:nuevaFechaInicio}
    });

    return !!conflicto;
};

module.exports=validarSolapamiento;