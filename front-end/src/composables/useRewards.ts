import rewardsService from "@/services/api/rewardsService"
import type { Reward } from "@/types/rewards"
import { useUserStore } from "@/stores/userStore"

const useRewardsComposable = () => {
    const userStore = useUserStore()
    const fetchRewardList = async () => {
        const data = await rewardsService.fetchRewardList()
        return data as Reward[]
    }
    const purchaseReward = async (rewardId: number) => {
      const data = await rewardsService.purchaseReward(rewardId)
      await userStore.fetchUser()
      return data.data
    }
    return { fetchRewardList, purchaseReward }
}

export default useRewardsComposable