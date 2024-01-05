<template>
  <div class="flex flex-col h-screen text-black">
    <div class="flex-1 overflow-auto pb-16">
      <h1 class="py-6 text-center text-2xl font-bold text-white">Cart</h1>
      <div class="mx-auto md:flex md:space-x-6 xl:px-0 max-w-2xl px-2 sm:px-2 lg:max-w-7xl lg:px-6">
        <!-- Summary section -->
        <div
          v-if="cartStore.cartItems.length > 2"
          class="bg-slate-900 border mb-6 border-gray-700 w-full grid gap-2 group relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
        >
          <div class="flex justify-between mb-4">
            <p class="text-lg font-semibold text-white">Total</p>
            <p class="text-lg font-semibold text-white">{{ cartStore.totalStr }}</p>
          </div>
          <router-link to="payment-methods">
            <button class="w-full rounded-md bg-blue-500 py-1.5 text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </router-link>
        </div>
        <!-- Cart items section -->
        <div class="rounded-lg md:w-2/3 gap-6 grid">
          <CardArticle v-for="item in cartStore.cartItems" :key="item.id" :product="item.product" />
        </div>
        <!-- Summary section -->
        <div
          v-if="cartStore.cartItems.length > 0"
          class="bg-slate-900 border my-6 border-gray-700 w-full grid gap-2 group relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
        >
          <div class="flex justify-between mb-4">
            <p class="text-lg font-semibold text-white">Total</p>
            <p class="text-lg font-semibold text-white">{{ cartStore.totalStr }}</p>
          </div>
          <router-link to="payment-methods">
            <button class="w-full rounded-md bg-blue-500 py-1.5 text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </router-link>
        </div>

        <div class="text-base text-white justify-center flex" v-else>
          <p>
            Your cart is empty.
            <CashManagerLink class="justify-center" :link="{ name: 'home', query: $route.query }">
              Go shopping
            </CashManagerLink>
          </p>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script setup lang="ts">
import TabBar from '@/components/navigations/TabBar.vue'
import { useCartStore } from '@/stores/cartStore.ts'
import CardArticle from '@/components/cards/CardArticle.vue'
import CashManagerLink from '@/components/core/CashManagerLink.vue'

/* STORE */
const cartStore = useCartStore()

cartStore.getCart()
</script>
