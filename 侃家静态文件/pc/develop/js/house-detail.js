$(function(){
    //进入页面时如果滚动条位置距离顶部距离符合要求，则顶部条固定顶部
    fixedDetailTop();

    //页面滚动后楼盘详情页顶部导航悬浮
    $(window).scroll(function () {
        fixedDetailTop();
    });
});

/**
 * 楼盘详情页顶部栏固定
 */
function fixedDetailTop(){
    var height = $(document).scrollTop();
    var headerHeight = $(".top-menu-wrap").height();
    var offsetTop = $(".top-menu-wrap").offset().top;
    if (height > (headerHeight+offsetTop)) {
        $('.top-menu-banner').fadeIn('slow', function () {
            $(this).css('display', 'block');
        });
    } else {
        $('.top-menu-banner').fadeOut('slow', function () {
            $(this).css('display', 'none');
        });
    }
}

$(function () {
    //定义jQuery对象
    // ul
    var $list = $('.slide-ul');
    // 小图片 下标
    var $spans = $(".zmd-container-ul li");
    // 小图片 ul
    var $prevA = $('.slide-btnz');   //上一页
    var $nextA = $(".slide-btny");    //下一页
    // 移动距离
    var $li_width = $('.slide-ul li').width();

    // 走马灯效果 变量
    var $move = $('.move');
    var $btn03 = $('.zmd-btnz');
    var $btn04 = $('.zmd-btny');
    var $moveLeft = $move.width();
    var $liLeft = $spans.outerWidth(true);

    // 只有一张图片
    if($spans.length == 1){
        $nextA.addClass('zmd-no');
    }
    // 初始化 按钮
    $prevA.addClass('zmd-no');
    $btn03.addClass('zmd-no');
    // 判断 走马灯移动次数 moveNumber
    var moveNumber = ( $spans.length / 5 ) - 1;
    var arrlistmoveR = [];
    var arrlistmoveL = [];
    for(var i=0; i<moveNumber; i++){
        a = (i+1) * 5;
        b = a - 1;
        arrlistmoveR.push(b);
        arrlistmoveL.push(a);
    };

    // 设置监听
    $prevA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('zmd-on')){
                if(!(arrlistmoveL.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('zmd-no')){
            return;
        }
        nextPage(false);
    });
    $nextA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('zmd-on')){
                if(!(arrlistmoveR.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('zmd-no')){
            return;
        }
        nextPage(true);
    });
    // 点击小图对应 大图函数调用
    $spans.click(function () {
        nextPage($(this).index());
    });
    //  自动 播放
    var index = 0;
    var SLID_TIME = 400;
    var moving = false;
    var movings = false;
    // 自动轮播
    var timer = null;
    //  图片 移动函数
    function nextPage(next) {
        // 如果正在移动  则 退出
        if(moving){
            return;
        }
        var targetLeft = 0;
        var currentLeft = $list.position().left;
        var offsetLeft = 0;
        // IE 1px问题
        if ((navigator.userAgent.indexOf('MSIE') >= 0)
            && (navigator.userAgent.indexOf('Opera') < 0)){
            if(currentLeft == 0){
                currentLeft == 0
            }else {
                currentLeft =  currentLeft - 1;
            }
        }
        // IE 问题

        // 正在移动
        moving = true;
        if(typeof next === 'boolean'){
            offsetLeft += next ? -$li_width : $li_width;
        }else{
            if(next - index === 0){
                moving = false;
                return;
            }
            //点击的圆点就是当前页面对应的下标
            offsetLeft = -$li_width*(next - index);
        }
        targetLeft = currentLeft + offsetLeft;
        // 动画效果
        $list.animate({
            left:targetLeft
        },SLID_TIME,'linear',function () {
            Btnhide();  // 调用更谢下标记函数
            moving = false;

        });
        //更新小图片
        updatePoint(next);
        // 按钮 隐藏函数
        function Btnhide() {
            targetLeft == -($spans.length - 1)*$li_width ? $nextA.addClass('zmd-no') : $nextA.removeClass('zmd-no') ;
            targetLeft == -0 ? $prevA.addClass('zmd-no') : $prevA.removeClass('zmd-no') ;
        }
    }
    // 更新原点函数
    function updatePoint(next){
        var targetIndex;
        //更新当前页的圆点样式
        $spans.eq(index).removeClass('zmd-on');
        if(typeof next === 'boolean'){
            if(next){
                targetIndex = index + 1;
                if(targetIndex > $spans.length - 1){
                    targetIndex = 0;
                }
            }else{
                targetIndex = index - 1;
                if(targetIndex < 0){
                    targetIndex = $spans.length - 1;
                }
            }
        }else{
            targetIndex = next;
        }
        $spans.eq(targetIndex).addClass('zmd-on');
        //更新下标
        index = targetIndex;
    }
    // 走马灯移动函数
    function nextGroup(next) {
        if(movings){
            return;
        }
        // 目标位置
        var targetLeft = 0;
        var offsetLeft = 0;
        movings = true;
        //  初始位置
        var currentLeft = $move.position().left;
        if( typeof next == 'boolean'){
            offsetLeft += next ? -520 : 520 ;
            targetLeft = offsetLeft + currentLeft;
        }else {

            if( (next + 1)%5 == 0){
                targetLeft = -530 * (next + 1)/5
            }
            if( next%5 == 0 ){
                targetLeft = -530 * ((next)/5 - 1)
            }
        }
        $move.animate({
            left : targetLeft
        },SLID_TIME,'linear',function () {
            movings = false;
            Btnhide()
        });
        //  隐藏 按钮 函数
        // 修改 动态 判断
        function Btnhide() {
            targetLeft >= 0 ? $btn03.addClass('alb-no') : $btn03.removeClass('alb-no') ;
            targetLeft <= -$moveLeft * moveNumber ? $btn04.addClass('alb-no') : $btn04.removeClass('alb-no') ;
        }
    }
});
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

    // 判断行高 咨询师点评：显示与隐藏更多  cmt-detail  cmt-maxh
    $(document).on('click', $('.ico-showmore'), function () {
     

    });

    /*点评展开*/
    pd();
    function pd() {
        var user_cmt = $(".user-cmt");
        user_cmt.each(function () {
            var that = $(this);
            var cmt_detail = that.find(".cmt-detail");
            var cssHeight = parseInt(cmt_detail.css("max-height"));
            var relHeight = parseInt(cmt_detail[0].scrollHeight);
            var dp_showMore = that.find(".show-more");
            var dp_detail = that.find(".cmt-detail");
            if(relHeight < cssHeight*1.2){
                dp_showMore.hide();
            }
            var wz = false;
            dp_showMore.on("click",function () {
                dp_showMore.toggleClass("hide-more");
                dp_detail.toggleClass("cmt-max");
                if(!dp_showMore.hasClass('hide-more')){
                    $(this).children('.ico-showmore').html('查看全文');
                }else {
                    $(this).children('.ico-showmore').html('展开全文');
                }
            });
        });
    }
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
    //滚动条美化
    var cjpjDetail = $(".cjpj-detail");
    var zbFx = $(".zb-fx");
    var zbList = $(".zb-list");
    if (cjpjDetail.length > 0 || zbFx.length > 0 || zbList.length > 0) {
        $(".cjpj-detail .content,.zb-fx .inn,.zb-list").mCustomScrollbar();
    }

    /**
     * 买房成交互动
     * 只有当前展示信息为咨询师点评的时候，"咨询师 他们不是你见过的那种房产经纪人"模块
     */
    $(".tab-comment .tab-t li").click(function(){
        if($(".tab-comment .tab-t li:first").hasClass("t-sel")){
            $(".row-constant").show();
        }else {
            $(".row-constant").hide();
        }
    });
});
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
        }else {
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
});