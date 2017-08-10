//仅点源
function point(){
	 app.map.setExtent(new dong.Extent({
		 "xmin": 8180595.1985,
		 "ymin": 2051330.0834,
		 "xmax": 15038957.856799997,
		 "ymax": 7087544.693899997,
		 "spatialReference": {
		 "wkid": 102100
		 }
		 }));
	app.gLyr.show();
	var region_code =adCode();
	var data;
	if ( zdy_type == "1" ) {
		data = ajax_async_t(BackstageIP+"showCountryList/customFindPointCompany",{bookId:$("#bookId").val(),species:$('input[name="wz"]:checked').val(),scc2:chosse_hy,region:region_code,customConditions:JSON.stringify(zdysj)},"json");
	}  else {
		parent.fu_customConditions = "";
		data = ajax_async_t(BackstageIP+"showCountryList/findPointCompany",{bookId:$("#bookId").val(),species:$('input[name="wz"]:checked').val(),scc2:chosse_hy,region:region_code},"json");
	}
	console.log(data);
	if ( data != null && data != "" && data != undefined ) {
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
//			 var attr = item.SPECIES; 
			 var infoTemplate = new esri.InfoTemplate("基本信息", "所属企业: "+item.COMPANY_NAME+"<br/>组织机构代码: "+item.COMPANY_ID+" <br/>行业类别: "+item.SCC2+"<br/>主要污染物排放量（单位:吨):<br>"+$('input[name="wz"]:checked').val()+":"+item.SPECIES+"<div><a onclick='qyMessage("+item.COMPANY_ID+",\""+item.COMPANY_NAME+"\","+item.REGION_ID+")'>查看详情</a> </div>");
			 var point = new dong.Point(handle_x(item.LON),handle_y(item.LAT), new dong.SpatialReference({ wkid: 3857 }));
			 var graphic = new dong.Graphic(point,pointSymbol,"",infoTemplate);  
			 app.gLyr.add(graphic);
		})
		$("#point_tuli").show();
	} else {
		toastr["info"]("暂无数据");
	}
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
//企业详细信息
function  qyMessage (companyId,companyName,regionId){
	window.parent.$("#yincang_caidan").attr("href","zp05/0505/companylist.html?companyId="+companyId+"&companyName="+companyName+"&bookId="+$("#bookId").val()+"&regionId="+regionId);
	window.parent.$("#yincang_caidan").html(companyName);
	window.parent.$("#yincang_caidan").click();
}
