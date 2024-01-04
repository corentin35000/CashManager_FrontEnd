<template>
  <div
    class="p-2 flex justify-center w-full aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden lg:aspect-none"
  >
    <img
      :src="product.image"
      alt="Product image"
      class="object-center object-cover lg:w-32 lg:h-32 max-w-80"
    />
  </div>
  <div class="p-4">
    <h3 class="text-lg text-gray-200 font-medium">
      {{ props.product.name }}
    </h3>
    <p class="mt-1 text-sm text-gray-400">{{ props.product.description }}</p>
    <p class="mt-2 text-lg font-medium text-gray-100">{{ props.product.price }}€</p>
    <div class="mt-4">
      <CashManagerButton class="w-full" type="button" variant="primary" size="md"
        >Ajouter au panier</CashManagerButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import CashManagerButton from '@/components/core/CashManagerButton.vue'
import type { Product } from '@/services/ProductService.ts'
import type { PropType } from 'vue'

/* PROPS */
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})
</script>
