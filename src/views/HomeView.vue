<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Header -->
      <header class="bg-orange-500 text-white p-6">
        <h2 class="text-2xl font-bold">Diseño Instruccional</h2>
        <p class="mt-2">
          Planifica las lecciones de tus cursos de forma sencilla e intuitiva
        </p>
        <button
          @click="openCreateModal"
          class="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300"
        >
          Crear Curso
        </button>
      </header>

      <!-- Faculties -->
      <section class="p-6">
        <h3 class="text-lg font-semibold mb-4">Facultades:</h3>
        <div class="flex space-x-4">
          <button
            v-for="faculty in faculties"
            :key="faculty"
            class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition duration-300"
          >
            <i-mdi-wrench class="w-6 h-6" />
          </button>
        </div>
      </section>

      <!-- Courses -->
      <section class="p-6">
        <h3 class="text-lg font-semibold mb-4">Cursos:</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            :to="`/course/${course.id}`"
            v-for="course in courses"
            :key="course.id"
            class="bg-white rounded-lg shadow-md overflow-hidden relative"
          >
            <img
              :src="course.image"
              :alt="course.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h4 class="text-xl font-semibold mb-2">{{ course.name }}</h4>
              <p class="text-sm text-gray-600 mb-2">By {{ course.author }}</p>
              <p class="text-sm text-gray-700 mb-4">
                {{ course.shortDescription }}
              </p>
              <div class="flex justify-between text-sm text-gray-500">
                <span>{{ course.duration }} Horas</span>
                <span>{{ course.credits }} Créditos</span>
              </div>
            </div>
            <div class="absolute top-2 right-2 flex space-x-2">
              <button
                @click.prevent="openEditModal(course)"
                class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <i-mdi-pencil class="w-4 h-4" />
              </button>
              <button
                @click.prevent="deleteCourse(course.id)"
                class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                <i-mdi-delete class="w-4 h-4" />
              </button>
            </div>
          </RouterLink>
        </div>
      </section>
    </main>

    <!-- Create/Edit Course Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-8 w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4">
          {{ isEditing ? "Editar Curso" : "Crear Nuevo Curso" }}
        </h2>
        <form
          @submit.prevent="submitCourse(currentCourse.id)"
          class="space-y-4"
        >
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Nombre del Curso</label
            >
            <input
              v-model="currentCourse.name"
              id="name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div>
            <label for="author" class="block text-sm font-medium text-gray-700"
              >Autor</label
            >
            <input
              v-model="currentCourse.author"
              id="author"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div>
            <label
              for="shortDescription"
              class="block text-sm font-medium text-gray-700"
              >Descripción Corta</label
            >
            <textarea
              v-model="currentCourse.shortDescription"
              id="shortDescription"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            ></textarea>
          </div>
          <div>
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700"
              >Duración (horas)</label
            >
            <input
              v-model="currentCourse.duration"
              id="duration"
              type="number"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div>
            <label for="credits" class="block text-sm font-medium text-gray-700"
              >Créditos</label
            >
            <input
              v-model="currentCourse.credits"
              id="credits"
              type="number"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700"
              >URL de la Imagen</label
            >
            <input
              v-model="currentCourse.image"
              id="image"
              type="url"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {{ isEditing ? "Actualizar" : "Crear" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useCoursesStore } from "@/stores/courses";

const coursesStore = useCoursesStore();

const faculties = ref([
  "Engineering",
  "Science",
  "Arts",
  "Business",
  "Law",
  "Medicine",
]);
const courses = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const currentCourse = reactive({
  id: null,
  name: "",
  author: "",
  shortDescription: "",
  duration: 0,
  credits: 0,
  image: "",
});

// Fetch courses from Pinia store
const fetchCourses = async () => {
  await coursesStore.fetchCourses();
  courses.value = coursesStore.courses;
};

const openCreateModal = () => {
  isEditing.value = false;
  Object.assign(currentCourse, {
    id: null,
    name: "",
    author: "",
    shortDescription: "",
    duration: 0,
    credits: 0,
    image: "",
  });
  showModal.value = true;
};

const openEditModal = (course) => {
  isEditing.value = true;
  Object.assign(currentCourse, course);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitCourse = async (id) => {
  if (isEditing.value) {
    await coursesStore.updateCourse(id, currentCourse);
  } else {
    await coursesStore.createCourse(currentCourse);
  }
  await fetchCourses();
  closeModal();
};

const deleteCourse = async (id) => {
  if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
    await coursesStore.deleteCourse(id);
    await fetchCourses();
  }
};

// Fetch courses when component is mounted
fetchCourses();
</script>
