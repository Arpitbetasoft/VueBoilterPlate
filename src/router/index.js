import FormPage from '@/components/formPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'form',
      component: FormPage,
    }
  ],
})

export default router
