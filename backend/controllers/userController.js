const User = require('../models/user');
const bcrypt = require ('bcryptjs');

const crearUsuario=async (req,res)=>{
    const{nombre, email, password, rol}= req.body;

    const existe = await User.findOne({email});
    if (existe) return res.status(400).json({message:' el usuario ya existe'});

    const hashedPassword= await bcrypt.hash(password, 10);
    const nuevoUsuario= new User ({ nombre, email, password: hashedPassword, rol});

    const usuarioGuardado= await nuevoUsuario.save();
    res.status(201).json({ id: usuarioGuardado._id, nombre: usuarioGuardado.nombre});
};

const obtenerUsuarios= async (req, res)=>{
    const usuarios= await User.find().select('-password');
    res.json(usuarios);
};

module.exports= {crearUsuario, obtenerUsuarios};
