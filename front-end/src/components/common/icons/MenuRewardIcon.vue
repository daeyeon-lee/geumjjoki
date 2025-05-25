<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.81032 12.7182L4.08175 21L11.2246 18.2727L18.3675 21L16.6389 12.7091M21.2246 7.36364C21.2246 10.8782 16.7475 13.7273 11.2246 13.7273C5.70176 13.7273 1.22461 10.8782 1.22461 7.36364C1.22461 3.8491 5.70176 1 11.2246 1C16.7475 1 21.2246 3.8491 21.2246 7.36364Z"
        stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </i>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'inherit'
  },
  width: {
    type: String,
    default: '23'
  },
  height: {
    type: String,
    default: '22'
  }
})
</script>

<style scoped></style>
