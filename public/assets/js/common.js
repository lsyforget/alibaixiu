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