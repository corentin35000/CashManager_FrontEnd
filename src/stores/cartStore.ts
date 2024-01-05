import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf.ts'
import CartService, { Cart } from '@/services/CartService.ts'
import { User } from '@/services/UserService.ts'
import { useUsersStore } from '@/stores/usersStore.ts'
import type { ErrorResponse } from '@/services/BaseApiService.ts'
import { useAppStore } from '@/stores/appStore.ts'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: [] as Array<Cart>,
    total: 0
  }),
  actions: {
    handleError(e: unknown, message: string): void {
      const error = e as ErrorResponse
      const errorMessage = error?.errors?.[0]?.message || message
      console.error(error)
      notify.error(errorMessage)
    },
    setCartItems(cartItems: Array<Cart>): void {
      this.cartItems = cartItems
      this.syncTotal()
    },
    setTotal(total: number): void {
      this.total = total
    },
    productIsInCart(productId: number): boolean {
      return this.cartItems.some((item) => item.product.id === productId)
    },
    productCartQuantity(productId: number): number {
      const cartItem = this.cartItems.find((item) => item.product.id === productId)
      return cartItem ? cartItem.quantity : 0
    },
    syncTotal(): void {
      this.setTotal(
        this.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      )
    },
    async getCart(): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const user: User | null = useUsersStore().currentUser
          if (!user) {
            notify.dismissAll()
            notify.error('user not found')
            return
          }
          const response = await CartService.getCartByUserId(user.id)
          if ('errors' in response) {
            const errorMessage = response?.errors?.[0]?.message || 'Failed to retrieve cart.'
            notify.dismissAll()
            notify.error(errorMessage)
            return
          }
          this.setCartItems(response)
        } catch (e) {
          this.handleError(e, 'Failed to retrieve cart.')
        }
      })
    },
    async addToCart(productId: number): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const user: User | null = useUsersStore().currentUser
          if (!user) {
            notify.error('user not found')
            return
          }
          await CartService.addProduct(user.id, { product_id: productId })
          await this.getCart()
          notify.dismissAll()
          notify.success('product added to cart')
        } catch (e) {
          this.handleError(e, 'Failed to add product to cart.')
        }
      })
    },

    async removeFromCart(productId: number): Promise<void> {
      await useAppStore().execWithPending(async () => {
        try {
          const user: User | null = useUsersStore().currentUser
          if (!user) {
            notify.error('user not found')
            return
          }
          await CartService.deleteProduct(user.id, { product_id: productId })
          await this.getCart()
          notify.dismissAll()
          notify.success('product removed from cart')
        } catch (e) {
          this.handleError(e, 'Failed to remove product from cart.')
        }
      })
    },
    async updateProductQuantity(productId: number, quantity: number): Promise<void> {
      await useAppStore().execWithPending(async () => {
        const cartItem = this.cartItems.find((item) => item.product_id === productId)
        if (!cartItem) {
          return
        }
        cartItem.quantity = quantity
        await CartService.updateProductQuantity(cartItem.user_id, {
          quantity,
          product_id: productId
        })
      })
    }
  },
  getters: {
    totalStr(): string {
      return this.total.toFixed(2) + '€'
    }
  }
})
