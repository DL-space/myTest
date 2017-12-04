$(function () {
    $(document).on("click",".show-hide .show-more",function () {
        var that = $(this);
        pd_unfold(that);
    });
    function pd_unfold(i) {
        var that = i;
        var showHide = that.parents(".show-hide");
        var changeArea = showHide.find(".change-area");
        changeArea.toggleClass("change-show");
        that.toggleClass("show-more-open");
    }
});