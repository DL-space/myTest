$(function(){
    /*新增预计回款弹层*/
    $(document).on("click",".btn-xzyjhk",function(){
        popup($(".dialog-yjhk").html(), 2, null, null, "", "500px",['60px']);
        $(".hk-qzds").hide();
    });

    /*新增实际回款弹层 回款方式 后置返费*/
    $(document).on("click",".btn-xzsjhk",function(){
        popup($(".dialog-sjhk-hzff").html(), 2, null, null, "", "500px");
    });

    /*新增实际回款弹层 回款方式 前置电商*/
    $(document).on("click",".btn-xzsjhk-qzds",function(){
        popup($(".dialog-sjhk-qzds").html(), 2, null, null, "", "500px");
    });

    /*新增实际回款弹层 回款方式 前置电商和后置返费*/
    $(document).on("click",".btn-xzsjhk-all",function(){
        popup($(".dialog-sjhk-all").html(), 2, null, null, "", "500px");
    });



    //发票状态
    $(document).on("change", ".sel-fpzt", function () {
        if ($(this).find("option:selected").text() == "已开票") {
            $(".skxx > li.kprq").show();
        } else {
            $(".skxx > li.kprq").hide();
        }
    });

    //回款方式选择
    $(document).on("change",".chk-hkfs",function(){
        var dataChecked = $(this).attr("data-check");
        if($(this).prop("checked")){
            $("ul."+dataChecked).show();
        }else {
            $("ul."+dataChecked).hide();
        }
    });
});