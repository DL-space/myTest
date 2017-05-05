/**
 * Created by DL on 2017/3/13.
 */
/**
 * 视频播放：videoPlay(url,play,w,h)
 * @param: url:视频地址
 *        play：是否自动播放（0：不播放；1：播放）
 *          w ：播放器宽度
 *          h ：播放器高度
 */
function videoPlay(url,play,w,h) {
    var flashvars={
        f:url,
        p:play
    };
    var params={
        bgcolor:'#FFF',
        allowFullScreen:true,
        allowScriptAccess:'always',
        wmode:'transparent'
    };
    CKobject.embedSWF('ckplayer/ckplayer.swf','video','ckplayer_video',w,h,flashvars,params);
}
$(function () {
    $(".area").on("click",".vid",function () {
        var url = $(this).attr("data-url");
        videoPlay(url,1,600,400)
    });
    $(".close").on("click",function () {
        $("#video").empty();
    })
});