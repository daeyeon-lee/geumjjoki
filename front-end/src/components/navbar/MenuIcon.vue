<template>
  <div class="flex flex-col items-center justify-center gap-2 w-[3.75rem] h-[3.75rem]" @click="emit('click')">
    <div :class="iconClass" class="mt-2.5 transition-all duration-200">
      <slot name="icon" />
    </div>
    <div :class="textClass" class="transition-all duration-200 caption fw-bold">
      <slot name="text" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
const props = defineProps<{
  variant: boolean
}>();

const isActive = computed(() => props.variant);
const iconClass = computed(() => isActive.value ? 'stroke-gold-600' : 'stroke-cocoa-600');
const textClass = computed(() => isActive.value ? 'text-gold-600' : 'text-cocoa-600');

const emit = defineEmits(['click']);

</script>

<style></style>
