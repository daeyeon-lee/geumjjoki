import { authRoutes } from './authRoutes'
import { expenseRoutes } from './expenseRoutes'
import { userPageRoutes } from './userPageRoutes'
import { challengeRoutes } from './challengeRoutes'
import { articleRoutes } from './articleRoutes'
import { rewardRoutes } from './rewardRoutes'
import { homeRoutes } from './homeRoutes'
import { errorRoutes } from './errorRoutes'

export const routes = [
  ...homeRoutes,
  ...authRoutes,
  ...expenseRoutes,
  ...userPageRoutes,
  ...challengeRoutes,
  ...articleRoutes,
  ...rewardRoutes,
  ...errorRoutes,
]