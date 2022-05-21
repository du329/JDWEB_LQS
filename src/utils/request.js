import axios from 'axios';

// axios实例
const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/e3fc6bf2e6c7a0233e485c036f7e016a/lqs_jd',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 1000,
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
        instance.post(url,{ 
            data 
        }).then((response) => {
            resolve(response.data)
        }, (err) => {
            reject(err)
        })
    })
}