//通用属性
var stat = {};
var REGION=parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';
//中心点坐标
stat.cPointx=116;
stat.cPointy=35;
var app = {};
var dong = {};

require(
	[
	 	"esri/map",
	 	"esri/layers/FeatureLayer",
	 	"esri/layers/GraphicsLayer",
	 	"esri/symbols/SimpleFillSymbol",
	 	"esri/symbols/SimpleLineSymbol",
	 	"esri/symbols/SimpleMarkerSymbol",
	 	"esri/renderers/ClassBreaksRenderer",
	 	"esri/geometry/Point",
	 	"esri/geometry/Extent",
        "esri/renderers/SimpleRenderer",
        "esri/graphic",
        "dojo/_base/Color",
        "dojo/dom-style",
        "esri/tasks/FeatureSet",
        "esri/SpatialReference",
        "tdlib/gaodeLayer",
        "esri/InfoTemplate",
        "esri/tasks/query",
        "esri/renderers/UniqueValueRenderer",
        "dojo/domReady!"
	],
	function(Map,FeatureLayer,GraphicsLayer,SimpleFillSymbol,SimpleLineSymbol,SimpleMarkerSymbol,ClassBreaksRenderer,Point,Extent,SimpleRenderer,
			Graphic,Color,style,FeatureSet,SpatialReference,gaodeLayer,InfoTemplate,query,UniqueValueRenderer) {
		dong.gaodeLayer = gaodeLayer;
		dong.Graphic = Graphic;
		dong.Point = Point;
		dong.GraphicsLayer = GraphicsLayer;
		dong.SpatialReference = SpatialReference;
		dong.SimpleLineSymbol = SimpleLineSymbol ;
		dong.FeatureLayer = FeatureLayer ;
		dong.SimpleRenderer = SimpleRenderer ;
		dong.SimpleFillSymbol = SimpleFillSymbol;
		dong.Color = Color;
		dong.ClassBreaksRenderer = ClassBreaksRenderer;
		dong.UniqueValueRenderer = UniqueValueRenderer ;
		dong.InfoTemplate = InfoTemplate;
		dong.Query = query;
		dong.Extent = Extent;
		/*****************************************************/
		app.map = new Map("mapDiv", {
			logo:false,
	        center: [stat.cPointx, stat.cPointy],
	        minZoom:3,
	        maxZoom:13,
	        zoom: 3
		});
		app.baselayerList = new dong.gaodeLayer();
		app.stlayerList = new dong.gaodeLayer({layertype: "st"});
		app.labellayerList = new dong.gaodeLayer({layertype: "label"});
		app.map.addLayer(app.baselayerList);//添加高德地图到map容器
		app.map.addLayers([app.baselayerList]);//添加高德地图到map容器
		app.gLyr = new dong.GraphicsLayer({"id":"gLyr"});
		app.map.addLayer(app.gLyr);
		
		app.country = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/country/MapServer/0");
		app.map.addLayer(app.country);
		dojo.connect(app.country, "onClick", country);
		app.country.hide();
		/****************************添加省*********************************************/
		app.sheng = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/2", {//添加省的图层
		        outFields: ["*"]
		      });
		 app.map.addLayer(app.sheng);
		 //缩放
		 dojo.connect(app.map, "onZoomEnd", resizess);
		 //点击
		 dojo.connect(app.sheng, "onClick", optionclick);
		 /*******************************添加市***************************************/
		 app.shi = new dong.FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/1", {//市的图层
		        outFields: ["*"]
		      });
		app.map.addLayer(app.shi);
		dojo.connect(app.shi, "onClick", optionclick);
		app.shi.hide();
		app.sheng.on("load",dingwei);	
		/************************************************/
		//省的边界线
		app.quyu = new FeatureLayer(ArcGisServerUrl+"/arcgis/rest/services/polist/cms/MapServer/2", {//添加省的边界线
	        outFields: ["*"]
	      });
});
//点击面
var pitch_on = "";//地区地图中的地区是否选中；
function optionclick (event){
	var ADMINCODE=event.graphic.attributes.ADMINCODE;
	 var regions=$("input[name='city']");
	 $("input[type='checkbox'][name='city']").removeAttr('checked');//全部取消选中状态
	 for(var i=0;i<regions.length;i++){
         if(regions[i].value==event.graphic.attributes.ADMINCODE){
        	 regions[i].checked=true;
       }
    }  
	 if(ADMINCODE==REGION){
		 $("#p")["0"].checked = true;
  		 all_checkbox1();
  	   
     }
	app.map.graphics.clear();
	// 高亮线  
     var highlightSymbol = new esri.symbol.SimpleFillSymbol(  
         esri.symbol.SimpleFillSymbol.STYLE_SOLID,  
         new esri.symbol.SimpleLineSymbol(  
             esri.symbol.SimpleLineSymbol.STYLE_SOLID,
             new dojo.Color([255,0,0]), 3  
         ),  
         new dojo.Color([0,255,127,0.35])  
     ); 
     var highlightGraphic = new esri.Graphic(  
    		 event.graphic.geometry,  
             highlightSymbol  
       );  
     app.map.graphics.add(highlightGraphic);  
     if( event.graphic.attributes.ADMINCODE == "" || event.graphic.attributes.ADMINCODE == null || event.graphic.attributes.ADMINCODE == undefined ) {
    	 optRegion=event.graphic.attributes.ADMINCODE;
    	 $('#metTable1').bootstrapTable('destroy');	//销毁现有表格数据
    	 metTable_initialization();
    	 show(optRegion,null);
    	 pitch_on = "1";
     } else {
    	 optRegion=event.graphic.attributes.ADMINCODE;
    	 $('#metTable1').bootstrapTable('destroy');	//销毁现有表格数据
    	 metTable_initialization();
    	 show(optRegion,null);
    	 pitch_on = "1";
     }
}
//缩放事件
function resizess(event){
	console.log(app.map.getScale().toFixed())
	if(parent.dataBase.Login_map.TYPE == "1" ){
		if ( app.map.getScale().toFixed() > 73957190 ) {
			app.country.show();
			app.sheng.hide();
			app.map.graphics.clear();
		} else {
			app.country.hide();
			app.country.setRenderer(new dong.SimpleRenderer(new dong.SimpleFillSymbol(dong.SimpleFillSymbol.STYLE_SOLID,null, new dojo.Color([0,255,127,0]))));
			app.sheng.show();
			
		}
		 pitch_on = "";
	} else {
		if ( app.map.getScale().toFixed() > 9244649 ) {
			app.sheng.show();
			app.shi.hide();
			app.map.graphics.clear();
		} else {
			app.shi.show();
			app.sheng.hide();
			app.map.graphics.clear();
		}
		pitch_on = "";
	}
}
var xmax = 0,xmin = 0,ymax = 0,ymin = 0;
//进行定位
function dingwei(){
	if ( parent.dataBase.Login_map.TYPE == 1 ) {
		app.sheng.hide();
		app.country.show();
		 app.map.setExtent(new Extent({
			 "xmin": 8180595.1985,
			 "ymin": 2051330.0834,
			 "xmax": 15038957.856799997,
			 "ymax": 7087544.693899997,
			 "spatialReference": {
			 "wkid": 102100
			 }
			 }));
	} else {
		app.quyu.setDefinitionExpression("ADMINCODE <> '"+parent.dataBase.Message_map.REGION+"'");
		var symbol = new dong.SimpleFillSymbol(
		          dong.SimpleFillSymbol.STYLE_SOLID,
		          new dong.SimpleLineSymbol(
		            dong.SimpleLineSymbol.STYLE_SOLID,
		            new dong.Color([255,110,180,0]),//线色
		            0
		          ),
		          new dong.Color([125,125,125,0.5])//面
		        );
		app.quyu.setRenderer(new dong.SimpleRenderer(symbol));
		app.map.addLayer(app.quyu);
		
		var query = new dong.Query();
		query.where = "ADMINCODE in ('"+parent.dataBase.Message_map.REGION+"')";
		app.sheng.queryFeatures(query, function(featureSet) {
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
}
//默认高亮
function showHighlight(optRegionId,sds){//高亮
	setTimeout(code, 500); 
	function code(){
		var query = new dong.Query();
		var str = "";
		if(sds=="1"){
			str = app.sheng;
			query.where = "ADMINCODE in ('"+optRegionId+"')";
		} else if(sds=="2") {
			str = app.shi;
			query.where = "ADMINCODE in ('"+optRegionId+"')";
		}
		str.queryFeatures(query, function(featureSet) {
			console.log(featureSet)
		    var highlightSymbol = new esri.symbol.SimpleFillSymbol(  
		            esri.symbol.SimpleFillSymbol.STYLE_SOLID,  
		            new esri.symbol.SimpleLineSymbol(  
		                esri.symbol.SimpleLineSymbol.STYLE_SOLID,
		                new dojo.Color([255,0,0]), 3  
		            ),  
		            new dojo.Color([0,255,127,0.35])
		        ); 
		        var highlightGraphic = new esri.Graphic(  
		        		featureSet.features[0].geometry,  
		                highlightSymbol  
		          ); 
		        app.map.graphics.add(highlightGraphic); 
		});
	}
}
/**
 * 全选国家
 * @param event
 */
function country(){
	app.country.setDefinitionExpression("ADMINCODE <> '123456'");
	var symbol = new dong.SimpleFillSymbol(
	          dong.SimpleFillSymbol.STYLE_SOLID,
	          new dong.SimpleLineSymbol(
	            dong.SimpleLineSymbol.STYLE_SOLID,
	            new dojo.Color([255,0,0]), 3  
	          ),
	          new dojo.Color([0,255,127,0.35])
	        );
	app.country.setRenderer(new dong.SimpleRenderer(symbol));

	 optRegion="000000";
	 $('#metTable1').bootstrapTable('destroy');	//销毁现有表格数据
	 metTable_initialization();
	 show(optRegion,null);

}