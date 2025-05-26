<template>
  <main class="px-5 w-full py-16">
    <!-- 뒤로가기 버튼 + 타이틀 -->
    <header class="w-full flex justify-center items-center mb-5 relative">
      <back-icon @click="goBack" color="black" class="absolute top-1/2 -translate-y-1/2 left-0" />
      <span class="h3">나의 챌린지</span>
    </header>

    <section class="px-5">
      <!-- 필터 버튼: 전체 / 성공 / 실패 -->
      <nav class="flex gap-4 h3 fw-black">
        <button v-for="menu in challengeNavMenus" :key="menu.title"
          :class="menu.isActive ? 'text-brown-600' : 'text-gray-600'" class="w-12 text-center cursor-pointer"
          @click="filteredChallengeData(menu)">
          {{ menu.title }}
        </button>
      </nav>

      <!-- 챌린지 수 -->
      <div class="w-full flex justify-end h4 fw-black text-gray-600 pr-2.5 mb-3.5">
        <span class="block w-15 text-center">총 {{ filteredChallenges.length }}개</span>
      </div>

      <!-- 챌린지 목록 -->
      <div class="h4 text-cocoa-600 flex flex-col gap-6 pb-20 min-h-[700px] scrollbar-hide overflow-y-scroll">
        <div v-for="data in filteredChallenges" :key="data.user_challenge_id"
          class="flex justify-between border-b-2 border-dashed border-gray-600 pb-1">
          <!-- 왼쪽 아이콘 + 카테고리명 -->
          <div class="flex flex-col items-center gap-2">
            <div class="w-15 h-15 bg-gold-100 rounded-full"></div>
            <div class="h4 fw-black">{{ data.category_name || '카테고리명' }}</div>
          </div>
          <!-- 가운데: 제목 / 포인트 / 기간 -->
          <div class="flex flex-col gap-1 justify-center">
            <div class="h4">{{ data.challenge.title.replace(re_text, '') }}</div>
            <div class="caption fw-bold text-gray-600">{{ data.challenge.point }}P</div>
            <div class="caption fw-bold text-gray-600">
              {{ formatDate(data.start_date) }} - {{ formatDate(data.end_date) }}
            </div>
          </div>
          <!-- 상태 뱃지 -->
          <div class="w-20 flex items-center justify-center py-1 px-2 rounded-full h-fit my-auto"
            :class="data.status === '성공' ? 'bg-minty-400' : 'bg-gray-400'">
            <div :class="data.status === '성공' ? 'text-white' : 'text-black'">
              {{ data.status }}
            </div>
          </div>
        </div>

        <!-- test -->
        <div v-for="data in 10" :key="data"
          class="flex justify-between border-b-2 border-dashed border-gray-600 pb-1">
          <!-- 왼쪽 아이콘 + 카테고리명 -->
          <div class="flex flex-col items-center gap-2">
            <div class="w-15 h-15 bg-gold-100 rounded-full"></div>
            <div class="h4 fw-black">{{ data || '카테고리명' }}</div>
          </div>
          <!-- 가운데: 제목 / 포인트 / 기간 -->
          <div class="flex flex-col gap-1 justify-center">
            <div class="h4">{{ data }}</div>
            <div class="caption fw-bold text-gray-600">{{ data }}P</div>
            <div class="caption fw-bold text-gray-600">
              {{ data }}
            </div>
          </div>
          <!-- 상태 뱃지 -->
        </div>

      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import useChallengesComposable from '@/composables/useChallenges'
import BackIcon from '@/components/common/icons/BackIcon.vue'

const re_text = ref(/^\[[가-힣·]+\]/)

const {
  personalChallenges,
  fetchPersonalChallenges
} = useChallengesComposable()

const router = useRouter()

const challengeNavMenus = ref([
  { title: '전체', isActive: true },
  { title: '성공', isActive: false },
  { title: '실패', isActive: false },
])

onMounted(async () => {
  await fetchPersonalChallenges()
})

const filteredChallenges = computed(() => {
  const active = challengeNavMenus.value.find(m => m.isActive)?.title
  if (active === '성공' || active === '실패') {
    return personalChallenges.value.filter(c => c.status === active)
  }
  return personalChallenges.value
})

const filteredChallengeData = (menu: { title: string }) => {
  challengeNavMenus.value.forEach(m => {
    m.isActive = m.title === menu.title
  })
}

const formatDate = (iso?: string): string => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '-'
  const yy = d.getFullYear().toString().slice(2)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yy}.${mm}.${dd}`
}

const goBack = () => router.back()
const goDetail = (id: number, status: string) => {
  if (status === '도전중') {
    router.push({ name: 'challenge_progress', params: { id } })
  } else {
    router.push({ name: 'challenge_detail', params: { id } })
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
