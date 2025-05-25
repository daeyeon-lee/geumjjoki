<template>
  <i :class = "`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L4 24M4 4L24 24" stroke="inherit" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
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
    default: '28'
  },
  height: {
    type: String,
    default: '28'
  }
})
</script>

<style scoped></style>
