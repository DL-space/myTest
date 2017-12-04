/**
 * Created by DL on 2017/9/5.
 */
/**
 * 返回顶部
 * 两种方式：1、页面某个位置有class为return-top的结构
 *           2、调用returnTop(t)方法，随页面滚动添加class为aui-return-top结构
 */
/*点击返回顶部结构，触发页面返回顶部动作*/
$(document).on("click",".return-top,.aui-return-top",function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
});

/**
 * 返回顶部方法,需要动态添加返回顶部结构时调用
 * @param t number：距离顶部多少显示“返回顶部”,默认0
 * @param x number：到右侧距离，默认50
 * @param y number：到底部距离，默认50
 */
function returnTop(t,x,y) {
     var expPoint = (t?t:0);//距离顶部多少触发
     var toRight = (x?x:50);//到右侧距离
     var toBottom = (y?y:50);//到底部距离
    /*返回顶部结构*/
    var returnTop = $('<a href="javascript:void(0)" class="aui-return-top" title="返回顶部">return-top</a>')
        .css({
            "display":"none",
            "position":"fixed",
            "bottom":toBottom,//智能啊
            "right":toRight
        });
    $("body").append(returnTop);
    var returnTopFn = function () {
        var st = $(document).scrollTop();
        (st > expPoint)? returnTop.show(): returnTop.hide();
    };
    $(window).on("scroll",returnTopFn);//监听页面滚动，控制return-top是否显示
}