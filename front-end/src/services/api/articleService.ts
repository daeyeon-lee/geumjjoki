import apiClient from "@/plugins/axios"
import type { ArticleListRequest, ArticleDetail, createArticleRequest, createCommentRequest, ParentComment, updateArticle } from "@/types/article"



const articleService = {
    // 게시판 목록 조회
    getArticleList: async (request: ArticleListRequest) => {
        const response = await apiClient.get('/articles/', { params: request })
        return response.data
    },
    // 게시판 글 생성
    createArticle: async (request: createArticleRequest) => {
        const response = await apiClient.post('/articles/', request)
        console.log(response.data.data)
        return response.data
    },
    // 게시판 글 상세
    getArticleDetail: async (articleId: Number) => {
        const response = await apiClient.get(`/articles/${articleId}/`);
        return response.data.article
    },

    // 게시판 글 수정
    updateArticle: async (articleId: Number, request: updateArticle) => {
        const response = await apiClient.put(`/articles/${articleId}/`, request);
        return response.data
    },

    // 게시판 글 삭제
    deleteArticle: async (articleId: Number) => {
        const response = await apiClient.delete(`/articles/${articleId}/`);
        return response.data
    },


    // 댓글 조회
    getCommentList: async (articleId: Number) => {
        const response = await apiClient.get(`/articles/${articleId}/comments/`);
        return response.data

    },
    
    // 댓글 생성
    createComment: async (articleId: Number, request: createCommentRequest) => {
        const response = await apiClient.post(`/articles/${articleId}/comments/`, request);
        return response.data
    },
    
    // 대댓글 생성
    createReply: async (articleId: Number, request: createCommentRequest) => {
        const response = await apiClient.post(`/articles/${articleId}/comments/`, request);
        return response.data
    },
    
    // 댓글 수정
    updateComment: async (articleId: number, commentId: number, request: updateArticle) => {
        const response = await apiClient.put(`/articles/${articleId}/comments/${commentId}/`, request);
        return response.data
    },

    // 댓글 삭제
    deleteComment: async (articleId: number, commentId: number) => {
        const response = await apiClient.delete(`/articles/${articleId}/comments/${commentId}/`);
        return response.data

    },

    // 대댓글 삭제
    deleteReply: async (articleId: number, commentId: number) => {
        const response = await apiClient.delete(`/articles/${articleId}/comments/${commentId}/`);
        return response.data

    },

    // 게시글 좋아요
    articleLikes: async (articleId: number) => {
        const response = await apiClient.post(`/articles/likes/${articleId}/`)
        return response.data
    },

    // 댓글 좋아요    
    commentLikes: async (commentId: number) => {
        const response = await apiClient.post(`/articles/likes/comments/${commentId}/`)
        return response.data
    },

    // 대댓글 좋아요    
    replyLikes: async (commentId: number) => {
        const response = await apiClient.post(`/articles/likes/comments/${commentId}/`)
        return response.data
    }
}

export default articleService