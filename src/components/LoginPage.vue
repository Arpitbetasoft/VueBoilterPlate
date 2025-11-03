<template>
  <v-app>
    <v-main class="login-background d-flex justify-center align-center">
      <v-card class="login-card pa-6" max-width="400">
        <v-card-title class="text-h5 font-weight-bold text-center mb-2">Login</v-card-title>
        <v-card-text>
          <v-form ref="loginForm" @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.username"
              label="Username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              dense
              class="mb-4"
              required
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="formData.pass"
              label="Password"
              prepend-inner-icon="mdi-lock"
              type="password"
              variant="outlined"
              dense
              class="mb-4"
              required
              :rules="[rules.required, rules.minLength(7)]"
            />
            <v-card-actions class="mt-4 justify-center d-flex flex-column">
              <v-btn type="submit" class="mb-4 elevation-2" block large color="primary"
                >Login</v-btn
              >
              <v-divider></v-divider>
              <v-btn color="primary" href="/signup" block>Don't have an account, Sign up</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/loginStore'
import userapi from '@/plugins/axios'
import { toast } from 'vue3-toastify'

const loginStore = useLoginStore()
const router = useRouter()

const loginForm = ref(null)

const formData = ref({
  username: '',
  pass: '',
})

const rules = {
  required: (value) => !!value || 'This field is required.',
  minLength: (len) => (v) => (v && v.length >= len) || `Must be at least ${len} characters`,
}

const submitForm = async () => {
  const { valid } = await loginForm.value.validate()

  if (valid) {
    userapi
      .post('/auth/login', formData.value)
      .then(({ data }) => {
        console.log(data)
        if (data.status === true) {
          loginStore.setDetails(data.data)
          if (data.data.user.role === 'admin') {
            router.push('/admin').then(() => {
              toast.success('Welcome Admin')
            })

            console.log(loginStore.token)
          } else {
            router.push('/dashboard').then(() => {
              toast.success(`Welcome ${formData.value.username}`)
            })
          }
        }
        if (data.status === 401) {
          toast.error('Invalid Credentials')
        }
        if (data.status === 404) {
          router.push('/signup').then(() => {
            toast.error('User Not Found')
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.login-background {
  height: 100vh;
  background: #f5f5f5;
}

.login-card {
  border-radius: 16px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.v-text-field input {
  font-size: 14px;
}

.v-btn {
  text-transform: none;
}
</style>
