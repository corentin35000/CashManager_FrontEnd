<template>
  <component
    :is="tag"
    :to="to"
    :disabled="isDisabled"
    :href="externalLink || to"
    :target="externalLink ? '_blank' : null"
    :class="[
      isDisabled ? 'brightness-75 cursor-not-allowed' : hoverBgClass,
      !isDisabled && animate ? 'active:translate-y-1' : '',
      load ? 'cursor-wait' : '',
      sizeClasses,
      bgClass
    ]"
    class="rounded-md font-medium flex items-center justify-center text-gray-900 font-serif translate-y-0 transform duration-100"
  >
    <CashManagerSpinner v-if="props.load" class="mr-3" variant="dark" :size="20" />
    <slot />
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import CashManagerSpinner from '@/components/ui/CashManagerSpinner.vue'

/* PROPS */
const props = defineProps({
  outlined: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  load: { type: Boolean, default: false },
  to: { type: [String, Object], default: null },
  externalLink: { type: String, default: null },
  size: { type: String, default: null },
  square: { type: Boolean, default: false },
  animate: { type: Boolean, default: true },
  variant: { type: String, default: 'primary' } // primary, red, green, blue
})

/* COMPUTED */
const tag = computed(() => {
  if (props.to) {
    return 'RouterLink'
  } else if (props.externalLink) {
    return 'a'
  }
  return 'button'
})

const isDisabled = computed(() => {
  return props.disabled || props.load
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return props.square ? 'p-2 text-xs' : 'py-1.5 px-4 text-xs'
    case 'md':
      return props.square ? 'px-5 py-2.5 text-sm' : 'py-2.5 px-6 text-sm'
    case 'lg':
      return 'py-3 px-8 text-base'
    case 'xl':
      return 'py-4 px-16 text-lg'
    case '2xl':
      return 'py-3 px-8 text-base md:py-5 md:px-16 md:text-xl'
    default:
      return 'py-2.5 px-6 text-sm'
  }
})

const hoverBgClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'hover:bg-blue-300'
    case 'red':
      return 'hover:bg-red-600'
    case 'green':
      return 'hover:bg-green-500'
    case 'blue':
      return 'hover:bg-blue-500'
    default:
      return 'hover:bg-amber-500'
  }
})

const bgClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-400'
    case 'red':
      return 'bg-red-500'
    case 'green':
      return 'bg-green-400'
    case 'blue':
      return 'bg-blue-400'
    default:
      return 'bg-amber-400'
  }
})
</script>
