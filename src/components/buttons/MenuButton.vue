<template>
  <div
    class="active:scale-95 cursor-pointer flex flex-col justify-center outline-none w-6 h-6 absolute left-5 duration-200"
    @click="onClickButton"
  >
    <span
      class="bg-white absolute w-full duration-200 h-0.5 rounded-2xl origin-center"
      :class="props.open ? 'translate-y-0 ' : 'translate-y-[400%]'"
    />
    <span class="bg-white absolute w-full duration-200 h-0.5 rounded-2xl origin-center" />
    <span
      class="bg-white absolute w-full duration-200 h-0.5 rounded-2xl origin-center"
      :class="props.open ? 'translate-y-0 ' : 'translate-y-[-400%]'"
    />
  </div>
</template>

<script lang="ts" setup>
/* PROPS */
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

/* EMITS */
const emit = defineEmits(['update:open'])

/* METHODS */
const onClickButton = () => {
  emit('update:open', !props.open)
}
</script>
