/**
 * Created by DL on 2016/10/20.
 */
$(function () {
    var body = $("body");
    var items = $(".sidebar").find(".s-item");
    var animateItem = $(".animated");
    items.each(function () {
        var that = $(this);
        var des = that.find(".des");
            that.hover(function () {
                if(!des.is(":animated")){
                    des.show(0).animate({'right':38,'opacity':1},300);
                }
            },function(){
                des.animate({'right':48,'opacity':0},100).hide(100);
            });
        that.on("click",function () {
            des.animate({'right':48,'opacity':0},100).hide(100);
        })
    });
    /*登录*/
    var loginDiv = $(".login");
    var loginItem = $(".s-login").find(".bg-img,.des");
    var closeBtn = loginDiv.find(".close");
    loginItem.on("click",function (e) {
        loginDiv.toggle(300);
        e.stopPropagation();
    });
    closeBtn.on("click",function () {
        loginDiv.hide(300);
    });
    /*足迹*/
    var footDiv = $(".footprint");
    var myFoot = $(".s-footprint").find(".bg-img,.des");
    var closeFoot = footDiv.find(".close");
    myFoot.on("click",function () {
        /*sh(footDiv);*/
        footDiv.animate({width:'toggle'},100,'linear');

        if(lookDiv.is(":visible")){
            lookDiv.animate({width:'toggle'},100,'linear');
        }
    });
    closeFoot.on("click",function () {
        footDiv.hide();
    });
    /*预约看房*/
    var lookDiv = $(".look-house");
    var myLook = $(".s-look").find(".bg-img,.des");
    myLook.on("click",function () {
        lookDiv.animate({width:'toggle'},100,'linear');
        if(footDiv.is(":visible")){
            footDiv.animate({width:'toggle'},100,'linear');
        }
    });
    /*空白区域*/
    body.click(function(e) {
        if (e.target.tagName == 'BODY') {
            animateItem.hide()
        }
    });
});

