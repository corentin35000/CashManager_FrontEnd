<template>
  <CashManagerModal
    v-if="props.show !== undefined"
    :title="props.title"
    :show="props.show"
    @update:show="$emit('update:show', $event)"
    @cancel="$emit('cancel')"
    @ok="onOk"
  >
    <p>
      {{ props.message }}
    </p>
  </CashManagerModal>
</template>

<script lang="ts" setup>
import CashManagerModal from '@/components/ui/CashManagerModal.vue'

/* PROPS */
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure?'
  }
})

/* EMITS */
const emit = defineEmits<{
  cancel: []
  ok: []
  'update:show': [value: boolean]
}>()

/* METHODS */
const onOk = () => {
  emit('ok')
}
</script>
