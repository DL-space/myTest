$(function(){
    //房贷计算器还款类型选择
    $('.payback-type .ico-choose').click(function(){payBackType($(this))});

});

//房贷计算器还款类型选择
function payBackType(obj){
    $('.ico-choose').removeClass('pay-chosen');
    obj.addClass('pay-chosen');
}
//半角英文输入法只允许输入数字
function keyPress() {
    var keyCode = event.keyCode;
    if((keyCode >= 48 && keyCode <= 57)){
        event.returnValue = true;
    }else{
        event.returnValue = false;
    }
}
//房贷计算器
$('.calculator_get_my_money').on('click', function(){
    //公积金和商贷的利率
    var bus_rate = 0.049;
    var gov_rate = 0.0325;
    var month_rate = 0;
    var offer_price = $('.calculator_price').val();//单价
    var pro_acreage =$('.calculator_acreage').val();//面积
    if(offer_price == ''){
        offer_price = 0;
    }
    if(pro_acreage == ''){
        pro_acreage = 0;
    }
    var tatol_price = parseInt(offer_price) * parseInt(pro_acreage) / 10000;//总价
    $('.calculator_price_too').html(tatol_price);
    var first_price_rate = $('.calculator_first_price').val();//首付成数
    var money_type = $('.calculator_money_type').val();//贷款类型
    var last_time = $('.calculator_last_time').val();//年(贷款时间)
    var back_type = $('.calculator_back_type').find('i.pay-chosen').attr('data-type');//贷款方式

    //如果付款类型是商住型的住房，则商贷*1.1 ,并把付款类型重置为2即普通住房，保持下面代码的兼容
    if(money_type == 4){
        bus_rate = bus_rate*1.1;
        money_type = 2;
    }

    //首付及贷款额
    var first_month = Math.round(first_price_rate*tatol_price);
    var money = tatol_price - first_month;

    //贷款类型对应的 money
    var bus_money = 0;
    var gov_money = 0;
    var rate_money = 0;//总利息

    if(money_type == 1){
        rate_money = money*gov_rate*last_time;
        gov_money = rate_money + money;//总额
    } else if (money_type == 2){
        rate_money = money*bus_rate*last_time;
        bus_money = rate_money + money;//总额
    } else if (money_type == 3){
        var gov_money_too = $('.calculator_price_gov').val();
        var bus_money_too = $('.calculator_price_bus').val();
        rate_money = gov_money_too*gov_rate*last_time + bus_money_too*bus_rate*last_time;
        gov_money = gov_money_too*gov_rate*last_time + money;
        bus_money = bus_money_too*bus_rate*last_time + money;
    }

    if(back_type == 1){
        var t = last_time*12;
        if(money_type == 1){
            month_rate =gov_rate/12;
        } else if(money_type == 2){
            month_rate = bus_rate/12;
        }
        //等额本息
        //[贷款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
        var month_pay = Math.round((money*10000*month_rate*Math.pow(1+month_rate,t))/(Math.pow(1+month_rate,t)-1));
        rate_money = month_pay/10000*t-money;
        var first_month_txt = first_month+' 万 '+ first_price_rate*10+'成';
        $('.calculator_real_first_month_pay').html(first_month_txt);//万 1成
        $('.calculator_real_money').html(Math.round(money));//总贷
        $('.calculator_real_rate_money').html(Math.round(rate_money));//总利息


        var html = '<span class="payback-type-text"><span class="calculator_real_month_pay"></span>'+Math.round(month_pay)+'元</span>';
        $('.month_pay_type').next().empty().html(html);//每月

        //$('.calculator_real_month_pay').html(Math.round(month_pay));//每月
    } else if(back_type == 2){
        var t = last_time*12;
        if(money_type == 1){
            month_rate =gov_rate/12;
        } else if(money_type == 2){
            month_rate = bus_rate/12;
        }
        //等额本金
        //每月还本付息金额=（本金/还款月数）+（本金-累计已还本金）×月利率
        //每月本金=总本金/还款月数
        //每月利息=（本金-累计已还本金）×月利率
        //还款总利息=（还款月数+1）×贷款额×月利率/2
        //还款总额=（还款月数+1）×贷款额×月利率/2+ 贷款额

        var month_pay = Math.round((Math.round(money)*10000/t)+(Math.round(money)*10000)*month_rate);

        rate_money = Math.round(Math.round(money)*month_rate*(1+t)/2);

        var first_month_txt = first_month+' 万 '+ first_price_rate*10+'成';
        $('.calculator_real_first_month_pay').html(first_month_txt);//万 1成
        $('.calculator_real_money').html(Math.round(money));//总贷
        $('.calculator_real_rate_money').html(Math.round(rate_money));//总利息

        //改为select   计算每个月的钱
        var select = '<select>';

        for (var i = 0;i < t;i++) {
            var option = '<option>';

            month_pay = Math.round((Math.round(money)*10000/t)+(Math.round(money)*10000-Math.round(money)*10000/t*i)*month_rate);

            option += (i+1)+'月,'+Math.round(month_pay)+'(元)';

            option += '</option>';
            select += option;
        }

        select += '</select>';

        $('.month_pay_type').next().empty().html(select);//每月
        //$('.calculator_real_month_pay').html(month_pay);//首月
    }
});

$('.ico-choose').on('click', function(){
    var _item = $(this);
    if(_item.attr('data-type') == 1){
        $('.month_pay_type').text('每月还款');
    } else if(_item.attr('data-type') == 2){
        $('.month_pay_type').text('首月还款');
    }
});