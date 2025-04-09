const Evento = require('../models/Evento');

// para crear un evento
const crearEvento = async (req, res) => {
  const { titulo, descripcion, fecha, lugar, creadoPor } = req.body;

  try {
    // validaciones adicionales sobre creadoPor
    const nuevoEvento = new Evento({
      titulo,
      descripcion,
      fecha,
      lugar,
      creadoPor  // se espera que sea un objeto con { name, email }
    });
    await nuevoEvento.save();
    res.status(201).json({ msg: 'Evento creado exitosamente', evento: nuevoEvento });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el evento', error: error.message });
  }
};

// Obtener todos los eventos
const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ fecha: 1 });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener eventos', error: error.message });
  }
};

// Actualizar evento
const actualizarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ msg: 'Evento actualizado', evento: eventoActualizado });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar evento', error: error.message });
  }
};

// Eliminar evento
const eliminarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    await Evento.findByIdAndDelete(id);
    res.json({ msg: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar evento', error: error.message });
  }
};

module.exports = {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento
};
