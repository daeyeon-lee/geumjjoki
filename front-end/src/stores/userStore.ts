import { defineStore } from 'pinia';
import userService from '@/services/api/userService';
import type { UserResponse, UserState } from '@/types/user';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isLoading: false,
  }),
  actions: {
    async fetchUser() {
      this.isLoading = true;
      try {
        const response = await userService.getUser();
        this.user = response.data as UserResponse;
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패하였습니다:', error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  getters: {
    getUser: (state: UserState) => state.user,
    getLoadingState: (state: UserState) => state.isLoading,
  },
})