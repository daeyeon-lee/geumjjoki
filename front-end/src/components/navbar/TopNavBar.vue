<template>
  <div class="relative w-full h-7 flex justify-center items-center">
    <button class="absolute left-0 top-1/2 transform -translate-y-1/2" @click="handleBack">
      <BackIcon color="black" class="cursor-pointer" />
    </button>
    <h3 class="text-center h3">{{ title }}</h3>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
import BackIcon from '@/components/common/icons/BackIcon.vue';
import { useRoute, useRouter } from 'vue-router'

const { title } = defineProps<{
  title: string
}>()

const route = useRoute()
const router = useRouter()
const mainRoots = [
  '/expense/analysis',
  '/expense/status',
]

const handleBack = () => {
  const path = route.path
  const parts = path.split('/')
  const parentPath = parts.slice(0, -1).join('/')
  if (mainRoots.includes(path)) {
    router.push('/')
    return
  }
  router.push(parentPath)
}


</script>

<style scoped></style>