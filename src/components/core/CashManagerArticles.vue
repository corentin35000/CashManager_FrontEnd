<template>
  <div>
    <div class="max-w-2xl mx-auto px-2 sm:px-2 lg:max-w-7xl lg:px-6">
      <div class="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <CardArticle v-for="product in props.products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardArticle from '@/components/CardArticle.vue'
import { Product } from '@/services/ProductService.ts'
import type { PropType } from 'vue'

/* PROPS */
const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true
  }
})
</script>
