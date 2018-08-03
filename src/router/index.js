/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/26 026
 * @description 全局 router
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/modules/index'),
      name: 'layout',
      redirect: {
        name: 'home'
      },
      meta: {title: '上左右整体布局'},
      children: [
        {
          path: '/home',
          component: () => import('@/modules/home'),
          name: 'home',
          meta: {title: '首页'}
        }
      ],
      beforeEnter (to, from, next) {
        // 未登录则跳转到登录页
        let token = sessionStorage.token;

        if (!token || !/\S/.test(token)) {
          next({ name: 'login' });
        }
        next();
      }
    },
    {
      path: '/404',
      component: () => import('@/modules/404'),
      name: '404',
      meta: {title: '404未找到'}
    },
    {
      path: '/login',
      component: () => import('@/modules/login'),
      name: 'login',
      meta: {title: '登录'}
    },
    {
      path: '*',
      redirect: { name: '404' }
    }
  ]
});

// 设置页面title
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
