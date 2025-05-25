<template>
    <i :class="`stroke-${props.color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.5002 9.19043L16.6668 13.3571M16.6668 13.3571L12.5002 17.5238M16.6668 13.3571H6.66683C5.78277 13.3571 4.93493 13.0059 4.30981 12.3808C3.68469 11.7557 3.3335 10.9078 3.3335 10.0238V4.19043"
                stroke="inherit" stroke-linecap="round" stroke-linejoin="round" />
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
    default: '20'
  },
  height: {
    type: String,
    default: '20'
  }
})
</script>

<style scoped></style>
