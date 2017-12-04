$(function () {
    setEmotion();//解析表情
});
/**
 * 获取url参数
 * @param name
 * @returns {null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

/**
 * 楼盘详情页，搜索周边专用的获取URL中的值
 * @returns {*}
 */
function getDetailUrlParam() {
    var url = window.location.href;
    if (url != '') {
        var url_arr = url.split('/');
        if (url_arr != '') {
            return url_arr[url_arr.length - 1];
        }
    }
    return;
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

function setCookie(name, value, tm) {//设置cookie
    if (tm == null || tm < 59) tm = 60;
    var exp = new Date();
    exp.setTime(exp.getTime() + tm * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


/**
 * //兼容性的公共的一句话提示弹窗，对已经封装好的弹窗的又一次封装
 * @param msg
 * @param msgType 一句话信息提示 交互按钮 ，1：只有一个确定按钮，2：有确定取消两个按钮
 */
function msg_tip(msg, msgType, func, data, commit_url) {
    if (msgType == '' || msgType == undefined) {
        msgType = 1;
        popLayer(1, msg, msgType);
    } else if (msgType == 2) {
        popLayer(1, msg, msgType, func, data, commit_url);
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
function popLayer(type, htmlContent, msgType, func, data, commit_url) {
    closeLayer();//弹出新弹层之前先清理一下，避免弹出多个弹层
    var htmlContentStr = "";
    var layerWidth = $(window).width();
    var layerHeight = $(window).height();
    if (layerWidth < 414) {
        layerWidth = 300 + "px";
        layerHeight = 'auto';
    } else {
        layerWidth = 400 + "px";
        layerHeight = 'auto';
    }
    if (type == 1) {
        if (msgType == 1) {
            htmlContentStr = layerTopHtml + htmlContent + layerBtnOneBottomHtml;
        } else if (msgType == 2) {
            htmlContentStr = layerTopHtml + htmlContent + layerBtnTwoBottomHtml;
        } else if (msgType == 3) {
            htmlContentStr = layerBaseTopHtml + htmlContent + layerBaseBottomHtml;
            layerWidth = $(window).width() + "px";
            layerHeight = layerWidth;
        }
    }
    if (type == 2) {
        htmlContentStr = htmlContent;
    }
    var layerIndex = layer.open({
        type: type,
        title: false,
        closeBtn: 1,
        shadeClose: true,
        scrollbar: false,
        shade: 0.7,
        area: [layerWidth, layerHeight],
        content: htmlContentStr,
        success: function () {
            layer_func(func, data, commit_url);//弹层上的事件
        }
    });
    $('.layui-layer').css({'background': 'none', 'box-shadow': 'none'});
    return layerIndex;
}

function layer_func(func, data, commit_url) {

    if (typeof commit_url != "undefined" && commit_url.length != 0) {
        $(".btn-submit").on("click", function () {
            location.href = commonLocation(site_url, commit_url);
        });
    }
    if (typeof func != "undefined") {
        $(document).on("click", ".btn-submit", function () {
            var res = func(data);
            if (res != false) {
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


//搜索
$('.pro_search').on('click', function () {
    var _item = $(this).parent().siblings().find('input');
    var d = _item.val();
    d = d.replace(/(^\s+)|(\s+$)/g, '');
    _item.val(d);
    var url = 'project/index?name=' + d;

    window.location.href = commonLocation(site_url, url);
});

/**
 * sina_emotion 表情插件2.1版本 解析表情方法.
 * 在涉及到表情解析的元素上添加类 setEmotion ，异步加载需要解析表情的时候调用setEmotion()即可
 */
function setEmotion() {
    if ($('.setEmotion').length > 0) {
        $('.setEmotion').parseEmotion();
    }
}


//删除上传的图片
$(document).on('click', '.ico-del', function () {
    $(this).parent().parent().remove();
});


//关注
function add_note(pro_id, is_login, obj) {
    if (is_login == 0) {
        msg_tip("请您先登录呦", 2, function () {
            window.location.href = login_url;
        });
        return false;
    }
    $.ajax({
        type: 'POST',
        url: add_note_url,
        data: {
            id: pro_id
        },
        beforeSend: function () {
            $(obj).attr('disabled', 'disabled');
        },
        success: function (rsp) {
            if (rsp == 1) {
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
            } else {
                msg_tip('评论失败，请您刷新网页之后重新提交');
            }
        },
        complete: function () {
            $(obj).removeAttr('disabled');
        }
    });
}

$(function () {
    $(document).on('click', '.click_op_act', function () {
        collectOpData($(this));
    })
});

function collectOpData(obj) {
    var op_type = obj.attr('data-op-type');
    var page_id = obj.attr('data-page-id');
    $.ajax({
        type: 'POST',
        url: collect_op_data_url,
        data: {
            op_type: op_type,
            page_id: page_id
        },
        success: function (rsp) {
        }
    })
}

var free_call_mobile_ab_test = '';
function abtest(ab_key, ab_value, ab_url, ab_user, ab_data, ab_id) {
    $.ajax({
        type: 'get',
        url: url_ab_test,
        data: {
            key: ab_key,
            value: ab_value,
            url: ab_url,
            user: ab_user,
            data: ab_data,
            id: ab_id
        },
        success: function (rsp) {
            // free_call_mobile_ab_test = rsp;
            //$('body').append('<input type="hidden" value="'+free_call_mobile_ab_test+'" id="free_call_mobile_ab_test_id"/>');
            //$('#free_call_mobile_ab_test_id').attr('id',free_call_mobile_ab_test);
            // setCookie('free_call_mobile_ab_test_id',free_call_mobile_ab_test,3600);
        }
    });
}

// 今日头条使用控制百分比下的高度不统一情况
$(function () {
    var itemHeight = $('.good-header').children('.bd').children('.cons-list').children('li').eq(0).height();
    // 同类型的兄弟节点统一高度
    $('.good-header').children('.bd').children('.cons-list').children('li').css({'height': itemHeight + 'px'});
});

/*短信验证码的校验*/
function checkCaptcha(value) {
    var captchaRule = /^[0-9]{4}$/;
    if (!captchaRule.exec(value)) {
        return false;
    } else {
        return true;
    }
}
//站点前缀+具体url方法封装，目的是解决m.comjia.com/sh/  通过window.location.href 进行跳转是将/sh/丢掉而进入北京站的问题。
function commonLocation(prefix, url) {
    return prefix + url;
}