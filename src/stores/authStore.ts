import { defineStore } from 'pinia'
import { notify } from '@/plugins/notyf'
import type { ErrorResponse } from '@/services/BaseApiService'
import type { User } from '@/services/UserService'
import type {
  LoginCommand,
  SignInResponse,
  SignupCommand,
  SignUpResponse
} from '@/services/AuthService'
import AuthService from '@/services/AuthService'
import CookieService from '@/services/CookieService'
import { useUsersStore } from '@/stores/usersStore'
import { useAppStore } from '@/stores/appStore'
import router from '@/router'

const authToken: string | undefined = CookieService.getCookie('token')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: (authToken || null) as string | null
  }),
  actions: {
    setToken(token: string | null): void {
      this.token = token
      if (token) {
        CookieService.setCookie('token', token, 30)
      } else {
        CookieService.deleteCookie('token')
      }
    },
    async signIn(data: LoginCommand): Promise<boolean> {
      return await useAppStore().execWithPending(async () => {
        const response: SignInResponse = await AuthService.signIn(data)
        if ('error' in response) {
          notify.error(response.error || 'Failed to sign in.')
          return false
        }
        useUsersStore().setCurrentUser(response.user)
        this.setToken(response.token)
        notify.success('Signed in successfully!')
        await router.push({ name: 'home' })
        return true
      })
    },
    async signUp(data: SignupCommand): Promise<boolean> {
      return await useAppStore().execWithPending(async () => {
        const response: SignUpResponse = await AuthService.signUp(data)
        if ('error' in response) {
          notify.error(response.error || 'Failed to sign up.')
          return false
        }
        useUsersStore().setCurrentUser(response.user)
        this.setToken(response.token)
        notify.success('Signed up successfully!')
        await router.push({ name: 'home' })
        return true
      })
    },
    async signOutLocal(message?: string): Promise<void> {
      useUsersStore().setCurrentUser(null)
      this.setToken('')
      notify.success(message || 'Signed out successfully!')
      await router.push({ name: 'signin' })
    },
    async signOut(): Promise<boolean> {
      return await useAppStore().execWithPending(async () => {
        const response: { message: string } | ErrorResponse = await AuthService.signOut()
        if ('error' in response) {
          notify.error(response.error || 'Failed to sign out.')
          return false
        }
        await this.signOutLocal(response.message)
        return true
      })
    },
    async fetchCurrentUser(): Promise<void> {
      return await useAppStore().execWithPending(async () => {
        const response: User | ErrorResponse = await AuthService.getCurrentUser()
        if ('error' in response) {
          notify.error(response.error || 'Failed to fetch current user.')
          throw new Error(response.error || 'Failed to fetch current user.')
        } else {
          useUsersStore().setCurrentUser(response)
        }
      })
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return !!useUsersStore().currentUser && !!state.token
    }
  }
})
