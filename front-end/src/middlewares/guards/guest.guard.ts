// src/middlewares/guards/guest.guard.ts 파일 생성
import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const guestGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  // 이미 로그인된 상태라면 홈페이지로 리다이렉트
  if (authStore.isAuthenticated) {
    next({ name: "home" });
  } else {
    next(); // 로그인되지 않았으면 로그인 페이지 접근 허용
  }
};

export default guestGuard;