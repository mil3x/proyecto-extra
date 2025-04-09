const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true },
  creadoPor: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Evento', eventoSchema);
