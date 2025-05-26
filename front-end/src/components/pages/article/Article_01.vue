<template>
  <!-- 상단 바 -->
  <div class="sticky top-0 flex items-center justify-center w-full pt-16 bg-gray-200">
    <div class="relative w-full flex items-center justify-center">
      <LeftArrow class="absolute top-1/2 -translate-y-1/2 left-10 cursor-pointer" />
      <h3 class="h3 font-bold">게시글</h3>
      <SearchIcon @click="goArticle1_2" class="absolute top-1/2 -translate-1/2 right-10 cursor-pointer" />
    </div>
  </div>
  <div class="w-full ps-6 pt-7 flex gap-4">
    <h3 v-for="order in orderList" :key="order.orderBy" class="h3 fw-black cursor-pointer"
      :class="order.isSelected ? 'text-brown-600' : 'text-gray-600'" @click="filterRecent(order)">{{ order.orderBy }}
    </h3>
    <!-- <h3 @click = "filterRecent('최신순')" class="h3 fw-black cursor-pointer">최신글</h3>
      <h3 @click = "filterRecent('인기순')" class="h3 fw-black cursor-pointer">인기글</h3> -->
  </div>

  <!-- 게시글 -->
  <div class="mt-9 w-full max-h-full overflow-y-auto pb-6 scrollbar-hide">
    <div v-for="article in articles" :key="article.article_id" @click="goDetail_article(article.article_id)"
      class="first-border-top ps-6 pe-4 w-full border-b border-gray-600 cursor-pointer">
      <div class="flex items-center justify-between my-5">
        <div>
          <h3 class="h3">{{ article.title }}</h3>
          <h6 class="h6 w-50"> {{ article.content_preview }}</h6>
        </div>
      </div>
      <div class="w-full flex gap-2 items-center my-4">
        <div class="flex gap-1 items-center">
          <LikeIcon color='red-600' />
          <h5 class="h5">{{ article.likes_count }}</h5>
        </div>
        <div class="flex gap-1 items-center">
          <CommentIcon color='minty-500' />
          <h5 class="h5">{{ article.total_comments }}</h5>
        </div>
        <p class="caption "> | </p>
        <p class="caption "> {{ article.time_ago }} </p>
        <p class="caption "> | </p>
        <p class="caption "> {{ article.author }} </p>
      </div>
    </div>
    <div v-if="isLoading" class="flex justify-center items-center">
      <h3 class="h3">불러오는 중</h3>
    </div>
  </div>

  <WriteArticleIcon @click="goArticle3" class="fixed bottom-20 right-2 cursor-pointer" />
</template>

<script setup lang="ts">

import WriteArticleIcon from '@/components/common/icons/WriteArticleIcon.vue'
import LeftArrow from '@/components/common/icons/LeftArrow.vue';
import SearchIcon from '@/components/common/icons/SearchIcon.vue';
import CommentIcon from '@/components/common/icons/CommentIcon.vue';
import LikeIcon from '@/components/common/icons/LikeIcon.vue';
import ScrapIcon from '@/components/common/icons/ScrapIcon.vue';

import type { ArticleList } from '@/types/article'
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import useArticleComposable from '@/composables/useArticle';
import { computed } from 'vue';
const router = useRouter()
const articles = ref<ArticleList[]>([])
const useArticle = useArticleComposable()

const currentPage = ref<number>(0)
const totalPage = ref<number>(0)
const isLoading = ref<boolean>(false)

onMounted(async () => {
  const data = await useArticle.getArticleList({})
  articles.value = data.articles
  currentPage.value = data.current_page
  totalPage.value = data.total_pages
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
})

const goArticle3 = () => {
  router.push({ name: 'create_article' })
}
const goArticle1_2 = () => {
  router.push({ name: 'article_search' })
}

const goDetail_article = (articleId: number) => {
  router.push({ name: 'detail_article', params: { id: articleId } })
}

interface Order {
  orderBy: string
  isSelected: boolean
}

// 무한 스크롤

const scrollY = ref(window.scrollY)

watch(() => scrollY.value, async () => {
  if (isLoading.value) return
  if (scrollY.value + window.innerHeight >= document.documentElement.scrollHeight - 100) {
    // console.log('scrollY', scrollY.value + window.innerHeight)
    // console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight)
    if (currentPage.value < totalPage.value) {
      isLoading.value = true
      currentPage.value++
      const data = await useArticle.getArticleList({ page: currentPage.value })
      articles.value = [...articles.value, ...data.articles]
      setTimeout(() => {
        isLoading.value = false
      }, 1000)
    }
  }
})

const orderList = ref<Order[]>([
  {
    orderBy: '최신순',
    isSelected: true
  },
  {
    orderBy: '인기순',
    isSelected: false
  },
])

const filterRecent = (order: Order) => {
  orderList.value.forEach((order) => {
    order.isSelected = false
  })
  if (order.orderBy === '최신순') {
    articles.value.sort((a, b) => {
      // const a_time = new Date(a.created_at)
      // const b_time = new Date(b.created_at)
      const a_time: Date = new Date(a.created_at ?? '')
      const b_time: Date = new Date(b.created_at ?? '')
      if (a_time > b_time) {
        return -1
      } else if (a_time < b_time) {
        return 1
      }
      return 0
    })
  }
  if (order.orderBy === '인기순') {
    articles.value.sort((a, b) => {
      if (a.likes_count > b.likes_count) {
        return -1
      } else if (a.likes_count < b.likes_count) {
        return 1
      }
      return 0
    })
  }
  order.isSelected = true
}

</script>

<style scoped lang="postcss">
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.first-border-top:first-child {
  @apply border-t
}
</style>
