<template>
  <!-- 노란 박스 부분 -->
  <section class="bg-gold-100 w-full rounded-3xl py-12.5 shadow-menu-bar">
    <!-- 타이틀 -->
    <div class="w-full h-12 h3 fw-black flex items-center justify-between pl-6 pr-11">
      <div class="flex items-center">
        <img src="@/assets/images/geumjjoki_logo.png" width="32px" height="32px" alt="" />
        <h3 class="h3 fw-black text-gold-600">GEUMJJOKI</h3>
      </div>
      <HambergerIcon @click="goHome2" class="cursor-pointer" />
    </div>

    <!-- 프로필 -->
    <div class="mx-auto w-fit flex flex-col gap-5">
      <h3 class="w-full h-12 h3">
        <span class="h2 fw-bold">{{ userData?.username }}님</span> 반갑습니다.
      </h3>
      <div class="w-41 h-7 px-3 bg-gold-200 rounded-2xl flex items-center justify-between">
        <img src="@/assets/images/point.png" alt="point" />
        <p class="block h4">{{ userData?.user_profile?.point ?? 0 }}P</p>
      </div>

      <!-- 카드 -->
      <section class="w-90 h-31 flex gap-8">
        <div class="w-41 h-31 bg-gold-200 rounded-2xl py-[27px] px-5">
          <ExpenseIcon />
          <p class="caption fw-bold mt-2">5월 소비금액</p>
          <p class="h4 fw-black">{{thisTotalAmount.toLocaleString()}}원</p>
        </div>
        <div class="w-41 h-31 bg-gold-200 rounded-2xl py-[27px] px-5">
          <ChallengeIcon />
          <p class="caption fw-bold mt-2">5월 챌린지 현황</p>
          <p class="h4 fw-black">13건</p>
        </div>
      </section>
    </div>
  </section>

  <!-- 리워드 캐러셀 -->
  <section class="w-full mt-5 ps-8 pe-4 flex-col">
    <div class="w-full h-6 mt-6 mb-3 flex items-center justify-between">
      <h1 class="h3">리워드를 교환하세요</h1>
      <div class="flex items-center">
        <h4 @click="goReward1" class="cursor-pointer h4 fw-black text-gray-600">더보기</h4>
        <RightArrow color="gray-600" width="12" height="12" />
      </div>
    </div>

    <div class="w-full items-center mt-3">
      <Swiper :slides-per-view="2.5" :space-between="30" :grab-cursor="true" class="w-full mt-3">
        <SwiperSlide v-for="(reward, index) in rewards" :key="reward.reward_id">
          <div class="flex-col gap-4">
            <img :src="gifticons[index % gifticons.length]" alt="gifticon" class="w-36 h-36 object-cover" />
            <p class="caption fw-bold mt-1">{{ reward.name }}</p>
            <p class="caption fw-bold">{{ reward.description }}</p>
            <p class="caption fw-bold">{{ reward.point }}P</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 챌린지 -->
    <div class="w-full h-6 mb-3 flex items-center justify-between mt-10">
      <h1 class="h3">챌린지를 도전하세요</h1>
      <div class="flex items-center">
        <h4 @click="goChallenge1" class="cursor-pointer h4 fw-black text-gray-600">더보기</h4>
        <RightArrow color="gray-600" width="12" height="12" />
      </div>
    </div>

    <div class="w-full items-center mt-3">
      <Swiper :slides-per-view="2.5" :space-between="100" :grab-cursor="true" class="w-full">
        <SwiperSlide v-for="challenge in unjoinedChallenges" :key="challenge.challenge_id">
          <div class="h-fit w-43 bg-gray-300 rounded-3xl px-5 py-4 flex-col gap-1">
            <p class="h4 fw-bold">{{ challenge.category_name || '카테고리' }}</p>
            <p class="h4">{{ challenge.title }}</p>
            <p class="h4">{{ challenge.point || 0 }}P</p>
            <p class="h6">{{ formatDate(challenge.start_date) }} - {{ formatDate(challenge.end_date) }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { storeToRefs } from 'pinia'

import ExpenseIcon from '@/components/common/icons/ExpenseIcon.vue'
import ChallengeIcon from '@/components/common/icons/ChallengeIcon.vue'
import HambergerIcon from '@/components/common/icons/HambergerIcon.vue'
import RightArrow from '@/components/common/icons/RightArrow.vue'

import useRewardsComposable from '@/composables/useRewards'
import { useUserStore } from '@/stores/userStore'
import useChallengesComposable from '@/composables/useChallenges'

import type { Reward } from '@/types/rewards'

import Gifticon1 from '@/assets/images/gifticon1.png'
import Gifticon2 from '@/assets/images/Gifticon2.png'
import Gifticon3 from '@/assets/images/Gifticon3.png'
import Gifticon4 from '@/assets/images/Gifticon4.png'
import expenseService from '@/services/api/expenseService'

const gifticons = [Gifticon1, Gifticon2, Gifticon3, Gifticon4]

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const userData = computed(() => (user.value))

const rewards = ref<Reward[]>([])
const useRewards = useRewardsComposable()

const {
  unjoinedChallenges,
  fetchUnjoinedChallenges,
  fetchPersonalChallenges,
} = useChallengesComposable()

const thisTotalAmount = ref(0)

const formatDate = (iso: string) => {
  const d = new Date(iso)
  const yy = d.getFullYear().toString().slice(2)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yy}.${mm}.${dd}`
}

const goHome2 = () => router.push({ name: 'home2' })
const goChallenge1 = () => router.push({ name: 'challenge' })
const goReward1 = () => router.push({ name: 'reward' })

onMounted(async () => {
  if (!user.value) await userStore.fetchUser()
  try {
    rewards.value = await useRewards.fetchRewardList()
    await fetchPersonalChallenges()
    await fetchUnjoinedChallenges(10)
  } catch (error) {
    console.error('데이터 로딩 실패:', error)
  }
  const { current_month } = await expenseService.getSummary()
  thisTotalAmount.value = current_month.total_amount
})
</script>

<style scoped></style>