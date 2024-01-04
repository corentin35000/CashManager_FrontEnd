<template>
  <button
    @click="emit('click')"
    class="flex items-center justify-center gap-2 cursor-pointer active:opacity-80"
  >
    <CashManagerIcon name="arrow-left" mode="stroke" :width="22" :height="22" color="#3b82f6" />
    <span class="text-white"> Previous </span>
  </button>
</template>
<script setup lang="ts">
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'

const emit = defineEmits(['click'])
</script>
