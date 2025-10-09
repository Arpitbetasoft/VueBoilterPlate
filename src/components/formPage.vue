<template>
  <div>
    <v-container>
      <v-btn @click="vuex.commit('logout')">Logout</v-btn>
      <v-form @submit.prevent="submitform()">
        <v-text-field type="text" label="Username" v-model="username"></v-text-field>
        <v-text-field type="password" label="Password" v-model="password"></v-text-field>
        <v-btn type="submit">Submit</v-btn>
      </v-form>
    </v-container>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

let username = ref('')
let password = ref('')
const vuex = useStore()

function submitform() {
  vuex.commit('handleform', {
    username: username.value,
    password: password.value,
  })
}
</script>
