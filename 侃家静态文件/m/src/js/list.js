/**
 * Created by DL on 2016/12/6.
 */
function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    }else if(/ios/.test(ua)){
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}
$(function () {
    // 判断一张的的时候不调用函数
    var $scr_Li = $('.scrollDiv').find("li");
    if($scr_Li.length != 1){
        setTimeout('AutoScroll(".scrollDiv")',2000);
    }
    adjust();
});