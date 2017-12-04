$(function () {
    //数据区域分析页
    if ($(".col3 .qyxz").length > 0) {
        $(".col3 .qyxz").pin({
            containerSelector: ".row-fixed",
            padding: {top: 56}
        });
    }

    //楼盘列表中只有咨询师点评时的效果处理
    $(".house-item").each(function () {
        var _item = $(this);
        var attention = _item.find(".attention");
        var proComment = _item.find(".pro-comment");

        // console.log(attention);
        if (attention.length == 0 || attention.text() == "") {
            proComment.css({
                "float": "none"
            });
        }
    });

    //免费通话模块的前一个楼盘去掉底部边框
    $(".advice-free").prev(".house-item").css({
        "border-bottom": "0"
    });

    $(".o-list li").each(function(i){
        var divH = $(this).height();
        var $p = $("a", $(this)).eq(0);
        while ($p.outerHeight() > divH) {
            $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
        };
    });

    $(document).on("click",".feed-pic li",function () {
        var con = null;//点击标示，1：视频；0：图片
        var video = $("#video");
        var middle = $("#middle");
        var img = middle.find(".img");
        if($(this).hasClass("feed-video")){
            var url = $(this).attr("data-url");
            video.show();
            img.hide();
            videoPlay(url,1,600,450);
            con = 1;
        }else{
            var src = $(this).find("img").attr("src");
            img.show(0,function () {
                img.attr("src",src);
            });
            con = 0;
        }
        /*居中自适应*/
        changeStyle(con);
        /*显示弹层*/
        $("#fade").show(0);
        $("#picture").show(0)
    });
    /*阴影关闭*/
    $(document).on("click","#picture",function (e) {
        if(!(e.target.className == "img")){
            $("#fade").hide();
            $("#video").empty();
            $("#picture").hide();
        }
    });
    $(".sel-price .ipt").on("input",function () {
        var that = $(this),
            btnCommit = that.parent().find(".btn-commit");
        if(that.siblings(".ipt").val().length>0 && that.val().length>0){
            btnCommit.addClass("light")
        }else{
            btnCommit.removeClass("light")
        }
    })
    $(".select-h .select-area").each(function () {
        var that = $(this),
            con = that.find(".opt-wrap"),
            option = that.find(".option");
        con.click(function () {
            option.slideToggle(300);
        });
        /*点击其他区域*/
        $(document).click(function (e) {
            var _con = $(".select-h .select-area");   // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                option.slideUp(300);
            }
        });
        option.find("li").click(function () {
            $(this).siblings("li").removeClass("checked").end().addClass("checked");
            con.text($(this).text());
            option.slideUp(300);
        })
    })
});
/**
 * 视频播放：videoPlay(url,play,w,h)
 * @param: url:视频地址
 *        play：是否自动播放（0：不播放；1：播放）
 *          w ：播放器宽度
 *          h ：播放器高度
 */
function videoPlay(url,play,w,h) {
    var flashvars={
        f:url,
        p:play
    };
    var params={
        bgcolor:'#FFF',
        allowFullScreen:true,
        allowScriptAccess:'always',
        wmode:'transparent'
    };
    CKobject.embedSWF("/ckplayer/ckplayer.swf",'video','ckplayer_video',w,h,flashvars,params);
}
/*图片自适应居中*/
function changeStyle(con) {
    if(con == 0){
        var newImg = new Image();
        // 获取当前图片的 src属性
        newImg.src = $(".img").attr("src");
        var pWidth = newImg.width;
        var pHeight = newImg.height;
        //容器极限值
        var maxPicContaienrWidth = 1200;
        var maxPicContaienrHeight = 600;
        //容器宽高比率
        var picContainerRadio = maxPicContaienrWidth / maxPicContaienrHeight;
        //图片的宽高比率
        var picRadio = pWidth / pHeight;
        //图片尺寸都小于容器极限值1200 x 600
        if(pHeight <= maxPicContaienrHeight && pWidth <= maxPicContaienrWidth){
            $(".img").css({
                "width":pWidth,
                "height":pHeight
            });
        }else{
            if(picRadio > picContainerRadio) {
                $(".img").css({
                    "width":maxPicContaienrWidth,
                    "height":maxPicContaienrWidth/picRadio
                });
            }else {
                $(".img").css({
                    "width":"auto",
                    "height":maxPicContaienrHeight
                });
            }
        }
        //图片高度
        var pH = $(".img").height();
        // 赋值操作
        var Top = ($(window).height() - pH)/2;
        // 垂直居中
        $("#middle").css('top',Top);
    }else if(con == 1){
        var Top1 = ($(window).height() - 450)/2;
        $("#middle").css('top',Top1);
    }
}
