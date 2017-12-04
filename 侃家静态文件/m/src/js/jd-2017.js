/**
 * Created by DL on 2017/10/23.
 */
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
    $(".time-box").find(".day").text(days).end()
        .find(".hour").text(hours).end()
        .find(".minute").text(minutes).end()
        .find(".second").text(seconds);
    //定时倒计时
    setTimeout(function () {
        countDown(Deadline)
    }, 1000);
}

/*回顶部*/
$(".return-top").on("click", function () {
    $('body,html').animate({scrollTop: 0}, "200");
    return false;
});

//单行文字滚动
function AutoScroll(obj){
    var scrollHeight = $(obj).find("li").height();
    $(obj).find("ul:first").animate({
        marginTop:-scrollHeight
    },2000,function(){
        $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
        setTimeout('AutoScroll(".scrollDiv")',2000)
    });
}
//吸顶
$(window).on("scroll",function () {
    var blockNav = $(".block-nav");
    (blockNav.offset().top+blockNav.outerHeight()) < $(window).scrollTop() ? $(".mounting-nav").show():$(".mounting-nav").hide()
});
$(function () {
    // 判断一张的的时候不调用函数
    setTimeout('AutoScroll(".scrollDiv")',2000);
    //nav锚点
    $("[data-link]").each(function () {
        var that = $(this),
            link = that.attr("data-link"),
            linkTo = $("[data-anchor="+link+"]"),
            scrollHeight = linkTo.offset().top-$(".mounting-nav").outerHeight();
        that.click(function () {
            $("html,body").animate({scrollTop: scrollHeight}, "200");
            return false;
        })
    })
});
