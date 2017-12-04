### M站问答1.0

[需求地址](http://cwiki.comjia.com/pages/viewpage.action?pageId=103579740)

    UI:UI/PSD/M站4.1/m站问答相关页面2017.9.7

    静态页面效果测试地址:

    http://123.57.229.36:81/m/dist/detail.html
    http://123.57.229.36:81/m/dist/ask/ask-dialog.html
    http://123.57.229.36:81/m/dist/ask/ask-detail.html
    http://123.57.229.36:81/m/dist/ask/ask-list.html
    http://123.57.229.36:81/m/dist/ask/ask-project-list.html
    http://123.57.229.36:81/m/dist/ask/ask-project-list-noresult.html

    涉及修改文件Git目录地址

    m/dist/detail.html
    m/dist/ask/ask-dialog.html
    m/dist/ask/ask-detail.html
    m/dist/ask/ask-list.html
    m/dist/ask/ask-project-list.html
    m/dist/ask/ask-project-list-noresult.html
    m/dist/css/ask.css
    m/dist/js/ask.js

### 默认图片

共有3张默认图片，尺寸分别为639*320、150*112、90*90，对应的名称分别为：

img-ask-default.png

img-ask-default-small.png

img-ask-default-circle.png

### 效果说明

1. 检索结果提示弹窗

    ```javascript
    /**
         * 检索结果提示弹框
         * result : {String} 检索条件
         * time: 提示窗消失的等待时间,可选，默认2秒；
         * num：结果条数；
         */
        function showPropAskMsg(result, num,time) {
            //……
        }

        /*调用方式：*/
        showPropAskMsg(result,num,time);
    ```

    demo

    ```javascript
    $(document).on("click",".swiper-slide-active",function(){
        showPropAskMsg("北京别墅",2);
    });
    ```
2. 弹层操作

    ```javascript
   /**
        * 弹层
        * @param type number 弹层类型 1:页面类型
        * @param content string 弹层内容
        * @param callback function 弹层回调函数
        */
       function showDialog(type, content, callback) {
           //....
       }
       //关闭弹层
       function closeDialog() {
           layer.closeAll();
       }
    ```
    >注：showDialog(type, content, callback)方法的callback参数，为自定义函数，涉及到弹层之后的所有相关操作可以在这个回调函数里完成。需要关闭弹层时调用closeDialog()关闭弹层。
    
    [demo](../dist/ask/ask-dialog.html)
    
    ```javascript
    $(function() {
        $(".btn-wyww").click(function() {
            showDialog(1, $(".dialog-go-ask").html(),aa);
        });
    });
    function aa() {
        //相关操作，操作完成之后调用closeDialog()关闭弹层
    }
    ```
    