$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        var html = template('pageTpl', res);
        $('#pageBox').html(html);
        var commentHtml = template('commentTpl', { comment: res.records });
        $('#commentsBox').html(commentHtml);
    }
})

//分页功能
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(res) {
            var html = template('pageTpl', res);
            $('#pageBox').html(html);
            var commentHtml = template('commentTpl', { comment: res.records });
            $('#commentsBox').html(commentHtml);
        }
    })
}

//更改评论状态
$('#commentsBox').on('click', '.status', function() {
    var state = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    state = state == 0 ? 1 : 0;
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: { state: state },
        success: function(res) {
            location.reload();
        }
    })
})

//删除评论
$('#commentsBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function(res) {
            location.reload();
        }
    })
})