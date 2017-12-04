### app内置h5页面弹层方法

* 弹层方法所在文件

    m/dist/js/app/app-common.js

* 弹层调用方法

    方法 showDialog(type, content, area, callback)

    > 参数 type number 弹层类型 1:页面类型

        content string 弹层内容

        area string 弹层尺寸

        callback function 回调函数

    > 返回值 number 弹层的索引

    方法 closeDialog(index)

    > 参数 index number 关闭的弹层索引

    > 返回值 null

### 文件列表说明

* 在js目录下，会有一个test.js文件，该文件只是模拟了一些效果，不能放在实际的应用中，希望大家在看到该文件时，只需要了解一些效果的实现即可