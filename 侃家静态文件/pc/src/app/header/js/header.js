$(function () {
    //其他城市弹层
    var isCity = true;
    $('.city-tip').mouseover(function () {
        if (isCity) {
            $(this).children(".city-change-list").show();
        }
        isCity = false;
    }).mouseleave(function () {
        $(this).children(".city-change-list").hide();
        isCity = true;
    });

    //页面滚动后header悬浮
    $(window).scroll(function () {
        var height = $(document).scrollTop();
        var headerHeight = $(".header").height();
        if (height > headerHeight) {
            $('.header2').fadeIn('slow', function () {
                $(this).css('display', 'block');
            });
        } else {
            $('.header2').fadeOut('slow', function () {
                $(this).css('display', 'none');
            });
        }
    });
});
