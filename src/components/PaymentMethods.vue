<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto bg-gray-100 pb-16">
      <h1 class="pt-2 mb-10 text-center text-2xl font-bold">Make payment</h1>

      <div class="border-t bg-white">
        <div class="flex items-center px-8 py-5" @click="selectedPaymentMethod = 'creditCard'">
          <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"
                 :class="{'bg-blue-600': selectedPaymentMethod === 'creditCard'}"
                 type="radio" value="creditCard" v-model="selectedPaymentMethod">
          <label class="text-sm font-medium ml-4">Credit Card</label>
        </div>
        <div v-show="selectedPaymentMethod === 'creditCard'" class="grid grid-cols-2 gap-4 px-8 pb-8">
          Scanner le NFC
        </div>
      </div>

      <div class="border-t bg-white">
        <div class="flex items-center px-8 py-5" @click="selectedPaymentMethod = 'cheque'">
          <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"
                 :class="{'bg-blue-600': selectedPaymentMethod === 'cheque'}"
                 type="radio" value="cheque" v-model="selectedPaymentMethod">
          <label class="text-sm font-medium ml-4">Cheque</label>
        </div>
        <div v-show="selectedPaymentMethod === 'cheque'" class="grid grid-cols-2 gap-4 px-8 pb-8">
          <QRCodeScanner />
        </div>
      </div>

      <div class="border-t bg-white">
        <div class="flex items-center px-8 py-5" @click="selectedPaymentMethod = 'stripe'">
          <input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100"
                 :class="{'bg-blue-600': selectedPaymentMethod === 'stripe'}"
                 type="radio" value="stripe" v-model="selectedPaymentMethod">
          <label class="text-sm font-medium ml-4">Stripe</label>
        </div>
        <div v-show="selectedPaymentMethod === 'stripe'" class="grid grid-cols-2 gap-4 px-8 pb-8">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="stripe" class="w-40">
        </div>
      </div>
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/navigations/Navbar.vue";
import QRCodeScanner from "@/components/QRCodeScanner.vue";

export default {
  data() {
    return {
      selectedPaymentMethod: null,
    };
  },
  components: {QRCodeScanner, Navbar },
};
</script>
