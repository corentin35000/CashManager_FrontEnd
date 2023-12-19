<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="login">
    <CashManagerInput
      v-model:value="values.email"
      type="email"
      id="email"
      label="Email"
      rules="required|email"
      placeholder="email@example.com"
    />

    <CashManagerInput
      v-model:value="values.password"
      type="password"
      id="password"
      label="Password"
      rules="required|complex_password"
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
import CashManagerInput from "@/components/core/CashManagerInput.vue";
import CashManagerButton from "@/components/core/CashManagerButton.vue";

/*REFS*/
const values = ref({
  email: '',
  password: ''
})
const buttonLoading = ref(false)

const login = async () => {
  buttonLoading.value = true
  buttonLoading.value = false
}
</script>
