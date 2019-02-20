import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import Cookies from 'js-cookie'

Vue.use(iView);

router.beforeEach((to, from, next) => {
  if (Cookies.get('user')) {
    next()
  }else{
    if (to.path === '/login') { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login');  // 否则全部重定向到登录页
    }
  }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
    }
});
