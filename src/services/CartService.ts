import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse } from '@/services/BaseApiService'
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

export type updateCartProductQuantityCommand = {
  product_id: number
  quantity: number
}

export default class CartService extends BaseApiService {
  // Get cart
  static async getCartByUserId(userId: number): Promise<Array<Cart> | ErrorResponse> {
    return await this.get(`/cart/` + userId)
  }

  // Add product to cart
  static async addProduct(userId: number, data: addProduct): Promise<void | ErrorResponse> {
    return await this.post({
      url: `/cart/` + userId,
      data
    })
  }

  // Delete product from cart
  static async deleteProduct(userId: number, data: addProduct): Promise<void> {
    return await this.delete({ url: `/cart/` + userId + `/product/` + data.product_id })
  }

  // Update product quantity
  static async updateProductQuantity(
    userId: number,
    data: updateCartProductQuantityCommand
  ): Promise<void> {
    return await this.put({
      url: `/cart/` + userId,
      data
    })
  }
}
