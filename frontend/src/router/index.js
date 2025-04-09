import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import MyEvents from '../views/MyEvents.vue';
import UserDashboard from '../views/UserDashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/user', name: 'UserDashboard', component: UserDashboard, meta: { requiresAuth: true } },
  { path: '/mis-eventos', name: 'MyEvents', component: MyEvents }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Verifica si la ruta tiene meta.requiresAuth
  if (to.meta.requiresAuth) {
    // Verifica si el token existe (o cualquier indicador de sesión)
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirige a la página de login
      next({ name: 'Login' });
    } else {
      next(); // Permite la navegación si el token existe
    }
  } else {
    next(); // Permite navegación en rutas sin requerir autenticación
  }
});

export default router;
