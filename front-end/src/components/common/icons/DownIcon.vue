<template>
  <i :class="`stroke-${color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#767676" stroke-width="4" stroke-linecap="round"
        stroke-linejoin="round" />
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
    default: '20'
  },
  height: {
    type: String,
    default: '20'
  }
})
</script>

<style scoped></style>
