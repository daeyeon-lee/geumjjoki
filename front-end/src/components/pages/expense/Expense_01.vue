<template>
  <div class="flex flex-col categorys-center px-6 w-full">
    <TopNavBar title="소비" @back="router.push('/')" class="mt-16" />
    <NavBar :menus="menus" />
    <!-- 나의 지출 내역 개요 -->
    <div
      class="rounded-4xl shadow-[0px_8px_14px_2px_rgba(0,_0,_0,_0.35)] justify-categorys-center px-3 pt-0 pb-7.5 mb-4 w-full cursor-pointer"
      @click="goStatus">
      <div v-if="isLoaded">
        <h1 class="h1 text-center text-cocoa-600 fw-black my-7">{{ thisTotalAmount.toLocaleString() }}원</h1>
      </div>
      <div v-else>
        <h1 class="h1 text-center text-cocoa-600 fw-black my-7">
          로딩 중...
        </h1>
      </div>
      <div class="w-full rounded-3xl bg-gold-200 px-4.5 py-5 text-cocoa-600 h4">
        <p>나의 {{ thisMonth + 1 }}월 소비는</p>
        <p>지난달 대비
          <span v-if="isIncrease" :class="{ 'text-red-600': isIncrease }">▲{{ formattedAmountDiff }}원</span>
          <span v-else :class="{ 'text-naver-green-200': !isIncrease }">▼{{ formattedAmountDiff }}원</span>
          <span v-if="isIncrease"> 늘었어요</span>
          <span v-else> 줄었어요</span>
        </p>
      </div>
    </div>

    <div class="flex justify-center items-center space-x-2 cursor-pointer" @click="goStatus">
      <span class="text-[#757575] font-black">나의 지출 내역 자세히 보기
      </span>
      <UpIcon />
    </div>

    <!-- 지출 카테고리 -->
    <div class="mb-8 w-full mt-4">
      <div class="w-full justify-start mb-2">
        <p class="h3 fw-black">금쪽이님</p>
        <p class="h4">이번달 나의 지출은?</p>
      </div>
      <div class="-mx-6 mt-6.5">
        <Swiper :modules="[]" :slides-per-view="'auto'" :space-between="24" touch-events-target="container"
          :slides-offset-before="24" :slides-offset-after="24" grabCursor class="px-4 py-2">
          <SwiperSlide v-for="category in parentCategories" :key="category.parent"
            class="!w-[160px] !h-[160px] rounded-4xl bg-gold-100 p-2" @click="goToCategory(category.parent)">
            <p class="p-4 mb-3 font-black text-cocoa-600">{{ category.parent }}</p>
            <h3 class="h3 text-center text-cocoa-600 fw-black">
              {{ category.amount.toLocaleString() }}원
            </h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <!-- 카테고리 분류하기 -->
    <div class="w-full h4 text-cocoa-600">
      <p class="mb-2">분류가 안 된 항목이 있나요?</p>
      <div class="rounded-2xl bg-gold-200 p-4.5 py-3 cursor-pointer" @click="goToUnclassified">
        <h4>{{ thisMonth + 1 }}월 미분류 {{ unclassifiedCount }}건</h4>
        <h4 class="font-bold">지출 항목을 카테고리별로 정리해보세요</h4>
        <h4 class="font-black">카테고리 분류하기</h4>
      </div>
    </div>
  </div>




</template>

<script setup lang='ts'>
import TopNavBar from '@/components/navbar/TopNavBar.vue'
import NavBar from '@/components/navbar/NavBar.vue'
import UpIcon from '@/components/common/icons/UpIcon.vue'
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import expenseService from '@/services/api/expenseService'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useRoute, useRouter } from 'vue-router'
import type { CategorySummary } from '@/types/expense'
import { toDateString, getCurrentDateInfo } from '@/utils/date'

const router = useRouter()
const route = useRoute()

const parentCategories = ref<CategorySummary[]>([])
const thisTotalAmount = ref(0)
const prevTotalAmount = ref(0)
const amountDiff = ref(0)
const isLoaded = ref(false)
const isIncrease = ref(false)
const formattedAmountDiff = computed(() =>
  Math.abs(amountDiff.value).toLocaleString('ko-KR')
)
const unclassified = ref<CategorySummary | null>(null)

const unclassifiedCount = computed(() => unclassified.value?.count ?? 0)

const menus = [
  { name: '분석', to: 'analysis' },
  { name: '현황', to: 'status' },
]
onMounted(async () => {
  const { current_month, previous_month } = await expenseService.getSummary()
  const summary = current_month.category_summary
  unclassified.value = summary.find((cat: CategorySummary) => cat.parent === '미분류') ?? null
  parentCategories.value = summary
    .filter((cat: CategorySummary) => cat.parent !== '미분류')
    .sort((a: CategorySummary, b: CategorySummary) => b.amount - a.amount)
  thisTotalAmount.value = current_month.total_amount
  prevTotalAmount.value = previous_month.total_amount
  amountDiff.value = thisTotalAmount.value - prevTotalAmount.value
  isIncrease.value = amountDiff.value > 0
  isLoaded.value = true
})


const { now, thisMonth, start } = getCurrentDateInfo()

const goToUnclassified = () => {
  router.push({ name: 'expense_02', query: { category: '미분류', start_date: toDateString(start), end_date: toDateString(now) }})
}

const goToCategory = (categoryName: string) => {
  router.push({ name: 'expense_02', query: { category: categoryName, start_date: toDateString(start), end_date: toDateString(now) }})
}

const goStatus = () => {
  router.push({ name: 'expense_02', query: {start_date: toDateString(start), end_date: toDateString(now)}})
}
</script>

<style scoped></style>