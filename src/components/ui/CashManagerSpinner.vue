<template>
  <div
    class="animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full"
    role="status"
    aria-label="loading"
    :style="style"
    :class="classes"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: Number, default: 56 }
})

const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  stroke: `#4ba1fd`
}))

const classes = computed(() => ({
  'text-blue-400': props.variant === 'primary',
  'text-slate-100': props.variant === 'light',
  'text-gray-900': props.variant === 'dark'
}))
</script>
