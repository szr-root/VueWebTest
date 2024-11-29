import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/User/LoginView.vue'),
    },
	{
	  path: '/home',
	  name: 'home',
	  component: () => import('../views/Home/HomeView.vue'),
	}
	
  ]
})

export default router
