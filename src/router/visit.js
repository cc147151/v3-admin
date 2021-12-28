import layout from '@/layout/index'
export const visit = [
  {
    path: '/visit',
    component: layout,
    redirect: '/visit/index',
    name: 'Visit',
    children: [
      {
        path: '/visit/index',
        component: () => import('@/views/visit/index.vue'),
        meta: {
          title: '浏览量'
        }
      },
      {
        path: '/visit/detail',
        component: () => import('@/views/visit/detail/index.vue'),
        hidden: true,
        meta: {
          title: '详情'
        }
      }
    ]
  }
]
