const jwt = require('jsonwebtoken')

//se puede agregar mas info al payload segun sea necesario para los autorizacionse como el rol
const generateToken = (id, role) =>{
  return jwt.sign({id, role}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  })
}


module.exports = generateToken;
