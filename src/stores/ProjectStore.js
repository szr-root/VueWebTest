import {defineStore} from 'pinia'
import http from '@/api/index'

export const ProjectStore = defineStore('prostore', {
    //全局数据
    state: () => {
        return {
            // 	侧边菜单折叠
            isCollapsed: false,
            // 历史路由信息
            tags: [],
            // 当前选中的项目
            currentPro: {},
            // 是否禁用菜单
            showMenu: true,
            //保存项目模块列表
            moduleList: [],
            //测试环境
            envList: [],
            //任务列表
            taskList: []
        }
    },
    actions: {
        addTags(to) {
            const res = this.tags.find(item => {
                return to.path === item.path
            })
            if (!res) {
                this.tags.push({
                    name: to.meta.name,
                    path: to.path,
                    iconImg: to.meta.iconImg
                })
            }
        },

        delTags(path) {
            this.tags = this.tags.filter(item => {
                return item.path != path
            })
        },

        async getModuleList() {
            const response = await http.project.getMoudleList(this.currentPro.id)
            if (response.status === 200) {
                this.moduleList = response.data
            }
        },


        //获取测试环境
        async getEnvList() {
            const response = await http.project.getEnvList(this.currentPro.id)
            if (response.status === 200) {
                this.envList = response.data
            }
        },

        //获取项目任务列表
        async getTaskList() {
            const response = await http.task.getTaskList( this.currentPro.id)
            if (response.status === 200) {
                this.taskList = response.data
            }
        },

    },


    // 定义持久化配置
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'proInfo',
                storage: localStorage
            }
        ]
    }
}) 