<template>
    <div>
      <ul>
        <!-- v-for itera sobre cada evento en el arreglo "eventos" y los muestra -->
        <li v-for="evento in eventos" :key="evento._id">
          <strong>{{ evento.titulo }}</strong> - 
          {{ new Date(evento.fecha).toLocaleDateString() }} - 
          {{ evento.lugar }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventoList',
    props: {
      // Se espera que el componente reciba un arreglo "eventos"
      eventos: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  