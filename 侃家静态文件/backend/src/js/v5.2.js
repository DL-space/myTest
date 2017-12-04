$(function () {
    $(document).on("click", ".v-label .ico-del2", function () {
        $(this).parent("li").remove();
    });

    $("input[name='action-sel']").change(function () {
        $(".mod4-hxdz .action-" + $("input[name='action-sel']:checked").attr("data-action")).show().siblings(".con").hide();
    });

    var screenWidth = document.body.clientWidth;
    var screenHeight = document.body.clientHeight;
    var dialogWidth = 0;
    if (screenWidth < 600) {
        dialogWidth = (screenWidth * 0.9) + "px";
    } else {
        dialogWidth = "600px";
    }

    function setDialogMaxHeight() {
        $(".dialog").css({
            "max-height": screenHeight * 0.9,
            "overflow-y": "auto"
        });
    }

    //不满足提交条件的提示弹层
    $(document).on("click", ".btn-tj1", function () {
        popup($(".wd-tj").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //不满足提交条件的提示弹层2
    $(document).on("click", ".btn-tj2", function () {
        popup($(".wd-tj2").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //不满足提交条件的提示弹层3
    $(document).on("click", ".btn-tj3", function () {
        popup($(".wd-tj3").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //修改客户基本信息
    $(document).on("click", ".btn-customer", function () {
        popup($(".dialog-customer-info").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //再次发送信息给客户
    $(document).on("click", ".btn-send-again", function () {
        popup($(".dialog-send-again").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //修改本次预约
    $(document).on("click", ".btn-modify", function () {
        popup($(".modify-appointment").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //修改下次预约
    $(document).on("click", ".btn-modify-next", function () {
        popup($(".modify-appointment-next").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //不满足提交条件的提示弹层3
    $(document).on("click", ".btn-wd", function () {
        popup($(".dialog-wd").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //接单记录提示弹层
    $(document).on("click", ".btn-order", function () {
        popup($(".dialog-order").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })
    //问答：展示更多与收起
    $(".wd-action").each(function () {
        var showMore = $(this).children(".show-more");
        showMore.click(function () {
            var wdDetail = $(this).parents(".wd-action").siblings(".wd-da").children(".wd-detail");
            if (showMore.hasClass("show-hide")) {
                console.log(1);
                showMore.removeClass("show-hide");
                wdDetail.addClass("wd-hide");
                showMore.text("展开全部");
            } else {
                console.log(2);
                showMore.addClass("show-hide");
                wdDetail.removeClass("wd-hide");
                showMore.text("收起");
            }
        });
    });

    //其他城市弹层
    var isInner = true;
    $('.nbdzs').mouseover(function () {
        if (isInner) {
            $(this).children(".trans-layer").show();
        }
        isInner = false;
    }).mouseleave(function () {
        $(this).children(".trans-layer").hide();
        isInner = true;
    });

    //展示与隐藏全部预约信息
    $(".link-all-yy").click(function () {
        var firstChangePlanInfo = $(".change-plan-info:first");
        var allChangePlanInfo = $(".change-plan-info");
        if (firstChangePlanInfo.is(":hidden")) {
            allChangePlanInfo.show();
            $(this).text("隐藏全部预约信息");
        } else {
            allChangePlanInfo.hide();
            $(this).text("展示全部预约信息");
        }
    });

    //展示与隐藏全部问答信息

    var isAll = 0;
    $(".link-all-wd").click(function () {
        if (isAll) {
            $(this).text("展示全部问答信息");
            $(".wd-detail").each(function () {
                $(this).addClass("wd-hide");
                $(this).parents(".wd-da").next(".wd-action").children(".show-more").removeClass("show-hide");
                $(this).parents(".wd-da").next(".wd-action").children(".show-more").text("展开全部");
            });
            isAll = 0;
        } else {
            $(this).text("隐藏全部问答信息");
            $(".wd-detail").each(function () {
                $(this).removeClass("wd-hide");
                $(this).parents(".wd-da").next(".wd-action").children(".show-more").addClass("show-hide");
                $(this).parents(".wd-da").next(".wd-action").children(".show-more").text("收起");
            });
            isAll = 1;
        }
    });

    //tooltip提示优化
    /*$(".v-khxxq .c-query li .txt").tooltip();*/
    $(".v-khxxq .c-query li .txt,.wd-order .txt").hoverMsg();



    //带看楼盘拖拽效果
    var byId = function (id) {
        return document.getElementById(id);
    }
    if ($("#handle-lp").length > 0) {
        Sortable.create(byId('handle-lp'), {
            handle: '.handle-drag',
            animation: 150
        });
    }
});

/*添加范围*/
$(function () {
    $(document).on("click", '.qz', function () {
        if (!($(this).hasClass('fw'))) {
            var qx_html = '<input type="text" class="form-control"><span class="ext">-</span>';
            $(this).siblings('.td-jg').prepend(qx_html);
            $(this).text('取消范围');
            $(this).toggleClass('fw');
        } else {
            var tj_html = '<input type="text" class="form-control"><span class="ext">万</span>';
            $(this).siblings('.td-jg').html(tj_html);
            $(this).text('添加范围');
            $(this).toggleClass('fw');
        }
    })
})

/*上移*/
$(document).on("click", ".dk-lp li .btn-sy", function () {
    var that = $(this);
    var parentLi = that.parents("li");
    var numThis = parentLi.find(".num").text();
    var numPre = parentLi.prev().find(".num").text();
    var btnArea = $(".dk-lp").find(".btn-area").prop("outerHTML");
    parentLi.find(".num").text(parseInt(numPre));
    parentLi.prev().find(".num").text(parseInt(numThis));
    if (parentLi.index() == 1) {
        parentLi.insertBefore(parentLi.prev()).find(".btn-area").remove();
        $(btnArea).prependTo(parentLi.next());
        //parentLi.next().append(btnArea);
    } else {
        parentLi.insertBefore(that.parents("li").prev());
    }
});
/*新增楼盘*/
$(document).on("click", ".dk-lp .add-lp .btn-add", function () {
    var that = $(this);
    var addLp = that.parents(".add-lp");
    var lpName = addLp.find("input").val();
    var appendItem = $(".add-html").children("li").clone();
    var lpNum = $(".dk-lp > li:not([class='add-lp'])").length;
    appendItem.find(".num").text(lpNum + 1);
    appendItem.find(".name").text(lpName);
    appendItem.insertBefore(addLp);
    addLp.find("input").val("");
});
/*新增问答*/
$(document).on("click", ".wd-list .btn-add", function () {
    var that = $(this);
    var btnArea = that.parents(".btn-area");
    var appendItem = $(".add-html").find(".wd-item").clone();
    var appendItemNum = $(".wd-list").find(".wd-item").length;
    appendItem.find(".wd-num").text(appendItemNum + 1);
    appendItem.insertBefore(btnArea);
});
$(document).on("click", ".wd-list .btn-del", function () {
    var that = $(this);
    var btnArea = that.parents(".btn-area");
    btnArea.prev().remove();
});
/*title展示效果优化*/
(function($){
    $.fn.extend({
        hoverMsg:function(){
            $(this).each(function () {
                var that = $(this);
                if(typeof(that.attr("title")) !== "undefined"){
                    that.attr("data-hover-msg",that.attr("title"));
                    that.attr("title","");
                }
            });
            $("[data-hover-msg]").each(function () {
                var that =$(this);
                that.hover(function () {
                    var screenWidth = $(window).width();
                    var title = that.attr("data-hover-msg");
                    var thatWidth = that.outerWidth();
                    var x = that.position();
                    var thatLeft = x.left;
                    var thatTop = x.top;
                    that.after('<div class="hover-msg">'+title+'</div>');
                    var msgWidth = that.siblings(".hover-msg").outerWidth();
                    var overWidth = (msgWidth-thatWidth)/2;
                    var msgLeft;
                    if(overWidth>(screenWidth-thatWidth-thatLeft)){
                        msgLeft = screenWidth-msgWidth
                    }else{
                        msgLeft = thatLeft-overWidth;
                    }
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
