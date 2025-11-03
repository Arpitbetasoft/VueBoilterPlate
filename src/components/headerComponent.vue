<template>
  <div>
    <v-toolbar title="WebPage" color="primary">
      <div v-if="login">
        <v-tabs>
          <v-tab text="Home" :to="'/'"></v-tab>
          <v-tab text="Dashboard" :to="'/dashboard'"></v-tab>
          <v-tab text="Admin" :to="'/admin'"></v-tab>
          <v-btn icon="mdi-logout" @click="logout"></v-btn>
        </v-tabs>
      </div>
      <div v-else>
        <v-tabs>
          <v-tab text="Home" :to="'/'"></v-tab>
          <v-btn to="/login">Login</v-btn>
          <v-btn to="/signup">Signup</v-btn>
        </v-tabs>
      </div>
    </v-toolbar>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/loginStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()

const loginStore = useLoginStore()
let login = computed(() => {
  return loginStore.loggedIn
})

const logout = () => {
  loginStore.token = null
  loginStore.loggedIn = false
  loginStore.user = []
  router.push('/login').then(() => {
    toast.info('User logged out')
  })
}
</script>
