import userapi from '@/plugins/axios'
import { createStore } from 'vuex'

 const vuexStore = createStore({
  state() {
    return {
      user: [],
      token: '',
      rtoken: '',
      error: null,
      loggedIn: false,
    }
  },
  mutations: {
    async handleform(state, { username, password }) {
      console.log(username, password)
      try {
        const response = await userapi.post('/login', { username, password })
        console.log(response.data)
        let { accessToken, refreshToken, ...userData } = response.data
        state.token = accessToken
        state.rtoken = refreshToken
        state.user = userData
        state.loggedIn = true
        state.error = false
        console.log(state.user)
      } catch (error) {
        console.log(error)
      }
    },
    async refreshAccessToken(state){
      try{
        const response=await userapi.post('/refresh',{
          refreshToken:state.rtoken
        })
        state.token=response.data.accessToken
        console.log('token refreshed')
      }
      catch(error){
        this.logout()
        console.log(error)
      }
    },
    logout() {
      console.log('User logged out')
      ;((this.token = ''),
        (this.rtoken = ''),
        (this.user = []),
        (this.error = null),
        (this.loggedIn = false))
    },
  },
  getters: {
    getAuthToken(state){
      return state.token
    }
  },
})

export default vuexStore
