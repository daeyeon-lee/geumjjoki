<template>
  <div class="h-[52px] w-full"></div>
  <div class="h-[62px] w-full bg-icy-blue-500 flex items-center p-4 gap-4">
    <div class="h-6 w-6 bg-black"></div>
    <div class="text-2xl">회원가입</div>
  </div>
  <div id="logo" class="flex justify-center items-center w-[290px] h-[150px] bg-white rounded-4xl mx-auto mt-10">
    logo
  </div>

  <div class="flex flex-col gap-4 p-4 justify-center items-center">
    <!-- 회원가입 폼 -->
    <form action="http://localhost:8000/api/v1/auth/email-signup/" method="POST" class="w-[290px] mb-2"
      @submit="validateForm">
      <div class="mb-4">
        <input name="email" v-model="email" type="email" placeholder="이메일" class="w-full p-3 border rounded-lg mb-2"
          required />
        <input name="password" v-model="password" type="password" placeholder="비밀번호"
          class="w-full p-3 border rounded-lg mb-2" required />
        <input v-model="passwordConfirm" type="password" placeholder="비밀번호 확인" class="w-full p-3 border rounded-lg"
          required />
        <!-- username -->
        <input name="username" v-model="username" type="text" placeholder="이름"
          class="w-full p-3 border rounded-lg mb-2" />
      </div>
      <button type="submit" class="w-full p-3 bg-icy-blue-500 text-white rounded-lg mb-2" :disabled="!isFormValid">
        회원가입
      </button>
    </form>

    <div class="flex w-[290px] justify-between text-sm">
      <span>이미 계정이 있으신가요? <router-link to="/auth/login" class="text-icy-blue-500 font-bold">로그인</router-link></span>
    </div>

    <p v-if="errorMessage" class="error-message mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const errorMessage = ref(null);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const username = ref('');

const isFormValid = computed(() => {
  return email.value &&
    username.value &&
    password.value &&
    passwordConfirm.value &&
    password.value === passwordConfirm.value;
});

const validateForm = (event) => {
  errorMessage.value = null;

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.';
    event.preventDefault();
    return false;
  }

  return true;
};
</script>

<style>
.error-message {
  color: red;
}
</style>
