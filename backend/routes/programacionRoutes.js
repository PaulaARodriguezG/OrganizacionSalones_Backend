const express = require('express');
const router = express.Router();
const { crearProgramacion}= require ('../controllers/programacionController');
const { protect} = require ('../middlewares/authMiddleware');

const routes = router.post('/', protect (['admin']), crearProgramacion);

module.exports = routes;