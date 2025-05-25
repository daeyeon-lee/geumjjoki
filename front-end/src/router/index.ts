import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routes } from './routes'
import authGuard from '@/middlewares/guards/auth.guard'
import roleGuard from '@/middlewares/guards/role.guard'
import errorGuard from '@/middlewares/guards/error.guard'
import titleMiddleware from '@/middlewares/title.middleware'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
})

// 라우터 이동 전 인증 및 역할 검사
router.beforeEach(authGuard);
router.beforeEach(roleGuard);
router.beforeEach(errorGuard);
router.beforeEach(titleMiddleware);

// router.beforeEach((to, from, next) => {
//   console.log('Current route:', to.path);
//   console.log('Matched route:', from.path);
//   next();
// });

export default router
