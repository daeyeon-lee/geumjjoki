<script setup lang='ts'>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'gray',
  },
  textColor: {
    type: String,
    default: 'white',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])
const classes = computed(() => {
  return `hover:bg-${props.bgColor}-700 bg-${props.bgColor}-500 text-${props.textColor} px-4 py-2 cursor-pointer ${props.rounded ? 'rounded-full' : 'rounded-md'} transition-colors duration-300`
})
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled" @click="emit('click')">
    {{ text }}
  </button>
</template>

<style></style>
