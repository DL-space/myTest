var g_json = '';
var g_path = '';
var g_first_key = '';
var g_result_str = "";

//判断是否json对象
function is_json(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

//去第一个元素的key
function get_first_key_from_json(in_json)
{
    for(var key in in_json){
        return key;
    }

    return "";
}

//取第一个元素的所有子key
/*例如：输入{
 '0':{
 'a':{
 'a1':'x',
 'a2':'y'
 },
 'b':'z'
 }
 }
 输出：['a','b']
 */
//return 数组
function get_first_item_child_keys_from_json(in_json)
{
    if(!is_json(in_json)){
        return "";
    }
    first_key = get_first_key_from_json(in_json);
    first_value = in_json[first_key];
    var ret_ay = [];
    for(var key in first_value){
        ret_ay.push(key);
    }
    return ret_ay;
}

//return 数组
//取当前元素的所有子key
/*例如：输入{
 '0':{
 'a':{
 'a1':'x',
 'a2':'y'
 },
 'b':'z'
 }
 }
 输出：['0']
 */
//return 数组
function get_child_keys_from_json(in_json)
{
    if(!is_json(in_json)){
        return "";
    }
    var ret_ay = [];
    for(var key in in_json){
        ret_ay.push(key);
    }
    return ret_ay;
}

function get_child_value_from_json(in_json)
{
    if(!is_json(in_json)){
        return in_json;
    }
    var ret_ay = {};
    for(var key in in_json){
        return in_json[key];
    }
    return ret_ay;
}

/*function set_g_path_map(key, val)
 {
 if(g_path_count%2 == 0){
 if(g_path_map.hasOwnProperty(key)){
 g_path_map[key] = val;
 }
 }
 else{

 }
 }*/

//初始化
function init()
{
    if(g_json == ''){
        // g_json = {"购房区域":{"北京其他区域":{"是否具有北京户口（工作居住证等同于北京户口）":{"是":{"您的婚姻状况":{"已婚":{"已有北京市住宅数量":{"无房":"可以买两套住宅, 首套首付比例35%起, 二套首付比例50%起","一套房":"可以买一套住宅, 二套首付比例50%起","两套及以上":"不能买住宅"}},"未婚":{"已有北京市住宅数量":{"无房":"<div class='zz-result zz-res1'><div class='pic'><img src='./images/img-zz-res1.png' alt='你可以购买一套北京住宅'></div><ul class='zz-tips'><li>你可以购买<span class='fw'>一套</span>住宅</li><li>首套首付比例<span class='fw'>35%</span>起</li></ul></div>","一套房":"不能买住宅"}}}},"否":{"是否满足连续5年纳税或连续缴纳60个月社保":{"满足":{"已有北京市住宅数量":{"无房":"可以买一套住宅, 首套首付比例35%起","一套房":"不能买住宅"}},"不满足":"不能买住宅"}},"特殊人群（包括军人、港澳台同胞、外籍人员）":"详情向咨询师咨询"}},"通州区域":{"是否具有北京户口":{"是":{"您的婚姻状况":{"已婚":{"已有北京住宅数量（包含通州商务型公寓）":{"无房":{"是否在通州落户满3年":{"满足":"可以买两套住宅, 首套首付比例35%起, 二套首付比例50%起","不满足":{"是否满足连续3年在通州纳税或缴纳社保":{"满足":"可以买两套住宅, 首套首付比例35%起, 二套首付比例50%起","不满足":"可以买一套住宅, 首套首付比例35%起"}}}},"一套":{"是否在通州落户满3年":{"满足":"可以买一套住宅, 二套首付比例50%起","不满足":{"是否满足连续3年在通州纳税或缴纳社保":{"满足":"可以买一套住宅, 二套首付比例50%起","不满足":"不能买住宅"}}}},"两套及以上":"不能买住宅"}},"未婚":{"已有北京住宅数量（包含通州商务型公寓）":{"无房":"可以买一套住宅，首套首付比例35%起","一套及以上":"不能买住宅"}}}},"否":{"是否满足连续5年纳税或连续缴纳60个月社保":{"满足":{"已有北京住宅数量（包含通州商务型公寓）":{"无房":{"是否满足连续3年在通州纳税或缴纳社保":{"满足":"可以买一套住宅，首套首付比例35%起","不满足":"不能买住宅"}},"一套及以上":"不能买住宅"}},"不满足":"不能买住宅"}}}}}};
        g_json = goufangzige_json;
    }

    if(g_path == ''){
        var first_key = get_first_key_from_json(g_json);
        var path_str = '{"'+first_key+'":"EOF"}';
        g_path = JSON.parse(path_str);
        g_first_key = first_key;
        // console.log("key:"+first_key);
        g_result_str = "<span>" + first_key + ":</span>";
        $(".zz-list").append(g_result_str);
    }
}

//根据query_json(g_path)在src_json(g_json)里查询所有子key
/*例如：
 query_json:{
 '0':{
 'a':'EOF'
 }
 }
 src_json:{
 '0':{
 'a':{
 'a1':'x',
 'a2':'y'
 },
 'b':'z'
 }
 }

 return:['a1','a2']//数组
 */
function query_child_keys_by_json(src_json, query_json)
{
    for(var key in query_json){
        if(!src_json.hasOwnProperty(key)){
            return "";
        }
        else{
            new_src_json = src_json[key];
            new_query_json = query_json[key];
            if(is_json(new_query_json)){
                return query_child_keys_by_json(new_src_json, new_query_json);
            }
            else{
                return get_child_keys_from_json(new_src_json);
            }
        }
    }
}

function query_child_value_by_json(src_json, query_json)
{
    for(var key in query_json){
        if(!src_json.hasOwnProperty(key)){
            return "";
        }
        else{
            new_src_json = src_json[key];
            new_query_json = query_json[key];
            if(is_json(new_query_json)){
                return query_child_value_by_json(new_src_json, new_query_json);
            }
            else{

                //console.log(new_src_json);
                return get_child_value_from_json(new_src_json);
            }
        }
    }
}
function query_key_by_json(src_json, query_json)
{
    for(var key in query_json){
        if(!src_json.hasOwnProperty(key)){
            return "";
        }
        else{
            new_src_json = src_json[key];
            new_query_json = query_json[key];
            if(is_json(new_query_json)){
                return query_key_by_json(new_src_json, new_query_json);
            }
            else{

                //console.log(new_src_json);
                return get_first_key_from_json(src_json);
            }
        }
    }
}

//为g_path在最后增加一个节点
//full_path 是json，为永远不变的全路径
//in_path 是json，item是字符串
//return 修改后的in_path
function push_path_node(full_path, in_path, item)
{
    for(var key in in_path){
        if(is_json(in_path[key])){
            return push_path_node(full_path, in_path[key], item);
        }
        else{
            var old_node = '"'+"EOF"+'"';
            //console.log("old_node"+old_node);
            var new_node = '{"'+item+'":"EOF"}';
            //console.log("new_node"+new_node);
            path_str = JSON.stringify(full_path);
            //console.log("old_path"+path_str);
            path_str = path_str.replace(old_node, new_node);
            //console.log("new_path"+path_str);
            in_path = JSON.parse(path_str);
            return in_path;
        }
    }
}

//去掉path最后一个节点
//为g_path在最后增加一个节点
//full_path 是json，为永远不变的全路径
//in_path 是json
//return 修改后的in_path
function pop_path_node(full_path, in_path)
{
    for(var key in in_path){
        if(is_json(in_path[key])){
            return pop_path_node(full_path, in_path[key]);
        }
        else{
            var last_node = '{"'+key+'":"EOF"}';
            //console.log("last_node"+last_node);
            var end_node = '"'+"EOF"+'"';
            path_str = JSON.stringify(full_path);
            //console.log("old_path"+path_str);
            path_str = path_str.replace(last_node, end_node);
            //console.log("new_path"+path_str);
            in_path = JSON.parse(path_str);
            return in_path;
        }
    }
}

function get_path_last_node(in_path)
{
    for(var key in in_path){
        if(is_json(in_path[key])){
            return get_path_last_node(in_path[key]);
        }
        else{
            return [key, in_path[key]];
        }
    }

    return ["", ""];
}

function check_last_node(src_json, query_json)
{
    /*for(var key in query_json){
     if(!src_json.hasOwnProperty(key)){
     return "";
     }
     else{
     new_src_json = src_json[key];
     new_query_json = query_json[key];
     if(is_json(new_query_json)){
     return query_child_keys_by_json(new_src_json, new_query_json);
     }
     else{
     return get_child_keys_from_json(new_src_json);
     }
     }
     }*/
    key = query_child_keys_by_json(src_json, query_json);
    if(key == ""){
        return true;
    }
    return false;
}

var g_count = 0;
function set_result_str(in_path)
{
    g_count++;
    for(var key in in_path){
        /*if(g_count%2 == 0){
         console.log("value:"+key);
         }
         else{
         console.log("-------");
         console.log("key:"+key);
         }*/
        if(is_json(in_path[key])){
            set_result_str(in_path[key]);
        }else{
            console.log("key:"+key);
            //g_result_str = g_result_str + key + ":";
            g_result_str = g_result_str + "<span>" + key + ":</span>";
        }
    }
}

init();



//初始顶级极点
var fistKey = get_child_keys_from_json(g_json);
$(".zz-question h3").text(fistKey);
var firstArr = get_first_item_child_keys_from_json(g_json);
for(var arr in firstArr){
    $(".zz-q-list").append($('<li><div class="txt">'+firstArr[arr]+'</div><span class="icon-check"></span></li>'));
}


//单击切换问题
$(document).on("click",".zz-q-list li",function(){

    // console.log("value:"+$(this).children(".txt").text());
    g_result_str = g_result_str + $(this).children(".txt").text();
    // console.log("g_result_str:"+g_result_str);
    //  console.log("-------");
    g_result_str = g_result_str + "<br>";
    $(".zz-list").html("");
    $(".zz-list").append(g_result_str);
    $(".zz-q-list li").remove();
    var lastArr = query_child_keys_by_json(g_json,g_path);

    // console.log(JSON.stringify(g_path));
    g_path = push_path_node(g_path,g_path,$(this).children(".txt").text());
    //$(".zz-question h3").text($(this).children(".txt").text());
    // console.log(JSON.stringify(g_path));

    $(".q-tips").hide();

    var firstArr = query_child_keys_by_json(g_json,g_path);
    // console.log(firstArr);




    if(firstArr == ""){
        var lastValue = query_child_value_by_json(g_json, g_path);
        //console.log("lastValue:"+lastValue);

        var lastNode = get_path_last_node(g_path);
        var lastKey = lastNode[0];
        //var lastValue = lastArr[0];
        $(".zz-cs-wrap,.zz-tel,.zz-opt").show();
        $(".zz-question,.link-return").hide();
        $(".zz-cs-wrap").append(lastValue);

        // if(lastKey == "无房"){
        // 	console.log(lastValue.indexOf("可以买两套"));
        // 	console.log(lastValue);
        // 	$(".zz-cs-wrap").append(lastValue);

        // }if(lastKey == "不满足"){
        // 	$(".zz-cs-wrap").append(testResult0);
        // }




    }else{
        var firstKey = firstArr[0];
        $(".zz-question h3").text(firstKey);


        $(".link-return").show();
        g_path = push_path_node(g_path,g_path,firstKey);
        // console.log(JSON.stringify(g_json));

        secondArr = query_child_keys_by_json(g_json,g_path);
        // console.log(secondArr);
        for(var arr in secondArr){
            $(".zz-q-list").append($('<li><div class="txt">'+secondArr[arr]+'</div><span class="icon-check"></span></li>'));
        }
        set_result_str(g_path);
        //$(".zz-list").html("");
        //$(".zz-list").append(g_result_str);
    }



    var return_data = {
        'user_cookie' : user_cookie,
        'user_from' : user_from,
        'content' : g_path
    };
    $.ajax({
        url: 'http://testm.comjia.cc/create',
        type: 'post',
        data : return_data,
        dataType: 'json',
        error: erryFunction,  //错误执行方法
        success: succFunction //成功执行方法
    })
    function erryFunction() {
        console.log('error');
    }
    function succFunction(data) {
        console.log(data);
    }

});


//返回上一步
$(document).on("click",".link-return",function(){
    g_path =pop_path_node(g_path,g_path);
    //console.log(JSON.stringify(g_path));
    g_path =pop_path_node(g_path,g_path);
    $(".zz-q-list li").remove();
    var lastArr = query_child_keys_by_json(g_json,g_path);



    // console.log(JSON.stringify(g_path));
    //g_path = push_path_node(g_path,g_path,$(this).children(".txt").text());
    //$(".zz-question h3").text($(this).children(".txt").text());
    // console.log(JSON.stringify(g_path));



    var secondArr = query_child_keys_by_json(g_json,g_path);
    var firstKey = query_key_by_json(g_json, g_path);
    $(".zz-question h3").text(firstKey);


    g_result_str = g_result_str + firstKey;
    // console.log("g_result_str:"+g_result_str);
    //  console.log("-------");
    g_result_str = g_result_str + "<br>";
    $(".zz-list").html("");
    $(".zz-list").append(g_result_str);
    //g_path = push_path_node(g_path,g_path,firstKey);
    // console.log(JSON.stringify(g_json));
    //g_path =pop_path_node(g_path,g_path);
    //console.log(JSON.stringify(g_path));
    secondArr = query_child_keys_by_json(g_json,g_path);
    // console.log(secondArr);
    for(var arr in secondArr){
        $(".zz-q-list").append($('<li><div class="txt">'+secondArr[arr]+'</div><span class="icon-check"></span></li>'));
        if(firstKey == g_first_key){
            $(".link-return").hide();
            $(".q-tips").show();
        }
        else{
            $(".link-return").show();
            $(".q-tips").hide();
        }

    }
});



//console.log(is_json(g_json));
//console.log(get_first_key_from_json(g_json));
//console.log(g_json[0]);//undefined
//console.log(g_json);
//console.log(get_first_item_child_keys_from_json(g_json));
//var query_json = {'购房区域':{'北京其他区域':{'是否具有北京户口（工作居住证等同于北京户口）':'EOF'}}};
//console.log(query_child_keys_by_json(g_json,query_json));
//console.log(g_path);
//g_path = push_path_node(g_path, g_path, 'a');
//g_path = push_path_node(g_path, g_path, 'a1');
//console.log(g_path);
//g_path = pop_path_node(g_path, g_path);
//console.log(g_path);
//console.log(JSON.stringify(g_json));
