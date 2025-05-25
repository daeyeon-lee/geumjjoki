import MobileLayout from '@/layouts/MobileLayout.vue'
import ChallengeView from '@/views/ChallengeView.vue'
import Challenge_01 from '@/components/pages/challenge/Challenge_01.vue'
import Challenge_02 from '@/components/pages/challenge/Challenge_02.vue'
import Challenge_03 from '@/components/pages/challenge/Challenge_03.vue'
import Challenge_04 from '@/components/pages/challenge/Challenge_04.vue'

export const challengeRoutes = [
  {
    path: '/challenge',
    component: ChallengeView,
    meta: {
      layout: MobileLayout,
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'challenge',
        component: Challenge_01,
      },
      {
        path: 'before',
        name: 'challenge_before',
        component: Challenge_02
      },
      {
        path: ':id',
        name: 'challenge_detail',
        component: Challenge_03
      },
      {
        path: 'personal',
        name: 'challenge_personal',
        component: Challenge_04
      }
    ],
  },
]
