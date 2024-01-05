import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { configure, defineRule } from 'vee-validate'
import { required, email, numeric, min, confirmed, digits } from '@vee-validate/rules'
import { createPinia } from 'pinia'

import './assets/scss/tailwind.scss'
import './assets/scss/main.scss'

defineRule('required', required)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('min', min)
defineRule('confirmed', confirmed)
defineRule('digits', digits)

defineRule('card_number', (value: string) => {
  // Utilisez une expression régulière pour valider le numéro de carte
  const cardNumberRegex = /^[0-9]{16}$/ // Exemple simple pour une carte de 16 chiffres
  const valueWithoutSpaces = value.replace(/\s+/g, '')
  return cardNumberRegex.test(valueWithoutSpaces) || 'The card number is not valid.'
})

defineRule('expiry_date', (value: string) => {
  // Valider MM/YY
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
  const valueWithoutSlash = value.replace('/', '')
  return expiryDateRegex.test(valueWithoutSlash) || 'The expiry date is not valid. Format MM/YY.'
})

defineRule('cvc', (value: string) => {
  // Valider un CVC de 3 chiffres
  const cvcRegex = /^[0-9]{3}$/
  return cvcRegex.test(value) || 'The CVC must be a 3-digit number.'
})

defineRule('complex_password', (value: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return (
    passwordRegex.test(value) ||
    'The password must have at least 8 characters, one number, one uppercase letter, and one special character.'
  )
})

defineRule('price_format', (value: string) => {
  const priceRegex = /^[0-9]+([.,][0-9]{1,2})?$/
  return (
    priceRegex.test(value) ||
    'The price field must be a valid number with two decimal places maximum.'
  )
})

localize({ en })

configure({
  generateMessage: localize('en', {
    names: {}
  })
})

createApp(App).use(router).use(createPinia()).mount('#app')
