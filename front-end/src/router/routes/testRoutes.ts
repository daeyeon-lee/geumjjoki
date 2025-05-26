import ExpenseCreateTest from '@/components/pages/test/ExpenseCreateTest.vue'
import JudgeUserChallengeTest from '@/components/pages/test/JudgeUserChallengeTest.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import TestView from '@/views/TestView.vue'

export const testRoutes = [
    {
        path: '/test',
        component: TestView,
        meta: {
            layout: MobileLayout,
            title: '테스트',
        },
        children: [
            {
                path: 'create_expense',
                name: 'create_expense',
                component: ExpenseCreateTest,
                meta: { title: '지출 생성 테스트' },
            },
            {
                path: 'judge_user_challenge',
                name: 'judge_user_challenge',
                component: JudgeUserChallengeTest,
                meta: { title: '챌린지 판정 테스트' },
            },
        ]
    },
]
