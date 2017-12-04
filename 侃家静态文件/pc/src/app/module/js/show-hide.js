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