<template>
  <div class="p-6 bg-gray-200 min-h-screen">
    <h2 class="text-xl font-bold mb-6 text-cocoa-800">챌린지 판정 테스트</h2>

    <ul v-if="challenges.length > 0" class="flex flex-col gap-4 mb-32">
      <li
        v-for="challenge in challenges"
        :key="challenge.user_challenge_id"
        class="rounded-xl p-4 bg-white shadow-md"
      >
        <div class="flex justify-between items-center mb-2">
          <p class="text-lg font-bold text-cocoa-700">{{ challenge.challenge.title }}</p>
          <span
            class="text-sm font-semibold px-3 py-1 rounded-full"
            :class="{
              'bg-green-100 text-green-700': challenge.status === '성공',
              'bg-red-100 text-red-700': challenge.status === '실패',
              'bg-yellow-100 text-yellow-700': challenge.status === '도전중'
            }"
          >
            {{ challenge.status }}
          </span>
        </div>

        <div class="text-sm text-gray-700 space-y-1 mb-3">
          <p>🎯 목표 금액: <strong>{{ formatCurrency(challenge.target_expense) }}원</strong></p>
          <p>💸 지출 금액: <strong>{{ formatCurrency(challenge.total_expense) }}원</strong></p>
        </div>

        <button
          class="w-full py-2 rounded-md font-semibold"
          :class="{
            'bg-cocoa-600 text-white hover:bg-cocoa-700': challenge.status === '도전중',
            'bg-gray-400 text-white cursor-not-allowed': challenge.status !== '도전중'
          }"
          :disabled="challenge.status !== '도전중'"
          @click="challenge.status === '도전중' && judge(challenge.user_challenge_id)"
        >
          {{ challenge.status === '도전중' ? '판정 실행' : '판정 완료' }}
        </button>
      </li>
    </ul>

    <p v-else class="text-gray-500 text-center mt-10">도전 중인 챌린지가 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/plugins/axios'


const challenges = ref<any[]>([])
const isJudging = ref(false)

function formatCurrency(value: string | number): string {
  const number = typeof value === 'string' ? parseFloat(value) : value
  return number.toLocaleString('ko-KR')
}

onMounted(async () => {
  const res = await apiClient.get('/challenges/personal/')
  challenges.value = res.data.data.challenges
  console.log(challenges.value)
})

async function judge(userChallengeId: number) {
  if (isJudging.value) return
  isJudging.value = true
  try {
    const res = await apiClient.post(`/challenges/test/judge/${userChallengeId}/`)
    const data = res.data.data

    if (data.judged) {
      const target = challenges.value.find(item => item.user_challenge_id === userChallengeId)
      if (target) {
        target.status = data.result
      }

      if (data.result === '성공') {
        alert(`성공!\n+EXP ${data.gained_exp}\n+포인트 ${data.gained_point}\n레벨 ${data.level}`)
      } else {
        alert('아쉽게도 실패했습니다')
      }
    } else {
      alert(data.message || '아직 판정 시점이 아닙니다.')
    }
  } catch (err) {
    console.error(err)
    alert(`판정 실패: ${(err as any)?.response?.data?.message || '오류 발생'}`)
  } finally {
    isJudging.value = false
  }
}
</script>
