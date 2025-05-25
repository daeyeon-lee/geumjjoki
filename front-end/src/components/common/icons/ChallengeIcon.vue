<template>
  <i :class = "`stroke-${props.color}`">
    <svg :width="props.width" :height="props.height" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 14.4333C1 14.4333 2.28482 13.4 6.13928 13.4C9.99373 13.4 12.5634 15.4667 16.4178 15.4667C20.2723 15.4667 21.5571 14.4333 21.5571 14.4333V2.03333C21.5571 2.03333 20.2723 3.06667 16.4178 3.06667C12.5634 3.06667 9.99373 1 6.13928 1C2.28482 1 1 2.03333 1 2.03333V14.4333ZM1 14.4333V21.6667"
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
