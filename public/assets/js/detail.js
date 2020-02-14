//获取文章id
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            var categoryId = res.category;
            var authorId = res.author;
            $.ajax({
                async: false,
                type: 'get',
                url: '/categories/' + categoryId,
                success: function(result) {
                    res.category = result;
                }
            })
            $.ajax({
                async: false,
                type: 'get',
                url: '/users/' + authorId,
                success: function(result) {
                    res.author = result;
                }
            })
            var html = template('detailTpl', res);

            $('.content .article').html(html);
        }
    })
}

//判断是否添加评论框
var review = false;
$.ajax({
    type: 'get',
    url: 'settings',
    success: function(res) {
        review = res.review;
        if (res.comment) {
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
})

//发布评论
$('#comment').on('submit', 'form', function() {
    var userId = userId;
    var commentText = $(this).find('textarea').val();

    if (!isLogin) {
        location.href = 'admin/login.html';
    } else {
        var state = review ? 0 : 1;
        $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                author: userId,
                post: id,
                content: commentText,
                state: state
            },
            success: function(res) {
                location.reload();
            }
        })
    }
    return false;
})