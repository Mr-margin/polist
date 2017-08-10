var taskId = "";
var version = "1.0";
var edit_state_url = BackstageIP+"dto/insert.do";//默认执行新建地址
var stype = "";//编辑还是保存

//$.fn.editableform.buttons = 
//	  '<button type="submit" class="btn btn-success editable-submit btn-mini"><i class="icon-ok icon-white"></i></button>' +
//	 '<button type="button" class="btn editable-cancel btn-mini"><i class="icon-remove"></i></button>';   

var map = new BMap.Map("map",{
	mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]
});
var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
map.addControl(new BMap.NavigationControl(opts));

$(function (){
	if(typeof window.sessionStorage.getItem("taskId") != "undefined"){
		taskId = window.sessionStorage.getItem("taskId");
		stype = window.sessionStorage.getItem("type");
		if ( stype == "look" ) {
			$("#edit").hide();
		}
	}else{
		//没有获取到任务ID，所有按钮关闭
		$("#edit").hide();
		$("#save").hide();
		$("#close").hide();
	}
	
	$("#out_login").click(function(){
		var data = ajax_async_t("../../login_out.do",{},"json");
		if(data=="1"){
			window.location.href="../../index.html"
		} else {
			
		}
	});
	
	$("#update_password").click(function(){
		$("#old_pass").val("");
		$("#new_pass").val("");
		$("#new_pass_2").val("");
		$( "#dialog-update").dialog("open");
	});
	//修改密码
	$( "#dialog-update").dialog({
		autoOpen: false,
		width: 500,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "400",
		buttons: [{
			text: "确定",
			click: function() {
				var str = $("#new_pass").val();
				var str1 = $("#new_pass_2").val();
				var old_pass = $("#old_pass").val();
				if(old_pass == "" || old_pass == null || old_pass == undefined ) {
					$("#jiaoyan_1").html("不能为空");
				}else if(str == "" || str == null || str == undefined ) {
					$("#jiaoyan_2").html("新密码不能为空");
				} else if(str1 == "" || str1 == null || str1 == undefined ) {
					$("#jiaoyan_3").html("不能为空");
				} else if( str != str1){
					$("#jiaoyan_3").html("新密码不相同");
				}else{
					xiugaimima_anniu(old_pass,str);
				}
			}
		},{
			text: "取消",
			click: function() {
				$( this ).dialog( "close" );
			}
		}]
	});
	$( "#dialog-xmsb").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	$( "#dialog-tiaozhuan").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	$( "#dialog-dengdai").dialog({
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	//企业行业类别，通过监听html的变化实现
	$("#industrytype").bind('DOMNodeInserted', function(e) {});
	
	
	   // 创建Map实例
	map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));  //添加地图类型控件
//	map.centerAndZoom("内蒙古",11);   // 设置地图显示的城市 此项是必须设置的
	map.disableScrollWheelZoom();
	map.disableDragging();
	
	$("#lon1").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lon2").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lon3").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lat1").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lat2").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	$("#lat3").bind('DOMNodeInserted', function(e) {
		get_lon_lat();
	});
	//初始化编辑控件
	$.each(columns, function(i, column) {
		column.emptytext = emptytext;
		$("#"+column.field).editable(column);
	});
	//页面初始化，加载企业信息
	Load_enterprise();
	
	//编辑按钮事件
	$("#edit").click(function(){
		$("#edit").hide();
		$("#save").show();
		$("#close").show();
		$('.editable').editable('enable');
		
		$('#prov').editable('disable');
		$('#city').editable('disable');
		
		$("#add_rlxx").show();
		$("#add_cpxx").show();
		$("#add_pfk").show();
		$("#add_zbfdz").show();
		$("#add_zbfdz_md").show();
		$("#add_guolu_md").show();
		$("#add_yaolu_md").show();
		$("#add_yfl").show();
		$("#add_yfl_md").show();
		$("#add_rjsy").show();
		$("#add_yjytcg").show();
		$("#add_yjytzz").show();
		$("#add_ltdc").show();
		
		$("#add_yfl_yl").show();
		$("#add_yfl_fl").show();
		$("#add_yfl_cp").show();
	});
	
	
	//保存按钮事件
	$("#save").click(function(){
		
		//首先校验数据，必填项通过后，可以执行保存方法
		var check_Result = Data_check();
//		console.log(check_Result);
		if(check_Result.length>0){
			//有错误，出提示框
			console.log(check_Result);
			var str_html = "<ul style='color:red'>";
			for(var i = 0;i<check_Result.length;i++){
				str_html += "<li>"+check_Result[i]+"</li>";
			}
			str_html += "</ul>";
			$("#dialog-xmsb-content").html(str_html);
			$("#dialog-xmsb").dialog("open");
		}else{
			//没有错误，执行保存
			Data_save();
//			if(Data_save()){}
		}
	});
	
	//取消按钮事件
	$("#close").click(function(){
		$("#edit").show();
		$("#save").hide();
		$("#close").hide();
		//页面初始化，加载企业信息
//		Load_enterprise();
		$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
	});
	
	//取消返回事件
	$("#close_Return").click(function(){
		window.location.href="../a.html";
	});
	
	//首页的跳转事件
	$("#sy").click(function(){
		if ( stype != "look" ) {
			if(edit_show()){
				window.location.href="../a.html";
			}else{
				//如果任务ID有内容，说明处于正常的编辑状态，不允许跳转
				if(taskId != ""){
					if( edit == false ) {
						window.location.href="../a.html";
					} else {
						$("#dialog-tiaozhuan-content").html("离开当前页面将无法保存您的信息，请保存或取消后继续操作。");
						$("#dialog-tiaozhuan").dialog("open");
					}
				}else{
					//任务ID为空说明页面不正常，可以跳转到其他页面
					window.location.href="../a.html";
				}
				
			}
		} else {
			window.location.href="../a.html";
		}
	});
	
	
	$("#add_rlxx").click(function(){add_rlxx()});
	$("#add_cpxx").click(function(){add_cpxx()});
	$("#add_pfk").click(function(){add_pfk()});
	$("#add_zbfdz").click(function(){add_zbfdz()});
	$("#add_zbfdz_md").click(function(){add_zbfdz_md()});
	$("#add_guolu_md").click(function(){add_guolu_md()});
	$("#add_yaolu_md").click(function(){add_yaolu_md()});
	$("#add_yfl").click(function(){add_yfl()});
	$("#add_yfl_md").click(function(){add_yfl_md()});
	$("#add_rjsy").click(function(){add_rjsy()});
	$("#add_yjytcg").click(function(){add_yjytcg()});
	$("#add_yjytzz").click(function(){add_yjytzz()});
	$("#add_ltdc").click(function(){add_ltdc()});
	
//	$("#add_yfl_yl").click(function(){add_yfl_yl()});
//	$("#add_yfl_fl").click(function(){add_yfl_fl()});
//	$("#add_yfl_cp").click(function(){add_yfl_cp()});
	
	$("#boilernumbers").bind('DOMNodeInserted', function(e) {//锅炉数
		if( $(e.target).html() != "" || $(e.target).html() != "0" ) {
			for ( var k = Number($("#add_guolu_table tr").length)-1 ; k >0 ; k --){
				if ( k > 1){
					$("#add_guolu_table tr")[k].remove();
				}
			}
			for( var i = 0 ; i < $(e.target).html(); i ++ ) {
				var index = (new Date()).valueOf();
				var kongzhi = "<tr id=\"guolu"+index+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"boileruse\"></a></td>" +
						"<td><a id=\"capacity\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"enddate\"></a></td>" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"afueltotal\"></a></td>" +
						"<td><a id=\"sulfur\"></a></td>" +
						"<td><a id=\"ash\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td></tr>" ;
				$("#add_guolu_table").append(kongzhi);
				$.each(columns_guolu, function(i, column) {
					column.emptytext = emptytext;
					$("#guolu"+index+" #"+column.field).editable(column);
				});
			
			}
		}
});
	$("#kilnnumbers").bind('DOMNodeInserted', function(e) {//工业窑炉数
		if( $(e.target).html() != "" || $(e.target).html() != "0" ) {
			for ( var k = Number($("#add_yaolu_table1 tr").length)-1 ; k >0 ; k --){
				if ( k > 1){
					$("#add_yaolu_table1 tr")[k].remove();
				}
			}
			for ( var k = Number($("#add_yaolu_table2 tr").length)-1 ; k >0 ; k --){
				if ( k > 1){
					$("#add_yaolu_table2 tr")[k].remove();
				}
			}
			for( var i = 0 ; i < $(e.target).html(); i ++ ) {
				var index = (new Date()).valueOf();
				 var kongzhi = "<tr id=\"yaolu"+index+"ver\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"enddate\"></a></td>" +
						"<td><a id=\"materialtype\"></a></td>" +
						"<td><a id=\"amaterialtotal\"></a></td>" +
						"<td><a id=\"materialsulfur\"></a></td></tr>";
				$("#add_yaolu_table1").append(kongzhi);
				var kongzhi1 = "<tr id=\"yaolu"+index+"ver\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"afueltotal\"></a></td>" +
						"<td><a id=\"sulfur\"></a></td>" +
						"<td><a id=\"aproducttype\"></a></td>" +
						"<td><a id=\"aproducttotal\"></a></td>" +
						"<td><a id=\"pfkids1\"></a></td>" +
						"<td><a id=\"pfkids2\"></a></td></tr>";
				$("#add_yaolu_table2").append(kongzhi1);
				$.each(columns_yaolu, function(i, column) {
					column.emptytext = emptytext;
					$("#yaolu"+index+"ver #"+column.field).editable(column);
					$("#yaolu"+index+" #"+column.field).editable(column);
				});
			}
		}
});
});
function add_rlxx(){//添加燃料信息表 
		var index = (new Date()).valueOf();
		var kongzhi = "<tr id=\"rlxx"+index+"\" class=\"zhong\"  height=\"35px\">" +
				"<td><a id=\"fueltype\"></a></td>" +
				"<td><a id=\"fuelunit\"></a></td>" +
				"<td><a id=\"totalfuel\"></a></td>" +
				"<td><a id=\"fuel1\"></a></td>" +
				"<td><a id=\"fuel2\"></a></td>" +
				"<td><a id=\"fuel3\"></a></td>" +
				"<td><a id=\"fuel4\"></a></td>" +
				"<td><a id=\"fuel5\"></a></td>" +
				"<td><a id=\"fuel6\"></a></td>" +
				"<td><a id=\"fuel7\"></a></td>" +
				"<td><a id=\"fuel8\"></a></td>" +
				"<td><a id=\"fuel9\"></a></td>" +
				"<td><a id=\"fuel10\"></a></td>" +
				"<td><a id=\"fuel11\"></a></td>" +
				"<td><a id=\"fuel12\"></a></td>" +
				"<td style='display:none;'><a id=\"status\"></a></td>" +
				"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_rlxx_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
		$("#add_rlxx_table").append(kongzhi);
		$.each(columns_rlxx, function(i, column) {
			column.emptytext = emptytext;
			$("#rlxx"+index+" #"+column.field).editable(column);
		});
		return index;
	}
function add_cpxx (){//添加产品信息表  
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"cpxx"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"productname\"></a></td>" +
			"<td><a id=\"prounit\"></a></td>" +
			"<td><a id=\"producttotal\"></a></td>" +
			"<td><a id=\"product1\"></a></td>" +
			"<td><a id=\"product2\"></a></td>" +
			"<td><a id=\"product3\"></a></td>" +
			"<td><a id=\"product4\"></a></td>" +
			"<td><a id=\"product5\"></a></td>" +
			"<td><a id=\"product6\"></a></td>" +
			"<td><a id=\"product7\"></a></td>" +
			"<td><a id=\"product8\"></a></td>" +
			"<td><a id=\"product9\"></a></td>" +
			"<td><a id=\"product10\"></a></td>" +
			"<td><a id=\"product11\"></a></td>" +
			"<td><a id=\"product12\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_cpxx_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_cpxx_table").append(kongzhi);
	$.each(columns_cpcl, function(i, column) {
		column.emptytext = emptytext;
		$("#cpxx"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_pfk(){//添加排放口信息表  
	var index = (new Date()).valueOf();
	var str = $("#add_pfk_table tr").find("#pfkid").editable("getValue").pfkid;
	if( str == undefined || str == "NaN") str = 1 ;
	else str = Number(str)+1;
	var kongzhi = "<tr id=\"pfk"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"pfkid\">"+str+"</a></td>" +
			"<td><a id=\"pfkheight\"></a></td>" +
			"<td><a id=\"pfkdiameter\"></a></td>" +
			"<td><a id=\"pfkspeed\"></a></td>" +
			"<td><a id=\"pfkvolume\"></a></td>" +
			"<td><a id=\"pfktemperature\"></a></td>" +
			"<td><a id=\"pfkoratio\"></a></td>" +
			"<td><a id=\"installornot\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_pfk_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_pfk_table").append(kongzhi);
	$.each(columms_pfk, function(i, column) {
		column.emptytext = emptytext;
		$("#pfk"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_zbfdz (){
	//添加自备发电机组信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"zbfdz"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"capacity\"></a></td>" +
			"<td><a id=\"startdate\"></a></td>" +
			"<td><a id=\"enddate\"></a></td>" +
			"<td><a id=\"powertotal\"></a></td>" +
			"<td><a id=\"heattotal\"></a></td>" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"fuelunit\"></a></td>" +
			"<td><a id=\"afueltotal\"></a></td>" +
			"<td><a id=\"sulfur\"></a></td>" +
			"<td><a id=\"ash\"></a></td>" +
			"<td><a id=\"pfkids\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_zbfdz_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_zbfdz_table").append(kongzhi);
	$.each(columns_zbfdz, function(i, column) {
		column.emptytext = emptytext;
		$("#zbfdz"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_zbfdz_md(){//添加自备发电机组信息表——末端控制措施信息表 
		var index = (new Date()).valueOf();
		var kongzhi = "<tr id=\"zbfdz_md"+index+"\" class=\"zhong\"  height=\"35px\">" +
				"<td><a id=\"etaSO2name\"></a></td>" +
				"<td><a id=\"etaSO2hours\"></a></td>" +
				"<td><a id=\"etaSO2\"></a></td>" +
				"<td><a id=\"equipIdso2\"></a></td>" +
				
				"<td><a id=\"etaNOxname\"></a></td>" +
				"<td><a id=\"etaNOxhours\"></a></td>" +
				"<td><a id=\"etaNOx\"></a></td>" +
				"<td><a id=\"equipIdnox\"></a></td>" +
				
				"<td><a id=\"etaPMname\"></a></td>" +
				"<td><a id=\"jiqiratio\"></a></td>" +
				"<td><a id=\"etaPM\"></a></td>" +
				"<td><a id=\"equipIdpm\"></a></td>" +
				
				"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_zbfdz_md_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
		$("#add_zbfdz_md_table").append(kongzhi);
		$.each(columns_mdkz, function(i, column) {
			column.emptytext = emptytext;
			$("#zbfdz_md"+index+" #"+column.field).editable(column);
		});
		return index;
	}
function add_guolu_md () {//添加锅炉信息表——末端控制措施信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"guolu_md"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"etaSO2hours\"></a></td>" +
			"<td><a id=\"etaSO2\"></a></td>" +
			"<td><a id=\"equipIdso2\"></a></td>" +
			
			"<td><a id=\"etaNOxname\"></a></td>" +
			"<td><a id=\"etaNOxhours\"></a></td>" +
			"<td><a id=\"etaNOx\"></a></td>" +
			"<td><a id=\"equipIdnox\"></a></td>" +
			
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"jiqiratio\"></a></td>" +
			"<td><a id=\"etaPM\"></a></td>" +
			"<td><a id=\"equipIdpm\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_guolu_md_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_guolu_md_table").append(kongzhi);
	$.each(columns_mdkz2, function(i, column) {
		column.emptytext = emptytext;
		$("#guolu_md"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yaolu_md(){//添加窑炉信息表——末端控制措施信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yaolu_md"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"equipIdso2\"></a></td>" +
			"<td><a id=\"etaSO2\"></a></td>" +
			"<td><a id=\"pfkids\"></a></td>" +
			
			"<td><a id=\"etaNOxname\"></a></td>" +
			"<td><a id=\"equipIdnox\"></a></td>" +
			"<td><a id=\"etaNOx\"></a></td>" +
			"<td><a id=\"pfkids\"></a></td>" +
			
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"jiqiratio\"></a></td>" +
			"<td><a id=\"etaPM\"></a></td>" +
			"<td><a id=\"equipIdpm\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yaolu_md_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yaolu_md_table").append(kongzhi);
	$.each(columns_mdkz3, function(i, column) {
		column.emptytext = emptytext;
		$("#yaolu_md"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yfl (){//添加原辅料及产品信息表
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yfl"+index+"ver\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"startdate\"></a></td>" +
			"<td><a id=\"materialtype\"></a></td>" +
			"<td><a id=\"materialunit\"></a></td>" +
			"<td><a id=\"amaterialtotal\"></a></td>" +
			"<td><a id=\"pfkids\"></a></td></tr>" ;
	$("#add_yfl_table1").append(kongzhi);
	
	var kongzhi1 = "<tr id=\"yfl"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"fulmaterialname\"></a></td>" +
			"<td><a id=\"fulmaterialunit\"></a></td>" +
			"<td><a id=\"afulmaterialtotal\"></a></td>" +
			"<td><a id=\"aproducttype\"></a></td>" +
			"<td><a id=\"productunit\"></a></td>" +
			"<td><a id=\"aproducttotal\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yfl_table2')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yfl_table2").append(kongzhi1);
	$.each(columns_yfl, function(i, column) {
		column.emptytext = emptytext;
		$("#yfl"+index+" #"+column.field).editable(column);
		$("#yfl"+index+"ver #"+column.field).editable(column);
	});
	return index;
}
function add_yfl_md(){//添加原辅料及产品信息表——末端控制措施信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yfl_md"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"etaSO2hours\"></a></td>" +
			"<td><a id=\"etaSO2\"></a></td>" +
			"<td><a id=\"equipIdso2\"></a></td>" +
			
			"<td><a id=\"etaVOChsname\"></a></td>" +
			"<td><a id=\"equipIdvochs\"></a></td>" +
			"<td><a id=\"etaVOCxhname\"></a></td>" +
			"<td><a id=\"equipIdvocxh\"></a></td>" +
			
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"jiqiratio\"></a></td>" +
			"<td><a id=\"etaPM\"></a></td>" +
			"<td><a id=\"equipIdpm\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yfl_md_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yfl_md_table").append(kongzhi);
	$.each(columns_mdkz4, function(i, column) {
		column.emptytext = emptytext;
		$("#yfl_md"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_rjsy(){//添加溶剂使用信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"rjsy"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"asolventtypename\"></a></td>" +
			"<td><a id=\"asolventname\"></a></td>" +
			"<td><a id=\"solventstate\"></a></td>" +
			"<td><a id=\"asolventtotal\"></a></td>" +
			"<td><a id=\"etaVOChsname\"></a></td>" +
			
			"<td><a id=\"etaVOCxhname\"></a></td>" +
			"<td><a id=\"pfkids\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_rjsy_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_rjsy_table").append(kongzhi);
	$.each(columns_rjsy, function(i, column) {
		column.emptytext = emptytext;
		$("#rjsy"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yjytcg(){//添加有机液体储罐信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yjytcg"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"volume\"></a></td>" +
			"<td><a id=\"height\"></a></td>" +
			"<td><a id=\"diameter\"></a></td>" +
			"<td><a id=\"component\"></a></td>" +
			"<td><a id=\"inoutnums\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yjytcg_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yjytcg_table").append(kongzhi);
	$.each(columns_yjytcg, function(i, column) {
		column.emptytext = emptytext;
		$("#yjytcg"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yjytzz(){//添加有机液体装载信息表 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yjytzz"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"materialname\"></a></td>" +
			"<td><a id=\"zztype\"></a></td>" +
			"<td><a id=\"zzway\"></a></td>" +
			"<td><a id=\"zzamount\"></a></td>" +
			"<td><a id=\"density\"></a></td>" +
			"<td><a id=\"recover\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yjytzz_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yjytzz_table").append(kongzhi);
	$.each(columns_yjytzz, function(i, column) {
		column.emptytext = emptytext;
		$("#yjytzz"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_ltdc (){//添加露天堆场信息表  
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"ltdc"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"dctype\"></a></td>" +
			"<td><a id=\"dcmat\"></a></td>" +
			"<td><a id=\"dcaera\"></a></td>" +
			"<td><a id=\"dcheight\"></a></td>" +
			"<td><a id=\"dcamount\"></a></td>" +
			"<td><a id=\"dcmeantrans\"></a></td>" +
			
			"<td><a id=\"dctransamount\"></a></td>" +
			"<td><a id=\"dustcontrol\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_ltdc_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_ltdc_table").append(kongzhi);
	$.each(columns_lydc, function(i, column) {
		column.emptytext = emptytext;
		$("#ltdc"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_guolu (){////锅炉数 
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"guolu"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"boileruse\"></a></td>" +
			"<td><a id=\"capacity\"></a></td>" +
			"<td><a id=\"startdate\"></a></td>" +
			"<td><a id=\"enddate\"></a></td>" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"fuelunit\"></a></td>" +
			"<td><a id=\"afueltotal\"></a></td>" +
			"<td><a id=\"sulfur\"></a></td>" +
			"<td><a id=\"ash\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a id=\"pfkids\"></a></td></tr>" ;
	$("#add_guolu_table").append(kongzhi);
	$.each(columns_guolu, function(i, column) {
		column.emptytext = emptytext;
		$("#guolu"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yaolu(){//窑炉数
	var index = (new Date()).valueOf();
	 var kongzhi = "<tr id=\"yaolu"+index+"ver\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"startdate\"></a></td>" +
			"<td><a id=\"enddate\"></a></td>" +
			"<td><a id=\"materialtype\"></a></td>" +
			"<td><a id=\"amaterialtotal\"></a></td>" +
			"<td><a id=\"materialsulfur\"></a></td></tr>";
	$("#add_yaolu_table1").append(kongzhi);
	var kongzhi1 = "<tr id=\"yaolu"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"fuelunit\"></a></td>" +
			"<td><a id=\"afueltotal\"></a></td>" +
			"<td><a id=\"sulfur\"></a></td>" +
			"<td><a id=\"aproducttype\"></a></td>" +
			"<td><a id=\"aproducttotal\"></a></td>" +
			"<td><a id=\"pfkids1\"></a></td>" +
			"<td style='display:none;'><a id=\"status\"></a></td>" +
			"<td><a id=\"pfkids2\"></a></td></tr>";
	$("#add_yaolu_table2").append(kongzhi1);
	$.each(columns_yaolu, function(i, column) {
		column.emptytext = emptytext;
		$("#yaolu"+index+"ver #"+column.field).editable(column);
		$("#yaolu"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yfl_yl(){//添加原料信息
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yfl_yl"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"materialtype\"></a></td>" +
			"<td><a id=\"materialunit\"></a></td>" +
			"<td><a id=\"amaterialtotal\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yfl_yl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yfl_yl_table").append(kongzhi);
	$.each(columns_yfl, function(i, column) {
		column.emptytext = emptytext;
		$("#yfl_yl"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yfl_fl(){//添加辅料信息
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yfl_fl"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"fulmaterialname\"></a></td>" +
			"<td><a id=\"fulmaterialunit\"></a></td>" +
			"<td><a id=\"afulmaterialtotal\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yfl_fl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yfl_fl_table").append(kongzhi);
	$.each(columns_yfl, function(i, column) {
		column.emptytext = emptytext;
		$("#yfl_fl"+index+" #"+column.field).editable(column);
	});
	return index;
}
function add_yfl_cp(){//添加辅料信息
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yfl_cp"+index+"\" class=\"zhong\"  height=\"35px\">" +
			"<td><a id=\"equipId\"></a></td>" +
			"<td><a id=\"aproducttype\"></a></td>" +
			"<td><a id=\"productunit\"></a></td>" +
			"<td><a id=\"aproducttotal\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'add_yfl_cp_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#add_yfl_cp_table").append(kongzhi);
	$.each(columns_yfl, function(i, column) {
		column.emptytext = emptytext;
		$("#yfl_cp"+index+" #"+column.field).editable(column);
	});
	return index;
}
//通用的设备删除行
function moduan_delete(obj, table){
	if ( stype == "update"){
		if($('#edit').css('display') == "none"){
			if ( table == "add_yfl_table2" ) {
				$(obj).parent().parent().parent().remove();
				var ss = $(obj).parent().parent().parent();
				$("#"+$(obj).parent().parent().parent()[0].id+"ver").remove();
			} else {
				$(obj).parent().parent().parent().remove();
			}
		}
	} 
}
//判断编辑按钮的样式，决定是否可以执行操作
function edit_show(){
	if($('#edit').is(':visible')){
		return true;
	}else{
		return false;
	}
}
var edit = true;
//页面初始化，加载企业信息
function Load_enterprise(){
	console.log({taskId:taskId,userId:userId,version:version});
	if ( stype == "look" ) {
		$("#edit").hide();
	} else {
		$("#edit").show();
	}

	var data = ajax_async_t(BackstageIP+"dto/selectSimpAndComm.do",{taskId:taskId,userId:userId,version:version,dataType:2},"json ","false");
	if( data != null && data !=undefined && data!=null) {
		console.log(data);
		if( data.status == "success"){
			if ( data.data.表comp00_企业基本信息表[0] != null && data.data.表comp00_企业基本信息表[0] !="" && data.data.表comp00_企业基本信息表[0] != undefined){
				$.each(data.data.表comp00_企业基本信息表[0],function(i,g){//表simp00_企业基本信息表
					if(i == "openmonths" ){
						var a = data.data.表comp00_企业基本信息表[0].openmonths.replace(/\s+/g,"");
						var s = a.substring(1, data.data.表comp00_企业基本信息表[0].openmonths.length);
						var ss = s.substring(0,s.length-1);
						var str = ss.split(",");
						$("#openmonths").editable("setValue",str);
					} else {
						$("#"+i).editable("setValue",data.data.表comp00_企业基本信息表[0][i]);
					}
					
				})
			}
			
			if ( data.data.表comp01_燃料信息表 != "" && data.data.表comp01_燃料信息表 != null && data.data.表comp01_燃料信息表 != undefined){
				if(data.data.表comp01_燃料信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp01_燃料信息表.length; j ++ ) {
						var index = add_rlxx();
						$.each(data.data.表comp01_燃料信息表[j],function(i,g) {
							$("#rlxx"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			
			if ( data.data.表comp02_产品信息表 != "" && data.data.表comp02_产品信息表 != null && data.data.表comp02_产品信息表 != undefined){//表comp02_产品信息表
				if(data.data.表comp02_产品信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp02_产品信息表.length; j ++ ) {
						var index = add_cpxx();
						$.each(data.data.表comp02_产品信息表[j],function(i,g) {
							$("#cpxx"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp03_排放口信息表 != "" && data.data.表comp03_排放口信息表 != null && data.data.表comp03_排放口信息表 != undefined){//表comp03_排放口信息表
				if(data.data.表comp03_排放口信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp03_排放口信息表.length; j ++ ) {
						var index = add_pfk();
						$.each(data.data.表comp03_排放口信息表[j],function(i,g) {
							$("#pfk"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp04_自备发电机组信息表 != "" && data.data.表comp04_自备发电机组信息表 != null && data.data.表comp04_自备发电机组信息表 != undefined){//表comp04_自备发电机组信息表
				if(data.data.表comp04_自备发电机组信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp04_自备发电机组信息表.length; j ++ ) {
						var index = add_zbfdz();
						$.each(data.data.表comp04_自备发电机组信息表[j],function(i,g) {
							$("#zbfdz"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
//			console.log(data.data.表comp04_自备发电机组信息表-表comp07_末端控制措施信息表)
			if ( data.data.表comp04_自备发电机组信息表v表comp07_末端控制措施信息表 != "" && data.data.表comp04_自备发电机组信息表v表comp07_末端控制措施信息表!= null && data.data.表comp04_自备发电机组信息表v表comp07_末端控制措施信息表 != undefined){//表comp04_自备发电机组信息表
				if(data.data.表comp04_自备发电机组信息表v表comp07_末端控制措施信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp04_自备发电机组信息表v表comp07_末端控制措施信息表.length; j ++ ) {
						var index = add_zbfdz_md();
						$.each(data.data.表comp04_自备发电机组信息表v表comp07_末端控制措施信息表[j],function(i,g) {
							$("#zbfdz_md"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp05_锅炉信息表 != "" && data.data.表comp05_锅炉信息表 != null && data.data.表comp05_锅炉信息表 != undefined){//表comp05_锅炉信息表
				if(data.data.表comp05_锅炉信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp05_锅炉信息表.length; j ++ ) {
						var index = add_guolu();
						$.each(data.data.表comp05_锅炉信息表[j],function(i,g) {
							$("#guolu"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp05_锅炉信息表v表comp07_末端控制措施信息表 != "" && data.data.表comp05_锅炉信息表v表comp07_末端控制措施信息表 != null && data.data.表comp05_锅炉信息表v表comp07_末端控制措施信息表 != undefined){//表comp05_锅炉信息表
				if(data.data.表comp05_锅炉信息表v表comp07_末端控制措施信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp05_锅炉信息表v表comp07_末端控制措施信息表.length; j ++ ) {
						var index = add_guolu_md();
						$.each(data.data.表comp05_锅炉信息表v表comp07_末端控制措施信息表[j],function(i,g) {
							$("#guolu_md"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp06_窑炉信息表 != "" && data.data.表comp06_窑炉信息表 != null && data.data.表comp06_窑炉信息表 != undefined){//表comp06_窑炉信息表
				if(data.data.表comp06_窑炉信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp06_窑炉信息表.length; j ++ ) {
						var index = add_yaolu();
						$.each(data.data.表comp06_窑炉信息表[j],function(i,g) {
							$("#yaolu"+index+" #"+i).editable("setValue",g);
							$("#yaolu"+index+"ver #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp06_窑炉信息表v表comp07_末端控制措施信息表 != "" && data.data.表comp06_窑炉信息表v表comp07_末端控制措施信息表 != null && data.data.表comp06_窑炉信息表v表comp07_末端控制措施信息表 != undefined){//表comp06_窑炉信息表
				if(data.data.表comp06_窑炉信息表v表comp07_末端控制措施信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp06_窑炉信息表v表comp07_末端控制措施信息表.length; j ++ ) {
						var index = add_yaolu_md();
						$.each(data.data.表comp06_窑炉信息表v表comp07_末端控制措施信息表[j],function(i,g) {
							$("#yaolu_md"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp09_原辅料及产品信息表 != "" && data.data.表comp09_原辅料及产品信息表 != null && data.data.表comp09_原辅料及产品信息表 != undefined){//表comp09_原辅料及产品信息表
				if(data.data.表comp09_原辅料及产品信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp09_原辅料及产品信息表.length; j ++ ) {
						var index = add_yfl();
						$.each(data.data.表comp09_原辅料及产品信息表[j],function(i,g) {
							$("#yfl"+index+" #"+i).editable("setValue",g);
							$("#yfl"+index+"ver #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表 != "" && data.data.表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表 != null && data.data.表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表 != undefined){//表comp09_原辅料及产品信息表
				if(data.data.表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表.length; j ++ ) {
						var index = add_yfl_md();
						$.each(data.data.表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表[j],function(i,g) {
							$("#yfl_md"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp08_溶剂使用信息表 != "" && data.data.表comp08_溶剂使用信息表 != null && data.data.表comp08_溶剂使用信息表 != undefined){//表comp08_溶剂使用信息表
				if(data.data.表comp08_溶剂使用信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp08_溶剂使用信息表.length; j ++ ) {
						var index = add_rjsy();
						$.each(data.data.表comp08_溶剂使用信息表[j],function(i,g) {
							$("#rjsy"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp10_有机液体储罐信息表 != "" && data.data.表comp10_有机液体储罐信息表 != null && data.data.表comp10_有机液体储罐信息表 != undefined){//表comp10_有机液体储罐信息表
				if(data.data.表comp10_有机液体储罐信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp10_有机液体储罐信息表.length; j ++ ) {
						var index = add_yjytcg();
						$.each(data.data.表comp10_有机液体储罐信息表[j],function(i,g) {
							$("#yjytcg"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp11_有机液体装载信息表 != "" && data.data.表comp11_有机液体装载信息表 != null && data.data.表comp11_有机液体装载信息表 != undefined){//表comp11_有机液体装载信息表
				if(data.data.表comp11_有机液体装载信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp11_有机液体装载信息表.length; j ++ ) {
						var index = add_yjytzz();
						$.each(data.data.表comp11_有机液体装载信息表[j],function(i,g) {
							$("#yjytzz"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}
			if ( data.data.表comp12_露天堆场信息表 != "" && data.data.表comp12_露天堆场信息表 != null && data.data.表comp12_露天堆场信息表 != undefined){//表comp12_露天堆场信息表
				if(data.data.表comp12_露天堆场信息表.length > 0 ) {
					for ( var j = 0 ; j < data.data.表comp12_露天堆场信息表.length; j ++ ) {
						var index = add_ltdc();
						$.each(data.data.表comp12_露天堆场信息表[j],function(i,g) {
							$("#ltdc"+index+" #"+i).editable("setValue",g);
						});
					}
				}
			}

			$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
			edit_state_url = BackstageIP+"dto/updateSimpAndComm.do";//如果已经有值，执行保存地址
			get_lon_lat();//获取经纬度坐标并进行定位
			window.sessionStorage.setItem("industrytype",data.industrytype);
		} else {
			//没有数据，编辑状态打开
			$("#edit").hide();
			$("#save").show();
			$("#close_Return").show();
			$('.editable').editable('enable');
			$("#add_rlxx").show();
			$("#add_cpxx").show();
			$("#add_pfk").show();
			$("#add_zbfdz").show();
			$("#add_zbfdz_md").show();
			$("#add_guolu_md").show();
			$("#add_yaolu_md").show();
			$("#add_yfl").show();
			$("#add_yfl_md").show();
			$("#add_rjsy").show();
			$("#add_yjytcg").show();
			$("#add_yjytzz").show();
			$("#add_ltdc").show();
		
		}
	}else{
		//没有数据，编辑状态打开
		$("#edit").hide();
		$("#save").show();
		$("#close_Return").show();
		$('.editable').editable('enable');
		$("#add_rlxx").show();
		$("#add_cpxx").show();
		$("#add_pfk").show();
		$("#add_zbfdz").show();
		$("#add_zbfdz_md").show();
		$("#add_guolu_md").show();
		$("#add_yaolu_md").show();
		$("#add_yfl").show();
		$("#add_yfl_md").show();
		$("#add_rjsy").show();
		$("#add_yjytcg").show();
		$("#add_yjytzz").show();
		$("#add_ltdc").show();
	}
}

//数据校验
function Data_check(){
	var check_Result = [];
	if(typeof $("#companyname").editable("getValue").companyname == "undefined") check_Result.push("企业名称");
	if(typeof $("#companaynumber").editable("getValue").companaynumber == "undefined") check_Result.push("组织机构代码");
	if(typeof $("#companysocietynumber").editable("getValue").companysocietynumber == "undefined") check_Result.push("统一社会信用代码");
	if(typeof $("#openmonths").editable("getValue").openmonths == "undefined") check_Result.push("生产月份");
	if(typeof $("#intermitornot").editable("getValue").intermitornot == "undefined") check_Result.push("连续生产/间歇生产");
	
	if($("#totalcoal").editable("getValue").totalcoal === "") check_Result.push("年煤炭消耗量");
	
	if($("#totalgas").editable("getValue").totalgas === "") check_Result.push("年燃气消耗量");
	if($("#totaloil").editable("getValue").totaloil === "") check_Result.push("年燃油消耗量");
	
	if(typeof $("#importantornot").editable("getValue").importantornot == "undefined") check_Result.push("是否重点污染源");
	if(typeof $("#industrytype").editable("getValue").industrytype == "undefined") check_Result.push("行业类别");
	if(typeof $("#informant").editable("getValue").informant == "undefined") check_Result.push("填报人");
	if(typeof $("#tel").editable("getValue").tel == "undefined") check_Result.push("联系电话");
	
	if($("#legalentitylx").editable("getValue").legalentitylx === "") check_Result.push("企业联系人");
	if($("#legaltel").editable("getValue").legaltel ==="") check_Result.push("企业联系电话");
	
	if(typeof $("#county").editable("getValue").county == "undefined"){
		check_Result.push("企业所在省、市、县");
	}
	if($("#lon1").editable("getValue").lon1 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lon2").editable("getValue").lon2 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lon3").editable("getValue").lon3 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lat1").editable("getValue").lat1 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lat2").editable("getValue").lat2 === ""){
		check_Result.push("企业经维度坐标");
	}else if($("#lat3").editable("getValue").lat3 === ""){
		check_Result.push("企业经维度坐标");
	}
	
	//设备信息
	$("#shebei").find(".editable").each(function(el,n){
		var obj = $(n);
		if(obj.is(':visible')){
			var html_id = obj.attr("id");//页面上每个编辑框的ID
			var html_value = obj.editable("getValue")[html_id];//获取到页面的实际的值
			if(html_id == "equipId"){
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("编号");
				}
			} else if ( html_id == "fueltype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("燃料类型");
				}
			}else if ( html_id == "fuelunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "totalfuel" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("全年");
				}
			}else if ( html_id == "productname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("产品名称");
				}
			}else if ( html_id == "totalfuel" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "producttotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("全年");
				}
			}else if ( html_id == "pfkid" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("编号");
				}
			}else if ( html_id == "equiptype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("锅炉类型");
				}
			}else if ( html_id == "powertotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年发电量");
				}
			}else if ( html_id == "heattotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年供热量");
				}
			}else if ( html_id == "fueltype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("燃料类型");
				}
			}else if ( html_id == "fuelunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "afueltotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年消耗量");
				}
			}else if ( html_id == "etaSO2name" ) {//有机溶剂使用信息
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("脱硫工艺");
				}
			}else if ( html_id == "etaNOxname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("脱硝工艺");
				}
			}else if ( html_id == "etaPMname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("除尘工艺");
				}
			}else if ( html_id == "boileruse" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("锅炉用途");
				}
			}else if ( html_id == "fuelunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "afueltotal" ) {//锅炉信息
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年消耗量");
				}
			}else if ( html_id == "equiptype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("窑炉类型");
				}
			}else if ( html_id == "materialtype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("原料名称");
				}
			}else if ( html_id == "amaterialtotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年消耗量");
				}
			}else if ( html_id == "fueltype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("燃料类型");
				}
			}else if ( html_id == "fuelunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "afueltotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("燃料年消耗量");
				}
			}else if ( html_id == "aproducttype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("产品名称");
				}
			}else if ( html_id == "aproducttotal" ) {//露天堆场信息
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年产量");
				}
			}else if ( html_id == "equiptype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("工段名称");
				}
			}else if ( html_id == "materialtype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("原料名称");
				}
			}else if ( html_id == "materialunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "amaterialtotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年使用量");
				}
			}else if ( html_id == "fulmaterialname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("辅料名称");
				}
			}else if ( html_id == "fulmaterialunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "afulmaterialtotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年使用量");
				}
			}else if ( html_id == "aproducttype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("产品名称");
				}
			}else if ( html_id == "productunit" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}else if ( html_id == "aproducttotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年使用量");
				}
			}else if ( html_id == "etaVOChsname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("VOC回收");
				}
			}else if ( html_id == "etaVOCxhname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("VOC销毁");
				}
			}else if ( html_id == "asolventtypename" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("溶剂类别");
				}
			}else if ( html_id == "asolventname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("溶剂名称");
				}
			}else if ( html_id == "solventstate" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("溶剂性质");
				}
			}else if ( html_id == "asolventtotal" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年使用量");
				}
			}else if ( html_id == "etaVOChsname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("VOC回收方式");
				}
			}else if ( html_id == "etaVOCxhname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("VOC销毁方式");
				}
			}else if ( html_id == "equiptype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("储罐类型");
				}
			}else if ( html_id == "volume" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("体积");
				}
			}else if ( html_id == "height" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("高度");
				}
			}else if ( html_id == "diameter" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("直径");
				}
			}else if ( html_id == "component" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("存储液体成分");
				}
			}else if ( html_id == "materialname" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("装载物料名称");
				}
			}else if ( html_id == "zztype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("装载方式");
				}
			}else if ( html_id == "zzway" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("操作方式");
				}
			}else if ( html_id == "zzamount" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年装载量");
				}
			}else if ( html_id == "density" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("装载物料密度");
				}
			}else if ( html_id == "recover" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("油气回收技术");
				}
			}else if ( html_id == "dctype" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("料堆类型");
				}
			}else if ( html_id == "dcmat" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("料堆材料");
				}
			}else if ( html_id == "dcaera" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("占地面积");
				}
			}else if ( html_id == "dcheight" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("最高高度");
				}
			}else if ( html_id == "dcamount" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("日常储存量");
				}
			}else if ( html_id == "dcmeantrans" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年物料运载车次");
				}
			}else if ( html_id == "dctransamount" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("单车运载量");
				}
			}else if ( html_id == "equipIdso2" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("所属生产设备编号");
				}
			}else if ( html_id == "equipIdnox" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("所属生产设备编号");
				}
			}else if ( html_id == "equipIdpm" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("所属生产设备编号");
				}
			}else if ( html_id == "inoutnums" ) {
				if (html_value == "" || html_value == undefined ) {
					check_Result.push("年进出料次数");
				}
			}
		}
	});
	
	return check_Result;
}

//获取经纬度坐标并进行定位
function get_lon_lat(){
	var lon1 = $("#lon1").html();
	var lon2 = $("#lon2").html();
	var lon3 = $("#lon3").html();
	var lat1 = $("#lat1").html();
	var lat2 = $("#lat2").html();
	var lat3 = $("#lat3").html();
	
	if(lon1!=""&& lon1!="请填写" && lon2!="" && lon2!="请填写" && lon3!=""&& lon3!="请填写" &&  lat1!=""&& lat1!="请填写" && lat2!="" && lat2!="请填写" && lat3!="" && lat3!="请填写"){
		var lon = parseInt(lon1)+(parseInt(lon2)/60)+(parseInt(lon3)/3600);
		var lat = parseInt(lat1)+(parseInt(lat2)/60)+(parseInt(lat3)/3600);
		var point = new BMap.Point(lon, lat);
		map.centerAndZoom(point, 13);
		
		var marker = new BMap.Marker(point);  // 创建标注
		map.clearOverlays(); //清除覆盖物
		map.addOverlay(marker);               // 将标注添加到地图中
	}
}

//数据保存
function Data_save(){
	window.sessionStorage.setItem("industrytype",industrytype);
	var jsonobj = {};
	jsonobj.userId = userId;
	jsonobj.taskId = taskId;
	jsonobj.version = version;
	jsonobj.isCompany = true;
	jsonobj.dataType = 2;
	jsonobj.value = {};
	//用户填写的行业
	var industrytype = $("#industrytype").editable("getValue").industrytype;
	var jiben_jihe = {"prov":$("#prov").html(),"city":$("#city").html()};
	
	var ranliao =[];//燃料信息表
	var chanpin = [];//产品信息表
	var paifang = [];//排放口信息表
	var zbfdz = [];//自备发电组信息表
	var zbfdz_md = [];//自备发电组—末端设备
	var guolu = [];//锅炉信息表\
	var guolu_md = []//锅炉-末端
	var yaolu = [];//窑炉信息表
	var yaolu_md = [];//窑炉—末端
	var ypl = [];//原辅料及产品信息表
	var ypl_md = [];//原辅料—末端
	var rjsy = [];//溶剂使用信息表
	var yjytcg = [];//有机液体储罐信息表
	var yjytzz = [];//有机液体 装载信息表
	var ltdc = [];//露天堆场信息表
	
	$("#qiye .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
		if($(this).is(":visible")) jiben_jihe[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
	});
	$("#add_rlxx_table tr").each(function(){//燃料信息表
		if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){
			ranliao.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_cpxx_table tr").each(function(){//产品信息表
		if(typeof $(this).find("#productname").editable("getValue").productname != "undefined"){
			chanpin.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_pfk_table tr").each(function(){//排放口信息表
		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
			paifang.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_zbfdz_table tr").each(function(){//自备发电机组信息表
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			zbfdz.push($(this).find(".editable").editable("getValue"));
		}
	});
	if($("#add_zbfdz_md_table tr").length >2){
		$("#add_zbfdz_md_table tr").each(function(i,g){//自备发电机组信息表-末端控制措施信息表
			if( i > 1 ) zbfdz_md.push($(this).find(".editable").editable("getValue"));
		});
	}
	$("#add_guolu_table tr").each(function(){//锅炉信息表
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			guolu.push($(this).find(".editable").editable("getValue"));
		}
	});
	if($("#add_guolu_md_table tr").length >2){
		$("#add_guolu_md_table tr").each(function(i,g){//锅炉信息表-末端控制措施信息表
			if( i >1 ) guolu_md.push($(this).find(".editable").editable("getValue"));
			
		});
	}
	$("#add_yaolu_table1 tr").each(function(){//窑炉信息表 
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			yaolu.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_yaolu_table2 tr").each(function(){//窑炉信息表 
		if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){
			yaolu.push($(this).find(".editable").editable("getValue"));
		}
	});
	
	
	if( $("#add_yaolu_md_table tr") .length>2) {
		$("#add_yaolu_md_table tr").each(function(i,g){//窑炉信息表-末端控制措施信息表
			if( i > 1) yaolu_md.push($(this).find(".editable").editable("getValue"));
			
		});
	}
	var yfl_yl = [];//原料信息
	var yfl_fl = [];//辅料信息
	var yfl_cp = [];//产品信息
	$("#add_yfl_table1 tr").each(function(){// 原辅料及产品信息表 
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			ypl.push($(this).find(".editable").editable("getValue"));
			var al = $(this).find("#equipId").editable("getValue").equipId;
			$("#add_yfl_yl_table tr").each(function(){
				if(al ==$(this).find("#equipId").editable("getValue").equipId ){
					var yl = $(this).find(".editable").editable("getValue");
					delete yl["equipId"]
					yfl_yl.push(yl);
				}
			});
		}
	});
	$("#add_yfl_table2 tr").each(function(){// 原辅料及产品信息表 
		if(typeof $(this).find("#fulmaterialname").editable("getValue").fulmaterialname != "undefined"){
			ypl.push($(this).find(".editable").editable("getValue"));
		}
	});
	if ( $("#add_yfl_md_table tr").length >2 ) {
		$("#add_yfl_md_table tr").each(function(i,g){// 原辅料及产品信息表-末端控制措施信息表
			if( i > 1 )  ypl_md.push($(this).find(".editable").editable("getValue"));
		});
	}
	
	$("#add_rjsy_table tr").each(function(){//溶剂使用信息表  
		if(typeof $(this).find("#asolventtypename").editable("getValue").asolventtypename != "undefined"){
			rjsy.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_yjytcg_table tr").each(function(){//有机液体储罐信息表 
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			yjytcg.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_yjytzz_table tr").each(function(){//有机液体装载信息表  
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			yjytzz.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#add_ltdc_table tr").each(function(){//露天堆场信息表 
		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
			ltdc.push($(this).find(".editable").editable("getValue"));
		}
	});
	
	if(!$.isEmptyObject(jiben_jihe)) jsonobj.value["表comp00_企业基本信息表"] = [jiben_jihe];
	if(!$.isEmptyObject(ranliao)) jsonobj.value["表comp01_燃料信息表"] = ranliao;
	if(!$.isEmptyObject(chanpin)) jsonobj.value["表comp02_产品信息表"] = chanpin;
	if(!$.isEmptyObject(paifang)) jsonobj.value["表comp03_排放口信息表"] = paifang;
	if(!$.isEmptyObject(zbfdz)) jsonobj.value["表comp04_自备发电机组信息表"] = zbfdz;
	if(!$.isEmptyObject(zbfdz_md)) jsonobj.value["表comp04_自备发电机组信息表v表comp07_末端控制措施信息表"] = zbfdz_md;
	if(!$.isEmptyObject(guolu)) jsonobj.value["表comp05_锅炉信息表"] = guolu;
	if(!$.isEmptyObject(guolu_md)) jsonobj.value["表comp05_锅炉信息表v表comp07_末端控制措施信息表"] = guolu_md;
	if(!$.isEmptyObject(yaolu)) jsonobj.value["表comp06_窑炉信息表"] = yaolu;
	if(!$.isEmptyObject(yaolu_md)) jsonobj.value["表comp06_窑炉信息表v表comp07_末端控制措施信息表"] = yaolu_md;
	if(!$.isEmptyObject(ypl)) jsonobj.value["表comp09_原辅料及产品信息表"] = ypl;
	if(!$.isEmptyObject(ypl_md)) jsonobj.value["表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表"] = ypl_md;
	if(!$.isEmptyObject(rjsy)) jsonobj.value["表comp08_溶剂使用信息表"] = rjsy;
	if(!$.isEmptyObject(yjytcg)) jsonobj.value["表comp10_有机液体储罐信息表"] = yjytcg;
	if(!$.isEmptyObject(yjytzz)) jsonobj.value["表comp11_有机液体装载信息表"] = yjytzz;
	if(!$.isEmptyObject(ltdc)) jsonobj.value["表comp12_露天堆场信息表"] = ltdc;
	
	if (jsonobj.value.表comp09_原辅料及产品信息表 != "" && jsonobj.value.表comp09_原辅料及产品信息表 != undefined && jsonobj.value.表comp09_原辅料及产品信息表 != null){
		if( jsonobj.value.表comp09_原辅料及产品信息表.length > 0 ) {
			var str = [];
			var ss = jsonobj.value.表comp09_原辅料及产品信息表;
			var lengths = ss.length;
			for ( var i = 0 ;  i < lengths/2; i ++ ) {
				var a = ss[i];
				var b = ss[i+lengths/2];
				var obj = Object.assign(a, b);
				str.push(obj);
			}
			jsonobj.value.表comp09_原辅料及产品信息表=str;
		}
	}
	
	if( jsonobj.value.表comp06_窑炉信息表 != "" && jsonobj.value.表comp06_窑炉信息表 != undefined && jsonobj.value.表comp06_窑炉信息表 != null) {
		if( jsonobj.value.表comp06_窑炉信息表.length > 0 ) {
			var str = [];
			var ss = jsonobj.value.表comp06_窑炉信息表;
			var lengths = ss.length;
			for ( var i = 0 ;  i < lengths/2; i ++ ) {
				var a = ss[i];
				var b = ss[i+lengths/2];
				var obj = Object.assign(a, b);
				str.push(obj);
			}
			jsonobj.value.表comp06_窑炉信息表=str;
		}
	}
	console.log(JSON.stringify(jsonobj));
	$("#dialog-dengdai-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-dengdai").dialog("open");
	window.setTimeout(function(){
		var data = ajax_async_t(edit_state_url,{data:JSON.stringify(jsonobj)},"json","");
		if(data.status == "success") {
			window.sessionStorage.setItem("industrytype",industrytype);
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存成功！</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-dengdai").dialog("close");

			//保存成功
			$("#edit").show();
			$("#save").hide();
			$("#close").hide();
			$("#close_Return").hide();
			$('.editable').editable('disable');
			$("#add_rlxx").hide();
			$("#add_cpxx").hide();
			$("#add_pfk").hide();
			$("#add_zbfdz").hide();
			$("#add_zbfdz_md").hide();
			$("#add_guolu_md").hide();
			$("#add_yaolu_md").hide();
			$("#add_yfl").hide();
			$("#add_yfl_md").hide();
			$("#add_rjsy").hide();
			$("#add_yjytcg").hide();
			$("#add_yjytzz").hide();
			$("#add_ltdc").hide();
			
			$("#add_yfl_yl").hide();
			$("#add_yfl_fl").hide();
			$("#add_yfl_cp").hide();
			return true;
		}else if ( data.status == "fail" ){
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>保存失败！</b><br>错误代码："+JSON.stringify(data.code)+"</span>");
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-dengdai").dialog("close");
			return false;
		}
	},0)
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}
//修改密码
function xiugaimima_anniu(old_pass,str){
	var data = ajax_async_t("../../updatePassword.do",{old_password:old_pass,new_password:str,u_id:userId},"json");
	if ( data == "1" ) {
		$( "#dialog-update").dialog("close")
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>修改成功！</b></span>");
	} else if ( data == "2" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>修改失败！</b></span>");
	} else if ( data == "3" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>原密码错误！</b></span>");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
}

/**
 * 生成随机数
 * @param Min
 * @param Max
 * @returns
 */
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}  