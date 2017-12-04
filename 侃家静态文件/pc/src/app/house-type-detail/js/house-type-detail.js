$(function () {
    //定义jQuery对象
    var $list = $('.top-container-ul');
    // 小图片 下标
    var $spans = $(".small_list li");
    // 小图片 ul
    var $prevA = $("#btnz");   //上一页
    var $nextA = $("#btny");    //下一页
    // 移动距离
    var $li_width = $('.top-container-ul li').width();
    var $move = $('.move');
    var $liLeft = $spans.outerWidth(true);
    // console.log($liLeft);
    // 初始化
    $prevA.addClass('zno');
    // 设置监听
    $prevA.click(function () {
        $spans.each(function () {
            if($(this).hasClass('zon')){
                if($(this).index() == ($spans.length/2)){
                    //console.log($(this).index() + '上标记');
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('zno')){
            return;
        }
        nextPage(false);
    });
    $nextA.click(function () {
        // 对应下标移动函数
        $spans.each(function () {
            if($(this).hasClass('zon')){
                if($(this).index() == ($spans.length/2-1)){
                    // 判断 什么时候 调用
                    //console.log($(this).index()+'下标记');
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('zno')){
            return;
        }
        // console.log('下');
        nextPage(true);
    });
    // 点击小图对应 大图函数
    $spans.click(function () {
        nextPage($(this).index());
    });
    //  自动 播放
    var index = 0;
    var SLID_TIME = 400;
    var moving = false; //图片是否移动
    var movings = false; //图片是否移动
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
            //seamless();  // 调用无缝函数
            moving = false;
            Btnhide()
        });
        // 无缝轮播
        function seamless() {
            if(targetLeft ==-($spans.length+1)*$li_width) {
                $list.css("left", -$li_width);
            } else if(targetLeft==0) {
                $list.css('left',-$spans.length*$li_width);
            }
        }
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
            targetLeft == -($spans.length)*$li_width ? $nextA.addClass('zno') : $nextA.removeClass('zno') ;
            targetLeft == -$li_width ? $prevA.addClass('zno') : $prevA.removeClass('zno') ;
        }
    }
    // 更新原点函数
    function updatePoint(next){
        var targetIndex;
        //更新当前页的圆点样式
        $spans.eq(index).removeClass('zon');
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
        $spans.eq(targetIndex).addClass('zon');
        //更新下标
        index = targetIndex;
    }
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
            //console.log('进入走马灯');
            currentLeft = 0;
            if(next == 4){
                // console.log('右边移动');
                offsetLeft = -450;
            }
            if(next == 5){
                // console.log('左边移动')
                targetLeft = 0;
            }
        }
        //console.log(targetLeft);
        targetLeft = offsetLeft + currentLeft ;
        //console.log(targetLeft);
        $move.animate({
            left : targetLeft
        },SLID_TIME,'linear',function () {
            movings = false;
        });
        // 按钮 函数

    }
    // 弹出层 函数
    var $popup = $('#popup');
    var $poupbox = $('#popup-box');
    var $middle = $('#middle');
    var $cha = $('.cha');
    var num = 0;
    var $imgs = $('.img');

    //var img;
    //console.log($(window).height());
    // 设置高度
    // 获取 img 原始 高度和宽度 进行判断 宽度大于1200的时候 = 1200 高度大于900 = 900
    /* var newImg = new Image();
     newImg.src = document.getElementsByTagName('img')[0].src;
     console.log(newImg.src);
     var pWidth = newImg.width;
     var pHeight = newImg.height;
     console.log(pWidth+'图片真实宽度');
     console.log(pHeight+'图片真实宽度');
     // 获取 top 值
     // 两次判断  高度和宽度
     if( pHeight >= 600 ){
     pHeight = 600;
     $img.css('height', '600');
     }
     console.log(pHeight+'图片判断后高度');
     console.log($(window).height() +'视口高度');
     var Top = ($(window).height() - pHeight)/2;
     console.log(Top+'top值');*/

    // 获取 视口的 高度
    //console.log($(window).height()+'视口高度');
    //console.log($(window).width()+'视口宽度');

    // 委派 点击显示
    $list.delegate("li", "click", function(event){
        num = $(this).index();
        num -= 1;
        showli(num);

    });
    // 点击 隐藏
    $poupbox.click(function (event) {
        stop(event);
        hideli();
    });
    // 初始化
    $imgs.css('height', 0);
    $imgs.css('width', 0);

    // 显示 对应 li 函数
    var newImg = new Image();
    function showli(num) {
        img = $('.img')[num];
        // console.log('显示弹层');
        // 获取当前图片的 src属性
        newImg.src = document.getElementsByClassName('img')[num].src;
        // console.log(newImg.src+'当前图片路径');
        var pWidth = newImg.width;
        var pHeight = newImg.height;
        // console.log(pWidth+'图片真实宽度');
        // console.log(pHeight+'图片真实宽度');
        // 获取 top 值
        // 两次判断  高度和宽度
        if( pHeight >= 600 && pWidth >= 800){
            // console.log('进入判断');
            pHeight = 600;
            pWidth = 800;

        }else {
            // console.log(pHeight+'图片判断后高度');
            // console.log(pWidth+'图片判断后宽度');
            $imgs.css('height', pHeight);
            $imgs.css('width', pWidth);
            // console.log($imgs.innerHeight());
            // console.log($imgs.Width);
        }
        $imgs.css('height', pHeight);
        $imgs.css('width', pWidth);
        // 赋值操作
        // console.log($(window).height() +'视口高度');
        var Top = ($(window).height() - pHeight)/2;
        // console.log(Top+'top值');

        $popup.css('display', 'block');
        $poupbox.css('display', 'block');
        // 显示当前的 li
        img.style.display = 'block';
        // 垂直居中
        $middle.css('top',Top);

    }
    // 隐藏 函数
    function hideli() {
        // 弹出层
        $popup.css('display', 'none');
        // 内容层
        $poupbox.css('display', 'none');
        // 重置所有的 top
        $middle.css('top', '0');
        // 隐藏所有的 li
        $imgs.css('display','none');

    }
    // 点击 小X
    $cha.click(function () {
        // 隐藏函数
        hideli();
    });
    // 取消事件 冒泡
    function stop(event) {
        $middle.click(function (event) {
            event.stopPropagation();
        })
    }

});