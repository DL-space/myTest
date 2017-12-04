function keyEnter(e) {
    e = e || event;
    if(e.keyCode == 13) {
        if(document.activeElement.id=='keywords' || document.activeElement.id=='keywords_submit'){
            var keywords = $("#keywords").val();
            if (keywords !== '' && keywords !== '请输入楼盘名') {
                location.href = s_url + keywords;
                //console.log(s_url + keywords);
            }
        }
        else if(document.activeElement.id=='keywords_layer'){
            var keywords = $("#keywords_layer").val();
            if (keywords !== '' && keywords !== '请输入楼盘名') {
                location.href = s_url + keywords;
            }
        }
        else if (document.activeElement.id=='login_name' ||
                    document.activeElement.id=='login_psw' ||
                    document.activeElement.id=='signupform-mobile' ||
                    document.activeElement.id=='signupform-mobile_captcha' ||
                    document.activeElement.id=='signupform-password' ||
                    document.activeElement.id=='signupform-password2' ||
                    document.activeElement.id=='teambuy_name' ||
                    document.activeElement.id=='teambuy_mobile'){
                        $('.common-btn2').trigger('click');
                    }
    }
}
document.onkeydown = keyEnter;

//动态弹出层输入框获取焦点提示文字清空，针对IE8及更低版本浏览器
$(document).on("focus","input[type='text']",function(){
    var $val = $(this).val();
    if($val == this.defaultValue){
        $(this).val("");
    }
});

//动态弹出层输入框失去焦点展示默认提示文字，针对IE8及更低版本浏览器
$(document).on("blur","input[type='text']",function(){
    var $val = $(this).val();
    if($val == ""){
        $(this).val(this.defaultValue);
    }
});

 $(function(){
    //输入框获取与是去焦点显示与隐藏默认文字
    $(".ipt").focus(function(){
        var $val = $(this).val();
        if($val == this.defaultValue){
            $(this).val("");
        }
    });
    $(".ipt").blur(function(){
        var $val = $(this).val();
        if($val == ""){
            $(this).val(this.defaultValue);
        }
    });

    //页面滚动后header悬浮
    if($(".page-menu").length == 0 && $(".header-outer").length == 0){
        $(window).scroll(function(){
            var height = $(document).scrollTop();
            var headerHeight = $(".header").height();
            if(height > headerHeight){
                $('.header2').fadeIn('slow',function(){
                    $(this).css('display','block');
                });
            }else{
                $('.header2').fadeOut('slow',function(){
                    $(this).css('display','none');
                });
            }
        });
    }

 })


$(document).on('click','.slide-down-info',function(){
    if($(this).hasClass('es-up')){
        var es_info_text_short = $(this).attr('data-short');
        $(this).parent().parent().children('.es-info-text').html(es_info_text_short+'...');
        $(this).parent().css({'height':'0px', 'float':'right'});
        $(this).removeClass('es-up').html('阅读全文');
    }else{
        var es_info_text = $(this).attr('id');
        $(this).parent().parent().children('.es-info-text').html(es_info_text);
        $(this).addClass('es-up').html('收起');
        $(this).parent().css({'height':'25px', 'float':'none'});
    }
});

$(function(){
    //其他城市弹层
    var isCity = true;
    var city_html = '<div class="city-tip-show">其他城市将陆续开放!</div>';
    $('.city-tip').mouseover(function () {
        $(this).css('cursor', 'pointer');
        if (isCity) {
            $(this).append(city_html);
        }
        isCity = false;
    }).mouseleave(function () {
        $(this).children('.city-tip-show').remove();
        isCity = true;
    });

});