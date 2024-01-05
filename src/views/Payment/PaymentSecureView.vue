<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center gap-3">
      <CashManagerSpinner />
      <h1 class="text-lg font-bold text-center text-white">Processing payment...</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CashManagerSpinner from '@/components/ui/CashManagerSpinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { notify } from '@/plugins/notyf.ts'
import { useBankStore } from '@/stores/bankStore.ts'

/* HOOKS */
const route = useRoute()
const router = useRouter()

/* STORES */
const bankStore = useBankStore()

/* REFS */
const paymentMethod: Ref<string | undefined> = ref(route.params.paymentMethod?.toString()) // check or card
const bankCheckBalanceQuery: Ref<string | undefined> = ref(route.query.bankCheckBalance?.toString())

onMounted(() => {
  if (paymentMethod.value === 'check') {
    payByCheck()
  } else if (paymentMethod.value === 'card') {
    bankStore.payByCard()
  } else {
    handlePaymentError()
  }
})

/* METHODS */
const handlePaymentError = () => {
  setTimeout(() => {
    notify.dismissAll()
    notify.error('Payment failed, please try again later.')
    router.push({ name: 'payment-methods' })
  }, 1500)
}
const payByCheck = () => {
  const _bankCheckBalanceQuery = bankCheckBalanceQuery.value
  if (!_bankCheckBalanceQuery) {
    return handlePaymentError()
  }

  const bankCheckBalance = parseInt(_bankCheckBalanceQuery)
  if (!isNaN(bankCheckBalance)) {
    bankStore.payByCheck(bankCheckBalance)
  } else {
    return handlePaymentError()
  }
}
</script>
