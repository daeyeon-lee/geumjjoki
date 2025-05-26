// 게시판 목록 request
export interface ArticleListRequest {
    page?: number
    size?: number
    sort?: string
    order?: string
    search_keywrod?: string
}

// 게시판 목록 response
export interface ArticleListResponse {
    articles: ArticleList[]
    current_page: number
    total_pages: number
    status: string
    code: number
}


export interface ArticleList {
    article_id: number
    author?: string
    content_preview?: string
    created_at?: string
    is_liked?: boolean
    likes_count: number
    time_ago?: string
    title?: string
    total_comments?: number
}

// 게시글 생성 request
export interface createArticleRequest {
    title: string
    content: string
}

// 게시글 생성 Body
export interface createArticle {
    title: string
    content: string
}


// 게시글 상세 response
export interface ArticleDetail {
    article_id: number
    title?: string
    content?: string
    author?: string
    author_profile_image?: string
    time_ago?: string
    likes_count: number
    is_liked?: boolean
    views?: number
}


// 게시글 수정 request
export interface updateArticleRequest {
    title?: string
    content: string
}
// 게시글 수정
export interface updateArticle {
    title?: string
    content: string
}

// 대댓글 response
export interface Comment {
    comment_id: number
    content?: string
    author?: string
    author_profile_image?: string
    time_ago?: string
    comment_count?: number
    isView?: boolean
    is_liked?: boolean
    likes_count: number
}

// 댓글 response
export interface ParentComment extends Comment {
    replies: Comment[]
}

// 댓글 생성 request
export interface createCommentRequest {
    content: string
    parent_comment_id?: number
}

// 댓글 수정 body
export interface updateComment {
    content: string
}



