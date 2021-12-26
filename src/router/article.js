import layout from '@/layout/index'
export const article = [
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article/article-ranking/index'),
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article/article-detail/index'),
        hidden: true
      },
      {
        path: '/article/create',
        component: () => import('@/views/article/article-create/index'),
        meta: {
          title: '创建文章',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article/article-create/index'),
        hidden: true
      }
    ]
  }
]
