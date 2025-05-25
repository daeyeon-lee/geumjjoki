import UnauthorizedPage from '@/components/pages/error/UnauthorizedPage.vue';
import NotFoundPage from '@/components/pages/error/NotFoundPage.vue';
import ErrorView from '@/views/ErrorView.vue';
import MobileLayout from '@/layouts/MobileLayout.vue';

export const errorRoutes = [
  {
    path: '/error',
    component: ErrorView,
    meta: {
      layout: MobileLayout,
    },
    children: [
      {
        path: 'unauthorized',
        name: 'unauthorized',
        component: UnauthorizedPage,
        meta: {
          errorCode: 401,
        },
      },
      {
        path: 'not-found',
        name: 'not-found',
        component: NotFoundPage,
        meta: {
          errorCode: 404,
        },
      },

    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' },
    meta: {
      errorCode: 404,
    },
  },
];

