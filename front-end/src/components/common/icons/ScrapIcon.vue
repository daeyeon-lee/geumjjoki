<template>
    <i :class="`stroke-${props.color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.6982 17L8.69824 12.5556L0.698242 17V2.77778C0.698242 2.30628 0.939058 1.8541 1.36771 1.5207C1.79637 1.1873 2.37775 1 2.98396 1H14.4125C15.0187 1 15.6001 1.1873 16.0288 1.5207C16.4574 1.8541 16.6982 2.30628 16.6982 2.77778V17Z"
                stroke="inherit" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </i>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'gray-600'
    },
    width: {
        type: String,
        default: '16'
    },
    height: {
        type: String,
        default: '16'
    }
})
</script>

<style scoped></style>
