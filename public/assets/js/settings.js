//网站图标上传
$('#logo').on('change', function() {
    var formData = new FormData();
    formData.append('logo', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: formData,
        success: function(res) {
            $('#site_logo').val(res[0].logo);
            $('#logo_img').prop('src', res[0].logo);
        }
    })
})

//保存网站设置
$('#setForm').on('submit', function() {
    var data = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: data,
        success: function(res) {
            location.reload();
        }
    })
    return false;
})

// 向服务器发送请求，获取网站配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        if (response) {
            // 将logo地址存储在隐藏域中
            $('#site_logo').val(response.logo)
                // 将logo显示在页面中 
            $('#logo_img').attr('src', response.logo)
                // 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            // 将网站描述显示在页面中
            $('textarea[name="description"]').val(response.description);
            // 将网站关键词显示在页面中
            $('input[name="keywords"]').val(response.keywords);
            // 将是否开启评论功能显示在页面中
            $('#comment_status').prop('checked', response.comment)
                // 将评论是否经过人工审核显示在页面中
            $('#comment_reviewed').prop('checked', response.review)
        }
    }
})