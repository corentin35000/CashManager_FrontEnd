<template>
  <div class="flex flex-col h-screen text-black">
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
        <div
          v-show="selectedPaymentMethod === 'creditCard'"
          class="grid grid-cols-2 gap-4 px-8 pb-8"
        >
          <div
            v-show="selectedPaymentMethod === 'creditCard'"
            class="grid grid-cols-2 gap-4 px-8 pb-8"
          >
            <StripeForm />
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
      </div>
      <TabBar></TabBar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TabBar from '@/components/navigations/TabBar.vue'
import QRCodeScanner from '@/components/QRCodeScanner.vue'
import StripeForm from '@/components/forms/StripeForm.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const selectedPaymentMethod: Ref<string | null> = ref(null)
</script>
