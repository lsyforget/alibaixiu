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