import {createRouter, createWebHistory} from 'vue-router'
import {UserStore} from '@/stores/UserStore'
import NProgress from 'nprogress'
import {ProjectStore} from '@/stores/ProjectStore'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/users/login',
            name: 'login',
            component: () => import('../views/User/LoginView.vue'),
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home/HomeView.vue'),
            redirect: '/project/proList',
            //配置子路由
            children: [
                {
                    path: '/project/proList',
                    name: 'projectList',//项目列表页
                    component: () => import('../views/Project/ProjectListView.vue'),
                    meta: {
                        name: "项目列表",
                        iconImg: new URL('@/assets/icon2/prolist.png', import.meta.url).href
                    }
                },
                {
                    path: '/project/module',
                    name: 'module',//项目模块页
                    component: () => import('../views/Project/ModuleListView.vue'),
                    meta: {
                        name: "功能模块",
                        iconImg: new URL('@/assets/icon2/module4mokuai.png', import.meta.url).href
                    }
                },
                {
                    path: '/env/list',
                    name: 'envlist',//环境列表页
                    component: () => import('../views/Project/EnvListView.vue'),
                    meta: {
                        name: "测试环境",
                        iconImg: new URL('@/assets/icon2/huanjingguanli.png', import.meta.url).href
                    }
                },
                {
                    path: '/cases/list',
                    name: 'cases',//测试用例页
                    component: () => import('../views/TestCase/CaseListView.vue'),
                    meta: {
                        name: "测试用例",
                        iconImg: new URL('@/assets/icon2/biz-test-o.png', import.meta.url).href
                    }
                },
                {
                    path: '/cases/add',
                    name: 'addCase',//添加测试用例页
                    component: () => import('../views/TestCase/AddCaseView.vue'),
                    meta: {
                        name: "添加用例",
                        iconImg: new URL('@/assets/icon2/caseadit.png', import.meta.url).href
                    }
                },
                {
                    path: '/cases/edit/:id',
                    name: 'editCase',//编辑测试用例页
                    component: () => import('../views/TestCase/EditCaseView.vue'),
                    meta: {
                        name: "编辑用例",
                        iconImg: new URL('@/assets/icon2/zhihangjilu.png', import.meta.url).href
                    }
                },

                {
                    path: '/suite/list',
                    name: 'suites',//测试套件页
                    component: () => import('../views/TestSuite/SuiteListView.vue'),
                    meta: {
                        name: "测试套件",
                        iconImg: new URL('@/assets/icon2/test-case-group.png', import.meta.url).href
                    }
                },
                {
                    path: '/suite/add',
                    name: 'addSuites',//添加测试套件页
                    component: () => import('../views/TestSuite/AddSuite.vue'),
                    meta: {
                        name: "创建套件",
                        iconImg: new URL('@/assets/icon2/biz-test-o.png', import.meta.url).href
                    }
                },
                {
                    path: '/suite/edit/:id',
                    name: 'editSuites',//编辑测试套件页
                    component: () => import('../views/TestSuite/EditSuite.vue'),
                    meta: {
                        name: "编辑套件",
                        iconImg: new URL('@/assets/icon2/zhihangjilu.png', import.meta.url).href
                    }
                },

                {
                    path: '/plan/task',
                    name: 'task',//任务列表页
                    component: () => import('../views/TestTask/TestTaskView.vue'),
                    meta: {
                        name: "任务列表",
                        iconImg: new URL('@/assets/icon2/yuansu-jieduan.png', import.meta.url).href
                    }
                },
                {
                    path: '/plan/edit/:id',
                    name: 'editTask',//编辑任务
                    component: () => import('../views/TestTask/EditTaskView.vue'),
                    meta: {
                        name: "编辑任务",
                        iconImg: new URL('@/assets/icon2/zhihangjilu.png', import.meta.url).href
                    }
                },

                {
                    path: '/plan/corn',
                    name: 'corn',//定时任务页
                    component: () => import('../views/CornTab/CornTabView.vue'),
                    meta: {
                        name: "定时任务",
                        iconImg: new URL('@/assets/icon2/dingshirenwu.png', import.meta.url).href
                    }
                },
                {
                    path: '/record/list',
                    name: 'record',//测试记录页
                    component: () => import('../views/TestRecord/RecordListView.vue'),
                    meta: {
                        name: "执行记录",
                        iconImg: new URL('@/assets/icon2/zhihangjilu.png', import.meta.url).href
                    }
                },
                {
                    path: '/record/suite/report/:id',
                    name: 'suiteReport',//套件报告页
                    component: () => import('../views/TestSuite/SuiteReportView.vue'),
                    meta: {
                        name: "套件报告",
                        iconImg: new URL('@/assets/icon2/report.png', import.meta.url).href
                    }
                },
                {
                    path: '/record/task/report/:id',
                    name: 'taskReport',//套件报告页
                    component: () => import('../views/TestRecord/TaskReport.vue'),
                    meta: {
                        name: "任务报告",
                        iconImg: new URL('@/assets/icon2/report.png', import.meta.url).href
                    }
                },

                {
                    path: '/devices/list',
                    name: 'devices',//设备管理页
                    component: () => import('../views/Device/DevicesView.vue'),
                    meta: {
                        name: "设备管理",
                        iconImg: new URL('@/assets/icon2/shebei.png', import.meta.url).href
                    }
                },


            ]
        },
        {
            path: '/users/register',
            name: 'register',
            component: () => import('../views/User/RegisterView.vue'),
        }
    ]
})

//前置路由导航守卫
router.beforeEach(async (to,) => {
    NProgress.start()
    const uStore = UserStore()
    const pStore = ProjectStore()
    if (to.name === 'register') {
        return
    }
    if (!uStore.token && to.name !== 'login') {
        return {name: 'login'}
    }

    //保存历史访问路由信息
    if (to.meta.name) {
        pStore.addTags(to)
    }

})

//后置路由导航守卫
router.afterEach(() => {
    NProgress.done()
})

export default router
