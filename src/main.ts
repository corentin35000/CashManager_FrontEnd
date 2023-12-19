import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'

import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { configure, defineRule } from 'vee-validate'
import { required, email, numeric, min } from '@vee-validate/rules'
import { createPinia } from 'pinia'

import './assets/scss/tailwind.scss'
import './assets/scss/main.scss'

defineRule('required', required)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('min', min)

localize({ en })

configure({
  generateMessage: localize('en', {
    names: {}
  })
})

createApp(App).use(router).use(createPinia()).mount('#app')
