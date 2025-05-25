import MobileLayout from '@/layouts/MobileLayout.vue'
import ExpenseView from '@/views/ExpenseView.vue'
import Expense_01 from '@/components/pages/expense/Expense_01.vue'
import Expense_02 from '@/components/pages/expense/Expense_02.vue'
import Expense_03 from '@/components/pages/expense/Expense_03.vue'
export const expenseRoutes = [
  {
    path: '/expense',
    component: ExpenseView,
    meta: {
      layout: MobileLayout,
      title: '지출내역',
    },
    children: [
      {
        path: '',
        name: 'expense',
        redirect: '/expense/analysis',
      },
      {
        path: 'analysis',
        name: 'expense_01',
        component: Expense_01,
      },
      {
        path: 'status',
        name: 'expense_02',
        component: Expense_02,
      },
      {
        path: 'status/:id',
        name: 'expense_03',
        component: Expense_03,
      },
    ]
  },
]
