var version = "1.0";
var edit_state_url = BackstageIP+"dto/insert.do";//默认执行新建地址
var stype = "";//编辑还是保存

var map = new BMap.Map("map",{
	mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]
});
var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
map.addControl(new BMap.NavigationControl(opts));

$(function (){
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
	$("#industrytype").bind('DOMNodeInserted', function(e) {
		$.each(industrytype_key,function(i,g){$("#"+g.div_id).hide();});
		$("#"+industrytype_key[$(e.target).html()].div_id).show();
		if (industrytype_key[$(e.target).html()].key == "表p204_企业基本信息表") $("#scx_div").show();
		else $("#scx_div").hide();
		if (industrytype_key[$(e.target).html()].key == "表p10011_餐饮业基本信息表") $("#ranliao_div").show();
		else $("#ranliao_div").hide();
		if($(e.target).html() == "民航飞机" || $(e.target).html() == "餐饮油烟" ||$(e.target).html() == "油气储运") $("#gkgs_s").hide();
		else $("#gkgs_s").show();
//		qing_scx ();
//		qing_ranliao();
	});
	
	
	   // 创建Map实例
	map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));  //添加地图类型控件
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
		$("#qy_title #"+column.field).editable(column);
		$("#p00 #"+column.field).editable(column);
		if ( column.field != "contype" ) {if (column.field == "opendate" ) {} else {$("#p10011 #"+column.field).editable(column);}}
		if ( column.field != "opendate" ) {
			$("#p5011 #"+column.field).editable(column);
			$("#p4031 #"+column.field).editable(column);
			$("#p8011 #"+column.field).editable(column);
		}
		
		$("#p101 #"+column.field).editable(column);
		$("#p204 #"+column.field).editable(column);
		$("#p3031 #"+column.field).editable(column);
		$("#p6011 #"+column.field).editable(column);
		$("#dibu_ty #"+column.field).editable(column);
		$("#scx_div #"+column.field).editable(column);
		
	});
	//初始化编辑控件
	$.each(columns_canyin, function(i, column) {
		column.emptytext = emptytext;
		$("#p10011 #"+column.field).editable(column);
	});
	//初始化编辑控件
	$.each(columns_time, function(i, column) {
		column.emptytext = emptytext;
		$("#p5011 #"+column.field).editable(column);
		$("#p10011 #"+column.field).editable(column);
		$("#p4031 #"+column.field).editable(column);
		$("#p8011 #"+column.field).editable(column);
	});
    $("#htornot").editable("setValue","是");//环统是否覆盖
	$("#zlornot").editable("setValue","是");//在线监测是否安装初始化
	//页面初始化，加载企业信息
	Load_enterprise();
	
	//编辑按钮事件
	$("#edit").click(function(){
		$("#edit").hide();
		$("#save").show();
		$("#close").show();
		$('.editable').editable('enable');
	});
	
	//环统是否覆盖 是否的问题
	$("#zlornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") for ( var i = 1 ; i < 7 ; i ++ ) $("#hc_f"+i).show();
		else for ( var i = 1 ; i < 7 ; i ++ ) $("#hc_f"+i).hide();
	});
	//环统是否覆盖 是否的问题
	$("#htornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") {
			for (var i = 1 ; i < 6; i++ ) {
				if ( i == 4 || i == 5 ) $("#ht_f"+i).hide();
				else $("#ht_f"+i).show();
			}
		} else {
			for (var i = 1 ; i < 6; i++ ) {
				if ( i == 4 || i == 5 ) $("#ht_f"+i).show();
				else $("#ht_f"+i).hide();
			}
		}
	});
	
    //焚烧炉 是否的问题
    $("#fsornot").bind('DOMNodeInserted', function(e) {
        if ( $(e.target).html() == "是") {
            $("#huaxue_1").show();
            $("#huaxue_2").show();
            $("#fstype").show();
			$("#fsfuelamount").show();
        } else {
            $("#huaxue_1").hide();
            $("#huaxue_2").hide();
            $("#fstype").hide();
            $("#fsfuelamount").hide();
        }
    });
	
	//保存按钮事件
	$("#save").click(function(){
		
		//首先校验数据，必填项通过后，可以执行保存方法
		var check_Result = Data_check();
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
		Load_enterprise();
	});
	
	

	
	//设备信息的跳转事件
	$("#gkgs_s").click(function(){
		if ( stype != "look" ) {
			if(edit_show()){
				window.location.href="c.html?taskId="+taskId+"&status="+statusCode+"&userId="+userId+"&userName="+userName+"&year="+year;
			}else{
				//如果任务ID有内容，说明处于正常的编辑状态，不允许跳转
				if(taskId != ""){
					if ( edit == false ) {
						window.location.href="c.html?taskId="+taskId+"&status="+statusCode+"&userId="+userId+"&userName="+userName+"&year="+year;
					} else {
						$("#dialog-tiaozhuan-content").html("离开当前页面将无法保存您的信息，请保存或取消后继续操作。");
						$("#dialog-tiaozhuan").dialog("open");
					}
				}else{
					//任务ID为空说明页面不正常，可以跳转到其他页面
					window.location.href="c.html?taskId="+taskId+"&status="+statusCode+"&userId="+userId+"&userName="+userName+"&year="+year;
				}
			}
		} else {
			window.location.href="c.html?taskId="+taskId+"&status="+statusCode+"&userId="+userId+"&userName="+userName+"&year="+year;
		}
		
		
	});
	
	$("#add_scx").click(function(){add_scz();})
	
	$("#add_p212").click(function(){
		var index = (new Date()).valueOf();
		var kongzhi = "<tr id=\"huaxue"+index+"\" class=\"zhong\" >" +
				"<td colspan=\"2\"><a id=\"productname\"></a></td>" +
				"<td colspan=\"2\"><a id=\"productamount\"></a></td>" +
				"<td colspan=\"2\"><a id=\"\"></a></td>" +
				"<td ><a id=\"\"></a></td>" +
				"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'p211_huxue_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
		$("#p212_huxue_table").append(kongzhi);
	})
	
	
});
//添加生产线/产品信息
function add_scz(){
	if ( stype != "look"){
		if ($("#edit").is(":hidden")) {
			var index = (new Date()).valueOf();
			var kongzhi = "<tr id=\"huaxue"+index+"\" class=\"zhong\">" +
					"<td><a id=\"productname\"></a></td>" +
					"<td><a id=\"productamount\"></a></td>" +
					"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'scx_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
			$("#scx_table").append(kongzhi);
			
			$.each(columns_scx, function(i, column) {
				column.emptytext = emptytext;
				$("#huaxue"+index+" #"+column.field).editable(column);
			});
			return index;
		}
	}
}
//添加燃料
function add_ranliao(){
	if ( stype != "look"){
		if ($("#edit").is(":hidden")) {
			var index = (new Date()).valueOf();
			var kongzhi = "<tr id=\"ranliao"+index+"\" class=\"zhong\">" +
					"<td><a id=\"fueltype\"></a></td>" +
					"<td><a id=\"aheatfueltotal\"></a></td>" +
					"<td><a id=\"fuelunit\"></a></td>" +
					"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'ranliao_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
			$("#ranliao_table").append(kongzhi);
			$.each(columns_ranliao, function(i, column) {
				column.emptytext = emptytext;
				$("#ranliao"+index+" #"+column.field).editable(column);
			});
			return index;
		}
	}
}
//添加燃料
function add_ranliao1(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"ranliao"+index+"\" class=\"zhong\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"aheatfueltotal\"></a></td>" +
			"<td><a id=\"fuelunit\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'ranliao_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#ranliao_table").append(kongzhi);
	$.each(columns_ranliao, function(i, column) {
		column.emptytext = emptytext;
		$("#ranliao"+index+" #"+column.field).editable(column);
	});
	return index;

}
//添加生产线/产品信息
function add_scz1(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"huaxue"+index+"\" class=\"zhong\">" +
			"<td><a id=\"productname\"></a></td>" +
			"<td><a id=\"productamount\"></a></td>" +
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'scx_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#scx_table").append(kongzhi);
	
	$.each(columns_scx, function(i, column) {
		column.emptytext = emptytext;
		$("#huaxue"+index+" #"+column.field).editable(column);
	});
	return index;

}
//通用的设备删除行
function moduan_delete(obj, table){
	if ( stype == "update"){
		if($("#edit").is(":hidden")){
			$(obj).parent().parent().parent().remove();
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
//清空产品信息表格
function qing_scx (){
	var html ='<tr><td width="15%" class="dise">产品名称<code>*</code></td><td width="15%" class="dise">产品产量(吨)<code>*</code></td>'+
		'<td width="15%" class="dise">操作</td></tr>';
	$("#scx_table").html(html);
}
//清空燃料信息
function qing_ranliao (){
	var html ='<tr><td width="15%" class="dise">燃料名称<code>*</code></td><td width="15%" class="dise">年消耗量<code>*</code></td><td width="15%" class="dise">单位<code>*</code></td><td width="15%" class="dise">操作</td></tr>';
	$("#ranliao_table").html(html);
}

var edit = true;
//页面初始化，加载企业信息
function Load_enterprise(){
	var data = ajax_async_t(BackstageIP+"dto/selectCompany.do",{taskId:taskId,userId:userId,version:version},"json ","true");
	if( data != null && data !=undefined && data!=null) {
		$.each(industrytype_key,function(i,g){$("#"+g.div_id).hide();});
		console.log(data);
		//获取到值，开始初始化,编辑状态锁死
		qing_scx ();
		qing_ranliao();
		var str = "请填写";
		if (data.industrytype != "" && data.industrytype != undefined && data.industrytype != null ) str = industrytype_key[data.industrytype].div_id;
		$("#"+str).show()
		$.each(data,function(i,g){
			if (i == "companyname" ) {
				$.each(industrytype_key,function(j,k){
					$("#"+k.div_id+" #companyname").editable("setValue",g);
				});
			} else if ( i == "openmonths" ){
				$("#"+str+" #"+i).editable("setValue",JSON.parse(g));
			}else {
				$("#"+str+" #"+i).editable("setValue",g);
				$("#dibu_ty #"+i).editable("setValue",g);
			}
		});
		$("#qy_title #industrytype").editable("setValue",data.industrytype);
		$("#producttype").editable("setValue",data.producttype);
		
		if (data.cp != "" && data.cp != null && data.cp != null ) {
			if(data.cp.length > 0 ) {
				for ( var j = 0 ; j < data.cp.length; j ++ ) {
					var index = add_scz1();
					$.each(data.cp[j],function(i,g) {
						$("#huaxue"+index+" #"+i).editable("setValue",g);
					});
				}
			}
		}
		if (data.rl != "" && data.rl!= null && data.rl != null ) {
			if(data.rl.length > 0 ) {
				for ( var j = 0 ; j < data.rl.length; j ++ ) {
					var index = add_ranliao1();
					$.each(data.rl[j],function(i,g) {
						$("#ranliao"+index+" #"+i).editable("setValue",g);
					});
				}
			}
		}
		if ( data.edit == false ) {
			edit = false;
		} else {
			edit = true;
		}
		
		if (update == "look" ) $("#edit").hide(); else $("#edit").show();
		
		$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
		edit_state_url = BackstageIP+"dto/updateCompany.do";//如果已经有值，执行保存地址
		get_lon_lat();//获取经纬度坐标并进行定位
		window.sessionStorage.setItem("industrytype",data.industrytype);
	}
}

//数据校验
function Data_check(){
	var check_Result = [];
	var str = sj_jiaoyan[industrytype_key[$("#industrytype").html()].div_id];
	var obj = $("#"+industrytype_key[$("#industrytype").html()].div_id);
	var dic = industrytype_key[$("#industrytype").html()].div_id;
	$("#"+dic).find(".editable").each(function(el,n){
		var obj = $(n);
		if(obj.is(':visible')){
			var html_id = obj.attr("id");
			var html_value = obj.editable("getValue")[html_id];
			$.each(str, function(i, column) {
				if(html_id == column.field){
					if (html_value === "" || html_value == null || html_value == undefined){
						check_Result.push(column.title);
					}
				}
			});
		}
	});
	//单独处理
	if(typeof $("#industrytype").editable("getValue").industrytype == "undefined") check_Result.push("行业类别");
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
	//产线/产品信息
	if ( dic == "p204" ) {	
		$("#scx_div").find(".editable").each(function(el,n){
			var obj = $(n);
			var html_id = obj.attr("id");//页面上每个编辑框的ID
			var html_value = obj.editable("getValue")[html_id];//获取到页面的实际的值
			if(html_id == "producttype"){
				if (html_value === "" || html_value === undefined ) {
					check_Result.push("产品类型");
				}
			} else if ( html_id == "productname" ) {
				if (html_value === "" || html_value === undefined ) {
					check_Result.push("产品名称");
				}
			} else if ( html_id == "productamount" ) {
				if (html_value === "" || html_value == undefined ) {
					check_Result.push("产品产量");
				}
			}
		});
	} else if (dic == "p10011") {
		$("#ranliao_div").find(".editable").each(function(el,n){
			var obj = $(n);
			var html_id = obj.attr("id");//页面上每个编辑框的ID
			var html_value = obj.editable("getValue")[html_id];//获取到页面的实际的值
			if(html_id == "fueltype"){
				if (html_value === "" || html_value === undefined ) {
					check_Result.push("燃料名称");
				}
			} else if ( html_id == "aheatfueltotal" ) {
				if (html_value === "" || html_value === undefined ) {
					check_Result.push("年消耗量");
				}
			} else if ( html_id == "fuelunit" ) {
				if (html_value === "" || html_value == undefined ) {
					check_Result.push("单位");
				}
			}
		});
	}
	console.log(dic)
	
	
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
	jsonobj.status = statusCode;
	jsonobj.version = version;
	jsonobj.isCompany = true;
	
	jsonobj.value = {};
	//用户填写的行业
	var industrytype = $("#industrytype").editable("getValue").industrytype;
	
	var jiben_jihe = {"prov":$("#prov").html(),"city":$("#city").html()};
	
	var p3032 ={};
	var p8012 = {};
	var p10012 = {};
	
	var dic_id = industrytype_key[$("#industrytype").html()].div_id;//div
	$("#qy_title .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
		if($(this).is(":visible")) jiben_jihe[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
	});
	$("#"+dic_id+" .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
		if($(this).attr("id") == "aflynums"){
			if($(this).is(":visible")) p3032[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}else if($(this).attr("id") == "agasolinesale"){
			if($(this).is(":visible")) p8012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}else if($(this).attr("id") == "adieselsale"){
			if($(this).is(":visible")) p8012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}else if($(this).attr("id") == "contype"){
			if (industrytype == "油气储运") {
				if($(this).is(":visible")) p8012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
			}else if (industrytype == "餐饮油烟") {
				if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
			}
		}else if($(this).attr("id") == "conratio"){
			if (industrytype == "油气储运") {
				if($(this).is(":visible")) p8012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
			}else if (industrytype == "餐饮油烟") {
				if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
				
			}
		}else if($(this).attr("id") == "acooknums"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}else if($(this).attr("id") == "fueltype"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}else if($(this).attr("id") == "aheatfueltotal"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		} else if($(this).attr("id") == "fuelunit"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		} else if($(this).attr("id") == "workingaera"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}   
		else{
			if($(this).is(":visible")) jiben_jihe[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}
		
	});
	
	if($("#producttype").is(":visible")) jiben_jihe[$("#producttype").attr("id")] = $("#producttype").editable("getValue")[$("#producttype").attr("id")];
	var scx =[];
	$("#scx_table tr").each(function(){//生产线
		if(typeof $(this).find("#productname").editable("getValue").productname != "undefined"){
			scx.push($(this).find(".editable").editable("getValue"));
		}
	});
	var ranliao =[];
	$("#ranliao_table tr").each(function(){//燃料
		if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){
			ranliao.push($(this).find(".editable").editable("getValue"));
		}
	});
	$("#dibu_ty .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
		if($(this).is(":visible")) jiben_jihe[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
	});
	var str = industrytype_key[$("#industrytype").html()].key;
	if(!$.isEmptyObject(jiben_jihe)) jsonobj.value[str] = [jiben_jihe];
	if(!$.isEmptyObject(scx)) jsonobj.value[str+"v产品信息"] = scx;
	if(!$.isEmptyObject(ranliao)) jsonobj.value["表p10012_餐饮业信息表v燃料信息"] = ranliao;
	
	if(!$.isEmptyObject(p3032)){
		var num1 = GetRandomNum(1,10000000);
		p3032["equipId"] = "PC"+num1;
		jsonobj.value["表p3032_机场信息表"] = [p3032];
	}
	if(!$.isEmptyObject(p8012)){
		var num2 = GetRandomNum(1,10000000);
		p8012["equipId"] = "PC"+num2;
		jsonobj.value["表p8012_加油站信息表"] = [p8012];
	}
	if(!$.isEmptyObject(p10012)){
		var num3 = GetRandomNum(1,10000000);
		p10012["equipId"] = "PC"+num3;
		jsonobj.value["表p10012_餐饮业信息表"] = [p10012];
	}
	$("#dialog-dengdai-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-dengdai").dialog("open");
	console.log(JSON.stringify(jsonobj));
	window.setTimeout(function(){
		var data = ajax_async_t(edit_state_url,{data:JSON.stringify(jsonobj)},"json","");
		if(data.status == "success") {
			window.sessionStorage.setItem("industrytype",industrytype);
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存成功！</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
			$("#dialog-dengdai").dialog("close");

			//保存成功
			$("#edit").show();
            $("#look").show();
            $("#save").hide();
			$("#close").hide();
			$("#close_Return").hide();
			$('.editable').editable('disable');
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
//校验项
var sj_jiaoyan = {p00: [{field:"companyname",title:"企业名称"},
                        {field:"companaynumber",title:"组织机构代码"},
                        {field:"companysocietynumber",title:"统一社会信用代码"},
                        {field:"htornot",title:"环统是否覆盖"},
                        {field:"zlornot",title:"总量核查是否覆盖"},
                        {field:"zlornot",title:"组织机构代码"},
                        {field:"zbjznums",title:"自备发电机组数"},
                        {field:"dcnums",title:"露天堆场个数"},
                        {field:"cgnums",title:"有机液体储罐数"},
                        {field:"informant",title:"填报人"},
                        {field:"tel",title:"联系电话"},
                        {field:"legalmail",title:"邮箱"},
                        {field:"legalentitylx",title:"企业联系人"},
                        {field:"legaltel",title:"企业联系电话"}
                  ],
                  p10011: [{field:"companyname",title:"饭店名称"},
                        {field:"companaynumber",title:"组织机构代码"},
                        {field:"cateringtype",title:"餐饮类型"},
                        {field:"openmonths",title:"营业月份"},
                        {field:"openhourperiod",title:"营业时段"},
                        {field:"informant",title:"填报人"},
                        {field:"tel",title:"联系电话"},
//                        {field:"legalmail",title:"邮箱"},
                        {field:"legalentitylx",title:"企业联系人"},
                        {field:"legaltel",title:"企业联系电话"},
                        
                        {field:"acooknums",title:"固定灶头数"},
                        {field:"fueltype",title:"燃料名称"},
                        {field:"aheatfueltotal",title:"年消耗量"},
                        {field:"fuelunit",title:"单位"},
                        {field:"contype",title:"油烟净化器类型"}
                        
                  ],
                  p101: [{field:"companyname",title:"企业名称"},
	                   {field:"companaynumber",title:"组织机构代码"},
	                   {field:"companysocietynumber",title:"统一社会信用代码"},
	                   {field:"htornot",title:"环统是否覆盖"},
	                   {field:"zlornot",title:"总量核查是否覆盖"},
	                   {field:"zlornot",title:"组织机构代码"},
	                   {field:"zbjznums",title:"自备发电机组数"},
	                   {field:"dcnums",title:"露天堆场个数"},
	                   {field:"cgnums",title:"有机液体储罐数"},
	                   {field:"totalcoal",title:"年煤炭消耗量"},
	                   {field:"totalgas",title:"年燃气消耗量"},
	                   {field:"totaloil",title:"年燃油消耗量"},
	                   {field:"informant",title:"填报人"},
	                   {field:"tel",title:"联系电话"},
	                   {field:"legalmail",title:"邮箱"},
	                   {field:"legalentitylx",title:"企业联系人"},
	                   {field:"legaltel",title:"企业联系电话"}
	             ],
	             p204: [{field:"companyname",title:"企业名称"},
		                   {field:"companaynumber",title:"组织机构代码"},
		                   {field:"companysocietynumber",title:"统一社会信用代码"},
		                   {field:"htornot",title:"环统是否覆盖"},
		                   {field:"zlornot",title:"总量核查是否覆盖"},
		                   {field:"zlornot",title:"组织机构代码"},
		                   {field:"zbjznums",title:"自备发电机组数"},
		                   {field:"dcnums",title:"露天堆场个数"},
		                   {field:"cgnums",title:"有机液体储罐数"},
		                   {field:"fsornot",title:"是否有焚烧炉"},
		                   {field:"wateramount",title:"废水排放量"},
		                   {field:"waterdealratio",title:"废水自处理率"},
		                   {field:"watercoverornot",title:"污水处理池是否加盖"},
		                   {field:"informant",title:"填报人"},
		                   {field:"tel",title:"联系电话"},
		                   {field:"legalmail",title:"邮箱"},
		                   {field:"legalentitylx",title:"企业联系人"},
		                   {field:"legaltel",title:"企业联系电话"},
		                   {field:"producttype",title:"产品类型"}
		             ],
		      p3031: [{field:"companyname",title:"机场名称"},
	                   {field:"aflynums",title:"全年起降架次"},
	                   {field:"informant",title:"填报人"},
	                   {field:"tel",title:"联系电话"},
	                   {field:"mail",title:"邮箱"}
	             ],
             p4031: [{field:"companyname",title:"干洗店名称"},
	                   {field:"companaynumber",title:"组织机构代码"},
	                   {field:"informant",title:"填报人"},
	                   {field:"tel",title:"联系电话"},
//	                   {field:"legalmail",title:"邮箱"},
	                   {field:"legalentitylx",title:"干洗店联系人"},
	                   {field:"legaltel",title:"企业联系电话"}
	             ],
             p5011: [{field:"companyname",title:"养殖场名称"},
	                   {field:"companaynumber",title:"组织机构代码"},
	                   {field:"informant",title:"填报人"},
	                   {field:"tel",title:"联系电话"},
//	                   {field:"legalmail",title:"邮箱"},
	                   {field:"legalentitylx",title:"企业联系人"},
	                   {field:"legaltel",title:"企业联系电话"}
	             ],
             p6011: [{field:"companyname",title:"工地名称"},
	                   {field:"companynamename",title:"施工单位"},
	                   {field:"atotalaera",title:"占地面积"},
	                   {field:"aroadaera",title:"硬化道路面积"},
	                   {field:"asoilaera",title:"裸土面积"},
	                   {field:"informant",title:"填报人"},
	                   {field:"tel",title:"联系电话"},
//	                   {field:"legalmail",title:"邮箱"},
	                   {field:"legalentitylx",title:"企业联系人"},
	                   {field:"legaltel",title:"企业联系电话"}
	             ],
             p8011: [{field:"companyname",title:"加油站名称"},
                   {field:"companaynumber",title:"组织机构代码"},
                   
                   {field:"kgcompany",title:"控股集团"},
                   {field:"informant",title:"填报人"},
                   {field:"tel",title:"联系电话"},
//                   {field:"legalmail",title:"邮箱"},
                   {field:"legalentitylx",title:"加油站联系人"},
                   {field:"legaltel",title:"企业联系电话"},
                   
                   {field:"agasolinesale",title:"汽油销售量"},
                   {field:"adieselsale",title:"柴油销售量"},
                   {field:"contype",title:"回收方式"},
		             ],
                  
		}

//行业对应的键
var industrytype_key = {"煤炭开采和洗选业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"石油和天然气开采业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"黑色金属矿采选业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"有色金属矿采选业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"非金属矿采选业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"开采辅助活动":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"其它采矿业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"农副食品加工业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"食品制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"酒、饮料和精制茶制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"烟草制品业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"纺织业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"纺织服装、服饰业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"皮革、毛皮、羽毛及其制品和制鞋业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"木材加工和木、竹、藤、棕、草制品业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"家具制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"造纸和纸制品业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"印刷和记录媒介复制业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"文教、工美、体育和娱乐用品制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"石油加工、炼焦和核燃料加工业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"化学原料和化学制品制造业":{"key":"表p204_企业基本信息表","div_id":"p204"},
		"医药制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"化学纤维制造业":{"key":"表p204_企业基本信息表","div_id":"p204"},
		"橡胶和塑料制品业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"非金属矿物制品业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"黑色金属冶炼和压延加工业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"有色金属冶炼和压延加工业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"金属制品业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"通用设备制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"专用设备制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"汽车制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"铁路、船舶、航空航天和其它运输设备制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"电气机械和器材制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"计算机、通信和其它电子设备制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"仪器仪表制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"其它制造业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"废弃资源综合利用业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"金属制品、机械和设备修理业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"电力生产":{"key":"表p101_企业基本信息表","div_id":"p101"},
		"电力供应":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"工业热力生产和供应":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"民用热力生产和供应":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"燃气生产和供应业":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"民航飞机":{"key":"表p3031_机场基本信息表","div_id":"p3031"},
		"印刷印染":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"工业喷涂":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"其它溶剂使用":{"key":"表p4031_干洗店基本信息表","div_id":"p4031"},
		"畜禽养殖":{"key":"表p5011_养殖厂基本信息表","div_id":"p5011"},
		"施工扬尘":{"key":"表p6011_工地基本信息表","div_id":"p6011"},
		"堆场扬尘":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"生物质燃料":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"油气储运":{"key":"表p8011_加油站基本信息表","div_id":"p8011"},
		"废水处理":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"固废处理":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"烟气脱硝":{"key":"表p00_企业基本信息表","div_id":"p00"},
		"餐饮油烟":{"key":"表p10011_餐饮业基本信息表","div_id":"p10011"},
		"请填写":{"key":"表p00_企业基本信息表","div_id":"p00"}};