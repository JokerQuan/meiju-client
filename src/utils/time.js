import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const time = {}

time.parseTime = (timeStr) => {
    if ((moment().valueOf() - timeStr) >= (1000 * 60 * 60 * 12)) {
        return moment(timeStr, 'x').format('llll');
    }
    return moment(timeStr, 'x').fromNow();
}

export default time;