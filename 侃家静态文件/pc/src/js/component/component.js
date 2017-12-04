$(function () {
    // 列表循环滚动
    var doscroll = function(obj){
        var $parent = $(obj);
        var $first = $parent.find('li:first');
        var height = $first.height();
        $first.animate({
            marginTop: -height + 'px'
        }, 1000, function() {
            $first.css('marginTop', 0).appendTo($parent);
        });
    };
    setInterval(function(){doscroll(".scrollDiv")}, 2000);
    // 滑动展示  fixed 效果！
    var header2_height = $('.header2').height();
    var $fixed =  $('.fixed');
    var $fixed_li =  $fixed.find('li');
    // 获取滚动条高度
    function getScrollTop()
    {
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
            scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
    // 锚点
    $('.cmt-fixed-nav').find('li').click(function () {
        var header_height = 0
        if($('.header2').length > 0){
            header_height = $('.header2').height();
        }
        var that = $(this);
        var num = that.attr('value');
        $("html,body").animate({scrollTop: $("#"+num).offset().top - header_height}, 500);
    });
    $fixed.find('li').click(function () {
        var header_height = 0
        if($('.header2').length > 0){
            header_height = $('.header2').height();
        }
        var that = $(this);
        var num = that.attr('value');
        $("html,body").animate({scrollTop: $("#"+num).offset().top - header_height}, 500);
    });
    // 外部获取 需要条状的id
    // 判断滚动条距离 ==  id距离顶部高度 找到对应的 li 添加on
    $(window).scroll(scroll_top);
    function scroll_top() {
        var scrollHeight = getScrollTop();
        var $cmt_title_first_height = 200;
        $fixed_li.each(function () {
            var that = $(this);
            var index = that.attr('value');
            // id 高度
            var li_Height = $('#'+index).offset().top;

            if (scrollHeight > li_Height - $cmt_title_first_height) {
                that.addClass("on");
                that.siblings("li").removeClass("on");
            }
        });
        if($(window).scrollTop() > $cmt_title_first_height){
            $fixed.show();
        }else {
            $fixed.hide();
        }
    }
    //视频播放
    $(document).on('click', '.feed-video', function () {
        var id = $(this).attr("data-id");
        var video = $(id);
        var img = $(this).find("img");
        var span = $(this).find('.ico-video');
        var url = $(this).attr("data-url");
        video.show();
        img.hide();
        span.hide();
        videoPlay(url,id,1,1000, 562);
        $("[id^='video']").on("click",function (e) {
            e.stopPropagation();
        })
    })
    //投票
    $(".checked ").click(function () {
        $(this).toggleClass('checked-on');
    })
    /*咨询师点评*/
    //咨询师点评：显示与隐藏更多
    $(document).on("click", $(".show-more a"), function (e) {
        /*判断*/
        if($(e.target).parent().parent()[0].className !== undefined){
            if ($(e.target).parent().parent()[0].className == "show-more") {
                var dpDetail = $(e.target).parents(".dp-detail");
                var dataDetail = dpDetail.find(".data-detail");
                var dataShort = dpDetail.find(".data-short");
                if (dataShort.is(":visible")) {
                    dataDetail.show();
                    dataShort.hide();
                    $(e.target).text("收起全文");
                } else if (dataDetail.is(":visible")) {
                    dataShort.show();
                    dataDetail.hide();
                    $(e.target).text("查看全文");
                }
            }
        }
    });
    /*显示更多*/
    //pd()
    function pd() {
        var user_cmt = $(".cmt-news");
        user_cmt.each(function () {
            var that = $(this);
            var cmt_detail = that.find(".news-cont");
            var cssHeight = parseInt(cmt_detail.css("max-height"));
            var relHeight = parseInt(cmt_detail[0].scrollHeight);
            var dp_showMore = that.find(".show-more");
            var dp_detail = that.find(".news-cont");
            if (relHeight > cssHeight * 1.2) {
                dp_showMore.show();
            }
            dp_showMore.on("click", function () {
                dp_showMore.toggleClass("hide-more");
                dp_detail.toggleClass("news-show");
                if (!dp_showMore.hasClass('hide-more')) {
                    $(this).children('.ico-showmore').text('查看全文');
                } else {
                    $(this).children('.ico-showmore').text('收起全文');
                }
            });
        });
    }
});


/**
 * 视频播放：videoPlay(url,play,w,h)
 * @param: url:视频地址
 *        play：是否自动播放（0：不播放；1：播放）
 *          w ：播放器宽度
 *          h ：播放器高度
 */
function videoPlay(url,id,play, w, h) {
    var flashvars = {
        f: url,
        p: play
    };
    var params = {
        bgcolor: '#FFF',
        allowFullScreen: true,
        allowScriptAccess: 'always',
        wmode: 'transparent'
    };
    CKobject.embedSWF("/ckplayer/ckplayer.swf", "video-" + id, 'ckplayer_video', w, h, flashvars, params);
}
/*图片自适应居中*/
function changeStyle(con) {
    if (con == 0) {
        var newImg = new Image();
        // 获取当前图片的 src属性
        newImg.src = $(".img").attr("src");
        var pWidth = newImg.width;
        var pHeight = newImg.height;
        //容器极限值
        var maxPicContaienrWidth = 1200;
        var maxPicContaienrHeight = 600;
        //容器宽高比率
        var picContainerRadio = maxPicContaienrWidth / maxPicContaienrHeight;
        //图片的宽高比率
        var picRadio = pWidth / pHeight;
        //图片尺寸都小于容器极限值1200 x 600
        if (pHeight <= maxPicContaienrHeight && pWidth <= maxPicContaienrWidth) {
            $(".img").css({
                "width": pWidth,
                "height": pHeight
            });
        } else {
            if (picRadio > picContainerRadio) {
                $(".img").css({
                    "width": maxPicContaienrWidth,
                    "height": maxPicContaienrWidth / picRadio
                });
            } else {
                $(".img").css({
                    "width": "auto",
                    "height": maxPicContaienrHeight
                });
            }
        }
        //图片高度
        var pH = $(".img").height();
        // 赋值操作
        var Top = ($(window).height() - pH) / 2;
        // 垂直居中
        $("#middle").css('top', Top);
    } else if (con == 1) {
        var Top1 = ($(window).height() - 450) / 2;
        $("#middle").css('top', Top1);
    }
}
// 倒计时
function countDown(Deadline) {
    // 当前时间
    var nowTime = new Date().getTime();
    // 2016/12/22 hh:mm:ee
    // 结束时间
    var endTime = new Date(Deadline);
    // 相差的时间
    var t = endTime.getTime() - nowTime;
    if (t <= 0) {
        $(".time-box").text("活动已经结束");
        return false;
    }
    var days = parseInt(t / 1000 / 60 / 60 / 24);
    var hours = parseInt(t / 1000 / 60 / 60 % 24);
    var minutes = parseInt(t / 1000 / 60 % 60);
    var seconds = parseInt(t / 1000 % 60);
    $(".time-box").find(".day").text(days).end()
        .find(".hour").text(hours).end()
        .find(".minute").text(minutes).end()
        .find(".second").text(seconds);
    //定时倒计时
    setTimeout(function () {
        countDown(Deadline)
    }, 1000);
}
