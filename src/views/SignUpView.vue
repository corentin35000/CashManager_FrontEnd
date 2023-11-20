<template>
  <div class="flex flex-col gap-4 w-full h-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-center mb-6">
        <CashManagerLogo to="/signup" :size="56" large />
      </div>
      <SignupForm />
    </div>
    <h6 class="font-medium text-sm mt-6 flex items-center justify-center h-full gap-2 flex-wrap">
      Already have an account ?
      <CashManagerLink class="text-sm" :link="{ name: 'signin', query: $route.query }"
        >Login</CashManagerLink
      >
    </h6>
  </div>
</template>

<script lang="ts" setup>
import SignupForm from '@/components/forms/SignupForm.vue'
import CashManagerLogo from '@/components/ui/CashManagerLogo.vue'
import CashManagerLink from '@/components/core/CashManagerLink.vue'
</script>
