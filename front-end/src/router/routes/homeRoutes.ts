import HomeView from '@/views/HomeView.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import Home_01 from '@/components/pages/home/Home_01.vue'
import Home_02 from '@/components/pages/home/Home_02.vue'
import Home_03 from '@/components/pages/home/Home_03.vue'
import Home_04 from '@/components/pages/home/Home_04.vue'


export const homeRoutes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      layout: MobileLayout,
      // requiresAuth: true,
      title: '홈',
    },
    children: [
      {
        path: '',
        name: 'home',
        component: Home_01,
      },
      {
        path: '/mypage',
        name: 'home2',
        component: Home_02,
      },
      {
        path: '/changeprofile',
        name: 'home3',
        component: Home_03,
      },
      {
        path: '/changepassword',
        name: 'home4',
        component: Home_04,
      }
    ],
  },


]
