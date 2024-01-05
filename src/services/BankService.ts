import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse, ExceptionResponse } from '@/services/BaseApiService'

export type Bank = {
  id: number
  user_id: number
  amount: number
  number_failed: number
  cart_cap: number
  total_amount: number
}

export type PayByCheckCommand = {
  userId: number
  bankCheckBalance: number
}

export type PayByCardCommand = {
  userId: number
}

export type PaymentResponse = {
  message: string
}

export default class BankService extends BaseApiService {
  //get bank
  static async getBankByUserId(userId: number): Promise<Bank> {
    return await this.get(`/bank/` + userId)
  }

  static async payByCheck(
    data: PayByCheckCommand
  ): Promise<PaymentResponse | ErrorResponse | ExceptionResponse> {
    return await this.post({
      url: '/bank/pay-by-check',
      data
    })
  }

  static async payByCard(
    data: PayByCardCommand
  ): Promise<PaymentResponse | ErrorResponse | ExceptionResponse> {
    return await this.post({
      url: '/bank/pay-by-card',
      data
    })
  }
}
