/**
 * Created by DL on 2017/8/3.
 */
$(function () {
    pdh();
});
$(document).on("click",".wd-item .text-close,.wd-footer .btn-action",function () {
    var fatherItem = $(this).parents(".wd-item");
    if($(this).hasClass("btn-action") && $(this).text()=="收起"){
        contentClose(fatherItem)
    }else{
        contentShow(fatherItem);
    }
});
$(window).scroll(function () {
    $(".wd-item").each(function () {
        var that = $(this);
        var btnUnfold = that.find(".wd-footer .btn-unfold");
        if(!btnUnfold.is(":hidden")){
            changePoistion(that);
        }
    })
});
/*打开内容区*/
function contentShow(fatherItem) {
    fatherItem.find(".text").removeClass("text-close").addClass("text-open");
    fatherItem.find(".btn-fold").hide();
    fatherItem.find(".btn-unfold").show();
    fatherItem.find(".thumb-img").addClass("hide");
    fatherItem.find(".ori-img").removeClass("hide");
    changePoistion(fatherItem);
}
/*收缩内容区*/
function contentClose(fatherItem){
    fatherItem.find(".text").removeClass("text-open").addClass("text-close");
    fatherItem.find(".btn-unfold").hide();
    fatherItem.find(".btn-fold").show();
    fatherItem.find(".wd-footer").removeClass("footer-fixed");
    fatherItem.find(".zxs-d").attr("style","");
    fatherItem.find(".thumb-img").removeClass("hide");
    fatherItem.find(".ori-img").addClass("hide");
}
/*改变footer的position状态*/
function changePoistion(item) {
    var oldFixedHeight,
        scrollItem = item.find(".content-area"),
        wdText = item.find(".wd-text"),
        wdTextLeft = wdText.offset().left,
        wdTextWidth = wdText.outerWidth(),
        zxsD = item.find(".zxs-d"),
        zxsDHeight = zxsD.height(),
        wdFooter = scrollItem.find(".wd-footer"),
        wScrollHeight = $(window).scrollTop(),//页面滚动高度
        thisTopHeight = scrollItem.offset().top,//item距离顶部高度
        thisHeight = scrollItem.outerHeight(),//item高度
        wHeight = $(window).height(),//屏幕高度
        bottomHeight = (wScrollHeight+wHeight)-(thisTopHeight+thisHeight),
        topHeight = wScrollHeight+wHeight-thisTopHeight,
        topToTop = thisTopHeight-wScrollHeight,
        bottomToTop = thisTopHeight+thisHeight-wScrollHeight;
    if($(".header2").length > 0){
        oldFixedHeight = 56;
    }else if($(".top-menu-banner").length > 0){
        oldFixedHeight = 120;
    }
    if(bottomHeight>0 || topHeight<100){
        wdFooter.removeClass("footer-fixed");
    }else{
        if(!wdFooter.parent().is(".footerWrap")){
            wdFooter.wrap(function () {
                var footerHeight = $(this).height(),
                    wrapHtml = $("<div class='footerWrap'></div>");
                return wrapHtml.css({
                    height:footerHeight
                });
            }).addClass("footer-fixed");
        }else{
            wdFooter.addClass("footer-fixed");
        }
    }
    if((topToTop-oldFixedHeight)<0){
        if((bottomToTop-oldFixedHeight)>zxsDHeight){
            zxsD.attr("style","").css({
                 position:"fixed",
                 top:oldFixedHeight,
                 left:wdTextLeft+wdTextWidth
            });
        }else{
            zxsD.attr("style","").css({
                position:"absolute",
                right:0,
                bottom:0
            });
        }
    }else{
        zxsD.attr("style","");
    }
}
/*判断是否展示蒙层和按钮*/
function pdh() {
    $(".wd-item").each(function () {
        var that = $(this);
        var btnAction = that.find(".btn-fold");
        var btnUnford = that.find(".btn-unfold");
        var textArea = that.find(".text");
        var pdArea = that.find(".text p");
        var thumbList = that.find(".text .thumb-list").length;
        var textHeight = textArea.height();//限制高度值
        var areaHeight = pdArea[0].offsetHeight;
        var mask = textArea.find(".mask");
        if(btnUnford.is(":hidden")){
            if(areaHeight > textHeight || thumbList > 0){
                btnAction.css({
                    "display":"block"
                });
                textArea.addClass("text-close");
            }else{
                mask.hide()
            }
        }
    })
}


