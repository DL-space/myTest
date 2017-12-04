$(function () {
    videoPlay();
    videoPlayB();
});
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
$(document).on("click",".carousel-img li",function () {
    var fade = $(".fade");
    var index = $(this).index();
    var swiperWrapper = $(".swiper-wrapper");
    var father = $(this).parents(".carousel-img");
    var lis = father.find("li").clone().addClass("swiper-slide");
    swiperWrapper.append(lis);
    fade.show();
    fade.on("click",function () {
        swiperWrapper.attr("style","");
        swiperWrapper.parents(".swiper-container").attr("class","swiper-container");
        swiperWrapper.empty();
        $(this).hide();
        $("body").unbind("touchmove");
        mySwiper.destroy(false);
    });
    lunbo(index);
    $("body").on('touchmove', function (ev) {
        ev.preventDefault();
    });
});
function lunbo(index) {
    mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        //切换方式
        effect:"slide",
        //图片对应
        initialSlide :index
    });
}
/* 兼容性判断*/
function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    } else{
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}
$(function () {
    adjust();
});