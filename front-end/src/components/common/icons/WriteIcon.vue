<template>
<i :class="`stroke-${props.color}`">
    <svg :width="props.width" :height="props.width" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 25.4706H25M19 1.88802C19.5304 1.31943 20.2499 1 21 1C21.3714 1 21.7392 1.07842 22.0824 1.23079C22.4256 1.38316 22.7374 1.60648 23 1.88802C23.2626 2.16956 23.471 2.50379 23.6131 2.87164C23.7553 3.23948 23.8284 3.63374 23.8284 4.03189C23.8284 4.43004 23.7553 4.8243 23.6131 5.19214C23.471 5.55999 23.2626 5.89422 23 6.17576L6.33333 24.0413L1 25.4706L2.33333 19.7536L19 1.88802Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    default: '24'
  },
  height: {
    type: String,
    default: '24'
  }
})
</script>

<style scoped>

</style>
