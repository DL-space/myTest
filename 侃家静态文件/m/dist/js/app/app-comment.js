$(function(){!function(i){$(".review").each(function(){$(this).find(".pic-area").children("li:gt("+i+")").hide()})}(2),function(){$(".review").each(function(){var i=$(this),e=i.find(".detail"),t=parseInt(e.css("max-height")),h=parseInt(e[0].scrollHeight),s=i.find(".pic-area li"),n=s.size(),a=i.find(".show-more");(h>1.2*t||n>3)&&a.show(),a.on("click",function(){$(this).hasClass("show-more-display")?($(this).siblings(".pic-area").children("li:gt(2)").hide(),a.removeClass("show-more-display"),e.removeClass("detail-more")):($(this).siblings(".pic-area").children("li:gt(2)").show(),a.addClass("show-more-display"),e.addClass("detail-more"))})})}()}),$(function(){function i(i,e){var t=i.width(),h=i.height(),s=t/h;return e.each(function(){var i=$(this),e=new Image;e.src=i.attr("src");var n=e.width,a=e.height,c=n/a;n>t||a>h?c>s?(i.width("100%"),i.height("auto")):(i.width("auto"),i.height("100%")):n<=t&&a<=h&&(i.width(n),i.height(a))}),e}function e(e){var s=e.children("img").clone();t.show();var n=i(t,s);h.append(n);var a=parseInt(n.css("width")),c=parseInt(n.css("height")),r=$(window).width(),o=$(window).height();if(100===a||0===c){a=-r/2;c=-$(".shade-content").height()}else 0===a||100===c?(h.css("width",r),h.css("height",o),c=-o/2,a=-(r-60)/2):(c=-c/2,a=-a/2);h.css("marginTop",c).css("marginLeft",a).show()}var t=$(".shade"),h=$(".shade-content");$(".shade-h>a");$(".pic-area li").click(function(){e($(this))}),$(".journey .face").click(function(){e($(this))}),t.click(function(){t.hide(),h.hide().html("").removeAttr("style")}),h.click(function(){t.hide(),h.hide().html("").removeAttr("style")})});