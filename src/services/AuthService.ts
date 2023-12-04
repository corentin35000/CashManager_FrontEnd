import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse } from '@/services/BaseApiService'
import type { User } from '@/services/UserService'

// Types
export type LoginCommand = {
  email: string
  password: string
}

export type SignupCommand = {
  firstname: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
}

export type SignInResponse = User | ErrorResponse


export default class AuthService extends BaseApiService {
  // Sign in a user
  static async signIn(data: LoginCommand): Promise<User> {
    return await this.post({
      url: `/signin`, data })
  }

  // Sign up a new user
  static async signUp(data: SignupCommand): Promise<void> {
    return await this.post({
      url: `/signup`, data })
  }

  // Sign out the current user
  static async signOut(): Promise<{ message: string } | ErrorResponse> {
    return await this.post({
      url: `/sign_out`,
      data: null
    })
  }

  // Get the current user
  static async getCurrentUser(): Promise<User | ErrorResponse> {
    return await this.get(`/current_user`)
  }
}
