<template>
    <div>
      <h1>Mis Eventos</h1>
      <ul>
        <li v-for="evento in misEventos" :key="evento._id">{{ evento.titulo }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  export default {
    name: 'MyEvents',
    setup() {
      const misEventos = ref([]);
      onMounted(async () => {
        // Suponiendo que ya tienes una ruta en el backend para obtener los eventos inscritos
        const res = await fetch('http://localhost:3000/api/users/miseventos');
        misEventos.value = await res.json();
      });
      return { misEventos };
    }
  };
  </script>
  