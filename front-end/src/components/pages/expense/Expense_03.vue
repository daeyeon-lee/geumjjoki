<template>
  <div class="flex flex-col items-center px-6 w-full relative">
    <TopNavBar title="소비" class="mt-16" @back="router.back()"/>

    <!-- 상세 내역 -->
    <div v-if="expense" class="w-full px-3 mt-18">
      <!-- 제목 -->
      <div>
        <h4 class="h4">{{ isLoaded ? (expense.category?.name ?? '미분류') : '' }}</h4>
        <h3 class="h3">{{ isLoaded && expense.amount.toLocaleString() }}원</h3>
      </div>
      <!-- 구분선 -->
      <div class="w-full px-1 h-13 flex items-center">
        <div class="h-0.5 bg-gray-700 w-full"></div>
      </div>

      <!-- 내용 -->
      <div class="w-full font-semibold px-1 text-cocoa-600">
        <div class="flex flex-col space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="h4">카테고리 설정</h4>
            </div>
            <div class="flex justify-center items-center" @click="toggleIsCategoryOpen">
              <h4 class="h4">
                {{
                  expense.category
                    ? (expense.category.parent === null
                      ? expense.category.name
                      : expense.category.parent)
                    : '미분류'
                }}
              </h4>
              <BackIcon color="black" class="cursor-pointer inline-block rotate-180" :width="'20'" :height="'24'">
              </BackIcon>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <h4 class="h4">설명</h4>
            </div>
            <div class="flex justify-center items-center" @click="toggleIsMemoOpen">
              <h4 class="h4">
                {{
                  expense.description.length > 10
                    ? expense.description.slice(0, 10) + '...'
                : expense.description
                }}
              </h4>
              <BackIcon color="black" class="cursor-pointer inline-block rotate-180" :width="'20'" :height="'24'">
              </BackIcon>
            </div>
          </div>
          <!-- <div class="flex justify-between items-center">
            <div>
              <h4 class="h4">결제 수단</h4>
            </div>
            <div class="flex justify-center items-center">
              <h4 class="h4">국민카드</h4>
            </div>
          </div> -->
          <div class="flex justify-between items-center">
            <div>
              <h4 class="h4">결제 일시</h4>
            </div>
            <div class="flex justify-center items-center">
              <h4 class="h4">{{ isLoaded && expense.date }}</h4>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>

  <!-- 카테고리 변경 모달 -->
  <div v-show="isCategoryOpen"
    class="absolute w-full bottom-0 z-30 shadow-[0px_8px_14px_2px_rgba(0,_0,_0,_0.35)] rounded-t-3xl bg-gray-200">
    <div class="flex w-full items-center px-8 pt-8">
      <div class="flex-1"></div>
      <h3 class="h3 flex text-center">카테고리 설정</h3>
      <div class="flex-1 flex justify-end">
        <XIcon @click="toggleIsCategoryOpen" />
      </div>
    </div>
    <div class="grid grid-cols-2 px-8 gap-5.5 pt-5.5 pb-19">
      <div v-for="category in categories" :key="category.category_id" class="flex items-center"
        @click="selectCategory(category)">
        <div class="bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center">
          <svg v-if="selectedCategory === category.category_id" xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 class="h4 ml-3">{{ category.name }}</h4>
      </div>
    </div>
  </div>
  <div v-show="isCategoryOpen" @click="toggleIsCategoryOpen"
    class="z-5 absolute top-0 left-0 w-full h-screen bg-gray-300/70">
  </div>

  <!-- 설명 변경 모달 -->
  <div v-show="isMemoOpen"
    class="absolute w-full bottom-0 z-30 shadow-[0px_8px_14px_2px_rgba(0,_0,_0,_0.35)] rounded-t-3xl bg-gray-200 h-90">
    <div class="flex w-full items-center px-8 pt-8">
      <div class="flex-1"></div>
      <h3 class="h3 flex text-center">설명</h3>
      <div class="flex-1 flex justify-end">
        <XIcon @click="toggleIsMemoOpen" />
      </div>
    </div>
    <div class="w-full p-8">
      <form @submit.prevent="saveDescription">
        <div class="mb-10">
          <textarea v-model="tempDescription"
            class="bg-gray-50 border border-gray-600 text-cocoa-600 rounded-t-lg w-full p-2.5 h-30 resize-none"
            rows="5"></textarea>
        </div>
        <button type="submit"
          class="text-cocoa-600 focus:ring-1 rounded-t-lg text-sm w-full text-center py-1.5 bg-cocoa-100 border border-cocoa-200 h3">확인</button>
      </form>
    </div>
  </div>
  <div v-show="isMemoOpen" @click="toggleIsMemoOpen" class="z-5 absolute top-0 left-0 w-full h-screen bg-gray-300/70">
  </div>
</template>

<script setup lang="ts">
import TopNavBar from '@/components/navbar/TopNavBar.vue'
import BackIcon from '@/components/common/icons/BackIcon.vue'
import XIcon from '@/components/common/icons/XIcon.vue'
import expenseService from '@/services/api/expenseService'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Category, Expense } from '@/types/expense'
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const router = useRouter()
const expenseId = Number(route.params.id)

const expense = ref<Expense | null>(null)
const isLoaded = ref(false)

const categoryStore = useCategoryStore()
const categories = computed(() => categoryStore.rootCategories || [])
const selectedCategory = ref<number | null>(null)

onMounted(async () => {
  try {
    await categoryStore.fetchRootCategories()
    const response = await expenseService.getExpenseDetail(expenseId)
    expense.value = response
    selectedCategory.value = response.category?.category_id ?? null
  } finally {
    isLoaded.value = true
  }
})

const selectCategory = async (category: Category) => {
  if (selectedCategory.value === category.category_id) return

  try {
    await expenseService.updateExpenseCategory(expenseId, category.category_id)
    selectedCategory.value = category.category_id

    if (expense.value) {
      expense.value.category = category
    }

    isCategoryOpen.value = false
  } catch (err) {
    console.error('카테고리 변경 실패', err)
  }
}

const isCategoryOpen = ref(false)
const isMemoOpen = ref(false)
const tempDescription = ref('')


const toggleIsCategoryOpen = () => {
  isCategoryOpen.value = !isCategoryOpen.value
}
const toggleIsMemoOpen = () => {
  if (!isMemoOpen.value && expense.value) {
    tempDescription.value = expense.value.description
  }
  isMemoOpen.value = !isMemoOpen.value
}

const saveDescription = async () => {
  if (!expense.value) return
  try {
    await expenseService.updateExpenseDescription(expense.value.expense_id, tempDescription.value)
    expense.value = {
      ...expense.value,
      description: tempDescription.value.trim(),
    }
    isMemoOpen.value = false
  } catch (err) {
    console.error('설명 저장 실패:', err)
  }
}
</script>

<style scoped></style>