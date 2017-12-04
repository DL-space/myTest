$(function () {
    $(document).on("click", ".link-coll .ico-del2", function () {
        $(this).parent(".lb-house").remove();
    });

    //备忘标签
    $(document).on("click", ".link-collection", function () {
        var dialogCollLables = $(".css-zxs-lb").html();
        popup(dialogZsxLb, 2);
    });

    //编辑标签
    $(document).on("click", ".link-edit-lb", function () {
        var dialogCollLables = $(".css-zg-lb").html();
        popup(dialogZgLb, 2);
    });

    //选择标签
    $(document).on("click", ".house-lb-area li", function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
        }
    });
});


//选择标签弹层－咨询师
var dialogZsxLb = '<div class="css">' +
    '<div class="css-header"><h3>选择标签</h3></div>' +
    '<div class="css-body">' +
    '<ul class="house-lb-area">' +
    '<li>头部客户</li>' +
    '<li class="on">我是系统标签2</li>' +
    '<li>我是自定义标签</li>' +
    '<li>我是自定义标签</li>' +
    '<li>我是最长的自定义标签我是最长的自定义标签</li>' +
    '<li>我是最长的自定义标签我是最长的</li>' +
    '</ul>' +
    '    <!--新增标签-->' +
    '<div class="house-lb-add">' +
    '<h3>新增收藏标签</h3>' +
    '<input class="form-control" type="text" placeholder="不得超过15个汉字(30个字符)"/>' +
    '</div>' +
    '<div class="css-lb-tips">注:最多不得超过两个标签</div>' +
    '</div>' +
    '<div class="css-footer">' +
    '<button type="reset" class="btn btn-default layer-btn-reset">取消</button>' +
    '<button type="button" class="btn btn-primary btn-commit fr">确定</button>' +
    '</div>' +
    '</div>';

//选择标签弹层－主管
var dialogZgLb = '<div class="css">' +
    '<div class="css-header"><h3>选择标签</h3></div>' +
    '<div class="css-body">' +
    '<ul class="house-lb-area">' +
    '<li>头部客户</li>' +
    '<li class="on">我是系统标签2</li>' +
    '<li>我是自定义标签</li>' +
    '<li>我是自定义标签</li>' +
    '<li>我是最长的自定义标签我是最长的自定义标签</li>' +
    '<li>我是最长的自定义标签我是最长的</li>' +
    '</ul>' +
    '</div>' +
    '<div class="css-footer">' +
    '<button type="reset" class="btn btn-default layer-btn-reset">取消</button>' +
    '<button type="button" class="btn btn-primary btn-commit fr">确定</button>' +
    '</div>' +
    '</div>';