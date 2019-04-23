import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/components/Home'], resolve),
        meta: { title: '系统首页', requireAuth: true },
        children: [{
            path: '/test',
            name: 'test',
            component: resolve => require(['@/components/test/test'], resolve),
            meta: { title: '测试组管理', requireAuth: true }
        }, {
            path: '/manage',
            name: 'manage',
            component: resolve => require(['@/components/manage/manage'], resolve),
            meta: { title: '赛事管理', requireAuth: true }
        }, {
            path: '/project',
            name: 'project',
            component: resolve => require(['@/components/project/project'], resolve),
            meta: { title: '项目管理', requireAuth: true }
        }, {
            path: '/management',
            name: 'management',
            component: resolve => require(['@/components/management/management'], resolve),
            meta: { title: '领队管理', requireAuth: true }
        }, {
            path: '/athlete',
            name: 'athlete',
            component: resolve => require(['@/components/athlete/athlete'], resolve),
            meta: { title: '运动员管理', requireAuth: true }
        }, {
            path: '/results',
            name: 'results',
            component: resolve => require(['@/components/results/results'], resolve),
            meta: { title: '成绩分析', requireAuth: true }
        }, {
            path: '/live',
            name: 'live',
            component: resolve => require(['@/components/live/live'], resolve),
            meta: { title: '测试直播', requireAuth: true }
        }, {
            path: '/statistical',
            name: 'statistical',
            component: resolve => require(['@/components/statistical/statistical'], resolve),
            meta: { title: '技统大数据', requireAuth: true }
        }, {
            path: '/userPermissions',
            name: 'userPermissions',
            component: resolve => require(['@/components/SystemManagement/UserPermissions'], resolve),
            meta: { title: '角色权限', requireAuth: true }
        }, {
            path: '/usersIncrease',
            name: 'usersIncrease',
            component: resolve => require(['@/components/SystemManagement/usersIncrease'], resolve),
            meta: { title: '角色增加', requireAuth: true }
        }]
    }, {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/components/login/login'], resolve),
        meta: { title: '登录' }
    }]
})