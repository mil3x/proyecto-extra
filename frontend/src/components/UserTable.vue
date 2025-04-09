<template>
    <div>
      <h2>Lista de Eventos</h2>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Lugar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datos" :key="index">
            <td>{{ item.creadoPor?.name }}</td>
            <td>{{ item.creadoPor?.email }}</td>
            <td>{{ item.titulo }}</td>
            <td>{{ item.descripcion }}</td>
            <td>{{ new Date(item.fecha).toLocaleDateString() }}</td>
            <td>{{ item.lugar }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserTable',
    props: {
      datos: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background-color: #ddd;
    padding: 8px;
    text-align: left;
  }
  td {
    padding: 8px;
    text-align: left;
  }
  </style>  