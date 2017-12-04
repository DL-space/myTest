$(function(){
    $(document).on("click",".look-house .input-area",function () {
        var _item = $(this);
        var _ipt = _item.children(".ipt");

        if(_ipt.next(".dropdown-list").is(":hidden")){
            var $dropdown_list_all = _ipt.parents(".input-area").parents(".tr").siblings('.tr').find('.dropdown-list')
            $dropdown_list_all.each(function () {
                if($(this).css('display') == 'block'){
                    $(this).css('display','none')
                }
            })
            _ipt.next(".dropdown-list").stop().slideDown();
            _ipt.parents(".input-area").parents(".tr").addClass("on");
            _ipt.parents(".input-area").parents(".tr").siblings().removeClass('on');
            _ipt.next(".dropdown-list").children("li").click(function(){
                _ipt.parents(".input-area").parents(".tr").removeClass("on");
                _ipt.text($(this).text());
                _ipt.css({
                    color: "#333"
                });
                $(this).parents(".dropdown-list").slideUp("fast");
            });

        }else if(_ipt.next(".dropdown-list").is(":visible")){
            $(".dropdown-list").slideUp("fast");
            _ipt.parents(".input-area").parents(".tr").removeClass("on");
        }
    });
    //点击空白区域关闭下拉选择框
    $(document).mouseup(function(e){
        var _con = $(".dropdown-list");   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
            $(".dropdown-list").slideUp();
        }
    });
});