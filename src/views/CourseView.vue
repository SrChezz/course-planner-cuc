<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">
      <div v-if="course" class="p-6">
        <header class="mb-6 flex justify-between items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-800">
              <span v-if="!isEditing">{{ course.name }}</span>
              <input
                v-else
                v-model="editedCourse.name"
                class="border rounded px-2 py-1 w-full"
              />
            </h2>
            <p class="text-gray-600">
              By
              <span v-if="!isEditing">{{ course.author }}</span>
              <input
                v-else
                v-model="editedCourse.author"
                class="border rounded px-2 py-1"
              />
            </p>
          </div>
          <div>
            <button
              @click="toggleEdit"
              class="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              {{ isEditing ? 'Cancelar' : 'Editar' }}
            </button>
            <button
              v-if="isEditing"
              @click="confirmUpdate"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Actualizar curso
            </button>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Course details -->
          <div class="md:col-span-2 space-y-6">
            <img
              :src="isEditing ? editedCourse.image : course.image"
              :alt="isEditing ? editedCourse.name : course.name"
              class="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <input
              v-if="isEditing"
              v-model="editedCourse.image"
              class="border rounded px-2 py-1 w-full"
              placeholder="Image URL"
            />

            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">Descripción del curso</h3>
              <p v-if="!isEditing">{{ course.longDescription }}</p>
              <textarea
                v-else
                v-model="editedCourse.longDescription"
                class="border rounded px-2 py-1 w-full h-32"
              ></textarea>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">Lecciones</h3>

              <div
                v-for="(unit, unitIndex) in isEditing
                  ? editedCourse.units
                  : course.units"
                :key="unitIndex"
                class="mb-4"
              >
                <h4 class="text-lg font-medium mb-2">
                  Unidad {{ unitIndex + 1 }}:
                  <span v-if="!isEditing">{{ unit.name }}</span>
                  <input
                    v-else
                    v-model="unit.name"
                    class="border rounded px-2 py-1"
                  />
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="lesson in unit.lessons"
                    :key="lesson.number"
                    class="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <div>
                      <span class="font-medium">
                        {{ lesson.number }}.
                        <span v-if="!isEditing">{{ lesson.title }}</span>
                        <input
                          v-else
                          v-model="lesson.title"
                          class="border rounded px-2 py-1"
                        />
                      </span>
                      <p class="text-sm text-gray-600">
                        <span v-if="!isEditing">{{ lesson.theme }}</span>
                        <input
                          v-else
                          v-model="lesson.theme"
                          class="border rounded px-2 py-1"
                        />
                      </p>
                    </div>
                    <span class="text-sm text-gray-500">
                      <span v-if="!isEditing">{{ lesson.duration }} min</span>
                      <input
                        v-else
                        v-model="lesson.duration"
                        type="number"
                        class="border rounded px-2 py-1 w-16"
                      />
                      min
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Course metadata -->
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">Detalles del curso</h3>
              <ul class="space-y-2">
                <li>
                  <strong>Créditos:</strong>
                  <span v-if="!isEditing">{{ course.credits }}</span>
                  <input
                    v-else
                    v-model="editedCourse.credits"
                    type="number"
                    class="border rounded px-2 py-1 w-16"
                  />
                </li>
                <li>
                  <strong>Duración:</strong>
                  <span v-if="!isEditing">{{ course.duration }} horas</span>
                  <input
                    v-else
                    v-model="editedCourse.duration"
                    type="number"
                    class="border rounded px-2 py-1 w-16"
                  />
                  horas
                </li>
                <li>
                  <strong>Facultad:</strong>
                  <span v-if="!isEditing">{{ course.faculty }}</span>
                  <input
                    v-else
                    v-model="editedCourse.faculty"
                    class="border rounded px-2 py-1"
                  />
                </li>
                <li>
                  <strong>Grado educativo:</strong>
                  <span v-if="!isEditing">{{ course.educationalLevel }}</span>
                  <input
                    v-else
                    v-model="editedCourse.educationalLevel"
                    class="border rounded px-2 py-1"
                  />
                </li>
                <li>
                  <strong>Público objetivo:</strong>
                  <span v-if="!isEditing">{{ course.targetAudience }}</span>
                  <input
                    v-else
                    v-model="editedCourse.targetAudience"
                    class="border rounded px-2 py-1"
                  />
                </li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-4">Palabras clave</h3>
              <div class="flex flex-wrap gap-2">
                <template v-if="!isEditing">
                  <span
                    v-for="keyword in course.keywords"
                    :key="keyword"
                    class="bg-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {{ keyword }}
                  </span>
                </template>
                <input
                  v-else
                  v-model="editedCourse.keywords"
                  class="border rounded px-2 py-1 w-full"
                  placeholder="Comma-separated keywords"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="p-6 text-center text-gray-600">
        Cargando detalles del curso...
      </div>
    </main>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmation"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Confirmar Cambios</h3>
        <p>¿Esta seguro de cambiar la información del curso?</p>
        <div class="mt-4 flex justify-end space-x-3">
          <button
            @click="showConfirmation = false"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
          >
            Cancelar
          </button>
          <button
            @click="updateCourse($route.params.id)"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useCoursesStore } from '@/stores/courses';

const route = useRoute();
const coursesStore = useCoursesStore();
const course = ref(null);
const editedCourse = reactive({});
const isEditing = ref(false);
const showConfirmation = ref(false);

onMounted(async () => {
  const courseId = route.params.id;
  await coursesStore.fetchCourse(courseId);
  course.value = coursesStore.currentCourse;
  Object.assign(editedCourse, course.value);
});

const toggleEdit = () => {
  if (isEditing.value) {
    // Reset changes if canceling edit
    Object.assign(editedCourse, course.value);
  }
  isEditing.value = !isEditing.value;
};

const confirmUpdate = () => {
  showConfirmation.value = true;
};

const updateCourse = async id => {
  if (!Array.isArray(editedCourse.keywords))
    editedCourse.keywords = editedCourse.keywords.split(',');
  await coursesStore.updateCourse(id, editedCourse);
  course.value = { ...editedCourse };
  isEditing.value = false;
  showConfirmation.value = false;
};
</script>
