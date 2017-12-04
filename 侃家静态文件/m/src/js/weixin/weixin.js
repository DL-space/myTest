/**
 * Created by DL on 2017/11/16.
 */
$(function () {
    var inpPhone = $(".form-item-phone"),
        iptArea = inpPhone.find(".ipt-area"),
        getCode = inpPhone.find(".get-code"),
        ipt = iptArea.find(".ipt"),
        ico = iptArea.find(".ico");
    ipt.on("input",function () {
        var iptLength = $(this).val().length;
        iptLength>0 ? ico.css("display","inline-block"):ico.hide();
        if(iptLength==11){
            getCode.removeAttr("disabled");
        }else{
            getCode.prop("disabled","true")
        }
    });
    ico.click(function () {
        ipt.val("");
        ico.hide();
        getCode.prop("disabled","true")
    });
    $(".form-item-code .ipt").on("input",function () {
        var iptLength = $(this).val().length;
        if(iptLength==4){
           $("btn-sure").removeAttr("disabled");
        }else{
            $("btn-sure").prop("disabled","true")
        }
    })
});