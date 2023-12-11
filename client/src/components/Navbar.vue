<script>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'Navbar',
  components: { RouterLink },
  computed: {
    ...mapState(useUserStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useUserStore, ['userLogOut', 'checkLogin']),
    clickLogout() {
      this.userLogOut()
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>
<template>
  <div class="navbar bg-gray-900 px-8">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>My Groups</a></li>
          <li><a>Pending Transaction</a></li>
          <li><a></a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl">Bill Buddy</a>
    </div>
    <div class="navbar-end">
      <RouterLink
        to="/login"
        class="bg-violet-700 py-1.5 px-5 rounded-lg text-white text-sm font-bold hover:bg-violet-500 active:scale-90"
        v-if="isLogin === false"
        >Login</RouterLink
      >
      <RouterLink
        to="/login"
        class="bg-gray-700 py-1.5 px-5 rounded-lg text-white text-sm font-bold hover:bg-gray-500 active:scale-90"
        v-if="isLogin === true"
        @click="clickLogout"
        >Logout</RouterLink
      >
    </div>
  </div>
</template>
