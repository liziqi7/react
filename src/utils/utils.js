import React from 'react'
import { Select } from 'antd';
const Option = Select.Option;
var moment = require('moment');
export default {
    formateDate(date) {
        return moment().format('YYYY-MM-DD HH:MM:ss');
    },
    pagination(data, callback) {
        // debugger
        return {
            onChange: (current) => {                
                callback(current);
            },
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共${data.total}条数据`
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }

}