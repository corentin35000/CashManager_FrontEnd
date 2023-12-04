import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf'
import type {
  LoginCommand,
  SignInResponse,
  SignupCommand,
} from '@/services/AuthService'
import AuthService from '@/services/AuthService'
import { useUsersStore } from '@/stores/usersStore'
import { useAppStore } from '@/stores/appStore'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
  }),
  actions: {
    async signIn(data: LoginCommand): Promise<boolean> {
      return await useAppStore().execWithPending(async () => {
        const response: SignInResponse = await AuthService.signIn(data)
        if ('error' in response) {
          notify.error(response.error || 'Failed to sign in.')
          return false
        }
        useUsersStore().setCurrentUser(response)
        notify.success('Signed in successfully!')
        await router.push({ name: 'home' })
        return true
      })
    },
    async signUp(data: SignupCommand): Promise<void> {
      try {
        await useAppStore().execWithPending<void>(async (): Promise<void> => {
          await AuthService.signUp(data)
          await router.push({ name: 'login' })
          notify.success('Signed up successfully!')
        })
      } catch (e) {
        console.error(e)
        notify.error('Failed to sign up')
      }
    },
    async signOut(message?: string): Promise<void> {
      useUsersStore().setCurrentUser(null)
      notify.success(message || 'Signed out successfully!')
      await router.push({ name: 'signin' })
    },
  },
  getters: {
    isAuthenticated: () => {
      return !!useUsersStore().currentUser
    }
  }
})
