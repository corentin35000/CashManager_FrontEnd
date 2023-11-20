import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse } from '@/services/BaseApiService'
import type { User } from '@/services/UserService'

// Types
export type LoginCommand = {
  email: string
  password: string
}

export type SignupCommand = {
  username: string
  email: string
  password: string
}

export type SignInResponse =
  | {
      user: User
      token: string
    }
  | ErrorResponse

export type SignUpResponse =
  | {
      user: User
      token: string
    }
  | ErrorResponse

export default class AuthService extends BaseApiService {
  // Sign in a user
  static async signIn(data: LoginCommand): Promise<SignInResponse> {
    return await this.post({
      url: `/sign_in`,
      data
    })
  }

  // Sign up a new user
  static async signUp(data: SignupCommand): Promise<SignUpResponse> {
    return await this.post({
      url: `/sign_up`,
      data
    })
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
