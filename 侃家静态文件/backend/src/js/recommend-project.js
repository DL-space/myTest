window.onload = function () {
    $('.stat-this-week').highcharts({
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
        legend: {
            enabled: false
        },
        title: {
            text: '预计本周20170501-20170507的楼盘产品力图',
            align: 'left'
        },
        xAxis: {
            gridLineWidth: 1,
            title: {
                text: '楼盘数量'
            }
        },
        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: '楼盘单价'
            },
            labels: {
                //format: '{value} gr'
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.country}'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            data: [
                {x: 5, y: 19000, z: 90000, name: 'BE', country: '比利时'},
                {x: 12, y: 32000, z: 384000, name: 'DE', country: '德国'},
                {x: 8, y: 27000, z: 216000, name: 'FI', country: '芬兰'},
                {x: 6, y: 41000, z: 246000, name: 'NL', country: '荷兰'},
                {x: 17, y: 50000, z: 850000, name: 'SE', country: '瑞典'}
            ]
        }]
    });


    $('.stat-last-week').highcharts({
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
        legend: {
            enabled: false
        },
        title: {
            text: '上周20170424-20170430的楼盘图产品力图',
            align: 'left'
        },
        xAxis: {
            gridLineWidth: 1,
            title: {
                text: '楼盘数量'
            }
        },
        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: '楼盘单价'
            },
            labels: {
                //format: '{value} gr'
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.country}'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            data: [
                {x: 5, y: 19000, z: 90000, name: 'BE', country: '比利时'},
                {x: 12, y: 32000, z: 384000, name: 'DE', country: '德国'},
                {x: 8, y: 27000, z: 216000, name: 'FI', country: '芬兰'},
                {x: 6, y: 41000, z: 246000, name: 'NL', country: '荷兰'},
                {x: 17, y: 50000, z: 850000, name: 'SE', country: '瑞典'}
            ]
        }]
    });
}

