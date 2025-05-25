<template>
  <header class="relative w-full h-12 flex items-center px-6 mb-7">
    <!-- 뒤로가기 아이콘: 왼쪽 정렬 -->
    <BackIcon color="black" class="absolute left-6 top-1/2 -translate-y-1/2 cursor-pointer" @click="goBack" />

    <!-- 가운데 제목 -->
    <h3 class="h3 text-cocoa-600 mx-auto">회원가입</h3>
  </header>


  <!-- 아이디부터 완료까지 감싸는 부분 -->
  <form class='w-70.5 relative pb-46.5' @submit.prevent="handleSignup">
    <!-- 이름 부분 -->
    <div class="pb-2">
      <h4 class="h4 pb-2">이름</h4>

      <input type="text" placeholder="이름 입력" v-model="signupForm.name"
        class="w-full ps-4 py-3 mb-2 rounded-xl border border-gray-400 placeholder-gray-600 text-xs font-bold bg-white" />
    </div>
    <div class="pb-2">
      <h4 class="h4 pb-2">이메일</h4>

      <!-- 입력창 + 중복확인 버튼 감싸는 부분-->
      <div class="relative w-full">
        <input type="email" placeholder="example@example.com" v-model="signupForm.email"
          class="w-full pe-24 ps-4 py-3 rounded-xl border border-gray-400 placeholder-gray-600 text-xs font-bold bg-white" />

        <!-- 중복확인 버튼 -->
        <button
          type="button"
          @click="checkDuplicateEmail"
          class="w-21.5 h-5 py-0.5 absolute top-1/2 right-2 -translate-y-1/2 px-3 bg-cocoa-100 text-xs rounded-xl">
          중복확인
        </button>
      </div>

      <!-- 에러 메시지 -->
      <p v-if="errorMessages.isEmailError" class="pt-2 text-red-600  text-xs font-bold">{{ errorMessages.emailError }}</p>
    </div>

    <!-- 비밀번호 부분 -->
    <div class="pb-2">
      <h4 class="h4 pb-2">비밀번호</h4>
      <input type="password" placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" v-model="signupForm.password"
        class="w-full ps-4 py-3 rounded-xl border border-gray-400 placeholder-gray-600 text-xs font-bold bg-white" />
      <p v-if="errorMessages.isPasswordError" class="pt-2 text-red-600 text-xs font-bold">{{ errorMessages.passwordError }}</p>
    </div>

    <div class="pb-2">
      <h4 class="h4 pb-2">비밀번호 확인</h4>
      <input type="password" placeholder="비밀번호 재입력" v-model="signupForm.passwordConfirm"
        class="w-full ps-4 py-3 rounded-xl border border-gray-400 placeholder-gray-600 text-xs font-bold bg-white" />
      <p v-if="errorMessages.isPasswordConfirmError" class="pt-2 text-red-600 text-xs font-bold">{{ errorMessages.passwordConfirmError }}</p>
    </div>


    <!-- 생년월일 부분 -->
    <div class="pb-12">
      <h4 class="h4 pb-2">닉네임</h4>
      <input type="text" placeholder="닉네임 입력" v-model="signupForm.nickname"
        class="w-full ps-4 py-3 rounded-xl border border-gray-400 placeholder-gray-600 text-xs font-bold bg-white" />
    </div>

    <!-- 완료 버튼 -->
    <div>
      <button type="submit" class="bg-cocoa-100 text-cocoa-600 rounded-lg w-72 h-10.5">
        <h3 class="h3 text-cocoa-500">완료</h3>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import BackIcon from '@/components/common/icons/BackIcon.vue'
import { useRouter } from 'vue-router';
import type { SignupRequest } from '@/types/user';
import { ref, watch } from 'vue';
import { validateEmail, validatePassword } from '@/utils/formatters';
import useAuthComposable from '@/composables/useAuth';

const router = useRouter();
const useAuth = useAuthComposable()

const signupForm = ref<SignupRequest>({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
})

const errorMessages = ref({
  emailError: '',
  isEmailError: false,
  passwordError: '',
  isPasswordError: false,
  passwordConfirmError: '',
  isPasswordConfirmError: false,
})

const isDuplicateEmail = ref(false)

const valueCheck = () => {
  if (signupForm.value.email) {
    if (!validateEmail(signupForm.value.email)) {
      errorMessages.value.isEmailError = true
      isDuplicateEmail.value = false
      errorMessages.value.emailError = '올바른 이메일 형식이 아닙니다.'
    } else if (!isDuplicateEmail.value) {
      errorMessages.value.isEmailError = true
      errorMessages.value.emailError = '이메일 중복확인를 해주시기 바랍니다.'
    } else {
      errorMessages.value.isEmailError = false
      errorMessages.value.emailError = ''
    }
  } else {
    errorMessages.value.isEmailError = false
    errorMessages.value.emailError = ''
    isDuplicateEmail.value = false
  }
  if (signupForm.value.password) {
    if (!validatePassword(signupForm.value.password)) {
      errorMessages.value.isPasswordError = true
      errorMessages.value.passwordError = '올바른 비밀번호 형식이 아닙니다.'
    } else {
      errorMessages.value.isPasswordError = false
      errorMessages.value.passwordError = ''
    }
  } else {
    errorMessages.value.isPasswordError = false
    errorMessages.value.passwordError = ''
  }

  if (signupForm.value.passwordConfirm) {
    if (signupForm.value.password !== signupForm.value.passwordConfirm) {
      errorMessages.value.isPasswordConfirmError = true
      errorMessages.value.passwordConfirmError = '비밀번호가 일치하지 않습니다.'
    } else {
      errorMessages.value.isPasswordConfirmError = false
      errorMessages.value.passwordConfirmError = ''
    }
  } else {
    errorMessages.value.isPasswordConfirmError = false
    errorMessages.value.passwordConfirmError = ''
  }
}

watch(signupForm.value, () => {
  valueCheck()
})


const checkDuplicateEmail = async () => {
  const isDuplicate = await useAuth.emailDuplicationCheck(signupForm.value.email)
  isDuplicateEmail.value = !isDuplicate
  valueCheck()
  if (isDuplicate) {
    errorMessages.value.isEmailError = true
    errorMessages.value.emailError = '이미 존재하는 이메일입니다.'
  }
}

const handleSignup = async () => {
  if (
    errorMessages.value.isEmailError
    || errorMessages.value.isPasswordError
    || errorMessages.value.isPasswordConfirmError
    || !isDuplicateEmail.value
  ) {
    return
  }
  const response = await useAuth.emailSignup(signupForm.value)
  if (response && response.error) {
    alert(response.error)
  }
}

const goBack = () => {
  router.back()
};



</script>

<style scoped></style>
