window.onload = function(){
    //网页资源加载完成之后重置户型详情图片的对齐样式
    imgAjust($(".top-container-ul li"),$(".top-container-ul li img"));
};
$(function () {
    //网页首次加载时重置户型详情图片的对齐样式
    imgAjust($(".top-container-ul li"),$(".top-container-ul li img"));
    //定义jQuery对象
    var $list = $('.top-container-ul');
    // 小图片 下标
    var $spans = $(".small_list li");
    // 小图片 ul
    var $prevA = $(".hous-btnz");   //上一页
    var $nextA = $(".hous-btny");    //下一页
    // 移动距离
    var $li_width = $('.top-container-ul li').width();
    var $move = $('.move');
    var $liLeft = $spans.outerWidth(true);

    // 初始化
    // 一张的时候
    if($spans.length == 1){
        $nextA.addClass('hous-no');
    }
    $prevA.addClass('hous-no');

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
            if($(this).hasClass('hous-on')){
                if(!(arrlistmoveL.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('hous-no')){
            return;
        }
        nextPage(false);
    });
    $nextA.click(function () {
        // 对应下标移动函数
        $spans.each(function () {
            if($(this).hasClass('hous-on')){
                if(!(arrlistmoveR.indexOf($(this).index()) == -1)){
                    nextGroup($(this).index());
                }
            }
        });
        if($(this).hasClass('hous-no')){
            return;
        }
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
            targetLeft == -($spans.length - 1)*$li_width ? $nextA.addClass('hous-no') : $nextA.removeClass('hous-no') ;
            targetLeft == 0 ? $prevA.addClass('hous-no') : $prevA.removeClass('hous-no') ;
        }
    }
    // 更新原点函数
    function updatePoint(next){
        var targetIndex;
        //更新当前页的圆点样式
        $spans.eq(index).removeClass('hous-on');
        if(typeof next === 'boolean'){
            if(next){
                targetIndex = index + 1;
            }else{
                targetIndex = index - 1;
            }
        }else{
            targetIndex = next;
        }
        $spans.eq(targetIndex).addClass('hous-on');
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
            targetLeft = offsetLeft + currentLeft;
        } else {
            if( (next + 1)%5 == 0){
                targetLeft = -450 * (next + 1)/5
            }
            if( next%5 == 0 ){
                targetLeft = -450 * ((next)/5 - 1)
            }
        }
        $move.animate({
            left : targetLeft
        },SLID_TIME,'linear',function () {
            movings = false;
        });
    }
})

$(function () {
    // 定义 使用参数
    var  options = {
        $slide_ul : $('.top-container-ul'),
        $popup : $('#popup'),
        $poupbox : $('#popup-box'),
        $middle : $('#middle'),
        $cha : $('#cha'),
        $imgs :  $('.img'),
        $m_prev :  $('.prev'),
        $m_next : $('.next')
    };
    // 调用
    options.$poupbox.propup(options);
})
