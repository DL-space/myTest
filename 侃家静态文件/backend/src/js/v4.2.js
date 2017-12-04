$(function () {
    /*退单到账管理编辑提示弹层*/
    $(document).on("click", ".btn-edit", function () {
        popup($(".dialog-tddzgl").html(), 2, null, null, "", "500px", ['60px']);
    });

    /*新增楼盘优化提示弹层*/
    $(document).on("click", ".btn-xzlp", function () {
        popup($(".dialog-xzlp").html(), 2, null, null, "", "500px", ['60px']);
    });

    /*图片上传提示*/
    $(document).on("click", ".btn-pic-upload", function () {
        popup($(".pic-upload-tips").html(), 2, null, null, "", "400px", ['60px']);
    });

    /*咨询师目标值管理提示弹层*/
    $(document).on("click", ".btn-zxsmbz", function () {
        popup($(".zxs-mbz-tips").html(), 2, null, null, "", "400px", ['60px']);
    });

    $(document).on("click", ".btn-zxsmbz2", function () {
        popup($(".zxs-mbz-tips2").html(), 2, null, null, "", "400px", ['60px']);
    });

    $(document).on("click", ".btn-zxsmbz3", function () {
        popup($(".zxs-mbz-tips3").html(), 2, null, null, "", "400px", ['60px']);
    });

    $(document).on("click", ".btn-zxsmbz4", function () {
        popup($(".zxs-mbz-tips4").html(), 2, null, null, "", "400px", ['60px']);
    });
});

