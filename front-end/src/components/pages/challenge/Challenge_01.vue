<template>
  <main class="w-full pb-20 relative">
    <!-- 헤더 -->
    <header class="px-5 sticky top-0 bg-gray-200 z-20 w-full flex justify-between items-center pt-12 pb-5">
      <div class="flex items-center gap-2">
        <back-icon color="black" />
        <span class="h3">챌린지</span>
      </div>
      <div class="w-30 bg-gold-200 py-1 px-2.5 rounded-full flex justify-between items-center">
        <img :src="StarImg" alt="⭐" class="w-6 h-6">
        <div>{{ userData?.user_profile?.point ?? 0 }}P</div>
      </div>
    </header>

    <!-- 진행중인 챌린지 -->
    <section class="flex flex-col px-5 gap-5 mb-8">
      <div class="flex justify-between items-center h4 fw-black text-gray-600">
        <div>진행중인 챌린지</div>
        <div @click="router.push({ name: 'challenge_before' })">나의 챌린지 &gt;</div>
      </div>
      <swiper
        :slides-per-view="3"
        :space-between="100"
        :loop="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :effect="'fade'"
        :grab-cursor="true"
        :centered-slides="true"
        class="w-md"
      >
        <swiper-slide v-for="item in ongoingChallenges" :key="item.user_challenge_id">
          <div class="px-5 py-4.5 bg-gold-100 rounded-4xl flex flex-col min-w-43 h4 text-cocoa-600">
            <div class="fw-black">{{ item.category_name }}</div>
            <div>{{ item.challenge.title.replace(re_text, '') }}</div>
            <div class="fw-black">{{ item.challenge.point }}P</div>
            <div class="caption fw-bold text-gray-600">
              {{ formatRange(item.start_date, item.end_date) }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <!-- 도전 가능한 챌린지 -->
    <section class="bg-white rounded-4xl mx-5 shadow-md relative">
      <div class="h4 text-gray-600 mb-2 px-5 rounded-t-4xl sticky top-24 py-5 bg-white">도전 가능한 챌린지</div>
      <div class="h4 text-cocoa-600 px-5 flex flex-col gap-6 pb-20 min-h-[550px] scrollbar-hide overflow-y-scroll">
        <div
          v-for="item in upcomingChallenges"
          :key="item.challenge_id"
          class="flex justify-between border-b-2 border-dashed border-gray-600 pb-1"
        >
          <div class="flex flex-col items-center gap-2 w-16 shrink-0">
            <div class="w-15 h-15 bg-gold-100 rounded-full"></div>
            <div class="h4 fw-black text-center">{{ item.category_name }}</div>
          </div>

          <div class="flex flex-col flex-1 min-w-0 cursor-pointer ml-6.5 mt-2.5" @click="goDetail(item.challenge_id)">
            <div class="h4 pr-4 pb-1 mb-1">{{ item.title.replace(re_text, '') }}</div>
            <div class="caption fw-bold text-gray-600">
              {{ formatDday(item.end_date) }}
            </div>
          </div>

          <div class="flex items-center py-1 px-2 bg-gold-200 rounded-full h-fit mt-5 shrink-0 w-20 min-w-[80px]">
            <div><img :src="StarImg" alt="⭐" class="w-4 h-4 mr-2"></div>
            <div class="h4">{{ item.point }}P</div>
          </div>
          
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

import BackIcon from '@/components/common/icons/BackIcon.vue'
import StarImg from '@/assets/images/star.png'
import { useAuthStore } from '@/stores/authStore'
import useChallengesComposable from '@/composables/useChallenges'

const router = useRouter()
const authStore = useAuthStore()

const userStore = useUserStore()
const { user: userData } = storeToRefs(userStore)

const {
  personalChallenges,
  ongoingChallenges,
  unjoinedChallenges,
  fetchPersonalChallenges,
  fetchUnjoinedChallenges
} = useChallengesComposable()

onMounted(async () => {
  await fetchPersonalChallenges()
  await fetchUnjoinedChallenges(10)

  await userStore.fetchUser()
})

const upcomingChallenges = computed(() =>
  unjoinedChallenges.value.filter(c => c.computed_status === '도전가능')
)

const re_text = ref(/^\[[가-힣·]+\]/)

// 상세 이동
const goDetail = (id: number) => {
  router.push({ name: 'challenge_detail', params: { id } })
}

// 날짜 범위 포맷 (진행중 챌린지용)
const formatRange = (start?: string, end?: string): string => {
  if (!start || !end) return '-'
  const s = new Date(start)
  const e = new Date(end)
  const sf = `${s.getFullYear()}.${(s.getMonth() + 1).toString().padStart(2, '0')}.${s.getDate().toString().padStart(2, '0')}`
  const ef = `${e.getFullYear()}.${(e.getMonth() + 1).toString().padStart(2, '0')}.${e.getDate().toString().padStart(2, '0')}`
  return `${sf} - ${ef}`
}

// 종료일까지 D-day 계산
const formatDday = (end: string): string => {
  const now = new Date()
  const endDate = new Date(end)
  const diffTime = endDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? `마감 ${diffDays}일전` : diffDays === 0 ? '오늘 마감' : '마감됨'
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
