<template>
  <div
    class="flex items-center justify-center w-6 h-6 rounded-full peer-checked:group:bg-blue-500"
    :class="active ? 'bg-blue-500 border-0' : 'border border-gray-600'"
    @click="toggle"
  >
    <svg
      v-if="active"
      xmlns="http://www.w3.org/2000/svg"
      class="block w-4 h-4 text-indigo-200 fill-current peer-checked:group:visible"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const active = ref(props.active)

watch(
  () => props.active,
  (value) => {
    active.value = value
  }
)

const emit = defineEmits(['update:active'])

const toggle = () => {
  active.value = !active.value
  emit('update:active', active.value)
}
</script>
