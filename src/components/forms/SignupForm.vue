<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6 p-5" @submit="signup">
    <div class="flex flex-col gap-6">
      <CashManagerInput
        v-model:value="values.firstname"
        type="firstname"
        id="firstname"
        label="Firstname"
        rules="required"
        placeholder="John"
      />

      <CashManagerInput
          v-model:value="values.lastname"
          type="lastname"
          id="lastname"
          label="Lastname"
          rules="required"
          placeholder="Doe"
      />

      <CashManagerInput
        v-model:value="values.email"
        type="email"
        id="email"
        label="Email"
        rules="required|email"
        placeholder="john@doe.com"
      />
    </div>
    <div class="flex flex-col gap-6">
      <CashManagerInput
        v-model:value="values.password"
        type="password"
        id="password"
        label="Password"
        rules="required"
      />
      <CashManagerInput
          v-model:value="values.password_confirmation"
          type="password"
          id="password"
          label="Password Confirmation"
          rules="required"
      />
    </div>
    <CashManagerButton :disabled="!meta.valid" :load="buttonLoading" type="submit">
      {{ buttonLoading ? 'Loading...' : 'Register' }}
    </CashManagerButton>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import {Ref, ref} from 'vue'
import CashManagerInput from "@/components/core/CashManagerInput.vue";
import { useAuthStore } from '@/stores/authStore.ts'
import CashManagerButton from "@/components/core/CashManagerButton.vue";
import {SignupCommand} from "@/services/AuthService.ts";

/* STORE */
const authStore = useAuthStore()


/*REFS*/
const values: Ref<SignupCommand> = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: ''
})
const buttonLoading = ref(false)

const signup = async () => {
  buttonLoading.value = true
  await authStore.signUp(values.value)
  buttonLoading.value = false
}
</script>
