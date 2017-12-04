$(function(){
    //编辑签约可能性
    $(document).on("click",".opt-edit",function(){
        popup($(".sign-possibility-wrap").html(), 2, null, null, "");
    })

    //签约可能性选择
    $(document).on("change",".sign-possibility .c-chk",function(){
        var dataCheck = $(this).attr("data-check");
        if(dataCheck == "high-possibility"){
            $(".low-possibility").hide();
            $("." + dataCheck).show();
        }else {
            $(".high-possibility").hide();
            $(".low-possibility").show();
        }
        $(window).resize();
    })
});