$(function () {
    //单击用户名，展开用户相关操作
    $(".u-name > a").click(function () {
        if ($(this).next(".u-dropdown").is(":hidden")) {
            $(this).next(".u-dropdown").show();
        }
    });

    $(".u-dropdown li").click(function () {
        if ($(".u-dropdown").is(":visible")) {
            $(".u-dropdown").hide();
        }
    });
});

//单击用户操作浮层意外区域关闭用户操作浮层
$(document).mouseup(function (e) {
    var _con = $(".u-dropdown");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        if ($(".u-dropdown").is(":visible")) {
            $(".u-dropdown").hide();
        }
    }
});

$(function(){
    //页面导航滚动
    if ($(".major-content .scroll-bar").length > 0) {
        scrollFixed();
    }
});

/* 拼接弹层的html结构
 *@param string/html content:弹层信息主体
 *return html
 */
function pageHtml(content) {
    var htmlContent = content;
    return htmlContent;
}

/*公共弹层函数
 *@param html  要传入的html结构
 *@param type  弹层类型 1：简单文本信息提示层，2：带有输入等交互的弹层
 *@param func
 *@param data func参数所需的数据，如果需要
 *@param commit_url  确认按钮的跳转url
 *@param offset string 弹层坐标,默认垂直、水平居中
 */
function popup(htmlContent, type, func, data, commit_url, area, offset) {

    var htmlContent = htmlContent;
    if (type == "1") {
        htmlContent = popTipsHtmlTop + htmlContent + popTipsHtmlBottom;
        htmlContent = pageHtml(htmlContent);
    } else if (type == "2") {
        htmlContent = pageHtml(htmlContent);
    }
    //根据页面宽度自适应弹层的宽度
    //页面宽度大于768px（参考bootstrap定义最小屏幕宽度值），则固定宽度为400px
    //页面宽度小于768px，则设置弹层宽度为页面宽度的80%
    var pageWidth = document.body.clientWidth;
    var layerWidth;

    //设置弹层坐标
    if (offset == "undefined") {
        offset = "";
    } else {
        offset = offset;
    }

    if (area) {
        layerWidth = area;
    } else {
        if (pageWidth > 768) {
            layerWidth = '400px';
        } else {
            layerWidth = '80%';
        }
    }

    var index = layer.open({
        type: 1,   //必填， 默认0,可传入值：0：信息框，1：页面层，2：iframe层，3：加载层，4：tips层
        area: layerWidth,
        title: false,
        closeBtn: false,
        shadeClose: true,
        shade: 0.6,
        border: 0,
        offset: offset,
        content: htmlContent,
        success: function () {
            if (typeof commit_url != "undefined" && commit_url.length != 0) {
                $(".btn-commit").on("click", function () {
                    location.href = commit_url;
                });
            }

            if (typeof func == "object" || typeof func == "undefined") {
                $(".layer-close,.layer-btn-reset,.btn-commit").on("click", function () {
                    layer.close(index);
                });
            }

            if (typeof func == "function") {
                $(".layer-close,.layer-btn-reset,.btn-commit").click(function () {
                    layer.close(index);
                });
                $(".btn-commit").click(function () {
                    func(data);
                });
            }
        }
    });
    return index;
}


/**
 * 页面导航滚动
 */
function scrollFixed() {
    var centerScroll = $(".center-s");
    var majorContent = centerScroll.find(".major-content");
    var formBlock = majorContent.find(".form-block");
    var scrollBar = majorContent.find(".scroll-bar");
    var scrollLi = scrollBar.find("li");
    var scrollFather = scrollBar.parent();
    var scrollHeight = $(window).height();
    centerScroll.css({
        height: scrollHeight
    });
    majorContent.on("scroll", function() {
        var Totop = scrollFather.offset().top;
        if (Totop < 182) {
            scrollBar.addClass("fixed");
        } else if (Totop > 182) {
            scrollBar.removeClass("fixed");
        }
        scrollLi.each(function() {
            var that = $(this);
            var index = that.index();
            var t = that.offset().top;
            var t1 = formBlock.eq(index).offset().top;
            if (t1 < t) {
                that.addClass("active");
                that.siblings("li").removeClass("active");
            }
        });
    })
}