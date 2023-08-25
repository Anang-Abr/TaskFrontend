import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TodoView from '@/views/TodoView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        authenticated: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        authenticated: true
      }
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView,
      meta: {
        authenticated: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        authenticated: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

router.beforeEach((to, from) =>{
  if(to.meta.authenticated && !useAuthStore().isLoggedIn){
    return { name: 'login'}
  }
  else{
    return true
  }
})

export default router
