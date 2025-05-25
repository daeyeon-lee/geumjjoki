<template>
  <i :class="`fill-${color}`">
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.1784 8.07407L6.35727 2.88889L2.53613 8.07407" stroke="#767676" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round" />
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
    default: '24'
  },
  height: {
    type: String,
    default: '24'
  }
})
</script>

<style scoped></style>
