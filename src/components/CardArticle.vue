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
    <div v-if="props.product?.quantity > 0" class="flex items-center border-gray-100">
      <button @click="decreaseQuantity(item)" class="rounded-l bg-gray-100 py-1 px-3.5 hover:bg-blue-500 hover:text-blue-50"> - </button>
      <div class="h-8 w-8 border bg-white text-center flex items-center justify-center">20</div>
      <button @click="increaseQuantity(item)" class="rounded-r bg-gray-100 py-1 px-3 hover:bg-blue-500 hover:text-blue-50"> + </button>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
</script>