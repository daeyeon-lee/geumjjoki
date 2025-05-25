import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export const titleMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  // 메타 데이터에서 타이틀 가져오기
  const title = to.meta.title || 'Geumjjoki'
  document.title = `${title} - Geumjjoki`

  next()
}

export default titleMiddleware;