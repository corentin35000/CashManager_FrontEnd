import { defineStore } from 'pinia'
import type { User, UserCommand } from '@/services/UserService'
import type { ErrorResponse } from '@/services/BaseApiService'
import UserService from '@/services/UserService'
import { notify } from '@/plugins/notyf'
import CookieService from '@/services/CookieService'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'

const user: string | undefined = CookieService.getCookie('user')

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: [] as Array<User>,
    currentUser: (user ? JSON.parse(user) : null) as User | null
  }),
  actions: {
    setUsers(users: Array<User>): void {
      this.users = users
    },
    setCurrentUser(user: User | null): void {
      this.currentUser = user
      if (user) {
        CookieService.setCookie('user', JSON.stringify(user), 30)
      } else {
        CookieService.deleteCookie('user')
      }
    },
    // Get a single user by ID
    async getUser(userId: number): Promise<User | null> {
      return await useAppStore().execWithPending(async () => {
        const response: User | ErrorResponse = await UserService.getUser(userId)
        if ('errors' in response) {
          const errorMessage = response?.errors?.[0]?.message || 'Failed to retrieve user.'
          notify.error(errorMessage)
          return null
        }
        this.setCurrentUser(response)
        return response
      })
    },
    // Get all users based on optional email and username parameters
    async getUsers(params?: { email?: string; username?: string }): Promise<Array<User>> {
      return await useAppStore().execWithPending(async () => {
        const response: Array<User> | ErrorResponse = await UserService.getUsers(params)
        if ('errors' in response) {
          const errorMessage = response?.errors?.[0]?.message || 'Failed to retrieve user.'
          notify.error(errorMessage)
          return []
        }
        this.setUsers(response)
        return response
      })
    },
    // Create a new user
    async createUser(data: UserCommand): Promise<User | ErrorResponse> {
      return await useAppStore().execWithPending(async () => {
        return await UserService.createUser(data)
      })
    },
    // Update an existing user
    async updateUser(data: UserCommand): Promise<null | User> {
      return await useAppStore().execWithPending(async () => {
        const userId = this.currentUser?.id
        if (!userId) {
          notify.error('Failed to update user.')
          return null
        }
        try {
          const response = await UserService.updateUser(data, userId)
          if ('errors' in response) {
            const errorMessage = response?.errors?.[0]?.message || 'Failed to update user.'
            notify.error(errorMessage)
            return null
          }
          notify.success('User updated successfully!')
          useUsersStore().setCurrentUser(response)
          return response
        } catch (e) {
          const error = e as ErrorResponse
          const errorMessage = error?.errors?.[0]?.message || 'Failed to update user.'
          notify.error(errorMessage)
          return null
        }
      })
    },
    // Delete a user by ID
    async deleteUser(userId: number): Promise<void | ErrorResponse> {
      return await useAppStore().execWithPending(async () => {
        const response = await UserService.deleteUser(userId)
        if (this.currentUser?.id === userId) {
          await useAuthStore().signOut()
        }
        return response
      })
    },

    //Get a user by ID
    async getAnotherUser(userId: number): Promise<User | null> {
      return await useAppStore().execWithPending(async () => {
        const response: User | ErrorResponse = await UserService.getUser(userId)
        if ('errors' in response) {
          const errorMessage = response?.errors?.[0]?.message || 'Failed to retrieve user.'
          notify.error(errorMessage)
          return null
        }
        return response
      })
    }
  },
  getters: {}
})
