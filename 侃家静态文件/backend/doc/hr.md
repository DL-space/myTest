### 人力资源系统

页面效果测试地址(共12个页面)：

部门员工列表 http://123.57.229.36:81/backend/dist/hr/bmyglb.html

岗位词典 http://123.57.229.36:81/backend/dist/hr/index-gw.html

组织架构列表页 http://123.57.229.36:81/backend/dist/hr/index.html

组织架构图 http://123.57.229.36:81/backend/dist/hr/org.html

员工列表 http://123.57.229.36:81/backend/dist/hr/yglb.html

员工离职 http://123.57.229.36:81/backend/dist/hr/yglz.html

员工调岗 http://123.57.229.36:81/backend/dist/hr/ygtg.html

员工转正 http://123.57.229.36:81/backend/dist/hr/ygzz.html

员工转正式 http://123.57.229.36:81/backend/dist/hr/ygzzs.html

添加员工 http://123.57.229.36:81/backend/dist/hr/zjyg.html

岗位信息页 http://123.57.229.36:81/backend/dist/hr/gw.html

员工基本信息页 http://123.57.229.36:81/backend/dist/hr/ygxxxg.html


### 涉及页面静态资源及Git目录存放地址

部门员工列表页 backend/dist/hr/bmyglb.html

岗位词典 backend/dist/hr/index-gw.html

组织架构列表页 backend/dist/hr/index.html

组织架构图 backend/dist/hr/org.html

员工列表页 backend/dist/hr/yglb.html

员工离职 backend/dist/hr/yglz.html

员工调岗 backend/dist/hr/ygtg.html

员工转正 backend/dist/hr/ygzz.html

员工转正式 backend/dist/hr/ygzzs.html

添加员工 backend/dist/hr/zjyg.html

岗位信息 backend/dist/hr/gw.html

员工基本信息页 backend/dist/hr/ygxxxg.html

backend/dist/css/hr.css

backend/dist/css/common.css

backend/dist/js/hr/hr-ui.js

backend/dist/js/hr/hr-v1.0.js

backend/dist/images/hr/logo.png

backend/dist/images/hr/bg-time-line.png

backend/dist/images/hr/face.jpg

backend/dist/fonts/iconfont.eot

backend/dist/fonts/iconfont.svg

backend/dist/fonts/iconfont.ttf

backend/dist/fonts/iconfont.woff

### 效果交互

* 组织架构列表页双击当前部门行跳转到当前部门员工列表页

    这里需要注意，双击当前部门的当前行，跳转到该部门的员工列表页，由于我们是页面之间的跳转，这里通过调用js方法来实现该效果

    ```javascript
    function DbClick_Url(url){
        ……
    }
    ```

    调用方法,demo:

    ```javascript
    $(".btn").dblclick(function(){
        DbClick_Url(url);
    });
    ```

* 其他的页面交互性效果，都在页面中有体现，比较容易能理清代码