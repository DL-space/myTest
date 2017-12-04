$(function () {
    $('.tip-box').each(function () {
        var txtWidth = $(this).children(".ico-tips").width();
        $(this).children(".tips").css({
            left: (txtWidth) + "px"
        });
    });

    $(".ico-tips").hover(function () {
        $(this).next(".tips").children(".help-tips").show();
    }, function () {
        $(this).next(".tips").children(".help-tips").hide();
    });

    //右侧订阅信息
    $(".sub-list li").each(function () {
        var _item = $(this);
        var isSel = _item.children(".ico");
        _item.click(function () {
            if (isSel.hasClass("ico-check")) {
                isSel.removeClass("ico-check").addClass("ico-check-on");
            } else {
                isSel.removeClass("ico-check-on").addClass("ico-check");
            }
        });
    });

    /*点评展开*/
    pd();


    //咨询师点评：显示与隐藏更多
    $(document).on("click", $(".show-more a"), function (e) {
        /*判断*/
        if ($(e.target).parent().parent()[0].className == "show-more") {
            var dpDetail = $(e.target).parents(".dp-detail");
            var dataDetail = dpDetail.find(".data-detail");
            var dataShort = dpDetail.find(".data-short");
            if (dataShort.is(":visible")) {
                dataDetail.show();
                dataShort.hide();
                $(e.target).text("收起全文");
            } else if (dataDetail.is(":visible")) {
                dataShort.show();
                dataDetail.hide();
                $(e.target).text("查看全文");
            }
        }
    });
    // 切换 div
    $('.als .more').click(function () {
        $(this).parent('.content').find('.text').toggle();
        $(this).parent('.content').find('.text-more').toggle();
        $(this).find(".show-more").toggle();
        $(this).find('.hide-more').toggle();
    })
    //滚动条美化
    var cjpjDetail = $(".cjpj-detail");
    var zbFx = $(".zb-fx");
    var zbList = $(".zb-list");
    if (cjpjDetail.length > 0 || zbFx.length > 0 || zbList.length > 0) {
        $(".cjpj-detail .content,.zb-fx .inn").mCustomScrollbar();
    }

    /**
     * 买房成交互动
     * 只有当前展示信息为咨询师点评的时候，"咨询师 他们不是你见过的那种房产经纪人"模块
     */
    $(".tab-comment .tab-t li").click(function () {
        if ($(".tab-comment .tab-t li:first").hasClass("t-sel")) {
            $(".row-constant").show();
        } else {
            $(".row-constant").hide();
        }
    });
    /*写点评*/
    var p_cmt = $('.p-cmt');
    var user_chk = p_cmt.find(".user-chk");
    user_chk.each(function () {
        var that = $(this);
        that.on("click",function () {
            that.toggleClass("user-chk-on");
            that.siblings().removeClass("user-chk-on");
        })
    });
    /*咨询师切换*/
    $(".cons-list li").hover(function () {
        $(this).find(".thumb-default").hide(0);
        $(this).find(".thumb-humor").show(0);
        $(this).find(".consultant-info").hide(0);
        $(this).find(".consultant-info-hover").show(0);
    },function () {
        $(this).find(".thumb-default").show(0);
        $(this).find(".thumb-humor").hide(0);
        $(this).find(".consultant-info").show(0);
        $(this).find(".consultant-info-hover").hide(0);
    })
    /*搜索*/
    $(document).on("click",".search-area .ipt",function () {
        $(this).siblings(".option").show(0,function () {
            /*点击其他区域*/
            $(document).click(function (e) {
                var _con = $(".search-area");   // 设置目标区域
                if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                    $(".option").hide(0)
                }
            });
        });
    });

    /*代码移入c-common.js
     $(document).on("click",".option li",function () {
        if(!$(this).hasClass("title")){
            $(this).parents(".ipt-area").find(".ipt").val($(this).text());
            $(this).parents(".option").hide(0);
        }
     });
     $(".search-area .ipt").on("input",function () {
     var that = $(this);
     var myReg = /^[\u4e00-\u9fa5]+$/;
     var option = that.siblings(".option");
     var val = that.val();
     if(val.length>0&&myReg.test(val)){
     option.find('.option-3').find("li").not(".title").remove();
     option.find('.option-3').find(".title").hide(0);
     option.addClass("ipd");
     searchByIndexOf(val);
     // renderResult(resultList,val);
     }else if(val.length==0){
     option.removeClass("ipd")
     option.find(".title").show(0);
     }
     });*/
});
function pd() {
    var user_cmt = $(".user-cmt");
    user_cmt.each(function () {
        var that = $(this);
        var cmt_detail = that.find(".cmt-detail");
        var cssHeight = parseInt(cmt_detail.css("max-height"));
        var relHeight = parseInt(cmt_detail[0].scrollHeight);
        var dp_showMore = that.find(".show-more");
        var dp_detail = that.find(".cmt-detail");
        if (relHeight > cssHeight * 1.2) {
            dp_showMore.show();
        }
        var wz = false;
        dp_showMore.on("click", function () {
            dp_showMore.toggleClass("hide-more");
            dp_detail.toggleClass("news-show");
            if (!dp_showMore.hasClass('hide-more')) {
                $(this).children('.ico-showmore').children('a').text('查看全文');
            } else {
                $(this).children('.ico-showmore').children('a').text('收起全文');
            }

        });
    });
}
//模拟ul
$(document).ready(function () {
    $('.son-ul').hide(); //初始ul隐藏
    $(document).on("click", ".select-box .txt", function () {
        var sonUl = $(this).parent().find('ul.son-ul');
        if (sonUl.is(":hidden")) {
            sonUl.slideDown();  //找到ul.son_ul显示
            $(this).children(".ico").removeClass("ico-triangle").addClass("ico-triangle2");
            $(this).parent().find('li').hover(function () {
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            });
            $(this).parent().hover(function () {
                    $(this).children(".ico").removeClass("ico-triangle").addClass("ico-triangle2");
                },
                function () {
                    sonUl.slideUp();
                    $(this).parent().find('.ico').removeClass("ico-triangle2").addClass("ico-triangle");
                }
            );
        } else {
            sonUl.slideUp();
            $(this).find('.ico').removeClass("ico-triangle2").addClass("ico-triangle");
        }
    });

    $('ul.son-ul li').click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents('li').find('.text').text($(this).text());
        $(this).parents('li').find('ul').slideUp();
        $(this).parents('li').find('.ico').removeClass("ico-triangle2").addClass("ico-triangle");
    });

    //2017.1.3 写点评页删除添加图片效果
    $(document).on("click",".up-pic-list .btn-del",function(){
        $(this).parent("li").remove();
    });
});
/*上传按钮美化*/
var input_choose_file = $(".input-choose-file");
var input_file = $(".input-file");
input_choose_file.on("click", function () {
    input_file.trigger("click");
});
var $a = $(".a");
window.onload = function () {
    var a = 1 ;
};
/*/!*模糊搜索*! 代码移入c-common.js/
function searchByIndexOf(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    var len = list.length;
    var arr = [];
    for(var i=0;i<len;i++){
        if(list[i].indexOf(keyWord)>=0){
            arr.push(list[i]);
        }
    }
    return arr;
}
 function renderResult(list,name){
    list = JSON.parse(list);
    if(!(list instanceof Array)){
        list = [];
    }
    var len = list.length;
    var item = null;
    if(len <= 0){
        $(".search-area .ipt").siblings(".option").removeClass("ipd");
    }else{
        $(".option .option-3").find("li").not(".title").remove();
        $(".option .option-3").find(".title").show(0);
        $(".option .option-3").find(".title .name").text(name);
        $(".option .option-3").find(".title .num").text("约"+len+"条");
        for(var i=0;i<len;i++){
        item = $('<li><a href="/project/'+list[i]['project_id']+'.html"></a></li>');
        item.find("a").html(list[i]['project_name']);
        $(".option .option-3").append(item);
        }
    }
 }
var houses = ["中骏房产","中东房产","中骏房地","静兰房产"];*/
/*定住查看全部楼盘*/
if($(".ckqb").length>0){
    $(window).on("scroll",function () {
        var scrollTop = $(window).scrollTop();
        var fixedHeight = $(".top-menu-banner").outerHeight();
        var hMax = $(".row-constant").offset().top+$(".row-constant").outerHeight();
        if(toTop-scrollTop-fixedHeight<0&&scrollTop-hMax<-($(".ckqb").outerHeight()+fixedHeight)){
            $(".ckqb").addClass("fixed");
        }else{
            $(".ckqb").removeClass("fixed")
        }
    });
    var toTop = $(".ckqb").offset().top;
}
