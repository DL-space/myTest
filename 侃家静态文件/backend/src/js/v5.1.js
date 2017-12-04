$(function () {
    //线索质量评分分析图表
    var myChartPf = echarts.init(document.getElementById('pf-chart'));
    var optionChartPf = {
        title: {
            text: '近30日线索质量平均分布变化情况',
            bottom: 0,
            left: "50%",
            textAlign: 'center',
            textStyle: {
                color: '#666'
            }
        },
        tooltip: {},
        legend: {
            data: ['全国', '北京', '天津'],
            orient: 'vertical',
            left: 'right',
            top: '80px'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["0713", "0714", "0715", "0716", "0717", "0718", "0719", "0720"]
        },
        yAxis: {
            type: 'value',
            interval: 1
        },
        series: [
            {
                name: '全国',
                type: 'line',
                smooth: 'true',
                symbol: 'emptyCircle',
                symbolSize: 14,
                itemStyle: {normal: {label: {show: true}}},
                data: [1.7, 2.6, 1.2, 2.7, 1.3, 4, 0.5, 2.4]
            },
            {
                name: '北京',
                type: 'line',
                smooth: 'true',
                symbol: 'emptyCircle',
                symbolSize: 14,
                data: [2.6, 1.7, 2.7, 1.2, 3.5, 1.3, 2.4, 0.5]
            },
            {
                name: '天津',
                type: 'line',
                smooth: 'true',
                symbol: 'emptyCircle',
                symbolSize: 14,
                data: [3.2, 2.1, 3.0, 1.9, 2.6, 2.7, 1.7, 1.9]
            }
        ]
    };
    myChartPf.setOption(optionChartPf);

    chartShowDefault();

    //展开收起
    $(document).on("click", ".pf-show .btn-show", function () {
        var _item = $(this);
        togglePf(_item.attr("data-value"));
    })

    $(".pagination li").click(function(){
        chartShowDefault();
    });
});

/**
 * 跳转新页面时的默认显示隐藏
 */
function chartShowDefault() {
    togglePf(2);
}

/**
 * 点击展开或收起线索质量评分分析统计图
 * @param data {Number} 0:收起状态，可展开；1:展开状态，可收起,2:默认显示状态，收起
 */
function togglePf(data) {
    if (data == 0) {
        $("#pf-chart").slideUp();
        $(".pf-show .btn-show").text("展开评分分析");
        $(".pf-show .btn-show").attr("data-value", 1);
    }
    if (data == 1) {
        $("#pf-chart").slideDown();
        $(".pf-show .btn-show").text("收起评分分析");
        $(".pf-show .btn-show").attr("data-value", 0);
    } else if (data == 2) {
        $("#pf-chart").hide();
        $(".pf-show .btn-show").text("展开评分分析");
        $(".pf-show .btn-show").attr("data-value", 1);
    }
}
