/********************************************地图上的统计图**************************************/
function chartLayer(){
	var CITY_DATA={
            "total":34,
            "items":[{"id":1,"name":"乌鲁木齐","X":87.575829,"Y":43.782212,"code":""},
                {"id":2,"name":"拉萨","X":91.162998,"Y":29.71042,"code":""},
                {"id":3,"name":"西宁","X":101.797303,"Y":36.593642,"code":""},
                {"id":4,"name":"兰州","X":103.584297,"Y":36.119086,"code":""},
                {"id":5,"name":"成都","X":104.035508,"Y":30.714179,"code":""},
                {"id":6,"name":"重庆","X":106.519115,"Y":29.478925,"code":""},
                {"id":7,"name":"贵阳","X":106.668071,"Y":26.457312,"code":""},
                {"id":8,"name":"昆明","X":102.726775,"Y":24.969385,"code":""},
                {"id":9,"name":"银川","X":106.167225,"Y":38.598524,"code":""},
                {"id":10,"name":"西安","X":108.967128,"Y":34.276112,"code":""},
                {"id":11,"name":"南宁","X":108.233931,"Y":22.748296,"code":""},
                {"id":12,"name":"海口","X":110.346181,"Y":19.96992,"code":""},
                {"id":13,"name":"广州","X":113.226683,"Y":23.18307,"code":""},
                {"id":14,"name":"长沙","X":112.947928,"Y":28.169916,"code":""},
                {"id":15,"name":"南昌","X":115.893715,"Y":28.652363,"code":""},
                {"id":16,"name":"福州","X":119.246768,"Y":26.070765,"code":""},
                {"id":17,"name":"台北","X":121.503567,"Y":25.008274,"code":""},
                {"id":18,"name":"杭州","X":120.183046,"Y":30.330584,"code":""},
                {"id":19,"name":"上海","X":121.449707,"Y":31.253361,"code":""},
                {"id":20,"name":"武汉","X":114.216597,"Y":30.579253,"code":""},
                {"id":21,"name":"合肥","X":117.262302,"Y":31.838353,"code":""},
                {"id":22,"name":"南京","X":118.805692,"Y":32.085022,"code":""},
                {"id":23,"name":"郑州","X":113.6511,"Y":34.746308,"code":""},
                {"id":24,"name":"济南","X":117.048331,"Y":36.60841,"code":""},
                {"id":25,"name":"石家","X":114.478215,"Y":38.033276,"code":""},
                {"id":26,"name":"太原","X":112.483066,"Y":37.798404,"code":""},
                {"id":27,"name":"呼和浩特","X":111.842806,"Y":40.895751,"code":""},
                {"id":28,"name":"天津","X":117.351094,"Y":38.925719,"code":""},
                {"id":29,"name":"沈阳","X":123.296299,"Y":41.801604,"code":""},
                {"id":30,"name":"长春","X":125.26142,"Y":43.981984,"code":""},
                {"id":31,"name":"哈尔","X":126.567138,"Y":45.69381,"code":""},
                {"id":32,"name":"北京","X":116.068276,"Y":39.892225,"code":""},
                {"id":33,"name":"香港","X":114.093117,"Y":22.427852,"code":""},
                {"id":34,"name":"澳门","X":113.552482,"Y":22.184495,"code":""}
            ]
        };
	
	app.chart = new dong.GraphicsLayer({"id":"chart"});
	app.map.addLayer(app.chart);
	app.chart.on("click",showDetailChart);
	addReadPopup(CITY_DATA);
	
	
}
function showDetailChart(evt){
    var graphic = evt.graphic;
    console.log(graphic);
    
//    graphic.symbol.url="bar1.png";
    app.chart.redraw();
    
//    app.map.infoWindow.resize(500,400);
    app.map.infoWindow.resize("500", "400");
    
    app.map.infoWindow.setTitle("<b>"+graphic.attributes.name+"</b>");
    var content="<div style='text-align: center;'><div id='char_bar'style='text-align: center;width:100%;height:100%;'></div></div>";
    app.map.infoWindow.setContent(content);
    app.map.infoWindow.show(graphic.geometry);
    $(".maximize").hide();
    $(".close").click(function(){
//        restoreChart(evt);
    });
    option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:""
		    },
		    grid: {
		    	top:'8%',
		        left: '3%',
		        right: '15%',
		        bottom: '5%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['CO','NOx','SO2','VOC','NH3','PM2.5','PMcoarse','PM10more','BC','OC'],
		            name:'物种名称',
					nameGap:30,
					max: "auto",
					axisLabel:{//坐标轴文本标签选项
						interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
						rotate:25,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
						margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
					},
		        }
		    ],
		    yAxis : [
		        {	name :'单位:(万吨)',
		            type : 'value'
		        }
		    ],
		    series : [
		              {
		                  name:'直接访问',
		                  type:'bar',
		                  barWidth: '60%',
		                  data:[10, 52, 200, 334, 390, 330, 220,220,150,320]
		              }
		          ]
		};
	myChart_2 = echarts.init(document.getElementById("char_bar"), 'macarons');//声明id为1的div为图形dom
	myChart_2.on('click', function (params) {});
	myChart_2.setOption(option);
	$(".maximize").click(function(){})
}
function addReadPopup(data){
    var items= data.items;
    for(var i=0;i<data.total;i++){
        var symbol = new dong.PictureMarkerSymbol("bar.png",50,50);
        symbol.setOffset(-10,18);
        var pt=new dong.Point(handle_x(items[i].X),handle_y(items[i].Y),new dong.SpatialReference({ wkid: 3857 }));
        var graphic = new esri.Graphic(pt,symbol,items[i]);
        app.chart.add(graphic);
    }
}