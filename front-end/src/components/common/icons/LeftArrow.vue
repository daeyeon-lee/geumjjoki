<template>
  <i :class ="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 15L1 8L7 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </i>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'cocoa-600'
  },
  width: {
    type: String,
    default: '16'
  },
  height: {
    type: String,
    default: '16'
  }
})
</script>

<style scoped></style>
