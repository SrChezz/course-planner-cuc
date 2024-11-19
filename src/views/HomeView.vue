<template>
  <main class="bg-white rounded-lg">
    <!-- Top Bar Section -->
    <div class="flex justify-between items-center py-2 px-4">
      <div>
        <RouterLink
          to="/"
          class="px-2 py-1 hover:bg-gray-200 rounded transition-colors font-semibold"
          ><i-tabler:heart-handshake
            class="text-orange-400 inline align-[-0.2em] text-lg mr-1"
          />¡Bienvenido de vuelta!</RouterLink
        >
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

    <div class="flex flex-col px-4 gap-6">
      <!-- Banner -->
      <div class="bg-orange-600 rounded-xl px-6 py-4 grid grid-cols-2">
        <div>
          <span class="font-semibold text-gray-100 mb-2 block"
            >Diseño Instruccional</span
          >
          <h1 class="text-3xl font-bold text-white mb-4">
            Planifica las lecciones de tus cursos de forma sencilla e intuitiva
          </h1>
          <button
            class="px-2 py-2 bg-yellow-500 rounded-xl font-semibold cursor-pointer hover:bg-white hover:text-yellow-600 transition-colors"
          >
            Crear Curso
          </button>
        </div>
        <div>
          <img src="@/assets/images/home-image-1.png" class="ml-auto" />
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Facultades:</h2>
        <div class="grid grid-flow-col auto-cols-min gap-6">
          <div
            v-for="index in 6"
            :key="index"
            class="bg-orange-700 rounded-full h-20 w-20 cursor-pointer hover:scale-105 transition-transform flex justify-center items-center"
          >
            <i-tabler:tool class="text-4xl text-white" />
          </div>
        </div>
      </div>

      <!-- Cursos -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Cursos:</h2>
        <div class="grid grid-flow-row grid-cols-3 gap-6">
          <RouterLink
            v-for="index in 6"
            :key="index"
            class="rounded-2xl bg-gray-100 overflow-hidden"
          >
            <div>
              <img
                src="../assets/images/course-example.jpg"
                class="w-full h-32"
                alt=""
              />
            </div>
            <div class="p-2">
              <h3 class="text-lg font-semibold">Nombre del Curso</h3>
              <h5 class="text-sm text-gray-500">By Nombre del Docente</h5>
              <p class="text-pretty py-1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repudiandae asperiores sapiente iusto illum, similique
                perspiciatis repellat tempore quibusdam.
              </p>
            </div>
            <div
              class="flex justify-between text-gray-400 font-semibold px-2 py-4"
            >
              <span
                ><i-tabler:clock class="inline align-[-0.2em] text-lg" /> 32
                Horas</span
              >
              <span
                ><i-tabler:medal-2 class="inline align-[-0.2em] text-lg" /> 03
                Créditos</span
              >
            </div>
          </RouterLink>
        </div>
      </div>
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
