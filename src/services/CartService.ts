import BaseApiService from '@/services/BaseApiService'
import type { Product } from '@/services/ProductService.ts'

// Types
export type addProduct = {
  product_id: number
}

export type Cart = {
  id: number
  user_id: number
  product_id: number
  created_at: string
  updated_at: string
  quantity: number
  product: Product
}

export default class CartService extends BaseApiService {
  // Get cart
  static async getCartByUserId(userId: number): Promise<Array<Cart>> {
    return await this.get(`/cart/` + userId)
  }

  // Add product to cart
  static async addProduct(userId: number, data: addProduct): Promise<void> {
    return await this.post({
      url: `/cart/` + userId,
      data
    })
  }

  // Delete product from cart
  static async deleteProduct(userId: number, data: addProduct): Promise<void> {
    return await this.delete({ url: `/cart/` + userId, data })
  }

  // Delete all cart from user
  static async deleteAllCartFromUser(userId: number): Promise<void> {
    return await this.delete({ url: `/cart/` + userId })
  }
}
