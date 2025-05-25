<template>
    <div class="relative flex items-center gap-11 w-full mt-16 ms-10">
        <LeftArrow @click="goArticle1" class="cursor-pointer" />
        <form class="">
            <div class="relative items-center">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 ">
                    <SearchIcon width=12 height=12 />
                </div>
                <input type="search" id="default-search" class="w-65 h-8 ps-10 pe-3 h4 text-gray-600 bg-gray-300 rounded-3xl"
                    placeholder="검색어를 입력해주세요" />
            </div>
        </form>
        <ThreeDotsIcon @click="goOptionModal" class="absolute top-1/2 -translate-1/2 right-3 cursor-pointer" />
    </div>
    <h4 class="h4 mx-12 mt-12 text-gray-600 text-center">게시글의 제목, 작성자, 내용을 검색어로 입력하면 관련 게시글을 검색할 수 있습니다.</h4>
    <div>

    </div>
</template>

<script setup>
import LeftArrow from '@/components/common/icons/LeftArrow.vue';
import SearchIcon from '@/components/common/icons/SearchIcon.vue';
import CloseIcon from '@/components/common/icons/CloseIcon.vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const goArticle1 = () => {
    router.push({ name: 'article' })
}
</script>

<style scoped></style>
