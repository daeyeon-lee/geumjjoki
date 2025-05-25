<template>
  <i :class="`stroke-${color}`">
    <svg :width="width" :height="height" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2761 2L2.31055 22M2.31055 2L21.2761 22" stroke="#3B271C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  </i>
</template>

<script setup>
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
    default: '24'
  }
})
</script>

<style scoped></style>
