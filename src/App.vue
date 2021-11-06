<template>
  <div>
    <div class="w-full min-h-screen bg-teal-700 bg-opacity-50 flex flex-col items-stretch text-blueGray-800">
      <Navbar />
      <div class="flex items-stretch py-4 flex-grow w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  setup() {
    
  },
};
</script>