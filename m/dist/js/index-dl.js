$(function () {
    /*banner 插件*/
    if($("#stack_krisna").length > 0){
        var startX,
            EndX ;
        var krisna = new Stack(document.getElementById('stack_krisna'));
        var timerKrisna = setInterval(function () {
            krisna.reject();
        },2000);
        $("#stack_krisna li").on("touchstart",function (e) {
            event.preventDefault();
            clearInterval(timerKrisna);
            startX = e.originalEvent.changedTouches[0].pageX;
            $(this).on("touchend",function (e) {
                EndX = e.originalEvent.changedTouches[0].pageX;
                clearInterval(timerKrisna);
                if((EndX-startX)==0){//点击
                    if($(this).find("a").length > 0){
                        window.location.href = $(this).find("a").attr("href");
                    }
                }else{//滑动
                    EndX-startX > 0 ? krisna.accept():krisna.reject();
                }
                timerKrisna = setInterval(function () {
                    krisna.reject();
                },2000);
                e.originalEvent.changedTouches = null;
            })
        });
    }
    /*左右轮播 初始化swiper*/
    if ( $(".swiper-container").length > 0 ) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: "auto",
            paginationClickable: true,
            freeMode: true
        });
    }
    /*筛选标签删除*/
    $(document).on("click",".tag-item .icon-delete",function () {
        var that = $(this),
            delItem = that.parent(".tag-item");
        delItem.siblings(".tag-item").length==0 ? that.parents(".query-tag").remove():delItem.remove();
    })
})