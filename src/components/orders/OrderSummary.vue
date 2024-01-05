<template>
  <div class="mt-16">
    <div v-if="props.order">
      <!--   HEADER INFOS      -->
      <div class="py-6 px-4 bg-blue-700 rounded-lg">
        <dl class="text-gray-300 text-sm">
          <div class="flex justify-between">
            <dt class="font-medium text-gray-100">Date placed</dt>
            <dd>
              <time :datetime="convertToSimpleDateFormat(props.order.created_at)">
                {{ convertToReadableDateFormat(props.order.created_at) }}
              </time>
            </dd>
          </div>

          <div class="border-t border-gray-200 mt-6 pt-6 flex justify-between">
            <dt class="font-medium text-gray-100">Order number</dt>
            <dd>
              {{ props.order.id }}
            </dd>
          </div>

          <div class="border-t border-gray-200 mt-6 pt-6 flex justify-between">
            <dt class="font-medium text-gray-100">Total amount</dt>
            <dd>
              {{ convertCentsToEuros(props.order.total_amount) }}
            </dd>
          </div>

          <div class="border-t border-gray-200 mt-6 pt-6 flex justify-between">
            <dt class="font-medium text-gray-100">Total paid</dt>
            <dd>
              {{ convertCentsToEuros(props.order.total_paid) }}
            </dd>
          </div>

          <div class="border-t border-gray-200 mt-6 pt-6 flex justify-between">
            <dt class="font-medium text-gray-100">Status</dt>
            <dd>
              <OrderStatusBadge :status="props.order.status" />
            </dd>
          </div>
        </dl>

        <DownloadInvoiceButton v-if="props.order.status === 'paid'" :order="props.order" />
      </div>

      <!--   ORDER LIST ITEMS      -->
      <table class="w-full mt-4 indent-0 border-inherit border-collapse">
        <tbody class="text-sm">
          <template v-for="orderProduct in props.order.orderProducts">
            <OrderItem v-if="orderProduct" :key="orderProduct.id" :orderProduct="orderProduct" />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OrderItem from '@/components/orders/OrderItem.vue'
import type { PropType } from 'vue'
import type { Order } from '@/services/OrderService.ts'
import { convertToReadableDateFormat, convertToSimpleDateFormat } from '@/utils/dateUtils.ts'
import { convertCentsToEuros } from '@/utils/priceUtils.ts'
import OrderStatusBadge from '@/components/orders/OrderStatusBadge.vue'
import DownloadInvoiceButton from '@/components/orders/DownloadInvoiceButton.vue'

/* PROPS */
const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true
  }
})
</script>
