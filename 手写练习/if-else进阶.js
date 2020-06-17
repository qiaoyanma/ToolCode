function returnWeekday() {
    let string = "今天是星期";
    let date = new Date().getDay();
    // 使用对象
    dateObj = {
        0: ['天', '休'],
        1: ["一", '工'],
        2: ["二", '工'],
        3: ["三", '工'],
        4: ["四", '工'],
        5: ["五", '工'],
        6: ["六", '休']
    }

    // 类型，这里也可以对应相关方法
    dayType = {
        '休': function () {
            // some code
            console.log('为休息日')
        },
        '工': function () {
            // some code
           return '为工作日'
        }
    }

    let returnData = {
        string: string + dateObj[date][0],
        method: dayType[dateObj[date][1]]
    }
    return returnData;
};
console.log(returnWeekday().string,returnWeekday().method.call(this));