/**
 * Created by DL on 2016/9/26.
 */
var lineBanner = $(".line-banner");
var orderBtn = $(".order-btn");
var contextList = lineBanner.find(".content-list");
var itemNum = contextList.find(".list-item").length;//轮播元素个数
var size = 1200;//轮播区域宽度、每次位移宽度
orderBtn.on('click',function () {
    var that = $(this);
    var left = parseInt(contextList.css("left"));
    if(!contextList.is(":animated")){
        if(that.hasClass("btn-pre")){
            if(left==0){
                that.hide();
            }else{
                contextList.animate({left:'+='+size+'px'},1000);
            }
        }else if(that.hasClass("btn-next")){
            if(left==-(size*(itemNum-1))){
                that.hide();
            }else{
                contextList.animate({left:'-='+size+'px'},1000);
            }
        }
    }
});