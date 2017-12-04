document.body.addEventListener('touchstart', function () {
});  //触发ios的：active和：hover

//切换效果
var $div_li = $("div.tab-nav ul li");
$div_li.click(function () {
    $(this).addClass("selected")            //当前<li>元素高亮
        .siblings().removeClass("selected");  //去掉其他同辈<li>元素的高亮
    var index = $div_li.index(this);  // 获取当前点击的<li>元素 在 全部li元素中的索引。
    $("div.tab-con > .nrpart")   	//选取子节点。不选取子节点的话，会引起错误。如果里面还有div
        .eq(index).show()   //显示 <li>元素对应的<div>元素
        .siblings(".nrpart").hide(); //隐藏其他几个同辈的<div>元素
}).hover(function () {
    $(this).addClass("hover");
}, function () {
    $(this).removeClass("hover");
});


//检测用户手机是Android还是iOS
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//Android下border宽度0.5px显示不出来，做了一下兼容性调节
if (isAndroid) {
    $(document).find('.box .hd').css({'border-bottom': '1px solid #e2e2e2'});
    $(document).find('.box ').css({'border-top': '1px solid #e2e2e2', 'border-bottom': '1px solid #e2e2e2'});
}

//楼盘列表边框自适应android和iOS
function borderAdjust() {
    if (isAndroid) {
        $(document).find('.item-new ').css({'border-bottom': '1px solid #e5e5e5'});
    } else if (isiOS) {
        $(document).find('.item-new ').css({'border-bottom': '0.5px solid #e5e5e5'});
    }
}

//筛选条件
$(function () {
    /**
     * 列表页筛选条件相关的事件
     */
        //筛选类别的点击事件（包括显示与隐藏，切换）
    $(".query-list .query-wrap").click(function () {
        $(this).parent().parent().parent(".query").css({
            "position": "fixed",
            "top": 0,
            "left": 0,
            "width": "100%",
            "z-index": 9999
        });

        var win = $(".container");
        win.css({
            "height": "100%",
            "position": "fixed",
            "width": "100%",
            "top": "0",
            "left": "0"
        });

        // 判断是否 显示 如果不显示怎不用 margi 显示 则 margin
        if ($(".topbar").length > 0) {
            $('.query').css('margin-top', '2.49rem');
        }else if($(".topbar").length == 0 || $('.topbar')[0].style.display == 'none'){
            $('.query').css('margin-top', '1.16rem');
        }
        if (!$(this).parent("li").hasClass('on')) {
            var $orderPanelWidth = $(".query-list").width();
            $(".query-panel").css("width", $orderPanelWidth);

            $(this).parent("li").siblings("li").removeClass("on");
            $(this).parent("li").addClass("on");
            $('.query-panel').hide(0);
            $(this).siblings('.query-panel').slideDown(400);
            $(".tsk-translayer").show(0);
        }

    });
    //区域，价格，户型  参数选择点击事件
    $('.query-panel ul.area-type-item li,.query-panel ul.price-item li,.query-panel ul.housetype-item li, li.query-mnore a.btn-confirm').click(function () {
        //选中变量颜色状态
        $(this).siblings("li").removeClass('cur-selected');
        $(this).addClass('cur-selected');
        //选中关闭当前列表
        $(this).parents('.query-panel').hide(0);
        //有选择的参数 在标题处添加标记
        $(this).parents('li').removeClass('on').addClass('has-params');
        $(this).parents(".query").css({
            "position": '',
            "top": '',
            "left": '',
            "width": ''
        });
        var win = $(".container");
        win.css({
            "height": "",
            "position": "",
            "width": "",
            "top": "",
            "left": ""
        });

        $(".tsk-translayer").hide(0);
        // 取消 margin-top
        $(".query").css('margin-top', '0');
        // 清空 输入框 文字
        $(this).parent('.btn-area1').find('.btn-minimum').val('');
        $(this).parent('.btn-area1').find('.btn-highest').val('');


    });
    //筛选条件弹出的灰色背景点击消失事件
    $('.tsk-translayer').click(function () {
        $(this).hide(0);
        $('.query-panel').hide(0);
        $('.query-wrap').parent('li').removeClass('on');
        $(".container").css({
            "position": ""
        });
        $(".query").css({
            "position": '',
            "top": '',
            "left": '',
            "width": '',
            'margin-top': '0'
        });
        var win = $(".container");
        win.css({
            "height": "",
            "position": "",
            "width": "",
            "top": "",
            "left": ""
        });
    });
    //筛选项目中的条件点击事件 规则：相同类别不多选，不同类别间可多选
    $('.query-mnore').children('.query-panel').find('li').click(function () {
        $(this).siblings('li').removeClass('on');
        $(this).addClass('on');
        $(this).parent('ul.con').parent('.mod3').children('.tit').children('.fcB').html($(this).children('a').html());
    });
    //更多筛选条件 重置条件 点击事件 清空数据至默认
    $('.query-mnore .query-panel .btn-area').children('.btn-canel').click(function () {
        $('.query-mnore .query-panel').find('.mod3 .fcB').html('不限');
        $('.query-mnore').children('.query-panel').find('li:first-child').addClass('on').siblings().removeClass('on');
    });
    $('.query-mnore .query-panel .btn-area').children('.btn-confirm').click(function () {
        var search_arr = new Array;
        $('.query-list').find('li.on a').each(function () {
            var search_key = $(this).attr('data-search-key');
            if (search_key.match(/^[A-Za-z][0]/) == null) {
                search_arr.push($(this).attr('data-search-key'));
            }
        });
        if (search_arr.length > 0) {
            var search_str = search_arr.join('-');
            window.location.href = commonLocation(site_url, 'project/' + search_str);
        } else {
            window.location.href = commonLocation(site_url, 'project');
        }
    });
    //底部最佳评论弹层
    $(document).on("click", ".nav-commnet", function () {
        var windowHeight = $(window).height() * 0.5;
        var commentHeight = displayLayer("comment-layer", "tsk-translayer");
        if (commentHeight > windowHeight) {
            $(this).parent(".footer-nav").parent(".footer-layer").siblings(".comment-layer").css({
                "height": windowHeight,
                "overflow-y": "auto"
            });
        }
    })

    //点击关闭按钮关闭最佳点评浮层
    $(".comment-layer .close a,.tsk-translayer").click(function () {
        $(".comment-layer").hide();
        $(".tsk-translayer").hide();
        startDefault("tsk-translayer");
    });


    /**
     * 问答模块，图片根据图片宽高适配显示形式
     */
    $(".ask-detail > .pic").each(function () {
        var picContainerWidth = $(this).width();  //图片容器宽度
        var picContainerHeight = $(this).height();  //图片容器高度
        var picContainerRadio = picContainerWidth / picContainerHeight;  //图片容器宽高比

        var imgSrc = $(this).children("img").attr("src");  //原始图片url

        //获取原始图片尺寸
        var image = new Image();
        image.src = imgSrc;
        var imgWidth = image.width;
        var imgHeight = image.height;
        var imgRadio = imgWidth / imgHeight;

        if (picContainerRadio >= imgRadio) {
            $(this).children("img").width("100%");
        }else{
            $(this).children("img").height("100%");
        }

    });
});


/* 显示或隐藏弹层
 * @param string cls 控制显示隐藏的class选择器
 * @param string tansLayer 弹层的半透明层
 */
function displayLayer(cls, tansLayer) {
    var htmlObj = $("." + cls);
    if (htmlObj.is(":hidden")) {
        htmlObj.show();
        stopDefault(tansLayer);
        return htmlObj.height();
    } else {
        htmlObj.hide();
        startDefault(tansLayer);
    }
}


/*屏蔽默认行为
 * @param string tansLayer 弹层的半透明层
 */
function stopDefault(transCls) {
    // window.ontouchmove = function(e){
    //     e.preventDefault && e.preventDefault();
    //     e.returnValue = false;
    //     e.stopPropagation && e.stopPropagation();
    //     return false;
    // }
    // document.body.style.height = '100%';
    // document.body.style.overflow = 'hidden';
    $("." + transCls).show();
}

/*放开默认行为
 * @param string tansLayer 弹层的半透明层
 */
function startDefault(transCls) {
    // window.ontouchmove = function(e){
    //     e.preventDefault && e.preventDefault();
    //     e.returnValue = true;
    //     e.stopPropagation && e.stopPropagation();
    //     return true;
    // }
    // document.body.style.height = 'auto';
    // document.body.style.overflow = 'auto';
    $("." + transCls).hide();
}

//轮播
$(function () {
    var imgNum = $(".main_image").find('li').size();
    if ($(".focus").length > 0) {
        //轮播
        if (imgNum > 1) {
            $(".focus").hover(function () {
                $("#btn_prev,#btn_next").fadeIn()
            }, function () {
                $("#btn_prev,#btn_next").fadeOut()
            });
            $dragBln = false;
            $(".main_image").touchSlider({
                flexible: true,
                speed: 200,
                btn_prev: $("#btn_prev"),
                btn_next: $("#btn_next"),
                paging: $(".flicking_con a"),
                counter: function (e) {
                    $(".flicking_con a").removeClass("on").eq(e.current - 1).addClass("on");
                    $(".focus-num span.cur").text($(".flicking_con a.on").text());
                }
            });
            $(".main_image").bind("mousedown", function () {
                $dragBln = false;
            })
            $(".main_image").bind("dragstart", function () {
                $dragBln = true;
            });
            $(".main_image a").click(function () {
                if ($dragBln) {
                    return false;
                }
            });
            timer = setInterval(function () {
                $("#btn_next").click();
            }, 5000);
        } else {
            $(".main_image").find("ul").css({
                width: "100%"
            });
            timer = setInterval(function () {
                $("#btn_next").click();
            }, 5000);
        }
    }


    //待确认
    $(".thum li").click(function () {
        $(this).remove();
    });

    //查看原图 大图状态点击图片恢复原来小图
    $('#zoom').on('click', '.content', function () {
        $('#zoom').children('.close').trigger('click');
    });
});


/*显示或隐藏元素
 *@param String cls 要控制显示或隐藏的元素class
 */
function displayElement(cls) {
    var htmlObj = $("." + cls);
    if (htmlObj.is(":visible")) {
        htmlObj.hide();
    } else if (htmlObj.is(":hidden")) {
        htmlObj.show();
    }
}


/**显示于隐藏更多楼盘点评，首页、楼盘列表页
 * @param obj Object
 */
function commentShowMore(obj) {
    if (obj.children(".ico").hasClass("ico-open")) {
        obj.parent().parent().siblings(".media").show();
        obj.children(".ico").removeClass("ico-open").addClass("ico-close");
        if (obj.hasClass("show-inn")) {
            obj.parent(".show-wrap").parent(".show-more").css("margin-top", "-2.8rem");
            obj.parent(".show-wrap").parent(".show-more").siblings(".media").css("padding-top", "1rem");
        }
    } else if (obj.children(".ico").hasClass("ico-close")) {
        obj.parent().parent().siblings(".media").hide();
        obj.children(".ico").removeClass("ico-close").addClass("ico-open");
        if (obj.hasClass("show-inn")) {
            obj.parent(".show-wrap").parent(".show-more").css("margin-top", 0);
        }
    }
}


//看房记录满意度评价
$(document).on("click", ".media3-more .more", function () {
    if (!$(this).hasClass("more-hide")) {
        $(this).addClass("more-hide");
        $(this).parent(".media3-more").parent(".media3-footer").siblings(".media3-body").children(".media3-txt").children(".data-short").hide();
        $(this).parent(".media3-more").parent(".media3-footer").siblings(".media3-body").children(".media3-txt").children(".data-detail").show();
        setEmotion();
    } else {
        $(this).removeClass("more-hide");
        $(this).parent(".media3-more").parent(".media3-footer").siblings(".media3-body").children(".media3-txt").children(".data-short").show();
        $(this).parent(".media3-more").parent(".media3-footer").siblings(".media3-body").children(".media3-txt").children(".data-detail").hide();
    }
});

//2016.06.24 改版
/**
 * 首页、楼盘列表页显示更多楼盘点评
 * 显示于隐藏更多点评
 * @param obj Object
 */
function commentShowMore(obj) {
    if (obj.children(".ico").hasClass("ico-open")) {
        obj.parent().parent().siblings(".media").slideDown();
        obj.children(".ico").removeClass("ico-open").addClass("ico-close");
    } else if (obj.children(".ico").hasClass("ico-close")) {
        obj.parent().parent().siblings(".media").slideUp();
        obj.children(".ico").removeClass("ico-close").addClass("ico-open");
    }
}

/*楼盘列表*/
$(document).on('click', ".show-inn", function () {
    commentShowMore($(this));
});
$(document).on('click', ".opr-commment", function () {
    commentShowMore($(this));
});

$(function () {
    /**
     * 关闭页面顶部app下载入口
     * date：2016.11.24
     */
    $(".topbar .ico-close").click(function () {
        $(".topbar").hide();
        $(".container").animate({"padding-top": "0"});
        if($('.header02').length > 0){
            $('.header02').animate({'top':'0'});
            if($("#prop").is(":visible")){
                $(".query").animate({"margin-top": $('.header02').outerHeight()});
            }else{
                $(".query").animate({"margin-top": 0});
            }
        }
        if($('.header03').length > 0){
            $('.header03').animate({'top':'0'});
            if($("#prop").is(":visible")){
                $(".query").animate({"margin-top": $('.header03').outerHeight()});
            }else{
                $(".query").animate({"margin-top": 0});
            }
        }

    });
});

/* 兼容性判断*/
function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    } else if (/ios/.test(ua)) {
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}
$(function () {
    adjust();
});
/* 兼容性判断*/
/*没有下载app*/
if (!$(".topbar").length > 0) {
    $(".container").css({
        paddingTop: 0
    })
}
/*回顶部*/
$(".return-top").on("click", function () {
    $('body,html').animate({scrollTop: 0}, "200");
    return false;
});


/**
 *提示弹框
 * time:多产时间内消失；
 * num：个数；
 */
function showPropMsg(time, num) {
    var propMsg = $(".prop-msg");
    propMsg.find(".num").text(num);
    propMsg.fadeIn(0, function () {
        propMsg.fadeOut(time);
    })
}

$(function () {
    /*设置3d容器高度*/
    var footHeight = $('.a-footer-layer li').height();
    var headerHeight = $('.header').height();
    var DHeight = document.documentElement.clientHeight - footHeight - headerHeight;
    $('.panorama').css('height', DHeight + 'px');
});

/**
 * 通过ua获得app信息
 * @param  {string} ua user agent
 * @return {obj}    app info
 */
var getAppInfoFromUA = function (ua) {
    if (!ua) {
        ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    }
    if (/comjia/i.test(ua)) {
        var match = ua.match(/comjia\s*\(\s*(\d+)\s*;\s*(\d+)\s*\)/i);
        var rst = {
            appId: (match && match.length > 1 && match[1]) || '',
            version: (match && match.length > 1 && match[2]) || ''
        }
        return rst;
    } else {
        return false;
    }
}

/**
 * 弹层
 * @param type number 弹层类型 1:弹出层
 * @param content string 弹层内容
 * @param callback function 弹层回调函数
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
        success: function() {
            $(document).on("click", ".dialog-close,.close-dialog", function() {
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
$(function () {
// 判断一张的的时候不调用函数
    var $scr_Li = $('.scrollDiv').find("li");
    if($scr_Li.length != 1){
        // 文字轮播函数调用
        setInterval('AutoScroll(".scrollDiv")',3000);
    }
// 展开排序
    $(".rank").click(function () {
        $(".search-prop").show();
        $(".condition").animate({height:"5.86rem"});
    });
// 收起排序
    $('.search-prop').click(function () {
        $('.search-prop').hide();
        $(".condition").css('height','0');
    });
// 点击改变颜色
    $(".condition li").click(function () {
        var that = $(this);
        that.addClass('on').siblings().removeClass("on")
    });
})
// 单行文字滚动
function AutoScroll(obj){
    var scrollHeight = $(obj).find("li").height();
    $(obj).find("ul:first").animate({
        marginTop:-scrollHeight
    },2000,function(){
        $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
    });
}
/*2017.11.3改版，涉及效果banner堆叠轮播、swiper左右滑动、筛选标签删除*/
$(function () {
    /*banner堆叠轮播插件*/
    if($("#stack_krisna > li").length > 1){
        var startX,
            EndX ;
        var krisna = new Stack(document.getElementById('stack_krisna'));
        var timerKrisna = setInterval(function () {
            krisna.reject();
        },2000);
        $("#stack_krisna li").on("touchstart",function (e) {
            event.preventDefault();
            clearInterval(timerKrisna);
            startX = e.originalEvent.changedTouches[0].pageX;
            $(this).on("touchend",function (e) {
                EndX = e.originalEvent.changedTouches[0].pageX;
                clearInterval(timerKrisna);
                if((EndX-startX)==0){//点击
                    if($(this).find("a").length > 0){
                        window.location.href = $(this).find("a").attr("href");
                    }
                }else{//滑动
                    EndX-startX > 0 ? krisna.accept():krisna.reject();
                }
                timerKrisna = setInterval(function () {
                    krisna.reject();
                },2000);
                e.originalEvent.changedTouches = null;
            })
        });
    }else{
        $("#stack_krisna .stack__item").css({
            "opacity":1
        });
    }
    /*左右轮播 初始化swiper*/
    if ( $(".swiper-container").length > 0 ) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: "auto",
            paginationClickable: true,
            freeMode: true
        });
    }
    /*筛选标签删除*/
    $(document).on("click",".tag-item .icon-delete",function () {
        var that = $(this),
            delItem = that.parent(".tag-item");
        delItem.siblings(".tag-item").length==0 ? that.parents(".query-tag").remove():delItem.remove();
    })
});
// 滑动展示  更多和筛选！ 效果！
$(window).scroll(function (){
    var $rank = $('.rank');
    var $return_top = $('.return-top');
    if($return_top.length > 0){
        //不用参考楼盘列表的第一个楼盘了，为了全站统一，更改为统一向上滚动高度出现返回顶部按钮－－－周童确认效果
        // var $house_item_first_top = $('.house-list').find(".house-item:first-child").offset().top;
        // if($(window).scrollTop() > $house_item_first_top){
        if($(window).scrollTop() > 100){
            $rank.show();
            $return_top.show();
        }else {
            $rank.hide();
            $return_top.hide();
        }
    }else {
        return false;
    }
});