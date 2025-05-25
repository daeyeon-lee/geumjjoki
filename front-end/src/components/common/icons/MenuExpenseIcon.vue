<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" :viewBox="`0 0 ${props.width} ${props.height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.3409 1V5M7.45204 1V5M1.89648 9H21.8965M4.11871 3H19.6743C20.9016 3 21.8965 3.89543 21.8965 5V19C21.8965 20.1046 20.9016 21 19.6743 21H4.11871C2.89141 21 1.89648 20.1046 1.89648 19V5C1.89648 3.89543 2.89141 3 4.11871 3Z"
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
