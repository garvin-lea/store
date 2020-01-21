import axios from 'axios';

// http request 请求拦截器
axios.interceptors.request.use(config => {
    // if (config.url.indexOf('/index/') === -1||(config.url.indexOf('/login')=== -1)){
    //     config.headers.Authorization = `${token()}`;
    // }
    return config
}, error => {
    return Promise.reject(error);
});

// http response 响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error)
});



export default {axios}