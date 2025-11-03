import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//pinia
import { createPinia } from 'pinia'
  import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia=createPinia();
pinia.use(piniaPluginPersistedstate)

// vue3-toastify
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import 'devextreme/dist/css/dx.material.blue.light.css'
//vuetify
import vuetify from './plugins/vuetify'

//dxdata grid


//vuex
import  vuexStore  from './store/vuex'

const app = createApp(App)

app.use(
  Vue3Toastify,
  {
    position:"top-right",
    autoClose: 1000,
    theme:'light',
    transition:'slide'
    // ...
  }
)
app.use(vuexStore)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
