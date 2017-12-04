//单行文字滚动
function AutoScroll(obj){
    $(obj).find("ul:first").animate({
        marginTop:"-30px"
    },2000,function(){
        $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
        setTimeout('AutoScroll(".scrollDiv")',2000)
    });
}
$(function () {
    // 判断一张的的时候不调用函数
    if($(".scrollDiv").find('li').length != 0){
        setTimeout('AutoScroll(".scrollDiv")',2000);
    }else {
        return false;
    }
});
// 列表循环滚动
var doscroll = function(obj){
    var $parent = $(obj);
    var $first = $parent.find('li:first');
    var height = $first.height();
    $first.animate({
        marginTop: -height + 'px'
    }, 500, function() {
        $first.css('marginTop', 0).appendTo($parent);
    });
};
setInterval(function(){doscroll(".js-slide-list")}, 2000);
// 时间
function countDown(Deadline){
    // 当前时间
    var nowTime = new Date().getTime();
    // 2016/12/22 hh:mm:ee
    // 结束时间
    var endTime = new Date(Deadline);
    // 相差的时间
    var t = endTime.getTime() - nowTime;
    if(t<=0){
        $(".time-box").text("活动已经结束");
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
// 矛点
$('.fixed').find('li').click(function () {
    //  矛点 num
    var num = $(this).index();
    $("html,body").animate({scrollTop: $("#"+num).offset().top}, 500);
})
/*回顶部*/
$(".return-top").on("click", function () {
    $('body,html').animate({scrollTop: 0}, "200");
    return false;
});
// ping
$(".sub-fix").pin({
    containerSelector: ".dinged"
})
