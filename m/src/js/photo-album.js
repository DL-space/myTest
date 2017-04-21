$(function () {
    // 一张图片的时候 额外判断
    var $swiper_slide_c = $('.swiper-container-c').find('.swiper-slide');
    var $t_unit = $('.t-unit');

    // 判断图片数量 == 1 时候 不操作
    if($swiper_slide_c.length == 1){
        $swiper_slide_c.addClass('swiper-no-swiping');
    };
    // 解析uel 地址
    var imgNumber;  //  当前图片在所有 图片中的位置
    var imgIndex; //  当前图片在 本分类中的位置 传入 swiper
    var imgSrc;
    var url = document.location.href;
    var str = url.substring(url.lastIndexOf("#"));


    // 获取 num
    str.split('');
    imgSrc = str.split('-');
    imgNumber = imgSrc.pop() - 0;
    // 获取对应图片
    imgIndex = imgSrc.toString().split('').splice('1').join('') - 1;
    // 如果一张图片的时候
    var isOne = true;
    if($swiper_slide_c.length == 1){
        isOne = false;
    }else {
       isOne = true;
    };
    var swiper = new Swiper('.photoBox .swiper-container-c', {
        initialSlide : imgIndex,
        // Disable preloading of all images
        preloadImages: !isOne,
        // Enable lazy loading
        lazyLoading: isOne,
        onSlideNextStart: function(swiper){
            num++;
            $t_unit.html(imgNumber + num);
        },
        onSlidePrevStart: function(swiper){
            num--;
            $t_unit.html(imgNumber + num);
        }
    });

    //  移动是 更新 imgNumber
    var $item = $('.photo-c .swiper-wrapper').find('.item');
    var num = 0;

    //赋值操作
    $t_unit.html(imgNumber);
    // 重置 num
    num = 0;
    // 橡皮筋效果
    var swiper_p = new Swiper('.photo-b .swiper-container-p', {
        pagination: '.swiper-pagination',
        slidesPerView: 3.5,
        paginationClickable: true,
        freeMode: true
    });

});