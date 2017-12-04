/**
 * Created by DL on 2017/6/29.
 */
$(function () {
    /* 兼容性判断*/
    adjust();
});

/* 兼容性判断*/
function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    }else if(/ios/.test(ua)){
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}