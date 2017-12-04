$(function () {
    var rulesHtmlStr = "";
    var _item = null;
    //添加分配条件弹层
    $(".group-opt .btn-add").click(function () {
        popup(addConfigRulesHtmlStr, 2);
        _item = $(this);
    });

    //编辑分配条件弹层
    $(document).on("click", ".group-opt .btn-edit", function () {
        popup(editConfigRulesHtmlStr, 2);
    });


    //删除分配条件提示框
    var _delItem = null;
    $(document).on("click", ".group-opt .btn-del", function () {
        popup(configRulesDelTips, 2);
        _delItem = $(this);
    });

    //删除当前分配条件
    $(document).on("click", ".layer-del-tips .btn-commit", function (e) {
        _delItem.parents(".c-mod").remove();
    });


    //添加分配条件

    $(document).on("click", ".layer-config-rules-add .btn-commit", function () {
        var ruleNum = parseInt($(".config-rules-list .c-mod:last .tit span.num").text());
        var formModHtml = '';
        rulesHtmlStr = '';
        var checkedItem = $(this).parents(".layer-config-rules-add").find(".c-chked li .c-chk:checked");
        ruleNum = ruleNum+1;
        rulesHtmlStr += '<div class="c-mod c-mod-rules-' + ruleNum + '">' +
        '<div class="tit">' +
        '<h4>分配条件<span class="num">' + ruleNum + '</span></h4>' +
        '<div class="group-opt">' +
        '<a class="btn-del" href="#">删除分配条件</a>' +
        '<a class="btn-edit" href="#">编辑字段</a>' +
        '</div>' +
        '</div>' +
        '<div class="con">';

        formModHtml = '';
        formModHtml += '<ul class="form-mod">';

        var formModeHtmlMain = '';
        for (var i = 0; i < checkedItem.length; i++) {
            formModeHtmlMain += '<li><div class="th">'+ $(checkedItem[i]).next(".txt").text() +'：</div><div class="td"><input class="form-control" type="text"></div></li>';
        }
        formModHtml += formModeHtmlMain;
        formModHtml += '</ul>';

        rulesHtmlStr += formModHtml;
        rulesHtmlStr + '</div>' +
        '</div>';
        $(rulesHtmlStr).appendTo(".config-rules-list");
    });


});

/**
 * 添加分配条件弹层
 */
var addConfigRulesHtmlStr = '<div class="layer layer-config-rules layer-config-rules-add">' +
    '<div class="layer-title">' +
    '<h3>添加分配条件</h3>' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="ruls-list">' +
    '<p>请选择本次新增的分配条件中的分配字段</p>' +
    '<ul class="c-chked">' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">了解途径</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">联系途径</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">设备来源</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">最低总价预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">最高总价预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">最低首府预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">最高首府预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">关注区域</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">感兴趣楼盘</span></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit" type="button">确认</button>' +
    '</div>' +
    '</div>';


/**
 * 编辑分配条件
 */
var editConfigRulesHtmlStr = '<div class="layer layer-config-rules layer-config-rules-edit">' +
    '<div class="layer-title">' +
    '<h3>添加分配条件</h3>' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="ruls-list">' +
    '<p>请选择本次新增的分配条件中的分配字段</p>' +
    '<ul class="c-chked">' +
    '<li><input class="c-chk" type="checkbox" checked/><span class="txt">了解途径</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">联系途径</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">设备来源</span></li>' +
    '<li><input class="c-chk" type="checkbox" checked/><span class="txt">最低总价预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">最高总价预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">最低首府预算</span></li>' +
    '<li><input class="c-chk" type="checkbox" checked/><span class="txt">最高首府预算</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">关注区域</span></li>' +
    '<li><input class="c-chk" type="checkbox"/><span class="txt">感兴趣楼盘</span></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit" type="button">确认</button>' +
    '</div>' +
    '</div>';

/**
 * 删除分配条件确认提示
 */
var configRulesDelTips = '<div class="layer layer-del-tips">' +
    '<div class="layer-title">' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<div class="msg-con">' +
    '<p>确认要删除此分配条件？</p>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit" type="button">确认</button>' +
    '</div>' +
    '</div>';