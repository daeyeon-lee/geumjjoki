<template>
    <i :class="`stroke-${props.color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path
                d="M25 25L19.2 19.2M22.3333 11.6667C22.3333 17.5577 17.5577 22.3333 11.6667 22.3333C5.77563 22.3333 1 17.5577 1 11.6667C1 5.77563 5.77563 1 11.6667 1C17.5577 1 22.3333 5.77563 22.3333 11.6667Z"
                stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
