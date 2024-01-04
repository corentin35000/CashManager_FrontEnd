<template>
  <Form v-slot="{ meta }" class="grid gap-4" @submit="handleSubmit">
    <CashManagerInput
      id="cardNumber"
      label="Card Number"
      :value="cardNumber"
      @update:value="cardNumber = formatCardNumber($event)"
      :rules="cardNumberRules"
      placeholder="1234 5678 9012 3456"
    />

    <CashManagerInput
      id="expiryDate"
      label="Expiry Date"
      :value="expiryDate"
      @update:value="expiryDate = formatExpiryDate($event)"
      :rules="expiryDateRules"
      placeholder="MM/YY"
    />

    <CashManagerInput
      id="cvc"
      label="CVC/CVV"
      :value="cvc"
      @update:value="cvc = formatCVC($event)"
      :rules="cvcRules"
      placeholder="123"
    />

    <CashManagerButton :disabled="!meta.valid" :load="buttonLoading" type="submit">
      Pay
    </CashManagerButton>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import CashManagerInput from '@/components/core/CashManagerInput.vue'
import CashManagerButton from '@/components/core/CashManagerButton.vue'

/* REFS */
const cardNumber = ref('')
const expiryDate = ref('')
const cvc = ref('')
const buttonLoading = ref(false)

/* INPUTS ELEMENT */
const expiryDateInput: Ref<null | HTMLElement> = ref(null)
const cvcInput: Ref<null | HTMLElement> = ref(null)

/* RULES */
const cardNumberRules = 'required|card_number'
const expiryDateRules = 'required|expiry_date'
const cvcRules = 'required|cvc'

/* LIFECYCLE */
onMounted(() => {
  expiryDateInput.value = document.getElementById('expiryDate')
  cvcInput.value = document.getElementById('cvc')
})

/* METHODS */

const formatCardNumber = (value: string) => {
  if (value.length >= 19) {
    const _expiryDateInput = expiryDateInput.value
    if (_expiryDateInput) {
      _expiryDateInput.focus()
    }
    return value.substring(0, 19)
  }
  // Supprimer tous les espaces non désirés
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  // Ajouter un espace tous les 4 chiffres
  let parts = []
  for (let i = 0; i < v.length; i += 4) {
    parts.push(v.substring(i, i + 4))
  }
  return parts.join(' ')
}

const formatExpiryDate = (value: string) => {
  if (value.length >= 5) {
    const _cvcInput = cvcInput.value
    if (_cvcInput) {
      _cvcInput.focus()
    }
    return value.substring(0, 5)
  }
  // Supprimer tous les espaces non désirés
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  // Ajouter un espace tous les 2 chiffres
  let parts = []
  for (let i = 0; i < v.length; i += 2) {
    parts.push(v.substring(i, i + 2))
  }
  return parts.join('/')
}

const formatCVC = (value: string) => {
  // Supprimer tous les espaces non désirés
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  return v.substring(0, 3)
}

const handleSubmit = () => {
  // Logique de soumission du formulaire
  console.log('Form Submitted', {
    cardNumber: cardNumber.value,
    expiryDate: expiryDate.value,
    cvc: cvc.value
  })
}
</script>
