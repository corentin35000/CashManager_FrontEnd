import { createApp } from 'vue'
import './styles.css'
import router from '@/router'
import App from './App.vue'

/*vee-validate*/
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import { configure, defineRule } from 'vee-validate'
import { required, email, numeric, min } from '@vee-validate/rules'
import { createPinia } from 'pinia'

/* SCSS FILES */
import './assets/scss/tailwind.scss'
import './assets/scss/main.scss'

// define global rules
defineRule('required', required)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('min', min)

localize({ en })

// Activate the locale
configure({
  generateMessage: localize('en', {
    names: {}
  })
})

createApp(App).use(router).use(createPinia()).mount('#app')
