$('#image').on('change', function() {
    var formData = new FormData();
    formData.append('imageFile', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: formData,
        success: function(res) {
            $('#hiddenImg').val(res[0].imageFile);
        }
    })
})

//添加轮播图
$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(res) {
            location.reload();
        }
    })
    return false;
})

//轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        var html = template('slideTpl', { slides: res });
        $('#slideBox').html(html);
    }
})

//删除轮播图
$('#slideBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/slides/' + id,
        success: function(res) {
            location.reload();
        }
    })
})