<template>
  <form @submit.prevent="crearEvento">
    <!-- Campos autocompletados de usuario -->
    <div>
      <label for="name">Nombre (Creador):</label>
      <input id="name" v-model="evento.creadoPor.name" type="text" readonly />
    </div>
    <div>
      <label for="email">Email (Creador):</label>
      <input id="email" v-model="evento.creadoPor.email" type="email" readonly />
    </div>
    <!-- Campos del evento -->
    <div>
      <label for="titulo">Título:</label>
      <input v-model="evento.titulo" id="titulo" placeholder="Título del evento" required />
    </div>
    <div>
      <label for="descripcion">Descripción:</label>
      <input v-model="evento.descripcion" id="descripcion" placeholder="Descripción del evento" required />
    </div>
    <div>
      <label for="fecha">Fecha:</label>
      <input v-model="evento.fecha" id="fecha" type="date" required />
    </div>
    <div>
      <label for="lugar">Lugar:</label>
      <input v-model="evento.lugar" id="lugar" placeholder="Lugar del evento" required />
    </div>
    <button type="submit">Crear Evento</button>
  </form>
</template>

<script>
export default {
  name: 'EventoForm',
  data() {
    return {
      evento: {
        creadoPor: {
          name: localStorage.getItem('userName') || '',  // se asume que se guardó en localStorage tras login
          email: localStorage.getItem('userEmail') || ''
        },
        titulo: '',
        descripcion: '',
        fecha: '',
        lugar: ''
      }
    }
  },
  methods: {
    async crearEvento() {
      try {
        const res = await fetch('http://localhost:3000/api/eventos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.evento)
        });
        const data = await res.json();
        if (res.ok) {
          this.$emit('eventoCreado', data.evento);
          // Limpiar los campos del evento, pero mantener el creador
          this.evento.titulo = '';
          this.evento.descripcion = '';
          this.evento.fecha = '';
          this.evento.lugar = '';
        } else {
          alert(data.msg);
        }
      } catch (error) {
        console.error("Error en la creación del evento:", error);
        alert("Ocurrió un error, intenta de nuevo.");
      }
    }
  }
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 1em auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
div {
  margin-bottom: 1em;
}
label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
button {
  padding: 0.5em 1em;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #369f6e;
}
</style>