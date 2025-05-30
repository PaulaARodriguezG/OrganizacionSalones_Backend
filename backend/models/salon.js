const mongoose= require('mongoose');
const salonSchema= new mongoose.Schema({
    nombre: { type: String, required: true},
    capacidadMaxima:{type:Number, required:true},
    sede:{type:mongoose.Schema.Types.ObjectId, ref:'Sede', required:true},
    dispositivos:[{type:String}]
}, {timestamps:true});

module.exports=mongoose.model('Salon', salonSchema);
