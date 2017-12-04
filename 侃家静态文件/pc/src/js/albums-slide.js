window.onload = function(){
    imgAjust($(".slide-ul li"),$(".slide-ul li img"));
}
$(function () {
    //图片自适应容器
    //imgAjust($(".slide-ul li"),$(".slide-ul li img"));

    //定义jQuery对象
    // ul
    var $list = $('.slide-ul');
    // 小图片 下标
    var $spans = $(".zmd-container-ul li");
    // 小图片 ul
    var $prevA = $(".alb-btnz");   //上一页
    var $nextA = $(".alb-btny");    //下一页
    // 移动距离
    var $li_width = $('.slide-ul li').width();
    var $move = $('.move');

    // 走马灯效果 变量
    var $btn03 = $('.alb-btn01');
    var $btn04 = $('.alb-btn02');
    var $moveLeft = $move.width();

    //  自动 播放 全局变量
    var index = 0;
    var SLID_TIME = 5;
    var moving = false;
    var movings = false;

    // 只有一张图片
    if($spans.length == 1){
        $nextA.addClass('alb-no');
    }
    // 初始化
    $prevA.addClass('alb-no');
    $btn03.addClass('alb-no');

    // 判断 走马灯移动次数 moveNumber
    var moveNumber = ( $spans.length / 6 ) - 1;
    var arrlistmoveR = [];
    var arrlistmoveL = [];
    for(var i=0; i<moveNumber; i++){
        a = (i+1) * 6;
        b = a - 1;
        arrlistmoveR.push(b);
        arrlistmoveL.push(a);
    };
    // 设置监听
    $prevA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('alb-on')){
                if(!(arrlistmoveL.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('alb-no')){
            return;
        }
        nextPage(false);
    });
    $nextA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('alb-on')){
                if(!(arrlistmoveR.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('alb-no')){
            return;
        }
        nextPage(true);
    });
    // 点击小图对应 大图函数
    $spans.click(function () {
        nextPage($(this).index());
    });
    // 解析uel 地址
    var url = document.location.href;
    var str = url.substring(url.lastIndexOf("#"));
    // 获取 num
    str.split('');
    var imgIndex = str.split('');
    imgIndex.shift('1');
    if(imgIndex.length < 3){
        var imgNumber = imgIndex.join('');
        imgNumber = imgNumber - 0;
        nextPage(imgNumber);
        if(imgNumber > 4){
            nextGroup(true);
        }
    }


    //  图片 移动函数
    function nextPage(next) {
        // 如果正在移动  则 退出
        if(moving){
            return;
        }
        var targetLeft = 0;
        var currentLeft = $list.position().left;
        var offsetLeft = 0;

        // IE 1px问题
        if ((navigator.userAgent.indexOf('MSIE') >= 0)
            && (navigator.userAgent.indexOf('Opera') < 0)){
            if(currentLeft == 0){
                currentLeft == 0
            }else {
                currentLeft =  currentLeft - 1;
            }
        }
        // IE 问题

        // 正在移动
        moving = true;
        if(typeof next === 'boolean'){
            offsetLeft += next ? -$li_width : $li_width;
        }else{
            if(next - index === 0){
                moving = false;
                return;
            }
            //点击的圆点就是当前页面对应的下标
            offsetLeft = -$li_width*(next - index);
        }
        targetLeft = currentLeft + offsetLeft;
        // 动画效果
        $list.animate({
            left:targetLeft
        },SLID_TIME,'linear',function () {
            moving = false;
            Btnhide()
        });
        //更新小图片
        updatePoint(next);
        // 按钮 隐藏函数
        function Btnhide() {
            targetLeft == -($spans.length - 1)*$li_width ? $nextA.addClass('alb-no') : $nextA.removeClass('alb-no') ;
            targetLeft == 0 ? $prevA.addClass('alb-no') : $prevA.removeClass('alb-no') ;
        }
    }
    // 更新原点函数
    function updatePoint(next){
        var targetIndex;
        //更新当前页的圆点样式
        $spans.eq(index).removeClass('alb-on');
        if(typeof next === 'boolean'){
            if(next){
                targetIndex = index + 1;
                if(targetIndex > $spans.length - 1){
                    targetIndex = 0;
                }

            }else{
                targetIndex = index - 1;
                if(targetIndex < 0){
                    targetIndex = $spans.length - 1;
                }
            }
        }else{
            targetIndex = next;
        }
        $spans.eq(targetIndex).addClass('alb-on');
        //更新下标
        index = targetIndex;
    }
    // 走马灯效果
    // 初始化判断
    if($spans.length <= 6){
        $btn03.addClass('alb-no');
        $btn03.click(function () {
            return false;
        });
    }else {
        $btn03.click(function () {
            if($(this).hasClass('alb-no')){
                return false;
            }
            nextGroup(false);
        });
    }

    if($spans.length <= 6){
        $btn04.addClass('alb-no');
        $btn04.click(function () {
            return false;
        });
    }else {
        $btn04.click(function () {
            if($(this).hasClass('alb-no')){
                return false;
            }
            nextGroup(true);
        });
    }
    // 小图 走马灯 移动函数
    function nextGroup(next) {
        if(movings){
            return;
        }
        // 目标位置
        var targetLeft = 0;
        var offsetLeft = 0;
        movings = true;
        //  初始位置
        var currentLeft = $move.position().left;
        if( typeof next == 'boolean'){
            offsetLeft += next ? -928 : 824;
            targetLeft = offsetLeft + currentLeft;
        }else {
            if( (next + 1)%6 == 0){
                targetLeft = -876 * (next + 1)/6
            }
            if( next%6 == 0 ){
                targetLeft = -876 * ((next)/6 - 1)
            }
        }

        $move.animate({
            left : targetLeft
        },SLID_TIME,'linear',function () {
            movings = false;
            Btnhide();
        });
        //  隐藏 按钮 函数
        // 修改 动态 判断
        function Btnhide() {
            targetLeft >= 0 ? $btn03.addClass('alb-no') : $btn03.removeClass('alb-no') ;
            targetLeft <= -$moveLeft * moveNumber ? $btn04.addClass('alb-no') : $btn04.removeClass('alb-no') ;
        }

    }


});
$(function () {
    // 定义 使用参数
    var  options = {
        $slide_ul : $('.slide-ul'),
        $popup : $('#fade'),
        $poupbox : $('#picture'),
        $middle : $('#middle'),
        $cha : $('.cha'),
        $imgs :  $('.img'),
        $m_prev :  $('.prev'),
        $m_next : $('.next')
    };
    // 调用
    options.$poupbox.propup(options);
})