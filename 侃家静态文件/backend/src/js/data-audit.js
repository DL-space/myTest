$(function () {
    //手动匹配弹层
    $(".btn-match").click(function () {
        popup(mtMatchHtml, 2, null, null, "", "700px");
    });

    //用户点评审核
    $(".cmt-edit").click(function () {
        $(this).siblings(".cmt-edit").children(".cmt-txt").removeClass("none");
        $(this).siblings(".cmt-edit").children(".form-control").addClass("none");
        $(this).parents("tr").siblings().find(".cmt-txt").removeClass("none");
        $(this).parents("tr").siblings().find(".form-control").addClass("none");
        $(this).children(".cmt-txt").addClass("none");
        $(this).children(".form-control").removeClass("none");
    });

    $(document).mouseup(function (e) {
        var _con = $(".cmt-edit");   // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            $(".cmt-edit .cmt-txt").removeClass("none");
            $(".cmt-edit .form-control").addClass("none");
        }
    });
});



//重新匹配弹层
$(".h-again").click(function () {
    popup(matchAgainHtml, 2, null, null, "");
});

//删除当前楼盘
$(".h-del").click(function () {
    $(this).parents(".h-data").remove();
});

//匹配楼盘组弹层
$(".btn-project-match").click(function () {
    popup(projectMatchHtml, 2, null, null, "");
});

//下拉框选择审核内容
$(".review-sel select").change(function () {
    window.location.href = $(this).find("option:selected").attr("data-url");
});

$(".info-switch").pin({
    containerSelector: ".exa-area-wrap",
    padding: {top: 50}
});

/**
 * ============================================================
 * 此部分为楼盘动态审核交互模拟，开发套页面时刻根据实际情况保留或删除
 */
//动态审核编辑
$(".btn-edit").click(function () {
    $(this).parents(".dt-item").find(".dt-detail").hide();
    $(this).parents(".dt-item").find(".dt-edit").show();
    btnEditDisplay($(this));
    exaBtnShow($(this));
});

//动态审核取消编辑、保存编辑按钮
$(".btn-cancel,.btn-save").click(function () {
    $(this).parents(".dt-item").find(".dt-detail").show();
    $(this).parents(".dt-item").find(".dt-edit").hide();
    $(this).hide();
    btnEditDisplay($(this));
    exaBtnShow($(this).siblings(".btn-edit"));
});

//审核通过按钮
$(".dt-item .tit .btn-success").click(function () {
    $(this).parents(".dt-item").find(".ico-tg").show();
    $(this).parents(".dt-item").find(".ico-wtg").hide();
    $(this).hide();
    $(this).next(".btn-danger").show();
});

//审核不通过按钮
$(".dt-item .tit .btn-danger").click(function () {
    $(this).parents(".dt-item").find(".ico-wtg").show();
    $(this).parents(".dt-item").find(".ico-tg").hide();
    $(this).hide();
    $(this).prev(".btn-success").show();
});

/**
 * 楼盘动态审核按钮的显示与隐藏
 * 点击编辑按钮时其他按钮的显示与隐藏
 * @param btnEditObj
 */
function exaBtnShow(btnEditObj) {
    var btnEdit = btnEditObj;
    var btnAuditPass = btnEdit.siblings(".btn-success"); //审核通过按钮
    var btnAuditPassNo = btnEdit.siblings(".btn-danger"); //审核不通过按钮
    if (btnEdit.is(":hidden")) {
        btnEdit.show();
        btnAuditPass.show();
        btnAuditPassNo.show();
    } else {
        btnEdit.hide();
        btnAuditPass.hide();
        btnAuditPassNo.hide();
    }
}

//楼盘动态编辑取消与保存按钮的显示与隐藏
function btnEditDisplay(obj) {
    var btnCancel = obj.siblings(".btn-cancel");
    var btnSave = obj.siblings(".btn-save");
    if (btnCancel.is(":hidden")) {
        btnCancel.show();
        btnSave.show();
    } else {
        btnCancel.hide();
        btnSave.hide();
    }
}

//批量操作
$(".dt-switch .btn-success").click(function () {
    $(".dt-item .ico-tg").show();
    $(".dt-item .ico-wtg").hide();
    $(".dt-item .tit .btn-success").hide();
    $(".dt-item .tit .btn-danger").show();
});
$(".dt-switch .btn-danger").click(function () {
    $(".dt-item .ico-tg").hide();
    $(".dt-item .ico-wtg").show();
    $(".dt-item .tit .btn-success").show();
    $(".dt-item .tit .btn-danger").hide();
});
//楼盘动态审核模拟交互结束


/**
 * ============================================================
 * 下面的只是模拟交互操作，开发套页面的时候，可以删除该部分代码
 */
//图片审核页面审核图片模拟操作
$(function () {
    //默认审核通过的隐藏“通过”按钮
    $(".p-mod .rst:contains( 通过)").parents(".txt").next(".btn-area").children(".btn-success").hide();

    //默认审核不通过的隐藏“不通过”按钮
    $(".p-mod .rst:contains(不通过)").parents(".txt").next(".btn-area").children(".btn-danger").hide();

    $(".p-mod").each(function () {
        var btnAuditPass = $(this).find(".btn-success");
        var btnAuditPassNo = $(this).find(".btn-danger");
        btnAuditPass.click(function () {
            var exaRstHtml = $(this).parents(".text").find(".rst");
            exaRstHtml.text("通过")
            $(this).hide();
            $(this).next(".btn-danger").show();
        });
        btnAuditPassNo.click(function () {
            var exaRstHtml = $(this).parents(".text").find(".rst");
            exaRstHtml.text("不通过");
            $(this).hide();
            $(this).prev(".btn-success").show();
        });
    });


    //批量操作
    $(".pic-switch .btn-success").click(function () {
        $(".p-mod .rst").text(" 通过");
        $(".p-mod .rst:contains( 通过)").parents(".txt").next(".btn-area").children(".btn-success").hide();
        $(".p-mod .rst:contains( 通过)").parents(".txt").next(".btn-area").children(".btn-danger").show();
    });
    $(".pic-switch .btn-danger").click(function () {
        $(".p-mod .rst").text("不通过");
        $(".p-mod .rst:contains(不通过)").parents(".txt").next(".btn-area").children(".btn-danger").hide();
        $(".p-mod .rst:contains(不通过)").parents(".txt").next(".btn-area").children(".btn-success").show();
    });
});
//模拟交互操作技术


//手动匹配弹层
var mtMatchHtml = '<div class="layer layer-sdpp">' +
    '<div class="layer-title">' +
    '<h3>手动匹配</h3>' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<ul class="layer-query">' +
    '<li class="c-ext form-li">' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">选择城市</option>' +
    '<option value="1">北京</option>' +
    '<option value="2">上海</option>' +
    '</select>' +
    '<select class="form-control">' +
    '<option value="0">选择数据源</option>' +
    '<option value="1">侃家</option>' +
    '<option value="2">搜房</option>' +
    '<option value="3">安居客</option>' +
    '<option value="4">搜狐焦点</option>' +
    '<option value="5">看房网</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li class="form-li">' +
    '<div class="td">' +
    '<input type="text" class="form-control" placeholder="楼盘名称搜索">' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">别名：</div>' +
    '<div class="td">' +
    '<p class="txt">华业玫瑰</p>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">业态类型：</div>' +
    '<div class="td">' +
    '<p class="txt">住宅</p>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">地址：</div>' +
    '<div class="td">' +
    '<p class="txt">通州八通线临河里站北侧400米,梨园南街与临河里路交汇处通州八通线临河里站北侧400米,梨园南街与临河里路交汇处</p>' +
    '</div>' +
    '</li>' +
    '<li class="mul">' +
    '<div class="th">已存在的楼盘组：</div>' +
    '<div class="td">' +
    '<div class="c-house-item">' +
    '<div class="title">' +
    '<span class="num">#1</span>' +
    '<h4>华业东方玫瑰</h4>' +
    '<div class="yt">商住</div>' +
    '<div class="t-info">北京</div>' +
    '<div class="lb-area">' +
    '<span class="lb-check lb-dsh">待审核</span>' +
    '</div>' +
    '</div>' +
    '<div class="content">' +
    '<div class="m-area">' +
    '<div class="h-mod">' +
    '<div class="h-tit">' +
    '<h5>源数据：</h5>' +
    '</div>' +
    '<ul class="h-con">' +
    '<li class="h-data"><a class="h-link" href="#">华业东方玫瑰（侃家网）</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="h-mod">' +
    '<div class="h-tit">' +
    '<h5>精确匹配：</h5>' +
    '</div>' +
    '<ul class="h-con">' +
    '<li class="h-data"><a class="h-link" href="#">华业东方玫瑰（搜房网）</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="h-mod">' +
    '<div class="h-tit">' +
    '<h5>模糊匹配：</h5>' +
    '</div>' +
    '<ul class="h-con">' +
    '<li class="h-data dai"><a class="h-link" href="#">华业东方玫瑰（搜狐焦点）</a></li>' +
    '<li class="h-data dai"><a class="h-link" href="#">华业东方（安居客）</a></li>' +
    '<li class="h-data"><a class="h-link" href="#">华业东方玫瑰（安居客）</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="h-mod">' +
    '<div class="h-tit">' +
    '<h5>人工匹配：</h5>' +
    '</div>' +
    '<ul class="h-con">' +
    '    <li class="h-data"><a class="h-link" href="#">通州东方小区（看房网）</a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="add-tips">注：添加后将把此楼盘从以前的匹配组中删除</div>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">添加</button>' +
    '</div>' +
    '</div>';

//重新匹配弹层
var matchAgainHtml = '<div class="layer layer-cxpp">' +
    '<div class="layer-title">' +
    '<h3>重新匹配</h3>' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<ul class="layer-query">' +
    '<li class="c-ext form-li">' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">选择城市</option>' +
    '<option value="1">北京</option>' +
    '<option value="2">上海</option>' +
    '</select>' +
    '<input type="text" class="form-control" placeholder="楼盘组名称搜索">' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '<div class="r-mod">' +
    '<div class="tit">基本信息：</div>' +
    '<ul class="con">' +
    '<li>' +
    '<div class="th">别名：</div>' +
    '<div class="td">华业玫瑰</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">业态类型：</div>' +
    '<div class="td">住宅</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">地址：</div>' +
    '<div class="td">通州八通线临河里站北侧400米,梨园南街与临河里路交汇处</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">源数据：</div>' +
    '<ul class="con">' +
    '<li>华业东方玫瑰（侃家网）</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">精确匹配：</div>' +
    '<ul class="con">' +
    '<li>华业东方玫瑰（搜房网）</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">模糊匹配：</div>' +
    '<ul class="con">' +
    '<li>东方玫瑰（搜狐焦点）</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">人工匹配：</div>' +
    '<ul class="con">' +
    '<li>通州东方小区（看房网）</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">匹配</button>' +
    '</div>' +
    '</div>';


//匹配楼盘组弹层
var projectMatchHtml = '<div class="layer layer-pplpz">' +
    '<div class="layer-title">' +
    '<h3>匹配楼盘组</h3>' +
    '<a href="#" class="layer-close">Close</a>' +
    '</div>' +
    '<div class="layer-body">' +
    '<ul class="layer-query">' +
    '<li class="c-ext form-li">' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">选择城市</option>' +
    '<option value="1">北京</option>' +
    '<option value="2">上海</option>' +
    '</select>' +
    '<input type="text" class="form-control" placeholder="楼盘组名称搜索">' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '<div class="r-mod">' +
    '<div class="tit">基本信息：</div>' +
    '<ul class="con">' +
    '<li>' +
    '<div class="th">别名：</div>' +
    '<div class="td">华业玫瑰</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">业态类型：</div>' +
    '<div class="td">住宅</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">地址：</div>' +
    '<div class="td">通州八通线临河里站北侧400米,梨园南街与临河里路交汇处</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">源数据：</div>' +
    '<ul class="con">' +
    '<li>华业东方玫瑰（侃家网）</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">精确匹配：</div>' +
    '<ul class="con">' +
    '<li>华业东方玫瑰（搜房网）</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">模糊匹配：</div>' +
    '<ul class="con">' +
    '<li>东方玫瑰（搜狐焦点）</li>' +
    '</ul>' +
    '</div>' +
    '<div class="r-mod">' +
    '<div class="tit">人工匹配：</div>' +
    '<ul class="con">' +
    '<li>通州东方小区（看房网）</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<div class="layer-footer">' +
    '<button class="btn btn-default layer-btn-reset" type="reset">取消</button>' +
    '<button class="btn btn-primary btn-commit fr" type="button">匹配</button>' +
    '</div>' +
    '</div>';