import { defineStore } from 'pinia'
import { API_URL } from '../config/api'
import axios from 'axios'
import Toastify from 'toastify-js'
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLogin: false,
      userName: ''
    }
  },

  actions: {
    async userRegister(registerForm) {
      try {
        const { data } = await axios.post(API_URL + 'user/register', registerForm)
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        Toastify({
          text: `Welcome onboard ${data.name}!`,
          duration: 3000,
          position: 'center',
          gravity: 'top',
          close: true,
          offset: {
            y: 30
          },
          style: {
            background: 'linear-gradient(to right, #900C3F, #F94C10)'
          }
        }).showToast()
        this.router.push('/login')
      } catch (error) {
        console.log(error)
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000,
          position: 'center',
          gravity: 'top',
          close: true,
          offset: {
            y: 30
          },
          style: {
            background: 'linear-gradient(to right, #900C3F, #F94C10)'
          }
        }).showToast()
      }
    },

    async userLogin(loginForm) {
      try {
        const { data } = await axios.post(API_URL + 'user/login', loginForm)

        console.log(data, '<<< data from action userLogin')

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user_name', data.name)
        this.isLogin = true
        this.userName = data.name
        Swal.fire({
          title: `Hola ${data.name}!`,
          timer: 1500,
          showConfirmButton: false,
          color: '#ffffff',
          background: '#3d1878'
        })
        this.router.push('/')
      } catch (error) {
        console.log(error)
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000,
          position: 'center',
          gravity: 'top',
          close: true,
          offset: {
            y: 30
          },
          style: {
            background: 'linear-gradient(to right, #900C3F, #F94C10)'
          }
        }).showToast()
      }
    },

    async userLogOut() {
      try {
        localStorage.clear()
        this.isLogin = false
        this.router.push('/login')
        Swal.fire({
          title: `Thank You for Visiting Bill Buddy!`,
          timer: 1500,
          showConfirmButton: false,
          color: '#ffffff',
          background: '#3d1878'
        })
      } catch (error) {
        console.log(error)
      }
    },

    async checkLogin() {
      try {
        const tokenCheck = localStorage.getItem('access_token')
        const getName = localStorage.getItem('user_name')

        if (tokenCheck) {
          this.isLogin = true
          this.userName = `${getName}`
        } else {
          this.isLogin = false
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
