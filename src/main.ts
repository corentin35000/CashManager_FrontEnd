import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { configure, defineRule } from 'vee-validate'
import { required, email, numeric, min, confirmed } from '@vee-validate/rules'
import { createPinia } from 'pinia'

import './assets/scss/tailwind.scss'
import './assets/scss/main.scss'

defineRule('required', required)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('min', min)
defineRule('confirmed', confirmed)

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
