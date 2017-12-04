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
    var open = searchArea.find(".open");
    var close = searchArea.find(".close");
    if(tag == 1){
        close.hide();
        hideArea.hide();
    }else if(tag == 0){
        open.hide();
        hideArea.show();
    }
    open.on("click",function () {
        close.show();
        open.hide();
        hideArea.show();
    });
    close.on("click",function () {
        close.hide();
        open.show();
        hideArea.hide();
    });
}
$(function () {
    change(1);
});