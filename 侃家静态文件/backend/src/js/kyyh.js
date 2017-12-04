//客源优化

//增加反问的DOM结构
var addRangeDom = '<div class="txt"> - </div>' +
    '<div class="input-group input-group-sm">' +
    '<input type="text" class="form-control">' +
    '</div>';


$(".link-add").click(function () {
    var _item = $(this);
    $(addRangeDom).insertAfter(_item.siblings(".ipt-range"));
});


//联系记录编辑页的后续动作效果
$("input[name='action-sel']").change(function () {
    var actionContinue = $(this).parents(".mod4-hxdz").find(".action-jxlx");
    var actionYY = $(this).parents(".mod4-hxdz").find(".action-yydk");
    if ($(this).hasClass("rd-jxlx")) {
        actionContinue.show();
        actionYY.hide();
    } else {
        actionYY.show();
        actionContinue.hide();
    }
});

//实际带看楼盘
var dklpHtml = '<div class="mod4 mod4-sjdklp">' +
    '<div class="tit">' +
    '<input type="checkbox" class="check-dklp">' +
    '<h4>实际带看楼盘</h4>' +
    '<a href="#">外滩188</a>' +
    '<a href="javascript:void(0);" class="btn-qx">取消带看楼盘</a>' +
    '</div>' +
    '<div class="con">' +
    '<ul class="jh-info">' +
    '<li>' +
    ' <div class="lb">合作方：</div>' +
    '<div class="txt">房江湖</div>' +
    '</li>' +
    '<li>' +
    '<div class="lb">报备状态：</div>' +
    '<div class="txt">未报备</div>' +
    '</li>' +
    '<li>' +
    '<div class="lb">销售姓名：</div>' +
    '<div class="txt"><input type="text" class="form-control">' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<div class="lb">销售电话：</div>' +
    '<div class="txt"><input type="text" class="form-control">' +
    '</div>' +
    '</li>' +
    '<li class="jh-nr">' +
    '<div class="lb">楼盘带看备注：</div>' +
    '<div class="txt">' +
    '<textarea class="form-control"></textarea>' +
    '</div>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>';

//添加更多带看记录
$(".mod4-sjdk .ico-plus").click(function () {
    $(dklpHtml).insertAfter($(this).parents(".mod4-sjdk"));
});
//取消带看楼盘
$(document).on("click", ".btn-qx", function () {
    $(this).parents(".mod4-sjdklp").remove();
});