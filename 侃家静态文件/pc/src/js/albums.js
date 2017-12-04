/**
 * Created by DL on 2016/11/3.
 */
$(function () {
    //右侧悬浮效果
    if ($(".row-suspend .col8 .suspend").length > 0) {
        $(".row-suspend .col8 .suspend").pin({
            containerSelector: ".row-suspend",
            padding: {top: 72,bottom:50}
        });
    }

    //锚点链接
    $(".atlas-list li a").click(function () {
        $("html,body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 135 + "px"  //设置锚点链接地址距离屏幕顶部的距离：135px
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
});