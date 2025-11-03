import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useLoginStore = defineStore('login',{
  state:()=>({
    token:null,
    loggedIn:false,
    user:[],
    expiretime:null
  }),
  getters:{
    getToken(){
      return this.token
    },
    getLoggedIn(){
      return this.loggedIn
    }
  },
  actions:{
    gettime(){
      const payload = jwtDecode(this.token)
      const time=payload.exp * 1000
      this.expiretime=time-Date.now()
      return this.expiretime;
    },
    setDetails(data){
      this.token=data.token
      this.loggedIn=true
      this.user=data.user
    }

  },
  persist: true,




})
