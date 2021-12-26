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
          }
        ]
      }
    ]
  }
]
