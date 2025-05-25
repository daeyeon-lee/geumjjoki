<template>
  <!-- 제목부분 -->
  <div class="relative flex items-center justify-center w-full mt-16">
    <LeftArrow @click="goHome2" class="absolute top-1/2 -translate-y-1/2 left-10 cursor-pointer" />
    <h3 class="h3 font-bold"> 회원정보 확인 </h3>
  </div>

  <!-- 로그인 form(disabled) -->
  <form class="w-full mt-23 flex flex-col gap-5 items-center">
    <!-- 이름 -->
    <div class="">
      <label for="name" class="block mb-2 p text-cococa-600">이름</label>
      <input type="text" id="name" class="bg-gray-300 border border-gray-400 text-gray-600 p rounded-sm block w-89 p-2 "
        placeholder="홍길동" disabled />
    </div>
    <!-- 생년월일 -->
    <div class="">
      <label for="birth" class="block mb-2 p text-cococa-600">생년월일</label>
      <input type="text" id="birth"
        class="bg-gray-300 border border-gray-400 text-gray-600 p rounded-sm block w-89 p-2 " placeholder="2000.01.01"
        disabled />
    </div>
    <!-- 이메일 아이디 -->
    <div class="">
      <label for="email" class="block mb-2 p text-cococa-600">이메일</label>
      <input type="email" id="email"
        class="bg-gray-300 border border-gray-400 text-gray-600 p rounded-sm block w-89 p-2 "
        placeholder="abcd1234@naver.com" disabled />
    </div>
  </form>

  <!-- 로그 아웃, 회원 탈퇴 -->
  <div class="w-full mt-9 flex flex-col gap-2 items-center">
    <p class="p text-red-600 font-bold underline cursor-pointer" @click="handleLogout">로그아웃</p>
    <p class="p text-gray-500 font-bold cursor-pointer" @click="handleDeleteUser">회원 탈퇴</p>
  </div>

</template>

<script setup>
import LeftArrow from '@/components/common/icons/LeftArrow.vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import useUserComposable from '@/composables/useUser';

const authStore = useAuthStore()
const router = useRouter()
const useUser = useUserComposable()

const goHome2 = () => {
  router.push({ name: 'home2' })
}

const handleLogout = async () => {
  await authStore.logout()
}

const handleDeleteUser = async () => {
  const confirm = window.confirm('회원 탈퇴 하시겠습니까?')
  if (confirm) {
    await useUser.deleteUser()
    router.push({ name: 'login' })
  }
}
</script>

<style scoped></style>
