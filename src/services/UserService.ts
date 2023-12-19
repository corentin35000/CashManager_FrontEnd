import BaseApiService from '@/services/BaseApiService'
import type { ErrorResponse } from '@/services/BaseApiService'

// Types
export type User = {
  id: number
  username: string
  email: string
  lastname: string
  firstname: string
  createdAt: Date
  updatedAt: Date
}

export type UserCommand = {
  username: string
  email: string
  lastname: string
  firstname: string
  createdAt: Date
  updatedAt: Date
}

// UserService

export default class UserService extends BaseApiService {
  // Get a single user by ID
  static async getUser(userId: number): Promise<User | ErrorResponse> {
    return await this.get(`/user/${userId}`)
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

      return await this.get(`/user?${params.toString()}`)
    }
    return await this.get(`/user`)
  }

  // Create a user
  static async createUser(data: UserCommand): Promise<User | ErrorResponse> {
    return await this.post({
      url: `/user`,
      data
    })
  }

  // Update a user
  static async updateUser(data: UserCommand, userId: number): Promise<User | ErrorResponse> {
    return await this.put({
      url: `/user/${userId}`,
      data
    })
  }

  // Delete a user by ID
  static async deleteUser(userId: number): Promise<void | ErrorResponse> {
    return await this.delete({
      url: `/user/${userId}`
    })
  }
}
