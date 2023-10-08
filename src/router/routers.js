export default [
  {
    path: '/',
    name: 'homePage',
    redirect: '/home',
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
  },
  // 登录
  {
    path: '/loginAuto',
    name: 'loginAuto',
    component: () => import('@/views/login/loginAuto'),
  },
  // home
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home')
  },
]
