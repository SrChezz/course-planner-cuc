<script setup>
import { RouterView } from "vue-router";
import TheSidebar from "./components/TheSidebar.vue";
</script>

<template>
  <div class="grid grid-cols-[200px_auto] gap-4 h-full">
    <TheSidebar />
    <RouterView />
  </div>
</template>

<style>
body {
  background-color: #f7f7f7;
}
</style>
