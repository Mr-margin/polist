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
        "esri/layers/LayerDrawingOptions","esri/tasks/Geoprocessor","esri/tasks/RasterData", "esri/symbols/PictureMarkerSymbol","esri/tasks/PrintTask","esri/tasks/PrintTemplate","esri/tasks/PrintParameters",
        "esri/renderers/UniqueValueRenderer",
        "dojo/domReady!"

	],
	function(Map,FeatureLayer,GraphicsLayer,ArcGISDynamicMapServiceLayer,SimpleFillSymbol,SimpleLineSymbol,SimpleMarkerSymbol,ClassBreaksRenderer,
			Point,Extent,SimpleRenderer,Graphic,Color,style,FeatureSet,SpatialReference,gaodeLayer,InfoTemplate,query,number,arr,domConstruct,dom,Legend,OverviewMap,LayerDataSource,
			RasterDataSource,DynamicLayerInfo,LayerDrawingOptions,Geoprocessor,RasterData,PictureMarkerSymbol,PrintTask,PrintTemplate,PrintParameters,UniqueValueRenderer) {
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
		dong.PrintTask = PrintTask;
		dong.PrintTemplate = PrintTemplate;
		dong.PrintParameters = PrintParameters;
		/*****************************************************/
		app.map = new Map("mapDiv", {
			logo:false,
			basemap: "osm",//osm   topo
	        center: [stat.cPointx, stat.cPointy],
	        minZoom:4,
	        maxZoom:13,
	        zoom: 4,
	        sliderPosition: 'bottom-right',
	        showAttribution:false,//右下的gisNeu (logo左侧)
		});
		app.baselayerList = new dong.gaodeLayer();
		app.stlayerList = new dong.gaodeLayer({layertype: "st"});
		app.labellayerList = new dong.gaodeLayer({layertype: "label"});
		app.map.addLayer(app.baselayerList);//添加高德地图到map容器
//		app.map.addLayers([app.baselayerList]);//添加高德地图到map容器
		
		app.gLyr = new dong.GraphicsLayer({"id":"gLyr"});
		app.map.addLayer(app.gLyr);
		
		
		
		app.country = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/country/MapServer/0");
		app.map.addLayer(app.country);
		dojo.connect(app.country, "onClick", country);
		app.country.hide();
		
		
		
		/****************************添加省*********************************************/
		app.sheng = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/2", {//添加省的图层
			mode:esri.layers.FeatureLayer.MODE_ONDEMAND,
		        outFields: ["*"]
		      });
		 app.map.addLayer(app.sheng);
		 //缩放
		 dojo.connect(app.map, "onZoomEnd", resizess);
		 //点击
		 dojo.connect(app.sheng, "onClick", optionclick);
		 app.sheng.hide();
		 /*******************************添加市***************************************/
		 app.shi = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/1", {//市的图层
			 mode:esri.layers.FeatureLayer.MODE_ONDEMAND,
		        outFields: ["*"],
		      });
		app.map.addLayer(app.shi);
		dojo.connect(app.shi, "onClick", optionclick);
		 dojo.connect(app.shi, "onZoomEnd", resizess);
//		 app.shi.hide();
		 /*******************************添加市***************************************/
		 app.xian = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/0", {//县的图层
			 mode:esri.layers.FeatureLayer.MODE_ONDEMAND,
		        outFields: ["*"],
		      });
		app.map.addLayer(app.xian);
		app.xian.hide();
		/************************************************/
		//定义专题图的默认样式
	    app.symbol = new dong.SimpleFillSymbol(
			dong.SimpleFillSymbol.STYLE_SOLID,
			new dong.SimpleLineSymbol(
				dong.SimpleLineSymbol.STYLE_SOLID, 
				new dong.Color(mod2.ztsymbolmr.linecolor), mod2.ztsymbolmr.linewidth
			), 
			new dong.Color(mod2.ztsymbolmr.color)
		);
	    /*************************动态服务**********************************/
//	    app.dynamicData = new dong.ArcGISDynamicMapServiceLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/rs/MapServer");
//		app.map.addLayer(app.dynamicData);
//	    app.dynamicData.hide();
	    
	    // 添加鹰眼 
//        var overviewMapDijit = new esri.dijit.OverviewMap({  
//          map: app.map,   // 必要的  
//          visible: true,  // 初始化可见，默认为false  
//          baseLayer:new esri.layers.DynamicMapServiceLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer"),
//          attachTo: "top-left",   // 默认右上角  
//          width: 150, // 默认值是地图高度的 1/4th  
//          height: 150, // 默认值是地图高度的 1/4th 
//          opacity: .40,    // 透明度 默认0.5  
//          maximizeButton: true,   // 最大化,最小化按钮，默认false  
//          expandFactor: 3,    //概览地图和总览图上显示的程度矩形的大小之间的比例。默认值是2，这意味着概览地图将至少是两倍的大小的程度矩形。  
//          color: "red"    // 默认颜色为#000000  
//        });  
//        overviewMapDijit.startup();   // 开启
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
//面的分段
function subsection(str){//region  选择的地区  SCC1 选择的行业  custom 自定义的查询条件
	var region_code = adCode();
	var data;
	if ( zdy_type == "1" ) {
		data = ajax_async_t(BackstageIP,{bookId:$("#bookId").val(),species:$('input[name="wz"]:checked').val(),key:str,region:region_code,scc2:chosse_hy,custom:JSON.stringify(zdysj)},"json");
	}  else {
		data = ajax_async_t(BackstageIP+"showCountryList/jsonDataForMap",{bookId:$("#bookId").val(),species:$('input[name="wz"]:checked').val(),key:str,region:region_code,scc2:chosse_hy},"json");
	}
	console.log(data)
	if( data != "" && data != null && data != undefined ) {
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
        	 app.sheng.show();
        	 app.sheng.setRenderer(br);
        	 app.sheng.redraw()
             app.map.addLayer(app.sheng);
             createLegend(str);
             dingwei(ding_code,str);
        } else if ( str == 2 ) {
        	app.shi.setRenderer(br);
            app.map.addLayer(app.shi);
            app.shi.redraw()
            createLegend(str);
        } else if (str == 3 ) {
        	app.xian.setRenderer(br);
            app.map.addLayer(app.xian);
            app.xian.redraw()
            createLegend(str);
        }
	} else {
		toastr["info"]("暂无数据");
		if ( app.hasOwnProperty("legend") ) {
	    	app.legend.destroy();
	    	dong.domConstruct.destroy(dojo.byId("legend"));
	  	}
	}
}
//创建图例
function createLegend(str) {
//  	//如果存在的话，删除之前的图例
  	if ( app.hasOwnProperty("legend") ) {
    	app.legend.destroy();
    	dong.domConstruct.destroy(dojo.byId("legend"));
  	}
  	var str ;
  	if(str == "1" ) {
  		str = app.sheng;
  	} else if (str == "2" ) {
  		str = app.shi;
  	} else if ( str == "3") {
  		str = app.xian;
  	}
  	//创建一个新的div图例
  	var legendDiv = dong.domConstruct.create("div", {
    	id: "legend"
  		}, dong.dom.byId("legendWrapper"));

  	app.legend = new dong.Legend({
    	map : app.map,
    	respectCurrentMapScale : false,//当真正的图例会更新每个规模变化和只显示层和子层中可见当前地图比例尺。当假的,图例不更新在每个规模变化和所有层和子层将显示出来。默认值是正确的。
    	layerInfos : [{
      		layer : str,
      		title : " "
    	}]
  	}, legendDiv);
  	app.legend.startup();
}
var xmax = 0,xmin = 0,ymax = 0,ymin = 0;
//定位
function dingwei (code,str) {
	var kk = 0 ;
	var query = new dong.Query();
	query.where = "ADMINCODE in ("+code.substring(0,code.length-1)+")";
	var tuceng ;
	if( str == "1" ) {
		tuceng = app.sheng;
	} else if ( str == "2" ) {
		tuceng = app.shi;
	} else if ( str == "3" ) {
		tuceng = app.xian
	}
	tuceng.queryFeatures(query, function(featureSet) {
		for (var i = 0, il = featureSet.features.length; i < il; i++) {
			var graphic = featureSet.features[i];
			if(kk == 0){
				xmax = graphic.geometry.getExtent().xmax;
				xmin = graphic.geometry.getExtent().xmin;
				ymax = graphic.geometry.getExtent().ymax;
				ymin = graphic.geometry.getExtent().ymin;
				kk++;
			}else{
				xmin = graphic.geometry.getExtent().xmin < xmin ? graphic.geometry.getExtent().xmin : xmin;
				xmax = graphic.geometry.getExtent().xmax > xmax ? graphic.geometry.getExtent().xmax : xmax;
				ymin = graphic.geometry.getExtent().ymin < ymin ? graphic.geometry.getExtent().ymin : ymin;
				ymax = graphic.geometry.getExtent().ymax > ymax ? graphic.geometry.getExtent().ymax : ymax;
			}
		}
		var extent = new dong.Extent(xmin,ymin,xmax,ymax, new dong.SpatialReference({ wkid:3857 }));
		app.map.setExtent(extent);
	});
}
//计算分段，取等分方式
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
//点击面
function optionclick (event){
	console.log(event);
}
//缩放事件
function resizess(event){
//	console.log(app.map.getScale().toFixed())
	//非栅格
	if ($('input[name="shape"]:checked').val() == "1") {
		if(app.map.getScale().toFixed()>=9244649){
			app.sheng.show();
			app.shi.hide();
			app.xian.hide();
			subsection(1);
		} else if( app.map.getScale().toFixed() < 4622324) {
			if(app.map.getScale().toFixed()>2311161 ) {
				app.sheng.hide();
				app.xian.hide();
				app.shi.show();
				subsection(2);
			} else{
				app.sheng.hide();
				app.shi.hide();
				app.xian.show();
				subsection(3);
			}
		}
	} else if ($('input[name="shape"]:checked').val() == "2") {//仅点源
		
	} else if ($('input[name="shape"]:checked').val() == "3") {//栅格
		
	}
}

function dingwei () {
	var query = new dong.Query();
	query.where = "ADMINCODE in ('"+parent.dataBase.Message_map.REGION+"')";
	app.shi.queryFeatures(query, function(featureSet) {
		for (var i = 0, il = featureSet.features.length; i < il; i++) {
			var graphic = featureSet.features[i];
			if(i == 0){
				xmax = graphic.geometry.getExtent().xmax;
				xmin = graphic.geometry.getExtent().xmin;
				ymax = graphic.geometry.getExtent().ymax;
				ymin = graphic.geometry.getExtent().ymin;
			}else{
				xmin = graphic.geometry.getExtent().xmin < xmin ? graphic.geometry.getExtent().xmin : xmin;
				xmax = graphic.geometry.getExtent().xmax > xmax ? graphic.geometry.getExtent().xmax : xmax;
				ymin = graphic.geometry.getExtent().ymin < ymin ? graphic.geometry.getExtent().ymin : ymin;
				ymax = graphic.geometry.getExtent().ymax > ymax ? graphic.geometry.getExtent().ymax : ymax;
			}
		}
		var extent = new dong.Extent(xmin,ymin,xmax,ymax, new dong.SpatialReference({ wkid:3857 }));
		app.map.setExtent(extent.expand(1.5));
	});

}
