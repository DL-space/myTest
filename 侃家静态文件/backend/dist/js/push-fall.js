$(function () {
    var $pop = $('.pop');
    var $popSpan = $('.pop .img-cont')
    $('.content').on('click','.w-con img', function () {
        // 拷贝赋值到遮罩中
        var $img = $(this).clone();
        $img.appendTo($('.pop .img-cont'))
        $pop.css('display', 'block');
    })
    $pop.click(function () {
        $(this).hide();
        // 清空
        $popSpan.html('');
    });
    $('.return').click(function () {
        $pop.hide();
        // 清空
        $popSpan.html('')
    });
})