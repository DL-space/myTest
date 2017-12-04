/**
 * Created by DL on 2017/1/12.
 */
//底部app下载切换效果
function app_show_hide() {
    var app_bottom = $(".app-bottom");
    var app_fixed = $(".app-fixed");
    var app_fixed_width = app_fixed.width();
    app_bottom.find(".close").on("click",function () {
        app_bottom.animate({"left":"-100%"},1000,function () {
            app_fixed.animate({"left":"0"},500)
        });
    });
    app_fixed.on("click",function () {
        app_fixed.animate({"left":-app_fixed_width},500,function () {
            app_bottom.animate({"left":"0"},1000)
        });
    });
}
app_show_hide();
