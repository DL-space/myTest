var screenWidth = document.body.clientWidth;
var screenHeight = document.body.clientHeight;
var dialogWidth = 0;
if (screenWidth < 600) {
    dialogWidth = (screenWidth * 0.9) + "px";
} else {
    dialogWidth = "600px";
}
/**
 * 设置弹层最大高度
 */
function setDialogMaxHeight() {
    $(".dialog").css({
        "max-height": screenHeight * 0.9,
        "overflow-y": "auto"
    });
}

/*
* 模拟弹层效果
* 业务开发中，可以不用全部搬代码，只要参考代码实现即可
* */
$(function(){
    //报备审核不通过
    $(document).on("click", ".btn-no-pass", function () {
        popup($(".report-no-pass").html(), 2, null, null, "", "500px");
        setDialogMaxHeight();
    })

    //库存结构配置
    $(document).on("click", ".btn-stock", function () {
        popup($(".dialog-stock").html(), 2, null, null, "", "500px");
        setDialogMaxHeight();
    })

    //合同佣金金额
    $(document).on("click", ".btn-contract-commission", function () {
        popup($(".contract-commission").html(), 2, null, null, "", "500px");
        setDialogMaxHeight();
    })

    //实际回款审核
    $(document).on("click", ".btn-actual-received", function () {
        popup($(".actual-received").html(), 2, null, null, "", "580px");
        setDialogMaxHeight();
    })

    //审核操作单选框动作
    $(document).on("click", ".received-item .j-radio", function () {
        var iptArea = $(this).parents(".received-item").find(".res .j-ipt-area");
        if($(this).hasClass("adopt")){
            iptArea.hide();
        }else if($(this).hasClass("reject")){
            iptArea.show();
        }
    })

    //修改本次预约－回款跟进
    $(document).on("click", ".btn-modify2", function () {
        popup($(".modify-appointment2").html(), 2, null, null, "", dialogWidth);
        setDialogMaxHeight();
    })

    //修改回款负责人
    $(document).on("click", ".btn-hkfzr", function () {
        popup($(".dialog-hkfzr").html(), 2, null, null, "", "410px");
        setDialogMaxHeight();
    })
});
