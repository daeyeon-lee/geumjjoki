<template>
  <i :class="`fill-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
      fill="inherit">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fill="inherit" d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z"></path>
      </g>
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
    default: '20'
  },
  height: {
    type: String,
    default: '20'
  }
})

</script>

<style scoped></style>
