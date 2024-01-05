<template>
  <div class="flex flex-col min-h-screen pb-24 h-full">
    <div class="mt-2 xl:px-0 px-2 sm:px-2 lg:px-6">
      <TabControl :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event" />
      <ProfileOrdersView v-if="profileViewName === 'orders'" />
      <ProfileAccountView v-else />
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script lang="ts" setup>
import TabBar from '@/components/navigations/TabBar.vue'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import TabControl from '@/components/navigations/TabControl.vue'
import { useRoute, useRouter } from 'vue-router'
import ProfileAccountView from '@/views/Profile/ProfileAccountView.vue'
import ProfileOrdersView from '@/views/Profile/ProfileOrdersView.vue'

/* HOOKS */
const route = useRoute()
const router = useRouter()

/* REFS */
const tabs = ref(['Account', 'Orders'])
const activeTab = ref(tabs.value[0])
const profileViewName: Ref<string> = ref(route.params.viewName?.toString() || 'account')

/* WATCH */
watch(
  () => activeTab.value,
  (activeTab) => {
    router.push({ name: 'profileView', params: { viewName: activeTab.toLowerCase() } })
    profileViewName.value = activeTab.toLowerCase()
  }
)

watch(
  () => profileViewName.value,
  (viewName) => {
    if (viewName) {
      activeTab.value = viewName.charAt(0).toUpperCase() + viewName.slice(1)
    }
  },
  { immediate: true }
)

/* METHODS */
</script>
