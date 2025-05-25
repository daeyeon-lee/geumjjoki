import MobileLayout from '@/layouts/MobileLayout.vue'
import RewardView from '@/views/RewardView.vue'
import Reward_01 from '@/components/pages/reward/Reward_01.vue'
import Reward_02 from '@/components/pages/reward/Reward_02.vue'

export const rewardRoutes = [
  {
    path: '/reward',
    component: RewardView,
    meta: {
      layout: MobileLayout,
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'reward',
        component: Reward_01,
      },
      {
        path: 'pay',
        name: 'reward_02',
        component: Reward_02,
      },
    ],
  },
]
