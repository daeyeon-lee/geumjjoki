<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 14C1 14 2.25 13 6 13C9.75 13 12.25 15 16 15C19.75 15 21 14 21 14V2C21 2 19.75 3 16 3C12.25 3 9.75 1 6 1C2.25 1 1 2 1 2V14ZM1 14V21"
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
