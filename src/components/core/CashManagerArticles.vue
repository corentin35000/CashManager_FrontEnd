<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-6 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <div v-for="item in products" :key="item.id" class="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="flex justify-center w-full aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden lg:aspect-none">
            <img
                :src="item.imageUrl"
                alt="Product image"
                class="object-center object-cover lg:w-32 lg:h-32"
            >
          </div>
          <div class="p-4">
            <h3 class="text-lg text-gray-700">
              <a href="#">
                {{ item.name }}
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
            <p class="mt-1 text-lg font-medium text-gray-900">{{ item.price }}</p>
            <div class="mt-4">
              <CashManagerButton
                  class="w-full"
                  type="button"
                  variant="primary"
                  size="sm"
                  @click="addToCart(item)">Acheter</CashManagerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CashManagerButton from "@/components/core/CashManagerButton.vue";

export default {
  name: 'ProductList',
  components: {CashManagerButton},
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'PC Gamer SPARKLE (Sans Windows)',
          description: 'AMD Ryzen 5 7600X - Radeon RX 6800 - 32 Go RAM',
          price: '1599.99 €',
          imageUrl: 'https://media.topachat.com/media/s300/63822fff587cc8169e4a1a33.webp'
        },
        {
          id: 2,
          name: 'PC Gamer SPARKLE (Avec Windows)',
          description: 'AMD Ryzen 5 7600X - Radeon RX 6800 - 32 Go RAM',
          price: '1719.99 €',
          imageUrl: 'https://media.topachat.com/media/s300/63822fff587cc8169e4a1a33.webp'
        },
        {
          id: 2,
          name: 'PC Gamer SPARKLE (Avec Windows)',
          description: 'AMD Ryzen 5 7600X - Radeon RX 6800 - 32 Go RAM',
          price: '1719.99 €',
          imageUrl: 'https://media.topachat.com/media/s300/63822fff587cc8169e4a1a33.webp'
        },
      ]
    };
  },
  methods: {
    addToCart(item) {
      this.$store.commit('cart/addItem', item);
    }
  }
};
</script>
