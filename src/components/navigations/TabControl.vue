<template>
  <div class="flex flex-wrap">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="cursor-pointer border-2 border-transparent text-sm uppercase font-semibold flex items-center justify-center h-fit flex-1"
      :class="[
        currentTab === tab
          ? 'bg-blue-400 text-gray-900'
          : 'bg-zinc-100 text-white hover:bg-zinc-200',
        index === 0 ? 'rounded-s-lg' : '',
        index === tabs.length - 1 ? 'rounded-e-lg' : 'rounded-none'
      ]"
      @click="selectTab(tab)"
    >
      <span class="py-2 px-6">{{ tab }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref, PropType } from 'vue'

/* PROPS */
const props = defineProps({
  tabs: {
    type: Array as PropType<Array<string>>,
    required: true,
    default: () => []
  },
  activeTab: {
    type: String,
    required: false
  }
})

/* EMITS */
const emit = defineEmits<{
  'update:activeTab': [tab: string]
}>()

/* REFS */
const currentTab: Ref<string | undefined> = ref(props.activeTab || props.tabs?.[0])

const selectTab = (tab: string) => {
  currentTab.value = tab
  emit('update:activeTab', tab)
}
</script>
