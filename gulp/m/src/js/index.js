/**
 * Created by DL on 2016/12/13.
 */
var findItem = $(".find-item");
findItem.each(function () {
    var that = $(this);
    var open = that.find(".open");
    var icoOpen = open.find(".ico-down");
    open.on("click",function () {
        if(!icoOpen.hasClass("rotate")){
            that.css({
                height:"auto"
            });
        }else{
            that.removeAttr("style");
        }
        icoOpen.toggleClass("rotate");
    })
});
/*安卓行高调整*/
function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    }else if(/ios/.test(ua)){
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}
//单行文字滚动
function AutoScroll(obj){
    $(obj).find("ul:first").animate({
        marginTop:"-.95rem"
    },2000,function(){
        $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
        setTimeout('AutoScroll(".scrollDiv")',2000)
    });
}
$(function () {
    // 判断一张的的时候不调用函数
    var $scr_Li = $('.scrollDiv').find("li");
    if($scr_Li.length != 1){
        setTimeout('AutoScroll(".scrollDiv")',2000);
    }
    adjust();
});