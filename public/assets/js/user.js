//展示用户列表
$.ajax({
    url: '/users',
    success: function(res) {
        var html = template('usersTpl', { users: res });
        $('#usersList').html(html);
    }
})

//提交表单
$('#userForm').on('submit', function() {
    //获取表单内容
    var formData = $(this).serialize();
    console.log(formData);

    //发送请求
    $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function(res) {
                location.reload();
            },
            error: function(res) {
                alert('用户添加失败');
            }
        })
        //阻止表单默认提交事件
    return false;
})

//上传头像
$('#avatar').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: formData,
        success: function(res) {
            $('#hiddenAvatar').val(res[0].avatar);
            $('#preview').attr('src', res[0].avatar);
        }
    })
})

//修改用户页面
$('#usersList').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html);
        }
    })
})

//提交修改用户信息
$('#modifyBox').on('submit', '#modifyForm', function() {
    // alert(1);
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(res) {
            location.reload();
        }
    })
    return false;
})

//图片上传
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: formData,
        success: function(res) {
            $('#hiddenAvatar').val(res[0].avatar);
            $('#preview').attr('src', res[0].avatar);
        }
    })
})

//删除用户
$('#usersList').on('click', '.delete', function() {
    var isConfirm = confirm('确认要删除该用户吗？');
    var id = $(this).attr('data-id');
    if (isConfirm) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(res) {
                location.reload();
            }
        })
    }
})


//批量删除
$('#deleteMany').on('click', function() {
    var ids = [];
    var deleteList = $('#usersList').find('input').filter(':checked');
    deleteList.each(function(index, item) {
        ids.push($(item).attr('data-id'));
    })
    console.log(ids.join('-'));
    $.ajax({
        type: 'delete',
        url: '/users/' + ids.join('-'),
        success: function(res) {
            location.reload();
        }
    })
})