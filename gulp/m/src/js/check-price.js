/**
 * Created by DL on 2017/4/20.
 */
function newSwiper(){
    var index=0;
    if(getCookie("price_area_" + area_pinyin)){
        index=getCookie("price_area_" + area_pinyin);
    }
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: "auto",
        paginationClickable: true,
        initialSlide: index,//设定初始化时slide的索引
        freeMode: true
    });
    $(".area-list .area").on("click",function(){
        var i= $(".swiper-slide-active").index();
        var pinyin_tag = $(this).attr('data-tag');
        if(!getCookie("price_area_" + pinyin_tag)){
            setCookie("price_area_" + pinyin_tag, i, 3600);
        }
    })
}
/*初始化swiper*/
newSwiper();

$(function () {
    /*展示更多*/
    $(document).on("click",".show-more",function () {
        var that = $(this);
        var realText = that.find(".text");
        var dataText = that.attr("data-text");
        if(realText.text() == dataText){
            realText.text("收起")
        }else{
            realText.text(dataText);
        }
        that.parents(".data-table").toggleClass("data-table-open");
    })
});
