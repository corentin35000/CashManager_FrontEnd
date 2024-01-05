<template>
  <div class="flex flex-col gap-4 w-full h-full">
    <div class="flex items-center justify-center my-7">
      <CashManagerLogo to="/signup" :size="56" large />
    </div>
    <SignupForm />

    <p class="text-center text-white text-sm">or</p>
    <CashManagerLink class="text-sm justify-center" :link="{ name: 'signin', query: $route.query }">
      Connect to your Account
    </CashManagerLink>
  </div>
</template>

<script lang="ts" setup>
import SignupForm from '@/components/forms/SignupForm.vue'
import CashManagerLogo from '@/components/ui/CashManagerLogo.vue'
import CashManagerLink from '@/components/core/CashManagerLink.vue'
</script>
