import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const errorGuard: NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.name === 'not-found' || to.name === 'unauthorized') {
    next();
    return;
  }
  if (to.meta.errorCode === 404 || to.matched.length === 0) {
    const attemptedPath = to.path;

    console.log('존재하지 않는 페이지에 접근 시도:', attemptedPath);

    next({ name: 'not-found' });
    return;
  }
  next();
};

export default errorGuard;