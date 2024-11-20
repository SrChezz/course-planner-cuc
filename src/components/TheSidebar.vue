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
      <ul>
        <li v-for="course in courses">
          <RouterLink
            :to="`/course/${course.id}`"
            class="block py-2 px-4 text-gray-600 hover:bg-orange-100 hover:text-orange-500"
            >{{ course.name }}</RouterLink
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useCoursesStore } from '@/stores/courses';

const coursesStore = useCoursesStore();
const courses = ref([]);

const items = ref([
  {
    separator: true,
  },
  {
    items: [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        // shortcut: 'ctrl+h',
      },
    ],
  },

  {
    label: 'Cursos',
    items: [
      {
        label: 'Curso 01',
        icon: 'pi pi-book',
      },
      {
        label: 'Curso 02',
        icon: 'pi pi-book',
      },
      {
        label: 'Curso 03',
        icon: 'pi pi-book',
      },
    ],
  },
]);

// Fetch courses from Pinia store
const fetchCourses = async () => {
  await coursesStore.fetchCourses();
  courses.value = coursesStore.courses;
};

fetchCourses();
</script>

<style scoped>
.router-link-active {
  @apply bg-orange-100 text-orange-500;
}
</style>
