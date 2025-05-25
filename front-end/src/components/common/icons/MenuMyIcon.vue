<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 21V18.7778C21 17.599 20.4732 16.4686 19.5355 15.6351C18.5979 14.8016 17.3261 14.3333 16 14.3333H6C4.67392 14.3333 3.40215 14.8016 2.46447 15.6351C1.52678 16.4686 1 17.599 1 18.7778V21M16 5.44444C16 7.89904 13.7614 9.88889 11 9.88889C8.23858 9.88889 6 7.89904 6 5.44444C6 2.98985 8.23858 1 11 1C13.7614 1 16 2.98985 16 5.44444Z"
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
    default: '22'
  },
  height: {
    type: String,
    default: '22'
  }
})
</script>

<style scoped></style>
