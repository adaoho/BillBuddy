<script>
import { useGroupStore } from '../stores/group'
import { useUserStore } from '../stores/user'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'HomeView',
  data() {
    return {
      GroupId: 1,
      isAddExpense: false,
      isAddMember: false,
      showMember: [],
      expenseForm: {
        name: '',
        expense: '',
        date: ''
      },
      memberForm: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['userName'])
  },
  methods: {
    ...mapActions(useGroupStore, ['addExpense', 'addMember']),
    submitMember() {
      this.addMember()
    },
    submitExpense() {
      console.log(this.expenseForm, '<< from expense form')
      if (!this.expenseForm) {
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
      this.addExpense(this.GroupId, this.expenseForm)
      this.isAddExpense = true
      const modal = document.getElementById('my_modal_5')
      if (modal) {
        modal.close()
      }
    },
    currencyFormatted(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(number)
    }
  },
  created() {}
}
</script>

<template>
  <div class="hero bg-base-100 items-center justify-center flex h-[750px]">
    <div class="hero-content flex-col lg:flex-row-reverse gap-x-20">
      <div class="text-center lg:text-left mt-10">
        <h1 class="text-2xl font-extralight">Hola {{ userName }}!</h1>
        <h1 class="text-4xl font-bold">Let's Split Your Bill!</h1>
        <p class="py-6 w-[400px] font-light text-sm">
          Bill Buddy is your ultimate companion for hassle-free expense management and bill
          splitting. Whether you're dining out with friends, traveling in a group, or sharing living
          expenses with roommates.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
        <form class="card-body">
          <p class="py-3 mr-4 text-center">Now tell me your group name and the expense?</p>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Group Name</span>
            </label>
            <input type="text" placeholder="Group Name" class="input input-bordered" required />
          </div>

          <!-- Modal Add Expense -->
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">Add Expense</span>
            </label>

            <!-- Modal -->

            <!-- Open the modal using ID.showModal() method -->
            <button
              class="btn bg-slate-900 py-3 rounded-lg items-center justify-center text-white"
              onclick="my_modal_5.showModal()"
              v-if="isAddExpense === false"
            >
              Add Expense
            </button>
            <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
              <div class="modal-box items-center flex flex-col gap-y-4">
                <h3 class="font-bold text-lg">Tell me your Expense?</h3>
                <!-- Form Add Expense -->
                <form
                  action=""
                  id="add-expense-form"
                  class="flex flex-col gap-y-2"
                  @submit.prevent="submitExpense"
                >
                  <label class="label">
                    <span class="label-text">Name of Expense</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name of Expense"
                    class="input input-bordered"
                    v-model="expenseForm.name"
                  />
                  <label class="label">
                    <span class="label-text">Total Expense</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Total Expense"
                    class="input input-bordered"
                    v-model="expenseForm.expense"
                  />
                  <label class="label">
                    <span class="label-text">Date of Expense</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Date"
                    class="input input-bordered"
                    v-model="expenseForm.date"
                  />
                  <div class="modal-action items-center justify-center">
                    <button class="btn hover:bg-primary active:scale-90 hover:text-white">
                      Add Expense
                    </button>
                    <!-- <form method="dialog"> -->
                    <!-- if there is a button in form, it will close the modal -->
                    <!-- </form> -->
                  </div>
                </form>
              </div>
            </dialog>

            <!-- Summary After Modal Expense -->
            <div id="summary-add-expense" v-if="isAddExpense === true">
              <div class="flex flex-row justify-between items-start pl-1 text-s">
                <span class="">{{ this.currencyFormatted(expenseForm.expense) }}</span>
                <span class="">{{ expenseForm.date }}</span>
              </div>
              <div class="divider mt-2 -mb-2 relative"></div>
            </div>
          </div>

          <!-- Modal Add Member -->
          <div class="form-control mt-2 -mb-2">
            <label class="label">
              <span class="label-text">Add Members</span>
            </label>

            <!-- Modal -->
            <!-- Summary After Modal Expense -->
            <div id="summary-add-expense" v-if="isAddMember === true">
              <div class="flex flex-row justify-between items-center pl-1 text-s">
                <span class="text-[12px] font-italic">Adnan Nugroho</span>
                <span class="text-[12px] font-italic">9nugroho@gmail.com</span>
              </div>
              <div class="divider my-2 relative"></div>
            </div>
          </div>

          <!-- Open the modal using ID.showModal() method -->
          <button
            class="btn bg-slate-900 py-3 rounded-lg items-center justify-center text-white"
            onclick="my_modal_6.showModal() "
          >
            Add Member
          </button>
          <dialog id="my_modal_6" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box items-center flex flex-col gap-y-2">
              <h3 class="font-bold text-lg">Who's your Member?</h3>
              <!-- Form Add Expense -->
              <form action="" id="add-expense-form" class="flex flex-col gap-y-2">
                <label class="label">
                  <span class="label-text">Member Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Member Name"
                  class="input input-bordered"
                  v-model="memberForm.name"
                />
                <label class="label">
                  <span class="label-text">Member Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Member Email"
                  class="input input-bordered"
                  v-model="memberForm.email"
                />
                <div class="modal-action items-center justify-center">
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->

                    <button class="btn hover:bg-primary active:scale-90 hover:text-white">
                      Add Member
                    </button>
                  </form>
                </div>
              </form>
            </div>
          </dialog>

          <div class="divider my-3 relative"></div>
          <div class="form-control">
            <button class="btn btn-primary">Create The Split Bud!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
