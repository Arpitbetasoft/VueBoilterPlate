import axios from 'axios'
import vuexStore from '@/store/vuex'

const userapi = axios.create({
  baseURL: 'https://dummyjson.com/auth',
})

userapi.interceptors.request.use(
  (config) => {
    if (vuexStore.getters.getAuthToken) {
      console.log('H')
      config.headers.Authorization = `Bearer ${vuexStore.token}`
      console.log(config.headers.Authorization)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

userapi.interceptors.response.use(
  (response) => {
    console.log('Interceptor')
    return response
  },
  async (error) => {
    const originalerror = error.config

    if (error.response.status == 401 || !originalerror._retry) {
      originalerror._retry = true
      try {
        const newAccessToken = await vuexStore.mutations.refreshAccessToken()
        if (newAccessToken) {
          originalerror.headers.Authorization = `Token refreshed ${newAccessToken}`
          return userapi(originalerror)
        }
      } catch (refresherror) {
        console.log(refresherror)
      }
    }
  },
)

export default userapi
