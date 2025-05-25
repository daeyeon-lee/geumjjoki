<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 15.4275L7.5 8.99888L2.5 2.57031" stroke="inherit" stroke-width="4" stroke-linecap="round"
        stroke-linejoin="round" />
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
    default: '8'
  },
  height: {
    type: String,
    default: '8'
  }
})
</script>

<style scoped></style>
