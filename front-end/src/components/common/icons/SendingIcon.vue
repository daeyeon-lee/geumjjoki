<template>
    <i :class="`stroke-${props.color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6907 10.0582L8.89245 16.5961L12.0032 10.0582L8.89245 3.52038L25.6907 10.0582Z"
                fill="#B3B3B3" />
            <path
                d="M25.6907 10.0582H12.0032M25.6907 10.0582L8.89245 16.5961L12.0032 10.0582M25.6907 10.0582L8.89245 3.52038L12.0032 10.0582"
                stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
    default: '24'
  },
  height: {
    type: String,
    default: '24'
  }
})
</script>

<style scoped></style>
