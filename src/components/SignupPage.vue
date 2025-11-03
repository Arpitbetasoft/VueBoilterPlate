<template>
  <v-app>
    <v-main class="login-background d-flex justify-center align-center">
      <v-card class="login-card pa-6" max-width="400">
        <v-card-title class="text-h5 font-weight-bold text-center mb-2">SignUp</v-card-title>
        <v-card-text>
          <v-form ref="signupForm" @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.username"
              label="Username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              dense
              class="mb-4"
              required
              :rules="[rules.required, rules.usernameMinLength]"
            />
            <v-text-field
              type="email"
              v-model="formData.email"
              label="Email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              dense
              class="mb-4"
              required
              :rules="[rules.required, rules.email]"
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
              :rules="[rules.required, rules.passwordMinLength]"
            />
            <v-card-actions class="mt-4 justify-center d-flex flex-column">
              <v-btn type="submit" color="primary" class="text-none elevation-2" block large
                >SignUp</v-btn
              >

              <v-btn text color="primary" href="/login" block
                >Already Have an account, Sign In</v-btn
              >
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
import userapi from '@/plugins/axios'
import { toast } from 'vue3-toastify'

const router = useRouter()

const signupForm = ref(null)

const formData = ref({
  username: '',
  pass: '',
  email: '',
})

const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(value) || 'Invalid e-mail format.'
  },
  usernameMinLength: (value) =>
    (value && value.length >= 4) || 'Username must be at least 4 characters.',
  passwordMinLength: (value) =>
    (value && value.length >= 7) || 'Password must be at least 7 characters.',
}

const submitForm = async () => {
  const { valid } = await signupForm.value.validate()

  if (valid) {
    userapi
      .post('/auth/signup', formData.value)
      .then(({ data }) => {
        console.log(data)
        if (data.status === true) {
          router.push('/login').then(() => {
            toast.info('User Created')
          })
        }
        if (data.status === 409) {
          router.push('/login').then(() => {
            toast.info('User already exists')
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
