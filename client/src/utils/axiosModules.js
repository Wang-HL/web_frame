/**
 * 默认 GET 请求
 * 
 * 1参数 = url
 * 
 * 2参数 = url + body
 * 
 * 3参数 = url + method + body
 * 
 * 4参数 = url + method + headers + body
 * 
 * @param {String} url 字符串
 * @param {String} method 请求方法
 * @param {Object} headers headers头部参数
 * @param {Object} body 提交的内容
 */
import axios from 'axios';


export const Fetch = (...paramsData) => {
    let url, method = 'GET', headers = {
        'Content-Type': 'application/json; chartset=utf-8',
        // Authorization: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '',
    }, body = {}, temporaryData = {};
    let instance = axios.create();

    switch (paramsData.length) {
        case 1: [url] = paramsData; break;
        case 2: [url, body.params] = paramsData; break;
        case 3:
            [url, method, temporaryData] = paramsData;
            (method === 'get' || method === 'GET') ? body.params = temporaryData : body.data = temporaryData;
            break;
        case 4:
            [url, method, headers, temporaryData] = paramsData;
            (method === 'get' || method === 'GET') ? body.params = temporaryData : body.data = temporaryData;
            break;
        default:
            throw new Error('参数错误');
    }

    // 添加请求拦截器
    instance.interceptors.request.use(config => {
        // 在发送请求之前做些什么
        console.log('发送请求之前做的事')
        return config;
    }, error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(response => {
        // 对响应数据做点什么
        console.log('对响应数据做的事')
        return response;
    }, error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    return instance({ method, headers, url, ...body })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
}