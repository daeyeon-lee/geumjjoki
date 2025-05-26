<template>
  <!-- 상단 바 -->
  <div class="sticky top-0 flex items-center justify-center w-full pt-16 bg-gray-200">
    <div class="relative w-full flex items-center justify-center">
      <LeftArrow @click="goArticle1" class="absolute top-1/2 -translate-y-1/2 left-10 cursor-pointer" />
      <h3 class="h3 font-bold">게시글</h3>

      <ThreeDotsIcon :commentId="selectedCommentId" :articleId="selectedArticleId"
        @click="() => goOptionModal(article?.article_id ?? -1)" @delete="handleDeleteArticle(article?.article_id ?? -1)"
        class="absolute top-1/2 -translate-1/2 right-3 cursor-pointer" />
    </div>
  </div>
  <div class="max-w-full px-10 h-fit overflow-y-auto pb-6 scrollbar-hide flex flex-col gap-3">
    <section class="w-full">
      <div class="flex gap-3 mt-6 items-center">
        <!-- <img :src="article.author_profile_image ? article.author_profile_image : '/components/icons/ProfileIcon.vue'" alt="프로필이미지" class="w-13 h-13"> -->
        <!-- 프로필 이미지가 존재할 경우 -->
        <img v-if="article && article.author_profile_image" :src="article.author_profile_image" alt="프로필 이미지"
          class="w-13 h-13 rounded-full" />
        <!-- 없을 경우 대체 아이콘 컴포넌트 -->
        <ProfileIcon v-else class="w-13 h-13 text-gray-400" />
        <div class="flex flex-col">
          <h4 class="h4 fw-black">{{ article?.author }}</h4>
          <p class="caption">{{ article?.time_ago }} | 조회수 {{ article?.views }}</p>
        </div>
      </div>
      <div class="mt-5">
        <h3 class="h3">{{ article?.title }}</h3>
        <h4 class="h4 h-fit mt-2">
          {{ article?.content }}
        </h4>

      </div>
      <!-- 댓글, 좋아요 수 조회 부분 -->
    </section>
    <div class="mt-3 flex  gap-4 justify-center">
      <div @click="article && articleOnIsLiked(article)" class="flex gap-2 items-center  cursor-pointer">
        <LikeIcon :color="article?.is_liked ? 'red-600' : 'gray-600'" />
        <h5 class="h5">좋아요 {{ article?.likes_count }}</h5>
      </div>
      <div @click="focusInput()" class="flex gap-2 items-center cursor-pointer">
        <CommentIcon />
        <h5 class="h5">댓글 {{ comments.length }}</h5>
      </div>

    </div>
    <!-- 하단 댓글 입력창 -->
    <div>
      <form @submit.prevent="handleCreateComment"
        class='max-w-full h-8 my-3 bg-gray-300 rounded-3xl px-4 flex justify-between items-center'>
        <input placeholder="댓글을 남겨보세요" class="caption fw-bold  text-cocoa-600 placeholder-gray-600 w-90" ref="inputRef"
          v-model="commentinput" />
        <button type="submit">
          <SendingIcon class="cursor-pointer" />
        </button>
      </form>
    </div>

    <!-- <div class="w-full mt-8 px-10 h-[450px] overflow-y-auto pb-6 scrollbar-hide flex flex-col gap-3"> -->
    <!-- 댓글 -->
    <section v-for="comment in comments" :key="comment.comment_id">
      <div class="flex justify-between">
        <div class="flex items-center gap-1 mb-1">
          <img v-if="comment.author_profile_image" :src="comment.author_profile_image" alt="프로필 이미지" class="w-5 h-5" />
          <ProfileIcon v-else width=20 height=20 />
          <p class="caption fw-bold"> {{ comment.author }} </p>
        </div>
      </div>
      <div>
        <h5 class=" h5 mb-1">{{ comment.content }}</h5>
        <div class="flex items-center gap-2">
          <h6 class="h6">{{ comment.time_ago }}</h6>
          <div class="flex items-center gap-2">
            <div @click="commentOnIsLiked(comment)" class="flex gap-1 items-center  cursor-pointer">
              <LikeIcon :color="comment.is_liked ? 'red-600' : 'gray-600'" />
              <h5 class="h5">{{ comment.likes_count }}</h5>
            </div>
            <CommentIcon color='minty-500' />
            <h5 class="h5">{{ comment.replies.length }}</h5>
          </div>
          <h5 @click="onIsView(comment)" class="h5 cursor-pointer">답글 쓰기</h5>
          <!-- <h5 @click="handleUpdateComment()" class="h5 cursor-pointer">수정</h5> -->
          <h5 @click="handleDeleteComment(article?.article_id ?? -1, comment.comment_id)" class="h5 cursor-pointer">
            삭제</h5>
        </div>
      </div>
      <!-- 대댓글 -->
      <section v-for="reply in comment.replies" :key="reply.comment_id">
        <div class="flex mt-2">
          <DownRightIcon />
          <div>
            <div class="flex justify-between">
              <div class="flex items-center gap-1 mb-3">
                <!-- <img :src="reply.author_profile_image" alt="프로필이미지" class="w-5 h-5"> -->
                <img v-if="comment.author_profile_image" :src="comment.author_profile_image" alt="프로필 이미지"
                  class="w-5 h-5" />
                <ProfileIcon v-else width=20 height=20 />
                <p class="caption fw-bold"> {{ reply.author }} </p>
              </div>
            </div>
            <h5 class=" h5 mb-1">{{ reply.content }}</h5>
            <div class="flex gap-2">
              <h6 class="h6">{{ comment.time_ago }}</h6>
              <div @click="replyOnIsLiked(reply)" class="flex gap-1 items-center  cursor-pointer">
                <LikeIcon :color="reply.is_liked ? 'red-600' : 'gray-600'" />
                <h5 class="h5">{{ reply.likes_count }}</h5>
              </div>
              <!-- <h5 class="h5 cursor-pointer" @click="onIsView(reply)">수정</h5> -->
              <h5 @click="handleDeleteReply(comment.comment_id, reply.comment_id, comment)" class="h5 cursor-pointer">삭제
              </h5>
            </div>
          </div>
        </div>
        <!-- <div v-if="reply.isView">
          <form @submit.prevent="handleCreatereplies(comment, comment.comment_id)"
            class='w-90 h-8 my-3 bg-gray-300 rounded-3xl px-4 flex justify-between items-center'>
            <input placeholder="수정할 답글을 입력하세요" class="caption fw-bold  text-cocoa-600 placeholder-gray-600 w-90"
              v-model="replyinput" />
            <button type="submit">
              <SendingIcon class="cursor-pointer" />
            </button>
          </form>
        </div> -->

      </section>
      <!-- 대댓글 입력창 -->
      <div v-if="comment.isView">
        <form @submit.prevent="handleCreatereplies(comment, comment.comment_id)"
          class='max-w-full h-8 my-3 bg-gray-300 rounded-3xl px-4 flex justify-between items-center'>
          <input placeholder="대댓글을 남겨보세요" class="caption fw-bold  text-cocoa-600 placeholder-gray-600 w-90"
            v-model="replyinput" />
          <button type="submit">
            <SendingIcon class="cursor-pointer" />
          </button>
        </form>
      </div>
    </section>
  </div>

  <UpdateDeleteOptionModal v-if="showModal" :articleId="selectedArticleId" :commentId="selectedCommentId"
    @close="showModal = false" @delete="handleDelete" />
</template>

<script setup lang="ts">
import SendingIcon from '@/components/common/icons/SendingIcon.vue';
import ProfileIcon from '@/components/common/icons/ProfileIcon.vue';
import DownRightIcon from '@/components/common/icons/DownRightIcon.vue';
import LikeIcon from '@/components/common/icons/LikeIcon.vue';
import CommentIcon from '@/components/common/icons/CommentIcon.vue';
import LeftArrow from '@/components/common/icons/LeftArrow.vue';
// import SearchIcon from '@/components/common/icons/SearchIcon.vue';
import ThreeDotsIcon from '@/components/common/icons/ThreeDotsIcon.vue';
import UpdateDeleteOptionModal from '@/components/modal/UpdateDeleteOptionModal.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useArticleComposable from '@/composables/useArticle';
import type { ArticleDetail, Comment, ParentComment } from '@/types/article';

// const isReplyFormVisible = ref(false)
// focus용 변수
const inputRef = ref<(HTMLInputElement | null)>(null)
const useArticle = useArticleComposable()
const route = useRoute()
const article = ref<ArticleDetail | null>(null)
const comments = ref<ParentComment[]>([])
const replies = ref<Comment[]>([])
const commentinput = ref('')
const replyinput = ref('')
const articleId = Number(route.params.id)
const selectedArticleId = ref<number>(-1)
const selectedCommentId = ref<number>(-1)
const showModal = ref(false)

// 마운트 되기 전, 게시글, 댓글 조회
onMounted(async () => {
  article.value = await useArticle.getArticleDetail(articleId)
  comments.value = await useArticle.getCommentList(articleId)
  comments.value.forEach(comment => {
    comment['isView'] = false
    comment.replies.forEach(reply => {
      reply['isView'] = false
    })
  })
})

// 댓글창 focus
const focusInput = () => {
  inputRef.value?.focus()
}

// 댓글 추가
const handleCreateComment = async () => {
  const request = {
    content: commentinput.value.trim()
  }
  if (request.content === '') {
    alert("댓글 내용을 입력해주세요!")
    commentinput.value = ''
    return
  }
  // console.log('댓글 내용', commentinput.value)
  const newComment: ParentComment = await useArticle.createComment(articleId, request)
  comments.value.push(newComment)
  commentinput.value = ''
  // comments.value = await useArticle.getCommentList(articleId)
}

// 대댓글창 생성
const onIsView = (selected: ParentComment) => {
  selected.isView = !selected.isView
}

// 대댓글 달기
const handleCreatereplies = async (selectedComment: ParentComment, selectedParent_comment_id: number) => {
  const request = {
    content: replyinput.value,
    parent_comment_id: selectedParent_comment_id
  }
  if (request.content === '') {
    alert("대댓글 내용을 입력해주세요!")
    replyinput.value = ''
    onIsView(selectedComment)
    return
  }
  // console.log("parent_comment_id", selectedParent_comment_id)
  const newreply: Comment = await useArticle.createReply(articleId, request)
  // console.log(selectedComment.replies)
  selectedComment.replies.push(newreply)
  replyinput.value = ''
  onIsView(selectedComment)
}


// 옵션 모달창 가기
const goOptionModal = (aritcleId?: number, commentId?: number) => {
  const articleId = Number(route.params.id)
  selectedArticleId.value = articleId
  selectedCommentId.value = commentId ?? -1
  showModal.value = true
}

// 게시글 목록으로 이동
const router = useRouter()
const goArticle1 = () => {
  router.push({ name: 'article' })
}

// 게시글 삭제
const handleDeleteArticle = async (articleId: number) => {
  if (!articleId || articleId === -1) return
  console.log(articleId)
  await useArticle.deleteArticle(articleId)
  console.log("삭제 완료")
  router.push({ name: 'article' })
  showModal.value = false
}

// 댓글 삭제
const handleDeleteComment = async (articleId: number, commentId: number) => {
  if (!articleId || articleId === -1) return
  const isConfirmed = confirm('정말 삭제하시겠습니까?')
  if (isConfirmed) {
    await useArticle.deleteComment(articleId, commentId)
    comments.value = comments.value.filter(comment => comment.comment_id !== commentId)
    console.log("댓글 삭제 완료")
  }
}

// 대댓글 삭제
const handleDeleteReply = async (selectedCommentId: number, selectedReplyId: number, selectedComment: ParentComment) => {
  if (!selectedCommentId || selectedCommentId === -1) return
  const isConfirmed = confirm('정말 삭제하시겠습니까?')
  if (isConfirmed) {
    console.log('삭제한 대댓글의 댓글', selectedComment.replies)
    await useArticle.deleteReply(selectedCommentId, selectedReplyId)
    selectedComment.replies = selectedComment.replies.filter(reply => reply.comment_id !== selectedReplyId)
    console.log("대댓글 삭제 완료")
  }
}

// 모달에서 게시글 수정, 삭제 옵션
const handleDelete = async (articleId: number, commentId?: number) => {
  if (!articleId || articleId === -1) return
  console.log('commentId', commentId)
  console.log('articleId', articleId)
  if (commentId && commentId !== -1) {
    await handleDeleteComment(articleId, commentId)
  } else {
    await handleDeleteArticle(articleId)
  }
}

// 게시글 좋아요
const articleOnIsLiked = async (article: ArticleDetail) => {
  if (!article) return
  if (article.is_liked) {
    article.likes_count--
  } else {
    article.likes_count++
  }
  article.is_liked = !article.is_liked
  await useArticle.articleLikes(article.article_id)
  console.log(article.is_liked)

}

// 댓글 좋아요
const commentOnIsLiked = async (comment: ParentComment) => {
  if (!comment) return
  console.log(comment)
  if (comment.is_liked) {
    comment.likes_count--
  } else {
    comment.likes_count++
  }
  comment.is_liked = !comment.is_liked
  const data = await useArticle.commentLikes(comment.comment_id)
  console.log(comment.is_liked)
}

// 대댓글 좋아요
const replyOnIsLiked = async (reply: Comment) => {
  if (!reply) return
  console.log("reply", reply)
  if (reply.is_liked) {
    reply.likes_count--
  } else {
    reply.likes_count++
  }
  reply.is_liked = !reply.is_liked
  await useArticle.replyLikes(reply.comment_id)
  console.log(reply.is_liked)
}


// 댓글 수정
// const handleUpdateComment = async () => {
//     console.log('articleId', articleId)
//     const request = {
//         title: title.value,
//         content: content.value,
//     }
//     console.log('request',request)
//     await useArticle.updateArticle(articleId, request)
//     router.push({ name: 'detail_article', params: { id: articleId } })
// }




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
