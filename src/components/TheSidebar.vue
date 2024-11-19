<template>
  <aside class="w-64 bg-white shadow-md">
    <div class="p-4">
      <h1 class="text-2xl font-bold">CUC</h1>
    </div>
    <nav class="mt-6">
      <RouterLink
        to="/"
        class="block py-2 px-4 text-gray-600 hover:bg-orange-100 hover:text-orange-500"
        >Inicio</RouterLink
      >
      <a href="#" class="block py-2 px-4 font-medium">Cursos</a>
      <!-- Add more menu items as needed -->
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    separator: true,
  },
  {
    items: [
      {
        label: "Inicio",
        icon: "pi pi-home",
        // shortcut: 'ctrl+h',
      },
    ],
  },

  {
    label: "Cursos",
    items: [
      {
        label: "Curso 01",
        icon: "pi pi-book",
      },
      {
        label: "Curso 02",
        icon: "pi pi-book",
      },
      {
        label: "Curso 03",
        icon: "pi pi-book",
      },
    ],
  },
]);
</script>

<style scoped>
.router-link-active {
  @apply bg-orange-100 text-orange-500;
}
</style>
