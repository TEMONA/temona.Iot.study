var data_list =[]
$(document).ready(function(){
  var server_url = $('#server_url').html()
  //alert(server_url)
  var socket = io.connect(server_url);

  socket.on('hdc1000',function (data) {
    //console.log(data.Temp);
    try {
      FusionCharts.items["myThm"].feedData("&value="+data.Temp);
      $('#myThm_tag').html(my_round(data.Temp,2)+"℃")
      //console.log(FusionCharts.items["myThm"].getData());
      FusionCharts.items["myHyg"].feedData("&value="+data.Humi);
      $('#myHyg_tag').html(my_round(data.Humi,1)+"％")
      //console.log(FusionCharts.items["myHyg"].getData());
      //console.log(data.Humi);
      feed_chart(data);
      $('#chart_tag').html("温度："+my_round(data.Temp,2)+"℃"+"　湿度："+my_round(data.Humi,1)+"％")
    } catch (e) {

    }

  })

  FusionCharts.ready(function () {
    var chart = new FusionCharts({
        type: 'thermometer',
        renderAt: 'chart-container2',
        id  : 'myThm',
        width: '220',
        height: '420',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "温度計",
                "subcaption": "Thermometer",
                "lowerLimit": "-10",
                "upperLimit": "40",
                "numberSuffix": "°C",
                "decimals" : "1",
                "showhovereffect": "1",
                "showValue": "0",
                //"gaugeFillColor": "#008ee4",
                "gaugeFillColor": "#F92500",
                //"bgCOlor": "#ececec",
                "bgColor": "cccccc,cdcdcd",
                "bgAlpha": "30,15",
                "thmOriginX": "120",
                //"bgAlpha": "50,50",
                "theme" : "fint",
                //"chartBottomMargin" : "20",
                //Tick Marks auto adjustment
                "adjustTM" : "1",
                //Configuring Tick Positions
                "ticksOnRight" : "0",
                "tickMarkDistance": "5",
                "tickValueDistance" : "2",
                // Major Tick Marks
                "majorTMNumber" : "9",
                "majorTMHeight" : "12",
                //Minor Tick Marks
                "minorTMNumber" : "4",
                "minorTMHeight" : "7",
                "minorTMColor" : "#666666",
                "minorTMAlpha" : "50",
                "minorTMThickness" : "1",

                //Tick value step
                "tickValueStep" : "2",
            },
            "value": "0"
        },
        "events" :{
            "initialized": function (evt, arg) {
            }
        }
    })
    .render();
});
FusionCharts.ready(function () {
    var chart = new FusionCharts({
        type: 'thermometer',
        renderAt: 'chart-container3',
        id  : 'myHyg',
        width: '220',
        height: '420',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "湿度計",
                "subcaption": "Hygrometer",
                "lowerLimit": "10",
                "upperLimit": "80",
                "numberSuffix": "％",
                "decimals" : "1",
                "showhovereffect": "1",
                "showValue": "0",
                "gaugeFillColor": "#008ee4",
                //"bgCOlor": "#ececec",
                //"bgAlpha": "100,80",
                "bgColor": "cccccc,cdcdcd",
                "bgAlpha": "30,15",
                "thmOriginX": "100",
                "theme" : "fint",
                //"chartBottomMargin" : "20",
                "majorTMNumber" : "6",
                "majorTMHeight" : "12",
                "minorTMNumber" : "4",
                "minorTMHeight" : "7",

                //Major Tick Marks Cosmetics
                "majorTMColor" : "#666666",
                "majorTMAlpha" : "100",
                "majorTMThickness" : "2",

                //Minor Tick Marks Cosmetics
                "minorTMColor" : "#666666",
                "minorTMAlpha" : "50",
                "minorTMThickness" : "2",
            },
            "value": "-6"
        },
        "events" :{
            "initialized": function (evt, arg) {
            }
        }
    })
    .render();
  });
  FusionCharts.ready(function(){
    var myChart = new FusionCharts({
        type: 'realtimelinedy',
        dataFormat: 'json',
        id: 'stockMonitor',
        renderAt: 'chart-container4',
        width: '500',
        height: '420',
        dataSource: {
            "chart": {
                "caption": "温湿度モニター",
                "subCaption": "Change of Temperature and Humidity",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "baseFontColor" : "#333333",
                "baseFont" : "Helvetica Neue,Arial",
                "subcaptionFontBold": "0",
                "paletteColors" : "#008ee4,#F92500,#f2c500",
                "bgColor" : "#ffffff",
                "canvasBgColor" : "#ffffff",
                "showBorder" : "0",
                "showShadow" : "0",
                "showCanvasBorder": "0",
                "showRealTimeValue": "0",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                //"bgColor": "cccccc,cdcdcd",
                "bgAlpha": "30,15",
                //"numberprefix": "$",
                "numberSuffix": "％",
                "sNumberSuffix":"℃",
                //"numberSuffix": "℃",
                "setadaptiveymin": "1",
                "setadaptivesymin": "1",
                "xaxisname": "Time",
                "labeldisplay": "Rotate",
                "slantlabels": "1",
                "pyaxisminvalue": "20",
                "pyaxismaxvalue": "80",
                "syaxisminvalue": "10",
                "syaxismaxvalue": "40",
                "divlineAlpha" : "100",
                "divlineColor" : "#999999",
                "showAlternateHGridColor" : "0",
                "divlineThickness" : "1",
                "divLineIsDashed" : "1",
                "divLineDashLen" : "1",
                "divLineGapLen" : "1",
                "numDisplaySets": "10"
            },
            "categories": [
                {
                    "category": [
                        { "label": "Time Start" }
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "湿度",
                    "showvalues": "0",
                    "data": [
                        { "value": "40" }
                    ]
                },
                {
                    "seriesname": "温度",
                    "showvalues": "0",
                    "parentyaxis": "S",
                    "data": [
                        { "value": "25" }
                    ]
                }
            ],
            "trendlines": [
                {
                }
            ]
        },
        "events": {
            "initialized": function (e) {
            }
        }
    }).render();
  });
})

function my_round(num,exp) {
  exp = Math.pow(10,exp)
  data = Math.round(num*exp)/exp
  return data
}

function formatTime(num){
    return (num <= 9)? ("0"+num) : num;
}
function feed_chart(data) {
  var chartRef = FusionCharts("stockMonitor"),
      //We need to create a querystring format incremental update, containing
      //label in hh:mm:ss format
      //and a value (random).
      currDate = new Date(),
      label = formatTime(currDate.getHours()) + ":" + formatTime(currDate.getMinutes()) + ":" + formatTime(currDate.getSeconds()),
      //Get random number between 35.25 & 30.75 - rounded to 2 decimal places
      temp_Temp = my_round(data.Temp,2),
      temp_Humi = my_round(data.Humi,1),
      strData = "&label=" + label + "&value=" + temp_Humi + "|" + temp_Temp;
  //Feed it to chart.
  console.log(strData);
  chartRef.feedData(strData);
}
