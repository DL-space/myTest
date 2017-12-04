$(function () {
    if ($(".ask-list .filter").length > 0) {
        var beforeScrollTop = $(window).scrollTop();
        var searchHeight = $(".filter").find(".search-wrap").outerHeight();
        console.log(searchHeight)
        var swiperNav = new Swiper('.swiper-nav', {
            direction: "horizontal",
            slidesPerView: "auto",
            freeMode: true
        });
        var toTop = 0;
        if ($(".topbar").length > 0) {
            toTop = $(".topbar").height();
            $(".topbar .ico-close").unbind("click").click(function () {
                $(".topbar").hide(function () {
                    $(".filter").attr("style", "").unwrap(".pin-wrapper").pin(
                        {
                            padding: {
                                top: 0-searchHeight
                            }
                        }
                    );
                    $(window).scroll()
                });
                $(".container").animate({"padding-top":"0"});
            })
        }
        $(".filter").pin({
            padding: {
                top: toTop-searchHeight
            }
        });
        $(window).on("scroll",function () {
            var afterScrollTop = $(window).scrollTop(),
                dis = afterScrollTop - beforeScrollTop;
            if(dis>0){
                $(".filter").attr("style", "").unwrap(".pin-wrapper").pin(
                    {
                        padding: {
                            top: 0-searchHeight
                        }
                    }
                );
            }else{
                $(".filter").attr("style", "").unwrap(".pin-wrapper").pin(
                    {
                        padding: {
                            top: toTop-searchHeight
                        }
                    }
                );
            }
            beforeScrollTop = afterScrollTop;
        })
    }

})
/**
 * 检索结果提示弹框
 * result : {String} 检索条件
 * time:多产时间内消失，可选，默认2秒；
 * num：结果条数；
 */
function showPropAskMsg(result, num, time) {
    var timer = time;
    if (time == undefined) {
        timer = 2000;
    }
    var propAskMsg = $(".prop-msg-ask");
    propAskMsg.find(".num").text(num);
    propAskMsg.find(".msg-filter").text(result);
    propAskMsg.fadeIn(0, function () {
        propAskMsg.fadeOut(timer);
    })
}