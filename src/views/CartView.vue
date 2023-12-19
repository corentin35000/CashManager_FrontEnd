<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto bg-gray-100 pb-16">
      <h1 class="pt-2 mb-10 text-center text-2xl font-bold">Cart</h1>
      <div class="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg md:w-2/3">
          <div v-for="item in cartItems" :key="item.id" class="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img :src="item.product.image" alt="product-image" class="w-full rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div class="mt-5 sm:mt-0">
                <h2 class="text-lg font-bold text-gray-900">{{ item.product.name }}</h2>
              </div>
              <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div class="flex items-center border-gray-100">
                  <button @click="decreaseQuantity(item)" class="rounded-l bg-gray-100 py-1 px-3.5 hover:bg-blue-500 hover:text-blue-50"> - </button>
                  <div class="h-8 w-8 border bg-white text-center flex items-center justify-center">{{ item.quantity }}</div>
                  <button @click="increaseQuantity(item)" class="rounded-r bg-gray-100 py-1 px-3 hover:bg-blue-500 hover:text-blue-50"> + </button>
                </div>
                <div class="flex items-center space-x-4">
                  <p class="text-sm">{{ item.product.price }}</p>
                  <button @click="removeItem(item.id)" class="duration-150 hover:text-red-500">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg border bg-white p-6 shadow-md md:w-1/3 mb-8">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">{{ subtotal }}</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <p class="text-lg font-bold">{{ total }}</p>
          </div>
          <router-link to="payment-methods">
            <button class="w-full rounded-md bg-blue-500 py-1.5 text-blue-50 hover:bg-blue-600">Check out</button>

          </router-link>
        </div>
      </div>
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/navigations/Navbar.vue";
import {useCartStore} from "@/stores/cartStore.ts";

export default {
  components: { Navbar },
  data() {
    return {
      cartItems: [],
      subtotal: '0',
      total: '0',
    };
  },
  methods: {
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      this.calculateTotals();
    },
    increaseQuantity(item) {
      item.quantity++;
      this.calculateTotals();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.calculateTotals();
      }
    },
    calculateTotals() {
      let subtotal = 0;
      this.cartItems?.forEach(item => {
        subtotal += item.product.price * item.quantity;
      });
      this.subtotal = subtotal.toFixed(2) + '€';
      this.total = subtotal;
    },
    async fetchCartData() {
      const cartStore = useCartStore();
      await cartStore.getCart();
      this.cartItems = cartStore.cart;
      this.calculateTotals();
    },
  },
  mounted() {
    this.fetchCartData();
  },
};
</script>
