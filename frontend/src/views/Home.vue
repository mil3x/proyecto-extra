<template>
  <div class="home-container">
    <header class="home-header">
      <h1>Bienvenido a la Página Universitaria de Eventos</h1>
      <p>Explora, inscríbete y disfruta de los eventos académicos.</p>
    </header>

    <nav class="home-nav">
      <!-- Puedes agregar botones o enlaces para navegar a otras secciones -->
      <router-link to="/login" class="nav-button">Iniciar Sesión</router-link>
      <router-link to="/register" class="nav-button">Registrarse</router-link>
    </nav>
  </div>
</template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import EventoList from '../components/EventoList.vue'
  
  export default {
    name: 'Home',
    components: { EventoList },
    setup() {
      const eventos = ref([])
  
      onMounted(async () => {
        const response = await fetch('http://localhost:3000/api/eventos')
        eventos.value = await response.json()
      })
      return { eventos }
    }
  }
  </script>
  
  <style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
}

.home-header h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

.home-header p {
  font-size: 1.2em;
  margin-bottom: 1em;
}

.home-nav {
  margin-top: 20px;
}

.nav-button {
  display: inline-block;
  margin: 5px;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #369f6e;
}
</style>