<template>
  <div class="bg-slate-900 border border-gray-700 px-4 py-16 max-w-screen-xl mx-auto rounded-lg">
    <div class="max-w-xl">
      <h1 class="text-gray-100 font-bold text-2xl">Order history</h1>
      <p class="text-gray-400 text-sm mt-2">
        Check the status of recent orders, manage returns, and download invoices.
      </p>
    </div>

    <template v-if="props.orders">
      <OrderSummary v-for="order in props.orders" :key="order.id" :order="order" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import OrderSummary from '@/components/orders/OrderSummary.vue'
import type { PropType } from 'vue'
import type { Order } from '@/services/OrderService.ts'

/* PROPS */
const props = defineProps({
  orders: {
    type: Array as PropType<Order[]>,
    required: true
  }
})
</script>
