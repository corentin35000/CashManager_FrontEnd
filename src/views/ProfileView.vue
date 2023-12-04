<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-auto bg-gray-100 pb-16">
      <h1 class="pt-2 mb-10 text-center text-2xl font-bold">Profile</h1>

      test
    </div>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/navigations/Navbar.vue";

export default {
  data() {
    return {
      selectedPaymentMethod: null,
    };
  },
  components: { Navbar },
};
</script>
