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
    }

}