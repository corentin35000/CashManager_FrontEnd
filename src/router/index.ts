import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import SignUpView from '@/views/Auth/SignUpView.vue'
import CookieService from '@/services/CookieService.ts'
import SignInView from '@/views/Auth/SignInView.vue'
import CartView from '@/views/CartView.vue'
import ProfileView from '@/views/Profile/ProfileView.vue'
import PaymentMethods from '@/components/PaymentMethods.vue'
import ProductView from '@/views/Product/ProductView.vue'
import PaymentSecureView from '@/views/Payment/PaymentSecureView.vue'

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
          path: 'profile/:viewName',
          name: 'profileView',
          component: ProfileView
        },
        {
          path: 'payment-methods',
          name: 'payment-methods',
          component: PaymentMethods
        },
        {
          path: 'payment-secure/:paymentMethod',
          name: 'payment-secure',
          component: PaymentSecureView
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
    const publicRoutes: string[] = ['logout', 'signup', 'signin', 'app', 'cart', 'not-found']
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
