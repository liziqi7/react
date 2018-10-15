import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/utils'
export default class Axios {
    static requsetList(_this,url,params,isMork){
        let data={
            params:params,
            isMork
        }
        this.ajax({
            url: url,
            data: data
        }).then((res) => {
            if(res&&res.list){
            let list = res.list.map((item, index) => {
                item.key = index;
                return item;
            })
            _this.setState({
                list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        }
        })
    }
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
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if(options.isMork){
            baseApi = 'https://easy-mock.com/mock/5bc079399944a90dbdbe6686/imooc';
        }else{
            baseApi = 'https://easy-mock.com/mock/5bc079399944a90dbdbe6686/imooc';
        }        
        return new Promise((resolve, reject) => {
            axios({
                url: options.url, method: 'get', baseURL: baseApi, timeout: 5000, params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
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