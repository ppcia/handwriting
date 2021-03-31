const dateFormat = (dateInput, format)=>{
    var day = dateInput.getDate()
    var month = dateInput.getMonth() + 1
    var year = dateInput.getFullYear()
    format = format.replace(/yyyy/, year)
    format = format.replace(/MM/, month)
    format = format.replace(/dd/, day)
}

// 测试
dateFormat(new Date('2020-12-01', 'yyyy/MM/dd'))
dateFormat(new Date('2020-04-01', 'yyyy/MM/dd'))