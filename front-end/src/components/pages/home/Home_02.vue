<template>
  <!-- Top bar -->
  <section class="w-full">
    <div class="flex gap-5 mt-15 items-center justify-end">
      <CloseIcon class="me-11 cursor-pointer" @click="goHome1" />
    </div>
  </section>

  <section class="w-fit max-w-[90%] mx-auto">
    <!-- 프로필 부분 -->
    <div class="flex justify-between items-center mt-10">
      <div class="flex gap-3 items-center">
        <ProfileIcon />
        <div>
          <h3 class="h3 fw-black">{{ userData?.nickname ?? "사용자" }}님은</h3>
          <h4 class="h4">
            <span :class="`h4 fw-black text-${gradeColor}`">{{ grade }}</span> 등급입니다.
          </h4>
        </div>
      </div>

      <button
        @click="goChangeProfilePicuter"
        class="cursor-pointer w-30 h-7 border-gray-600 border-solid border-2 rounded-2xl h4 text-center"
      >
        프로필 변경
      </button>
    </div>

    <!-- 경험치 progress bar -->
    <div class="w-full h-max-110 mt-10">
      <!-- 전체 막대기 -->
      <div class="relative w-full bg-gray-300 rounded-full h-4 mb-1">
        <!-- 누적 경험치 -->
        <div
          :class="`bg-${gradeColor} h-4 rounded-full relative`"
          :style="`width: ${expPercent}%`"
          id="progress-bar"
        >
          <!-- <div
          class="bg-gray-600 h-4 rounded-full relative"
          :style="`width: 40%`"
          id="progress-bar"
        > -->
          <!-- 말풍선 -->
          <!-- left 값은 누적 경험치 바의 width값과 동일하게 해야 함 -->
          <div class="absolute right-0 translate-x-1/2 -top-10">
            <div
              :class="`bg-${gradeColor} text-gray-100 h4 px-3 py-1 rounded-md relative`"
            >
              {{ userData?.user_profile?.exp ?? 0 }}
              <div
                :class="`w-3 h-3 bg-${gradeColor} rotate-45 left-1/2 absolute -translate-x-1/2 -bottom-1.5`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 하단 텍스트 -->
      <div class="flex justify-between text-caption fw-bold mt-1">
        <span class="caption fw-bold">0</span>
        <span class="caption fw-bold">{{ nextGradeExp }}</span>
      </div>
    </div>

    <!-- 경험치 안내창 -->
    <div
      v-if="grade !== 'Diamond'"
      class="w-full h-11 bg-gray-300 rounded-xl mb-8 mt-3 flex items-center justify-center"
    >
      <h4 class="h4 fw-black text-center" :class="`text-${nextGradeColor}`">
        {{ nextGrade }} 등급 <span class="h4 text-cocoa-600">달성까지</span>
        {{ nextGradeExp - (userData?.user_profile?.exp ?? 0) }} 경험치 남음
      </h4>
    </div>
    <div
      v-else
      class="w-full h-11 bg-gray-300 rounded-xl mb-8 mt-3 flex items-center justify-center"
    >
      <h4 class="h4 fw-black text-center" :class="`text-${nextGradeColor}`">
        최고등급 달성을 축하드립니다!
      </h4>
    </div>
  </section>

  <section class="w-full px-8">
    <!-- 전체 메뉴 -->
    <h4 class="h4 fw-black mb-6 text-gray-600">전체 메뉴</h4>
    <div>
      <div @click="goExpense1" class="flex gap-4 items-center mb-7">
        <ExpenseIcon color="cocoa-600" />
        <p class="p1 cursor-pointer">소비 내역 조회</p>
      </div>
      <div @click="goReward1" class="flex gap-4 items-center mb-7">
        <RewardIcon />
        <p class="p1 cursor-pointer">리워드 교환</p>
      </div>
      <div @click="goChallenge1" class="flex gap-4 items-center mb-7">
        <ChallengeIcon color="cocoa-600" />
        <p class="p1 cursor-pointer">챌린지 도전</p>
      </div>
      <div @click="goArticle1" class="flex gap-4 items-center mb-7">
        <ArticleIcon color="cocoa-600" />
        <p class="p1 cursor-pointer">게시글 작성</p>
      </div>
    </div>

    <!-- 마이페이지 -->
    <h4 class="h4 fw-black mb-6 text-gray-600 mt-10">마이페이지</h4>
    <div>
      <div class="flex gap-4 items-center mb-7" @click="goHome3">
        <UserInfoUpdateIcon />
        <p class="p1 cursor-pointer">회원정보 확인</p>
      </div>
      <div class="flex gap-4 items-center mb-7" @click="goHome4">
        <PasswordChangeIcon />
        <p class="p1 cursor-pointer">비밀번호 변경</p>
      </div>
    </div>
  </section>

  <ProfileChangeModal v-if="showModal" @close="showModal = false" />
</template>

<script setup lang="ts">
import ChallengeIcon from "@/components/common/icons/ChallengeIcon.vue";
import ExpenseIcon from "@/components/common/icons/ExpenseIcon.vue";
import ProfileIcon from "@/components/common/icons/ProfileIcon.vue";
import ArticleIcon from "@/components/common/icons/ArticleIcon.vue";
import RewardIcon from "@/components/common/icons/RewardIcon.vue";
import UserInfoUpdateIcon from "@/components/common/icons/UserInfoUpdateIcon.vue";
import PasswordChangeIcon from "@/components/common/icons/PasswordChangeIcon.vue";
import CloseIcon from "@/components/common/icons/CloseIcon.vue";
import ProfileChangeModal from "@/components/modal/ProfileChangeModal.vue";

import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/userStore";

const showModal = ref(false);
const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const userData = computed(() => user.value);

onMounted(() => {
  if (!user.value) userStore.fetchUser();
});

const goHome1 = () => router.push({ name: "home" });
const goHome3 = () => router.push({ name: "home3" });
const goHome4 = () => router.push({ name: "home4" });
const goChangeProfilePicuter = () => (showModal.value = true);
const goExpense1 = () => router.push({ name: "expense" });
const goReward1 = () => router.push({ name: "reward" });
const goChallenge1 = () => router.push({ name: "challenge" });
const goArticle1 = () => router.push({ name: "article" });

const gradeColor = computed(() => {
  if (grade.value === "Bronze") return "brown-600";
  if (grade.value === "Silver") return "gray-600";
  if (grade.value === "Gold") return "gold-400";
  if (grade.value === "Platinum") return "minty-400";
  return "diamond-600";
});

const nextGradeColor = computed(() => {
  if (grade.value === "Bronze") return "gray-600";
  if (grade.value === "Silver") return "gold-400";
  if (grade.value === "Gold") return "minty-400";
  if (grade.value === "Platinum") return "diamond-600";
  return "red-100";
});

const grade = computed(() => {
  if (userData.value?.user_profile?.level === 1) return "Bronze"; // brown-600
  if (userData.value?.user_profile?.level === 2) return "Silver"; // gray-600
  if (userData.value?.user_profile?.level === 3) return "Gold"; // gold-400
  if (userData.value?.user_profile?.level === 4) return "Platinum"; // minty-400
  return "Diamond"; // diamond-600
});

const expPercent = computed(() => {
  if (grade.value === "Bronze")
    return Math.floor(userData.value?.user_profile?.exp / 100);
  if (grade.value === "Silver")
    return Math.floor((userData.value?.user_profile?.exp) / 300);
  if (grade.value === "Gold")
    return Math.floor((userData.value?.user_profile?.exp) / 1000);
  if (grade.value === "Platinum")
    return Math.floor((userData.value?.user_profile?.exp) / 3000);
  return Math.min(Math.floor((userData.value?.user_profile?.exp) / 10000), 100);
});

const nextGradeExp = computed(() => {
  if (grade.value === "Bronze") return 10000;
  if (grade.value === "Silver") return 30000;
  if (grade.value === "Gold") return 100000;
  if (grade.value === "Platinum") return 300000;
  return 1000000;
});

const nextGrade = computed(() => {
  if (grade.value === "Bronze") return "Silver";
  if (grade.value === "Silver") return "Gold";
  if (grade.value === "Gold") return "Platinum";
  if (grade.value === "Platinum") return "Diamond";
  return "Master";
});

console.log(expPercent.value);
</script>

<style scoped></style>
