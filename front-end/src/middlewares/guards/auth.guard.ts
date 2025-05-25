import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  // 인증이 필요한 페이지에 접근하고 인증이 안되어있으면 로그인 페이지로 리다이렉트
  // router에 정의된 route 중에서 meta의 requiresAuth가 true인 경우 인증이 필요한 페이지
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // console.log("인증이 필요한 페이지에 접근하고 인증이 안되어있으면 로그인 페이지로 리다이렉트");
    // router.push({ name: "login" }); // 로그인 페이지로 리다이렉트
    next({ name: "login" });
  } else if (to.meta.requiresAuth && authStore.isAuthenticated) {
    // 로그인이 필요하고 로그인이 되어있는 경우
    if (!userStore.user) {
      await userStore.fetchUser()
    }
    next();
  } else {
    // 인증이 필요 없는 페이지는 그냥 접근
    next();
  }
}

export default authGuard;