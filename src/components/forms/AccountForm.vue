<template>
  <Form v-slot="{ meta }" @submit="updateUser">
    <!-- Grid -->
    <div class="grid gap-8">
      <div class="grid sm:grid-cols-12 gap-2 sm:gap-6 items-center">
        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-gray-200"> Lastname </label>
        </div>

        <div class="sm:col-span-9">
          <CashManagerInput
            :value="user?.lastname || ''"
            @update:value="user.lastname = $event"
            type="text"
            id="lastname"
            rules="required"
            placeholder="My lastname"
          />
        </div>
      </div>

      <div class="grid sm:grid-cols-12 gap-2 sm:gap-6 items-center">
        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-gray-200"> Firstname </label>
        </div>

        <div class="sm:col-span-9">
          <CashManagerInput
            :value="user?.firstname || ''"
            @update:value="user.firstname = $event"
            type="text"
            id="firstname"
            rules="required"
            placeholder="My firstname"
          />
        </div>
      </div>

      <div class="grid sm:grid-cols-12 gap-2 sm:gap-6 items-center">
        <div class="sm:col-span-3">
          <label for="af-account-email" class="inline-block text-gray-200"> Email </label>
        </div>

        <div class="sm:col-span-9">
          <CashManagerInput
            :value="user?.email || ''"
            @update:value="user.email = $event"
            type="email"
            id="email"
            rules="required|email"
            placeholder="email@cash-manager.com"
          />
        </div>
      </div>
    </div>
    <div class="mt-5 flex justify-end gap-x-2">
      <CashManagerButton :disabled="!meta.valid" :load="props.buttonLoading" type="submit">
        {{ props.buttonLoading ? 'Loading...' : 'Save changes' }}
      </CashManagerButton>
    </div>
  </Form>
</template>
<script lang="ts" setup>
import CashManagerInput from '@/components/core/CashManagerInput.vue'
import { Form } from 'vee-validate'
import { useUsersStore } from '@/stores/usersStore'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { User } from '@/services/UserService.ts'
import CashManagerButton from '@/components/core/CashManagerButton.vue'

const defaultUser: User = {
  id: -1,
  username: '',
  email: '',
  lastname: '',
  firstname: '',
  createdAt: new Date(0), // Set to Unix epoch as default
  updatedAt: new Date(0)
}

const user: Ref<User> = ref(useUsersStore().currentUser || defaultUser)

/* PROPS */
const props = defineProps({
  buttonLoading: { type: Boolean, default: false }
})

/* EMITS */
const emits = defineEmits(['submit'])

const updateUser = () => {
  emits('submit', {
    lastname: user.value.lastname,
    firstname: user.value.lastname,
    email: user.value.email
  })
}
</script>
