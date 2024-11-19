<template>
  <div>
    <Menu :model="items" class="fixed h-[96%] w-[200px]">
      <template #start>
        <div class="flex flex-row justify-between items-center px-4 pt-2">
          <img
            src="@/assets/images/logo-cuc.png"
            alt="Logo Principal"
            class="w-5/12"
          />
          <i-tabler:layout-sidebar-right-expand-filled
            class="text-2xl cursor-pointer text-slate-800 hover:text-slate-500"
          />
        </div>
      </template>

      <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span
            v-if="item.shortcut"
            class="ml-auto border border-slate rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </a>
      </template>
      <template #end>
        <button
          v-ripple
          class="absolute bottom-0 overflow-hidden w-full border-0 bg-transparent flex items-center p-2 pl-4 pb-4 hover:bg-slate-100 rounded-none cursor-pointer transition-colors duration-200"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
          />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold">Amy Elsner</span>
            <span class="text-sm">Docente</span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
</script>
