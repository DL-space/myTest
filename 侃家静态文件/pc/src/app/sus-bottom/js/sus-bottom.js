/**
 * Created by DL on 2017/7/7.
 */
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
            var menuItem = self.find(".tab-menu>div");
            menuItem.bind( options.event, function(){
                menuItem.removeClass("active");
                $(this).addClass("active");
                tabItem.removeClass("active");
                tabItem.eq($(this).index()).addClass("active");
            });
            return this;
        }
    });
})(jQuery);
$(function () {
    if($(".sus-bottom").length > 0){
        $(".sus-bottom").tabChange();
        $(".return-top").on("click",function () {
            $('body,html').animate({scrollTop: 0}, "200");
            return false;
        })
    }
});
