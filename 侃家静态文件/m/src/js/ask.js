$(function () {
    if ($(".ask-list .filter").length > 0) {
        var swiperNav = new Swiper('.swiper-nav', {
            direction: "horizontal",
            slidesPerView: "auto",
            freeMode: true
        });
        var toTop = 0;
        if ($(".topbar").length > 0) {
            toTop = $(".topbar").height();
            $(".topbar .ico-close").unbind("click").click(function () {
                $(".topbar").hide(function () {
                    $(".filter").attr("style", "").unwrap(".pin-wrapper").pin();
                    $(window).scroll();
                });
                $('.header03').animate({'top':'0'});
                $(".container").animate({"padding-top": "0"});
            })
        }
        $(".filter").pin({
            padding: {
                top: toTop
            }
        });
        window_scroll($(".ask-list .filter"))
    }

    $(document).on("input",".dialog-ask input.ipt",function(){
        var iptLength = $(this).val().toString().length;
        if(iptLength > 0){
            $(this).siblings(".btn-area").children(".btn-find").css({
                "opacity":1
            }).attr("disabled",false);
        }else{
            $(this).siblings(".btn-area").children(".btn-find").css({
                "opacity":0.7
            }).attr("disabled",true);
        }
    });
    // 问答详情页js 效果
    if ($(".ask-wtop").length > 0) {
        var toTop = $(".header03").height();
        if ($(".topbar").length > 0) {
            toTop = $(".topbar").height() + $(".header03").height();
            $(".topbar .ico-close").unbind("click").click(function() {
                $(".topbar").hide(function() {
                    $(".ask-wtop").attr("style", "").unwrap(".pin-wrapper").pin({
                        padding: {
                            top: $(".header03").height()
                        }
                    });
                    $(window).scroll()
                });
                $('.header03').animate({'top':'0'});
                $(".container").animate({
                    "padding-top": "0"
                });
            })
        }
        $(".ask-wtop").pin({
            padding: {
                top: toTop
            }
        });

        window_scroll($(".ask-wtop"))
    }

    // 页面加载完成后在执行！
    jQuery(window).load(function(){
        /*下拉功能*/
        if($('.ask-d .ask-wcont').length > 0){
            // 按钮
            var $show_more = $('.ask-show-more');
            var $show_hide = $('.ask-show-hide');
            var $show_hide02 = $('.ask-footer-center .sq');
            // 内容
            var $ask_wcont = $('.ask-d .ask-wcont');
            // 蒙层
            var $ask_mask = $('.ask-mask');
            // 固定底部
            var $ask_footer_fixed = $(".ask-footer-fixed");


            // 判断是否显示蒙层
            var wcont_height = $ask_wcont[0].offsetHeight;
            // 获取根节点字体大小！
            var $html_font = $('html').css('font-size');
            $html_font = parseFloat($html_font).toFixed(2);
            var $wcont_maxHeight =  10 * $html_font;

            if (wcont_height >= $wcont_maxHeight) {
                $ask_mask.show();
                $show_more.show()
            } else {
                $ask_mask.hide();
                $show_more.hide()
            }

            // 点击展开更多
            $show_more.click(function() {
                $ask_mask.hide();
                $show_more.hide();
                $ask_wcont.css('max-height', 'none');
                $show_hide.show();
                changePoistion($ask_wcont)

            })
            // 点击收起
            $show_hide.click(function() {
                $ask_mask.show();
                $show_more.show();
                $ask_wcont.css('max-height', '10rem');
                $show_hide.hide()
            })
            $show_hide02.click(function () {
                $ask_mask.show();
                $show_more.show();
                $ask_wcont.css('max-height', '10rem');
                $show_hide.hide();
                $ask_footer_fixed.fadeOut();
            })


            $(window).scroll(function() {
                if (!$show_hide.is(":hidden")) {
                    changePoistion($ask_wcont);
                }
            });

            function changePoistion(item) {
                // 判断 item 是否存在
                if(item.length == 0){
                    return false;
                }else {
                    var wScrollHeight = $(window).scrollTop(); //页面滚动高度
                    var thisTopHeight = item.offset().top; //item距离顶部高度
                    var thisHeight = item.outerHeight(); //item高度
                    var wHeight = $(window).height(); //屏幕高度
                    var bottomHeight = (wScrollHeight + wHeight) - (thisTopHeight + thisHeight);
                    var topHeight = wScrollHeight + wHeight - thisTopHeight;
                    if (bottomHeight > 0 || topHeight < 100) {
                        $ask_footer_fixed.fadeOut();
                    } else {
                        $ask_footer_fixed.fadeIn()
                    }
                }
            }
        }
    });

    /*回顶部*/
    $(".ask-wtop").on("click", function () {
        $('body,html').animate({scrollTop: 0}, "200");
        return false;
    });

    function window_scroll(that) {
        $(window).scroll(function () {
            if(that.css("position") == "fixed"){
                that.addClass("shadow");
            }else{
                that.removeClass("shadow");
            }
        })
    }


})
/**
 * 弹层
 * @param type number 弹层类型 1:页面类型
 * @param content string 弹层内容
 * @param area string 弹层尺寸
 * @param fun_success function 点击确认按钮事件
 * @param fun_cancel function 点击取消按钮事件
 */
function showDialog(type, content, callback) {
    closeDialog();
    layer.open({
        type: type,
        title: false,
        closeBtn: false,
        shade: 0.6,
        area: ['auto', 'auto'],
        shadeClose: true,
        content: content,
        success: function () {
            $(document).on("click", ".dialog-close,.close-dialog", function () {
                closeDialog();
            });
            if (typeof callback === "function") {
                callback();
            }
        }
    });
}

//关闭弹层
function closeDialog() {
    layer.closeAll();
}


/**
 * 检索结果提示弹框
 * result : {String} 检索条件
 * time:多产时间内消失，可选，默认2秒；
 * num：结果条数；
 */
function showPropAskMsg(result, num, time) {
    var timer = time;
    if (time == undefined) {
        timer = 2000;
    }
    var propAskMsg = $(".prop-msg-ask");
    propAskMsg.find(".num").text(num);
    propAskMsg.find(".msg-filter").text(result);
    propAskMsg.fadeIn(0, function () {
        propAskMsg.fadeOut(timer);
    })
}

//帮你找房更多筛选条件
function selectMoreCondition() {
    $(".input-area").each(function () {
        var _item = $(this);
        var _ipt = _item.children(".ipt");
        _ipt.click(function () {
            if (_ipt.next(".dropdown-list").is(":hidden")) {
                _ipt.next(".dropdown-list").stop().slideDown();
                _ipt.parents(".input-area").parents(".tr").addClass("on");
                _ipt.parents(".input-area").parents(".tr").siblings().removeClass('on');
                _ipt.next(".dropdown-list").children("li").click(function () {
                    var defaultValue = _ipt.next(".dropdown-list").children("li:first").text();
                    _ipt.parents(".input-area").parents(".tr").removeClass("on");
                    _ipt.text($(this).text());
                    var dataCapture = $(this).attr("data-capture");
                    var dataKey = $(this).parents(".dropdown-list").prev(".ipt").attr("data-key");
                    switch (dataKey) {
                        case 'area':
                            _ipt.attr('data-area', dataCapture);
                            break;
                        case 'budget':
                            _ipt.attr('data-budget', dataCapture);
                            break;
                        case 'house':
                            _ipt.attr('data-house', dataCapture);
                            break;
                        case 'size':
                            _ipt.attr('data-size', dataCapture);
                            break;
                    }
                    if (_ipt.text() == defaultValue) {
                        _ipt.css({
                            color: "#999"
                        });
                    } else {
                        _ipt.css({
                            color: "#333"
                        });
                    }

                    $(this).parents(".dropdown-list").slideUp("fast");
                });
            } else if (_ipt.next(".dropdown-list").is(":visible")) {
                $(".dropdown-list").slideUp("fast");
                _ipt.parents(".input-area").parents(".tr").removeClass("on");
            }
        });

    });
}