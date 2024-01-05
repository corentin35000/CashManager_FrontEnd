<template>
  <div class="flex items-center text-white">
    <div class="rounded-full w-5 h-5 p-0.5 flex items-center justify-center" :class="badgeColor">
      <CashManagerIcon
        :name="badgeIcon.name"
        :mode="badgeIcon.mode"
        :color="badgeIcon.color"
        :view-box="badgeIcon.viewBox"
        :width="14"
        :height="14"
      />
    </div>
    <span class="ml-2 text-sm">
      {{ status }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import type { OrderStatus } from '@/services/OrderService.ts'
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'
/* PROPS */
const props = defineProps({
  status: {
    type: String as PropType<OrderStatus>,
    required: true
  }
})

/* COMPUTED */
const badgeColor = computed(() => {
  switch (props.status) {
    case 'paid':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'cancelled':
      return 'bg-red-500'
    default:
      return 'bg-red-500'
  }
})

const badgeIcon = computed(() => {
  switch (props.status) {
    case 'paid':
      return {
        name: 'check',
        mode: 'stroke',
        color: '#fff',
        viewBox: '0 0 24 24'
      }
    case 'pending':
      return {
        name: 'hourglass-half',
        mode: 'fill',
        color: '#0f172a',
        viewBox: '0 0 384 512'
      }
    case 'cancelled':
      return {
        name: 'x',
        mode: 'stroke',
        color: '#fff',
        viewBox: '0 0 24 24'
      }
    default:
      return {
        name: 'x',
        mode: 'stroke',
        color: '#fff',
        viewBox: '0 0 24 24'
      }
  }
})
</script>
