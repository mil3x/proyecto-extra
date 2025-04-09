<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <input v-model="credenciales.email" type="email" placeholder="Email" required />
      <input v-model="credenciales.password" type="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const credenciales = ref({
  email: '',
  password: ''
})

const router = useRouter()

const login = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales.value)
    })
    const data = await res.json()
    if (res.ok) {
      // Guarda el token y los datos del usuario en localStorage para futuras referencias
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('userEmail', data.user.email)
      
      // Verificamos el rol y redirigimos según corresponda
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else if (data.user.role === 'user') {
        router.push('/user')
      } else {
        // Si no coincide, redirige a Home como respaldo
        router.push('/')
      }
    } else {
      alert(data.msg)
    }
  } catch (error) {
    console.error('Error en la petición de login:', error)
    alert('Ocurrió un error, intenta de nuevo.')
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