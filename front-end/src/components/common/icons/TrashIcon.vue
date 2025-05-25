<template>
    <i :class="`stroke-${props.color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1 6.01179H3.66667M3.66667 6.01179H25M3.66667 6.01179V23.1412C3.66667 23.7902 3.94762 24.4126 4.44772 24.8715C4.94781 25.3305 5.62609 25.5883 6.33333 25.5883H19.6667C20.3739 25.5883 21.0522 25.3305 21.5523 24.8715C22.0524 24.4126 22.3333 23.7902 22.3333 23.1412V6.01179M7.66667 6.01179V3.56473C7.66667 2.91573 7.94762 2.29332 8.44772 1.8344C8.94781 1.37549 9.62609 1.11768 10.3333 1.11768H15.6667C16.3739 1.11768 17.0522 1.37549 17.5523 1.8344C18.0524 2.29332 18.3333 2.91573 18.3333 3.56473V6.01179M10.3333 12.1294V19.4706M15.6667 12.1294V19.4706"
                stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
