<template>
  <div>
    <p v-if="loading">로그인 처리 중...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const error = ref(null);

onMounted(() => {
  // URL에서 토큰 추출
  const token = route.query.token;

  if (token) {
    try {
      // 토큰 저장
      localStorage.removeItem('access_token'); // 기존 토큰 제거
      localStorage.setItem('access_token', token);
      console.log('토큰이 저장되었습니다:', token);
      console.log('저장된 토큰 확인:', localStorage.getItem('access_token'));

      // 메인 페이지로 리디렉션
      router.push('/main');
    } catch (e) {
      console.error('토큰 저장 중 오류:', e);
      error.value = '토큰 저장 중 오류가 발생했습니다.';
    }
  } else {
    error.value = '로그인 토큰을 받지 못했습니다.';
  }

  loading.value = false;
});
</script>

<style>
.error {
  color: red;
}
</style>
