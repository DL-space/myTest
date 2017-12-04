/**
 * Created by DL on 2016/12/16.
 */
function ydqw() {
    var pjzxs = $(".pjzxs");
    var simple = pjzxs.find(".simple");
    var detail = pjzxs.find(".detail");
    var showMore = pjzxs.find(".click-option-more");
    showMore.on("click",function () {
        if(detail.is(":visible")){
            detail.hide();
            simple.show();
            showMore.text("阅读全文");
        }else{
            detail.show();
            simple.hide();
            showMore.text("收起全文");
        }
    });
}
$(function(){
    //筛选条件
    $(".input-area").each(function(){
        var _item = $(this);
        var _ipt = _item.children(".ipt");
        _ipt.click(function(){
            if(_ipt.next(".dropdown-list").is(":hidden")){
                _ipt.next(".dropdown-list").stop().slideDown();
                _ipt.parents(".input-area").parents(".tr").addClass("on");
                _ipt.next(".dropdown-list").children("li").click(function(){
                    var defaultValue = _ipt.next(".dropdown-list").children("li:first").text();
                    _ipt.parents(".input-area").parents(".tr").removeClass("on");
                    _ipt.text($(this).text());
                    if(_ipt.text() == defaultValue){
                        _ipt.css({
                            color: "#999"
                        });
                    }else{
                        _ipt.css({
                            color: "#333"
                        });
                    }
                    $(this).parents(".dropdown-list").slideUp("fast");
                });
            }else if(_ipt.next(".dropdown-list").is(":visible")){
                $(".dropdown-list").slideUp("fast");
                _ipt.parents(".input-area").parents(".tr").removeClass("on");
            }
        });
    });
    //点击空白区域关闭下拉选择框
    $(document).mouseup(function(e){
        var _con = $(".dropdown-list");   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
            $(".dropdown-list").slideUp();
        }
    });
});
$(function () {
    ydqw();
});

