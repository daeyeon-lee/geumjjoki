declare module 'auth' {
  import { Store } from 'pinia';

  export interface AuthState {
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  }

  export interface AuthStore extends Store<'auth', AuthState> {
    setToken(token: string | null): void;
    logout(): void;
  }

  export function useAuthStore(): AuthStore;
}
