function change(e){var t=e,i=$(".search-wrap"),n=i.find(".selector"),o=n.find(".hide-area"),c=i.find(".btn");c.on("click",function(){1==t?change(0):0==t&&change(1)}),1==t?(c.find(".ico").removeClass("ico-hide").addClass("ico-show"),c.find(".text").text("展开"),o.hide()):0==t&&(c.find(".ico").removeClass("ico-show").addClass("ico-hide"),c.find(".text").text("收起"),o.show())}$(function(){change(1)}),$(function(){$(".col3 .qyxz").length>0&&$(".col3 .qyxz").pin({containerSelector:".row-fixed",padding:{top:56}}),$(".house-item").each(function(){var e=$(this),t=e.find(".attention"),i=e.find(".pro-comment");0!=t.length&&""!=t.text()||i.css({float:"none"})}),$(".advice-free").prev(".house-item").css({"border-bottom":"0"}),$(".o-list li").each(function(e){for(var t=$(this).height(),i=$("a",$(this)).eq(0);i.outerHeight()>t;)i.text(i.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/,"..."))})});