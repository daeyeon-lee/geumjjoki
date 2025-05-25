<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.26855 14.3871H30.1399M2.26855 2H30.1399M2.26855 26.7742H30.1399" stroke="inherit" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round" />
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
