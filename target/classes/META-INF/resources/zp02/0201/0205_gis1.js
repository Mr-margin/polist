function  space(){
	$("#space_modal").modal();
	point();
}


//通用属性
var stat = {};
//中心点坐标
stat.cPointx=60;
stat.cPointy=45;
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
		app.gLyr = new dong.GraphicsLayer({"id":"gLyr"});
		app.map.addLayer(app.gLyr);
		
		 /*******************************添加市***************************************/
//		app.xian = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/1", {//市的图层
//			 mode:esri.layers.FeatureLayer.MODE_ONDEMAND,
//		        outFields: ["*"],
//		      });
//		app.map.addLayer(app.xian);
		
		 /*******************************添加县***************************************/
		app.xian = new  FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/0", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
		app.map.addLayer(app.xian);
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
});
var mod2={};
//专题图默认样式
mod2.ztsymbolmr={}
//渲染器样式
mod2.xrclass={};

/**
 * 定位
 */
var xmax = 0,xmin = 0,ymax = 0,ymin = 0;
function space_dingwei(){
	var query = new dong.Query();
	query.where = "ADMINCODE like '"+dataBase.Login_map.REGION+"%' ";
	app.xian.queryFeatures(query, function(featureSet) {
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
	
	
	app.xian.setDefinitionExpression("ADMINCODE  not LIKE '"+dataBase.Login_map.REGION+"%' ");
	var symbol = new dong.SimpleFillSymbol(
	          dong.SimpleFillSymbol.STYLE_SOLID,
	          new dong.SimpleLineSymbol(
	            dong.SimpleLineSymbol.STYLE_SOLID,
	            new dong.Color([255,110,180,0]),//线色
	            0
	          ),
	          new dong.Color([125,125,125,0.5])//面
	        );
	app.xian.setRenderer(new dong.SimpleRenderer(symbol));
}

//图标样式
var iconPath = "M24.0,2.199C11.9595,2.199,2.199,11.9595,2.199,24.0c0.0,12.0405,9.7605,21.801,21.801,21.801c12.0405,0.0,21.801-9.7605,21.801-21.801C45.801,11.9595,36.0405,2.199,24.0,2.199zM31.0935,11.0625c1.401,0.0,2.532,2.2245,2.532,4.968S32.4915,21.0,31.0935,21.0c-1.398,0.0-2.532-2.2245-2.532-4.968S29.697,11.0625,31.0935,11.0625zM16.656,11.0625c1.398,0.0,2.532,2.2245,2.532,4.968S18.0555,21.0,16.656,21.0s-2.532-2.2245-2.532-4.968S15.258,11.0625,16.656,11.0625zM24.0315,39.0c-4.3095,0.0-8.3445-2.6355-11.8185-7.2165c3.5955,2.346,7.5315,3.654,11.661,3.654c4.3845,0.0,8.5515-1.47,12.3225-4.101C32.649,36.198,28.485,39.0,24.0315,39.0z";
var gisUserId =[];
function  point() {
	var data ;

	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	data = ajax_async_t(BackstageIP+"taskDataFillChild/selectLonAndLatCity",{taskId:$("#select_1").val(),version:version,sourceId:$("#zhenduan_select1").val(),status:status},"JSON","1","POST");

	if( data != "" && data != null && data != undefined ){
		if ( data.status == "success" ) {
			gisUserId = [];
			app.gLyr.clear();
			app.xian.clear();
			app.map.removeLayer(app.xian);
			app.xian = new  dong.FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/0", {mode:esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"]});
			app.map.addLayer(app.xian);
			$.each(data.data,function(i,item){
				 gisUserId[i] = {"id":item.id,"companyId":item.companyId};
		         var pt=new dong.Point(handle_x(item.x),handle_y(item.y), new dong.SpatialReference({ wkid: 3857 }));
				 var infoTemplate = new esri.InfoTemplate("基本信息", "企业名称: "+item.name+"<br>经度:"+item.x+"<br>维度:"+item.y);
		         var graphic = new esri.Graphic(pt,createSymbol(iconPath, "#ff0000"),data.data[i],infoTemplate);
		         app.gLyr.add(graphic);
			 });
			 test();
		} else {
			return toastr["info"]("", "空间分析获取数据失败");
		}
	} else {
		return toastr["info"]("", "空间分析获取数据失败");
	}
	
}
//初始样式以及颜色
function createSymbol(path, color){
    var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
    markerSymbol.setPath(path);
    markerSymbol.setColor(new dojo.Color(color));
    markerSymbol.setOutline(null);
    return markerSymbol;
};


var selectedGraphics = new Array();

var gis_data = new Array();
//区域内换色，组织数据
function test(){
	gis_data = [];
	var query = new dong.Query();
	query.where =  "ADMINCODE like '"+dataBase.Login_map.REGION+"%' ";
	app.xian.queryFeatures(query, function(extent) {
         app.map.setMapCursor("default");
         var graphics = app.gLyr.graphics;
         console.log(graphics);
         var k = 0;
         for(var i= 0, total=graphics.length;i<total;i++){//循环图层上的点
        	 
        	 for ( var j = 0 ; j < extent.features.length ; j ++  ) {//循环图层上的县
        		 if(extent.features[j].geometry.contains(graphics[i].geometry)){
        			 graphics[i].symbol = createSymbol(iconPath,"#0000EE");
        			 app.gLyr.redraw();
//        			 code_tongguo.push(graphics[i].attributes.id);
        			 gis_region = extent.features[j].attributes.ADMINCODE
        			 gis_data[k] = {"pass":graphics[i].attributes.id,"region":extent.features[j].attributes.ADMINCODE};
        			 k++;
        		 }
        	 }
         }
	});
	space_dingwei();
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
//空间诊断
function space_zhenduan(){
	var ste = {}
	ste.pass=gis_data;
	ste.taskId=$("#select_1").val();
	ste.userId = dataBase.Login_map.SOLE
	ste.gisUserId= gisUserId;
	ste.userType = "4";
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/passAndRej",{data:JSON.stringify(ste)},"JSON","1","POST");
	if(data != "" && data != null && data != undefined ) {
		if ( data.status == "success" ) {
			$("#space_modal").modal("hide");
			uptbody();
			return toastr["success"]("", "空间分诊断成功");
		} else {
			return toastr["info"]("", "空间分诊断失败");
		}
	} else {
		return toastr["info"]("", "空间诊断失败");
	}
}
