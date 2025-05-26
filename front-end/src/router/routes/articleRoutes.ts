import MobileLayout from '@/layouts/MobileLayout.vue'
import ArticleView from '@/views/ArticleView.vue'
import Article_01 from '@/components/pages/article/Article_01.vue'
import Article_01_2 from '@/components/pages/article/Article_01_2.vue'
import Article_02 from '@/components/pages/article/Article_02.vue'
import Article_03 from '@/components/pages/article/Article_03.vue'
import Article_04 from '@/components/pages/article/Article_04.vue'
export const articleRoutes = [
  {
    path: '/article',
    component: ArticleView,
    meta: {
      layout: MobileLayout,
      title: '게시판',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'article',
        component: Article_01,
      },
      {
        path: '',
        name: 'article_search',
        component: Article_01_2,
      },
      {
        path: 'article/:id',
        name: 'detail_article',
        component: Article_02,
      },
      {
        path: 'create_article',
        name: 'create_article',
        component: Article_03,
      },
      {
        path: 'update_article/:id',
        name: 'update_article',
        component: Article_04,
      }
    ],
  },

]
