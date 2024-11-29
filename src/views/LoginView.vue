<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
      <button
        @click="redirectToRegister"
        class="mt-4 w-full text-orange-500 py-2 rounded-md hover:text-orange-600 transition duration-300 border border-orange-500"
      >
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/dashboard');
  } catch (error) {
    alert(error.message);
  }
};

const redirectToRegister = () => {
  router.push('/register');
};
</script>
