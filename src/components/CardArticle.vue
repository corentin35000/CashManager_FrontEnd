<template>
  <div
    class="group bg-slate-900 border border-gray-700 w-full grid gap-2 group relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
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
        <CashManagerButton
          v-if="props.product && !cartStore.productIsInCart(props.product.id)"
          class="w-full"
          type="button"
          variant="primary"
          size="md"
          @click="props.product && cartStore.addToCart(props.product.id)"
        >
          Add to cart
        </CashManagerButton>

        <div
          v-if="props.product && cartStore.productIsInCart(props.product.id)"
          class="flex items-center gap-3 my-4"
        >
          <CounterControl
            :value="productQuantity"
            :max="props.product?.quantity"
            @update:number="onProductQuantityUpdate"
          />

          <CashManagerButton
            variant="red"
            class="w-full h-9"
            @click="props.product && cartStore.removeFromCart(props.product.id)"
          >
            Delete
          </CashManagerButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CashManagerButton from '@/components/core/CashManagerButton.vue'
import type { Product } from '@/services/ProductService.ts'
import { PropType, computed } from 'vue'
import type { ComputedRef } from 'vue'
import CounterControl from '@/components/buttons/CounterControl.vue'
import { useCartStore } from '@/stores/cartStore.ts'

/* PROPS */
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

/* STORE */
const cartStore = useCartStore()

/* COMPUTED */
const productQuantity: ComputedRef<number> = computed(() => {
  return props.product ? cartStore.productCartQuantity(props.product.id) : 0
})

/* METHODS */
const onProductQuantityUpdate = (newQuantity: number) => {
  if (props.product) {
    if (newQuantity === 0) {
      cartStore.removeFromCart(props.product.id)
    } else {
      cartStore.updateProductQuantity(props.product.id, newQuantity)
    }
  }
}
</script>
