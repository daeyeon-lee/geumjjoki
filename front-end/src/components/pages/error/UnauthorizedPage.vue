<template>
  <div>
    <h1>권한이 없습니다.</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();

onMounted(() => {
  alert("권한이 없습니다.");
  router.push({ name: "home" });
});
</script>

<style scoped></style>
