//获取查询条件
var key = getUrlParams('key');
if (key != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/search/' + key,
        success: function(res) {
            var html = template('postTpl', { post: res });
            $('#postsBox').html(html);
        }
    })
}