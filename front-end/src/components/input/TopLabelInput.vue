<template>
  <div class="flex flex-col gap-2">
    <label :for="randomId" :class="props.labelFont">{{ props.label }}</label>
    <BaseInput
      :id="randomId"
      :type="props.type"
      :model-value="modelValue"
      @update:model-value="updateValue"
      :variant="props.variant"
      :name="props.name"
      :width="props.width"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/common/base/BaseInput.vue';
import { computed } from 'vue';
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  labelFont: {
    type: String,
    default: 'p1',
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'full',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'white',
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
});

const randomId = props.name + "_" + Math.random().toString(36).substring(2, 15);

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const updateValue = (value: string) => {
  emit('update:modelValue', value);
}
</script>

<style scoped>

</style>
