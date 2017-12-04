/**
 * 弹层
 * @param type number 弹层类型 1:页面类型
 * @param content string 弹层内容
 * @param area string 弹层尺寸
 * @param fun_success function 点击确认按钮事件
 * @param fun_cancel function 点击取消按钮事件
 */
function showDialog(type, content, callback) {
    layer.open({
        type: type,
        title: false,
        closeBtn: false,
        shade: 0.6,
        area: ['auto', 'auto'],
        shadeClose: true,
        content: content,
        success: function () {
            $(document).on("click", ".css-btn-cancel,.close-css", function () {
                closeDialog();
            });
            $(document).on("click", ".css-btn-commit", function () {
                closeDialog();
                if (typeof callback != "undefined") {
                    callback();
                }
            });
            if($(".css .app-info").text()==="订阅成功!"){
                setTimeout(function(){
                    layer.closeAll();
                }, 1500);
            }
        }
    });
}

//关闭弹层
function closeDialog() {
    layer.closeAll();
}
