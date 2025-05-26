<template>
  <div class="flex flex-col items-center  w-full bg-gray-200">
    <div class="sticky top-0 w-full h-fit bg-inherit pt-16 z-120 px-6">
      <TopNavBar title="소비" @back="router.push('/')"/>
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
      <div class="relative w-full" :class="isFilterOpen ? 'z-140' : 'z-100'">
        <div
          class="relative w-full rounded-xl bg-gold-200 text-cocoa-600 flex justify-between items-center pl-4 pr-6 z-50"
          :class="isFilterOpen ? 'bg-gold-300' : ''" @click="toggleFilter">
          <h3 class="text-xl font-bold">조회 조건</h3>
          <DownArrow />
        </div>

        <!-- 조회 조건 모달 -->
        <div v-show="isFilterOpen"
          class="absolute top-0 left-0 w-full shadow-[0px_8px_14px_2px_rgba(0,_0,_0,_0.35)] rounded-xl">
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
      <div v-show="isFilterOpen" @click="toggleFilter" class="fixed z-120 top-0 left-0 w-full h-screen bg-gray-300/70">
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useExpenseStore } from '@/stores/expenseStore'
import { getPastRange, getCurrentDateInfo, toDateString } from '@/utils/date'

const router = useRouter()
const route = useRoute()
const expenseStore = useExpenseStore()

const isLoaded = ref(false)
const isFilterOpen = ref(false)
const selectedCategories = ref<string[]>([])
const selectedPeriod = ref<string | null>(null)

const categories = ["식품", "술·담배", "옷", "주거비", "집안살림", "의료", "교통", "통신", "여가", "교육", "외식·숙박", "기타", "미분류"]
const periods = ["전체", "일주일", "한달", "이번달"]

const menus = [
  { name: '분석', to: 'analysis' },
  { name: '현황', to: 'status' },
]

const { start, now } = getCurrentDateInfo()
const thisMonthStart = toDateString(start)
const today = toDateString(now)

const getPeriodRange = (period: string | null) => {
  if (period === '일주일') {
    return getPastRange(7)
  }
  if (period === '한달') {
    return getPastRange(30)
  }
  if (period === '이번달') {
    return {
      start: thisMonthStart,
      end: today,
    }
  }
  return { start: '', end: '' }
}

const periodRangeText = computed(() => {
  const start = route.query.start_date as string | undefined
  const end = route.query.end_date as string | undefined
  return start && end ? `${start} ~ ${end}` : '전체'
})

const fetchWithCurrentFilters = async (page = 1) => {
  const rawCategory = route.query.category
  const categoryList: string[] = Array.isArray(rawCategory)
    ? rawCategory.filter((c): c is string => typeof c === 'string')
    : typeof rawCategory === 'string' ? [rawCategory] : []

  const filteredCategories = categoryList.filter(c => c !== '미분류')
  const includeNullCategory = categoryList.includes('미분류')

  const start = route.query.start_date as string | undefined
  const end = route.query.end_date as string | undefined

  await expenseStore.fetchExpenses({
    page,
    page_size: 5,
    start_date: start,
    end_date: end,
    category: filteredCategories.length > 0 ? filteredCategories : undefined,
    include_null_category: includeNullCategory,
  })
}

const selectPeriod = (period: string) => {
  selectedPeriod.value = period
}

const toggleCategory = (category: string) => {
  const index = selectedCategories.value.indexOf(category)
  if (index >= 0) selectedCategories.value.splice(index, 1)
  else selectedCategories.value.push(category)
}

const toggleFilter = async () => {
  isFilterOpen.value = !isFilterOpen.value
  if (!isFilterOpen.value) {
    const query: Record<string, any> = {}
    if (selectedCategories.value.length > 0) query.category = selectedCategories.value
    if (selectedPeriod.value && selectedPeriod.value !== '전체') {
      const { start, end } = getPeriodRange(selectedPeriod.value)
      query.start_date = start
      query.end_date = end
    }
    await router.replace({ query })
    await fetchWithCurrentFilters(1)
  }
}

const expandList = async () => {
  const start = route.query.start_date as string | undefined
  const end = route.query.end_date as string | undefined
  const categoryList = selectedCategories.value.filter(c => c !== '미분류')
  const includeNullCategory = selectedCategories.value.includes('미분류')

  if (expenseStore.hasNext && !expenseStore.isLoading) {
    await expenseStore.fetchExpenses({
      page: expenseStore.currentPage + 1,
      page_size: 5,
      start_date: start,
      end_date: end,
      category: categoryList.length > 0 ? categoryList : undefined,
      include_null_category: includeNullCategory,
    })
  }
}

const goToDetail = (expenseId: number) => {
  router.push(`/expense/status/${expenseId}`)
}

onMounted(async () => {
  const rawCategory = route.query.category
  const categoryList: string[] = Array.isArray(rawCategory)
    ? rawCategory.filter((c): c is string => typeof c === 'string')
    : typeof rawCategory === 'string' ? [rawCategory] : []
  selectedCategories.value = categoryList

  const start = route.query.start_date as string | undefined
  const end = route.query.end_date as string | undefined
  if (start === thisMonthStart && end === today) {
    selectedPeriod.value = '이번달'
  } else {
    selectedPeriod.value = '한달'
    const { start, end } = getPastRange(30)
    await router.replace({
      query: {
        category: selectedCategories.value,
        start_date: start,
        end_date: end,
      },
    })
  }

  await fetchWithCurrentFilters(1)
  isLoaded.value = true
})

watch(isFilterOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped></style>
