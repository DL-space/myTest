/**
 * Created by DL on 2016/11/14.
 */
$(function () {
    //根据屏幕自适应字体
    var pWidth = document.body.clientWidth;
    var $dpi = window.devicePixelRatio;
    var pFontSize;
    if ($dpi > 1) {
        pFontSize = pWidth * $dpi * 0.1 * (1 / $dpi);
    } else if ($dpi == 1) {
        if (pWidth >= 750) {
            pFontSize = 75;
        } else {
            pFontSize = pWidth * 0.1;
        }
    }
    $("html").attr("data-dpr", $dpi);
    $("html").css({
        "font-size": pFontSize
    });
});

