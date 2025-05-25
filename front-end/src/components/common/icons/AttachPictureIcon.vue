<template>
    <i :class="`stroke-${color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 23 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.77878 21H18.1599C19.2157 21 20.0715 20.1046 20.0715 19V5C20.0715 3.89543 19.2157 3 18.1599 3H4.77878C3.72304 3 2.86719 3.89543 2.86719 5V19C2.86719 20.1046 3.72304 21 4.77878 21ZM4.77878 21L15.2925 10L20.0715 15M9.55777 8.5C9.55777 9.32843 8.91588 10 8.12407 10C7.33226 10 6.69038 9.32843 6.69038 8.5C6.69038 7.67157 7.33226 7 8.12407 7C8.91588 7 9.55777 7.67157 9.55777 8.5Z"
                stroke="#B3B3B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
        default: '24'
    },
    height: {
        type: String,
        default: '24'
    }
})
</script>

<style scoped></style>
