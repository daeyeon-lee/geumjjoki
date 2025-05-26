<template>
  <header class="sticky top-0 z-10 w-full bg-gold-100 flex flex-col items-center px-6">
    <div class="w-full min-h-12 bg-gold-100"></div>
    <!-- 뒤로가기 아이콘: 왼쪽 정렬 -->
    <div class="flex relative items-center w-full h-12 bg-gold-100">
      <BackIcon color="black" class="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer" @click="handleGoBack" />
      <!-- 가운데 제목 -->
      <h3 v-if="props.title" class="h3 text-cocoa-600 mx-auto">{{ props.title }}</h3>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BackIcon from '@/components/common/icons/BackIcon.vue'

const router = useRouter()

const props = defineProps<{
  title: string
}>()

const emit = defineEmits(['handleGoBack'])

const handleGoBack = () => {
  if (emit('handleGoBack')) {
    emit('handleGoBack')
  } else {
    router.back()
  }
}
</script>

<style scoped></style>