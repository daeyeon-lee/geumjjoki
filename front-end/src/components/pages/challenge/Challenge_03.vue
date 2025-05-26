<template>
  <main class="px-5 w-full py-16 overflow-hidden">
    <!-- 상단 헤더 -->
    <header class="w-full flex justify-center items-center mb-5 relative">
      <back-icon @click="goBack" color="black" class="absolute top-1/2 -translate-y-1/2 left-0" />
      <span class="h3">챌린지 상세</span>
    </header>

    <!-- 본문 -->
    <section class="w-full flex flex-col items-center">
      <!-- 이미지 (더미 원형) -->
      <div class="w-53 h-53 bg-gray-600 rounded-full mx-auto mb-5"></div>

      <!-- 챌린지 제목 + 마감 표시 -->
      <div class="flex flex-col items-center mb-8">
        <div class="h4 fw-black text-gray-600">{{ ddayText }}</div>
        <div class="h3 text-black">{{ challengeDetail?.title.replace(re_text, '') || '챌린지명을 입력하세요' }}</div>
      </div>

      <!-- 도전 상태 버튼 -->
      <button
        class="w-41 h-16 rounded-full mb-10"
        :class="buttonClass"
        @click="handleStartChallenge"
      >
        <div class="h2 fw-bold">{{ buttonText }}</div>
      </button>

      <!-- 챌린지 상세 정보 영역 -->
      <div class="w-full bg-white shadow-2xl rounded-4xl py-5.5 px-5">
        <div class="h3 fw-black mb-7">챌린지 안내</div>
        <div class="flex flex-col gap-4 h4 text-cocoa-600">
          <div v-for="key in keys" :key="key" class="flex justify-between">
            <div>{{ titleMapping[key] }}</div>
            <div>{{ detailData[key] }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BackIcon from '@/components/common/icons/BackIcon.vue'
import useChallengesComposable from '@/composables/useChallenges'

// 라우터 정보
const route = useRoute()
const router = useRouter()
const challengeId = Number(route.params.id)
const goBack = () => router.back()

// 컴포저블에서 데이터 가져오기
const {
  challengeDetail,
  detailData,
  fetchChallengeDetail,
  startChallenge,
} = useChallengesComposable()

// 마운트 시 챌린지 상세정보 요청
onMounted(() => {
  fetchChallengeDetail(challengeId)
})

// 버튼 텍스트 계산
const buttonText = computed(() => {
  const status = challengeDetail.value?.computed_status
  console.log(challengeDetail.value)
  if (status === '도전가능') return '도전하기'
  // if (status === '도전불가') return ''
  // if (status === '예') return '실패'
  // if (status === '예정') return '도전하기'
  return '상태 없음'
})

// 버튼 색상 클래스 계산
const buttonClass = computed(() => {
  const status = challengeDetail.value?.computed_status
  if (status === '도전중') return 'bg-gold-200'
  if (status === '성공') return 'bg-minty-400'
  if (status === '실패') return 'bg-gray-400'
  if (status === '예정') return 'bg-gold-400'
  return 'bg-gray-300'
})

// 종료일 기준 D-day 계산
const ddayText = computed(() => {
  const end = challengeDetail.value?.end_date
  if (!end) return '-'
  const now = new Date()
  const endDate = new Date(end)
  const diff = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diff > 0) return `마감 ${diff}일 전`
  if (diff === 0) return '오늘 마감'
  return '마감됨'
})

// 챌린지 정보 항목 정의
type ChallengeKey = 'title' | 'goal' | 'point' | 'date'
const keys: ChallengeKey[] = ['title', 'goal', 'point', 'date']
const titleMapping: Record<ChallengeKey, string> = {
  title: '챌린지명',
  goal: '목표',
  point: '보상',
  date: '진행 기간',
}

const re_text = ref(/^\[[가-힣·]+\]/)

const handleStartChallenge = async () => {
  if (challengeDetail.value?.computed_status !== '도전가능') return

  try {
    await startChallenge(challengeId)

    // 상세 정보 재요청으로 버튼 상태 반영
    await fetchChallengeDetail(challengeId)

    alert('챌린지에 도전했습니다!')
  } catch (e) {
    alert('도전에 실패했습니다.')
  }
}

</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
