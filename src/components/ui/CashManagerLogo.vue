<template>
  <RouterLink :to="props.to" class="flex items-center cursor-pointer hover:opacity-80">
    <img
      :width="props.size"
      :height="props.size"
      src="../../../src/assets/images/logo-blue.png"
      alt="Cash Manager Logo"
      class="mr-2 w-6"
    />
    <span class="font-medium text-white text-lg" v-if="props.large">{{ SITE_NAME }} </span>
  </RouterLink>
</template>

<script lang="ts" setup>
const SITE_NAME = 'Cash Manager'

/*PROPS*/
const props = defineProps({
  size: { type: [Number, String], default: 40 },
  large: { type: Boolean, default: false },
  to: { type: String, default: '/' }
})
</script>
