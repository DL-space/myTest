/**
 * Created by DL on 2017/10/11.
 */
if ($(".scroll-nav").length > 0) {
    $(".scroll-nav").pin({
        containerSelector: ".row-hdn",
        padding: {top: 50}
    });
}
/**
 * 页面导航滚动
 */
function scrollFixed() {
    var center = $(".center"),
        scrollContent = center.find(".row-hdn"),
        scrollItem = scrollContent.find(".hdn-item"),
        scrollBar = scrollContent.find(".scroll-nav"),
        scrollLi = scrollBar.find("li");
    $(window).on("scroll", function () {
        scrollLi.each(function () {
            var that = $(this),
                index = that.index(),
                t = that.offset().top,
                t1 = scrollItem.eq(index).offset().top;
            if (t1 < t) {
                that.addClass("active");
                that.siblings("li").removeClass("active");
            }
        });
    })
}
/*点击左侧导航*/
$(document).on("click", ".scroll-nav li", function () {
    var scrollDistance,
        that = $(this),
        index = that.index(),
        toTop = that.position().top,
        toTop2 = $(".hdn-item").eq(index).offset().top,
        crumbHeight = $(".breadcrumb").height(),
        navHeight = $(".navbar").height(),
        scrollTop = $(".row-hdn").scrollTop();
    if ($(".scroll-nav").css("position") == "fixed") {
        scrollDistance = toTop2 + scrollTop - toTop - crumbHeight;
    } else {
        scrollDistance = toTop2 + scrollTop - toTop + navHeight;
    }
    $("html,body").animate({
            scrollTop: scrollDistance
        }, 1000, "linear", function () {
            that.addClass("active");
            that.siblings("li").removeClass("active");
        }
    );
});
/*触发联动*/
scrollFixed();

/*tab切换*/
$(".tab-area").tabChange();
