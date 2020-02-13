$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(res) {
        $('#category').html(`<strong>${res.categoryCount}</strong>个分类`)
    }
})

$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(res) {
        console.log(res);
        $('#post').html(`<strong>${res.postCount}</strong>篇文章（<strong>${res.draftCount}</strong>篇草稿）`)
    }
})