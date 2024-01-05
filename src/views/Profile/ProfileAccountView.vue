<template>
  <div class="mx-auto md:flex md:space-x-6 max-w-2xl lg:max-w-7xl">
    <div class="max-w-4xl px-0 py-4 sm:py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div
        class="bg-slate-900 border border-gray-700 w-full grid gap-2 group relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 px-4 py-16"
      >
        <div class="flex items-start flex-wrap justify-between mb-6 gap-2 md:gap-6">
          <div class="mb-4">
            <h2 class="text-2xl font-bold text-gray-200">Profile</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Update your account's profile information or delete your account.
            </p>
          </div>
          <div>
            <CashManagerButton @click="showDeleteModal = true" variant="red">
              <CashManagerIcon name="trash" mode="stroke" :width="20" :height="20" class="mr-2" />
              Delete Account
            </CashManagerButton>
          </div>
        </div>

        <AccountForm @submit="updateUser" :buttonLoading="buttonLoading" />
      </div>
    </div>
    <TimeConfirmModal
      :show="showDeleteModal"
      @update:show="showDeleteModal = $event"
      @cancel="showDeleteModal = false"
      @ok="deleteAccount"
      title="Delete account ?"
      message="Are you sure you want to delete this account ?"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useUsersStore } from '@/stores/usersStore.ts'
import { User, UserCommand } from '@/services/UserService.ts'
import TimeConfirmModal from '@/components/modals/TimeConfirmModal.vue'
import AccountForm from '@/components/forms/AccountForm.vue'
import CashManagerButton from '@/components/core/CashManagerButton.vue'
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'

/* REFS */
const user: Ref<User | null> = ref(useUsersStore().currentUser)
const buttonLoading = ref(false)
const showDeleteModal = ref(false)

/* METHODS */
const deleteAccount = async () => {
  buttonLoading.value = true
  const _user = user.value
  if (_user) {
    await useUsersStore().deleteUser(_user.id)
  }

  buttonLoading.value = false
}

const updateUser = async (user: UserCommand) => {
  buttonLoading.value = true
  if (user) {
    await useUsersStore().updateUser(user)
  }

  buttonLoading.value = false
}
</script>
