$(function () {
    //定义jQuery对象
    // ul
    var $list = $('.slide-ul');
    // 小图片 下标
    var $spans = $(".zmd-container-ul li");
    // 小图片 ul
    var $prevA = $('.slide-btnz');   //上一页
    var $nextA = $(".slide-btny");    //下一页
    // 移动距离
    var $li_width = $('.slide-ul li').width();

    // 走马灯效果 变量
    var $move = $('.move');
    var $btn03 = $('.zmd-btnz');
    var $btn04 = $('.zmd-btny');
    var $moveLeft = $move.width();
    var $liLeft = $spans.outerWidth(true);

    // 只有一张图片
    if($spans.length == 1){
        $nextA.addClass('zmd-no');
    }
    // 初始化 按钮
    $prevA.addClass('zmd-no');
    $btn03.addClass('zmd-no');
    // 判断 走马灯移动次数 moveNumber
    var moveNumber = ( $spans.length / 5 ) - 1;
    var arrlistmoveR = [];
    var arrlistmoveL = [];
    for(var i=0; i<moveNumber; i++){
        a = (i+1) * 5;
        b = a - 1;
        arrlistmoveR.push(b);
        arrlistmoveL.push(a);
    };

    // 设置监听
    $prevA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('zmd-on')){
                if(!(arrlistmoveL.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('zmd-no')){
            return;
        }
        nextPage(false);
    });
    $nextA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('zmd-on')){
                if(!(arrlistmoveR.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('zmd-no')){
            return;
        }
        nextPage(true);
    });
    // 点击小图对应 大图函数调用
    $spans.click(function () {
        nextPage($(this).index());
    });
    //  自动 播放
    var index = 0;
    var SLID_TIME = 400;
    var moving = false;
    var movings = false;
    // 自动轮播
    var timer = null;
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
            Btnhide();  // 调用更谢下标记函数
            moving = false;

        });
        //更新小图片
        updatePoint(next);
        // 按钮 隐藏函数
        function Btnhide() {
            targetLeft == -($spans.length - 1)*$li_width ? $nextA.addClass('zmd-no') : $nextA.removeClass('zmd-no') ;
            targetLeft == -0 ? $prevA.addClass('zmd-no') : $prevA.removeClass('zmd-no') ;
        }
    }
    // 更新原点函数
    function updatePoint(next){
        var targetIndex;
        //更新当前页的圆点样式
        $spans.eq(index).removeClass('zmd-on');
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
        $spans.eq(targetIndex).addClass('zmd-on');
        //更新下标
        index = targetIndex;
    }
    // 走马灯移动函数
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
            offsetLeft += next ? -520 : 520 ;
            targetLeft = offsetLeft + currentLeft;
        }else {

            if( (next + 1)%5 == 0){
                targetLeft = -530 * (next + 1)/5
            }
            if( next%5 == 0 ){
                targetLeft = -530 * ((next)/5 - 1)
            }
        }
        $move.animate({
            left : targetLeft
        },SLID_TIME,'linear',function () {
            movings = false;
            Btnhide()
        });
        //  隐藏 按钮 函数
        // 修改 动态 判断
        function Btnhide() {
            targetLeft >= 0 ? $btn03.addClass('alb-no') : $btn03.removeClass('alb-no') ;
            targetLeft <= -$moveLeft * moveNumber ? $btn04.addClass('alb-no') : $btn04.removeClass('alb-no') ;
        }
    }
});