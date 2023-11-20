<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-center mb-6">
        <CashManagerLogo to="/signup" :size="56" large />
      </div>
      <SignInForm />
    </div>
    <h6 class="font-medium text-sm mt-6 flex items-center justify-center h-full gap-2 flex-wrap">
      You does not have account ?
      <CashManagerLink class="text-sm" :link="{ name: 'signup', query: $route.query }"
      >Register</CashManagerLink
      >
    </h6>
  </div>
</template>

<script lang="ts" setup>
import SignupForm from '@/components/forms/SignupForm.vue'
import CashManagerLogo from '@/components/ui/CashManagerLogo.vue'
import CashManagerLink from '@/components/core/CashManagerLink.vue'
import SignInForm from "@/components/forms/SignInForm.vue";
</script>
