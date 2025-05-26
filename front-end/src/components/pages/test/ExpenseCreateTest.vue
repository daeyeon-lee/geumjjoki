<template>
  <div class="w-full bg-gray-200">
    <h1 class="text-2xl font-bold mb-4 text-cocoa-800">🧪 지출 생성 테스트</h1>
    <div class="mb-6 text-center">
      <label for="dateInput" class="block mb-2 text-cocoa-700 font-medium">지출 날짜 선택</label>
      <input id="dateInput" v-model="selectedDate" type="date" class="px-3 py-2 rounded-md border border-gray-300" />
    </div>
    <div class="flex flex-col gap-6 bg-gray-200 mb-32 items-center justify-center">
      <div v-for="category in categoryStore.rootCategories" :key="category.category_id" class="flex flex-col gap-2">
        <p class="text-lg font-semibold text-cocoa-700">{{ category.name }}</p>
        <div class="flex gap-2">
          <button v-for="amount in [5000, 10000, 50000, 100000]" :key="amount"
            @click="confirmAndCreate(category.name, amount)"
            class="px-3 py-2 bg-gold-300 rounded-lg text-cocoa-800 font-semibold hover:bg-gold-400">
            {{ amount.toLocaleString() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toDateString } from '@/utils/date'
import expenseService from '@/services/api/expenseService'
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted, ref } from 'vue'

const selectedDate = ref(toDateString(new Date()))

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.fetchRootCategories()
})

async function confirmAndCreate(categoryName: string, amount: number) {
  const category = categoryStore.rootCategories.find(c => c.name === categoryName)
  if (!category) {
    alert(`카테고리 ${categoryName}를 찾을 수 없습니다.`)
    return
  }

  const confirmed = window.confirm(
    `${categoryName} 카테고리로 ${amount.toLocaleString()}원을 ${selectedDate.value}에 지출하시겠습니까?`
  )
  if (!confirmed) return

  try {
    await expenseService.createExpense({
      categoryId: category.category_id,
      amount,
      description: `${categoryName} 테스트 결제`,
      date: selectedDate.value,
    })
    alert(`${categoryName} 지출이 생성되었습니다!`)
  } catch (err) {
    console.error('지출 생성 실패', err)
    alert(`지출 생성 실패: ${(err as any)?.response?.data?.message || '오류 발생'}`)
  }
}
</script>
