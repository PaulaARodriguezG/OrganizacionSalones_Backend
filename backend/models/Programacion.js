const mongoose= require ('mongoose');

const programacionSchema= new mongoose.Schema({
    salon:{ type: mongoose.Schema.Types.ObjectId, ref:'Salon', required: true},
    curso:{ type:String, required: true},
    fechaInicio:{ type: Date, required: true},
    fechaFin:{type: Date, required:true},
    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true}
}, {timestamps:true});

module.exports=mongoose.model('Programacion', programacionSchema);
