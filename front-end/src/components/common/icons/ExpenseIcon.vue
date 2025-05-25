<template>
  <i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.2208 1V5M7.03566 1V5M1.29492 9H21.9616M3.59122 3H19.6653C20.9335 3 21.9616 3.89543 21.9616 5V19C21.9616 20.1046 20.9335 21 19.6653 21H3.59122C2.32301 21 1.29492 20.1046 1.29492 19V5C1.29492 3.89543 2.32301 3 3.59122 3Z"
        stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </i>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'gold-600'
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
