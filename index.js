const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const eventoRoutes = require('./routes/eventoRoutes');
app.use('/api/eventos', eventoRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando en eventos_app6');
});

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
