<template>
  <div class="fixed inset-0 z-0 bg-gray-600/60" @click.self="closeModal"></div>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-gray-200 z-10 rounded-t-2xl">
    <div class="flex justify-between items-center ms-5 me-10 py-3">
      <h3 class="h3"> 프로필 변경</h3>
      <CloseIcon @click='closeModal' class='cursor-pointer' />
    </div>
    <!-- 프로필 이미지 선택 아이콘 -->
    <div class="flex justify-center items-center">
      <label for="file-upload" class="cursor-pointer">
        <span>
          <SelectProfileIcon />
        </span>
        <input id="file-upload" name="file-upload" type="file" class="sr-only">
      </label>
    </div>
    <div class="w-fit ms-11 mt-4 mb-10">
      <!-- 닉네임 변경 form -->
      <form class="p text-cocoa-600" @submit.prevent="changeNickname">
        <label for="name" class="block mb-2 p text-cococa-600">닉네임</label>
        <input type="text" id="name"
          class="bg-gray-200 border border-gray-600 text-cocoa-600 p rounded-lg block w-89 h-12 p-2 "
          placeholder="홍길동" v-model="nickname" />
        <button type="submit"
          class="cursor-pointer w-89 h-12 rounded-lg block mt-8 bg-gold-200 text-cocoa-600 h3">확인</button>
      </form>
      <!-- 완료 버튼 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/common/icons/CloseIcon.vue';
import SelectProfileIcon from '@/components/common/icons/SelectProfileIcon.vue';
import { useUserStore } from '@/stores/userStore';
import { ref, onMounted } from 'vue'
import useUserComposable from '@/composables/useUser';
import type { UserChangeInfo } from '@/types/user';

const useUser = useUserComposable()
const nickname = ref<string>('')
const profileImage = ref<string>('')

onMounted(async () => {
  const userStore = useUserStore()
  // await userStore.fetchUser()
  // console.log('userStore.user', userStore.user)
  nickname.value = userStore.user?.nickname || ''
  profileImage.value = userStore.user?.profileImage || ''
})

const emit = defineEmits({
  'close': () => {},
})

const closeModal = () => {
  emit('close')
}

const changeNickname = async () => {
  const request: UserChangeInfo = {
    nickname: nickname.value,
    profileImage: profileImage.value,
  }
  await useUser.changeUserInfo(request)
  closeModal()
}

</script>

<style scoped></style>
