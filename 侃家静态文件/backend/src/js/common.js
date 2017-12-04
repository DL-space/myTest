/*
 *新系统共用JS方法存放文件
 */

//时间插件
$('.time').on('focus', function () {
    WdatePicker({dateFmt: 'yyyy-M-d H:mm:ss'});
});
$('.time_day').on('focus', function () {
    WdatePicker({dateFmt: 'yyyy-MM-dd'});
});
$('.time_month').on('focus', function () {
    WdatePicker({dateFmt: 'yyyy-MM'});
});
//手机号码的校验
function checkTel(value) {
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{9}|17[0-9]{9})$/;
    if (isMob.test(value) || isPhone.test(value)) {
        return true;
    } else {
        return false;
    }
}
//关于是否为数字的校验
function checkNumber(value) {
    var isNumber = /^\d+(\.\d+)?$/;
    if (isNumber.test(value)) {
        return true;
    } else {
        return false;
    }
}

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
// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
//简单的验证
function isCardNo(card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card)) {
        return true;
    } else {
        return false;
    }
}

/**
 * tab切换(默认hover)
 * demo $(".tab-area").tabChange();
 */
(function ($) {
    $.fn.extend({
        tabChange: function (options) {
            //默认参数
            var defaults = {
                event: 'mouseover'
            };
            //参数合并
            options = $.extend({}, defaults, options);
            var self = $(this),
                tabItem = self.find(".tab-content>li"),
                menuItem = self.find(".tab-menu>li");
            menuItem.bind(options.event, function () {
                menuItem.removeClass("active");
                $(this).addClass("active");
                tabItem.removeClass("active");
                tabItem.eq($(this).index()).addClass("active");
            });
            return this;
        }
    });
})(jQuery);

$(function () {
    //导航条划过显示下拉菜单项
    if ($(".navbar-nav").length > 0) {
        $(".navbar-nav").bootstrapDropdownOnHover();
    }

    if ($(".navbar").length > 0) {
        $(".navbar").pin({
            containerSelector: ".container-all-wrap"
        });
    }
    $(".layer-intention .layer-close,.layer-intention .layer-btn-reset").click(function () {
        $(".layer-intention").hide();
        $(".popover-mask").hide();
    });

    var feedbackLayerIndex;
    //意见反馈弹层
    $(".btn-feedback").click(function () {
        /*判断设备*/
        var wid;
        if (pm_flag == true) {
            wid = "600px";
        } else {
            wid = "100%";
        }
        feedbackLayerIndex = popup(feedbackHtmlStr, 2, null, null, "", wid);
    });

    //意见反馈模拟弹层，套页面时删除该部分代码即可
    $(document).on("click", ".layer-feedback .btn-commit", function () {
        layer.close(feedbackLayerIndex);
        popup(feedbackTips, 2, null, null, "", "600px");
    })

    //用户信息
    var isUserShow = true;
    $('.link-user').mouseover(function () {
        if (isUserShow) {
            $(this).children(".dropdown-menu-user").show();
        }
        isUserShow = false;
    }).mouseleave(function () {
        $(this).children(".dropdown-menu-user").hide();
        isUserShow = true;
    });
})

/*checkbox全选、全不选*/
$(".module").click(function () {
    var _item = $(this);
    if (_item.is(":checked")) {
        _item.parent().parent().next().find(":checkbox").prop("checked", true);
    } else {
        _item.parent().parent().next().find(":checkbox").prop("checked", false);
    }
});
//发送消息弹层html结构
var popup_system_msg_html = '<div class="layer clearfix">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<p>向所属咨询师发送系统消息提醒</p>' +
    '<textarea class="form-control system_msg_content" maxlength="100"></textarea><span style="color: rgb(255, 0, 0);"></span>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">发送消息</button>' +
    '</div>' +
    '</div>';
//发送消息弹层html结构
var popup_system_msg_to_server_html = '<div class="layer clearfix">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<p>请输入消息内容:</p>' +
    '<textarea class="form-control system_msg_content"></textarea><span style="color: rgb(255, 0, 0);"></span>' +
    '<p>请输入本次联系内容:</p>' +
    '<div class="form-group"><div class="call_log" data-id="call_log"><label><input type="checkbox" name="call_log_content2[]" value="1"> 新增用户</label><label><input type="checkbox" name="call_log_content2[]" value="2"> 基本信息修改</label><label><input type="checkbox" name="call_log_content2[]" value="3"> 需求更改</label><label><input type="checkbox" name="call_log_content2[]" value="4"> 修改状态</label><label><input type="checkbox" name="call_log_content2[]" value="5"> 告知咨询师</label></div><textarea class="call_log_extr_content2 form-control" placeholder="自定义..."></textarea></div>' +
    '<input type="hidden" class="form-control call_log_content">' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">发送消息</button>' +
    '</div>' +
    '</div>';
var popup_review_msg_html = '<div class="layer clearfix">' +
    '<div class="layer-title">楼盘点评驳回原因' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<p>驳回原因:</p>' +
    '<textarea class="form-control reject_reason"></textarea>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-primary btn-commit fr" type="button">确定</button>' +
    '</div>' +
    '</div>';

//设置楼盘点赞基数
var popup_review_like_base_html = '<div class="layer clearfix">' +
    '<div class="layer-title">修改点赞基数' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<p>点赞基数:</p>' +
    '<input type="text" class="form-control like_base">' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-primary btn-commit fr" type="button">确定</button>' +
    '</div>' +
    '</div>';

//合并订单
var orderMergeHtml = '<div class="layer layer-order clearfix">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="order-info">' +
    '<div class="order-item">' +
    '<div class="th">订单ID：</div>' +
    '<div class="td">asb12345677</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">客户姓名：</div>' +
    '<div class="td">AAAAA(134XXXXXXXX)</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">合并订单ID：</div>' +
    '<div class="td">' +
    '<input type="text" class="order-id">' +
    '<a href="javascript:void(0);" class="order-check">检测</a>' +
    '</div>' +
    '</div>' +
    '<div class="order-detail" id="order-merge-detail">' +
    '<div class="order-item">' +
    '<div class="th">客户姓名：</div>' +
    '<div class="td">BBBB(131xxxxxxxx)</div>' +
    '</div><div class="order-item">' +
    '<div class="th">客户描述：</div>' +
    '<div class="td">好人是我，我是好人，我的订单多，你的订单好如果出租公司大手笔投入做专车，就要做好股价一泻千里的思想准备</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="btn-area">' +
    '<a class="btn btn-primary btn-xs" href="#">提交</a>' +
    '<a class="btn btn-default" href="#">取消</a>' +
    '</div>' +
    '</div>' +
    '</div>';


//合并带看
var dkMergeHtml = '<div class="layer layer-order clearfix">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="order-info">' +
    '<div class="order-item">' +
    '<div class="th">订单ID：</div>' +
    '<div class="td">asb12345677</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">带看ID：</div>' +
    '<div class="td">555</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">客户姓名：</div>' +
    '<div class="td">AAAAA(134XXXXXXXX)</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">组合带看ID：</div>' +
    '<div class="td">' +
    '<input type="text" class="order-id">' +
    '<a href="javascript:void(0);" class="link-check check-dk">检测</a>' +
    '</div>' +
    '</div>' +
    '<div class="order-detail" id="dk-customer-info">' +
    '<div class="order-item">' +
    '<div class="th">客户姓名：</div>' +
    '<div class="td">BBBB(131xxxxxxxx)</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">带看时间：</div>' +
    '<div class="td">2015-12-12</div>' +
    '</div>' +
    '<div class="order-item">' +
    '<div class="th">带看楼盘：</div>' +
    '<div class="td"><a href="#">万科新里程</a><a href="#">长阳半岛</a><a href="#">北京城建密码</a><a href="#">东方玫瑰园</a><a href="#">亦庄国悦居</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="btn-area">' +
    '<a class="btn btn-primary btn-xs" href="#">提交</a>' +
    '<a class="btn btn-default" href="#">取消</a>' +
    '</div>' +
    '</div>' +
    '</div>';


//修改客户意向
//var customer_intention_pop_html = '<div class="layer layer-intention"><div class="layer-title"><h3>客户意向</h3><a href="#" class="layer-close">Close</a></div><div class="layer-body"><div class="msg-con"><ul class="intent-sel"><li><div class="th">客户意向：</div><div class="td"><select id="intent-edit" class="form-control"><option value="0">有</option><option value="1">无</option><option value="2">保留</option></select></div></li><li class="intent-date"><div class="th">保留至：</div><div class="td"><input type="text" class="form-control time"/></div></li></ul></div></div><div class="layer-footer"><button class="btn btn-default layer-btn-reset" type="reset">取消</button><button class="btn btn-primary btn-commit" type="button">确认</button></div></div>';
//文字信息弹层头部
var popTipsHtmlTop = '<div class="layer">' +
    '<div class="layer-title">' +
    '<h3>消息提示</h3><a href="javascript:void(0);" target="_self" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="layer-con">' +
    '<p>';
//文字信息弹层尾部
var popTipsHtmlBottom = '</p>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button><button class="btn btn-primary btn-commit" type="button">确认</button>' +
    '</div>' +
    '</div>';

/* 拼接弹层的html结构
 *@param string/html content:弹层信息主体
 *return html
 */
function pageHtml(content) {
    var htmlContent = content;
    return htmlContent;
}

/*公共弹层函数
 *@param html  要传入的html结构
 *@param type  弹层类型 1：简单文本信息提示层，2：带有输入等交互的弹层
 *@param func
 *@param data func参数所需的数据，如果需要
 *@param commit_url  确认按钮的跳转url
 *@param offset string 弹层坐标,默认垂直、水平居中
 */
function popup(htmlContent, type, func, data, commit_url, area, offset) {
    var htmlContent = htmlContent;
    if (type == "1") {
        htmlContent = popTipsHtmlTop + htmlContent + popTipsHtmlBottom;
        htmlContent = pageHtml(htmlContent);
    } else if (type == "2") {
        htmlContent = pageHtml(htmlContent);
    }
    //根据页面宽度自适应弹层的宽度
    //页面宽度大于768px（参考bootstrap定义最小屏幕宽度值），则固定宽度为400px
    //页面宽度小于768px，则设置弹层宽度为页面宽度的80%
    var pageWidth = document.body.clientWidth;
    var layerWidth;

    //设置弹层坐标
    if (offset == "undefined") {
        offset = "";
    } else {
        offset = offset;
    }


    if (area) {
        layerWidth = area;
    } else {
        if (pageWidth > 768) {
            layerWidth = '400px';
        } else {
            layerWidth = '80%';
        }
    }

    var index = layer.open({
        type: 1,   //必填， 默认0,可传入值：0：信息框，1：页面层，2：iframe层，3：加载层，4：tips层
        area: layerWidth,
        title: false,
        closeBtn: false,
        shadeClose: true,
        border: 0,
        offset: offset,
        content: htmlContent,
        success: function () {
            if (typeof commit_url != "undefined" && commit_url.length != 0) {
                $(".btn-commit").on("click", function () {
                    location.href = commit_url;
                });
            }

            if (typeof func == "object" || typeof func == "undefined") {
                $(".layer-close,.layer-btn-reset,.btn-commit").on("click", function () {
                    layer.close(index);
                });
            }

            if (typeof func == "function") {
                $(".layer-close,.layer-btn-reset,.btn-commit").click(function () {
                    layer.close(index);
                });
                $(".btn-commit").click(function () {
                    func(data);
                });
            }
        }
    });
    return index;
}


$(function () {
    //筛选条件：默认收起
    // button_more();

    //筛选条件：收起、展开
    $("#searchmore-bt").click(function () {
        button_more();
    });

    //合并订单
    $(".repeat_order").click(function () {
        popup(orderMergeHtml, 2);
        $(".order-check").click(function () {
            if (displayHtmlEle("order-merge-detail")) {
                $("#order-merge-detail").show();
            }
        });
    });
})


/*
 *筛选条件：展开、收起
 */
function button_more() {
    var hidden_show_more = $("#hidden_show_more").val();
    var closeMore = $(".closemore");
    if (hidden_show_more == 1) {
        closeMore.show(300);
        $(".sel_text").text("收起");
        $(".sel-more .ico-row").css({
            "background-position": "10px -40px",
            "margin-bottom": "2px"
        });
        $(".selector").css({
            "padding-top": "15px",
            "border": "1px solid #ebebeb",
            "border-bottom": "none"
        });
        $("#hidden_show_more").val(2);
    } else if (hidden_show_more == 2) {
        closeMore.hide(300);
        $(".sel_text").text("筛选条件");
        $(".sel-more .ico-row").css({
            "background-position": "10px 0",
            "margin-bottom": "1px"
        });
        $(".selector").css({
            "border": "none",
            "padding-top": 0
        });
        $("#hidden_show_more").val(1);
    }
};


$(function () {
    //添加客户页面 点击添加input框的点击事件
    $('.ico-del').on('click', function () {
        delInputGroup($(this));
    });
    //添加客户页面 点击删除input框的点击事件
    $('.ico-plus').click(function () {
        addInputGroup($(this));
    });
})
/**
 * @author mingming.li
 * @param {type} obj 点击需要增加的input框元素
 * @returns 逐一增加
 */
function addInputGroup(obj) {
    var labelStr = obj.parent().children('.form-group:first').children('label').html();
    labelStr = labelStr.replace('：', '');
    var size = obj.parent().children('.form-group').size() + 1;
    var htmlStr = obj.parent().children('.form-group').eq(size - 2);
    if (size > 1) {
        obj.parent().children('a.ico-del').removeClass('hidden');
    }
    var str = htmlStr.clone();
    str.children('label').html(labelStr + '：');
    str.children('.input-group-sm').children('input.form-control').val("");
    htmlStr.after(str);

    //按需给后来生成的元素绑定所需事件
    delegate_some_needed_event_handle(obj);
}
/**
 * @author mingming.li
 * @param {type} obj 点击需要删除的input框元素 保留一个input输入框
 * @returns 逐一删除
 */
function delInputGroup(obj) {
    var size = obj.parent().children('.form-group').size();
    if (size <= 2) {
        obj.parent().children('a.ico-del').addClass('hidden');
    }
    obj.prev().remove();
}
/**
 * @author jing
 * @param {type} JQuery对象  该对象对应于 addInputGroup 函数中的obj
 */
var delegate_some_needed_event_handle = function ($obj) {

    //对下拉联想的事件进行绑定
    var $input = $obj.siblings('.form-group:last').find('input');
    if ($input.hasClass('autocomplete')) {
        //锁定数据
        var data = [];
        var data_source = $input.attr('data-source');
        if (data_source != 'undefined') {
            data = all_order_auto_complete_data[data_source];
        }
        delegate_auto_complete_event($input, data);
    }
}

/**
 * 下拉联想autocomplete方法  如果绑定事件则为：autocompletechange
 * @author jing
 * @param JQuery对象  input输入框
 * @data 下拉数据 JSON格式
 */
var delegate_auto_complete_event = function ($obj, data) {

    if (typeof(data) == 'undefined' || data.length == 0) {
        data = [];
    }

    $obj.autocomplete({
        autoFocus: false,
        //数据源
        source: data,
        minLength: 0,
        autoFocus: true,
        select: function (event, ui) {
            //data-val 赋值
            $obj.attr('data-val', ui.item.id);
        },
        change: function (event, ui) {
            if (ui.item == null) {
                $(this).attr('data-val', null);
                $(this).val(null);
            }
        }
    }).focus(function (event, ui) {
        $(this).autocomplete("search");
    });
}

/**
 * 订单状态的更改，自动的更改为下一个状态，目前只开放对确认收到分配的操作
 * @param order_id  订单的ID
 * @param current_status  订单的当前状态
 * @param url  string  Ajax所需的URL
 */

var ajaxConfirmDistribute = function (order_id, current_status, url) {
    //确认收到分配的操作
    if (current_status == 10) {
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                order_id: order_id,
                current_status: current_status
            },
            beforeSend: function () {
                $(this).prop('disabled', 'disabled');
            },
            success: function (rsp) {
                if (rsp) {
                    if (confirm(rsp))
                        location.reload();
                }
            },
            complete: function () {
                $(this).removeProp('disabled', 'disabled');
            }
        });
    }

    return false;
}

//设置footer置底
function setFooterBottom() {
    var pHeight = document.body.scrollHeight;  //网页正文高度
    var wHeight = document.body.clientHeight;  //电脑屏幕高度，在网页正文高度小于屏幕高度的时候，二者值相等
}
setFooterBottom();


/* 控制显示与隐藏html元素
 * @param id string 元素id
 */
function displayHtmlEle(id) {
    var htmlOj = $("#" + id);
    if (htmlOj.is(":visible")) {
        htmlOj.hide();
    } else if (htmlOj.is(":hidden")) {
        htmlOj.show();
    }
}
/*
 * 用户公共部分 左侧 用户意向修改
 * */
$('.layer-intention .btn-commit').click(function () {
    var intent = $("#edit_intent").val();
    var enddate = $(".enddate").val();
    var statement = $(".statement").val();
    //var nolike    = $(".nolike").val();
    var intent_low_reason = $("#intent_low_reason").val();
    var public_pool_flag = $("#public_pool_flag").val();
    var order_note = $("#order_note").val();
    if (intent == 1 && intent_low_reason == intent_low_please_select) {
        $('.intent-msg').text("请填写无意向说明");
        return false;
    }
    if (intent == 1 && (public_pool_flag == '' || public_pool_flag == '0')) {
        $('.public_pool_flag_tip').text("请选择是否将客户放入公共池");
        return false;
    }
    if (intent == 1 && order_note == '') {
        $('.order_note_tip').text("请填写客户情况说明");
        return false;
    }

    var statement = $('#reserve_statement').val();
    var enddate = $('#reserve_enddate').val();

    if (intent == 2 && (statement == '' || enddate == '')) {
        $('.reserve-msg').text("请填写保留说明和时间");
        return false;
    }
    $.ajax({
        type: 'POST',
        data: {
            intent: intent,
            order_id: order_id,
            enddate: enddate,
            statement: statement,
            intent_low_reason: intent_low_reason,
            order_note: order_note,
            public_pool_flag: public_pool_flag
        },
        url: '/index.php?r=yw-order-require/edit-intent',
        success: function (data) {
            data = parseInt(data);
            if (data > 0) {
                switch (data) {
                    case 1:
                        $('.intent-detail').text('无');
                        //变成无意向后，不可再点击修改
                        $('.intention').unbind('click');
                        $('.intention').css({"cursor": "text"});
                        location.reload();
                        break;
                    case 2:
                        $('.intent-detail').text('保留');
                        location.reload();
                        break;
                    case 3:
                        $('.intent-detail').text('有');
                        location.reload();
                        break;
                }
            }
        }
    });
    $(".layer-intention").hide();
    $(".popover-mask").hide();
});

//计算时间差
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/-/g, "/");
    endTime = endTime.replace(/-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum)); //17jquery.com
}
//新增预约联系确认弹层
var popTipsApp = '<div class="layer layer-tips-cancel clearfix"><div class="layer-title"><a href="#" class="layer-close">Close</a></div><div class="layer-body"><div class="msg-con"><p>确定取消预约带看，增加预约联系吗？</p></div></div><div class="layer-footer"><button class="btn btn-default layer-btn-reset" type="reset">取消</button><a class="btn btn-primary btn-commit" href="dk-record.html">确认</a></div></div>';
$(function () {
    //新增预约联系提示弹层
    $(".btn-app-save").click(function () {
        popup(popTipsApp, 2)
    });
})
//当前JS获取当前时间
function CurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //分

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10)
        clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
function clickSubscribe(order_id, project_id, project_name, see_datetime, id) {
    var subscribe = 'index.php?r=yw-subscribe/create&order_id=' + order_id + '&status=1&project_id=' + project_id + '&project_name=' + project_name + '&see_datetime=' + see_datetime + '&see_project_list_id=' + id;
    var rownum = 'index.php?r=yw-subscribe/create&order_id=' + order_id + '&status=3&project_id=' + project_id + '&project_name=' + project_name + '&see_datetime=' + see_datetime + '&see_project_list_id=' + id;
    var popTipsSubscipttionNode = '<div class="layer layer-node clearfix"><div class="layer-title"><a href="#" class="layer-close">Close</a></div><div class="layer-body"><div class="msg-con"><p class="opration-tips">请选择认购节点：</p><div class="btn-area"><a class="btn btn-primary btn-xs" href=' + rownum + '>排号</a><a class="btn btn-primary btn-xs" href=' + subscribe + '>认购</a><a class="btn btn-primary btn-xs" onclick="addFreeCard(' + id + ')">免费排卡</a><span id="message"></span><p>【重要提示】：“免费排卡”仅给本次带看打一个标记，不会计入定房统计，也无需录入详细信息（强烈建议在本次带看的备注中写出排卡户型等信息），未来本用户正式交钱排号或认购时，咨询师仍需按正常流程在真正交钱的那次带看中重新创建“定房”。</p></div></div></div></div>';
    popup(popTipsSubscipttionNode, 2);
}
function clickSign(order_id, id, project_id, project_name) {
    var NET_SIGN = 'index.php?r=yw-sign/create&id=' + id + '&order_id=' + order_id + '&status=1&project_id=' + project_id + '&project_name=' + project_name;
    var GRASS_SIGN = 'index.php?r=yw-sign/create&id=' + id + '&order_id=' + order_id + '&status=3&project_id=' + project_id + '&project_name=' + project_name;
    var popTipsSubscipttionNode = '<div class="layer layer-node clearfix"><div class="layer-title"><a href="#" class="layer-close">Close</a></div><div class="layer-body"><div class="msg-con"><p class="opration-tips">请选择签约节点：</p><div class="btn-area"><a class="btn btn-primary btn-xs" href=' + GRASS_SIGN + '>草签</a><a class="btn btn-primary btn-xs" href=' + NET_SIGN + '>网签</a><a class="btn btn-primary btn-xs layer-btn-reset">取消</a></div></div></div></div>';
    popup(popTipsSubscipttionNode, 2);
}

//审核认购订单弹层html
var examineHtmlContent = '<div class="layer layer-examine">' +
    '<div class="layer-title">' +
    '<h3>审核结果</h3>' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<ul class="examine-result">' +
    '<li>审核结果:</li>' +
    '<li><div class="chi-rd"><input type="radio" class="radio"/>通过</div></li>' +
    '<li><div class="chi-rd"><input type="radio" class="radio"/>不通过</div></li>' +
    '</ul>' +
    '<textarea class="ipt-text"></textarea>' +
    '<div class="btn-area">' +
    '<a class="btn btn-default btn-xs" href="#">取消</a><a class="btn btn-primary btn-xs">确定</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
$(function () {
    $(".btn-examine").click(function () {
        popup(examineHtmlContent, 2);
    });
});

//避免表单重复提交
function avoidResubmit(button_class, button_style) {
    $('.' + button_class).removeClass(button_style);
    $('.' + button_class).css({'cursor': 'default'});
    $('.' + button_class).unbind('click');
}


//850 楼盘项提醒的代办消息不停的发送，提醒的时间也不正确 张龙 2016-3-24
//========添加通用的post删除方法 张龙 2016-3-24============//
function confirmDel(id, confirm_str) {
    if (confirm_str != '') {
        var result = confirm(confirm_str);
        if (result) {
            ajaxDel(id);
        }
    } else {
        ajaxDel(id);
    }
    return true;
}

function ajaxDel(id) {
    $.ajax({
        url: del_url + "&id=" + id,
        type: 'post',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (data) {
            if (data == true) {
                window.location.reload();
            }
        }
    });
}
//========添加通用的post删除方法============//

//jquery 时间戳和时间相互转换方法
//使用方法
//console.log($.myTime.DateToUnix('2014-5-15 20:20:20'));
//console.log($.myTime.UnixToDate(1325347200));
(function ($) {
    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)
             */
            CurTime: function () {
                return Date.parse(new Date()) / 1000;
            },
            /**
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式
             * @return <int>        unix时间戳(秒)
             */
            DateToUnix: function (string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                    )).getTime() / 1000;
            },
            /**
             * 时间戳转换日期
             * @param <int> unixTime    待时间戳(秒)
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
             * @param <int>  timeZone   时区
             */
            UnixToDate: function (unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number') {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (time.getUTCMonth() + 1) + "-";
                ymdhis += time.getUTCDate();
                if (isFull === true) {
                    ymdhis += " " + time.getUTCHours() + ":";
                    ymdhis += time.getUTCMinutes() + ":";
                    ymdhis += time.getUTCSeconds();
                }
                return ymdhis;
            }
        }
    });
})(jQuery);

$(function () {
    //input type=file控件美化
    var iptArea = $(".up-area");
    iptArea.each(function () {
        var that = $(this);
        var btnIpt = that.find(".btn-input-file");
        var iptFile = that.find(".input-file");
        btnIpt.on("click", function () {
            iptFile.trigger("click");
        })
    });

    /**
     * 设置导航下拉菜单过长时的滚动条
     * 该出设置滚动条不可取，因为二级菜单下面还有一级菜单，滚动条设置位置没法固定，还会导致三级菜单无法显示
     */
    //var maxDropdownHeight = $(document.body).height() - 120;
    //$(".navbar-nav > li.dropdown > ul.dropdown-menu").css({
    //    "max-height": maxDropdownHeight + "px",
    //    "overflow-y":"auto"
    //});

});

//意见反馈弹层html结构
var feedbackHtmlStr = '<div class="layer layer-feedback">' +
    '<div class="layer-title">' +
    '<h2>意见反馈</h2>' +
    '<a class="layer-close" href="#">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<!--反馈提示-->' +
    '<div class="feed-tips">' +
    '<img src="../images/img-feed-tips.png" alt="" class="pic"/>' +
    '<p>反馈后有小彩蛋，骗你是小狗！！！</p>' +
    '</div>' +
    '<div class="feed-con">' +
    '<h4>系统哪里不合心意：</h4>' +
    '<textarea class="feed-text" placeholder="系统哪里不合心意，都是我的锅，我来改"></textarea>' +
    '</div>' +
    '<div class="feed-con">' +
    '<h4>工作中有什么问题：</h4>' +
    '<textarea class="feed-text" placeholder="工作中有什么问题，无论什么方面，不论问题大小，统统告诉我，说不定我能帮忙"></textarea>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-commit" type="button">提交</button>' +
    '</div>' +
    '</div>';

//意见反馈成功提示
var feedbackTips = '<div class="layer layer-feedback">' +
    '<div class="layer-title">' +
    '<h2>意见反馈</h2>' +
    '<a class="layer-close" href="#">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '   <!--反馈提示-->' +
    '<div class="feed-tips-success">' +
    '<p class="succ-tips"><span class="ico ico-succ"></span>您已提交成功！</p>' +

    '<div class="text">' +
    '<p>俺会使出吃奶的劲儿想办法帮您解决的，再次叩谢！</p>' +
    '<p>最后，一点小心意，送上鹏哥飞吻一枚！</p>' +
    '<p>听说你觉得不够，再来一个！</p>' +
    '</div>' +
    '<div class="tips-pic"><img class="pic" src="../images/img-feedback-success.png" alt=""/></div>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer"></div>' +
    '</div>';


/*判断手机还是pc*/
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

var pm_flag = IsPC(); //true为PC端，false为手机端

/*2017.11.15改版，输入框部分*/
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
$(document).on("click",".j-select .content",function () {
    var that = $(this),
        jSelect = that.parents(".j-select"),
        option = jSelect.find(".option"),
        optionItem = option.find("li");
    option.is(":hidden")?option.slideDown(200,function () {
        $(document).on("click",function(e){
            var target = $(e.target);
            if(target.closest(that).length == 0){
                option.slideUp(200);
            }
        })
    }):option.slideUp(200);
    optionItem.click(function () {
        var text = $(this).text();
        option.slideUp(200);
        that.prop("value",text);
        that.attr("value",text);
    });
});
