/**
 * Created by DL on 2017/8/24.
 */
;(function($){
    $.fn.extend({
        hoverMsg:function(){
            $(this).each(function () {
                var that = $(this);
                if(typeof(that.attr("title")) !== "undefined"){
                    that.attr("data-hover-msg",that.attr("title"));
                    that.attr("title","");
                }
            });
            /*$("[data-hover-msg]").each(function () {
                var that =$(this);
                var title = that.attr("data-hover-msg");
                var thatWidth = that.outerWidth();
                var thatLeft = that.offset().left;
                var thatTop = that.offset().top;
                that.hover(function () {
                    that.after('<div class="hover-msg">'+title+'</div>');
                    var msgWidth = that.siblings(".hover-msg").outerWidth();
                    var msgLeft = thatLeft-(msgWidth-thatWidth)/2;
                    var msgTop = thatTop-30;
                    that.siblings(".hover-msg").css({
                        left:msgLeft,
                        top:msgTop
                    })
                },function () {
                    that.siblings(".hover-msg").remove();
                })
            })*/
            $("[data-hover-msg]").each(function () {
                var that =$(this);
                that.hover(function () {
                    var title = that.attr("data-hover-msg");
                    var thatWidth = that.outerWidth();
                    var x = that.position();
                    var thatLeft = x.left;
                    var thatTop = x.top;
                    that.after('<div class="hover-msg">'+title+'</div>');
                    var msgWidth = that.siblings(".hover-msg").outerWidth();
                    var msgLeft = thatLeft-(msgWidth-thatWidth)/2;
                    var msgTop = thatTop-30;
                    that.siblings(".hover-msg").css({
                        left:msgLeft,
                        top:msgTop
                    })
                },function () {
                    that.siblings(".hover-msg").remove();
                })
            })
        }
    });
})(jQuery);