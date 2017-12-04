$(function () {
    //留电
    $(function () {
        $(".btn-ld").click(function () {
            showDialog(1, telHtml);
        });
    });


    //预约成功
    $(function () {
        $(".btn-yycg").click(function () {
            showDialog(1, appHtml);
        });
    });
});


/**
 * app端弹层
 * @param type number 弹层类型 1:页面类型
 * @param content string 弹层内容
 * @param area string 弹层尺寸
 * @param fun_success function 点击确认按钮事件
 * @param fun_cancel function 点击取消按钮事件
 */
function showDialog(type, content, area, callback) {

    layer.open({
        type: type,
        title: false,
        closeBtn: false,
        shade: 0.6,
        //area:area,
        shadeClose: true,
        content: content,
        success: function (layero, index) {  //layero 当前层DOM，index 当前层索引
            $(document).on("click", ".dialog-btn-cancel", function () {
                layer.close(index);
            });

            $(document).on("click", ".dialog-btn-commit", function () {
                layer.close(index);
                if (typeof callback != "undefined") {
                    callback();
                }
            })
        }
    });
}


//关闭弹层
function closeDialog(index) {
    layer.close(index);
}


//留电咨询
var telHtml = '<div class="dialog">' +
    '<div class="dialog-header">' +
    '<h2>免费获取更多房源信息</h2>' +
    '</div>' +
    '<div class="dialog-body">' +
    '<div class="input-area">' +
    '<input class="ipt" type="text" placeholder="输入您的手机号码"/>' +
    '<button class="btn dialog-btn-commit btn-tel">留电咨询</button>' +
    '</div>' +
    '<div class="comjia-pro">' +
    '<p class="pro-tit">侃家网郑重承诺：' +
    '<p>1.充分尊重用户意愿，提供一对一温馨服务，免受中介骚扰之苦</p>' +
    '<p>2.保障用户信息安全，多重防护措施严格保护用户信息</p>' +
    '</div>' +
    '</div>' +
    '</div>';

//预约成功
var appHtml = '<div class="dialog">' +
    '<div class="dialog-body">' +
    '<div class="app-tips">' +
    '<span class="ico-success"></span>' +
    '<p class="app-info">您的预约已成功!</p>' +
    '<p class="app-info2">侃家咨询师将尽快与您联系～</p>' +
    '<div class="btn-area">' +
    '<button class="btn dialog-btn-commit">确认</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';