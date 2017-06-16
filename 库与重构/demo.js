/**
 * Created by DL on 2017/6/13.
 */
/**
 * 展示与隐藏（委托适应ajax动态加载）
 * 父容器：show-hide
 * 显示隐藏区域：change-area(显示：change-show)
 * 控制按钮：show-more(展开：show-more-open)
 */
$(document).on("click",".show-hide .show-more",function () {
    var that = $(this);
    var showHide = that.parents(".show-hide");
    var changeArea = showHide.find(".change-area");
    changeArea.toggleClass("change-show");
    that.toggleClass("show-more-open");
});
/**
 * 弹框
 */
/*打开弹框*/
function showBox(option) {
    //打开遮罩
    $("body").append("<div class='fade-back'></div>").addClass("has-fade");
    //显示弹层
    option.fadeItem.addClass("fade-in");
    if(option.animate){
        option.fadeItem.addClass("animate " + option.animate)
    }
}
/*关闭弹框*/
function closeBox(fade) {
    $("body").removeClass("has-fade");
    $(".fade-back").remove();
    fade.removeClass("fade-in");
}

$(function () {
    //弹框
    $(".btn-fade1").on("click",function () {
        showBox({
            fadeItem : $(".fade1"),
            animate: "animate-fade-in"
        });
    });
    $(".btn-fade2").on("click",function () {
        showBox({
            fadeItem : $(".fade2"),
            animate: "animate-fade-down"
        });
    });
    //关闭弹框
    $(document).on("click",".fade .btn-cancel",function () {
        var fade = $(this).parents(".fade");
        closeBox(fade);
    });
    //tab切换
    $(".tab-hover").tabChange();
    $(".tab-click").tabChange({
        event: 'click'
    });
});

/**
 *tab切换(默认hover)
 */
(function($){
    $.fn.extend({
        tabChange:function(options){
            //默认参数
            var defaults = {
                event : 'mouseover'
            };
            //参数合并
            options = $.extend({},defaults,options);
            var self = $(this);
            var tabItem = self.find(".tab-content>div");
            //var menu = self.find(".tab-menu");
            var menuItem = self.find(".tab-menu>li");
            menuItem.bind( options.event, function(){
                menuItem.removeClass("active");
                $(this).addClass("active");
                tabItem.addClass("hide");
                tabItem.eq($(this).index()).removeClass("hide");
            });
            return this;
        }
    });
})(jQuery);
