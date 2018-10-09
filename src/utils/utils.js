var moment = require('moment');
export default {
    formateDate(date){
        return moment().format('YYYY-MM-DD HH:MM:ss');
    }
}