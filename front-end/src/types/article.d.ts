// 게시판 목록 요청 파라미터
export interface ArticleListRequest {
    page?: Number
    size?: Number
    sort?: String
    order?: String
    search_keywrod?: String
}

// 게시판 목록 응답
export interface ArticleList {
    article_id?: Number,
    title?: String,
    content_preview?: String,
    created_at ?: Date,
    time_ago?: String,
    author?: String,
    total_comments?: Number,
    likes_count?: Number,
    is_liked?: Boolean
}

// 게시글 생성 Body
export interface createArticleRequest {
    title: String
    content: String
}

// 게시글 수정 body
export interface updateArticle {
    title?: String
    content: String
}
// 댓글글 수정 body
export interface updateArticle {
    content: String
}


// 게시글 상세 response
export interface ArticleDetail {
    article_id?: Number
    title?: String
    content?: String
    author?: String
    author_profile_image?: String
    time_ago?: String
    likes_count?: String
    is_liked?: boolean
    views?: Number
}

// 댓글 생성 request
export interface createCommentRequest {
    content: String
    parent_comment_id?: Number
}


// 대댓글 response
export interface Comment {
    comment_id: Number
    content: String
    author: String
    author_profile_image: String
    time_ago: String
    comment_count: String
    code: String
    isView: {
        type: boolean
        default: false
    }   
}


export interface ParentComment extends Comment {
    // 댓글 response
    replies: Comment[]
}    


