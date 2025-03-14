import './assets/main.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  piniaPluginPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)

//注册elementplus
app.use(ElementPlus, {
  locale: zhCn,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const upinia = createPinia()
// pinia 注册持久化插件
upinia.use(piniaPluginPersist)

app.use(upinia)
app.use(router)
app.use(ElementPlus)



app.mount('#app')
