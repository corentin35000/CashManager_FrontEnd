<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto bg-gray-100 pb-16">
      <h1 class="pt-2 mb-10 text-center text-2xl font-bold">Market</h1>
      <Article :products=products />
    </div>
    <Navbar />
  </div>
</template>
<script setup lang="ts">
import Article from "@/components/core/CashManagerArticles.vue"
import Navbar from "@/components/navigations/Navbar.vue";
import {onMounted, ref} from "vue";
import {useProductStore} from "@/stores/productStore.ts";
import {Product} from "@/services/ProductService.ts";

/* STORES */
const productStore = useProductStore()

/* REFS */
const products = ref([] as Product[])


/* MOUNTED */
onMounted(async () => {
  await productStore.getProducts()
  products.value = productStore.products
  console.log(products.value)
})
</script>