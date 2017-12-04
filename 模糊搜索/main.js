/**
 * Created by Steven on 2016-10-25.
 */
var oTxt = document.getElementById('txt');
var oBtn = document.getElementById('btn');
var oList = document.getElementById('list');

var fruits = ["桃子","苹果","梨子","香蕉","香瓜","葡萄","柠檬","橘子","草莓"];
//点击事件
oBtn.addEventListener('click', function(){
    var keyWord = oTxt.value;
    // var fruitList = searchByIndexOf(keyWord,fruits);
    console.log(fruitList);
    var fruitList = searchByRegExp(keyWord, fruits);
    renderFruits(fruitList);
}, false);
//回车查询
oTxt.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        var keyWord = oTxt.value;
        // var fruitList = searchByIndexOf(keyWord,fruits);
        var fruitList = searchByRegExp(keyWord, fruits);
        renderFruits(fruitList);
    }
}, false);

function renderFruits(list){
    if(!(list instanceof Array)){
        return ;
    }
    oList.innerHTML = '';
    var len = list.length;
    var item = null;
    for(var i=0;i<len;i++){
        item = document.createElement('li');
        item.innerHTML = list[i];
        oList.appendChild(item);
    }
}
//模糊匹配的时候如果不区分大小写，可以使用toLowerCase()或者toUpperCase()转换之后去匹配。

//模糊查询1:利用字符串的indexOf方法
function searchByIndexOf(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    var len = list.length;
    var arr = [];
    for(var i=0;i<len;i++){
        //如果字符串中不包含目标字符会返回-1
        if(list[i].indexOf(keyWord)>=0){
            arr.push(list[i]);
        }
    }
    return arr;
}
//正则匹配
function searchByRegExp(keyWord, list){
    if(!(list instanceof Array)){
        return ;
    }
    var len = list.length;
    var arr = [];
    var reg = new RegExp(keyWord);
    for(var i=0;i<len;i++){
        //如果字符串中不包含目标字符会返回-1
        if(list[i].match(reg)){
            arr.push(list[i]);
        }
    }
    return arr;
}
renderFruits(fruits);

/*地图联动*/
$(document).on("click",".zb-map .lk",function () {
    var that = $(this),
        index = that.attr("data-index"),
        zbList = that.parents(".zb-map").siblings(".tab-zb").find(".tab-c").find(".nrpart:visible").find(".lk-list"),
        glItem = zbList.find("li");
    that.parents(".zb-map").find(".lk").removeClass("on");
    that.addClass("on");
    glItem.removeClass("on");
    glItem.eq(index).addClass("on");
    var h = glItem.eq(index).position().top,
        hUl = zbList.outerHeight(),
        hLi = glItem.eq(index).outerHeight(),
        scrollTop = zbList.scrollTop();
    if(h-hUl>0 || h<10){
        zbList.animate({
            scrollTop: h-hUl+hLi-34+scrollTop
        },300);
    }
});
$(document).on("click",".lk-list li",function () {
    var that = $(this),
        index = that.index(),
        lkItem = that.parents(".tab-zb").siblings(".zb-map").find(".lk[data-index='"+index+"']");
    that.siblings("li").removeClass("on");
    that.addClass("on");
    that.parents(".tab-zb").siblings(".zb-map").find(".lk").removeClass("on");
    lkItem.addClass("on");
});