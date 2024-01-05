<template>
  <div class="mx-auto md:flex md:space-x-6 max-w-2xl lg:max-w-7xl">
    <div class="mt-4">
      <OrderHistoryCard :orders="orderStore.orders" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import OrderHistoryCard from '@/components/cards/OrderHistoryCard.vue'
import { useOrderStore } from '@/stores/orderStore.ts'

/* STORE */
const orderStore = useOrderStore()
orderStore.getCurrentUserOrders()
</script>
