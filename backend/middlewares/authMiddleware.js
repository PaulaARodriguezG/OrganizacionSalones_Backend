const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AsyncHandler = require("express-async-handler");

const protect = AsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await User.findById(decoded.id).select("-password");
      if (!usuario) {
        res.status(401);
        throw new Error("Usuario no encontrado");
      }
      req.user = usuario; // Asignar usuario para el siguiente middleware
      return next();
    } catch (error) {
      res.status(401);
      throw new Error("Token inválido o expirado");
    }
  } else {
    res.status(401);
    throw new Error("No autorizado: token faltante");
  }
});

const autorizado = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.rol)) {  
      return next();
    } else {
      res.status(403);
      throw new Error("No está autorizado");
    }
  };
};

module.exports = { protect, autorizado };