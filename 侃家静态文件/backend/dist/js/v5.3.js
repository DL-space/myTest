$(function () {
    $(document).on("click", ".link-opt", function () {
        var dataEle = $(this).next(":hidden");
        var dataValue = dataEle.val();
        if (dataValue == 0) {
            $(this).parents(".tz4").siblings(".cmt-edit").children(".cmt-txt").addClass("none");
            $(this).parents(".tz4").siblings(".cmt-edit").children(".form-control").removeClass("none");
            $(this).parents('li').siblings().find(".cmt-txt").removeClass("none");
            $(this).parents('li').siblings().find(".form-control").addClass("none");
            $(this).parents('li').siblings().find(".link-opt").text("修改");
            $(this).parents('li').siblings().find(".link-opt").next(":hidden").val(0);
            $(this).addClass("link-save");
            $(this).text("保存");
            dataEle.val(1);
        }else if(dataValue == 1){
            $(this).parents(".tz4").siblings(".cmt-edit").children(".cmt-txt").removeClass("none");
            $(this).parents(".tz4").siblings(".cmt-edit").children(".form-control").addClass("none");
            $(this).removeClass("link-save");
            $(this).text("修改");
            dataEle.val(0);
        }
    });


    $(document).mouseup(function (e) {
        var _con = $(".cmt-edit,.link-opt");   // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".cmt-edit .cmt-txt").removeClass("none");
            $(".cmt-edit .form-control").addClass("none");
            if ($(".link-save").length > 0) {
                $(".link-save").text("修改");
                $(".link-save").next(":hidden").val(0);
                $(".link-save").removeClass("link-save");
            }
        }
    });
});