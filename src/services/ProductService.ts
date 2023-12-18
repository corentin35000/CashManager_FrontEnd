import BaseApiService from '@/services/BaseApiService'

// Types
export type Product = {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

export default class ProductService extends BaseApiService {
  // Get products
  static async getProducts(): Promise<Array<Product>> {
    return await this.get(`/products`)
  }
}
