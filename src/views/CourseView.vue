<template>
  <main class="bg-white rounded-lg">
    <!-- Top Bar Section -->
    <div class="flex justify-between items-center py-2 px-4">
      <div>
        <RouterLink
          to="/"
          class="px-2 py-1 hover:bg-gray-200 rounded transition-colors"
          ><i-tabler:home class="inline align-[-0.2em] text-lg"
        /></RouterLink>
      </div>
      <div>
        <Button
          unstyled
          class="px-2 py-1 hover:bg-gray-200 rounded transition-colors"
          ><i-tabler:share-2 class="inline align-[-0.2em] text-lg" />
          Exportar</Button
        >
      </div>
    </div>
    <!-- Main Content -->
    <div class="grid grid-rows-2 grid-cols-[2fr_1fr] bg-gray-200 gap-2">
      <div></div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const home = ref({
  icon: 'pi pi-home',
  route: '/',
});
const items = ref([{ label: '', route: '/' }]);
</script>
