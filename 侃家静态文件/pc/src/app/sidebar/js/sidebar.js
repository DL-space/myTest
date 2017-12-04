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
            if (!des.is(":animated")) {
                des.show(0).animate({'right': 38, 'opacity': 1}, 100);
                bgImg.addClass("hover");
            }
        }, function () {
            des.animate({'right': 48, 'opacity': 0}, 100).hide(100);
            bgImg.removeClass("hover");
        });
        that.on("click", function () {
            if (bgImg.hasClass("checked")) {//判断当前是否有选中状态
                bgImg.removeClass("checked");
            } else {
                $(".checked").removeClass("checked");
                bgImg.addClass("checked");
            }
            if (!that.hasClass("s-login") && !that.hasClass("s-look") && !that.hasClass("s-footprint")) {
                closeAll();//点击无关标签关闭所有弹层
            }
            des.animate({'right': 48, 'opacity': 0}, 100).hide(100);
        });
        if (des.is(":visible")) {
            bgImg.addClass("hover");
        }
    });
    /*登录*/
    var loginDiv = $(".login");
    var loginItem = $(".s-login").find(".bg-img,.des");
    var loginDes = $(".s-login").find(".des");
    var closeBtn = loginDiv.find(".close");
    loginItem.on("click", function () {//切换登录div的显示状态，同时关闭右侧滑块
        loginDes.hide();
        loginDiv.toggle(100);
        sideArea.animate({"right": -240}, 100);
    });
    closeBtn.on("click", function (e) {//点击关闭按钮关闭login，同时移除选中状态
        loginItem.removeClass("checked");
        loginDiv.hide(100);
        e.stopPropagation()
    });
    /*足迹*/
    var footDiv = $(".footprint");
    var myFoot = $(".s-footprint").find(".bg-img,.des");
    var closeFoot = footDiv.find(".close");
    myFoot.on("click", function () {
        fadeIO(footDiv, lookDiv);
    });
    closeFoot.on("click", function () {//点击关闭按钮关闭我的足迹，同时去掉选中样式
        sideArea.animate({"right": -240}, 100);
        myFoot.removeClass("checked");
    });
    /*预约看房*/
    var lookDiv = $(".s-look-house");
    var myLook = $(".s-look").find(".bg-img,.des");
    myLook.on("click", function () {
        fadeIO(lookDiv, footDiv);
    });
    /*空白区域*/
    $(document).click(function (e) {
        var _con = $(".right-flow");   // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            loginDiv.hide(100);
            loginItem.removeClass("checked");
            sideArea.animate({"right":-240},100);
            myFoot.removeClass("checked");
            myLook.removeClass("checked");
        }
    });
    /**
     * @param:i:要显示的div，0：要隐藏的div
     */
    function fadeIO(i, o) {
        if (sideArea.css("right") == "-240px") {
            sideArea.animate({"right": 0}, 100);
        } else if (sideArea.css("right") == "0px" && i.css("z-index") == 1) {
            sideArea.animate({"right": -240}, 100);
        }
        o.animate({"height": 0, "z-index": 0}, 300);
        i.animate({"z-index": 1, "height": "100%"}, 300);
        if (loginDiv.is(":visible")) {
            loginDiv.hide(100);
        }
    }

    if ($(".right-flow").length > 0) {
        $(".right-flow .house-list,.right-flow .service-list").mCustomScrollbar();
    }
    //没有登录，点击我的足迹中的“登陆一下”弹出登录框
    var footprintLogin = footDiv.find(".user-none").find("a");
    footprintLogin.on("click", function () {
        loginDiv.show(100);
        sideArea.animate({"right": -240}, 100);
    });
    //点击top回顶部
    var goTop = $(".s-top").find(".bg-img,.des");
    goTop.on("click", function () {
        $('body,html').animate({scrollTop: 0}, "200");
        return false;
    });
    //高度自适应
    var serviceList = lookDiv.find(".service-list");
    var houseList = footDiv.find(".house-list");
    var screenHeight = $(document.body).height();
    serviceList.css({
        height: screenHeight * 0.5
    });
    houseList.css({
        height: screenHeight * 0.66
    });
    //关闭所有
    function closeAll() {
        loginDiv.hide(100);
        sideArea.animate({"right": -240}, 100);
    }
});

