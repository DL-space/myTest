/**
 * Created by DL on 2016/11/7.
 */
var lineBanner = $(".line-banner");
var orderBtn = $(".order-btn");
var contextList = lineBanner.find(".content-list");
var listItem = contextList.find(".list-item");
var itemNum = contextList.find(".list-item").length;//轮播元素个数
var size = 1200;//轮播区域宽度、每次位移宽度
orderBtn.on('click',function () {
    var that = $(this);
    var left = parseInt(contextList.css("left"));
    that.prop("disabled",true);
    listItem.fadeOut(500,change());
    function change() {
        if(that.hasClass("btn-pre")){
            if(left==0){
                contextList.delay(500).animate({left:-(size*(itemNum-1))+"px"},0)
            }else{
                contextList.delay(500).animate({left:'+='+size+'px'},0);
            }
        }else if(that.hasClass("btn-next")){
            if(left==-(size*(itemNum-1))){
                contextList.delay(500).animate({left:"0"},0)
            }else{
                contextList.delay(500).animate({left:'-='+size+'px'},0);
            }
        }
    }
    listItem.fadeIn(500,function () {
        that.prop("disabled",false);
    });
});
