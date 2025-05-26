<template>
  <div class="fixed inset-0 z-20 bg-gray-600/60" @click.self="$emit('close')"></div>
  <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-gray-200 z-30 rounded-t-2xl">

    <div class="w-full px-11 my-13 flex flex-col gap-5">
      <div class="w-full flex items-center justify-between">
        <div class="flex gap-4">
          <WriteIcon />
          <h3>수정</h3>
        </div>
        <RightArrow class="cursor-pointer" width="16" height="16" @click="goUpdate_article(props.articleId)" />
      </div>
      <div class="w-full flex items-center justify-between">
        <div class="flex gap-4">
          <TrashIcon />
          <h3>삭제</h3>
        </div>
        <RightArrow width="16" height="16" class="cursor-pointer" @click="handleDeleteComment" />
      </div>
    </div>
  </div>
</template>

<script setup>
import WriteIcon from '@/components/common/icons/WriteIcon.vue';
import TrashIcon from '@/components/common/icons/TrashIcon.vue';
import RightArrow from '../common/icons/RightArrow.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useArticleComposable from '@/composables/useArticle'

const useArticle = useArticleComposable()
const router = useRouter()
const props = defineProps({
  articleId: Number,
  commentId: Number,
})
const emit = defineEmits(['close', 'delete'])
// 게시글 수정페이지로 이동
const goUpdate_article = (articleId) => {
  router.push({ name: 'update_article', params: { id: articleId } })
};

// , query: { title: article.title, content: article.content, id: article.id });
const handleDeleteComment = async () => {
  const isConfirmed = confirm('정말 삭제하시겠습니까?')
  if (isConfirmed) {
    // 삭제 요청
    emit('delete', props.articleId, props.commentId)
  }
}





</script>

<style scoped></style>
