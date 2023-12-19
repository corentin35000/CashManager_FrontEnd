<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto bg-gray-100 pb-16">
      <h1 class="pt-2 mb-10 text-center text-2xl font-bold">Make payment</h1>

      <div class="border-t bg-white">
        <div class="flex items-center px-8 py-5" @click="selectedPaymentMethod = 'creditCard'">
          <input
            class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"
            :class="{ 'bg-blue-600': selectedPaymentMethod === 'creditCard' }"
            type="radio"
            value="creditCard"
            v-model="selectedPaymentMethod"
          />
          <label class="text-sm font-medium ml-4">Credit Card</label>
        </div>
<<<<<<< HEAD
        <div v-show="selectedPaymentMethod === 'creditCard'" class="grid grid-cols-2 gap-4 px-8 pb-8">
          <StripeForm />
=======
        <div
          v-show="selectedPaymentMethod === 'creditCard'"
          class="grid grid-cols-2 gap-4 px-8 pb-8"
        >
          Scanner le NFC
>>>>>>> 0b466e812c9c0d9bb763961c3234bfd6e11d6777
        </div>
      </div>

      <div class="border-t bg-white">
        <div class="flex items-center px-8 py-5" @click="selectedPaymentMethod = 'cheque'">
          <input
            class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"
            :class="{ 'bg-blue-600': selectedPaymentMethod === 'cheque' }"
            type="radio"
            value="cheque"
            v-model="selectedPaymentMethod"
          />
          <label class="text-sm font-medium ml-4">Cheque</label>
        </div>
        <div v-show="selectedPaymentMethod === 'cheque'" class="grid grid-cols-2 gap-4 px-8 pb-8">
          <QRCodeScanner />
        </div>
      </div>
<<<<<<< HEAD
=======

      <div class="border-t bg-white">
        <div class="flex items-center px-8 py-5" @click="selectedPaymentMethod = 'stripe'">
          <input
            class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"
            :class="{ 'bg-blue-600': selectedPaymentMethod === 'stripe' }"
            type="radio"
            value="stripe"
            v-model="selectedPaymentMethod"
          />
          <label class="text-sm font-medium ml-4">Stripe</label>
        </div>
        <div v-show="selectedPaymentMethod === 'stripe'" class="grid grid-cols-2 gap-4 px-8 pb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
            alt="stripe"
            class="w-40"
          />
        </div>
      </div>
>>>>>>> 0b466e812c9c0d9bb763961c3234bfd6e11d6777
    </div>
    <TabBar></TabBar>
  </div>
</template>

<<<<<<< HEAD
<script>
import Navbar from "@/components/navigations/Navbar.vue";
import QRCodeScanner from "@/components/QRCodeScanner.vue";
import StripeForm from "@/components/forms/StripeForm.vue";

export default {
  data() {
    return {
      selectedPaymentMethod: null,
    };
  },
  components: {StripeForm, QRCodeScanner, Navbar },
};
=======
<script lang="ts" setup>
import TabBar from '@/components/navigations/TabBar.vue'
import QRCodeScanner from '@/components/QRCodeScanner.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const selectedPaymentMethod: Ref<string | null> = ref(null)
>>>>>>> 0b466e812c9c0d9bb763961c3234bfd6e11d6777
</script>
