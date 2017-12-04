/**
 * Created by DL on 2017/8/10.
 */
$(document).on("click",".parent-li .close-node-btn",function () {
    var that = $(this);
    var parentLi = that.parent(".parent-li");
    parentLi.next().toggle();
    if(that.find(".icon").text()=="+"){
        that.find(".icon").text("-");
    }else{
        that.find(".icon").text("+");
    }
});