<template>
  <div class="relative w-full h-7 flex justify-center items-center">
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2"
      @click="handleClick"
    >
      <BackIcon color="black" class="cursor-pointer" />
    </button>
    <div class="text-center h3">
      <slot>{{ title }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import BackIcon from '@/components/common/icons/BackIcon.vue'

const props = defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (e: 'back'): void
}>()

const handleClick = () => {
  emit('back')
}
</script>

<style scoped></style>