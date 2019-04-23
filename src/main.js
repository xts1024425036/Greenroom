// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from '@/store/store'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import '@/styles/iconfont/iconfont.css'

Vue.prototype.$ajax = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, form, next) => {
    console.log(to)
    window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title;
    const role = sessionStorage.getItem('uname')
    if (to.matched.some(res => res.meta.requireAuth)) {
        if (role) {
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
