const express = require('express');
const router = express.Router();
const {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento
} = require('../controllers/eventoController');

router.get('/', obtenerEventos);
router.post('/', crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

module.exports = router;
