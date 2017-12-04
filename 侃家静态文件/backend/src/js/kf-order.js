//增加范围的DOM结构
var addRangeDom = '<div class="txt"> - </div>' +
    '<input type="text" class="form-control">';

$(function () {
    //需求信息，添加范围交互效果
    $(document).on("click", ".link-add", function () {
        var _item = $(this);
        if ($(this).text() == '添加范围') {
            $(this).text('取消添加');
            $(addRangeDom).insertAfter(_item.siblings(".ipt-range"));
        } else {
            $(this).text('添加范围');
            $(this).parent().children().slice(1, 3).hide();
        }
    });

    //联系统计为客户友介时，友介老用户输入框展示
    $(".kf-li-conn-way .dx").change(function () {
        if ($(this).hasClass("dx-rf")) {
            $(".ipt-customer-old").show();
        } else {
            $(".ipt-customer-old").hide();
        }
    });


    //需求信息，显示和隐藏区域信息
    $(".opt-show-more").click(function () {
        var selVsbMore = $(".sel-vsb-more");
        if (selVsbMore.is(":hidden")) {
            selVsbMore.show();
            $(this).text("隐藏");
        } else {
            selVsbMore.hide();
            $(this).text("打开隐藏区域");
        }
    });

    //添加黑名单弹层
    $(".btn-hmd").click(function () {
        var dialogHmd = $(".dialog-hmd").html();
        //alert(dialogHmd);
        popup(dialogHmd, 2);
    });

    //目标值
    $(".btn-mbz").click(function () {
        var dialogMbzHtml = $(".dialog-mbz").html();
        popup(dialogMbzHtml, 2);
    });

    //添加神秘客户
    $(".btn-smkh").click(function () {
        var dialogSmkhHtml = $(".dialog-smkh").html();
        popup(dialogSmkhHtml, 2);
    });

    //神秘客户详情
    $(".btn-smxq").click(function () {
        var dialogSmkhXqHtml = $(".dialog-smxq").html();
        popup(dialogSmkhXqHtml, 2);
    });

    //神秘客户修改
    $(".btn-smxg").click(function () {
        var dialogSmkhUpdateHtml = $(".dialog-smxg").html();
        popup(dialogSmkhUpdateHtml, 2);
    });

    //指定分配咨询师
    $(".btn-zdzxs").click(function () {
        var dialogZdzxsHtml = $(".dialog-zdzxs").html();
        popup(dialogZdzxsHtml, 2);
    });

    //v5.0 是否进行中的不分配原因
    var notAllocatedResource = $(".not-allocated");
    var signChance = $(".sign-chance");
    $(document).on("click", ".not-allocated > .txt", function () {
        selectNoAllocated($(this));
    })

    $("input[name='distribution']").change(function(){
        var distributionValue = $(this).val();
        if(distributionValue == 2){
            notAllocatedResource.show();
            signChance.show();
        }else{
            signChance.hide();
            notAllocatedResource.hide();
        }
    });

    $(".dropdown-menu2 .dropdown-menu2 .lb-txt").click(function(){
        $(".not-allocated > .txt > .text").text($(this).text());
        notAllocatedResource.children(".dropdown-menu2").slideUp();
    });
});

/**
 * 选择不分配原因
 * @param obj {Object}
 */
function selectNoAllocated(obj){
    var dropDownMenu2 = obj.next(".dropdown-menu2");
    var icoTriangle = obj.children(".ico-triangle");
    if (dropDownMenu2.is(":hidden")) {
        dropDownMenu2.slideDown();
        icoTriangle.addClass("rotate");
        obj.parents(".not-allocated").hover(function(){

        },function(){
            icoTriangle.removeClass("rotate");
            dropDownMenu2.slideUp();
        });
    }else{
        dropDownMenu2.slideUp();
        icoTriangle.removeClass("rotate");
    }
}

