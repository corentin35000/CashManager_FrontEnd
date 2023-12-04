<template>
  <RouterView />
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {notify} from "@/plugins/notyf.ts";

onMounted(() => {
  notify.success('Hello world!')
  notify.error('Hello world!')
})
</script>

<style lang="scss" scoped></style>