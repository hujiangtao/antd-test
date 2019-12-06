import JsonP from 'jsonp';
// import axios from 'axios';
// import qs from 'qs';

export default class Axios{
    static jsonp (options){
        return new Promise((resolve, reject) => {
            JsonP(options.url, {param: 'callback'}, function(err, response){
                debugger
                if(response.status === "1"){
                    resolve(response);
                }else{
                    reject(response.info);
                }

            });
        })
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