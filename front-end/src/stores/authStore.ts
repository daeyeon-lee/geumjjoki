import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
import { useUserStore } from './userStore';
import { authService } from '@/services/api/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    isLoading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    setToken(newToken: string | null): void {
      this.token = newToken;
      if (newToken) {
        localStorage.setItem('access_token', newToken);
        sessionStorage.setItem('access_token', newToken);
      } else {
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
      }
    },

    setRefreshToken(newRefreshToken: string | null): void {
      this.refreshToken = newRefreshToken;
      if (newRefreshToken) {
        localStorage.setItem('refresh_token', newRefreshToken);
        sessionStorage.setItem('refresh_token', newRefreshToken);
      } else {
        localStorage.removeItem('refresh_token');
        sessionStorage.removeItem('refresh_token');
      }
    },

    async login(newToken: string): Promise<void> {
      this.setToken(newToken);
      const userStore = useUserStore();
      try {
        await userStore.fetchUser();
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
        await this.logout();
        window.location.href = '/auth/login';
      }
    },

    refreshAuthState(): void {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken && this.token !== storedToken) {
        this.token = storedToken;
      }
    },

    async logout(): Promise<void> {
      await authService.logout();
      this.setToken(null);
      this.setRefreshToken(null);
      window.location.href = '/auth/login';
    }
  }
});
