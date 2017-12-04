/**
 * 模板报备
 */
$(function () {
    //移除当前自定义字段
    $(document).on("click", ".tpl-opt .btn-remove", function () {
        $(this).parents(".custom-field").remove();
    })


    //添加自定义字段
    var customerFieldHtml = '<li class="custom-field">' +
        '<div class="type">自定义字段</div>' +
        '<div class="field">' +
        '<input class="form-control" type="text" value=""/>' +
        '</div>' +
        '<div class="pre-info">' +
        '<input class="form-control" type="text" value=""/>' +
        '</div>' +
        '<div class="explain">' +
        '<input class="form-control" type="text" value=""/>' +
        '</div>' +
        '<div class="tpl-opt">' +
        '<div class="move">' +
        '<span class="icon icon-caidan"></span>' +
        '</div>' +
        '<button class="btn-remove">移除</button>' +
        '</div>' +
        '</li>';
    var customerFieldHtml2 = '<li class="custom-field">\n' +
        '                                                        <div class="tpl-item">自定义字段</div>\n' +
        '                                                        <div class="tpl-item">\n' +
        '                                                            <div class="ipl-itme-inp">\n' +
        '                                                                <div class="j-ipt-area">\n' +
        '                                                                    <div class="j-ipt-wrap">\n' +
        '                                                                        <input type="text" class="j-ipt" value="">\n' +
        '                                                                        <span class="ico"></span>\n' +
        '                                                                    </div>\n' +
        '                                                                </div>\n' +
        '                                                            </div>\n' +
        '                                                        </div>\n' +
        '                                                        <div class="tpl-item">\n' +
        '                                                            <div class="ipl-itme-inp">\n' +
        '                                                                <div class="j-ipt-area">\n' +
        '                                                                    <div class="j-ipt-wrap">\n' +
        '                                                                        <input type="text" class="j-ipt" value="">\n' +
        '                                                                        <span class="ico"></span>\n' +
        '                                                                    </div>\n' +
        '                                                                </div>\n' +
        '                                                            </div>\n' +
        '                                                        </div>\n' +
        '                                                        <div class="tpl-item">\n' +
        '                                                            <div class="tpl-opt">\n' +
        '                                                                <div class="move">\n' +
        '                                                                    <span class="icon icon-caidan"></span>\n' +
        '                                                                </div>\n' +
        '                                                                <button class="btn-remove">移除</button>\n' +
        '                                                            </div>\n' +
        '                                                        </div>\n' +
        '                                                    </li>';

    $(document).on("click", ".btn-add-field", function () {
        $(this).parents(".btn-area").prev(".tpl-con-edit").append(customerFieldHtml);
    })
    $(document).on("click", ".lp-add-zd", function () {
        var that = $(this);
        that.parents(".lpsw-mb-cont").find('.tpl-con-edit').append(customerFieldHtml2);

    })

    //报备模板拖拽效果
    var byId = function (id) {
        return document.getElementById(id);
    }
    if ($("#tpl-edit").length > 0) {
        Sortable.create(byId('tpl-edit'), {
            handle: '.move',
            animation: 150
        });
    }


    //复制功能
    if ($(".btn-copy").length > 0) {
        var clipboard = new Clipboard('.btn-copy');
        clipboard.on('success', function (e) {
            //复制操作成功后的一些操作
        });

        clipboard.on('error', function (e) {
            //复制操作失败后的一些操作
        });
    }
})

