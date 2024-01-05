<template>
  <div class="flex items-center w-fit bg-white rounded-md">
    <CashManagerButton
      class="rounded-e-none"
      type="button"
      variant="primary"
      size="md"
      :animate="false"
      :square="true"
      :disabled="currentNumber === 0"
      @click="decrease"
    >
      <CashManagerIcon title="Diminuer" name="minus" mode="stroke" :width="16" :height="16" />
    </CashManagerButton>

    <span class="text-black font-semibold text-base px-4">
      {{ currentNumber }}
    </span>

    <CashManagerButton
      class="rounded-s-none"
      type="button"
      variant="primary"
      size="md"
      :animate="false"
      :square="true"
      :disabled="currentNumber === props.max"
      @click="increase"
    >
      <CashManagerIcon title="Augmenter" name="plus" mode="stroke" :width="16" :height="16" />
    </CashManagerButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import CashManagerButton from '@/components/core/CashManagerButton.vue'
import CashManagerIcon from '@/components/ui/CashManagerIcon.vue'

/* PROPS */
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 999
  }
})

/* EMITS */
const emit = defineEmits<{
  'update:number': [number: number]
}>()

/* REFS */
const currentNumber: Ref<number> = ref(props.value || 0)

/* METHODS */
const increase = () => {
  currentNumber.value++
  emit('update:number', currentNumber.value)
}

const decrease = () => {
  if (currentNumber.value > 0) {
    currentNumber.value--
    emit('update:number', currentNumber.value)
  }
}

/* WATCH */
watch(
  () => props.value,
  (newValue) => {
    currentNumber.value = newValue
  }
)
</script>
