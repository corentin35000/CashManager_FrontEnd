<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto bg-gray-100 pb-16">
      <h1 class="pt-2 mb-10 text-center text-2xl font-bold">Market</h1>
      <Article />
    </div>
    <Navbar />
  </div>

</template>

<script setup>
import { ref } from 'vue';
import Navbar from "@/components/navigations/Navbar.vue";
import Article from "@/components/core/CashManagerArticles.vue";

</script>
