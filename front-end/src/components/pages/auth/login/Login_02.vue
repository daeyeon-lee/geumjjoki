<template>
  <div class="absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full">
    <img src="@/assets/images/geumjjoki_logo_with_text.png" alt="logo" class="w-60 h-60">
    <div class="flex flex-col items-start justify-start gap-1">
      <p class="h3 text-cocoa-600"><span class="text-gold-600">금</span>방 흘려버릴 돈</p>
      <p class="h3 text-cocoa-600"><span class="text-gold-600">쪼</span>개서 가치 있게</p>
      <p class="h3 text-cocoa-600"><span class="text-gold-600">기</span>분 좋은 소비</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
const router = useRouter()

const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(async () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  // console.log('현재 저장된 토큰:', token);
  try {
    if (accessToken) {
      // 토큰 설정 및 인증 상태 업데이트
      authStore.setToken(accessToken);
      authStore.setRefreshToken(refreshToken);

      // 명시적으로 userStore의 fetchUser를 직접 호출
      await userStore.fetchUser();

      if (userStore.user) {
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 2000)
      }
    }
  } catch (error) {
    console.error('사용자 정보를 가져오는데 실패하였습니다:', error);
  }
})
</script>

<style scoped></style>
