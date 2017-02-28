/**
 * Created by DL on 2016/11/28.
 */
$(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        //分页器
        pagination: '.swiper-pagination',
        //自动滑动
        //autoplay: 1000 ,
        //点击后是否取消自动滑动
        autoplayDisableOnInteraction : false,
        //切换方式
        effect:"slide"
    });
});
