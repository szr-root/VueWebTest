import axios from "axios";
import {UserStore} from '@/stores/UserStore'
import config from '@/datas/config'

//创建axios请求对象
const request = axios.create({
    baseURL: config.baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': "application/json"
    },
    validateStatus: function (status) {
        //return status >= 200 && status < 300;
        return true
    },
    //允许发送跨域请求
    crossDomain: true,

    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 判断当前请求接口是否需要权限校验，本地是否有token，如果需要则添加token
    // if (config.url == '/api/users/login' || config.url == '/api/users/register' ||
    //     config.url == '/api/users/verify' || config.url == '/api/users/refresh') {
    //     return config
    // }

    if (config && typeof config.url === 'string') {
        const allowedPaths = [
            '/api/users/login',
            '/api/users/register',
            '/api/users/verify',
            '/api/users/refresh'
        ];
        if (allowedPaths.includes(config.url)) {
            return config;
        }
    }

    const uStore = UserStore()
    if (uStore.token) {
        config.headers['Authorization'] = 'Bearer ' + uStore.token
    } else {
        uStore.$reset()
        window.location.href = '/'
    }
    // console.log(config)
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default request

