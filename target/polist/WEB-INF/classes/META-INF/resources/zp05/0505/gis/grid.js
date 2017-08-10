//栅格
function grid(){
//	app.country.show();
	
	try {app.map.removeLayer(app.gpResultLayer);} catch (e) {}
	polist_gp();
	return;
	var dynamicLayerInfos=app.dynamicData.createDynamicLayerInfosFromLayerInfos();
	var dynamicLayerInfo = new dong.DynamicLayerInfo();
	dynamicLayerInfo.id = 996;
	dynamicLayerInfo.defaultVisibility = false;
	dynamicLayerInfo.name = "reuslt";
	var dataSource = new dong.RasterDataSource();
	dataSource.workspaceId = "workspace";
	dataSource.dataSourceName = "reuslt.tiff";
	var layerSource = new dong.LayerDataSource();
	layerSource.dataSource = dataSource;
	dynamicLayerInfo.source = layerSource;
	dynamicLayerInfos.push(dynamicLayerInfo);
	app.dynamicData.setDynamicLayerInfos(dynamicLayerInfos);
	
	
	
	
	var drawingOptions = new dong.LayerDrawingOptions();
    drawingOptions.renderer = new dong.SimpleRenderer(
       new dong.SimpleFillSymbol("solid", null,
          new dong.Color([0, 150, 255, 1])
       ));
    
    var options = [];
    options[0] = drawingOptions;

    app.dynamicData.setLayerDrawingOptions(options);
    var drawingOptions = new dong.LayerDrawingOptions();
    drawingOptions.renderer = new dong.SimpleRenderer(
       new dong.SimpleFillSymbol("solid", null,
          new dong.Color([0, 150, 255, 1])
       ));
    var options = [];
    options[0] = drawingOptions;

    app.dynamicData.setLayerDrawingOptions(options);
    
    app.dynamicData.setVisibleLayers([996]);
    gpService();
    return;
}
function  polist_gp(){
	$("#zhezhao").show();
	$("#zhezhao_title").show();
	
	var myDate = new Date();
	var v1 = myDate.getTime();
	
	var str = $('input[name="wz"]:checked').val();
	
	app.gp = new dong.Geoprocessor(ArcGisServerUrl+"/arcgis/rest/services/tiff/"+str+"/GPServer/"+str+"/");
	var a1 = new dong.RasterData();
	a1.format = "tiff";
	a1.url = encodeURI(BackstageIP+"showCountryList/downloadTiff?bookId="+$("#bookId").val()+"&species="+str+"&scc="+$('input[name="g"]:checked').val()); 
//	a1.url = encodeURI("http://feelxing33.6655.la/showCountryList/downloadTiff?bookId=628&species=PM25&scc=电力"); 
	console.log(a1.url)
	console.log(ArcGisServerUrl+"/arcgis/rest/services/tiff/"+str+"/GPServer/"+str+"/")
	var parms = {
			"a1" : a1,
			"f1" : "out_raster_layer"
		};
	var symbol = new dong.SimpleFillSymbol(
	          dong.SimpleFillSymbol.STYLE_SOLID,
	          new dong.SimpleLineSymbol(
	            dong.SimpleLineSymbol.STYLE_SOLID,
	            new dong.Color([255,110,180,0]),//线色
	            0
	          ),
	          new dong.Color([125,125,125,0.5])//面
	        );
	app.gp.submitJob(parms, function(jobInfo,result){
		console.log(result)
		console.log(jobInfo);
		app.gpResultLayer = app.gp.getResultImageLayer(jobInfo.jobId, "f1");//这里的名字是跟着返回图层的变量名走的，不一样的话是不出图的
		//需要判断一下是否已经添加过图层，先移除，再添加
		var out_raster_layer = app.map.getLayer('out_raster_layer');
	    if(out_raster_layer){
	    	app.map.removeLayer(out_raster_layer);
	    }
	    app.map.addLayer(app.gpResultLayer);
		var myDate2 = new Date();
		var v2 = myDate2.getTime();
		console.log(v2-v1);
		
	}, function(jobinfo){
		console.log(jobinfo);
		var jobstatus = '';
	    switch (jobinfo.jobStatus) {
	      case 'esriJobSubmitted':
	        jobstatus = '图一正在提交...';
	        break;
	      case 'esriJobExecuting':
	        jobstatus = '图一处理中...';
	        break;
	      case 'esriJobSucceeded':
	    	jobstatus = '图一处理完成...';
	    	
	    	$("#grid_tuli").show();
	    	$.each(grid_wz,function(i,o){
	    		$("#"+o).hide();
	    	})
	    	$("#"+$('input[name="wz"]:checked').val()).show()
	    	$("#zhezhao").hide();
	    	$("#zhezhao_title").hide();
	    	toastr["success"]("栅格加载完成");
	        break;
	    }
	    if(jobstatus == "" || jobstatus ==null || jobstatus == undefined ){
	    	$("#zhezhao").hide();
	    	$("#zhezhao_title").hide();
	    	toastr["info"]("没有请求到栅格文件");
	    }
	}, function(error){
		console.log("图一"+error);
		$("#zhezhao").hide();
    	$("#zhezhao_title").hide();
	});
}

function country() {
//	alert(1)
}