import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async checkAuth() {
      try {
        const token = this.getToken();
        if (!token) return false;

        const response = await axios.get('/auth/check', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = response.data.user;
        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },
    getToken() {
      return this.token || localStorage.getItem('auth_token');
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
    },
    async register({ name, email, password }) {
      const response = await axios.post('/auth/register', { name, email, password });
      this.token = response.data.token;
      this.user = response.data.user;
      localStorage.setItem('auth_token', this.token);
    },
  },
});
