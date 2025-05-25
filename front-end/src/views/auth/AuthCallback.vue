<template>
  <div>
    <p v-if="loading">로그인 처리 중...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
const router = useRouter();
const route = useRoute();
const error = ref(null);

onMounted(async () => {
  // URL에서 토큰 추출
  const accessToken = route.query.access_token;
  const refreshToken = route.query.refresh_token;
  // console.log('Received token:', token)

  if (accessToken) {
    try {
      // 토큰 저장
      localStorage.removeItem('access_token'); // 기존 토큰 제거
      localStorage.setItem('access_token', accessToken);
      localStorage.removeItem('refresh_token');
      localStorage.setItem('refresh_token', refreshToken);
      // console.log('카카오 로그인: 토큰이 저장되었습니다:', token);

      router.push({ name: 'login_submit' });
    } catch (e) {
      console.error('토큰 저장 중 오류:', e);
      error.value = '토큰 저장 중 오류가 발생했습니다.';
    }
  } else {
    error.value = '로그인 토큰을 받지 못했습니다.';
  }
});
</script>

<style>
.error {
  color: red;
}

</style>
