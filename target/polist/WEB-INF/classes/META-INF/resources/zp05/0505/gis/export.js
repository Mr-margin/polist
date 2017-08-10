/**********************导出图片*****************************/
function export_click () {
    //创建地图打印对象
    var printMap = new dong.PrintTask(ArcGisServerUrl+"/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
    //创建地图打印模版
    var template = new dong.PrintTemplate();
    //创建地图的打印参数，参数里面包括：模版和地图
    var params = new dong.PrintParameters(); 
    //输出图片的空间参考
    printMap.outSpatialReference = app.map.SpatialReference 
    //打印图片的各种参数
    template.exportOptions = { 
        width: 900, 
        height: 600, 
        dpi: 96 
    };
    //打印输出的格式
    template.format = "jpg"; 
//    template.layout = "MAP_ONLY"; // 导出的版式，A3 横向、A3纵向...  
    //输出地图的布局
    template.layout = "MAP_ONLY"; 
    
    template.layoutOptions={  
            titleText:"标题",  
            authorText:"制图单位：",  
            copyrightText:"版权所有：",  
            scalebarUnit:"Kilometers",  
        }  
    dong.PrintTemplate 
    //设置参数地图
    params.map = app.map; 
    //设置参数模版
    params.template = template; 
    //运行结果
    printMap.execute(params, function(result){
    console.log(result)
        if (result != null) { 
            //网页打开生成的地图
            window.open(result.url);
        } 
    }) 
}


function  Print() {
	
	//打印模板
	var template = new dong.PrintTemplate();
	template.format = "JPG";
	template.label = "Portrait (Image)";
	
	template.layout = "printtemplate";//这是本人自定义的地图模板，不是arcgis系统自带的
	

}