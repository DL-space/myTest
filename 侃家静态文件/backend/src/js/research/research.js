//调研数据提交时提示弹窗
$(".btn-cmt").click(function(){
    $(".layer-sjdy,.c-fade").show();
});

//关闭弹层
$(".layer-btn-reset,.layer-close").click(function(){
    $(this).parents(".layer").hide();
    $(".c-fade").hide();
});
