$(function () {
    //页面滚动后header悬浮
    if ($(".page-menu").length == 0 && $(".header-outer").length == 0) {
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
    }


    //其他城市弹层
    var isCity = true;
    var city_html = '<div class="city-tip-show">其他城市将陆续开放!</div>';
    $('.city-tip').mouseover(function () {
        $(this).css('cursor', 'pointer');
        if (isCity) {
            $(this).append(city_html);
        }
        isCity = false;
    }).mouseleave(function () {
        $(this).children('.city-tip-show').remove();
        isCity = true;
    });

    //联系我们微信公众号
    $(".share-wx a").hover(function () {
        $(this).siblings(".share-qrcode").fadeIn("slow");
    }, function () {
        $(this).siblings(".share-qrcode").fadeOut("slow");
    });
});
