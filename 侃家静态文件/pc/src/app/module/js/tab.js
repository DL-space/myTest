//tab切换
var tab = $(".tab");
tab.each(function () {
    var _item = $(this);
    var $div_li = _item.children(".tab-t").find("li");
    var $div_con = _item.children(".tab-c");
    var firstLiCls = $div_li.eq(0);
    $div_li.each(function () {
        if ($(this).hasClass("on")) {
            var index = $div_li.index(this);
            $div_con.find(".nrpart")
                .eq(index)
                .show()
                .siblings(".nrpart")
                .hide();

            $div_li.hover(function () {
                $(this).addClass("on")
                    .siblings("li").removeClass("on");
                index = $div_li.index(this);
                $div_con.find(".nrpart")
                    .eq(index)
                    .show()
                    .siblings(".nrpart")
                    .hide();
            });
        }else if($(this).hasClass("t-sel")){
            var index = $div_li.index(this);
            $div_con.find(".nrpart")
                .eq(index)
                .show()
                .siblings(".nrpart")
                .hide();
            $div_li.click(function(){
                $(this).addClass("t-sel")
                    .siblings("li").removeClass("t-sel");
                index = $div_li.index(this);
                $div_con.find(".nrpart")
                    .eq(index)
                    .show()
                    .siblings(".nrpart")
                    .hide();
            });

        }
    });
});


