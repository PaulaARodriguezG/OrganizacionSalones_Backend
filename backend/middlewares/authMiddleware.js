const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AsyncHandler = require("express-async-handler");

const protect = AsyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado: token faltante" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(decoded.id).select("-password");
    if (!usuario)
      return res.status(401).json({ message: "Usuario no encontrado" });
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
  if (!token) {
    res.status(401);
    throw new Error("No autorizado(no token)");
  }
});

const autorizado = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("No esta autorizado(role)");
    }
    next();
  };  
};

module.exports = { protect, autorizado};
