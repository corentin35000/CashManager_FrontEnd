<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6 p-5" @submit="signup">
    <div class="flex flex-col gap-6">
      <CashManagerInput
        v-model:value="values.username"
        type="username"
        id="username"
        label="Username"
        rules="required"
        placeholder="username"
      />

      <CashManagerInput
        v-model:value="values.email"
        type="email"
        id="email"
        label="Email"
        rules="required|email"
        placeholder="email@time-manager.com"
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
    </div>
    <CashManagerIcon :disabled="!meta.valid"
                     :load="buttonLoading"
                     type="submit"
                     name="user"
                     mode="stroke"

    >
      {{ buttonLoading ? 'Loading...' : 'Signup' }}
    </CashManagerIcon>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'
import CashManagerInput from "@/components/core/CashManagerInput.vue";
import { useAuthStore } from '@/stores/authStore.ts'

/*REFS*/
const values = ref({
  username: '',
  email: '',
  password: ''
})
const buttonLoading = ref(false)

const signup = async () => {
  buttonLoading.value = true
  await useAuthStore().signUp(values.value)
  buttonLoading.value = false
}
</script>
