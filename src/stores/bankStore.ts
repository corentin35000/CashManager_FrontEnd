import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf.ts'
import BankService from '@/services/BankService'
import type { Bank, PayByCheckCommand, PayByCardCommand } from '@/services/BankService'
import type { ErrorResponse } from '@/services/BaseApiService'
import { useAppStore } from '@/stores/appStore.ts'

export const useBankStore = defineStore('bankStore', {
  state: () => ({
    bankDetails: null as Bank | null
  }),
  actions: {
    handleError(e: unknown, message: string): void {
      const error = e as ErrorResponse
      const errorMessage = error?.errors?.[0]?.message || message
      console.error(error)
      notify.error(errorMessage)
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
    async payByCheck(command: PayByCheckCommand): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const response = await BankService.payByCheck(command)
          if ('errors' in response) {
            this.handleError(response, 'Payment by check failed.')
            return
          }
          notify.success(response.message)
        } catch (e) {
          this.handleError(e, 'Payment by check failed.')
        }
      })
    },
    async payByCard(command: PayByCardCommand): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const response = await BankService.payByCard(command)
          if ('errors' in response) {
            this.handleError(response, 'Payment by card failed.')
            return
          }
          notify.success(response.message)
        } catch (e) {
          this.handleError(e, 'Payment by card failed.')
        }
      })
    }
  },
  getters: {}
})
