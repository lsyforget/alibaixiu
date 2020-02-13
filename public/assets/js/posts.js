$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        var html = template('postsTpl', { records: res.records });
        $('#postsList').html(html);
        var pageHtml = template('pageTpl', res);
        $('#pages').html(pageHtml);
    }
})

//处理日期格式
function dateFormat(date) {
    var newDate = new Date(date);
    return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
}
template.defaults.imports.dateFormat = dateFormat;

//分页按钮
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: data + `&page=${page}`,
        success: function(res) {
            var html = template('postsTpl', { records: res.records });
            $('#postsList').html(html);
            var pageHtml = template('pageTpl', res);
            $('#pages').html(pageHtml);
        }
    })
}

//分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { categories: res });
        $('#categoriesList').html(html);
    }
})

//筛选满足条件的文章列表
var data = '';
$('#selectForm').on('submit', function() {
    var formData = $(this).serialize();
    var paramsAry = formData.split('&');
    var formArr = [];
    for (var i = 0; i < paramsAry.length; i++) {
        var singleParam = paramsAry[i].split('=');
        if (singleParam[1] != "") {
            formArr.push(singleParam.join('='))
        }
    }
    data = formArr.join('&');
    $.ajax({
        type: 'get',
        url: '/posts',
        data: data,
        success: function(res) {
            var html = template('postsTpl', { records: res.records });
            $('#postsList').html(html);
            var pageHtml = template('pageTpl', res);
            $('#pages').html(pageHtml);
        }
    })
    return false;
})

//删除
$('#postsList').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    var isConfirm = confirm('确认删除该文章吗？');
    if (isConfirm) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function(res) {
                location.reload();
            }
        })
    }

})