<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.45964 21V11H15.1263V21M1.79297 8L11.793 1L21.793 8V19C21.793 19.5304 21.5588 20.0391 21.1421 20.4142C20.7253 20.7893 20.1601 21 19.5707 21H4.01519C3.42582 21 2.86059 20.7893 2.44384 20.4142C2.02709 20.0391 1.79297 19.5304 1.79297 19V8Z"
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
