<template>
  <div class="flex flex-col items-center  w-full bg-gray-200">
    <div class="sticky top-0 w-full h-fit bg-inherit pt-16 z-90 px-6">
      <TopNavBar title="소비" />
      <NavBar :menus="menus" />
    </div>
    <div class="flex flex-col items-center w-full px-6">
      <!-- 총 지출 금액 -->
      <div class="w-full rounded-3xl bg-gold-200 text-cocoa-600 mb-7">
        <p class="font-bold pl-4 pt-2">총 지출 금액</p>
        <div v-if="isLoaded">
          <h1 class="h1 text-center fw-black mb-7.5">{{ expenseStore.totalAmount.toLocaleString() }}원</h1>
        </div>
        <div v-else>
          <h1 class="h1 text-center fw-black mb-7.5">
            로딩 중...
          </h1>
        </div>
      </div>

      <!-- 조회 조건 -->
      <div class="relative z-10 w-full">
        <div
          class="relative w-full rounded-xl bg-gold-200 text-cocoa-600 flex justify-between items-center pl-4 pr-6 z-50"
          :class="isFilterOpen ? 'bg-gold-300' : ''" @click="toggleFilter">
          <h3 class="text-xl font-bold">조회 조건</h3>
          <DownArrow />
        </div>

        <!-- 조회 조건 모달 -->
        <div v-show="isFilterOpen"
          class="absolute top-0 left-0 w-full z-30 shadow-[0px_8px_14px_2px_rgba(0,_0,_0,_0.35)] rounded-xl">
          <div class="w-full pt-12 rounded-xl bg-white text-cocoa-600 p-4.5">
            <div class="mt-5">
              <h3 class="text-xl font-bold mb-2">카테고리</h3>
              <div class="grid grid-cols-4 gap-1">
                <button v-for="category in categories" :key="category" class="rounded-lg bg-gold-300 w-22 h-12 h4"
                  :class="selectedCategories.includes(category) ? 'bg-gold-500' : ''" @click="toggleCategory(category)">
                  {{ category }}
                </button>
              </div>
            </div>
            <div class="mt-8 mb-4.5">
              <h3 class="text-xl font-bold mb-2">조회 기간</h3>
              <div class="grid grid-cols-4 gap-1">
                <button v-for="period in periods" :key="period" class="rounded-lg bg-gold-300 w-22 h-12 h4"
                  :class="selectedPeriod === period ? 'bg-gold-500' : ''" @click="selectPeriod(period)">
                  {{ period }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="isFilterOpen" @click="toggleFilter" class="z-5 absolute top-0 left-0 w-full h-screen bg-gray-300/70">
      </div>

      <!-- 조회 기간 -->
      <div>
        <h4 class="h4 mt-2">기간 : {{ periodRangeText }}</h4>
      </div>

      <!-- 구분선 -->
      <div class="w-full px-6 h-5 flex items-center">
        <div class="h-0.5 bg-gray-700 w-full"></div>
      </div>

      <!-- 조회 결과 -->
      <div class="w-full font-semibold">
        <div class="flex justify-between mb-9 px-6 font-black">
          <p>총 {{ expenseStore.totalCount }}건</p>
          <p>{{ expenseStore.totalAmount.toLocaleString() }}원</p>
        </div>
        <div class="flex flex-col space-y-7">
          <div v-for="expense in expenseStore.expenses" :key="expense.expense_id"
            class="flex justify-between px-6 items-center" @click="goToDetail(expense.expense_id)">
            <div>
              <p>{{ expense.category?.name || '미분류' }}</p>
              <p>{{ expense.description.length > 10
                ? expense.description.slice(0, 10) + '...'
                : expense.description }}</p>
            </div>
            <div class="font-black">
              <p>{{ expense.amount.toLocaleString() }}원</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="expenseStore.hasNext" class="flex items-center space-x-4 cursor-pointer mb-24" @click="expandList">
        <span class="text-gray-700 font-black">더보기
        </span>
        <DownIcon />
      </div>
      <div v-else class="mb-44"></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import TopNavBar from '@/components/navbar/TopNavBar.vue'
import NavBar from '@/components/navbar/NavBar.vue'
import DownArrow from '@/components/common/icons/DownArrow.vue'
import DownIcon from '@/components/common/icons/DownIcon.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()

const isLoaded = ref(false)

const menus = [
  { name: '분석', to: 'analysis' },
  { name: '현황', to: 'status' },
]

const categories = [
  "식품", "술·담배", "옷", "주거비", "집안살림", "의료", "교통", "통신", "여가", "교육", "외식·숙박", "기타", "미분류"
]

const periods = [
  "전체", "일주일", "한달",
]

const isFixedPeriod = ref(false)
const selectedCategories = ref<string[]>([])
const selectedPeriod = ref<string | null>(null)
const isFilterOpen = ref(false)
const filterChanged = ref(false)
const periodRangeText = computed(() => {
  const { start, end } = getPeriodRange(selectedPeriod.value)
  if (selectedPeriod.value === '전체') return '전체'
  return `${start} ~ ${end}`
})

// 기간 범위 구하는 함수
function getPeriodRange(period: string | null) {
  const today = new Date()

  if (isFixedPeriod.value && route.name === 'expense_02') {
    // 자동 기간: 이번달 1일 ~ 오늘
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const startStr = `${year}-${month.toString().padStart(2, '0')}-01`
    const endStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return { start: startStr, end: endStr }
  }

  if (period === '전체') return { start: '', end: '' }
  if (period === '일주일' || period === '한달') {
    const end = today
    const start =
      period === '일주일'
        ? new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)
        : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29)
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    }
  }

  // 기본값
  return { start: '', end: '' }
}

// 조건에 따라 목록을 조회하는 함수
const fetchWithCurrentFilters = async (page = 1) => {
  const { start, end } = getPeriodRange(selectedPeriod.value)
  const includeNullCategory = selectedCategories.value.includes("미분류")
  const categoryParam = selectedCategories.value.filter(c => c !== "미분류")

  await expenseStore.fetchExpenses({
    page,
    page_size: 5,
    start_date: start,
    end_date: end,
    category: categoryParam.length > 0 ? categoryParam : undefined,
    include_null_category: includeNullCategory,
  })
}

// 기간 선택
const selectPeriod = (period: string) => {
  if (selectedPeriod.value !== period) {
    selectedPeriod.value = period
    filterChanged.value = true
    isFixedPeriod.value = false // 수동 전환
  }
}

// 카테고리 선택
const toggleCategory = (category: string) => {
  const idx = selectedCategories.value.indexOf(category)
  if (idx >= 0) selectedCategories.value.splice(idx, 1)
  else selectedCategories.value.push(category)
  filterChanged.value = true
  isFixedPeriod.value = false // 수동 전환
}

// 모달창 토글 + 조건 변경 시 재조회
const toggleFilter = async () => {
  isFilterOpen.value = !isFilterOpen.value
  if (!isFilterOpen.value && filterChanged.value) {
    await fetchWithCurrentFilters(1)
    filterChanged.value = false
  }
}

const route = useRoute()
const router = useRouter()

const goToDetail = (expenseId: number) => {
  router.push(`/expense/status/${expenseId}`)
}

// 더보기
const expandList = async () => {
  if (expenseStore.hasNext && !expenseStore.isLoading) {
    isFixedPeriod.value = false

    const { start, end } = getPeriodRange(selectedPeriod.value)
    const includeNullCategory = selectedCategories.value.includes("미분류")
    const categoryParam = selectedCategories.value.filter(c => c !== "미분류")

    await expenseStore.fetchExpenses({
      page: expenseStore.currentPage + 1,
      page_size: 5,
      start_date: start,
      end_date: end,
      category: categoryParam.length > 0 ? categoryParam : undefined,
      include_null_category: includeNullCategory,
    })
  }
}

onMounted(async () => {
  const queryCategory = route.query.category
  const historyState = window.history.state
  const useCurrentMonthToDate = historyState?.useCurrentMonthToDate === true

  if (useCurrentMonthToDate) {
    selectedPeriod.value = null
  } else {
    selectedPeriod.value = '한달'
  }

  const categoryList = Array.isArray(queryCategory)
    ? queryCategory
    : queryCategory !== null && queryCategory !== undefined
      ? [queryCategory]
      : []

  const validCategoryList = categoryList.filter((c): c is string => typeof c === 'string')

  isFixedPeriod.value = useCurrentMonthToDate && route.name === 'expense_02'

  selectedCategories.value =
    queryCategory === null
      ? ['미분류']
      : validCategoryList.filter(c => categories.includes(c))

  await fetchWithCurrentFilters(1)
  isLoaded.value = true
})
</script>

<style scoped></style>