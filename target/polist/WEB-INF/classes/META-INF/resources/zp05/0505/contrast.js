var left_bookId;//
var right_bookId;//
var species ;//物种
var region = parent.fu_region;//行政区划代码,String型数组
var scc2 = parent.fu_scc2;//行业,String型数组
var flag;//查看形式s
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	left = Request['left'];
	right = Request['right'];
	left_bookId = Request['left_bookId'];
	right_bookId = Request['right_bookId'];
	species = Request['wz'];
	flag = Request["flag"];
	$("#left_name").html(left);
	$("#right_name").html(right);
	
})
/**********************************************************************************************/
//通用属性
var stat = {};
//中心点坐标
stat.cPointx=108;
stat.cPointy=35;
var app = {};
var dong = {};
var sss ;
require(
	[
	 	"esri/map","esri/layers/FeatureLayer","esri/layers/GraphicsLayer","esri/layers/ArcGISDynamicMapServiceLayer","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleMarkerSymbol","esri/renderers/ClassBreaksRenderer",
	 	"esri/geometry/Point","esri/geometry/Extent","esri/renderers/SimpleRenderer","esri/graphic","dojo/_base/Color","dojo/dom-style","esri/tasks/FeatureSet","esri/SpatialReference","tdlib/gaodeLayer","esri/InfoTemplate","esri/tasks/query","dojo/number",
        "dojo/_base/array","dojo/dom-construct","dojo/dom","esri/dijit/Legend","esri/dijit/OverviewMap","esri/layers/LayerDataSource","esri/layers/RasterDataSource","esri/layers/DynamicLayerInfo",
        "esri/layers/LayerDrawingOptions","esri/tasks/Geoprocessor","esri/tasks/RasterData", "esri/symbols/PictureMarkerSymbol",
        "esri/renderers/UniqueValueRenderer",
        "dojo/domReady!"

	],
	function(Map,FeatureLayer,GraphicsLayer,ArcGISDynamicMapServiceLayer,SimpleFillSymbol,SimpleLineSymbol,SimpleMarkerSymbol,ClassBreaksRenderer,
			Point,Extent,SimpleRenderer,Graphic,Color,style,FeatureSet,SpatialReference,gaodeLayer,InfoTemplate,query,number,arr,domConstruct,dom,Legend,OverviewMap,LayerDataSource,
			RasterDataSource,DynamicLayerInfo,LayerDrawingOptions,Geoprocessor,RasterData,PictureMarkerSymbol,UniqueValueRenderer) {
		dong.gaodeLayer = gaodeLayer;
		dong.Graphic = Graphic;
		dong.Point = Point;
		dong.GraphicsLayer = GraphicsLayer;
		dong.SpatialReference = SpatialReference;
		dong.SimpleLineSymbol = SimpleLineSymbol ;
		dong.FeatureLayer = FeatureLayer ;
		dong.SimpleRenderer = SimpleRenderer ;
		dong.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
		dong.SimpleFillSymbol = SimpleFillSymbol;
		dong.Color = Color;
		dong.ClassBreaksRenderer = ClassBreaksRenderer;
		dong.UniqueValueRenderer = UniqueValueRenderer ;
		dong.InfoTemplate = InfoTemplate;
		dong.Query = query;
		dong.Extent = Extent;
		dong.number = number;
		dong.arr = arr;
		dong.domConstruct = domConstruct;
		dong.dom = dom;
		dong.Legend = Legend;
		dong.SimpleMarkerSymbol = SimpleMarkerSymbol;
		dong.OverviewMap = OverviewMap;
		dong.LayerDataSource = LayerDataSource;
		dong.RasterDataSource = RasterDataSource;
		dong.DynamicLayerInfo = DynamicLayerInfo;
		dong.LayerDrawingOptions = LayerDrawingOptions;
		dong.Geoprocessor = Geoprocessor;
		dong.FeatureSet = FeatureSet;
		dong.RasterData = RasterData;
		dong.PictureMarkerSymbol = PictureMarkerSymbol;
		/*****************************************************/
		app.map1 = new Map("mapDiv1", {
			logo:false,
	        center: [stat.cPointx, stat.cPointy],
	        minZoom:4,
	        maxZoom:13,
	        zoom: 4,
	        sliderPosition: 'bottom-right',
	        showAttribution:false,//右下的gisNeu (logo左侧)
		});
		app.map2 = new Map("mapDiv2", {
			logo:false,
	        center: [stat.cPointx, stat.cPointy],
	        minZoom:4,
	        maxZoom:13,
	        zoom: 4,
	        sliderPosition: 'bottom-right',
	        showAttribution:false,//右下的gisNeu (logo左侧)
		});
		app.baselayerList1 = new dong.gaodeLayer();
		app.stlayerList1 = new dong.gaodeLayer({layertype: "st"});
		app.labellayerList1 = new dong.gaodeLayer({layertype: "label"});
		app.map1.addLayer(app.baselayerList1);//添加高德地图到map容器
		
		app.baselayerList2 = new dong.gaodeLayer();
		app.map2.addLayer(app.baselayerList2);//添加高德地图到map容器
		
		var mouseLayer = new GraphicsLayer();
		app.map2.addLayer(mouseLayer);
		app.map1.on("extent-change",function(){
			app.map2.setExtent(app.map1.extent);
		});
		app.map1.on("mouse-move",function(evt){
			mouseLayer.clear();
			var pms = new PictureMarkerSymbol("duibi.jpg",30,30);
			var graphic = new Graphic(evt.mapPoint,pms);
			mouseLayer.add(graphic);
		});
		
		if( flag == "1" ) {
			/****************************添加省*********************************************/
			app.sheng1 = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/2", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map1.addLayer(app.sheng1);
			app.sheng2 = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/2", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map2.addLayer(app.sheng2);
			app.sheng1.hide();
			app.sheng2.hide();
			 /*******************************添加市***************************************/
			app.shi1 = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/1", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map1.addLayer(app.shi1);
			app.shi2 = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/1", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map2.addLayer(app.shi2);
			app.shi1.hide();
			app.shi2.hide();
			 /*******************************添加市***************************************/
			app.xian1 = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/0", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map1.addLayer(app.xian1);
			app.xian2 = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/0", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map2.addLayer(app.xian2);
			app.xian1.hide();
			app.xian2.hide();
		} else if ( flag == "2" ) {
			show_color();
			
			app.gLyr1 = new dong.GraphicsLayer({"id":"gLyr1"});
			app.map1.addLayer(app.gLyr1);
			
			app.gLyr2 = new dong.GraphicsLayer({"id":"gLyr2"});
			app.map2.addLayer(app.gLyr2);
			
		}
		
		 //缩放
		dojo.connect(app.map1, "onZoomEnd", resizess);
		contrast(1);
});
var mod2={};
//专题图默认样式
mod2.ztsymbolmr={
		color:[163, 163, 163, 0.7],
		linecolor:[255, 255, 255, 0.35],
		linewidth:1   
}
//渲染器样式
mod2.xrclass={
		linecolor:"#444",//边框颜色
		linewidth:1,//边框
		class1:[255, 255, 178, 0.75],
		class2:[254, 204, 92, 0.75],
		class3:[253, 141, 60, 0.75],
		class4:[227, 26, 28, 0.75],
};
/*对比方式*/
function ratio(){
	contrast(1);
}
function contrast(key) {
	var data = ajax_async_t(BackstageIP+"/showCountryList/compareAnalyze", {bookId1:left_bookId,bookId2:right_bookId,species:species,region:region,scc2:scc2,flag:flag,key:key,compare:$("#contrast_right").val()}, "json");
	console.log(data);
	if ( data != "" && data != null || data != undefined ) {
		
		if ( data.status == "success" ) {
			if( data.data.left.length > 0 ) {
				if ( flag == "1" ) record_1("left",key,data.data.left);
				else if ( flag == "2" ) record_2("left",data.data.left);
				else if ( flag == "3" ) record_3(flag);
			} else {
				toastr["info"]("提示","左侧地图无数据");
			}
			if ( data.data.right.length > 0 ) {
				if ( flag == "1" ) record_1("right",key,data.data.right);
				else if ( flag == "2" ) record_2("right",data.data.right);
				else if ( flag == "3" ) record_3(flag3);
			} else {
				toastr["info"]("提示","右侧边地图无数据");
			}
		} else {
			toastr["info"]("提示",data.code);
		}
	} else {
		toastr["info"]("暂无数据");
	}
}
//非栅格
function record_1(value,str,data){
	console.log(str);
	var statePrices = {};
	var ding_code = "";//行政编码
	app.breaks = "";
	var gasMin = 1;
	var gasMax = -Infinity;
	var gas =data;
	dong.arr.forEach(gas, function(g) {
     		ding_code += "'"+g.state+"',";
       		var price = parseFloat(parseFloat(g.regular).toFixed(0));
         	statePrices[g.state] = price;
         	if ( price < gasMin ) {
           		gasMin = price;
         	}
         	if ( price > gasMax ) {
           		gasMax = price;
         	}
		});
	gasMax = formatDollars(gasMax);
	app.breaks = calcBreaks(gasMin, gasMax, 4);
    app.outline = new dong.SimpleLineSymbol("solid", new dong.Color(mod2.xrclass.linecolor), mod2.xrclass.linewidth);
    var br = "";
    br = new dong.ClassBreaksRenderer(null, function(graphic){
     	var state = graphic.attributes.ADMINCODE;
 		return statePrices[state];
     });
    br.setMaxInclusive(true);
    br.addBreak(app.breaks[0], app.breaks[1], new dong.SimpleFillSymbol("solid", app.outline, new dong.Color(mod2.xrclass.class1)));
    br.addBreak(app.breaks[1], app.breaks[2], new dong.SimpleFillSymbol("solid", app.outline, new dong.Color(mod2.xrclass.class2)));
    br.addBreak(app.breaks[2], app.breaks[3], new dong.SimpleFillSymbol("solid", app.outline, new dong.Color(mod2.xrclass.class3)));
    br.addBreak(app.breaks[3], gasMax, new dong.SimpleFillSymbol("solid", app.outline, new dong.Color(mod2.xrclass.class4)));
    if( str == 1 ){
    	 if(value == "left" ){
    		 app.sheng1.show();
    		 app.sheng1.setRenderer(br);
    		 app.map1.addLayer(app.sheng1);
    		 app.sheng1.redraw();
    	 }else{
    		 app.sheng2.show();
    		 app.sheng2.setRenderer(br);
    		 app.map2.addLayer(app.sheng2);
    		 app.sheng2.redraw()
    	 } 
    } else if ( str == 2 ) {
        if(value == "left" ){
        	app.shi1.show();
        	app.shi1.setRenderer(br);
        	app.map1.addLayer(app.shi1);
        	app.shi1.redraw();
        } else {
        	app.shi2.show();
        	app.shi2.setRenderer(br);
        	app.map2.addLayer(app.shi2);
        	app.shi2.redraw();
        } 
        
    } else if (str == 3 ) {
    	if(value == "left" ) {
    		app.xian1.show();
    		app.xian1.setRenderer(br);
    		app.map1.addLayer(app.xian1);
    		app.xian1.redraw();
    	} else {
    		 app.xian2.show();
    		 app.xian2.setRenderer(br);
    		 app.map2.addLayer(app.xian2);
    	     app.xian2.redraw();
    	}
    	
     	
    }
    createLegend(value,str);
}
//创建图例
function createLegend(value,str) {
		
	if( value == "left" ) {
	  	if ( app.hasOwnProperty("left") ) {
	    	app.left.destroy();
	    	dong.domConstruct.destroy(dojo.byId("left"));
	  	}
	  	var str ;
	  	if(str == "1" ) str = app.sheng1;
	  	else if (str == "2" ) str = app.shi1; 
	  	else if ( str == "3") str = app.xian1;
	  	//创建一个新的div图例
	  	var legendDiv = dong.domConstruct.create("div", {id: "left"}, dong.dom.byId("legendWrapper1"));
	
	  	app.left = new dong.Legend({map :app.map1,respectCurrentMapScale : false,//当真正的图例会更新每个规模变化和只显示层和子层中可见当前地图比例尺。当假的,图例不更新在每个规模变化和所有层和子层将显示出来。默认值是正确的。
	    	layerInfos : [{layer : str,title : " "}]}, legendDiv);
	  	app.left.startup();

	} else {
	  	if ( app.hasOwnProperty("right") ) {app.right.destroy();dong.domConstruct.destroy(dojo.byId("right"));}
	  	var str ;
	  	if(str == "1" ) str = app.sheng1;
	  	else if (str == "2" ) str = app.shi1; 
	  	else if ( str == "3") str = app.xian1;
	  	//创建一个新的div图例
	  	var legendDiv = dong.domConstruct.create("div", {id: "right"}, dong.dom.byId("legendWrapper2"));
	  	app.right = new dong.Legend({map : app.map2,respectCurrentMapScale : false,//当真正的图例会更新每个规模变化和只显示层和子层中可见当前地图比例尺。当假的,图例不更新在每个规模变化和所有层和子层将显示出来。默认值是正确的。
	    	layerInfos : [{layer : str,title : " "}]}, legendDiv);
	  	app.right.startup();
	}
}

/**
 * 仅点源
 */
var chonse_color = {"电力":"#EE82EE","工业锅炉" :"#FF1493","民用燃烧":"#AEEEEE","玻璃":"#00868B","独立焦化":"#B4EEB4","钢铁":"#B3EE3A","化工化纤":"	#8B864E","水泥":"#8B658B","其他工业企业":"#EE7942","机动车":"#FFA54F"};//分配的颜色
//仅点源行业默认对应的颜色
var color = {"电力":"#EE82EE","工业锅炉" :"#FF1493","民用燃烧":"#AEEEEE","玻璃":"#00868B","独立焦化":"	#B4EEB4","钢铁":"	#B3EE3A","化工化纤":"	#8B864E","水泥":"#8B658B","其他工业企业":"#EE7942","机动车":"#FFA54F",
		"飞机":"#7FFFD4","船舶":"#C1FFC1","非道移机械":"#9BCD9B","工业喷涂":"#0000FF","建筑涂料":"#4682B4","印刷印染":"#B3EE3A","农药使用":"#48D1CC","其他溶剂使用":"#6E8B3D","氮肥使用":"#2E8B57","固氮植物":"#7CFC00","秸秆堆肥":"#8B658B","人体粪便":"#FFC1C1",
		"畜禽养殖":"#CD9B9B","土壤本底":"#8B3A3A","道路扬尘":"#F5DEB3","堆场扬尘":"#DB7093",
		"施工烟尘":"#EE2C2C","土壤扬尘":"#DDA0DD","生物质燃烧":"#8B2323","生物质开放燃烧汽油储存":"#CD7054","汽油运输":"#D8BFD8","加油站":"#9370DB","废水处理":"#8B7D6B","固废处理":"#CD6090","烟气脱硝":"#F0FFF0","餐饮油烟":"#CD00CD"
}
function show_color () {
	var html = '';
	for ( var i = 0 ; i < parent.fu_scc2.length ; i ++ ) {
		html += '<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color[parent.fu_scc2[i]]+'"></div></div><div class="col-sm-8"><span></span>'+parent.fu_scc2[i]+'</div></div><br>';
	}
	$(".point_html1").html(html);
	$(".point_html2").html(html);
}
function record_2(value,data) {
	$.each(data,function(i,item){
		var str ;
		var pointSymbol = new dong.SimpleMarkerSymbol();
		 pointSymbol.setOutline(new dong.SimpleLineSymbol(dong.SimpleLineSymbol.STYLE_SOLID, new dong.Color(["#0000FF"]), 1));
		if ( item.SPECIES > 15000 ) {
			pointSymbol.setSize(50);
            pointSymbol.setColor(new dong.Color(chonse_color[item.SCC2]),0.2);
		} else if ( item.SPECIES >10000 && item.SPECIES<15000) {
			pointSymbol.setSize(40);
            pointSymbol.setColor(new dong.Color(chonse_color[item.SCC2]),0.2);
		} else if ( item.SPECIES > 3000 && item.SPECIES<10000) {
			pointSymbol.setSize(30); 
            pointSymbol.setColor(new dong.Color(chonse_color[item.SCC2]),0.2);
		} else if ( item.SPECIES >1000 && item.SPECIES<3000){
			pointSymbol.setSize(20);
            pointSymbol.setColor(new dong.Color(chonse_color[item.SCC2]),0.2);
		} else if ( item.SPECIES < 1000 ) {
			pointSymbol.setSize(10);
            pointSymbol.setColor(new dong.Color(chonse_color[item.SCC2]),0.2);
		}
		 var infoTemplate = new esri.InfoTemplate("基本信息", "所属企业: "+item.COMPANY_NAME+"<br/>组织机构代码: "+item.COMPANY_ID+" <br/>行业类别: "+item.SCC2+"<br/>主要污染物排放量（单位:吨):<br>"+species+":"+item.SPECIES);
		 var point = new dong.Point(handle_x(item.LON),handle_y(item.LAT), new dong.SpatialReference({ wkid: 3857 }));
		 var graphic = new dong.Graphic(point,pointSymbol,"",infoTemplate);  
		 if ( value == "left" )  app.gLyr1.add(graphic);
		 else if (value == "right" )  app.gLyr2.add(graphic);
	})
	$("#point_tuli1").show();
	$("#point_tuli2").show();
}
//经度转墨卡托
function handle_x(x) {
	return (x / 180.0) * 20037508.34;
}
//纬度度转墨卡托
function handle_y(y) {
	if (y > 85.05112) {
		y = 85.05112;
	}
	if (y < -85.05112) {
		y = -85.05112;
	}
	y = (Math.PI / 180.0) * y;
	var tmp = Math.PI / 4.0 + y / 2.0;
	return 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;
}























function calcBreaks(min, max, numberOfClasses) {
    var range = (max - min) / numberOfClasses;
    var breakValues = [];
    for ( var i = 0; i < numberOfClasses; i++ ) {
      breakValues[i] = formatDollars(min + ( range * i ));
    }
    return breakValues;
 }
//保留两位小数
 function formatDollars(num) {
	 return num.toFixed(2);
//   	return dong.number.format(num, { "places": 0 });
 }



//缩放事件
function resizess(event){
	//非栅格
	if ( flag == "1") {
		app.sheng1.hide();
		app.shi1.hide();
		app.xian1.hide();
		app.sheng2.hide();
		app.shi2.hide();
		app.xian2.hide();
		if(app.map1.getScale().toFixed()>=9244649){
			contrast(1);
		} else if( app.map1.getScale().toFixed() < 4622324) {
			if(app.map1.getScale().toFixed()>2311161 ) {
				contrast(2);
			} else{
				contrast(3);
			}
		}
	} else if ( flag == "2") {//仅点源
		
	} else if ( flag == "3") {//栅格
		
	}
}


/***************************************************************************************/
//获取参数
function GetRequest() { //截取URL的方法
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
		}
	}
	return theRequest;
}
