import { defineStore } from 'pinia'
import { API_URL } from '../config/api'
import axios from 'axios'
import Toastify from 'toastify-js'
import Swal from 'sweetalert2'

export const useGroupStore = defineStore('group', {
  state: () => {
    return {
      dataMember: [],
      dataExpense: []
    }
  },
  actions: {
    async addGroup(formGroup) {
      try {
        const { data } = await axios.post(API_URL, +`group/`, formGroup)

        console.log(data, '<<<< data from add Group')
      } catch (error) {
        console.log(error)
      }
    },

    async addExpense(GroupId = 1, expenseForm) {
      try {
        const { data } = await axios.post(API_URL + `group/expense/${GroupId}`, expenseForm, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        console.log(data, '<<<< data from expenseForm')

        this.dataExpense = data
      } catch (error) {
        console.log(error)
      }
    },

    async addMember(memberForm) {
      try {
      } catch (error) {
        console.log(error)
      }
    }
  }
})
