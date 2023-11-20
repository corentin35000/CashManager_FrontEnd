<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6 p-4" @submit="login">
    <CashManagerInput
        v-model:value="values.email"
        type="email"
        id="email"
        label="Email"
        rules="required|email"
        placeholder="email@time-manager.com"
    />

    <CashManagerInput
        v-model:value="values.password"
        type="password"
        id="password"
        label="Password"
        rules="required"
    />

    <slot />

    <CashManagerButton :disabled="!meta.valid" :load="buttonLoading" type="submit">
      {{ buttonLoading ? 'Loading...' : 'Login' }}
    </CashManagerButton>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import CashManagerInput from '@/components/core/CashManagerInput.vue'
import CashManagerButton from '@/components/core/CashManagerButton.vue'
import { useAuthStore } from '@/stores/authStore'

/*REFS*/
const values = ref({
  email: '',
  password: ''
})
const buttonLoading = ref(false)

const login = async () => {
  buttonLoading.value = true
  await useAuthStore().signIn(values.value)
  buttonLoading.value = false
}
</script>