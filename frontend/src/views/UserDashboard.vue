<template>
    <div>
      <!-- Barra de navegación superior -->
      <nav class="navbar">
        <button class="btn-logout" @click="cerrarSesion">Cerrar Sesión</button>
      </nav>
  
      <h1>Panel de Usuario</h1>
      
      <!-- Aquí se muestra la lista de eventos sin opciones de edición o eliminación -->
      <UserTable :datos="eventos" @refresh="refrescarEventos" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import UserTable from '../components/UserTable.vue'; // Este componente lo crearemos a continuación
  
  export default {
    name: 'UserDashboard',
    components: { UserTable },
    setup() {
      const eventos = ref([]);
  
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
  
      const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        // Redirige a la página de login o inicio
        window.location.href = '/login';
      };
  
      return { eventos, refrescarEventos, cerrarSesion };
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .btn-home {
    padding: 8px 16px;
    background-color: #42b883;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .btn-logout {
    padding: 8px 16px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-logout:hover {
    background-color: #c0392b;
  }
  </style>  