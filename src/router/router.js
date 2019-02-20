import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'home_index',
    component: Main,
    redirect: '/questions/index'
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
      path: '/questions',
      icon: 'help',
      title: '问题管理',
      name: 'questions',
      component: Main,
      children: [
        {
          path: 'index',
          title: '问题管理',
          name: 'questions_index',
          component: resolve => {
            require(['@/views/questions/index.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/comments',
      icon: 'social-twitch-outline',
      title: '评论管理',
      name: 'comments',
      component: Main,
      children: [
        {
          path: 'index',
          title: '评论管理',
          name: 'comments_index',
          component: resolve => {
            require(['@/views/comments/index.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/projects',
      icon: 'monitor',
      title: '课题管理',
      name: 'projects',
      component: Main,
      children: [
        {
          path: 'index',
          title: '课题管理',
          name: 'projects_index',
          component: resolve => {
            require(['@/views/projects/index.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/messages',
      icon: 'chatbox-working',
      title: '消息管理',
      name: 'messages',
      component: Main,
      children: [
        {
          path: 'index',
          title: '消息管理',
          name: 'messages_index',
          component: resolve => {
            require(['@/views/messages/index.vue'], resolve)
          }
        }
      ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
