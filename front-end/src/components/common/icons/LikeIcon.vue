<template>
    <i :class = "`stroke-${props.color} fill-${props.fillcolor}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 16 16" fill="inherit" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.66683 7.3335L7.3335 1.3335C7.86393 1.3335 8.37264 1.54421 8.74771 1.91928C9.12278 2.29436 9.3335 2.80306 9.3335 3.3335V6.00016H13.1068C13.3001 5.99797 13.4915 6.03783 13.6679 6.11697C13.8442 6.19612 14.0012 6.31265 14.1281 6.45851C14.2549 6.60436 14.3485 6.77604 14.4024 6.96166C14.4563 7.14728 14.4692 7.3424 14.4402 7.5335L13.5202 13.5335C13.4719 13.8514 13.3105 14.1412 13.0654 14.3495C12.8204 14.5578 12.5084 14.6705 12.1868 14.6668H4.66683M4.66683 7.3335V14.6668M4.66683 7.3335H2.66683C2.31321 7.3335 1.97407 7.47397 1.72402 7.72402C1.47397 7.97407 1.3335 8.31321 1.3335 8.66683V13.3335C1.3335 13.6871 1.47397 14.0263 1.72402 14.2763C1.97407 14.5264 2.31321 14.6668 2.66683 14.6668H4.66683"
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
    },
    fillcolor : {
        type: String,
        default: 'none'
    }
})
</script>

<style scoped></style>
