import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf.ts'
import OrderService from '@/services/OrderService'
import type { Order, CreateOrderCommand } from '@/services/OrderService'
import type { ErrorResponse } from '@/services/BaseApiService'
import { useAppStore } from '@/stores/appStore.ts'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orders: [] as Order[]
  }),
  actions: {
    handleError(e: unknown, message: string): void {
      const error = e as ErrorResponse
      const errorMessage = error?.errors?.[0]?.message || message
      console.error(error)
      notify.error(errorMessage)
    },
    setOrders(orders: Order[]): void {
      this.orders = orders
    },
    async createOrder(command: CreateOrderCommand): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const response = await OrderService.createOrder(command)
          if ('errors' in response) {
            this.handleError(response, 'Failed to create order.')
            return
          }
          notify.success('Order created successfully')
          // Optionally, refresh the orders list
          await this.getAllOrdersByUserId(command.userId)
        } catch (e) {
          this.handleError(e, 'Failed to create order.')
        }
      })
    },
    async getAllOrdersByUserId(userId: number): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const response = await OrderService.getAllOrdersByUserId(userId)
          if ('errors' in response) {
            this.handleError(response, 'Failed to retrieve orders.')
            return
          }
          this.setOrders(response)
        } catch (e) {
          this.handleError(e, 'Failed to retrieve orders.')
        }
      })
    }
  },
  getters: {}
})
