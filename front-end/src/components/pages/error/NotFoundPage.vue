<template>
  <div>
    <h1>페이지를 찾을 수 없습니다.</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  alert("페이지를 찾을 수 없습니다.");
  // router.push({ name: "home" });
});
</script>

<style scoped></style>