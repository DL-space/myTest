/**
 * Created by DL on 2017/7/4.
 */
$(function () {
    /*显示隐藏*/
    $(document).on("click",".show-hide .show-more",function (e) {
        var that = $(this);
        pd_unfold(that);
        return false;
    });

    videoPlay();
    videoPlayB();

    /*复选框*/
    $(document).on("click",".tp-item .ico-check",function () {
        $(this).toggleClass("check-on");
    });
    /*底部悬浮是否存在*/
    if($(".a-footer-layer").length > 0){
        var pdHeight = $(".a-footer-layer").height();
        $(".container").css({paddingBottom:pdHeight})
    }
    /*兼容ios 底部悬浮*/
    $(".a-footer-layer input").on("click", function() {
        setTimeout(function(){
            if(navigator.userAgent.indexOf("iPhone")>0) {
                document.body.scrollTop = document.body.scrollHeight;
            }
        },200);
    });
});
function pd_unfold(i) {
    var that = i;
    var showHide = that.parents(".show-hide");
    var changeArea = showHide.find(".change-area");
    changeArea.toggleClass("change-show");
    that.toggleClass("show-more-open");
}
/*视频播放*/
function videoPlay() {
    $(".playerA").each(function () {
        //视频播放器
        var _item = $(this);
        var playerId = _item.attr("id"); //容器ID值
        var file = _item.attr("data-file"); //视频地址
        var poster = _item.attr("data-poster"); //视频封面
        var duration = _item.attr("data-duration");//视频时长
        var durationBox = _item.siblings(".duration-time");//视频时长容器
        play(playerId, file, poster);
        durationBox.text(duration);
        jwplayer(playerId).on('play',function(){
            durationBox.hide();
        });
    });
    function play(id,file,cover){
        jwplayer(id).setup({
            width:'auto',
            height:'5rem',
            file:file,
            image:cover
        });
    }
}
/*安卓视频播放*/
function videoPlayB() {
    $(".playerB").each(function () {
        //视频播放器
        var _item = $(this);
        var playerId = _item.attr("id"); //容器ID值
        var file = _item.attr("data-file"); //视频地址
        var poster = _item.attr("data-poster"); //视频封面
        var duration = _item.attr("data-duration");//视频时长

        var videoHtml = ' <video id="ishivideo" ishivideo="true" isrotate="false" autoHide="true">\n' +
            '        <source src='+file+' type="video/mp4">\n' +
            '    </video>\n' +
            '    <div class="video-img"><img src='+poster+' alt=""></div><div class="duration-time">'+duration+'</div>';
        _item.parent('.play').html(videoHtml);
    });
    // 遍历监听视频播放事件
    $('.play').each(function () {
        var _item = $(this);
        var durationBox = _item.find(".duration-time");//视频时长容器
        var offBtn = _item.find('.hi-video-playIcon.offBtn');
        _item.find('video').bind('play', function () {
            //alert("正在播放视频");
            durationBox.hide()
        });
    })
}
/*回顶部*/
$(".return-top").on("click",function () {
    $('body,html').animate({scrollTop: 0}, "200");
    return false;
});
/*倒计时*/
function countDown(Deadline){
    // 当前时间
    var nowTime = new Date().getTime();
    // 结束时间
    var endTime = new Date(Deadline);
    // 相差的时间
    var t = endTime.getTime() - nowTime;
    if(t<=0){
        $(".time-box span").text(0);
        return false;
    }
    var days = parseInt(t/1000/60/60/24);
    var hours = parseInt(t/1000/60/60%24);
    var minutes = parseInt(t/1000/60%60);
    var seconds = parseInt(t/1000%60);
    $(".count-down").find(".day").text(days).end()
        .find(".hour").text(hours).end()
        .find(".minute").text(minutes).end()
        .find(".second").text(seconds);
    //定时倒计时
    setTimeout(function () {
        countDown(Deadline)
    }, 1000);
}
//nav锚点
$("[data-link]").on("click",function () {
    var that = $(this),
        link = that.attr("data-link"),
        linkTo = $("[data-anchor="+link+"]"),
        topbarHeight = $(".topbar").is(":hidden")?0:$(".topbar").outerHeight(),
        headerHeight = $(".top").outerHeight();
    if(linkTo){
        var scrollHeight = linkTo.offset().top-topbarHeight-headerHeight;
        $("html,body").animate({scrollTop: scrollHeight}, "200");
        return false;
    }
});
//按钮
$(".cmt .btn").click(function (e) {
    e.preventDefault();
});