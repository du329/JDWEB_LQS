import axios from 'axios';
import { ElMessage } from 'element-plus'
// import { useBackEffect } from '../effects/useBackEffect'
// const { handlePush } = useBackEffect();

// axios实例
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 允许跨域携带cookie
    timeout: 1000,
})

//请求拦截器
instance.interceptors.request.use(function (config) {
    //从localStorage里取出token
    const token = localStorage.getItem('token');
    //把token塞入Authorization里
    config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    function (error) {
        // Do something with request error
        ElMessage.warning('请求错误!')
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(function (response) {
    // 正常响应处理
    // token未过期
    return response
}, function (error) {
    // 非正常响应处理(包括401)
    if (error.response.status === 401) {
        // token过期（强制用户重新登录系统，以刷新服务器端的token时效）
        localStorage.isExpire = true;
        ElMessage.warning('身份过期,请登录!')
        location.href = 'http://localhost:8080/#/'
    }
    return Promise.reject(error)
})

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params,
        }).then((response) => {
            resolve(response.data);
        }, (err) => {
            reject(err)
        })
    })
}

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url,
            data
        ).then((response) => {
            resolve(response.data)
        }, (err) => {
            reject(err);
        })
    })
}

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.patch(url,
            data
        ).then((response) => {
            resolve(response.data)
        }, (err) => {
            reject(err);
        })
    })
}

export const del = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instance.delete(url,
            data
        ).then((response) => {
            resolve(response.data)
        }, (err) => {
            reject(err);
        })
    })
}