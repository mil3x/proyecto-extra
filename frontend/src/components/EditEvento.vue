<template>
    <!-- Modal overlay -->
    <div class="modal-overlay">
      <div class="modal-content">
        <!-- Botón para cerrar el modal -->
        <button class="btn-cerrar" @click="closeModal">X</button>
        <h2>Editar Evento</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="titulo">Título:</label>
            <input id="titulo" v-model="form.titulo" type="text" required />
          </div>
          <div>
            <label for="descripcion">Descripción:</label>
            <input id="descripcion" v-model="form.descripcion" type="text" required />
          </div>
          <div>
            <label for="fecha">Fecha:</label>
            <input id="fecha" v-model="form.fecha" type="date" required />
          </div>
          <div>
            <label for="lugar">Lugar:</label>
            <input id="lugar" v-model="form.lugar" type="text" required />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  // Se espera que se reciba un objeto "evento" como prop
  const props = defineProps({
    evento: {
      type: Object,
      required: true
    }
  })
  
  // Se emitirán eventos para cerrar el modal y para avisar de que el evento fue actualizado
  const emit = defineEmits(['close', 'eventoActualizado'])
  
  // Creamos un objeto reactivo "form" para los campos del evento
  const form = ref({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: ''
  })
  
  // Cuando la prop "evento" cambie o al inicio, cargamos sus datos en "form"
  // Nota: Si la fecha viene en formato ISO, convertimos para que se muestre en un input tipo "date"
  watch(
    () => props.evento,
    (nuevoEvento) => {
      if (nuevoEvento) {
        form.value.titulo = nuevoEvento.titulo
        form.value.descripcion = nuevoEvento.descripcion
        form.value.fecha = new Date(nuevoEvento.fecha).toISOString().split('T')[0]
        form.value.lugar = nuevoEvento.lugar
      }
    },
    { immediate: true }
  )
  
  // Función para enviar la actualización
  const submitForm = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/eventos/${props.evento._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
      const data = await res.json()
      if (res.ok) {
        alert("Evento actualizado correctamente")
        // Emitir el evento para actualizar la lista en el componente padre
        emit('eventoActualizado', data.evento)
        // Cerrar el modal
        emit('close')
      } else {
        alert("Error al actualizar: " + data.msg)
      }
    } catch (error) {
      console.error("Error en la petición de edición:", error)
      alert("Ocurrió un error al actualizar el evento.")
    }
  }
  
  // Función para cerrar el modal
  const closeModal = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: #242424;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    width: 400px;
    max-width: 90%;
  }
  
  .btn-cerrar {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  
  form div {
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
  
  button[type="submit"] {
    padding: 0.5em 1em;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #369f6e;
  }
  </style>  