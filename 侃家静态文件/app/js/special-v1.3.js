$(function(){
    /**
     * 关闭页面顶部app下载入口
     */
    $(".topbar .ico-close").click(function(){
        $(".topbar").hide();
        $(".container").animate({"padding-top":"0"});
    });
});