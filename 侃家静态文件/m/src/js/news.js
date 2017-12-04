$(function () {
    // 获取点击 元素
    var $tab_t = $(".tab-top");
    var $c_li = $tab_t.find('li');
    var $prop= $("#prop");
    var $body = $('body');
    var $input = $('.ipt-area').find("input");
    // 相应点击事件
    $c_li.click(function () {
        // 给自己 添加一个类
        $(this).children('div').find('span').addClass("tab-on");
        // 删除兄弟的类
        $(this).siblings('li').children('div').find('span').removeClass("tab-on");
        // 最后一个div  显示
        $(this).children('.show').show();
        $(this).siblings('li').children('.show').hide();
        // 添加一个body
        $body.css("overflow", 'hidden');
        // 显示弹层
        $prop.show();
    });
    // 遮罩层显示
    $prop.click(function () {
        close();
    });
    // 点击 input 隐藏
    $input.click(function () {
        close();
    });
    // 鼠标点击 添加Class
    $('.n-media').hover(function () {
        $(this).addClass('media-on').siblings().removeClass('media-on');
    });

    // 点击 切换文字
    var $ana_ul = $('.ana-ul');
    var $adv_ul = $('.adv-ul');
    var $analyze_h = $('.analyze-h');
    var $analyze_b = $('.advisory-h');

    /* $ana_ul.delegate("li","click",function(){
     // 获取 当前的文字信息
     var $text = $(this).find("a").html();
     // 替换文字
     $(this).parents('li').find('.analyze-h').html($text);
     close()
     });*/

    wq($ana_ul, $analyze_h);
    wq($adv_ul, $analyze_b);

    function wq($ul, $a){
        $ul.delegate("li","click",function(ev){
            // 获取 当前的文字信息
            var $text = $(this).find("a").html();
            // 替换文字
            $(this).parents('li').find($a).html($text);
            // 阻止冒泡
            event.stopPropagation();
            close();
        });
    }

    // 关闭函数
    function close() {
        // 收起
        $c_li.find('.show').hide();
        // 去掉所有
        $c_li.children('div').find('span').removeClass("tab-on");
        // 弹层 收起
        $prop.hide();
        $body.css("overflow", 'visible');
    };

});