//获取随机推荐文章
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(res) {
        var randomTpl = `
        {{each randoms}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.content}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
    </li>
    {{/each}}
    `;
        var html = template.render(randomTpl, { randoms: res });
        $('#randomBox').html(html);
    }
})

//获取最新评论


//导航分类展示
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var categoryTpl = `
        {{each categories}}
        <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}`;
        var html = template.render(categoryTpl, { categories: res });
        $('.categoryBox').html(html);
    }
})

//获取地址栏的id
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var arr = paramsAry[i].split('=');
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return -1;
}

//点赞功能
$('#article').on('click', '.like', function() {
    var id = $(this).attr('data-id');
    console.log(id);

    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function(res) {
            alert('点赞成功，感谢支持');
            location.reload();
        }
    })
})

//关键字查询文章
$('.search form').on('submit', function() {
    var key = $(this).find('.keys').val();
    location.href = 'search.html?key=' + key;
    return false;
})