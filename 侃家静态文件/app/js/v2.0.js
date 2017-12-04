$(function(){
    var swiper = new Swiper('.swiper-container',{
        direction:"horizontal",
        slidesPerView: "auto",
        freeMode:true
    });

    $(document).on("click",".swiper-slide",function(){
        var fontSize = parseInt($("html").css("font-size"));
        $(this).addClass("on").siblings().removeClass("on");
        var dataNav = $(this).attr("data-nav");
        var scrollTop = 1.33 * fontSize;
        $("html,body").animate({
            scrollTop:$("."+dataNav).offset().top - scrollTop + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
});


