/**
 * Created by DL on 2016/10/27.
 */
var lineBanner = $(".line-banner");
var orderBtn = $(".order-btn");
var contextList = lineBanner.find(".content-list");
var itemNum = contextList.find(".list-item").length;//轮播元素个数
var size = 1200;//轮播区域宽度、每次位移宽度
orderBtn.on('click',function () {
    var that = $(this);
    if(!contextList.is(":animated")){
        if(that.hasClass("btn-pre")){
            contextList.animate({left:'+='+size+'px'},1000,function () {
                var left = parseInt(contextList.css("left"));
                if(left==0){
                    contextList.css("left",-(size*(itemNum-2))+"px");
                }
            });
        }else if(that.hasClass("btn-next")){
            contextList.animate({left:'-='+size+'px'},1000,function () {
                var left = parseInt(contextList.css("left"));
                if(left==-(size*(itemNum-1))){
                    contextList.css("left","-1200px");
                }
            });
        }
    }
});
