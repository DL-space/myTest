$(function () {
    var $no = $('.no')
    //定义jQuery对象
    var $list = $('.top-container-ul');
    // 小图片 下标
    var $spans = $(".small_list li");
    // 小图片 ul
    var $prevA = $(".btn01");   //上一页
    var $nextA = $(".btn02");    //下一页
    // 移动距离
    var $li_width = $('.top-container-ul li').width();
    var $move = $('.move');
    var n=0;
    // 走马灯效果 变量
    var $btn03 = $('.btn03');
    var $btn04 = $('.btn04');
    var $moveLeft = $move.width();
    var $liLeft = $spans.outerWidth(true);
    var movings = false;
    // 初始化
    $prevA.addClass('no');
    $btn03.addClass('no');
    //设置监听
    $prevA.click(function () {
        $spans.each(function () {
             if($(this).hasClass('on')){
                 if($(this).index() == ($spans.length/2) + n){
                     // console.log($(this).index() + '上标记');
                     nextGroup($(this).index());
                 }
             }
         });
        if($(this).hasClass('no')){
            return;
        }
        nextPage(false);
    });
    $nextA.click(function () {

        $spans.each(function () {
         if($(this).hasClass('on')){
                if($(this).index() == ($spans.length/2-1) + n){
                    // 判断 什么时候 调用
                    // console.log($(this).index()+'下标记');
                    nextGroup($(this).index());
                }
            }
         });
        if($(this).hasClass('no')){
            return;
        }
        // console.log('下');
        nextPage(true);
    });
    $spans.click(function () {
        nextPage($(this).index());
    });
    var timer = null;
    //autoPlay();
    //鼠标移入移出 move 停止 移动
    $('.top-container').hover(function () {
        clearInterval(timer)
    },function () {
        //autoPlay();
    });
    //  自动轮播函数
    function autoPlay() {
        timer = setInterval(function () {
            nextPage(true);
        },1000)
    }
    //  自动 播放
    var index = 0;
    var SLID_TIME = 400;
    var moving = false; //图片是否移动
    //  图片 移动函数
    function nextPage(next) {
        // 如果正在移动  则 退出
        if(moving){
            return;
        }
        var targetLeft = 0;
        var currentLeft = $list.position().left;
        var offsetLeft = 0;
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
            seamless();  // 调用无缝函数
            moving = false;
            Btnhide()
        });
        //更新小图片
        updatePoint(next);
        function seamless() {
            if(targetLeft ==-($spans.length+1)*$li_width) {
                $list.css("left", -$li_width);
            } else if(targetLeft==0) {
                $list.css('left',-$spans.length*$li_width);
            }
        }
        // 按钮 隐藏函数
        function Btnhide() {
            targetLeft == -($spans.length)*$li_width ? $nextA.addClass('no') : $nextA.removeClass('no') ;
            targetLeft == -$li_width ? $prevA.addClass('no') : $prevA.removeClass('no') ;
        }
    }
    // 更新下标 函数
    function updatePoint(next){
        var targetIndex;
        //更新当前页的圆点样式
        $spans.eq(index).removeClass('on');
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
        $spans.eq(targetIndex).addClass('on');
        //更新下标
        index = targetIndex;
    }
    $btn03.click(function () {
        n--;
        if($(this).hasClass('no')){
            return;
        }
        nextGroup(false);
    });
    $btn04.click(function () {
        n++;
        if($(this).hasClass('no')){
            return;
        }
        nextGroup(true);
    });
    // 小图 走马灯 效果
    function nextGroup(next) {
        if(movings){
            return;
        }
        // 目标位置
        var targetLeft = 0;
        // 要移动的偏移量
        var offsetLeft = 0;
        movings = true;
        //  初始位置
        var currentLeft = $move.position().left;
        if( typeof next == 'boolean'){
            offsetLeft += next ? -$liLeft : $liLeft ;
        } else{
            // console.log('进入走马灯');
            currentLeft = 0;
            if(next == 4 + n){
                // console.log('右边移动');
                offsetLeft = ($spans.length - next + 2) * -$liLeft;
                if(offsetLeft < -865){
                    offsetLeft = -865;
                }
            }
         }
        targetLeft = offsetLeft + currentLeft ;
        // console.log(targetLeft);
        $move.animate({
            left : targetLeft
        },SLID_TIME,'linear',function () {
            Btnhide();
            movings = false;
        });
        // 按钮 函数
        function Btnhide() {
            targetLeft == 0 ? $btn03.addClass('no') : $btn03.removeClass('no') ;
            targetLeft <= -$moveLeft ? $btn04.addClass('no') : $btn04.removeClass('no') ;
        }
    }
});
