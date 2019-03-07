/**
 * author sandune
 * date 2019 3-7
 */

import axios from 'axios';

const service = axios.create({
    baseURL: 'baseURL',
    timeout: 5000
    // headers: headers
})

//request interceptors
service.interceptors.request.use(
    (config) => {

        //将所有 get 请求转换为 post
        if(config.method === 'GET'){
            config.method = 'POST'
        }

        return config
    }
)

//response interceptors
service.interceptors.response.use(
    (response) => {
        return response
    }
)

export default service;