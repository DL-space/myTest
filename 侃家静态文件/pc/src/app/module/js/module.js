$(function () {

    /*ie*/

    if (!Array.prototype.indexOf) {

        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
    ;

    /*ie*/
    var footerHeight = $(".footer").height();
    $(".center").css("padding-bottom", footerHeight);
    //输入框获取焦点提示文字清空
    /*$(document).on("focus", "input[type='text']", function () {
        var $val = $(this).val();
        if ($val == this.defaultValue) {
            $(this).val("");
        }
    });*/
    //输入框失去焦点展示默认提示文字
    /*$(document).on("blur", "input[type='text']", function () {
        var $val = $(this).val();
        if ($val == "") {
            $(this).val(this.defaultValue);
        }
    });*/

    //价格说明提示层
    $(".price-cmt").hover(function(){
        $(this).children(".tips-price-cmt").show();
    },function(){
        $(this).children(".tips-price-cmt").hide();
    });
});

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
}

window.onload = function () {//隐藏mac迅雷插件自动加载的代码结构
    $("embed[type='application/thunder_download_plugin']").css("display","none")
};