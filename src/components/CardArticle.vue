<template>
  <div class="flex justify-center w-full aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden lg:aspect-none">
    <img
        :src="product.image"
        alt="Product image"
        class="object-center object-cover lg:w-32 lg:h-32"
    >
  </div>
  <div class="p-4">
    <h3 class="text-lg text-gray-700">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>
    <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
    <p class="mt-1 text-lg font-medium text-gray-900">{{ product.price }}€</p>
    <div class="mt-4">
      <CashManagerButton
          class="w-full"
          type="button"
          variant="primary"
          size="sm"
          >Ajouter au panier</CashManagerButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import CashManagerButton from "@/components/core/CashManagerButton.vue";
import type { Product } from "@/services/productService.ts";
import {PropType} from "vue";

/* PROPS */
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})
</script>