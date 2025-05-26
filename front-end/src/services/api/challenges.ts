import apiClient from '@/plugins/axios'
import type { Challenge, UserChallenge, ChallengeDetail } from "@/types/challenges"

export const challengesService = {
  fetchChallengeList: async (size: number): Promise<Challenge[]> => {
    const params = { size: size }
    const response = await apiClient.get('/challenges/', { params })
    return response.data.data.challenges
  },

  getChallengeThisMonthLength: async (start_date: string, end_date: string,): Promise<Challenge[]> => {
    const params = { start_date, end_date, 'status': '도전가능' }
    const response = await apiClient.get('/challenges/', { params })
    console.log(response.data)
    return response.data.data
  },

  fetchPersonalChallenges: async (type?: number) => {
    const params = { type }
    const response = await apiClient.get('/challenges/personal/', { params })
    return response.data.data.challenges
  },

  fetchChallengeDetail: async (id: number) => {
    const response = await apiClient.get(`/challenges/${id}/`)
    return response.data.data
  },

  // 도전
  joinChallenge: async (challengeId: number): Promise<UserChallenge> => {
    const response = await apiClient.post(`/challenges/${challengeId}/join/`)
    return response.data.data
  }
}

export default challengesService
