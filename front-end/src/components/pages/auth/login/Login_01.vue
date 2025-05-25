<template>
  <header class="flex items-center justify-start w-full px-6 mb-7">
    <BackArrow class="cursor-pointer block" @click="goBack" />
  </header>
  <section class="flex flex-col bg-inherit items-center justify-start w-70 gap-7">
    <img class="h-60 w-60" :src="logoPath" alt="logo" />

    <div class="flex flex-col items-center justify-center gap-5 w-full">
      <!-- 카카오 로그인 -->
      <button class="w-full relative bg-kakao-100 hover:bg-kakao-200 py-3 rounded-lg" @click="handleKakaoLogin">
        <KakaoLogo color="black" class="block absolute left-8 top-1/2 -translate-y-1/2">
        </KakaoLogo>
        <span class="block h3">카카오 로그인</span>
      </button>

      <!-- 네이버 로그인 -->
      <button class="w-full relative bg-naver-green-100 hover:bg-naver-green-200 py-3 rounded-lg"
        @click="handleNaverLogin">
        <NaverLogo color="white" class="block absolute left-8 top-1/2 -translate-y-1/2" />
        <span class="text-white h3">네이버 로그인</span>
      </button>

      <!-- 이메일 로그인 폼 -->
      <form @submit.prevent="handleEmailLogin" class="w-full">
        <div class="flex flex-col items-center justify-center gap-3.5 w-full overflow-hidden"
          :class="`${isEmailLogin ? 'h-auto opacity-100' : 'hidden opacity-0'}`">
          <TopLabelInput class="w-full" labelFont="h4" label="이메일" name="email" placeholder="이메일"
            v-model="emailUserInfo.email" />
          <TopLabelInput class="w-full" labelFont="h4" type="password" label="비밀번호" name="password" placeholder="비밀번호"
            v-model="emailUserInfo.password" />
          <div v-if="errorMessage" class="caption text-red-600 self-start mb-2">
            {{ errorMessage }}
          </div>
        </div>
        <div v-if="isEmailLogin" class="h4 mb-2 text-cocoa-600 text-center">
          계정이 없으신가요? <span class="underline cursor-pointer" @click="goSignup">회원가입</span>
        </div>

        <!-- 이메일 로그인 버튼 -->
        <button type="submit" class="w-full relative bg-cocoa-100 hover:bg-cocoa-200 py-3 rounded-lg"
          @click="handleEmailLogin">
          <EmailIcon color="cocoa-600" class="block absolute left-7.5 top-1/2 -translate-y-1/2">
          </EmailIcon>
          <span class="text-cocoa-600 h3">이메일 로그인</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import BackArrow from '@/components/common/icons/BackArrow.vue';
import { useRoute, useRouter } from 'vue-router';
import NaverLogo from '@/components/common/icons/NaverLogo.vue';
import KakaoLogo from '@/components/common/icons/KakaoLogo.vue';
import EmailIcon from '@/components/common/icons/EmailIcon.vue';
import type { LoginRequest } from '@/types/user';
import { ref, watch } from 'vue';
import logoPath from '@/assets/images/geumjjoki_logo_with_text.png';
import useAuthComposable from '@/composables/useAuth';
import TopLabelInput from '@/components/input/TopLabelInput.vue';
import { validateEmail } from '@/utils/formatters';
const useAuth = useAuthComposable();
const errorMessage = ref<string>('');
const emailUserInfo = ref<LoginRequest>({
  email: '',
  password: ''
});

const handleKakaoLogin = () => {
  useAuth.kakaoLogin();
}

const handleNaverLogin = () => {
  useAuth.naverLogin()
}

const route = useRoute()

const router = useRouter();

const isEmailLogin = ref<boolean>(false);

const handleEmailLogin = async () => {
  if (!isEmailLogin.value) {
    isEmailLogin.value = true;
    return
  }
  console.log(emailUserInfo.value)
  const loginCheck_ = loginCheck()
  if (!loginCheck_) {
    return
  }
  errorMessage.value = ''

  console.log('email login')
  useAuth.emailLogin(emailUserInfo.value)
}

const loginCheck = () => {
  if (route.params.error) {
    errorMessage.value = route.params.error as string
    return false
  }
  // 입력한 이메일 형식 검사
  if (!validateEmail(emailUserInfo.value.email)) {
    errorMessage.value = '이메일을 형식에 맞게 입력해주세요.'
    return false
  }
  // 입력한 비밀번호 검사
  if (!emailUserInfo.value.password) {
    errorMessage.value = '비밀번호를 입력해주세요.'
    return false
  }
  errorMessage.value = ''
  return true
}

watch(route, () => {
  if (route.params.error) {
    errorMessage.value = route.params.error as string
  }
})

watch(emailUserInfo.value, () => {
  loginCheck()
})

const goBack = () => {
  router.back()
};

const goSignup = () => {
  router.push('/auth/signuptest')
};
</script>

<style scoped></style>
