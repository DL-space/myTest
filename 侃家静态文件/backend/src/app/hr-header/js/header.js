$(function () {
    //单击用户名，展开用户相关操作
    $(".u-name > a").click(function () {
        if ($(this).next(".u-dropdown").is(":hidden")) {
            $(this).next(".u-dropdown").show();
        }
    });

    $(".u-dropdown li").click(function () {
        if ($(".u-dropdown").is(":visible")) {
            $(".u-dropdown").hide();
        }
    });
});

//单击用户操作浮层意外区域关闭用户操作浮层
$(document).mouseup(function (e) {
    var _con = $(".u-dropdown");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        if ($(".u-dropdown").is(":visible")) {
            $(".u-dropdown").hide();
        }
    }
});
