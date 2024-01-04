<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto pb-24">
      <h1 class="py-6 text-center text-2xl font-bold text-white">Market</h1>
      <CashManagerArticles :products="products" />
    </div>
    <TabBar />
  </div>
</template>
<script setup lang="ts">
import CashManagerArticles from '@/components/core/CashManagerArticles.vue'
import TabBar from '@/components/navigations/TabBar.vue'
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/productStore.ts'
import { Product } from '@/services/ProductService.ts'
import { useCartStore } from '@/stores/cartStore.ts'

/* STORES */
const productStore = useProductStore()
const cartStore = useCartStore()

/* REFS */
const products = ref([] as Product[])

/* MOUNTED */
onMounted(async () => {
  await productStore.getProducts()
  products.value = productStore.products
  console.log(products.value)
})

/* Methods */

cartStore.getCart()
</script>
