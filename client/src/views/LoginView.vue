<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import Toastify from 'toastify-js'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['userLogin']),
    loginSubmit() {
      this.userLogin(this.loginForm)
    }
  },
  mounted() {}
}
</script>

<template>
  <!-- LogIn Page -->
  <section id="login-page" style="display: block">
    <div class="flex justify-center items-center h-full my-32">
      <div class="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <h1 class="text-2xl font-bold text-center">Login First Buddy</h1>
        <form class="space-y-6" @submit.prevent="loginSubmit">
          <div class="space-y-1 text-sm">
            <label for="username" class="block dark:text-gray-400">Email</label>
            <input
              type="text"
              name="email"
              id="username"
              placeholder="Username"
              class="w-full px-4 py-3 rounded-md bg-gray-200 text-gray-500 focus:dark:border-violet-400"
              v-model="loginForm.email"
            />
          </div>
          <div class="space-y-1 text-sm mb-3">
            <label for="password" class="block dark:text-gray-400">Password</label>
            <input
              type="password"
              name="email"
              id="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-md bg-gray-200 text-gray-500 focus:dark:border-violet-400"
              v-model="loginForm.password"
            />
          </div>
          <button
            class="block w-full p-3 text-center rounded-md dark:text-gray-900 dark:bg-violet-400 hover:bg-violet-600 hover:text-white active:scale-95"
          >
            Sign in
          </button>
        </form>
        <div class="flex items-center pt-4 space-x-1">
          <div class="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p class="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
          <div class="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <!-- OAuth Section Logo -->

        <div class="flex justify-center items-center">
          <button
            class="block w-full p-3 my-3 text-center rounded-md bg-slate-700 text-gray-100 hover:bg-violet-600 hover:text-white"
          >
            Sign In with Apple
          </button>
        </div>

        <p class="text-xs text-center sm:px-6 dark:text-gray-400">
          Don't have an account?
          <RouterLink to="/register" class="underline dark:text-gray-100">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
