//获取分类下拉框
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { categories: res });
        $('#category').html(html);
    }
})

//上传文章封面
$('#feature').on('change', function() {
    var formData = new FormData();
    formData.append('feature', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: formData,
        success: function(res) {
            $('#thumbnail').val(res[0].feature);
        }
    })
})

//创建文章
$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(res) {
            location.href = '/admin/posts.html'
        }
    })
    return false;
})

//获取地址栏的id
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var arr = paramsAry[i].split('=');
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return -1;
}

//判断是修改页面还是添加页面
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {
                    res.categories = categories;
                    var html = template('modifyTpl', res);
                    $('#parentBox').html(html);
                }
            })

        }
    })
}

//修改文章
$('#parentBox').on('submit', '#modifyForm', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function(res) {
            location.href = '/admin/posts.html';
        }
    })
    return false;
})