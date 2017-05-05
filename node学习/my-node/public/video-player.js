var video = document.querySelector(".video");  //播放器容器
var isPlay = document.querySelector(".switch");  //暂停/播放按钮
var iconPlay = document.querySelector(".c-play"); //视频中间的大播放ICON
var cTotalTime = document.querySelector(".c-total"); //视频中间显示的视频可播放时长
var expand = document.querySelector(".expand");  //全屏
var progress = document.querySelector(".progress");  //进度条
var loaded = document.querySelector(".progress > .loaded");  //已加载进度
var currentPlayTime = document.querySelector(".timer > .current");  //当前已播放时间
var totalTime = document.querySelector(".timer > .total");  //视频总共可播放时长
var controls = document.querySelector(".controls");

//当视频缓冲完成到可播放状态的时候
video.oncanplay = function(){
    totalTime.innerHTML = getFormatTime(this.duration); //显示视频可播放时长
    cTotalTime.innerHTML = getFormatTime(this.duration);//显示视频可播放时长
}

//视频播放完成后
video.onended = function(){
    showControls();
    isPlay.setAttribute("class","switch switch-play");
    iconPlay.style.display = "block";
    cTotalTime.style.display = "block";
}

//视频中间的播放控制按钮
iconPlay.onclick = function(){
    if(video.paused){
        video.play();
        isPlay.setAttribute("class","switch switch-play switch-pause");
    }else {
        video.pause();
    }
    this.style.display = "none";
    cTotalTime.style.display = "none";

    setTimeout("hideControls()",2000);
}



//控制条的播放控制
isPlay.onclick = function(){
    if(video.paused){
        video.play();
        this.setAttribute("class","switch switch-play switch-pause");
        iconPlay.style.display = "none";
        cTotalTime.style.display = "none";
        setTimeout("hideControls()",2000);
    }else {
        video.pause();
        this.setAttribute("class","switch switch-play");
        setTimeout("showControls()",2000);
    }


}

//播放进度
video.ontimeupdate = function(){
    var currentTime = this.currentTime;  //当前播放时长
    var duration = this.duration;  //总的可播放时长

    //当前播放的百分比显示
    var percent = currentTime / duration * 100 + "%";
    loaded.style.width = percent;

    //当前已播放时长
    currentPlayTime.innerHTML = getFormatTime(currentTime);


}

//快进、快退
progress.onclick = function(e){
    var event = e || window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
}

//全屏,还有个问题，现在只支持webkit的，其他没有做兼容
expand.onclick = function(){
    video.webkitRequestFullScreen();
}

//点击大屏幕，视频开始播放
video.onclick = function(){
    if(this.paused){
        this.play();
    }
    showControls();

    setTimeout("hideControls()",5000);  //5秒后隐藏控制条
}


/**
 * 显示控制条
 */
function showControls(){
    controls.style.display = "block";
}
/**
 * 隐藏控制条
 */
function hideControls(){
    controls.style.display = "none";
}

/**
 * 时间格式化
 * @param time
 * @returns {string}
 */
function getFormatTime(time) {
    var time = time || 0;
    var h = parseInt(time / 3600),
        m = parseInt(time % 3600 / 60),
        s = parseInt(time % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    //return h + ":" + m + ":" + s;
    return m + ":" + s;
}