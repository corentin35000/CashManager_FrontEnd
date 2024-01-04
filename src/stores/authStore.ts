import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf'
import type { LoginCommand, SignInResponse, SignupCommand } from '@/services/AuthService'
import AuthService from '@/services/AuthService'
import { useUsersStore } from '@/stores/usersStore'
import { useAppStore } from '@/stores/appStore'
import router from '@/router'
import { ErrorResponse } from '@/services/BaseApiService.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async signIn(data: LoginCommand): Promise<any> {
      try {
        await useAppStore().execWithPending(async () => {
          const response: SignInResponse = await AuthService.signIn(data)
          console.log('response', response)
          useUsersStore().setCurrentUser(response)
          await router.push({ name: 'home' })
          return true
        })
      } catch (e) {
        console.error(e)
        const error = e as ErrorResponse
        const errorMessage = error?.errors?.[0]?.message || 'Failed to sign in.'
        notify.error(errorMessage)
        return false
      }
    },
    async signUp(data: SignupCommand): Promise<void> {
      try {
        await useAppStore().execWithPending<void>(async (): Promise<void> => {
          await AuthService.signUp(data)
          await router.push({ name: 'signin' })
          notify.success('Signed up successfully!')
        })
      } catch (e) {
        const error = e as ErrorResponse
        const errorMessage = error?.errors?.[0]?.message || 'Failed to sign up'
        notify.error(errorMessage)
      }
    },
    async signOutLocal(message?: string): Promise<void> {
      useUsersStore().setCurrentUser(null)
      notify.success(message || 'Signed out successfully!')
      await router.push({ name: 'signin' })
    },
    async signOut(): Promise<boolean> {
      return await useAppStore().execWithPending(async () => {
        await this.signOutLocal()
        return true
      })
    }
  },
  getters: {
    isAuthenticated: () => {
      return !!useUsersStore().currentUser
    }
  }
})
