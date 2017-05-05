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
$(function () {
    adjust();
});