<template>
  <div>
    <h1>Registrarse</h1>
    <div v-if="!registroExitoso">
      <form @submit.prevent="registrar">
        <input v-model="usuario.name" placeholder="Nombre" required />
        <input v-model="usuario.email" type="email" placeholder="Email" required />
        <input v-model="usuario.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
    <div v-else>
      <p>¡Registro exitoso!</p>
      <button @click="irAlLogin">Ir a Iniciar Sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref({
  name: '',
  email: '',
  password: ''
})
const registroExitoso = ref(false)
const router = useRouter()

const registrar = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario.value)
    })
    const data = await res.json()
    if (res.ok) {
      registroExitoso.value = true
    } else {
      alert(data.msg)
    }
  } catch (error) {
    console.error('Error al registrar:', error)
    alert('Ocurrió un error, intenta de nuevo.')
  }
}

const irAlLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
/* Estilos básicos para el formulario */
form {
  max-width: 400px;
  margin: 1em auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input {
  width: 100%;
  margin-bottom: 1em;
  padding: 0.5em;
  box-sizing: border-box;
}
button {
  padding: 0.5em 1em;
  background-color: #42b883;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #369f6e;
}
</style>