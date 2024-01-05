import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse } from '@/services/BaseApiService'
import type { Product } from '@/services/ProductService.ts'

export type OrderStatus = 'pending' | 'paid' | 'cancelled'

export type OrderProduct = {
  id: number
  order_id: number
  product_id: number
  quantity: number
  created_at: string
  updated_at: string
  product: Product
}

export type CreateOrderCommand = {
  userId: number
  products: { productId: number; quantity: number }[]
  status?: OrderStatus
}

export type Order = {
  id: number
  user_id: number
  total_amount: number
  total_paid: number
  status: OrderStatus
  orderProducts: OrderProduct[]
  created_at: string
  updated_at: string
}

export default class OrderService extends BaseApiService {
  static async createOrder(data: CreateOrderCommand): Promise<Order | ErrorResponse> {
    return await this.post({
      url: '/orders',
      data
    })
  }

  static async getAllOrdersByUserId(userId: number): Promise<Order[] | ErrorResponse> {
    return await this.get(`/orders/user/${userId}`)
  }
}
