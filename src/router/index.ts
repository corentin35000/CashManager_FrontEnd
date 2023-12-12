import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import SignUpView from '@/views/Auth/SignUpView.vue'
import CookieService from '@/services/CookieService.ts'
import AppView from "@/views/AppView.vue";
import SignInView from "@/views/Auth/SignInView.vue";
import CartView from "@/views/CartView.vue";
import ProfileView from "@/views/ProfileView.vue";
import PaymentMethods from "@/components/PaymentMethods.vue";
import ProductView from "@/views/Product/ProductView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'home',
          component: ProductView
        },
        {
          path: 'app',
          name: 'app',
          component: AppView
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
        },
        {
          path: 'cart',
          name: 'cart',
          component: CartView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        },
        {
          path: 'payment-methods',
          name: 'payment-methods',
          component: PaymentMethods
        },
        {
          path: 'products',
          name: 'products',
          component: ProductView
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
    const publicRoutes: string[] = ['logout', 'signup', 'signin', 'app', 'payment-methods', 'cart', 'profile', 'not-found']
    if (to.name && publicRoutes.includes(to.name.toString())) {
      next()
    } else {
      const user: string | undefined = CookieService.getCookie('user')
      if (!user) {
        next({ name: 'signin' })
      } else {
        next()
      }
    }
  }
)

export default router
