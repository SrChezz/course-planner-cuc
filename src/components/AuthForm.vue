<template>
    <div class="auth-form">
        <h1>Iniciar Sesión</h1>
        <form @submit.prevent="handleAuth">
            <input type="email" v-model="email" placeholder="Correo electrónico" required />
            <input type="password" v-model="password" placeholder="Contraseña" required />
            <button type="submit">{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</button>
        </form>
        <button @click="toggleAuthMode">
            {{ isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
        </button>
    </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../js/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: "AuthForm",
    setup() {
        const email = ref("");
        const password = ref("");
        const isLogin = ref(true);

        const handleAuth = async () => {
            try {
                if (isLogin.value) {
                    // Iniciar sesión
                    await signInWithEmailAndPassword(auth, email.value, password.value);
                    alert("Sesión iniciada correctamente");
                } else {
                    // Registrarse
                    await createUserWithEmailAndPassword(auth, email.value, password.value);
                    alert("Cuenta creada exitosamente");
                }
            } catch (error) {
                alert("Error: " + error.message);
            }
        };

        const toggleAuthMode = () => {
            isLogin.value = !isLogin.value;
        };

        return { email, password, isLogin, handleAuth, toggleAuthMode };
    },
};
</script>

<style>
.auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
</style>
