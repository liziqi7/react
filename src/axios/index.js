import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            Jsonp(options.url, {
                param: 'callback'
            }, function (err, res) {
                if (res.status === 'success') {
                    resolve(res);
                } else {
                    reject(res.message)
                }
            })
        })
    }
    static ajax(options) {
        let baseApi = 'https://easy-mock.com/mock/5bc079399944a90dbdbe6686/imooc';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url, method: 'get', baseURL: baseApi, timeout: 5000, params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res.data);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.info
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        })
    }
}