$(function () {

    /*ie*/

    if (!Array.prototype.indexOf) {

        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    };

    /*ie*/
    var footerHeight = $(".footer").height();
    $(".center").css("padding-bottom",footerHeight);
    //输入框获取焦点提示文字清空
    $(document).on("focus", "input[type='text']", function () {
        var $val = $(this).val();
        if ($val == this.defaultValue) {
            $(this).val("");
        }
    });
    //输入框失去焦点展示默认提示文字
    $(document).on("blur", "input[type='text']", function () {
        var $val = $(this).val();
        if ($val == "") {
            $(this).val(this.defaultValue);
        }
    });
});

//tab切换
var tab = $(".tab");
tab.each(function () {
    var _item = $(this);
    var $div_li = _item.children(".tab-t").find("li");
    var $div_con = _item.children(".tab-c");
    var firstLiCls = $div_li.eq(0);
    $div_li.each(function () {
        if ($(this).hasClass("on")) {
            var index = $div_li.index(this);
            $div_con.find(".nrpart")
                .eq(index)
                .show()
                .siblings(".nrpart")
                .hide();

            $div_li.hover(function () {
                $(this).addClass("on")
                    .siblings("li").removeClass("on");
                index = $div_li.index(this);
                $div_con.find(".nrpart")
                    .eq(index)
                    .show()
                    .siblings(".nrpart")
                    .hide();
            });
        }else if($(this).hasClass("t-sel")){
            var index = $div_li.index(this);
            $div_con.find(".nrpart")
                .eq(index)
                .show()
                .siblings(".nrpart")
                .hide();
            $div_li.click(function(){
                $(this).addClass("t-sel")
                    .siblings("li").removeClass("t-sel");
                index = $div_li.index(this);
                $div_con.find(".nrpart")
                    .eq(index)
                    .show()
                    .siblings(".nrpart")
                    .hide();
            });

        }
    });
});



/**
 * Created by DL on 2016/10/10.
 */
/**
 * 是否显示筛选条件的后两项
 * @param: state（0、1）
 *          0 ：默认显示
 *          1 ：默认隐藏
 */
function change(state) {
    var tag = state;
    var searchArea = $(".search-wrap");
    var selectArea = searchArea.find(".selector");
    var hideArea = selectArea.find(".hide-area");
    var btn = searchArea.find(".btn");
    btn.on("click",function () {
        if(tag == 1){
            change(0);
        }else if(tag == 0){
            change(1);
        }
    });
    if(tag == 1){
        btn.find(".ico").removeClass("ico-hide").addClass("ico-show");
        btn.find(".text").text("展开");
        hideArea.hide();
    }else if(tag == 0){
        btn.find(".ico").removeClass("ico-show").addClass("ico-hide");
        btn.find(".text").text("收起");
        hideArea.show();
    }
}
$(function () {
    change(1);
});
$(function () {
    //其他城市弹层
    var isCity = true;
    $('.city-tip').mouseover(function () {
        if (isCity) {
            $(this).children(".city-change-list").show();
        }
        isCity = false;
    }).mouseleave(function () {
        $(this).children(".city-change-list").hide();
        isCity = true;
    });

    //页面滚动后header悬浮
    $(window).scroll(function () {
        var height = $(document).scrollTop();
        var headerHeight = $(".header").height();
        if (height > headerHeight) {
            $('.header2').fadeIn('slow', function () {
                $(this).css('display', 'block');
            });
        } else {
            $('.header2').fadeOut('slow', function () {
                $(this).css('display', 'none');
            });
        }
    });
});

/**
 * Created by DL on 2016/10/20.
 */
$(function () {
    var body = $("body");
    var sideArea = $(".right-flow");
    var items = $(".sidebar").find(".s-item");
    var des = $(".des");
    items.each(function () {
        var that = $(this);
        var bgImg = that.find(".bg-img");
        var des = that.find(".des");
            that.hover(function () {
                if(!des.is(":animated")){
                    des.show(0).animate({'right':38,'opacity':1},100);
                    bgImg.addClass("hover");
                }
            },function(){
                des.animate({'right':48,'opacity':0},100).hide(100);
                bgImg.removeClass("hover");
            });
        that.on("click",function () {
            if(bgImg.hasClass("checked")){//判断当前是否有选中状态
                bgImg.removeClass("checked");
            }else{
                $(".checked").removeClass("checked");
                bgImg.addClass("checked");
            }
            if(!that.hasClass("s-login")&&!that.hasClass("s-look")&&!that.hasClass("s-footprint")){
                closeAll();//点击无关标签关闭所有弹层
            }
            des.animate({'right':48,'opacity':0},100).hide(100);
        });
        if(des.is(":visible")){
            bgImg.addClass("hover");
        }
    });
    /*登录*/
    var loginDiv = $(".login");
    var loginItem = $(".s-login").find(".bg-img,.des");
    var loginDes = $(".s-login").find(".des");
    var closeBtn = loginDiv.find(".close");
    loginItem.on("click",function () {//切换登录div的显示状态，同时关闭右侧滑块
        loginDes.hide();
        loginDiv.toggle(100);
        sideArea.animate({"right":-240},100);
    });
    closeBtn.on("click",function (e) {//点击关闭按钮关闭login，同时移除选中状态
        loginItem.removeClass("checked");
        loginDiv.hide(100);
        e.stopPropagation()
    });
    /*足迹*/
    var footDiv = $(".footprint");
    var myFoot = $(".s-footprint").find(".bg-img,.des");
    var closeFoot = footDiv.find(".close");
    myFoot.on("click",function () {
        fadeIO(footDiv,lookDiv);
    });
    closeFoot.on("click",function () {//点击关闭按钮关闭我的足迹，同时去掉选中样式
        sideArea.animate({"right":-240},100);
        myFoot.removeClass("checked");
    });
    /*预约看房*/
    var lookDiv = $(".s-look-house");
    var myLook = $(".s-look").find(".bg-img,.des");
    myLook.on("click",function () {
        fadeIO(lookDiv,footDiv);
    });
    /*空白区域*/
    $(document).click(function(e){
        var _con = $(".right-flow");   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            loginDiv.hide(100);
            loginItem.removeClass("checked");
        }
    });
    /**
     * @param:i:要显示的div，0：要隐藏的div
      */
    function fadeIO(i,o) {
        if(sideArea.css("right") == "-240px"){
            sideArea.animate({"right":0},100);
        }else if(sideArea.css("right") == "0px" && i.css("z-index")==1){
            sideArea.animate({"right":-240},100);
        }
        o.animate({"height":0,"z-index":0},300);
        i.animate({"z-index":1,"height":"100%"},300);
        if(loginDiv.is(":visible")){
            loginDiv.hide(100);
        }
    }
    if($(".right-flow").length>0){
        $(".right-flow .house-list,.right-flow .service-list").mCustomScrollbar();
    }
    //没有登录，点击我的足迹中的“登陆一下”弹出登录框
    var footprintLogin = footDiv.find(".user-none").find("a");
    footprintLogin.on("click",function () {
        loginDiv.show(100);
        sideArea.animate({"right":-240},100);
    });
    //点击top回顶部
    var goTop = $(".s-top").find(".bg-img,.des");
    goTop.on("click",function () {
        $('body,html').animate({ scrollTop: 0 }, "200");
        return false;
    });
    //高度自适应
    var serviceList = lookDiv.find(".service-list");
    var houseList = footDiv.find(".house-list");
    var screenHeight = $(document.body).height();
    serviceList.css({
        height:screenHeight*0.5
    });
    houseList.css({
        height:screenHeight*0.66
    });
    //关闭所有
    function closeAll() {
        loginDiv.hide(100);
        sideArea.animate({"right":-240},100);
    }
});

