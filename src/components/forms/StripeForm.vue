<template>
  <div class="col-span-2">
    <label class="text-xs font-semibold" htmlFor="cardNumber">Card number</label>
    <input
        class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
        type="text"
        id="cardNumber"
        v-model="cardNumber"
        @input="formatCardNumber"
        placeholder="0000 0000 0000 0000"
        maxlength="19">
  </div>
  <div class="col-span-2">
    <label class="text-xs font-semibold" for="expiryDate">Expiry Date</label>
    <input
        class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
        type="text"
        id="expiryDate"
        v-model="expiryDate"
        @input="formatExpiryDate"
        placeholder="MM/YYYY">
  </div>
  <div class="col-span-2">
    <label class="text-xs font-semibold" htmlFor="cvc">CVC/CVV</label>
    <input
        class="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
        type="number"
        id="cvc"
        maxlength="3"
        placeholder="...">
  </div>

  <CashManagerButton class="mt-4 w-full" @click="pay">Pay</CashManagerButton>
</template>

<script setup>
import {ref} from 'vue';
import CashManagerInput from "@/components/core/CashManagerInput.vue";
import CashManagerButton from "@/components/core/CashManagerButton.vue";

const cardNumber = ref('');

const expiryDate = ref('');

const pay = () => {
  console.log('pay');
};

const formatExpiryDate = () => {
  let numbersOnly = expiryDate.value.replace(/\D/g, '');
  if (numbersOnly.length > 2) {
    numbersOnly = numbersOnly.substring(0, 2) + '/' + numbersOnly.substring(2, 6);
  }
  expiryDate.value = numbersOnly;
};

const formatCardNumber = () => {
  let numbersOnly = cardNumber.value.replace(/\D/g, '');
  let spaceSeparated = numbersOnly.match(/.{1,4}/g);
  cardNumber.value = spaceSeparated ? spaceSeparated.join(' ') : numbersOnly;
};
</script>
