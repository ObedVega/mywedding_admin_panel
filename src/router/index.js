import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
//import { Store } from 'vuex';
//import store from '../store'; // Importa el store de Vuex

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registro',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('../views/ResetView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
      props: true
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verificar si el usuario está autenticado
    console.log('token guardado en sessionStorage:', sessionStorage.getItem('token'));
    if (!sessionStorage.getItem('token')) {
      // Si no hay un token en el almacenamiento local, redirigir al login
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
