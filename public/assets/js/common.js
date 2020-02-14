 //给退出按钮绑定事件
 $('#logout').on('click', function() {
         var isConfirm = confirm('确定要退出吗？');
         if (isConfirm) {
             $.ajax({
                 type: 'post',
                 url: '/logout',
                 success: function(res) {
                     location.href = 'login.html';
                 },
                 error: function(res) {
                     alert('退出失败')
                 }
             })
         }

     })
     //全选按钮
 $('#selectAll').on('change', function() {
     var status = $(this).prop('checked');
     $('.selectDelete').find('.selectStatus').prop('checked', status);
     if (status) {
         $('#deleteMany').show();
     } else {
         $('#deleteMany').hide();
     }
 })

 //单选按钮
 $('.selectDelete').on('change', '.selectStatus', function() {
     var inputs = $('.selectDelete').find('.selectStatus');
     if (inputs.length == inputs.filter(':checked').length) {
         $('#selectAll').prop('checked', true);
     } else {
         $('#selectAll').prop('checked', false);
     }
     if (inputs.filter(':checked').length > 0) {
         $('#deleteMany').show();
     } else {
         $('#deleteMany').hide();
     }
 })

 //获取登录用户的信息
 $.ajax({
     type: 'get',
     url: '/users/' + userId,
     success: function(res) {
         $('.name').text(res.nickName);
         $('.avatar').attr('src', res.avatar)
     }
 })