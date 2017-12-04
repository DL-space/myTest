$(function () {
    /**
     * 隐藏索引值大于index的点评图片
     */
    function hideCommentPic(index) {
        $(".review").each(function () {
            var picArea = $(this).find(".pic-area");
            picArea.children("li:gt(" + index + ")").hide();
        });
    }

    hideCommentPic(2);


    pd();
    /*点评展开*/
    function pd() {
        var review = $(".review");
        review.each(function () {
            var that = $(this);
            var cmtDetail = that.find(".detail");
            var cssHeight = parseInt(cmtDetail.css("max-height"));
            var relHeight = parseInt(cmtDetail[0].scrollHeight);
            var cmtPic = that.find(".pic-area li");
            var picSize = cmtPic.size();
            var dpShowMore = that.find(".show-more");
            if (relHeight > cssHeight * 1.2 || picSize > 3) {
                dpShowMore.show();
            }
            dpShowMore.on("click", function () {

                if ($(this).hasClass("show-more-display")) {
                    $(this).siblings(".pic-area").children("li:gt(2)").hide();
                    dpShowMore.removeClass("show-more-display");
                    cmtDetail.removeClass("detail-more");

                } else {
                    $(this).siblings(".pic-area").children("li:gt(2)").show();
                    dpShowMore.addClass("show-more-display");
                    cmtDetail.addClass("detail-more");
                }
            });
        });
    }
});

// 弹窗 图片自适应
$(function () {
    var $shade = $('.shade')
    var $shade_content = $('.shade-content')
    var $shade_close = $('.shade-h>a');
    $('.pic-area li').click(function () {
        var $that = $(this);
        imgMediate($that);
    });
    $('.journey .face').click(function () {
        var $that = $(this);
        imgMediate($that);
    })

    // 点击 隐藏并且清空
    $shade.click(function () {
        // 隐藏
        $shade.hide();
        // 清空所有
        $shade_content.hide().html('').removeAttr("style");
    })
    // 点击图片 隐藏并且清空
    $shade_content.click(function () {
        // 隐藏
        $shade.hide();
        // 清空所有
        $shade_content.hide().html('').removeAttr("style");
    })
    //图片自适应容器
    function imgAjust(picContainer, pic) {
        //容器的宽高
        var picContainerWidth = picContainer.width();
        var picContainerHeight = picContainer.height();
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

            if (imgWidth > picContainerWidth || imgHeight > picContainerHeight) {
                if (imgRadio > picContainerRadio) {
                    _item.width("100%");
                    _item.height("auto");
                } else {
                    _item.width("auto");
                    _item.height("100%");
                }
            } else if (imgWidth <= picContainerWidth && imgHeight <= picContainerHeight) {
                _item.width(imgWidth);
                _item.height(imgHeight);
            }
        });
        return pic
    }
    // 封装函数
    function imgMediate($that) {
        // 获取src 路径
        var img = $that.children('img').clone();
        // 显示弹层和图片
        $shade.show()
        var Img = imgAjust($shade, img)
        $shade_content.append(Img)
        // 获取 img 的高度和宽度
        var ImgLeft = parseInt(Img.css('width'));
        var ImgTop = parseInt(Img.css('height'));
        // 获取屏幕总宽度
        var $All_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var $All_height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

        if(ImgLeft === 100 || ImgTop === 0){
            ImgLeft = -$All_width/2
            // 获取 div 高度
            var $shad_height = $('.shade-content').height();
            ImgTop = -$shad_height
        }else if(ImgLeft === 0 || ImgTop === 100){
            // 强制图片宽高
            $shade_content.find('img').css('height', $All_height);
            $shade_content.find('img').css('width', $All_width);
            ImgTop = -$All_height/2;
            ImgLeft = -($All_width)/2;
        }else {
            ImgTop = -ImgTop/2
            ImgLeft = -ImgLeft/2
        }
        // 赋值
        $shade_content.css("marginTop",ImgTop).css("marginLeft",ImgLeft).show();
    }
})