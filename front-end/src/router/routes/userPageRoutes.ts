import MobileLayout from '@/layouts/MobileLayout.vue'
import UserView from '@/views/UserView.vue'

export const userPageRoutes = [
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      layout: MobileLayout,
      requiresAuth: true,
    },
    children: [
    ],
  },
]
