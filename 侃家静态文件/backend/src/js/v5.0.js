$(function () {

    //当前留电口昨天线索量和近7天的平均线索量
    $(".form-mod-single input[type='text']").change(function () {
        clueChange(12, 9);
    });

    //分配对象
    $(".panel-create-rules .fpdx .d-chk").change(function () {
        $(".fpdx-tips").find("input.fp-"+$(this).attr("data-obj")).show();
        $(".fpdx-tips").find("input.fp-"+$(this).attr("data-obj")).siblings(".form-control").hide();
    });
});

/**
 * 当前留电口昨天线索量和近7天的平均线索量
 * @param clueNumYesterday {Number}
 * @param clueNumAvg {Number}
 * return null
 */
function clueChange(clueNumYesterday, clueNumAvg) {
    $(".panel-create-rules .form-mod .num-yesterday").text(clueNumYesterday);
    $(".panel-create-rules .form-mod .num-avg").text(clueNumAvg);
}
