import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import SignUpView from '@/views/SignUpView.vue'
import CookieService from '@/services/CookieService.ts'
import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/SignInView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'signup',
          name: 'signup',
          component: SignUpView
        },
        {
          path: 'signin',
          name: 'signin',
          component: SignInView
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const publicRoutes: string[] = ['logout', 'signup', 'signin', 'not-found']
    if (to.name && publicRoutes.includes(to.name.toString())) {
      next()
    } else {
      const user: string | undefined = CookieService.getCookie('user')
      if (!user) {
        next({ name: 'signup' })
      } else {
        next()
      }
    }
  }
)

export default router
