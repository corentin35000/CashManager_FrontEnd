<template>
  <div class="flex flex-col h-screen text-black">
    <div class="absolute left-3 top-3">
      <PreviousButton @click="$router.push('/cart')" />
    </div>
    <div class="flex-1 overflow-auto pb-16 mt-10">
      <h1 class="py-6 text-center text-2xl font-bold text-white">Make payment</h1>

      <div class="border-t bg-slate-900 border-gray-700 text-white">
        <div
          class="flex items-center p-5 cursor-pointer select-none"
          @click="selectedPaymentMethod = 'creditCard'"
        >
          <RadioButton
            :active="selectedPaymentMethod === 'creditCard'"
            @update:active="
              $event ? (selectedPaymentMethod = 'creditCard') : (selectedPaymentMethod = null)
            "
          />
          <label class="text-base font-medium ml-4 cursor-pointer">Credit Card</label>
        </div>
        <div v-show="selectedPaymentMethod === 'creditCard'" class="grid gap-4 p-4">
          <StripeForm />
        </div>

        <div class="border-t bg-slate-900 border-gray-700 text-white">
          <div
            class="flex items-center cursor-pointer select-none p-5"
            @click="selectedPaymentMethod = 'cheque'"
          >
            <RadioButton
              :active="selectedPaymentMethod === 'cheque'"
              @update:active="
                $event ? (selectedPaymentMethod = 'cheque') : (selectedPaymentMethod = null)
              "
            />
            <label class="text-base font-medium ml-4 cursor-pointer">Cheque</label>
          </div>
          <div v-show="selectedPaymentMethod === 'cheque'" class="grid gap-4 px-8 pb-8">
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
import PreviousButton from '@/components/buttons/PreviousButton.vue'
import RadioButton from '@/components/buttons/RadioButton.vue'

const selectedPaymentMethod: Ref<string | null> = ref('creditCard')
</script>
