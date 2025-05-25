import apiClient from '@/plugins/axios'

export const rewardsService = {
  fetchRewardList: async () => {
    const response = await apiClient.get('/rewards/')
    const result = response.data.results
    if (!result || result.status !== 'success') {
      throw new Error('API 응답 실패')
    }
    return result.data
  },
  purchaseReward: async (rewardId: number) => {
    try {
      const response = await apiClient.post(`/rewards/purchase/`, {
        rewardId: rewardId
      })
      console.log('response', response)
      return response.data
    } catch (error: any) {
      console.log('구매 실패:', error.data)
      return error
    }
  }
}

export default rewardsService