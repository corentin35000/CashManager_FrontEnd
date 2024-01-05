import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf.ts'
import BankService from '@/services/BankService'
import type { Bank } from '@/services/BankService'
import { ErrorResponse, ExceptionResponse } from '@/services/BaseApiService'
import { useAppStore } from '@/stores/appStore.ts'
import { User } from '@/services/UserService.ts'
import { useUsersStore } from '@/stores/usersStore.ts'
import router from '@/router'
import { useCartStore } from '@/stores/cartStore.ts'

export const useBankStore = defineStore('bankStore', {
  state: () => ({
    bankDetails: null as Bank | null
  }),
  actions: {
    handleError(e: unknown, message: string): void {
      const error: ErrorResponse | ExceptionResponse = e as ErrorResponse | ExceptionResponse
      let errorMessage = message
      if ('errors' in error) {
        errorMessage = error.errors[0]?.message || message
      } else if ('message' in error) {
        errorMessage = error.message
      }
      console.error(error)
      notify.error(errorMessage)
    },
    async handlePaymentError(e: unknown, message: string): Promise<void> {
      setTimeout(async () => {
        this.handleError(e, message)
        await router.push({ name: 'payment-methods' })
      }, 1500)
    },
    async handlePaymentSuccess(message: string): Promise<void> {
      setTimeout(async () => {
        notify.success(message)
        await useCartStore().getCart()
        await router.push({ name: 'profile' })
      }, 1500)
    },
    setBankDetails(bankDetails: Bank): void {
      this.bankDetails = bankDetails
    },
    async getBankDetails(userId: number): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const response = await BankService.getBankByUserId(userId)
          if ('errors' in response) {
            this.handleError(response, 'Failed to retrieve bank details.')
            return
          }
          this.setBankDetails(response)
        } catch (e) {
          this.handleError(e, 'Failed to retrieve bank details.')
        }
      })
    },
    async payByCheck(bankCheckBalance: number): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const user: User | null = useUsersStore().currentUser
          if (!user) {
            notify.dismissAll()
            notify.error('user not found')
            return
          }
          const response = await BankService.payByCheck({ userId: user.id, bankCheckBalance })
          if ('errors' in response) {
            await this.handlePaymentError(response, 'Payment by check failed.')
            return
          }
          await this.handlePaymentSuccess(response.message)
        } catch (e) {
          await this.handlePaymentError(e, 'Payment by check failed.')
        }
      })
    },
    async payByCard(): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const user: User | null = useUsersStore().currentUser
          if (!user) {
            notify.dismissAll()
            notify.error('user not found')
            return
          }
          const response = await BankService.payByCard({ userId: user.id })
          if ('errors' in response) {
            await this.handlePaymentError(response, 'Payment by card failed.')
            return
          }
          await this.handlePaymentSuccess(response.message)
        } catch (e) {
          await this.handlePaymentError(e, 'Payment by card failed.')
        }
      })
    }
  },
  getters: {}
})
