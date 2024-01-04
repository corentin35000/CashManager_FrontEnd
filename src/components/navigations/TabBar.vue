<template>
  <div class="fixed z-50 w-full h-16 bottom-0 bg-gray-700 border-t border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
      <router-link
        to="/"
        class="inline-flex flex-col items-center justify-center px-5 hover:opacity-90 group"
        exact-active-class="bg-gray-800"
        v-slot="{ isExactActive }"
      >
        <CashManagerIcon
          name="home"
          mode="stroke"
          :width="22"
          :height="22"
          :color="isExactActive ? '#3b82f6' : '#9ca3af'"
        />
      </router-link>
      <router-link
        to="/cart"
        class="inline-flex flex-col items-center justify-center px-5 hover:opacity-90 group"
        exact
        active-class="bg-gray-800"
        v-slot="{ isExactActive }"
      >
        <CashManagerIcon
          name="shopping-cart"
          mode="stroke"
          :width="22"
          :height="22"
          :color="isExactActive ? '#3b82f6' : '#9ca3af'"
        />
      </router-link>
      <router-link
        to="/profile"
        class="inline-flex flex-col items-center justify-center px-5 hover:opacity-90 group"
        exact
        active-class="bg-gray-800"
        v-slot="{ isExactActive }"
      >
        <CashManagerIcon
          name="user"
          mode="stroke"
          :width="22"
          :height="22"
          :color="isExactActive ? '#3b82f6' : '#9ca3af'"
        />
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'
</script>
