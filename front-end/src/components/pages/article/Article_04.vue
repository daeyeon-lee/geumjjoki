<template>
    <!-- 상단 바 -->
    <div class="relative flex items-center justify-center w-full mt-16">
        <BackIcon @click="goDetail_article(articleId)" color = 'cocoa-600'class="absolute top-1/2 -translate-y-1/2 left-10 cursor-pointer" />
        <h3 class="h3 font-bold">게시글 수정</h3>
        <button @click="handleUpdateArticle"
            class="w-16 h-7 px-3 rounded-sm h4 text-cocoa-600 bg-gold-200 hover:bg-gold-400 absolute top-1/2 -translate-1/2 right-5 cursor-pointer">수정</button>
    </div>
    <!-- 제목, 내용 form -->
    <form class="w-full mt-15 flex flex-col gap-5 items-center">
        <!-- 이름 -->
        <div class="">
            <input type="text" id="title" class="bg-gray-300  text-gray-600 p rounded-sm block w-87 ps-4 py-2"
                placeholder="제목을 입력해주세요" v-model="title" />


            <textarea id="content"
                class="bg-gray-300  text-gray-600 p rounded-sm block w-87 h-[630px] p-2 mt-7 ps-4 pt-2 resize-none "
                placeholder="다양한 주제로 이야기를 나눠보세요" v-model="content"></textarea>
        </div>
    </form>
    <div class="w-full h-px bg-gray-600 my-4"></div>
    <!-- 사진, 파일 업로드 -->
    <form class="w-full ms-12 flex gap-1">
        <!-- 숨겨진 파일 입력창 -->
        <input id="upload" type="file" accept="image/*" class="hidden" />
        <!-- 아이콘 클릭 시 파일 선택창 열림 -->
        <label for="upload" class="cursor-pointer flex">
            <AttachPictureIcon class="w-6 h-6 text-gray-700" />
            <AttachFileIcon class="w-6 h-6 text-gray-700" />
        </label>
    </form>

</template>
<script setup lang="ts">
// import CloseIcon from '@/components/common/icons/CloseIcon.vue';
import BackIcon from '@/components/common/icons/BackIcon.vue';
import AttachFileIcon from '@/components/common/icons/AttachFileIcon.vue';
import AttachPictureIcon from '@/components/common/icons/AttachPictureIcon.vue';
import { useRouter, useRoute  } from 'vue-router';
import { ref, onMounted } from 'vue';
import useArticleComposable  from '@/composables/useArticle'
const router = useRouter()
const title = ref<string>('')
const content = ref<string>('')
const useArticle = useArticleComposable()
const route = useRoute()
const articleId = Number(route.params.id)
// console.log(articleId)
onMounted(async () => {
  const article = await useArticle.getArticleDetail(articleId)
  title.value = article.title ?? ''
  content.value = article.content ?? ''
})


const goDetail_article = (articleId: number) =>
{
  // console.log(articleId)
  router.push({ name: 'detail_article', params: { id: articleId } })
}


const handleUpdateArticle = async () => {
    // console.log('articleId', articleId)
    const request = {
        title: title.value,
        content: content.value,
    }
    // console.log('request',request)
    await useArticle.updateArticle(articleId, request)
    router.push({ name: 'detail_article', params: { id: articleId } })
}


</script>

<style scoped>

</style>