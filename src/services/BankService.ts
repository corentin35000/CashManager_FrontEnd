import BaseApiService from '@/services/BaseApiService'

export type Bank = {
  id: number
  user_id: number
  amount: number
  number_failed: number
  cart_cap: number
  total_amount: number
}

export default class BankService extends BaseApiService {
  //get bank
  static async getBankByUserId(userId: number): Promise<Bank> {
    return await this.get(`/bank/` + userId)
  }
}
