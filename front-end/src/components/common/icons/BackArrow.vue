<template>
  <i :class="`fill-${color}`">
    <svg xmlns="http://www.w3.org/2000/svg" :height="height" :width="width" viewBox="0 -960 960 960" fill="inherit">
      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
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
