<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Crear Cuenta</h2>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            required
            placeholder="Ingresa tu nombre"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            placeholder="Ingresa tu correo"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            required
            placeholder="Ingresa tu contraseña"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
          <input
            v-model="form.confirmPassword"
            id="confirmPassword"
            type="password"
            required
            placeholder="Confirma tu contraseña"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
        <button
          type="submit"
          class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Registrarse
        </button>
      </form>
      <button
        @click="redirectToLogin"
        class="mt-4 w-full text-orange-500 py-2 rounded-md hover:text-orange-600 transition duration-300 border border-orange-500"
      >
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errorMessage = ref('');

const registerUser = async () => {
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Las contraseñas no coinciden.';
    return;
  }

  try {
    errorMessage.value = '';
    await authStore.register(form);
    router.push('/');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Error al registrar usuario.';
  }
};

const redirectToLogin = () => {
  router.push('/login');
};
</script>


  