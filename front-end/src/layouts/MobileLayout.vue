<template>
  <div class="h-screen mx-auto max-w-md bg-gray-200 relative flex flex-col items-center pb-16">
    <slot />
    <MenuBar />
  </div>
</template>

<script setup lang="ts">
import MenuBar from '@/components/navbar/MenuBar.vue'
</script>

<style scoped>
</style>
