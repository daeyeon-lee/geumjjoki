<template>
  <!-- 흐릿한 흰 배경 -->
  <div
    class="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <!-- 모달 박스 -->
    <div class="bg-gray-200 rounded-3xl w-90 h-170 px-10 pt-14.5 shadow-xl text-center">

      <!-- 상품명 영역 (이미지 대신 텍스트) -->
      <div class="bg-gray-400 rounded-md w-full h-79.5 flex items-center justify-center border border-gray-600">
        <h3 class="h3 text-cocoa-500">제품 이미지</h3>
      </div>

      <!-- 상품명 / 가격 -->
      <div class="pt-5 pb-2">
        <div class="flex justify-between h-9">
          <h4 class="text-cocoa-500 font-extrabold">{{ product.name }}</h4>
          <h4 class="text-cocoa-500 font-extrabold">{{ product.point }}P</h4>
        </div>

        <!-- 상품 설명 -->
        <div class="bg-gray-300 w-full h-28.25 px-2 py-2 rounded-md text-left">
          <h4 class="text-cocoa-500 mb-1 font-extrabold">상품설명</h4>
          <h4 class="text-cocoa-500 font-extrabold whitespace-pre-line">
            {{ product.description || '상품설명이 없습니다.' }}
          </h4>
        </div>
      </div>

      <!-- 버튼 영역 -->
      <div class="h-17 flex gap-3 justify-between mx-auto mt-6">
        <button @click="$emit('close')" class="bg-gray-600 w-22 h-17 rounded-lg">
          <h3 class="h3 text-cocoa-500">닫기</h3>
        </button>

        <button class="bg-gold-400 w-45 h-17 rounded-lg" @click="handlePurchase">
          <h3 class="h3 text-cocoa-500">구매하기</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Reward } from '@/types/rewards'
import useRewardsComposable from '@/composables/useRewards'
const router = useRouter()
const useRewards = useRewardsComposable()

const { product } = defineProps<{
  product: Reward
}>()

const handlePurchase = async () => {
  const data = await useRewards.purchaseReward(product.reward_id)
  if (data.code === 400) {
    alert(data.message)
  } else {
    router.push({ name: 'reward_02' })
  }
}
</script>
