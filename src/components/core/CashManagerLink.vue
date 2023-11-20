<template>
  <a
    v-if="externalLink"
    class="inline-flex items-center gap-x-1.5 text-blue-400 decoration-2 hover:underline underline-offset-4 font-medium"
    :href="href"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="props.link"
    class="inline-flex items-center gap-x-1.5 text-blue-400 decoration-2 hover:underline underline-offset-4 font-medium"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

const props = defineProps({
  externalLink: { type: Boolean, default: false },
  link: { type: [String, Object], default: null }
})

const href: ComputedRef<string | undefined> = computed(() => {
  if (props.externalLink) {
    return String(props.link)
  }
  return undefined
})
</script>
