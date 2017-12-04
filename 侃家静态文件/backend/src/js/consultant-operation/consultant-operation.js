$(function () {
    var medalPageArea = document.body.clientWidth;
    var medalPopArea;
    if (medalPageArea > 600) {
        medalPopArea = "600px";
    } else {
        medalPopArea = "80%";
    }
    //获取奖章的弹层
    $(document).on("click", ".btn-medal", function () {
        popup(popupMedalHtml, 2, null, null, "", medalPopArea);
    });

    //暂未获得奖章的弹层
    $(document).on("click", ".btn-medal-no", function () {
        popup(popupMedalNoHtml, 2, null, null, "", medalPopArea);
    });

    //添加对比咨询师弹层
    $(document).on("click", ".b-data-add .btn-data-add", function () {
        popup(popupAddData, 2, null, null, "", medalPopArea);
    });

    //初始化日期控件
    if ($(".date-mobile").length > 0) {
        var calendardatetime = new lCalendar();
        calendardatetime.init({
            'trigger': '.date-mobile',
            'type': 'date'
        });
    }

    //对比数据删除
    $(document).on("click", ".btn-del", function () {
        $(this).parents("li").remove();
    })

    statHover();
});


function statHover() {
    $(".tab-area").tabChange();

    brokeLineStat($("#stat-1"));
    histogramStat($("#stat-2"));
    brokeLineStat($("#stat-3"));
    histogramStat($("#stat-4"));
    brokeLineStat($("#stat-5"));
    histogramStat($("#stat-6"));
    brokeLineStat($("#stat-7"));
    histogramStat($("#stat-8"));
    treeGraph($("#stat-9"));
    brokeLineStat($("#stat-10"));
    histogramStat($("#stat-11"));
}

//折线图
function brokeLineStat(id) {
    id.highcharts({
        chart:{
            type:'area'
        },
        title: {
            text: '头部客户带看率/％',
            align: 'left',
            style: {
                fontSize: '16px'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            floating: true
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['咨询主管1', '咨询主管2', '咨询主管3', '咨询主管4', '咨询主管5', '咨询主管6', '咨询主管7', '咨询主管8', '咨询主管8', '咨询主管8', '咨询主管8', '咨询主管8', '咨询主管8'],
            labels: {
                useHTML: true,
                formatter: function () {
                    return '<a href="#">' +
                        this.value + '</a>';
                }
            }
        },
        yAxis: {
            title: {
                text: ' '
            },
            gridLineWidth: 0,
            labels:{
                enabled: false
            }
        },
        plotOptions: {
            area:{
                fillOpacity:0.3,
                dataLabels:{
                    enabled:true
                }
            }
        },
        series: [{
            name: '头部客户上户带看率',
            data: [50, 30, 40, 28, 50, 10, 16, 200, 16, 16, 16, 16, 16]
        },{
            name: '带看认购率',
            data: [60, 11, 39, 41, 19, 51, 47, 100, 16, 16, 16, 16, 16]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                }
            }]
        }
    });
}


//柱状图统计
function histogramStat(id) {
    id.highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '未开单时长/天',
            align: 'left',
            style: {
                fontSize: '16px'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['咨询主管1', '咨询主管2', '咨询主管3', '咨询主管4', '咨询主管5', '咨询主管6', '咨询主管7', '咨询主管8'],
            crosshair: true,
            labels: {
                useHTML: true,
                formatter: function () {
                    return '<a href="#">' +
                        this.value + '</a>';
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            },
            gridLineWidth: 0,
            labels:{
                enabled:false
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '单客联系次数',
            data: [20, 10, 18, 8, 22, 5, 8, 22],
            dataLabels:{
                enabled:true
            }
        }]
    });
}

//堆叠面积图
function areaStat(id) {
    id.highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: '美苏核武器库存量'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '核武库国家'
            },
            labels: {
                formatter: function () {
                    //return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
        },
        plotOptions: {
            area: {
                pointStart: 1940,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: '美国',
            data: [10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: '苏联/俄罗斯',
            data: [20000, 19000, 18000, 18000, 17000, 16000]
        }]
    });
}

//矩形树图
function treeGraph(id) {
    id.highcharts({
        credits: {
            enabled: false
        },
        plotOptions:{
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            window.open(this.options.url);
                        }
                    }
                }
            }
        },
        tooltip: {
            pointFormat: "{point.name}: {point.value}/{point.total}",
        },
        series: [{
            type: "treemap",
            layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [{
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }
                }
            }],
            data: [{
                id: 'A',
                name: '苹果',
                color: "#EC2500"
            }, {
                id: 'B',
                name: '香蕉',
                color: "#ECE100"
            }, {
                id: 'O',
                name: '橘子',
                color: '#EC9800'
            }, {
                name: '小张',
                parent: 'A',
                value: 5,
                total: 12,
                url:"http://www.baidu.com"
            }, {
                name: '小彭',
                parent: 'A',
                value: 3,
                total: 12,
                url:"http://www.baidu.com"
            }, {
                name: '小潘',
                parent: 'A',
                value: 4,
                total: 12,
                url:"http://www.baidu.com"
            }, {
                name: '小张',
                parent: 'B',
                value: 4,
                total: 15,
                url:"http://www.baidu.com"
            }, {
                name: '小彭',
                parent: 'B',
                value: 10,
                total: 15,
                url:"http://www.baidu.com"
            }, {
                name: '小潘',
                parent: 'B',
                value: 1,
                total: 15,
                url:"http://www.baidu.com"
            }, {
                name: '小张',
                parent: 'O',
                value: 1,
                total: 7,
                url:"http://www.baidu.com"
            }, {
                name: '小彭',
                parent: 'O',
                value: 3,
                total: 7,
                url:"http://www.baidu.com"
            }, {
                name: '小潘',
                parent: 'O',
                value: 3,
                total: 7,
                url:"http://www.baidu.com"
            }, {
                name: '阿苏',
                parent: 'wiki',
                value: 2,
                total: 2,
                color: '#9EDE00',
                url:"http://www.baidu.com"
            }]
        }],
        title: {
            text: '水果消费情况'
        }
    });
}

//获取奖章的弹层
var popupMedalHtml = '<div class="popup popup-medal">' +
    '<div class="pop-hd">' +
    '<h2>无限接单</h2>' +
    '<div class="layer-close">Close</div>' +
    '</div>' +
    '<div class="pop-bd">' +
    '<ul class="honor-medal-list">' +
    '<li>' +
    '<img class="pic" src="../images/medal/img-medal-rank-1.png" alt="">' +
    '<p class="txt">客服分配订单</p>' +
    '<p class="txt">超过<span class="num">50个</span>既得</p>' +
    '</li>' +
    '<li>' +
    '<img class="pic" src="../images/medal/img-medal-rank-2.png" alt="">' +
    '<p class="txt">客服分配订单</p>' +
    '<p class="txt">超过<span class="num">50个</span>既得</p>' +
    '</li>' +
    '<li>' +
    '<img class="pic" src="../images/medal/img-medal-rank-3.png" alt="">' +
    '<p class="txt">客服分配订单</p>' +
    '<p class="txt">超过<span class="num">50个</span>既得</p>' +
    '</li>' +
    '</ul>' +
    '<div class="pop-tips">你已接受订单<span class="num">56个</span>，大力出奇迹，量多堆成交~</div>' +
    '</div>' +
    '</div>';


//暂未获得奖章的弹层
var popupMedalNoHtml = '<div class="popup popup-medal-no">' +
    '<div class="pop-hd">' +
    '<h2>无限接单</h2>' +
    '<div class="layer-close">Close</div>' +
    '</div>' +
    '<div class="pop-bd">' +
    '<ul class="honor-medal-list">' +
    '<li>' +
    '<img class="pic" src="../images/medal/img-medal-3.png" alt="">' +
    '</li>' +
    '<li>' +
    '<div class="medal-res">暂未获得</div>' +
    '</li>' +
    '<li class="txt">大力出奇迹，量多堆成交~</li>' +
    '</ul>' +
    '<div class="medal-rules">' +
    '<h4>获取规则：</h4>' +
    '<p>客服分配订单超过50个即可；客服分配订单超过300个即可；客服分配订单超过700个即可</p>' +
    '</div>' +
    '</div>' +
    '</div>';

//添加对比咨询师弹层
var popupAddData = '<div class="popup popup-add-data">' +
    '   <div class="pop-hd">' +
    '<h2>增加对比</h2>' +
    '<div class="layer-close">Close</div>' +
    '</div>' +
    '<div class="pop-bd">' +
    '<div class="compare-consultant">' +
    '<div class="th">咨询师姓名:</div>' +
    '<div class="td">' +
    '<input class="form-control" type="text"/>' +
    '</div>' +
    '</div>' +
    '<ul class="pop-consultan-info">' +
    '<li>' +
    '<div class="th">姓名：</div>' +
    '<div class="td">wo是咨询师</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">性别：</div>' +
    '<div class="td">男</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">当前主管：</div>' +
    '<div class="td">我是主管</div>' +
    '</li>' +
    '<li>' +
    '<div class="th">所属城市：</div>' +
    '<div class="td">wo是咨询师</div>' +
    '</li>' +
    '</ul>' +
    '<div class="btn-area">' +
    '<button type="reset" class="btn btn-default layer-btn-reset">取消</button>' +
    '<button type="button" class="btn btn-primary btn-commit fr">添加</button>' +
    '</div>' +
    '</div>' +
    '</div>';