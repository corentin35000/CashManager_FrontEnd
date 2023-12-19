import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf.ts'
import BankService, { Bank } from '@/services/BankService.ts'
import CookieService from '@/services/CookieService.ts'
import { User } from '@/services/UserService.ts'

export const useBankStore = defineStore('bankStore', {
  state: () => ({
    authorized: false
  }),
  actions: {
    async checkIfHaveAmount(amount: number): Promise<void> {
      try {
        const user: User = JSON.parse(<string>CookieService.getCookie('user'))
        const bank: Bank = await BankService.getBankByUserId(user.id)
        this.authorized = bank.amount >= amount
      } catch (error) {
        console.error(error)
        notify.error('error to pay')
      }
    },
    async useBankCheck(amount: number, bankCheckAmount: number): Promise<void> {
      try {
        if (bankCheckAmount >= amount) {
          const user: User = JSON.parse(<string>CookieService.getCookie('user'))
          const bank: Bank = await BankService.getBankByUserId(user.id)
          this.authorized = bank.amount >= amount
        }
        this.authorized = false
      } catch (error) {
        console.error(error)
        notify.error('error to pay')
      }
    }
  }
})
