$(function () {
    //留电咨询
    $(".btn-ld").click(function(){
        showDialog(1,telHtml);
    });
    //成功
    $(".btn-success").click(function () {
        showDialog(1,dyHtml);
    });
    var layerIndex = 0;
    //留电预约成功
    $(".btn-yycg").click(function(){
        layerIndex = showDialog(1,appHtml,null);
    });

    $(document).on("click",".css-btn-commit",function(){
        closeDialog(layerIndex);
    })

});
