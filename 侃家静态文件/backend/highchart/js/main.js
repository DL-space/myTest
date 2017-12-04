/**
 * 此处也可以使用jquery的$(funcjtion(){})判断dom加载完就立即加载插件
 * 但有一点就是表格的纵向分割线加载不出来
 */
window.onload = function(){
    $('.stat-chart').highcharts({
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
        legend: {
            enabled: false
        },
        title: {
            text: '楼盘销售情况'
        },
        xAxis: {
            gridLineWidth: 1,
            title: {
                text: '楼盘数量'
            },
            tickLength:1,
            tickPixelInterval:100,
            min:0
        },
        yAxis: {
            startOnTick: false,
            endOnTick: false,
            allowDecimals:false,
            min:0,
            tickPixelInterval:50,
            title: {
                text: '楼盘单价'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style:{
                        'fontSize':'12px'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>每套佣金:</th><td>{point.y}元</td></tr>' +
            '<tr><th>成交套数:</th><td>{point.x}套</td></tr>',
            footerFormat: '</table>',
            followPointer: false,
            hideDelay:10
        },
        series: [{
            data: [
                {x: 2, y: 100000, z: 20000, name: '楼盘名1', country: '比利时'},
                {x: 12, y: 19000, z: 384000, name: '楼盘名2', country: '德国'},
                {x: 8, y: 27000, z: 216000, name: '楼盘名3', country: '芬兰'},
                {x: 8, y: 27000, z: 216000, name: '楼盘名4', country: '芬兰'},
                {x: 6, y: 41000, z: 246000, name: '楼盘名5', country: '荷兰'},
                {x: 7, y: 41000, z: 246000, name: '楼盘名6', country: '666'},
                {x: 4, y: 50000, z: 850000, name: '楼盘名7', country: '瑞典'}
            ]
        }]
    });
}

