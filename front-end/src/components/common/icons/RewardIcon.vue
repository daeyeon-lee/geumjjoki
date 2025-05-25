<template>
  <i :class = "`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.58571 12.7182L3.85714 21L11 18.2727L18.1429 21L16.4143 12.7091M21 7.36364C21 10.8782 16.5228 13.7273 11 13.7273C5.47715 13.7273 1 10.8782 1 7.36364C1 3.8491 5.47715 1 11 1C16.5228 1 21 3.8491 21 7.36364Z"
        stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
    default: '20'
  },
  height: {
    type: String,
    default: '20'
  }
})
</script>

<style scoped></style>
