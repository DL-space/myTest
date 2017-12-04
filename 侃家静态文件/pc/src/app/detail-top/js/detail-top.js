$(function(){
    //进入页面时如果滚动条位置距离顶部距离符合要求，则顶部条固定顶部
    fixedDetailTop();

    //页面滚动后楼盘详情页顶部导航悬浮
    $(window).scroll(function () {
        fixedDetailTop();
    });
});

/**
 * 楼盘详情页顶部栏固定
 */
function fixedDetailTop(){
    var height = $(document).scrollTop();
    var headerHeight = $(".top-menu-wrap").height();
    var offsetTop = $(".top-menu-wrap").offset().top;
    if (height > (headerHeight+offsetTop)) {
        $('.top-menu-banner').fadeIn('slow', function () {
            $(this).css('display', 'block');
        });
    } else {
        $('.top-menu-banner').fadeOut('slow', function () {
            $(this).css('display', 'none');
        });
    }
}
