<template>
  <i :class="`stroke-${color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 44 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 19.125L22 31.875L33 19.125" stroke="#3B271C" stroke-width="4" stroke-linecap="round"
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
    default: '44'
  },
  height: {
    type: String,
    default: '51'
  }
})
</script>

<style scoped></style>
