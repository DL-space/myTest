/**
 * 控制tab切换效果js
 */
var tab = $(".d-tab");
tab.each(function () {
    var that = $(this);
    var tabT = that.find(".tab-t");
    var tabLi = tabT.find("li");
    var tabC = that.find(".tab-c");
    var nrpart = tabC.find(".nrpart");
    tabLi.each(function () {
        var that = $(this);
        var i = that.index();
        that.hover(function () {
            tabLi.removeClass("on");
            that.addClass("on");
            nrpart.removeClass("show");
            nrpart.eq(i).addClass(" show");
        });
        if (that.hasClass("on")) {
            nrpart.removeClass("show");
            nrpart.eq(i).addClass(" show");
        }
    });
});

/*
 * 按钮模拟弹层效果
 */
$(function () {
    //信息未保存提示
    $(".btn-save").click(function () {
        $(".d-layer-wbc").show();
        showDFade();
    });

    //字段非空提示
    $(".btn-null").click(function () {
        $(".d-layer-btx").show();
        showDFade();
    });

    //删除提示
    $(".btn-del").click(function () {
        $(".d-layer-del").show();
        showDFade();
    });

    //标签最多选择5个信息提示
    $(".btn-sel").click(function () {
        $(".d-layer-sel").show();
        showDFade();
    });

    //图片编辑展示页表格隔行变色
    $(".dt-pic-list li:odd .td").css("background", "#ebebeb");

    //环线提示信息
    $(".ico-tips").hover(function () {
        $(this).next(".tips").children(".help-tips").show();
    }, function () {
        $(this).next(".tips").children(".help-tips").hide();
    });

    //按钮吸顶
    var navbarHeight = $("#navbar").height();
    var dMenuHeight = $(".d-menu").height();
    $(".edit-toolbar").pin({
        containerSelector: ".d-panel-jcxx",
        padding: {
            top: navbarHeight + dMenuHeight
        }
    });

    //中部导航吸顶
    if ($(".main-mrap").length > 0) {
        $(".d-menu").pin({
            containerSelector: ".main-mrap",
            padding: {
                top: navbarHeight
            }
        });
    }

    /**
     * 删除户型提示弹层
     * date: 2017.08.17
     */
    $(".d-tw-hxt .btn-del").click(function () {
        popup($(".dialog-housetype-del").html(), 2);
    });

    //保存户型信息时模拟交互效果：成功或失败
    $(".btn-save").click(function () {
        $(".hxbccg").show();  //保存成功时显示
        //$(".hxbcsb").show();  //保存失败时显示
        setTimeout("$('.hxbc-tips').hide()", 3000);
    });

    /*2017.11.6 楼栋信息*/
    /**
     * 楼栋信息
     * 该部分信息，套页面同学可参考实现，如果用不到，可直接删掉
     */
    $(document).on("click", ".d-mod-ldxx .d-query .btn-area .btn-del", function () {
        $(this).parents(".d-query").remove();
    })
    $(document).on("click", ".d-mod-ldxx .content .btn-new", function () {
        $(".d-mod-ldxx .d-form-area").append(newHouse);
    })
});

//关闭弹层
$(".btn-success").click(function () {
    $(this).parents(".d-layer").hide();
    hideDFade();
});
$(".d-fade").click(function () {
    hideDFade();
    $(".d-layer").hide();
});

/*
 * 弹层半透明背景的显示
 */
function showDFade() {
    $(".d-fade").show();
}
/*
 * 弹层半透明背景的隐藏
 */
function hideDFade() {
    $(".d-fade").hide()
}

//价格信息编辑页删除当前历史记录
$(".d-mod-lssj .d-query > li.act-minus a").click(function () {
    $(this).parents(".d-query").remove();
});

/*2017.1.15 编辑楼盘商务信息页面修改*/
//添加时间范围html结构
var dateRangeHtml = '<div class="d2-date-range">' +
    '<input class="form-control" type="text">' +
    '<div class="txt">-</div>' +
    '<input class="form-control" type="text">' +
    '<button type="button" class="btn-del">删除</button>' +
    '</div>';

//添加时间段
$(".btn-tjsjd").click(function () {
    $(dateRangeHtml).appendTo($(this).parent(".d2-date-range").parent(".td"));
});

//删除时间段
$(document).on("click", ".d2-date-range .btn-del", function () {
    $(this).parent(".d2-date-range").remove();
});

//新增楼栋信息结构
var newHouse = '<ul class="d-query">' +
    '   <li class="ldmc">' +
    '<div class="th"><span class="ico-xh">*</span>楼栋名称：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th"><span class="ico-xh">*</span>销售状态：</div>' +
    '<div class="td">' +
    '<select class="form-control">' +
    '<option value="0">售罄</option>' +
    '<option value="1">在售</option>' +
    '<option value="2">未售</option>' +
    '</select>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">期数：</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</li>' +
    '<li class="btn-area">' +
    '<button class="btn btn-primary btn-del">删除</button>' +
    '</li>' +
    '</ul>';

