/*安卓行高调整*/
function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    } else if (/ios/.test(ua)) {
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}
// 单行文字滚动
function AutoScroll(obj) {
    var scrollHeight = $(obj).find("li").height();
    $(obj).find("ul:first").animate({
        marginTop: -scrollHeight
    }, 2000, function () {
        $(this).css({marginTop: "0"}).find("li:first").appendTo(this);
    });
}

$(function () {

    adjust();
    // 初始坐标
    var initialize = {top: '1.55rem', left: '0.5rem'};
    // 结束坐标
    var target = {top: '0.32rem', left: '8.3rem'};
    /*头部动画效果触发*/
    var fs = true;
    var $sc = $('.search-cont');
    var $hp = $(".header-top");
    var $bigin_ico = $sc.find('.icon-search');
    var $finish = $('.header-top .top').find('.search-ico');
    // 判断刷新时 icon 状态

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            if (fs) {
                Top_animate($sc, $hp, $bigin_ico, $finish)
                fs = false;
            }
        } else {
            if (!fs) {
                Top_animate_restore($sc, $hp, $bigin_ico, $finish);
                fs = true;
            }
        }
    });
    // 取消固定 topbar 改变定位位置
    $('.ico-close').click(function () {
        header_top = '0';
        $("header").animate({top: '0'})
    })
    /*头部动画效果*/
    function Top_animate(sc, hp, icon, fin) {
        sc.hide();
        hp.append(icon.clone());
        // 获取clone
        var $clone_icon = hp.find('.icon-search:last');

        $clone_icon.css({
            "position": 'absolute',
            'top': '1.55rem',
            'left': '.5rem',
            'opacity': '0'
        });
       /* $(".center-hp").css({
            "padding-top": "1.5rem"
        });*/
        //$(".center-hp").animate({paddingTop:'1.5rem'},500);
        $clone_icon.stop().animate({top: target.top, left: target.left, opacity: '1'}, 500, function () {
            $(this).remove();
            fin.css('opacity', '1');
            icon.css('opacity', '0');
        });
    }

    // 返回动画效果！
    function Top_animate_restore(sc, hp, icon, fin) {
        sc.show();
        icon.css('opacity', '0');
        hp.append(fin.clone());
        fin.css('opacity', '0');
        var $clone_icon = hp.find('.icon-search:last');
        $clone_icon.css({
            "position": "absolute",
            "top": target.top,
            "left": target.left,
            "opacity": 0
        });
        //$clone_icon.css("position", 'absolute').css('top', target.top).css('left', target.left).css('opacity', '0');
        //$(".center-hp").animate({paddingTop:'3.28rem'},500);
       /* $(".center-hp").css({
            "padding-top": "3.28rem"
        });*/
        $clone_icon.stop().animate({top: initialize.top, left: initialize.left, opacity: '1'}, 500, function () {
            hp.find('.search-ico:last').remove();
            icon.css('opacity', '1');
            fin.css('opacity', '0');
        });

    }
});
