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
        <div class="h3 text-black">{{ challengeDetail?.title || '챌린지명을 입력하세요' }}</div>
      </div>

      <!-- 상태 뱃지 (도전중/성공/실패만 표시) -->
      <div
        v-if="['도전중', '성공', '실패'].includes(challengeDetail?.computed_status || '')"
        class="mb-10 w-fit px-4 py-2 rounded-full text-center"
        :class="badgeClass"
      >
        {{ challengeDetail?.computed_status }}
      </div>

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
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BackIcon from '@/components/common/icons/BackIcon.vue'
import useChallengesComposable from '@/composables/useChallenges'

const route = useRoute()
const router = useRouter()
const challengeId = Number(route.params.id)
const goBack = () => router.back()

const {
  challengeDetail,
  detailData,
  fetchChallengeDetail,
} = useChallengesComposable()

onMounted(() => {
  fetchChallengeDetail(challengeId)
})

const badgeClass = computed(() => {
  const status = challengeDetail.value?.computed_status
  if (status === '도전중') return 'bg-gold-200 text-black'
  if (status === '성공') return 'bg-minty-400 text-white'
  if (status === '실패') return 'bg-gray-400 text-black'
  return ''
})

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

type ChallengeKey = 'title' | 'goal' | 'point' | 'date'
const keys: ChallengeKey[] = ['title', 'goal', 'point', 'date']
const titleMapping: Record<ChallengeKey, string> = {
  title: '챌린지명',
  goal: '목표',
  point: '보상',
  date: '진행 기간',
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