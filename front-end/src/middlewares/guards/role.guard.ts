import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const roleGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  const role = to.meta.requiredRole;

  // if (role && !authStore.user?.roles.includes(role)) {
  if (role) {
    next({ name: "unauthorized" }); // 역할이 필요한 페이지에 접근하고 역할이 없으면 권한 없음 페이지로 리다이렉트
  } else {
    next(); // 역할이 필요 없는 페이지는 그냥 접근
  }
}

export default roleGuard;
