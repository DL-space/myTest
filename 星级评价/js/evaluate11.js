/**
 * Created by DL on 2016/11/14.
 */
$(function () {
    //根据屏幕自适应字体
    var pWidth = document.body.clientWidth;
    var $dpi = window.devicePixelRatio;
    var pFontSize;
    if ($dpi > 1) {
        pFontSize = pWidth * $dpi * 0.1 * (1 / $dpi);
    } else if ($dpi == 1) {
        if (pWidth >= 750) {
            pFontSize = 75;
        } else {
            pFontSize = pWidth * 0.1;
        }
    }
    $("html").attr("data-dpr", $dpi);
    $("html").css({
        "font-size": pFontSize
    });
    //小星星
    $(".star").raty(
        {
            click:function (scope) {
                change(scope);
            },
            score: function() {
                return $(this).attr('data-score');
            },
            path: function() {
                return $(this).attr('data-path');
            }
        }
    );
    //进度条
    var slider_width = $(".center").width();
    $('.single-slider').jRange({
        from: 0,
        to: 100,
        step: 1,
        scale: [0,50,100],
        format: '%s',
        width: slider_width,
        showLabels: true,
        showScale: true
    });
    function change(i) {
        var showItem = $(".eva-tags").find(".item");
        var showItem_F = $(".eva-tags").find(".item-F");
        var showItem_S = $(".eva-tags").find(".item-S");
        var textArea = $(".eva-content");
        if(i <= 3){
            showItem_S.hide();
            showItem_F.show();
            textArea.attr('placeholder','让您不满意的方面是？');
        }else{
            if(i = 4){
                alert(44)
                textArea.attr('placeholder','怎样做会更好？');
            }else{
                alert(55)
                textArea.attr('placeholder','让您认可的方面是？');
            }
            showItem_F.hide();
            showItem_S.show();
        }
        $(".show-area").slideDown(function () {
            showItem.each(function () {
                var that = $(this);
                var tags = that.find(".tag");
                var more = that.find(".more");
                var tagMore = that.find(".tag-more");
                more.on("click",function () {
                    more.hide();
                    tagMore.slideDown();
                });
                tags.on("click",function () {
                    if($(this).hasClass("active")){
                        $(this).removeClass("active");
                    }else{
                        $(this).addClass("active");
                    }
                })
            })
        });
        switch (i)
        {
            case 1:
                $(".satisfy").text("非常不满意");
                break;
            case 2:
                $(".satisfy").text("不满意");
                break;
            case 3:
                $(".satisfy").text("一般");
                break;
            case 4:
                $(".satisfy").text("满意");
                break;
            case 5:
                $(".satisfy").text("非常满意");
                break;
        }
        //更改按钮状态
        var subBtn = $(".submit");
        subBtn.addClass("active");
        //标签清零
        var tag = $(".eva-tags").find(".tag");
        tag.removeClass("active");
    }
    //弹层
    var btnSend = $(".btn-send");
    var mask = $(".mask");
    btnSend.on("click",function () {
        mask.show();
        btnSend.addClass("btn-clicked");
    });
    mask.on("click touchmove",function (e) {
        if(e.target.className == "mask" || e.target.className == "mask-close" || e.target.classList.contains("btn-sure")){
            mask.hide();
            btnSend.removeClass("btn-clicked");
        }
    });
    //单选
    var iptArea = $(".ipt-area");
    var btnRadio = iptArea.find(".radio-icon");
    btnRadio.each(function () {
        var that = $(this);
        var iptRadio = that.parent().find(".ipt");
        that.on("click",function () {
            iptRadio.trigger("checked");
            iptArea.removeClass("checked");
            that.parent().addClass("checked");
        });
    })
});
