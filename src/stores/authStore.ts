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
    async signIn(data: LoginCommand): Promise<any> {
      try {
        await useAppStore().execWithPending(async () => {
          const response: SignInResponse = await AuthService.signIn(data)
          console.log("response", response)
          useUsersStore().setCurrentUser(response)
          await router.push({ name: 'home' })
          return true
        })
      }catch (e) {
        console.error(e)
        notify.error('Failed to sign in.')
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
