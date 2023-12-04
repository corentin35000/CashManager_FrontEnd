<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="flex items-center justify-center my-7">
      <CashManagerLogo to="/signup" :size="56" large />
    </div>
    <SignInForm />
    <p class="text-center text-white text-xl">or</p>
    <CashManagerLink
        class="text-sm text-white justify-center"
        :link="{ name: 'signup', query: $route.query }">
      Create your Account
    </CashManagerLink>
  </div>
</template>

<script lang="ts" setup>
import CashManagerLogo from '@/components/ui/CashManagerLogo.vue'
import SignInForm from "@/components/forms/SignInForm.vue";
import CashManagerLink from "@/components/core/CashManagerLink.vue";
</script>
