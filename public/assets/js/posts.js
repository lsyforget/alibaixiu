$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        console.log(res);
        var html = template('postsTpl', { records: res.records });
        $('#postsList').html(html);
    }
})

//处理日期格式
function dateFormat(date) {
    var newDate = new Date(date);
    return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
}
template.defaults.imports.dateFormat = dateFormat;