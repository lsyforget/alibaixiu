var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/category/' + id,
        success: function(res) {

            var html = template('postTpl', { post: res });
            console.log(html);
            $('#postsBox').html(html);
        }
    });
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            $('#categoryTitle').text(res.title)
        }
    })
}