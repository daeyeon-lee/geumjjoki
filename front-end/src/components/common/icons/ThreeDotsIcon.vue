<template>
    <i :class="`fill-${props.color} stroke-0`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.03027 21.0291C9.03027 22.671 10.3585 24 11.9997 24C13.6408 24 14.9698 22.6725 14.9698 21.0291C14.9698 19.3902 13.6431 18.0597 11.9997 18.0597C10.3585 18.0597 9.03027 19.3902 9.03027 21.0291ZM9.03027 11.8461C9.03027 13.4843 10.3577 14.817 11.9989 14.817C13.6401 14.817 14.9691 13.4858 14.9691 11.8461C14.9691 10.2065 13.6423 8.87375 11.9989 8.87375C10.3585 8.87525 9.03027 10.2065 9.03027 11.8461ZM9.03027 2.96865C9.03027 4.60983 10.3585 5.94029 12.0004 5.94029C13.6401 5.94029 14.9691 4.61207 14.9691 2.96865C14.9691 1.33046 13.6423 0 12.0004 0C10.3585 0 9.03027 1.33046 9.03027 2.96865Z"
                fill="inherit" />
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

<style scoped></style>
