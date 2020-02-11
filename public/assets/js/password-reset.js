$('#modifyForm').on('submit', function() {
    var formData = $('#modifyForm').serialize();
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(res) {
            location.href = '/admin/login.html';
        },
        error: function(res) {
            alert('密码修改失败');
        }
    })
    return false;
})