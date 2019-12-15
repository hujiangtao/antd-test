import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
// import qs from 'qs';

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, { param: 'callback' }, function (err, response) {
                if (response.status === "1") {
                    resolve(response);
                } else {
                    reject(response.info);
                }

            });
        })
    }

    static ajax(options) {
        let baseApi = 'http://192.168.16.118:7300/mock/5df52264267c68079cfd7a0c/imoocapi';

        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }

        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }

                if (response.status === 200) {
                    if (response.data.code === 0) {
                        resolve(response.data)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: response.data.msg
                        });
                    }
                } else {
                    reject(response.data);
                }
            });
        });
    }
}









// let http = {
//     post: "",
//     get: "",
// };

// http.post = function(api, data){
//     let params = qs.stringify(data);
//     return new Promise((resolve, reject) => {
//         axios.post(api, params).then((res) => {
//             resolve(res);
//         })
//     });
// }

// http.get = function(api, data){
//     let params = qs.stringify(data);
//     return new Promise((resolve, reject) => {
//         axios.get(api, params).then((res) => {
//             resolve(res);
//         })
//     })
// }