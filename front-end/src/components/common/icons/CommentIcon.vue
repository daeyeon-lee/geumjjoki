<template>
    <i :class="`stroke-${color}`">
        <svg :width="props.width" :height="props.height" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17 8.55557C17.003 9.72878 16.7289 10.8861 16.2 11.9333C15.5728 13.1882 14.6086 14.2437 13.4155 14.9816C12.2223 15.7195 10.8473 16.1106 9.44443 16.1111C8.27122 16.1142 7.11387 15.8401 6.06666 15.3111L1 17L2.68889 11.9333C2.15994 10.8861 1.88583 9.72878 1.88889 8.55557C1.88943 7.15269 2.28054 5.77766 3.01841 4.58451C3.75629 3.39135 4.81178 2.42719 6.06666 1.80002C7.11387 1.27107 8.27122 0.996966 9.44443 1.00003H9.88887C11.7416 1.10224 13.4916 1.88426 14.8037 3.19634C16.1157 4.50843 16.8978 6.25837 17 8.11113V8.55557Z"
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
