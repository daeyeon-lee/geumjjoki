<template>
    <i :class="`stroke-${props.color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_667_2362)">
        <circle cx="28" cy="24" r="24" fill="#B36D27"/>
        <path d="M28 37.5H41.5M34.75 11.4798C35.3467 10.8524 36.1561 10.5 37 10.5C37.4179 10.5 37.8316 10.5865 38.2177 10.7546C38.6037 10.9228 38.9545 11.1692 39.25 11.4798C39.5455 11.7904 39.7799 12.1592 39.9398 12.5651C40.0997 12.971 40.182 13.406 40.182 13.8453C40.182 14.2846 40.0997 14.7196 39.9398 15.1255C39.7799 15.5313 39.5455 15.9001 39.25 16.2108L20.5 35.923L14.5 37.5L16 31.1921L34.75 11.4798Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <filter id="filter0_d_667_2362" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_667_2362"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_667_2362" result="shape"/>
        </filter>
        </defs>
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
    default: '48'
  },
  height: {
    type: String,
    default: '48'
  }
})
</script>

<style scoped>

</style>
