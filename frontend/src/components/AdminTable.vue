<template>
  <div>
    <h2>Eventos Universitarios</h2>
    <table border="1" cellspacing="0" cellpadding="6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Lugar</th>
          <th>Herramientas</th>
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
          <td>
            <button @click="$emit('editar', item)">Editar</button>
            <button @click="eliminar(item)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminTable',
  props: {
    datos: {
      type: Array,
      required: true
    }
  },
  methods: {
    editar(item) {
      console.log("Editar:", item)
      // Aquí colocar lógica para editar
    },
    async eliminar(item) {
      // Confirmación antes de eliminar
      if (confirm("¿Está seguro que desea eliminar este evento?")) {
        try {
          // Realiza una petición DELETE al backend usando el ID del evento
          const res = await fetch(`http://localhost:3000/api/eventos/${item._id}`, {
            method: 'DELETE'
          });
          const data = await res.json();
          if (res.ok) {
            alert("Evento eliminado correctamente");
            // Emitir un evento al componente padre para que actualice la lista de eventos
            this.$emit('refresh');
          } else {
            alert("Error al eliminar el evento: " + data.msg);
          }
        } catch (error) {
          console.error("Error en la petición de eliminación:", error);
          alert("Ocurrió un error al eliminar el evento.");
        }
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #ddd;
}
td, th {
  padding: 8px;
  text-align: left;
}
</style>