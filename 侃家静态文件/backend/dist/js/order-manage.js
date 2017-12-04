/**
 * 订单管理  2016.11.15
 */

$(function () {
    var $corder_item = $('.c-order-item:last-child');
    $corder_item.on('mousedown', function () {
        $('body').css('padding-bottom', '200px');
    });


    // 鼠标移入时候 HTML  当 html 结构中含所有 $zoomMask
    var $order = $('.c-order-pic-area');

    $order.on('mouseover', function () {
        // 绑定点击函数
        var $zoomMask = $('.zoomMask');
        $zoomMask.on('click', function () {
            // 获取当前 div 的兄弟元素的  子元素中的 img
            var $bigimg = $(this).prev().find('.bigimg');
            // 对象
            $.openPhotoGallery($bigimg);
        })
    });


    var orderItem = $(".c-order-item");
    orderItem.each(function () {
        var jqZoom = $(this).find(".jqzoom");
        if (jqZoom.length > 0) {
            jqZoom.imagezoom();
            orderItem.parents(".center").css("padding-bottom", "230px");
            $(this).children(".c-thumb").find(".c-thumb-pic").click(function () {
                $(this).parents("li").addClass("c-selected").siblings().removeClass("c-selected");
                jqZoom.attr("src", $(this).attr("data-mid"));
                jqZoom.attr("rel", $(this).attr("data-big"));
            });
        }
    });

    //订单详情页放大镜效果
    if ($(".c-order-item-detail").length > 0) {
        $(".c-order-item-detail").parents(".center").css("padding-bottom", "280px");
        $(".c-order-item-detail").each(function () {
            $(this).find(".c-thumb-pic").imagezoom();
        });
    }


    //排号列表主管审核结果提示弹层
    $(".btn-check").click(function () {
        popup(chkRstHtml, 2, null, null, "");
    });

    $(document).on("change", ".layer-chkrst .c-rd", function () {
        var chkRst = $(this).attr("data-rst");
        if (chkRst == "0") {
            $(".msg-con").show();
        } else {
            $(".msg-con").hide();
        }
    });

    //退认购、排号提示弹层
    $(".btn-tph").click(function () {
        popup(rtRstHtml, 2, null, null, "");
    });

    //签约提示弹层
    $(".btn-sign").click(function () {
        popup(signTipsHtml, 2, null, null, "");
    });

    //添加排号、添加认购、添加草签、添加网签4个表单录入页面的删除当前添加的图片操作
    $(".c-upload-pic-list").each(function () {
        var icoDel = $(this).find(".c-ico-del");
        icoDel.click(function () {
            $(this).parent("li").remove();
        });
    });


    //预计回款
    $(".btn-yjhk").click(function () {
        var yjhkHtml = $(".dialog-yjhk").html();
        popup(dialogYjhk, 2, null, null, "", "500px");
    });


    //实际回款
    $(".btn-sjhk").click(function () {
        var sjhkHtml = $(".dialog-sjhk").html();
        popup(dialogSjhk, 2, null, null, "");
    });

    //回款方式
    $(document).on("click", ".chk-hkfs", function () {
        if ($(".chk-hzff").is(":checked")) {
            $(".skxx").removeClass("skxx-hide");
        } else {
            $(".skxx").addClass("skxx-hide");
        }
    });

    //发票状态
    $(document).on("change", ".sel-fpzt", function () {
        if ($(this).find("option:selected").text() == "已开票") {
            $(".skxx > li.kprq").show();
        } else {
            $(".skxx > li.kprq").hide();
        }
    });

    //到账时间与预计到账时间
    $(".d-cjd").change(function () {
        dateSelectByRadioCheck($(this));
    });
});


/**
 * 根据元素name属性显示不同的时间控件
 * eg. dateSelectByRadioCheck($(this));
 */
function dateSelectByRadioCheck(ele) {
    $(ele).parents(".td").children("." + $(ele).attr("name") + "-" + $(ele).attr("data-action")).show().siblings(".payment-all").hide();
}

//排号列表页主管审核审核结果弹层提示
var chkRstHtml = '<div class="layer layer-chkrst">' +
    '<div class="layer-title">审核结果' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="chk-result">' +
    '<div class="th">审核结果：</div>' +
    '<ul>' +
    '<li>' +
    '<input type="radio" name="c-rst" data-rst="1" class="c-rd">通过' +
    '</li>' +
    '<li>' +
    '<input type="radio" name="c-rst" data-rst="0" class="c-rd">不通过' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="msg-con">' +
    '<p>驳回原因:</p>' +
    '<textarea class="form-control"></textarea>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">确定</button>' +
    '</div></div>';

//退单原因
var rtRstHtml = '<div class="layer layer-rt">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<p>退单原因说明:</p>' +
    '<textarea class="form-control"></textarea>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">确定</button>' +
    '</div></div>';

//签约提示弹层
var signTipsHtml = '<div class="layer layer-sign">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="btn-area">' +
    '<a class="btn btn-primary">草签</a>' +
    '<a class="btn btn-primary">网签</a>' +
    '</div>' +
    '</div>' +
    '</div>';


//预计回款信息
var dialogYjhk = '<div class="css">' +
    '<div class="css-header"><h3>预计回款信息</h3></div>' +
    '<div class="css-body">' +
    '<div class="hkfs">' +
    '<div class="th">回款方式</div>' +
    '<div class="td">' +
    '<ul class="sel-value">' +
    '<li><input type="checkbox" class="chk-hkfs chk-hzff" checked>后置返费</li>' +
    '<li><input type="checkbox" class="chk-hkfs">前置电商</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<!--收款信息-->' +
    '<ul class="skxx">' +
    '<li>' +
    '<div class="th">返费可能性</div>' +
    '<div class="td">' +
    '<ul class="sel-value">' +
    '<li><input type="radio">高</li>' +
    '<li><input type="radio">中</li>' +
    '<li><input type="radio">低</li>' +
    '</ul>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">预计返费日期</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">预计返费金额</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '<span class="c-ext">元</span>' +
    '</div>' +
    '</li>' +
    '<li class="fpzt">' +
    '<div class="th">发票状态</div>' +
    '<div class="td">' +
    '<select class="form-control sel-fpzt">' +
    '<option value="0">待开票</option>' +
    '<option value="1">已开票</option>' +
    '<option value="2">无需开票</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li class="kprq">' +
    '<div class="th">开票日期</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li class="rmk">' +
    '<div class="th">回款情况</div>' +
    '<div class="td">' +
    '<textarea class="form-control" placeholder="限50字"></textarea>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="css-footer">' +
    '<button type="reset" class="btn btn-default layer-btn-reset">取消</button>' +
    '<button type="button" class="btn btn-primary btn-commit fr">保存</button>' +
    '</div>' +
    '</div>';


//实际回款信息
var dialogSjhk = '<div class="css">' +
    '<div class="css-header"><h3>实际回款信息</h3></div>' +
    '<div class="css-body">' +
    '<div class="hkfs">' +
    '<div class="th">回款方式</div>' +
    '<div class="td">' +
    '后置返费' +
    '</div>' +
    '</div>' +
    '<!--收款信息-->' +
    '<ul class="skxx ">' +
    '<li>' +
    '<div class="th">实际返费日期</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">实际返费金额</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '<span class="c-ext">元</span>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="css-footer">' +
    '<button type="reset" class="btn btn-default layer-btn-reset">取消</button>' +
    '<button type="button" class="btn btn-primary btn-commit fr">保存</button>' +
    '</div>' +
    '</div>';