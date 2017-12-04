/**
 * 周边分析
 */
$(function () {
    /*弹出层*/
    var $env_pic = $('.env-picone img');
    var $env_pit = $('.env-pictwo img');
    var $picture = $('#picture');
    var $fade = $('#fade');
    // 弹出层 函数
    var $middle = $('#middle');
    var $cha = $('#cha');
    // 图片 自适应
    var $imgs = $('.img');
    var $window_height = $(window).height();

    // 初始化 样式
    $imgs.css('display', 'none');
    // 点击 显示弹出层
    $env_pic.click(function () {
        show(0);
    });
    $env_pit.click(function () {
        show(1);
    });


    // 点击 隐藏
    $picture.click(function () {
        hideli($fade, $picture, $middle, $imgs);
        stop($imgs);
    });
    var img;
    var newImg = new Image();
    img = $imgs[0];
    newImg.src = img.src;

    function show(num) {
        imgAjust($imgs);

        img = $('.img')[num];
        //图片高度
        var pH =  img.style.height;
        pH = parseInt(pH);
        // 获取 top 值
        var Top = ($window_height - pH) / 2;

        $middle.css('top', Top);
        $fade.show()
        $picture.show()
        // 显示当前的 li
        img.style.display = 'block';
    }

    // 隐藏 函数
    function hideli(c, d, m, i) {
        c.hide();
        d.hide();
        // 重置所有的 top
        m.css('top', '0');
        // 隐藏所有的 li
        i.hide()

    }

    // 点击 小X
    $cha.click(function () {
        hideli($fade, $picture);
    });
    // 取消事件 冒泡
    function stop(img) {
        img.click(function (event) {
            event.stopPropagation();
        })
    }

    //图片自适应容器
    function imgAjust(pic) {
        //容器的宽高
        var picContainerWidth = 1200;
        var picContainerHeight = 600;

        //图片容器宽高比率
        var picContainerRadio = picContainerWidth / picContainerHeight;
        // 图片加载完成时 调用函数
        pic.each(function () {
            //获取当前图片
            var _item = $(this);

            //原图片尺寸
            var image = new Image();
            image.src = _item.attr("src");

            //原始图片宽、高
            var imgWidth = image.width;
            var imgHeight = image.height;

            //原始图片宽、高比率
            var imgRadio = imgWidth / imgHeight;

            //图片尺寸都小于容器极限值1200 x 600
            if (imgHeight <= picContainerHeight && imgWidth <= picContainerWidth) {
                _item.width(imgWidth);
                _item.height(imgHeight);
            } else {
                if (imgRadio > picContainerRadio) {
                    _item.width(picContainerWidth);
                    _item.height(picContainerWidth / imgRadio);

                } else {
                    _item.width(picContainerHeight * imgRadio);
                    _item.height(picContainerHeight);
                }
            }
        });
    }
});
$(function () {
    $(".env-qyfx").mCustomScrollbar();
});
$(function () {
    $('.content .more').click(function () {
        $(this).parent('.content').find('.text').toggle();
        $(this).parent('.content').find('.text-more').toggle();
        $(this).find(".show-more").toggle();
        $(this).find('.hide-more').toggle();
    })
    //滚动条美化
    /*var zbList = $(".zb-list");
    if (zbList.length > 0) {
        zbList.mCustomScrollbar();
    }*/
})