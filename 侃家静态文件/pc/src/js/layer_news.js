/**
 * 新版弹层公用方法
 * 2015-12-10
 * @param layer_type 弹层类型
 * @param htmlContent 弹层页面结构
 * @param area 弹层尺寸
 * @param func
 * @param data func参数所需的数据，如果需要
 * @param commit_url  确认按钮的跳转url
 */
function layer_new(layer_type,htmlContent,area,func,data,commit_url){
    close_layer();//弹出新弹层之前先清理一下，避免弹出多个弹层
    var layer_html = '';
    //组合弹窗页面结构，其中layer_bd 为自定义结构（需要弹窗传参数就是这部分内容）
    if(layer_type == 1){//1代表页面弹层
        layer_html = htmlContent;
    }else if(layer_type == 2){//2代表iframe层
        layer_html = htmlContent;
    }

    var layer_content = layer.open({
        type:layer_type,//弹层类型,必填， 默认0,可传入值：0：信息框，1：页面层，2：iframe层，3：加载层，4：tips层
        title:false,//是否显示title
        closeBtn:0,//是否显示关闭按钮（layer自带的按钮）--目前初始化设置为1，自定义了关闭按钮并模拟点击关闭自带关闭按钮
        area:area,
        shadeClose:1,//点击阴影区域是否关闭弹层
        shade:[0.5, '#000'],
        content:layer_html,
       /* success:function(){
            layer_func(func,data,commit_url);//弹层上的事件
        }*/
        success: function (layero, index) {
            var $close = layero.find('.ly-close');
            $close.click(function () {
                layer.closeAll()
            })
        }
    });
    return layer_content;
}

function layer_func(func,data,commit_url){

    if(typeof commit_url != "undefined" && commit_url.length != 0){
        $(".btn-commit").on("click", function(){
            location.href = commit_url;
        });
    }
    if(typeof func != "undefined"){
        var res = func(data);
    }


    if(typeof func == "undefined"){
        $(".layer > .ly-close,.layer-btn-reset,.btn-commit").click(function(){
            //layer.close(index);
        });
    } else {
        $(".layer > .ly-close,.layer-btn-reset").click(function(){
            layer.closeAll();
        });
    }
}

/**
 * 新版公用弹层 关闭弹层方法
 * 新版所有弹层公用关闭方法，模拟点击弹层插件自身关闭按钮（可以不用定义自己的关闭方法）
 */
function close_layer(){
    layer.closeAll();
    // $('.layui-layer-close').trigger('click');
}