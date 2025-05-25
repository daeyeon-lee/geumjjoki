<template>
  <div class="pt-16 pb-40">
    <!-- 상단 제목 -->
    <div class="w-full relative">
      <div class="relative flex items-center h-7 mx-6">
        <h3 class="h3 mx-auto text-cocoa-600">리워드</h3>
        <button class="absolute left-0 top-1/2 transform -translate-y-1/2">
          <BackIcon color="black" class="cursor-pointer" @click="goBack" />
        </button>
      </div>
    </div>

    <!-- 탭 메뉴 -->
    <div class="w-full flex gap-4 px-6 mt-5 h-7 text-lg font-semibold">
      <h3 class="h3 fw-black text-gray-600" @click="goToProductList">상품목록</h3>
      <h3 class="h3 fw-black text-brown-600">구매내역</h3>
    </div>

    <!-- 카테고리 탭 -->
    <div class="w-full gap-5 text-center justify-between flex mt-5 px-5 text-gray-600">
      <h4
        v-for="item in categoryList" :key="item.label"
        class="h4 w-21 h-7 rounded-lg"
        @click="handleCategoryClick(item)"
        :class="item.isSelected ? 'bg-cocoa-100 text-cocoa-600' : 'bg-gray-400 text-cocoa-600'"
        >
        {{ item.label }}
      </h4>
      <!-- <h4 class="h4 w-21 h-7 rounded-lg bg-cocoa-100 text-cocoa-600">1주일</h4>
      <h4 class="h4 w-21 h-7 rounded-lg bg-gray-400 text-cocoa-600">1개월</h4>
      <h4 class="h4 w-21 h-7 rounded-lg bg-gray-400 text-cocoa-600">6개월</h4>
      <h4 class="h4 w-21 h-7 rounded-lg bg-gray-400 text-cocoa-600">1년</h4> -->
    </div>

    <!-- 정렬 옵션 -->
    <div class="self-end flex justify-end items-center gap-1 px-4 mt-5 h-7 text-base text-gray-600">
      <sort />
      <h4 class="h4 w-15 text-gray-600">이용완료</h4>
    </div>

    <!-- 구매내역 리스트 -->
    <div class="mt-6 px-10 space-y-4">
      <div
        v-for="item in purchaseList"
        :key="item.reward_transaction_id"
        class="flex justify-between items-center border-b-2 border-dashed border-gray-500 pb-4"
      >
        <!-- 상태 + 정보 -->
        <div class="flex items-center gap-3">
          <div
            class="flex flex-col items-center justify-center text-xs font-semibold w-14 h-14 rounded-full border"
            :class="statusClass(item.statusKey)"
          >
            <h4 class="h4 fw-black badge-text whitespace-pre-line">{{ item.statusLabel }}</h4>
          </div>
          <div class="text-left">
            <p class="h4 font-semibold text-cocoa-600 pb-2">{{ item.reward.name }}</p>
            <p class="caption text-gray-600 pb-2">{{ formatDate(item.redeemed_at) }}</p>
            <p class="caption text-gray-600 font-semibold">{{ item.reward.point }}P</p>
          </div>
        </div>

        <!-- 버튼 -->
        <div>
          <button
            class="bg-minty-400 text-gray-100 rounded-full"
            @click="openModal(item)"
          >
            <h4 class="h4 w-25.5 h-8">내역보기</h4>
          </button>
        </div>
      </div>
    </div>

    <!-- 모달 -->
    <PayProductModal
      v-if="showModal && selectedReward"
      :rewardData="selectedReward"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import sort from '@/components/common/icons/sort.vue'
import BackIcon from '@/components/common/icons/BackIcon.vue'
import PayProductModal from '@/components/pages/reward/PayProductModal.vue'
import usePurchasesComposable from '@/composables/usePurchases'
import type { RewardTransaction } from '@/types/purchases'

const router = useRouter()
const { fetchPurchaseList } = usePurchasesComposable()

const showModal = ref(false)
const selectedReward = ref<RewardTransaction | null>(null)

const statusMap: Record<number, { label: string; key: string }> = {
  0: { label: '미사용', key: 'unused' },
  1: { label: '사용중', key: 'active' },
  2: { label: '이용\n완료', key: 'done' },
}
interface ExtendedRewardTransaction extends RewardTransaction {
  statusKey: string
  statusLabel: string
}

const purchaseList = ref<ExtendedRewardTransaction[]>([])
const allPurchaseList = ref<ExtendedRewardTransaction[]>([])

const categoryList = ref([
  {
    label: '1주일',
    isSelected: true,
  },
  {
    label: '1개월',
    isSelected: false,
  },
  {
    label: '6개월',
    isSelected: false,
  },
  {
    label: '1년',
    isSelected: false,
  },
])


const fetchData = async () => {
  try {
    const data = await fetchPurchaseList()
    allPurchaseList.value = data.map((item: RewardTransaction) => {
      const status = statusMap[item.status] || { label: '알수없음', key: '' }
      return {
        ...item,
        statusLabel: status.label,
        statusKey: status.key,
      }
    })
    purchaseList.value = allPurchaseList.value
    // 1주일 만 조회
    purchaseList.value = allPurchaseList.value.filter((item: ExtendedRewardTransaction) => {
      const today = new Date()
      const redeemed_at = new Date(item.redeemed_at)
      const diffTime = Math.abs(today.getTime() - redeemed_at.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 7
    })
  } catch (e) {
    console.error('구매내역 불러오기 실패:', e)
  }
}

const handleCategoryClick = (item: any) => {
  categoryList.value.forEach((item) => {
    item.isSelected = false
  })
  item.isSelected = true
}

watch(categoryList.value, (newVal) => {
  console.log('newVal', newVal)
  categoryList.value.forEach((item) => {
    if (item.isSelected) {
      if (item.label === '1주일') {
        purchaseList.value = allPurchaseList.value.filter((item: ExtendedRewardTransaction) => {
          const today = new Date()
          const redeemed_at = new Date(item.redeemed_at)
          const diffTime = Math.abs(today.getTime() - redeemed_at.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          console.log('diffDays', diffDays)
          return diffDays <= 7
        })
      } else if (item.label === '1개월') {
        purchaseList.value = allPurchaseList.value.filter((item: ExtendedRewardTransaction) => {
          const today = new Date()
          const redeemed_at = new Date(item.redeemed_at)
          const diffTime = Math.abs(today.getTime() - redeemed_at.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          console.log('diffDays', diffDays)
          return diffDays <= 30
        })
      } else if (item.label === '6개월') {
        purchaseList.value = allPurchaseList.value.filter((item: ExtendedRewardTransaction) => {
          const today = new Date()
          const redeemed_at = new Date(item.redeemed_at)
          const diffTime = Math.abs(today.getTime() - redeemed_at.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          console.log('diffDays', diffDays)
          return diffDays <= 180
        })
      } else if (item.label === '1년') {
        purchaseList.value = allPurchaseList.value.filter((item: ExtendedRewardTransaction) => {
          const today = new Date()
          const redeemed_at = new Date(item.redeemed_at)
          const diffTime = Math.abs(today.getTime() - redeemed_at.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          console.log('diffDays', diffDays)
          return diffDays <= 365
        })
      }
    }
  })
})

const openModal = (item: RewardTransaction) => {
  selectedReward.value = item
  showModal.value = true
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

const statusClass = (status: string) => {
  switch (status) {
    case 'done':
      return 'text-gray-600 border-gray-400 bg-gray-200'
    case 'active':
      return 'text-gold-400 border-gray-400 bg-gray-200'
    case 'unused':
      return 'text-gold-600 border-gray-400 bg-gray-200'
    default:
      return ''
  }
}

const goToProductList = () => {
  router.push({ name: 'reward' })
}

onMounted(fetchData)

const goBack = () => router.back()

</script>

<style scoped>
.badge-text {
  white-space: pre-line;
}
</style>
