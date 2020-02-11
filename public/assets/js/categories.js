//添加分类
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(res) {
            location.reload();
        }
    })
    return false;
})

//生成分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoriesTpl', { categoreis: res });
        $('#categoriesList').html(html);
    }
})

//点击编辑按钮显示信息
$('#categoriesList').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            var html = template('modifyTpl', res);
            $('#categoryBox').html(html);
        }
    })
})

//提交修改信息
$('#categoryBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(res) {
            location.reload();
        }
    })
    return false;
})

//删除分类
$('#categoriesList').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/categories/' + id,
        success: function(res) {
            location.reload();
        }
    })
})

//批量删除
$('#deleteMany').on('click', function() {
    var ids = [];
    var inputs = $('#categoriesList').find('.selectStatus').filter(':checked');
    inputs.each(function(index, item) {
        ids.push($(item).attr('data-id'));
    })
    $.ajax({
        type: 'delete',
        url: '/categories/' + ids.join('-'),
        success: function(res) {
            location.reload();
        }
    })

})