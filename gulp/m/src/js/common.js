document.body.addEventListener('touchstart', function () {});  //触发ios的：active和：hover


function keyEnter(e) {
        e = e || event;
        if(e.keyCode == 13) { 
            if(document.activeElement.id=='keywords-house'){  //楼盘搜索
                var _item = $("#keywords-house");
                var d = _item.val();
                d = d.replace(/(^\s+)|(\s+$)/g, '');
                _item.val(d);
                var url = 'project/index?name='+d;
                window.location.href = commonLocation(site_url,url);
            }
            else if(document.activeElement.id=='keywords'){  //咨询师搜索
                var keywords = $("#keywords").val();
                var keywordsDefaultVal = $("#keywords").prop("placeholder");
                if (keywords !== keywordsDefaultVal){   
                    var header_search_url = $("#keywords").attr('data-search-url');
                    location.href = commonLocation(site_url,header_search_url + 'keywords=' + keywords);
                }
            }
        }   
    } 
    document.onkeydown = keyEnter;


$(function(){
    //底部浮层关闭事件
    $('.close a').click(function(){
        $(this).parents('.footer-layer').remove();
    });
    setEmotion();//解析表情
    var css_wid = $(".footer-detail li").length;
    $(".footer-detail li").css("width",(100/css_wid)+'%');
});
/**
 * 获取url参数
 * @param name
 * @returns {null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/**
 * 楼盘详情页，搜索周边专用的获取URL中的值
 * @returns {*}
 */
function getDetailUrlParam() {
    var url = window.location.href;
    if(url != ''){
        var url_arr = url.split('/');
        if(url_arr != ''){
            return url_arr[url_arr.length - 1];
        }
    }
    return ;
}

//手机号码的校验
function checkTel(value) {
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|1[78][0123456789][0-9]{8}|14[57][0-9]{8}|1349[0-9]{7})$/;
    if (isMob.test(value) || isPhone.test(value)) {
        return true;
    } else {
        return false;
    }
}

function setCookie(name, value, tm){//设置cookie
    if(tm == null || tm < 59) tm = 60;
    var exp  = new Date();
    exp.setTime(exp.getTime() + tm*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


/**
 * //兼容性的公共的一句话提示弹窗，对已经封装好的弹窗的又一次封装
 * @param msg
 * @param msgType 一句话信息提示 交互按钮 ，1：只有一个确定按钮，2：有确定取消两个按钮
 */
function msg_tip (msg,msgType,func,data,commit_url) {
    if(msgType == ''|| msgType == undefined ){
        msgType = 1;
        popLayer(1, msg ,msgType);
    }else if(msgType == 2){
        popLayer(1,msg,msgType,func,data,commit_url);
    }
}

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
                    .show(0,pd())
                    .siblings(".nrpart")
                    .hide();
            }
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
        });
    });
}

//检测用户手机是Android还是iOS
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//Android下border宽度0.5px显示不出来，做了一下兼容性调节
if(isAndroid){
    $(document).find('.house-item,.box .hd').css({'border-bottom':'1px solid #e2e2e2'});
    $(document).find('.house-item .media5').css({'border-left':'1px solid #e2e2e2'});
    $(document).find('.box ').css({'border-top':'1px solid #e2e2e2','border-bottom':'1px solid #e2e2e2'});
}
// else if(isiOS){
//     $(document).find('.house-item,.box .hd').css({'border-bottom':'0.5px solid #e2e2e2'});
//     $(document).find('.house-item .media5').css({'border-left':'0.5px solid #e2e2e2'});
//     $(document).find('.box ').css({'border-top':'0.5px solid #e2e2e2','border-bottom':'0.5px solid #e2e2e2'});
// }
if(isAndroid){
    $(document).find('.item-new ').css({'border-bottom':'1px solid #e5e5e5'});
    $(document).find('.help-tags').css({'border-bottom':'1px solid #e5e5e5'});
    $(document).find('.list-wrap .advice-free ').css({'border-bottom':'1px solid #e5e5e5'});
    $(document).find('.find-house ').css({'border-bottom':'1px solid #e5e5e5'});
    $(document).find('.panel-area li, .panel-price li, .panel-housetype li').css({'border-bottom':'1px solid #e5e5e5'});
    $(document).find('.panel-area .tab-con li').css({'border-left':'1px solid #e5e5e5'});
    $(document).find('.query-wrap').css({'border-left':'1px solid #e5e5e5'});
    $(document).find('.query-list').css({'border-top':'1px solid #e5e5e5'});
    $(document).find('.query-list').css({'border-bottom':'1px solid #e5e5e5'});
    $(document).find('.query-list > li.first > .query-wrap').css({'border-left':'none'});
}else if(isiOS){
    $(document).find('.item-new ').css({'border-bottom':'0.5px solid #e5e5e5'});
    $(document).find('.help-tags').css({'border-bottom':'0.5px solid #e5e5e5'});
    $(document).find('.list-wrap .advice-free ').css({'border-bottom':'0.5px solid #e5e5e5'});
    $(document).find('.find-house ').css({'border-bottom':'0.5px solid #e5e5e5'});
    $(document).find('.panel-area li, .panel-price li, .panel-housetype li').css({'border-bottom':'0.5px solid #e5e5e5'});
    $(document).find('.panel-area .tab-con li').css({'border-left':'0.5px solid #e5e5e5'});
    $(document).find('.query-wrap').css({'border-left':'0.5px solid #e5e5e5'});
    $(document).find('.query-list').css({'border-top':'0.5px solid #e5e5e5'});
    $(document).find('.query-list').css({'border-bottom':'0.5px solid #e5e5e5'});
    $(document).find('.query-list > li.first > .query-wrap').css({'border-left':'none'});
}

//楼盘列表边框自适应android和iOS
function borderAdjust() {
    if(isAndroid){
        $(document).find('.item-new ').css({'border-bottom':'1px solid #e5e5e5'});
    }else if(isiOS){
        $(document).find('.item-new ').css({'border-bottom':'0.5px solid #e5e5e5'});
    }
}

//筛选条件
$(function(){
    /**
     * 列表页筛选条件相关的事件
     */
//筛选类别的点击事件（包括显示与隐藏，切换）
    $(".query-list .query-wrap").click(function(){
        $(this).parent().parent().parent(".query").css({
            "position":"fixed",
            "top":0,
            "left":0,
            "width":"100%",
            "z-index":23
        });

        var win = $(".container");
        win.css({
            "height":"100%",
            "position":"fixed",
            "width":"100%",
            "top":"0",
            "left":"0"
        });

        // 判断是否 显示 如果不显示怎不用 margi 显示 则 margin
        if($('.topbar')[0].style.display == 'none'){
            $('.query').css('margin-top', '0');
        }else {
            $('.query').css('margin-top', '1.3333rem');
        }

        if(!$(this).parent("li").hasClass('on')){
            var $orderPanelWidth = $(".query-list").width();
            $(".query-panel").css("width", $orderPanelWidth);

            $(this).parent("li").siblings("li").removeClass("on");
            $(this).parent("li").addClass("on");
            $('.query-panel').hide(0);
            $(this).siblings('.query-panel').slideDown(400);
            $(".tsk-translayer").show(0);
        } 

    });
    /*筛选 区域 价格 户型 点击替换文字*/
    $('.query-panel ul.area-type-item li,.query-panel ' +
        'ul.price-item li,.query-panel ul.housetype-item li').click(function () {
        // 替换文本
        $(this).parents('.query-panel').siblings('.query-wrap').find('.query-txt').text($(this).text());
        // 替换文本
    });
    $('.btn-confirm1').click(function () {
        // 更改文字内容
        var text1 = $(this).parent('.btn-area1').find('.btn-minimum').val();
        var text2 = $(this).parent('.btn-area1').find('.btn-highest').val();
        var text3 = text1 +'-'+text2;

        // 取消标记
        $(this).parents('.query-panel').find('li').removeClass('cur-selected');
        $(this).parents('.query-price').find('.query-txt').html(text3);
        // 删除文字内容
    });
//区域，价格，户型  参数选择点击事件
    $('.query-panel ul.area-type-item li,.query-panel ul.price-item li,.query-panel ul.housetype-item li, li.query-mnore a.btn-confirm, .btn-confirm1').click(function(){
        //选中变量颜色状态
        $(this).siblings("li").removeClass('cur-selected');
        $(this).addClass('cur-selected');
        //选中关闭当前列表
        $(this).parents('.query-panel').hide(0);
        //有选择的参数 在标题处添加标记
        $(this).parents('li').removeClass('on').addClass('has-params');
        $(this).parents(".query").css({
            "position":'',
            "top":'',
            "left":'',
            "width":''
        });
        var win = $(".container");
        win.css({
            "height":"",
            "position":"",
            "width":"",
            "top":"",
            "left":""
        });


        $(".tsk-translayer").hide(0);
        // 取消 margin-top
        $(".query").css('margin-top', '0');
        // 清空 输入框 文字
        $(this).parent('.btn-area1').find('.btn-minimum').val('');
        $(this).parent('.btn-area1').find('.btn-highest').val('');


    });
    //筛选条件弹出的灰色背景点击消失事件
    $('.tsk-translayer').click(function(){
        $(this).hide(0);
        $('.query-panel').hide(0);
        $('.query-wrap').parent('li').removeClass('on');
        $(".container").css({
            "position":""
        });
        $(".query").css({
            "position":'',
            "top":'',
            "left":'',
            "width":'',
            'margin-top':'0'
        });
        var win = $(".container");
        win.css({
            "height":"",
            "position":"",
            "width":"",
            "top":"",
            "left":""
        });
    });
    //筛选项目中的条件点击事件 规则：相同类别不多选，不同类别间可多选
    $('.query-mnore').children('.query-panel').find('li').click(function(){
        $(this).siblings('li').removeClass('on');
        $(this).addClass('on');
        $(this).parent('ul.con').parent('.mod3').children('.tit').children('.fcB').html($(this).children('a').html());
    });
    //更多筛选条件 重置条件 点击事件 清空数据至默认
    $('.query-mnore .query-panel .btn-area').children('.btn-canel').click(function(){
        $('.query-mnore .query-panel').find('.mod3 .fcB').html('不限');
        $('.query-mnore').children('.query-panel').find('li:first-child').addClass('on').siblings().removeClass('on');
    });
    $('.query-mnore .query-panel .btn-area').children('.btn-confirm').click(function(){
        var search_arr = new Array;
        $('.query-list').find('li.on a').each(function(){
            var search_key = $(this).attr('data-search-key');
            if(search_key.match(/^[A-Za-z][0]/) == null){
                search_arr.push($(this).attr('data-search-key'));
            }
        });
        if(search_arr.length > 0){
            var search_str = search_arr.join('-');
            window.location.href = commonLocation(site_url,'project/'+search_str);
        }else{
            window.location.href = commonLocation(site_url,'project');
        }
    });
    //底部最佳评论弹层
    $(document).on("click",".nav-commnet",function(){
        var windowHeight = $(window).height()*0.5;
        var commentHeight = displayLayer("comment-layer", "tsk-translayer");
        if(commentHeight > windowHeight){
            $(this).parent(".footer-nav").parent(".footer-layer").siblings(".comment-layer").css({
                "height":windowHeight,
                "overflow-y":"auto"
            });
        }
    })

    //点击关闭按钮关闭最佳点评浮层
    $(".comment-layer .close a,.tsk-translayer").click(function () {
        $(".comment-layer").hide();
        $(".tsk-translayer").hide();
        startDefault("tsk-translayer");
    });
});

/* 显示或隐藏弹层
 * @param string cls 控制显示隐藏的class选择器
 * @param string tansLayer 弹层的半透明层
 */
function displayLayer(cls,tansLayer){
    var htmlObj = $("."+cls);
    if(htmlObj.is(":hidden")){
        htmlObj.show();
        stopDefault(tansLayer);
        return htmlObj.height();
    }else{
        htmlObj.hide();
        startDefault(tansLayer);
    }
}

/*屏蔽默认行为
 * @param string tansLayer 弹层的半透明层
 */
function stopDefault(transCls){
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
function startDefault(transCls){
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
        if(imgNum > 1){
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
        }else{
            $(".main_image").find("ul").css({
                width:"100%"
            });
            timer = setInterval(function () {
                $("#btn_next").click();
            }, 5000);
        }
    }

    $(".thum li").click(function () {
        $(this).remove();
    });


    //表情
    $(document).on('click','.btn-face',function (event) {
        if (!$("#sinaEmotion").is(":visible")) {
            $(this).sinaEmotion();
            event.stopPropagation();
        }
    });
    //查看原图 大图状态点击图片恢复原来小图
    $('#zoom').on('click','.content',function(){
        $('#zoom').children('.close').trigger('click');
    });
});

/*显示或隐藏元素
 *@param String cls 要控制显示或隐藏的元素class
 */
function displayElement(cls){
    var htmlObj = $("." + cls);
    if (htmlObj.is(":visible")) {
        htmlObj.hide();
    } else if (htmlObj.is(":hidden")) {
        htmlObj.show();
    }
}


//信息弹层提示顶部html结构
var layerTopHtml = '<div class="layer layer-del-tips">' +
    '<div class="close"><a href="javascript:void(0)">Close</a></div>' +
    '<div class="layer-wrap">' +
    '<div class="layer-body">' +
    '<div class="layer-tips-info">';

//信息弹层提示底部html结构 只有确定按钮的提示
var layerBtnOneBottomHtml = '</div>' +
    '<div class="btn-area">' +
    '<a href="javascript:void(0)" class="btn btn02 btn-submit layer-one-submit">确 定</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';


//信息弹层提示底部html结构 有确定取消两个按钮的提示
var layerBtnTwoBottomHtml = '</div>' +
    '<div class="btn-area">' +
    '<a href="javascript:void(0)" class="btn btn02 btn-submit layer-two-submit">确 定</a>' +
    '<a href="javascript:void(0)" class="btn btn03 btn-cancel">取 消</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
//信息弹层提示顶部html结构
var layerBaseTopHtml = '<div class="layer layer-del-tips">' +
    '<div class="close"><a href="javascript:void(0)">Close</a></div>' +
    '<div class="layer-wrap">' +
    '<div class="layer-body">' +
    '<div class="layer-tips-info tip-img">';
//信息弹层提示底部html结构 基本底部，无任何信息
var layerBaseBottomHtml = '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

/**
 * 弹层方法
 * @param  type Number 1:文字信息提示框，2:复杂的提示
 * @param  htmlContent String type为1时，htmlContent为纯文字信息，居中显示；type为2时，htmlContent为提示框的html结构
 * @param  msgType Number type为1时的两种情况，1:一个确定按钮的文字信息提示框（确定按钮 直接关闭弹层），2:确定和取消两个按钮的文字信息提示框（确定按钮 需要自定义事件）3:自定义提示(基本弹层的机构，内容自定义)
 * @param func
 * @param data func参数所需的数据，如果需要
 * @param commit_url  确认按钮的跳转url
 * */
function popLayer(type, htmlContent,msgType,func,data,commit_url) {
    closeLayer();//弹出新弹层之前先清理一下，避免弹出多个弹层
    var htmlContentStr = "";
    var layerWidth = $(window).width();
    var layerHeight = $(window).height();
    if (layerWidth < 414) {
        layerWidth = 300+ "px";
        layerHeight = 'auto';
    } else {
        layerWidth = 400+ "px";
        layerHeight = 'auto';
    }
    if(type == 1){
        if(msgType == 1){
            htmlContentStr = layerTopHtml + htmlContent + layerBtnOneBottomHtml;
        }else if(msgType == 2){
            htmlContentStr = layerTopHtml + htmlContent + layerBtnTwoBottomHtml;
        }else if(msgType == 3){
            htmlContentStr = layerBaseTopHtml + htmlContent + layerBaseBottomHtml;
            layerWidth = $(window).width()+ "px";
            layerHeight = layerWidth;
        }
    }
    if(type == 2){
        htmlContentStr = htmlContent;
    }
    var layerIndex = layer.open({
        type: type,
        title: false,
        closeBtn: 1,
        shadeClose: true,
        scrollbar: false,
        shade: 0.7,
        area: [layerWidth,layerHeight],
        content: htmlContentStr,
        success:function(){
            layer_func(func,data,commit_url);//弹层上的事件
        }
    });
    $('.layui-layer').css({'background':'none','box-shadow':'none'});
    return layerIndex;
}

function layer_func(func,data,commit_url){

    if(typeof commit_url != "undefined" && commit_url.length != 0){
        $(".btn-submit").on("click", function(){
            location.href = commonLocation(site_url,commit_url);
        });
    }
    if(typeof func != "undefined"){
        $(document).on("click",".btn-submit", function(){
            var res = func(data);
            if(res != false){
                closeLayer();
            }
        });
    }
}
//关闭弹层
$(document).on("click", ".layer .close a", function () {
    $('.layui-layer-close').trigger('click');
});
//关闭弹层方法
function closeLayer() {
    $('.layui-layer-close').trigger('click');
}
//弹层的取消按钮事件
$(document).on("click", ".layer .btn-cancel, .layer .layer-one-submit", function () {
    closeLayer();
});

//$(window).scroll(function () {
//    //$(window).scrollTop()这个方法是当前滚动条滚动的距离
//    //$(window).height()获取当前窗体的高度
//    //$(document).height()获取当前文档的高度
//    var bot = 100; //bot是底部距离的高度
//    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
//        //当底部基本距离+滚动的高度〉=文档的高度-窗体的高度时；
//        //我们需要去异步加载数据了
//    }
//});
/**显示于隐藏更多楼盘点评，首页、楼盘列表页
 * @param obj Object
 */
function commentShowMore(obj){
    if(obj.children(".ico").hasClass("ico-open")){
        obj.parent().parent().siblings(".media").show();
        obj.children(".ico").removeClass("ico-open").addClass("ico-close");
        obj.parent().parent().parent(".house-item").css("padding-bottom","0.5rem");
        if(obj.hasClass("show-inn")){
            obj.parent(".show-wrap").parent(".show-more").css("margin-top","-2.8rem");
            obj.parent(".show-wrap").parent(".show-more").siblings(".media").css("padding-top","1rem");
        }
    }else if(obj.children(".ico").hasClass("ico-close")){
        obj.parent().parent().siblings(".media").hide();
        obj.children(".ico").removeClass("ico-close").addClass("ico-open");
        obj.parent().parent().parent(".house-item").css("padding-bottom","1.5rem");
        if(obj.hasClass("show-inn")){
            obj.parent(".show-wrap").parent(".show-more").css("margin-top",0);
            obj.parent(".show-wrap").parent(".show-more").parent(".house-item").css("padding-bottom","0.5rem");
        }
    }
}

/*
*
* */
// $(".opr-commment,.show-inn").click(function(){
//     commentShowMore($(this));
// });
// $(document).on("click",".opr-commment,.show-inn",function(){
//     commentShowMore($(this));
// })
//
//看房记录满意度评价
$(document).on("click",".media3-more .more",function(){
    if(!$(this).hasClass("more-hide")){
        $(this).addClass("more-hide");
        $(this).parent(".media3-more").parent(".media3-footer").siblings(".media3-body").children(".media3-txt").children(".data-short").hide();
        $(this).parent(".media3-more").parent(".media3-footer").siblings(".media3-body").children(".media3-txt").children(".data-detail").show();
        setEmotion();
    }else{
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
        obj.parent().parent().parent(".house-item").css("padding-bottom", 0);
    } else if (obj.children(".ico").hasClass("ico-close")) {
        obj.parent().parent().siblings(".media").slideUp();
        obj.children(".ico").removeClass("ico-close").addClass("ico-open");
        obj.parent().parent().parent(".house-item").css("padding-bottom", "15px");
    }
}

/*楼盘列表*/
$(document).on('click',".show-inn",function () {
    commentShowMore($(this));
    $(this).parent().parent().parent(".house-item").css("padding-bottom", 0);
});
$(document).on('click',".opr-commment",function () {
    commentShowMore($(this));
});



//搜索
$('.pro_search').on('click', function () {
    var _item = $(this).parent().siblings().find('input');
    var d = _item.val();
    d = d.replace(/(^\s+)|(\s+$)/g, '');
    _item.val(d);
    var url = 'project/index?name='+d;

    window.location.href = commonLocation(site_url,url);
});

/**
 * sina_emotion 表情插件2.1版本 解析表情方法.
 * 在涉及到表情解析的元素上添加类 setEmotion ，异步加载需要解析表情的时候调用setEmotion()即可
 */
function setEmotion(){
    if($('.setEmotion').length > 0){
        $('.setEmotion').parseEmotion();
    }
}


//删除上传的图片
$(document).on('click','.ico-del', function(){
    $(this).parent().parent().remove();
});


//关注
function add_note(pro_id,is_login,obj){
    if (is_login == 0) {
        msg_tip("请您先登录呦",2,function(){
            window.location.href = login_url;
        });
        return false;
    }
    $.ajax({
        type: 'POST',
        url: add_note_url,
        data: {
            id:pro_id
        },
        beforeSend: function(){
            $(obj).attr('disabled', 'disabled');
        },
        success: function(rsp){
            if(rsp == 1){
                var tip_item = $(obj).find('.nav-txt');
                var tip_ico = $(obj).find('.ico');
                var tip = tip_item.text();
                if (tip == '取消关注') {
                    tip_item.text('关注');
                    tip_ico.removeClass('favorite_on');
                } else {
                    tip_item.text('取消关注');
                    tip_ico.addClass('favorite_on');
                }
                //$(obj).removeAttr('onclick');
            }else{
                msg_tip('评论失败，请您刷新网页之后重新提交');
            }
        },
        complete: function(){
            $(obj).removeAttr('disabled');
        }
    });
}

$(function(){
    $(document).on('click','.click_op_act',function(){
        collectOpData($(this));
    })
});
function collectOpData(obj){
    var op_type = obj.attr('data-op-type');
    var page_id = obj.attr('data-page-id');
    $.ajax({
        type: 'POST',
        url: collect_op_data_url,
        data: {
            op_type:op_type,
            page_id:page_id
        },
        success: function(rsp){
        },
    })
}

var free_call_mobile_ab_test = '';
function abtest(ab_key, ab_value, ab_url, ab_user, ab_data, ab_id)
{
    $.ajax({
        type: 'get',
        url: url_ab_test,
        data: {
            key: ab_key,
            value:ab_value,
            url:ab_url,
            user:ab_user,
            data:ab_data,
            id:ab_id
        },
        success: function (rsp) {
            // free_call_mobile_ab_test = rsp;
            //$('body').append('<input type="hidden" value="'+free_call_mobile_ab_test+'" id="free_call_mobile_ab_test_id"/>');
            //$('#free_call_mobile_ab_test_id').attr('id',free_call_mobile_ab_test);
            // setCookie('free_call_mobile_ab_test_id',free_call_mobile_ab_test,3600);
        }
    });
}
//google analytics 统计
// page 当前页面
// action 动作及其位置
function googleAnalytics(ga_action)
{
    var action = ga_action.split(',');
    _gaq.push(['_trackEvent',action[0],action[1],action[2]]);
}

// 今日头条使用控制百分比下的高度不统一情况
$(function(){
    var itemHeight = $('.good-header').children('.bd').children('.cons-list').children('li').eq(0).height();
    // 同类型的兄弟节点统一高度
    $('.good-header').children('.bd').children('.cons-list').children('li').css({'height':itemHeight+'px'});
});

/*短信验证码的校验*/
function checkCaptcha(value) {
    var captchaRule=/^[0-9]{4}$/;
    if (!captchaRule.exec(value)){
        return false;
    }else{
        return true;
    }
}
//站点前缀+具体url方法封装，目的是解决m.comjia.com/sh/  通过window.location.href 进行跳转是将/sh/丢掉而进入北京站的问题。
function commonLocation(prefix, url) {
    return prefix  + url;
}


$(function(){
    /**
     * 关闭页面顶部app下载入口
     * date：2016.11.24
     */
    $(".topbar .ico-close").click(function(){
        $(".topbar").hide();
        $(".container").animate({"padding-top":"0"});
        $(".query").animate({"margin-top":"0"});
    });
});
/* 兼容性判断*/

function adjust() {//安卓line-height偏上
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        $("html").attr("data-type", 1);//判断机型，安卓为1
    }else if(/ios/.test(ua)){
        $("html").attr("data-type", 2);//判断机型，ios为2
    }
}
$(function () {
    adjust();
});
/* 兼容性判断*/
/*没有下载app*/
if ( !$(".topbar").length > 0 ) {
    $(".container").css({
        paddingTop:0
    })
}
/*回顶部*/
$(".return-top").on("click",function () {
    $('body,html').animate({scrollTop: 0}, "200");
    return false;
});
/**
 *提示弹框
 * time:多产时间内消失；
 * num：个数；
 */
function showPropMsg(time,num) {
    var propMsg = $(".prop-msg");
    propMsg.find(".num").text(num);
    propMsg.fadeIn(0,function () {
        propMsg.fadeOut(time);
    })
}
window.onload = showPropMsg(2000,500);