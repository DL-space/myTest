$(function(){

    //显示与隐藏更多工作随笔
    $(document).on("click",".consultant-footer",function(){
        var currentDataDetail = $(this).parents(".consultant-item").find(".note-detail");
        if(currentDataDetail.hasClass("data-detail")){
            $(this).removeClass("note-remove-more");
            currentDataDetail.removeClass("data-detail");
        }else {
            $(this).addClass("note-remove-more");
            currentDataDetail.addClass("data-detail");
        }
    })
});