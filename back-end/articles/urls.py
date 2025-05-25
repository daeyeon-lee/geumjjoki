from django.urls import path
from .views import ArticleView, ArticleDetailView, CommentView, ArticleLikeView, CommentLikeView

app_name = "articles"

urlpatterns = [
    path("", ArticleView.as_view(), name="article_list"),
    path("<int:article_id>/", ArticleDetailView.as_view(), name="article_detail"),
    # 댓글 관련 URL 수정
    path("<int:article_id>/comments/", CommentView.as_view(), name="comment_list_create"),
    path("<int:article_id>/comments/<int:comment_id>/", CommentView.as_view(), name="comment_detail"),
    # 좋아요 관련 URL 수정
    path("likes/<int:article_id>/", ArticleLikeView.as_view(), name="article_like"),
    path("likes/comments/<int:comment_id>/", CommentLikeView.as_view(), name="comment_like"),
]