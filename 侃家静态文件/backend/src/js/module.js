/**
 * Created by DL on 2017/11/14.
 */
$(".j-ipt").focus(function () {
    $(this).addClass("focused")
});
$(".j-ipt").blur(function () {
    $(this).removeClass("focused")
});
$(document).on("click",".j-check-box[data-action!='disabled']",function () {
    $(this).toggleClass("checked")
});
$(document).on("click",".j-radio[data-action!='disabled']",function () {
    $(this).addClass("checked");
    $(this).siblings(".j-radio").removeClass("checked")
});
/*
$(".j-select").each(function () {
    var that = $(this),
        content = that.find(".content"),
        option = that.find(".option"),
        optionItem = option.find("li");
    content.click(function () {
        option.is(":hidden")?option.slideDown(200,function () {
            $(document).on("click",function(e){
                var target = $(e.target);
                if(target.closest(that).length == 0){
                    option.slideUp(200);
                }
            })
        }):option.slideUp(200)
    });
    optionItem.click(function () {
        var text = $(this).text();
        option.slideUp(200);
        content.attr("value",text);
    });
});*/
$(document).on("click",".j-select .content",function () {
    var that = $(this),
        option = that.siblings(".option").clone(true),
        w = that.outerWidth(),
        h = that.outerHeight(),
        f = that.offset().left,
        t = that.offset().top+h,
        optionItem = option.find("li");
    if($(".appendOption").length ==0 ){
        $("body").append(option.addClass("appendOption").css({
            position:"absolute",
            top:t,
            left:f,
            width:w
        }));
        $(".appendOption").slideDown(200);
    }else{
        option.slideUp(200,function () {
            $(".appendOption").remove();
        });
    }
    optionItem.click(function () {
        var text = $(this).text();
        option.slideUp(200,function () {
            $(".appendOption").remove();
        });
        that.prop("value",text);
        that.attr("value",text);
    });
});
