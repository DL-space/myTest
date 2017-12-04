$(function(){
    //初始化swiper
    if ( $(".swiper-container").length > 0 ) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: "auto",
            paginationClickable: true,
            freeMode: true
        });
    }
    /*基本信息展开*/
    var showMore = $(".mod-base").find(".show-more");
    var mainInfo = $(".mod-base").find(".main-info");
    var address = $(".mod-base").find(".address");
    showMore.on("click",function () {
        if(mainInfo.is(":hidden")){
            mainInfo.show();
            showMore.find("a").text("收起信息");
            address.addClass("zk");
        }else{
            mainInfo.hide();
            showMore.find("a").text("更多信息");
            address.removeClass("zk");
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
    /*删除上传照片*/
    var pic_area = p_cmt.find(".pic-area");
    pic_area.each(function () {
        var that = $(this);
        var close_img = that.find(".ico-close2");
        close_img.on("click",function () {
            that.remove();
        })
    });
    /*周边*/
    var p_map = $(".p-map");
    var map_change = p_map.find(".map-change");
    var ico = map_change.find(".ico");
    var map_layer = p_map.find(".map-layer");
    var close_map_layer = map_layer.find(".close");
    ico.on("click",function () {
        var that = $(this);
        if(that.hasClass("ico-list")){
            that.removeClass("ico-list").addClass("ico-map");
            map_layer.show();
        }else{
            that.removeClass("ico-map").addClass("ico-list");
            map_layer.hide();
        }
    });
    close_map_layer.on("click",function () {
        ico.removeClass("ico-map").addClass("ico-list");
        map_layer.hide();
    });
    //tab切换
    tab_qh();
    /*点击放大*/
    var user_cmt = $(".user-cmt").find("li");
    var p_detail = $(".p-house-type-detail");
    var p_detail_img = p_detail.find(".main_image li");
    fd(user_cmt);
    fd(p_detail_img);
    /*上传照片*/
    var btn_add_pic = $(".btn-add-pic");
    var input_file = $(".input-file");
    btn_add_pic.on("click",function () {
        input_file.trigger("click");
    });
});
/*点评展开*/
function pd() {
    var user_cmt = $(".user-cmt");
    user_cmt.each(function () {
        var that = $(this);
        var cmt_detail = that.find(".cmt-detail");
        var cssHeight = parseInt(cmt_detail.css("max-height"));
        var relHeight = parseInt(cmt_detail[0].scrollHeight);
        var dp_showMore = that.find(".show-more");
        var dp_detail = that.find(".cmt-detail");
        if(relHeight > cssHeight*1.2){
            dp_showMore.show();
        }
        dp_showMore.on("click",function () {
            dp_showMore.toggleClass("xz");
            dp_detail.toggleClass("zk");
        })
    });
}
/*tab切换*/
function tab_qh() {
    var tab = $(".tab");
    tab.each(function () {
        var _item = $(this);
        var $div_li = _item.children(".tab-t").find("li");
        var $div_con = _item.children(".tab-c");

        $div_li.each(function () {
            if($(this).hasClass("t-sel")){
                var index = $div_li.index(this);
                $div_con.find(".nrpart")
                    .eq(index)
                    .show()
                    .siblings(".nrpart")
                    .hide();
                pd();
            }
            $div_li.click(function(){
                $(this).addClass("t-sel")
                    .siblings("li").removeClass("t-sel");
                index = $div_li.index(this);
                $div_con.find(".nrpart")
                    .eq(index)
                    .show(0,pd())
                    .siblings(".nrpart")
                    .hide();
            });
        });
    });
}
/*点击放大*/
function fd(i) {
    var item = i;
    var pop = $(".pop");
    var fade = $(".fade");
    item.each(function () {
        var that = $(this);
        var item_img = that.find("img");
        var img_src = item_img.attr("src");
        item_img.on("touchstart",function (e) {
            if($(".focus").length > 0){//存在轮播结构
                clearInterval(timer);
            }
            var startX = e.originalEvent.changedTouches[0].pageX;
            item_img.on("touchend",function (e) {
                var EndX = e.originalEvent.changedTouches[0].pageX;
                if((EndX-startX)==0){
                    pop.find("img").attr("src",img_src);
                    pop.show();
                    fade.show();
                    window.scrollTop = 0;
                    if($(".focus").length > 0){//存在轮播结构
                        clearInterval(timer);
                    }
                }else{
                    if($(".focus").length > 0){
                        clearInterval(timer);
                        timer = setInterval(function () {
                            $("#btn_next").click();
                        }, 5000);
                    }
                }
            })
        });
    });
    fade.on("touchend",function () {
        pop.hide();
        fade.hide();
        if($(".focus").length > 0){
            clearInterval(timer);
            timer = setInterval(function () {
                $("#btn_next").click();
            }, 5000);
        }
    });
}
/*弹出层轮播*/
/*
$(function () {
    var $focu_s = $('.main_image ul li');
    var $pichead_s= $('.pichead-s');
    var $carousel = $('.carousel');
    var $swiper_slide = $('.swiper-container2').find('.swiper-slide');
    // 判断图片数量 == 1 时候 不操作
    if($swiper_slide.length == 1){
        $swiper_slide.addClass('swiper-no-swiping');
    };

    $focu_s.on("touchstart",function (e) {
        if($(".focus").length > 0){//存在轮播结构
            clearInterval(timer);
        }
        var startX = e.originalEvent.changedTouches[0].pageX;
        $focu_s.on("touchend",function (e) {
            var EndX = e.originalEvent.changedTouches[0].pageX;
            if((EndX-startX)==0){
                // 获取到索引
                var index = $(this).index();
                // 显示div
                $carousel.show();
                // 调用插件
                var swiper2 = new Swiper('.swiper-container2', {
                    pagination : '.swiper-pagination',
                    paginationType : 'fraction',
                    slidesPerView: "auto",
                    initialSlide:index,
                    loop: true
                });
                swiper2.slideTo(index, 0, false);
                window.scrollTop = 0;
                if($(".focus").length > 0){//存在轮播结构
                    clearInterval(timer);
                }
            }else{
                if($(".focus").length > 0){
                    clearInterval(timer);
                    timer = setInterval(function () {
                        $("#btn_next").click();
                    }, 5000);
                }
            }
        })
    });

    $pichead_s.on("click",function () {
        $carousel.hide();
    });
});*/
/*展开隐藏*/
function showHide() {
    var media_sh = $(".media-sh");
    media_sh.each(function () {
        var that = $(this);
        var detail = that.find(".detail");
        var cssHeight = parseInt(detail.css("max-height"));
        var relHeight = parseInt(detail[0].scrollHeight);
        var dp_showMore = that.find(".show-more");
        var dp_detail = that.find(".detail");
        if(relHeight > cssHeight*1.2){
            dp_showMore.show();
        }
        dp_showMore.on("click",function () {
            dp_showMore.toggleClass("xz");
            dp_detail.toggleClass("zk");
        })
    });
}
$(function () {
    showHide();
});

/*收藏8.31去掉，php加判断自己写这个效果*/
/*$(document).on("click",".collect",function () {
    var that = $(this);
    var text = that.find("p");
    var ico = that.find(".ico");
    ico.toggleClass("ico-heart-on");
    if(text.text() == "收藏"){
        text.text("已收藏");
    }else{
        text.text("收藏");
    }
});*/

$(document).on("click",".show-hide .show-more",function () {
    var that = $(this);
    shCommon(that);
});
function shCommon(i) {
    var that = i;
    var showHide = that.parents(".show-hide");
    var changeArea = showHide.find(".change-area");
    changeArea.toggleClass("change-show");
    that.toggleClass("hide-more");
}
