<template>
  <tr v-if="props.orderProduct" class="border-b border-gray-700">
    <td class="py-6 pr-8">
      <div class="flex items-center">
        <div class="bg-blue-700 p-0.5 mr-6 rounded">
          <img
            v-if="props.orderProduct.product.image"
            class="object-center object-cover w-16 h-16 rounded max-w-full block"
            :src="props.orderProduct.product.image"
            :alt="props.orderProduct.product.description"
          />
        </div>

        <div>
          <div class="font-medium text-gray-100">
            {{ props.orderProduct.product.name }}
          </div>

          <div class="mt-1 text-gray-300">Quantity: {{ props.orderProduct.quantity }}</div>

          <div class="mt-1 text-gray-300">
            {{ formatPrice(props.orderProduct.product.price) }}
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import type { OrderProduct } from '@/services/OrderService.ts'
import { formatPrice } from '@/utils/priceUtils.ts'

/* PROPS */
const props = defineProps({
  orderProduct: {
    type: Object as PropType<OrderProduct>,
    required: true
  }
})
</script>
