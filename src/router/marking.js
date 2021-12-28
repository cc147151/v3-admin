import layout from '@/layout/index'
const RouteView = {
  render() {
    return (
      <>
        <RouterView></RouterView>
      </>
    )
  }
}
export const marking = [
  {
    path: '/marking',
    component: layout,
    redirect: '/marking/active',
    name: 'Marking',
    meta: {
      title: '营销中心'
    },
    children: [
      {
        path: '/marking/active',
        meta: {
          title: '活动管理'
        },
        component: () => import('@/views/marking/index')
      },
      {
        hidden: true,
        path: '/marking/manageDetail',
        meta: {
          title: '活动管理详情'
        },
        component: () => import('@/views/marking/manageDetail')
      },
      {
        path: '/marking/theme',
        component: RouteView,
        redirect: '/marking/theme/yuanDan',
        meta: {
          title: '活动主题'
        },
        children: [
          {
            path: '/marking/theme/yuanDan',
            component: () => import('@/views/marking/theme/yuanDan/index.vue'),
            meta: {
              title: '元旦活动'
            }
          },
          {
            path: '/marking/theme/newYear',
            component: () => import('@/views/marking/theme/newYear/index.vue'),
            meta: {
              title: '春节活动'
            }
          },
          {
            path: '/marking/theme/detail',
            component: () => import('@/views/marking/theme/detail/index'),
            meta: {
              title: '活动详情'
            },
            hidden: true
          }
        ]
      }
    ]
  }
]
