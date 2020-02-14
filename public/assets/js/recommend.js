//热门推荐模块
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(res) {
        var recommendTpl = `
        {{each comments}}
        <li>
            <a href="javascript:;">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}`;
        var html = template.render(recommendTpl, { comments: res });
        $('#recommendBox').html(html);
    }
})