<template>
  <div class="fixed z-50 w-full h-16 bottom-0 bg-gray-700 border-t border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
      <router-link
        to="/"
        class="inline-flex flex-col items-center justify-center px-5 hover:opacity-90 group"
        exact-active-class="bg-gray-800"
        v-slot="{ isExactActive }"
      >
        <CashManagerIcon
          name="home"
          mode="stroke"
          :width="22"
          :height="22"
          :color="isExactActive ? '#3b82f6' : '#9ca3af'"
        />
      </router-link>
      <router-link
        to="/cart"
        class="inline-flex flex-col items-center justify-center px-5 hover:opacity-90 group"
        :class="activeRoute === '/payment-methods' ? 'bg-gray-800' : ''"
        exact
        active-class="bg-gray-800"
        v-slot="{ isExactActive }"
      >
        <div class="relative flex items-center">
          <span
            class="w-4 h-4 flex items-center justify-center absolute bottom-5 left-4 bg-red-500 rounded-full text-xs text-white"
            v-if="cartStore.cartItems.length > 0"
          >
            {{ cartStore.cartItems.length }}
          </span>
          <CashManagerIcon
            name="shopping-cart"
            mode="stroke"
            :width="22"
            :height="22"
            :color="isExactActive || activeRoute === '/payment-methods' ? '#3b82f6' : '#9ca3af'"
          />
        </div>
      </router-link>
      <router-link
        to="/profile"
        class="inline-flex flex-col items-center justify-center px-5 hover:opacity-90 group"
        exact
        active-class="bg-gray-800"
        v-slot="{ isExactActive }"
      >
        <CashManagerIcon
          name="user"
          mode="stroke"
          :width="22"
          :height="22"
          :color="isExactActive ? '#3b82f6' : '#9ca3af'"
        />
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore.ts'

const route = useRoute()
const activeRoute = ref(route.path)
const cartStore = useCartStore()
</script>
