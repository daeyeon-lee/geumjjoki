<template>
  <!-- 제목부분 -->
  <div class="relative flex items-center justify-center w-full mt-16">
    <LeftArrow @click="goHome2" class="absolute top-1/2 -translate-y-1/2 left-10 cursor-pointer" />
    <h3 class="h3 font-bold"> 비밀번호 변경 </h3>
  </div>
  <!-- 안내문구  -->
  <div class="mt-14 flex-col items-center flex justify-center">
    <p class="p font-bold">영문, 숫자 ,특수문자 2가지 이상</p>
    <p class="p font-bold">조합하여 10~20자리로 입력해주세요</p>
  </div>

  <!-- 비밀번호 변경 form -->
  <form class="w-full mt-4 flex flex-col gap-4 items-center" @submit.prevent="handleChangePassword">
    <div>
      <input type="password" id="oldPassword"
        class=" px-4 py-3 w-89 h-12 bg-gray-100 border border-gray-400 text-gray-600 p rounded-xl"
        placeholder="기존 비밀번호 입력"
        v-model="oldPassword"
        required />
    </div>
    <div>
      <input type="password" id="newPassword"
        class=" px-4 py-3 w-89 h-12 bg-gray-100 border border-gray-400 text-gray-600 p rounded-xl"
        placeholder="비밀번호 입력"
        v-model="newPassword"
        required />
    </div>
    <div>
      <input type="password" id="newPasswordConfirm"
        class=" px-4 py-3 w-89 h-12 bg-gray-100 border border-gray-400 text-gray-600 p rounded-xl"
        placeholder="비밀번호 다시 입력"
        v-model="newPasswordConfirm"
        required />
    </div>
    <div>
      <button type="submit" class = "w-89 h-12 bg-gold-200 p rounded-xl h3 cursor-pointer"> 확인 </button>
    </div>
  </form>



</template>

<script setup lang="ts">
import LeftArrow from '@/components/common/icons/LeftArrow.vue';
import { useRouter } from 'vue-router'
import useUserComposable from '@/composables/useUser';
import type { UserChangePassword } from '@/types/user';
import { ref } from 'vue';
const router = useRouter()
const goHome2 = () => {
  router.push({ name: 'home2' })
}

const useUser = useUserComposable()
const oldPassword = ref<string>('')
const newPassword = ref<string>('')
const newPasswordConfirm = ref<string>('')

const handleChangePassword = async () => {
  const reqeust: UserChangePassword = {
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
    newPasswordConfirm: newPasswordConfirm.value,
  }
  if (newPassword.value !== newPasswordConfirm.value) {
    alert('비밀번호가 일치하지 않습니다.')
    newPasswordConfirm.value = ''
    return
  } else {
    await useUser.changeUserPassword(reqeust)
    router.push({ name: 'home2' })
  }
}
</script>

<style scoped></style>
