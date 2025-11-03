import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import HomePage from '../components/HomePage.vue'
import SignupPage from '../components/SignupPage.vue'
import DashboardPage from '../components/DashboardPage.vue'
import AdminPage from '../components/AdminPage.vue'
import { useLoginStore } from '@/stores/loginStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component: HomePage,
    },
    {
      path:'/login',
      name:'login',
      component: LoginPage,
    },
    {
      path:'/signup',
      name:'signup',
      component: SignupPage,
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:DashboardPage,
       meta:{
        roles:['admin','user'],
        auth:true
      }
    },
    {
      path:'/admin',
      name:'admin',
      component: AdminPage,
      meta:{
        auth:true,
        roles:['admin']
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useLoginStore()
  const isLoggedIn = store.loggedIn
  const role = store.user?.role || null

  console.log('Role:', role)
  console.log('Logged in:', isLoggedIn)

  if (isLoggedIn && (to.name === 'login' || to.name === 'signup')) {
    if (role === 'admin') {
      return next({ name: 'admin' })
    } else {
      return next({ name: 'dashboard' })
    }
  }

  if (to.meta.auth && !isLoggedIn) {
    return next({ name: 'login' })
  }

  if (to.meta.roles && !to.meta.roles.includes(role)) {
    return next({ name: 'dashboard' })
  }

  next()
})


export default router
