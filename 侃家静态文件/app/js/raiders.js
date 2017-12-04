$(function () {
    //根据屏幕自适应字体
    var pWidth = document.body.clientWidth;
    var $dpi = window.devicePixelRatio;
    var pFontSize;
    if ($dpi > 1) {
        pFontSize = pWidth * $dpi * 0.1 * (1 / $dpi);
    } else if ($dpi == 1) {
        if (pWidth >= 750) {
            pFontSize = 75;
        } else {
            pFontSize = pWidth * 0.1;
        }
    }
    $("html").attr("data-dpr", $dpi);
    $("html").css({
        "font-size": pFontSize
    });

    //留电错误信息提示弹层
    var phoneNumErrorTips = '<div class="error-tips">' +
        '<p class="text">请输入正确的手机号码</p>' +
        '<div class="btn-area">' +
        '<a href="javascript:void(0);" class="btn-confirm">确定</a>' +
        '</div>' +
        '</div>' +
        '<div class="fade"></div>';
    //留电预约
    $(".btn-call").click(function () {
        var phoneNum = $(".ipt").val();
        if (!checkTel(phoneNum)) {
            $(phoneNumErrorTips).appendTo($("body"));
            //禁止浏览器滚动
            stopDefault();
            $(".btn-confirm").click(function(){
                $(this).parents(".error-tips").remove();
                $(".fade").remove();
                startDefault();
            });
        } else {
            //手机号码验证成功，此处添加留电成功后的业务逻辑
            alert("留电成功");
        }
    });
});

/**
 * 手机号码的校验
 * @param value
 * @returns {boolean}
 */
function checkTel(value) {
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|1[78][0123456789][0-9]{8}|14[57][0-9]{8}|1349[0-9]{7})$/;
    if (isMob.test(value) || isPhone.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 屏蔽浏览器默认行为
 */
function stopDefault(){
    window.ontouchmove = function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
        e.stopPropagation && e.stopPropagation();
        return false;
    }
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
}

/**
 * 放开浏览器默认行为
 */
function startDefault(){
    window.ontouchmove = function(e){
        e.preventDefault && e.preventDefault();
        e.returnValue = true;
        e.stopPropagation && e.stopPropagation();
        return true;
    }
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
}

$(function(){
    /**
     * 关闭页面顶部app下载入口
     */
    $(".topbar .ico-close").click(function(){
        $(".topbar").hide();
        $(".container").animate({"padding-top":"0"});
    });
});
// 弹层轮播图
$(function () {
    // 获取变量
    var $close = $('.close');
    var $prop = $('.prop');
    var imgSrc = [];
    var $img =  $(".article").find('img');
    var $swiper_wrapper = $prop.find('.swiper-wrapper');
    // 遍历所有图片
    for(var i=0; i<$img.length; i++){
        imgSrc.push($img[i].src)
    }
    // 遍历数组 添加 div 中
    for(var i=0; i<imgSrc.length; i++){
        var swiperAll =  '<div class="swiper-slide"><img src="'+imgSrc[i]+'"alt="img"></div>';
        $swiper_wrapper.append(swiperAll);
    }

    $img.click(function () {
        var num = $img.index($(this)[0]);
        $prop.show();
        swiper(num);
    });
    // 点击X 弹出层 隐藏
    $close.click(function () {
        $prop.hide();
        swiper(0);
    })
    function swiper(num) {
        var mySwiper = new Swiper('.prop .swiper-container-c', {
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            initialSlide : num,
            loop : true
        })
    }
});

$(function(){
    //视频播放器
    var playerContainer = $("#video-player");
    var playerId = playerContainer.attr("id"); //容器ID值
    var file = playerContainer.attr("data-file"); //视频地址
    var poster = playerContainer.attr("data-poster"); //视频封面
    play(playerId,file,poster);
});



function play(id,file,cover){
    Player = jwplayer(id).setup({
        width:'100%',
        height:'4.7rem',
        file:file,
        image:cover
    });
}








