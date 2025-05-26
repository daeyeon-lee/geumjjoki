import articleService from "@/services/api/articleService"
import type { ArticleDetail, updateArticle, ArticleList, ArticleListRequest, createArticleRequest, Comment, createCommentRequest, ParentComment, updateArticleRequest, createArticle, ArticleListResponse} from "@/types/article"


const useArticleComposable = () => {
    // 게시글 목록 조회
    const getArticleList = async (request: ArticleListRequest) => {
        const data = await articleService.getArticleList(request)
        // console.log("게시글 목록", data)
        return data as ArticleListResponse
    }
    // 게시글 생성
    const createArticle = async (request: createArticleRequest) => {
        const data = await articleService.createArticle(request)
        return data as createArticle
    }
    // 게시글 상세
    const getArticleDetail = async (articleId: number) => {
        const data = await articleService.getArticleDetail(articleId);
        // console.log("상세 게시글", data)
        return data as ArticleDetail
    }

    //  게시글 수정
    const updateArticle = async (articleId: number, request: updateArticleRequest) => {
        const data = await articleService.updateArticle(articleId, request);
        alert("게시글을 수정하였습니다")
        return data as updateArticle
    }

    // 게시글 삭제
    const deleteArticle = async (articleId: Number) => {
        await articleService.deleteArticle(articleId);
        alert("게시글이 삭제되었습니다")
    }
    //-----------------------------------------------------------------------------------//

    // 댓글 목록 조회
    const getCommentList = async (articleId: number) => {
        const data = await articleService.getCommentList(articleId);
        // console.log("댓글 목록", data.comments)
        return data.comments as ParentComment[]
    }

    // 댓글 생성
    const createComment = async (articleId: number, request: createCommentRequest) => {
        const data = await articleService.createComment(articleId, request)
        return data.comment as ParentComment
    }
    // 대댓글 생성
    const createReply = async (articleId: number, request: createCommentRequest) => {
        const data = await articleService.createReply(articleId, request)
        // console.log("대댓글", data.comment)
        return data.comment as Comment
    }


    // 댓글 삭제
    const deleteComment = async (articleId: number, commentId: number) => {
        await articleService.deleteComment(articleId, commentId)
        alert("댓글이 삭제되었습니다")
    }
    // 대댓글 삭제
    const deleteReply = async (articleId: number, commentId: number) => {
        await articleService.deleteReply(articleId, commentId)
        alert("대댓글이 삭제되었습니다")
    }


    // 게시글 좋아요
    const articleLikes = async (articleId: number) => {
        const data = await articleService.articleLikes(articleId)
        // console.log(data.message)
    }

    // 댓글 좋아요
    const commentLikes = async (commentId: number) => {
        const data = await articleService.commentLikes(commentId)
        // console.log(data)
        // console.log("댓글 좋아요 여부:", data.message)
    }

    // 대댓글 좋아요
    const replyLikes = async (commentId: number) => {
        const data = await articleService.replyLikes(commentId)
        // console.log(data)
        // console.log("대댓글 좋아요 여부:", data.message)
    }

    return { getArticleList, createArticle, getArticleDetail, deleteArticle, getCommentList, createComment, deleteComment, updateArticle, createReply, articleLikes, commentLikes, deleteReply, replyLikes }
}

export default useArticleComposable



// 댓글 수정
// const updateComment = async (articleId: number, commentId: number, request: updateArticle) => {
//     const data = await articleService.updateComment(articleId, commentId, request)
//     alert("댓글을 수정하였습니다")
//     return data
// }