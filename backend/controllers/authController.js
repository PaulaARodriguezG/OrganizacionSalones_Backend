const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

//@desc Registrar usuario
//@route POST /api/auth/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Complete todos los campos");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Datos invalidos");
  }
});

// @desc    Inicio de sesion para el usuario
// @route   POST /api/auth/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Complete todos los campos");
  }

  const usuario = await User.findOne({ email });
  valido = await bcrypt.compare(password, usuario.password);
  if (usuario && valido) {
    res.json({
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
      token: generateToken(usuario._id, usuario.role),
    });
  } else {
    res.status(401);
    throw new Error("Credenciales invalidas");
  }
});


// @desc    Obtener perfil del usuario loguedo
// @route   POST /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404); //Not found
    throw new Error("Usuario no encontrado");
  }
});

module.exports = { loginUser, registerUser, getMe };
