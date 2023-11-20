import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse } from '@/services/BaseApiService'

// Types
export type User = {
  id: number
  username: string
  email: string
}

export type UserCommand = {
  username: string
  email: string
}

// UserService

export default class UserService extends BaseApiService {
  // Get a single user by ID
  static async getUser(userId: number): Promise<User | ErrorResponse> {
    return await this.get(`/users/${userId}`)
  }

  // Get users based on optional email and username parameters
  static async getUsers(params?: {
    email?: string
    username?: string
  }): Promise<Array<User> | ErrorResponse> {
    if (params) {
      const urlParams = new URLSearchParams()

      if (params.email) {
        urlParams.append('email', params.email)
      }
      if (params.username) {
        urlParams.append('username', params.username)
      }

      return await this.get(`/users?${params.toString()}`)
    }
    return await this.get(`/users`)
  }

  // Create a user
  static async createUser(data: UserCommand): Promise<User | ErrorResponse> {
    return await this.post({
      url: `/users`,
      data
    })
  }

  // Update a user
  static async updateUser(data: UserCommand, userId: number): Promise<User | ErrorResponse> {
    return await this.put({
      url: `/users/${userId}`,
      data
    })
  }

  // Delete a user by ID
  static async deleteUser(userId: number): Promise<void | ErrorResponse> {
    return await this.delete({
      url: `/users/${userId}`
    })
  }
}
