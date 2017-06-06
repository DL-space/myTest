$(function(){
    //获取底部浮层高度、赋给页面底部padding值
    var fHeight = $(".float-layer").outerHeight();
    var footer = $(".footer-sp");
    footer.css("padding-bottom",(fHeight+10)+"px");
});