<template>
  <div>
    <!-- Barra de navegación superior con botón "Inicio" -->
    <nav class="navbar">
      <button class="btn-logout" @click="cerrarSesion">Cerrar Sesión</button>
    </nav>
    <h1>Panel de Administración</h1>
    <!-- Botón para crear un nuevo evento (ya existente) -->
    <button class="btn-crear" @click="mostrarFormulario = true">
      Crear Nuevo Evento
    </button>

    <!-- Modal de creación, ya implementado -->
    <div v-if="mostrarFormulario" class="modal-overlay">
      <div class="modal-content">
        <button class="btn-cerrar" @click="cerrarFormulario">X</button>
        <EventoForm @eventoCreado="eventoCreado" />
      </div>
    </div>

    <!-- Botón de editar se activa desde la tabla; en la tabla se emitirá el evento "editar" con el evento a editar -->
    <AdminTable :datos="eventos" @editar="abrirModalEdicion" @refresh="refrescarEventos" />

    <!-- Modal para editar evento -->
    <div v-if="mostrarModalEdicion" class="modal-overlay">
      <EditEvento :evento="eventoAEditar" @close="cerrarModalEdicion" @eventoActualizado="actualizarLista" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import EventoForm from '../components/EventoForm.vue';
import AdminTable from '../components/AdminTable.vue';
import EditEvento from '../components/EditEvento.vue';

export default {
  name: 'AdminDashboard',
  components: { EventoForm, AdminTable, EditEvento },
  methods: {
    cerrarSesion() {
      // Elimina el token y otros datos del usuario
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      // Redirige al usuario a la página de login (o a Home)
      this.$router.push('/');
    }
  },
  setup() {
    const eventos = ref([]);
    const mostrarFormulario = ref(false);
    const mostrarModalEdicion = ref(false);
    const eventoAEditar = ref(null);
    const refrescarEventos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/eventos');
        if (res.ok) {
          eventos.value = await res.json();
        } else {
          console.error("Error al obtener eventos:", res.statusText);
        }
      } catch (error) {
        console.error("Error en la petición de eventos:", error);
      }
    };

    onMounted(() => {
      refrescarEventos();
    });

    const cerrarFormulario = () => {
      mostrarFormulario.value = false;
    };

    const eventoCreado = () => {
      refrescarEventos();
      mostrarFormulario.value = false;
    };

    // Función para abrir el modal de edición cuando la tabla emite el evento "editar"
    const abrirModalEdicion = (evento) => {
      eventoAEditar.value = evento;
      mostrarModalEdicion.value = true;
    };

    const cerrarModalEdicion = () => {
      mostrarModalEdicion.value = false;
    };

    // Actualiza la lista cuando se edite un evento
    const actualizarLista = (eventoActualizado) => {
      // Puedes buscar el evento en el arreglo y actualizarlo, o simplemente refrescar la lista
      refrescarEventos();
      mostrarModalEdicion.value = false;
    };

    return { eventos, mostrarFormulario, refrescarEventos, cerrarFormulario, eventoCreado, 
             mostrarModalEdicion, abrirModalEdicion, cerrarModalEdicion, eventoAEditar, actualizarLista };
  }

};
</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
}

.btn-home {
  padding: 8px 16px;
  background-color: #595c5b;
  color: rgb(255, 255, 255);
  text-decoration: none;
  border-radius: 4px;
}

.btn-home:hover {
  background-color: #42b883;
}

.btn-crear {
  padding: 10px 20px;
  background-color: #42b883;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 4px;
}

/* Estilos para el modal (idénticos a los del otro modal) */
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
  background: #3e3e3e;
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
</style>