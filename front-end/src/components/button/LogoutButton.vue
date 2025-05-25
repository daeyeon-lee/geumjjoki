<template>
  <button
    @click="logout"
    class="px-4 py-2 bg-icy-blue-500 text-white rounded-lg hover:bg-icy-blue-600 transition-colors"
  >
    로그아웃
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

// props와 emit 정의
const emit = defineEmits(['logout-success']);
const router = useRouter();

const logout = async () => {
  try {
    console.log('로그아웃 시작: 토큰 제거');

    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    // 토큰 삭제 확인 로그
    console.log('로컬 스토리지 토큰 확인:', localStorage.getItem('access_token'));

    // 로그아웃 이벤트 발생
    emit('logout-success');

    // 전역 이벤트 발생 (window에 직접 접근해서 함수가 있는지 확인 후 호출)
    if (window.updateAuthState) {
      window.updateAuthState();
    }

    // 백엔드 로그아웃 API 호출
    await fetch('http://localhost:8000/api/v1/auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'  // 쿠키 포함 (쿠키에 토큰이 저장된 경우)
    });

    console.log('백엔드 로그아웃 완료');

    // 로그인 페이지로 리디렉션
    router.push('/auth/login');
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);

    // 오류가 발생해도 이벤트 발생
    emit('logout-success');

    // 로그인 페이지로 리디렉션
    router.push('/auth/login');
  }
};
</script>
