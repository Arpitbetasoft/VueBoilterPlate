import axios from 'axios'



const userapi = axios.create({
  baseURL: import.meta.env.VITE_Backend_Base_URL,
})


export default userapi
