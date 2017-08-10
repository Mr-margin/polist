var taskId = "";
var version = "1.0";
var edit_state_url = BackstageIP+"dto/insert.do";//默认执行新建地址
var stype = "";//编辑还是保存

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
	$("#industrytype").bind('DOMNodeInserted', function(e) {
		if ($(e.target).html() == "民航飞机") {
			$("#gkgs_s").hide();//一级菜单隐藏
			$("#gongyeshebei").hide();//设备信息隐藏
			$("#canyin").hide();//餐饮
			$("#jiayouzhan").hide();//加油站
			$("#nian_title").hide();//年生产总值
			$("#nian_count").hide();//年生产总值
			$("#qijiang_title").show();//起降架次
			$("#qijiang_count").show();//起降架次
		}else if ($(e.target).html() == "油气储运") {
			$("#gkgs_s").hide();//一级菜单隐藏
			$("#gongyeshebei").hide();//设备信息隐藏
			$("#canyin").hide();//餐饮
			$("#jiayouzhan").show();//加油站
			$("#nian_title").hide();//年生产总值
			$("#nian_count").hide();//年生产总值
			$("#qijiang_title").hide();//起降架次
			$("#qijiang_count").hide();//起降架次
		}else if ($(e.target).html() == "餐饮油烟") {
			$("#gkgs_s").hide();//一级菜单隐藏
			$("#gongyeshebei").hide();//设备信息隐藏
			$("#jiayouzhan").hide();//加油站
			$("#canyin").show();//餐饮
			$("#nian_title").hide();//年生产总值
			$("#nian_count").hide();//年生产总值
			$("#qijiang_title").hide();//起降架次
			$("#qijiang_count").hide();//起降架次
		}else if ($(e.target).html() == "畜禽养殖") {
			$("#gongyeshebei").hide();//设备信息隐藏
			$("#canyin").hide();//餐饮
			$("#jiayouzhan").hide();//加油站
			$("#nian_title").hide();//年生产总值
			$("#nian_count").hide();//年生产总值
			$("#qijiang_title").hide();//起降架次
			$("#qijiang_count").hide();//起降架次
		}else if ($(e.target).html() == "其它溶剂使用") {
			$("#gongyeshebei").hide();//设备信息隐藏
			$("#canyin").hide();//餐饮
			$("#jiayouzhan").hide();//加油站
			$("#nian_title").hide();//年生产总值
			$("#nian_count").hide();//年生产总值
			$("#qijiang_title").hide();//起降架次
			$("#qijiang_count").hide();//起降架次
		}else if ($(e.target).html() == "施工扬尘") {
			$("#gongyeshebei").hide();//设备信息隐藏
			$("#canyin").hide();//餐饮
			$("#jiayouzhan").hide();//加油站
			$("#nian_title").hide();//年生产总值
			$("#nian_count").hide();//年生产总值
			$("#qijiang_title").hide();//起降架次
			$("#qijiang_count").hide();//起降架次
		}else{
			$("#gkgs_s").show();//一级菜单
			$("#gongyeshebei").show();//设备信息
			$("#canyin").hide();//餐饮
			$("#jiayouzhan").hide();//加油站
			$("#nian_title").show();//年生产总值
			$("#nian_count").show();//年生产总值
			$("#qijiang_title").hide();//起降架次
			$("#qijiang_count").hide();//起降架次
		}
		 if ( $(e.target).html() == "化学原料和化学制品制造业" ) {
			 $("#p211_huxue").show();
			 $("#p212_huxue").hide();
		 } else if ( $(e.target).html() == "化学纤维制造业" ) {
			 $("#p211_huxue").hide();
			 $("#p212_huxue").show();
		 } else {
			 $("#p211_huxue").hide();
			 $("#p212_huxue").hide();
		 }
		 if ( $(e.target).html() == "电力供应" || $(e.target).html() == "黑色金属冶炼和压延加工业" ||$(e.target).html() == "非金属矿物制品业"||$(e.target).html() == "电力生产") $("#jiben_3").show();//总量核查是否覆盖
		 else $("#jiben_3").hide();//总量核查是否覆盖
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
		$("#"+column.field).editable(column);
	});
	$.each(columns_jiayouzhan, function(i, column) {
		column.emptytext = emptytext;
		$("#jiayouzhan #"+column.field).editable(column);
	});
	$.each(columns_canyin, function(i, column) {
		column.emptytext = emptytext;
		$("#canyin #"+column.field).editable(column);
	});
	
	$.each(jiben_3, function(i, column) {
		column.emptytext = emptytext;
		$("#jiben_3 #"+column.field).editable(column);
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
		if ( $(e.target).html() == "是") {
			$("#jiben_3_1").show();
			$("#jiben_3_2").show();
			$("#jiben_3_3").show();
			$("#zlyear").show();
			$("#zlSO2").show();
			$("#zlNOx").show();
		} else {
			$("#jiben_3_1").hide();
			$("#jiben_3_2").hide();
			$("#jiben_3_3").hide();
			$("#zlyear").hide();
			$("#zlSO2").hide();
			$("#zlNOx").hide();
		}
	});
	//环统是否覆盖 是否的问题
	$("#htornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") {
			$("#jiben_2_1").show();
			$("#jiben_2_2").show();
			$("#jiben_2_3").show();
			$("#jiben_2_4").show();
			$("#jiben_2_5").show();
			$("#htyear").show();
			$("#htSO2").show();
			$("#htNOx").show();
			$("#htVOC").show();
			$("#htPM").show();
			$("#jiben_2_tr").show();
		} else {
			$("#jiben_2_1").hide();
			$("#jiben_2_2").hide();
			$("#jiben_2_3").hide();
			$("#jiben_2_4").hide();
			$("#jiben_2_5").hide();
			$("#htyear").hide();
			$("#htSO2").hide();
			$("#htNOx").hide();
			$("#htVOC").hide();
			$("#htPM").hide();
			$("#jiben_2_tr").hide();
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
	
	//设备信息的跳转事件
	$("#gkgs_s").click(function(){
		if ( stype != "look" ) {
			if(edit_show()){
				window.location.href="c.html";
			}else{
				//如果任务ID有内容，说明处于正常的编辑状态，不允许跳转
				if(taskId != ""){
					if ( edit == false ) {
						window.location.href="c.html";
					} else {
						$("#dialog-tiaozhuan-content").html("离开当前页面将无法保存您的信息，请保存或取消后继续操作。");
						$("#dialog-tiaozhuan").dialog("open");
					}
				}else{
					//任务ID为空说明页面不正常，可以跳转到其他页面
					window.location.href="c.html";
				}
			}
		} else {
			window.location.href="c.html";
		}
		
		
	});
	
	$("#add_p211").click(function(){
		var index = (new Date()).valueOf();
		var kongzhi = "<tr id=\"huaxue"+index+"\" class=\"zhong\"  height=\"51px\">" +
				"<td colspan=\"3\"><a id=\"\"></a></td>" +
				"<td colspan=\"3\"><a id=\"\"></a></td>" +
				"<td ><a id=\"\"></a></td>" +
				"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'p211_huxue_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
		$("#p211_huxue_table").append(kongzhi);
//		$.each(moduan_peizhi_3, function(i, column) {
//			column.emptytext = emptytext;
//			$("#dd"+index+" #"+column.field).editable(column);
//		});
	})
	$("#add_p212").click(function(){
		var index = (new Date()).valueOf();
		var kongzhi = "<tr id=\"huaxue"+index+"\" class=\"zhong\"  height=\"51px\">" +
				"<td colspan=\"2\"><a id=\"\"></a></td>" +
				"<td colspan=\"2\"><a id=\"\"></a></td>" +
				"<td colspan=\"2\"><a id=\"\"></a></td>" +
				"<td ><a id=\"\"></a></td>" +
				"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'p211_huxue_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
		$("#p212_huxue_table").append(kongzhi);
//		$.each(moduan_peizhi_3, function(i, column) {
//			column.emptytext = emptytext;
//			$("#dd"+index+" #"+column.field).editable(column);
//		});
	})
	
});
//通用的设备删除行
function moduan_delete(obj, table){
	//删除父节点的父节点的父节点
	$(obj).parent().parent().parent().remove();
	var index = $("#"+table+" tr").length;//获取当前表格的行数量
	if(index == 1){
		//如果只有一行了，说明只剩标题行，整个表格应该隐藏
		$("#"+table).hide();
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
	var data = ajax_async_t(BackstageIP+"dto/selectCompany.do",{taskId:taskId,userId:userId,version:version},"json ","true");
	if( data != null && data !=undefined && data!=null) {
		console.log(data);
		//获取到值，开始初始化,编辑状态锁死
		$("#companyId").editable("setValue",data.companyId);//企业名称页面没有显示，暂存
		$("#companyname").editable("setValue",data.companyname);
		$("#companaynumber").editable("setValue",data.companaynumber);
		$("#industrytype").editable("setValue",data.industrytype);
		$("#legalentity").editable("setValue",data.legalentity);
		$("#informant").editable("setValue",data.informant);
		$("#tel").editable("setValue",data.tel);
		$("#gdp").editable("setValue",data.gdp);
		$("#boilernumbers").editable("setValue",data.boilernumbers);
		$("#boilertons").editable("setValue",data.boilertons);
		$("#kilnnumbers").editable("setValue",data.kilnnumbers);
		
		$("#opendate").editable("setValue",data.opendate);
		$("#openhours").editable("setValue",data.openhours);
		$("#lon1").editable("setValue",data.lon1);
		$("#lon2").editable("setValue",data.lon2);
		$("#lon3").editable("setValue",data.lon3);
		$("#lat1").editable("setValue",data.lat1);
		$("#lat2").editable("setValue",data.lat2);
		$("#lat3").editable("setValue",data.lat3);
		$("#mail").editable("setValue",data.mail);
		$("#prov").html(data.prov);
		$("#city").html(data.city);
		
		$("#companysocietynumber").editable("setValue",data.companysocietynumber);
		$("#pwnumber").editable("setValue",data.pwnumber);
		$("#pwSO2").editable("setValue",data.pwSO2);
		$("#pwNOx").editable("setValue",data.pwNOx);
		$("#htornot").editable("setValue",data.htornot);
		$("#htyear").editable("setValue",data.htyear);
		$("#htSO2").editable("setValue",data.htSO2);
		$("#htNOx").editable("setValue",data.htNOx);
		$("#htVOC").editable("setValue",data.htVOC);
		$("#htPM").editable("setValue",data.htPM);
		
		$("#legalentitylx").editable("setValue",data.legalentitylx);
		$("#legaltel").editable("setValue",data.legaltel);
		$("#legalmail").editable("setValue",data.legalmail);
		
		$("#zlornot").editable("setValue",data.zlornot);
		$("#zlyear").editable("setValue",data.zlyear);
		$("#zlSO2").editable("setValue",data.zlSO2);
		$("#zlNOx").editable("setValue",data.zlNOx);
		
		
		
		
		
//		$("#2222222").editable("setValue",data.22222);
//		$("#22222222").editable("setValue",data.2222222222);
//		$("#2222222").editable("setValue",data.22222);
//		$("#22222222").editable("setValue",data.2222222222);
//		$("#2222222").editable("setValue",data.22222);
//		$("#22222222").editable("setValue",data.2222222222);
//		$("#2222222").editable("setValue",data.22222);
//		$("#22222222").editable("setValue",data.2222222222);
		
		
		
		
		
		
		
		//这里写了两边赋值，因为editable初始化的时候，级联下拉框获取不到值，赋值的时候，不能在页面显示，单独写一遍可以实现显示
		$("#county").editable("setValue",data.county);
		$("#county").html(data.county);
		$("#vill").editable("setValue",data.vill);
		$("#street").editable("setValue",data.street);
		
		$("#agasolinesale").editable("setValue",data.agasolinesale);
		$("#adieselsale").editable("setValue",data.adieselsale);
		$("#jiayouzhan #contype").editable("setValue",data.contype);
		$("#canyin #contype").editable("setValue",data.contype);
		$("#jiayouzhan #conratio").editable("setValue",data.conratio);
		$("#canyin #conratio").editable("setValue",data.conratio);
		$("#acooknums").editable("setValue",data.acooknums);
		$("#agasspeed").editable("setValue",data.agasspeed);
		$("#ahours").editable("setValue",data.ahours);
		$("#aflynums").editable("setValue",data.aflynums);
		if ( data.edit == false ) {
			$("#edit").hide();
			edit = false;
		} else {
			$("#edit").show();
			edit = true;
		}
		
		
		$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
		edit_state_url = BackstageIP+"dto/updateCompany.do";//如果已经有值，执行保存地址
		get_lon_lat();//获取经纬度坐标并进行定位
		window.sessionStorage.setItem("industrytype",data.industrytype);
	}else{
		//没有数据，编辑状态打开
		$("#edit").hide();
		$("#save").show();
		$("#close_Return").show();
		$('.editable').editable('enable');
	}
}

//数据校验
function Data_check(){
	var check_Result = [];
	if(typeof $("#companyname").editable("getValue").companyname == "undefined") check_Result.push("企业名称");
	if(typeof $("#companaynumber").editable("getValue").companaynumber == "undefined") check_Result.push("组织机构代码");
	if(typeof $("#industrytype").editable("getValue").industrytype == "undefined") check_Result.push("行业类别");
	if($("#industrytype").html() == "油气储运"){
		
		if(typeof $("#agasolinesale").editable("getValue").agasolinesale == "undefined") check_Result.push("汽油销售量");
		if(typeof $("#jiayouzhan #contype").editable("getValue").contype == "undefined") check_Result.push("回收方式");
		if(typeof $("#adieselsale").editable("getValue").adieselsale == "undefined") check_Result.push("柴油销售量");
	}
	
	
	if($("#industrytype").html() == "餐饮油烟"){
		if(typeof $("#ahours").editable("getValue").ahours == "undefined") check_Result.push("年总经营时间");
		if(typeof $("#canyin #contype").editable("getValue").contype == "undefined") check_Result.push("油烟净化器类型");
		if(typeof $("#acooknums").editable("getValue").acooknums == "undefined") check_Result.push("固定灶头数");
		if(typeof $("#agasspeed").editable("getValue").agasspeed == "undefined") check_Result.push("烟气排放速率");
	}
	if($("#industrytype").html() == "民航飞机"){
		if(typeof $("#aflynums").editable("getValue").aflynums == "undefined") check_Result.push("起降架次");
	}
	if(typeof $("#informant").editable("getValue").informant == "undefined") check_Result.push("填报人");
	if(typeof $("#tel").editable("getValue").tel == "undefined") check_Result.push("联系电话");
	if(typeof $("#mail").editable("getValue").mail == "undefined") check_Result.push("邮箱");
	
	if(typeof $("#companysocietynumber").editable("getValue").companysocietynumber == "undefined") check_Result.push("统一社会信用代码");
	if(typeof $("#pwnumber").editable("getValue").pwnumber == "undefined") check_Result.push("排污许可证编号");
	if(typeof $("#pwSO2").editable("getValue").pwSO2 == "undefined") check_Result.push("SO2总量控制限值");
	if(typeof $("#pwNOx").editable("getValue").pwNOx == "undefined") check_Result.push("NOx总量控制限值");
	
	if(typeof $("#zbjznums").editable("getValue").zbjznums == "undefined") check_Result.push("自备发电机组数");
	if(typeof $("#cgnums").editable("getValue").cgnums == "undefined") check_Result.push("有机液体储罐数");
	if(typeof $("#dcnums").editable("getValue").dcnums == "undefined") check_Result.push("露天堆场个数");
	
	if(typeof $("#legalentitylx").editable("getValue").legalentitylx == "undefined") check_Result.push("企业填报人");
	if(typeof $("#legaltel").editable("getValue").legaltel == "undefined") check_Result.push("企业联系电话");
	if(typeof $("#legalmail").editable("getValue").legalmail == "undefined") check_Result.push("企业邮箱");
	
	if(typeof $("#county").editable("getValue").county == "undefined"){
		check_Result.push("企业所在省、市、县");
	}
	
	if(typeof $("#lon1").editable("getValue").lon1 == "undefined"){
		check_Result.push("企业经维度坐标");
	}else if(typeof $("#lon2").editable("getValue").lon2 == "undefined"){
		check_Result.push("企业经维度坐标");
	}else if(typeof $("#lon3").editable("getValue").lon3 == "undefined"){
		check_Result.push("企业经维度坐标");
	}else if(typeof $("#lat1").editable("getValue").lat1 == "undefined"){
		check_Result.push("企业经维度坐标");
	}else if(typeof $("#lat2").editable("getValue").lat2 == "undefined"){
		check_Result.push("企业经维度坐标");
	}else if(typeof $("#lat3").editable("getValue").lat3 == "undefined"){
		check_Result.push("企业经维度坐标");
	}
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
	$("#dialog-dengdai-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-dengdai").dialog("open");
	
	var jsonobj = {};
	jsonobj.userId = userId;
	jsonobj.taskId = taskId;
	jsonobj.version = version;
	jsonobj.isCompany = true;
	
	jsonobj.value = {};
	//用户填写的行业
	var industrytype = $("#industrytype").editable("getValue").industrytype;
	
	var jiben_jihe = {"prov":$("#prov").html(),"city":$("#city").html()};
	
	var p3032 ={};
	var p8012 = {};
	var p10012 = {};
	
	$("#qiye .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
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
		}else if($(this).attr("id") == "agasspeed"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}else if($(this).attr("id") == "ahours"){
			if($(this).is(":visible")) p10012[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		} else{
			if($(this).is(":visible")) jiben_jihe[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
		}
		
	});
	if(!$.isEmptyObject(jiben_jihe)) jsonobj.value["表p00_企业基本信息表"] = [jiben_jihe];
	if(!$.isEmptyObject(p3032)){
		var num1 = GetRandomNum(1,10000000);
		p3032["equipId"] = "unknown"+num1;
		jsonobj.value["表p3032_机场信息表"] = [p3032];
	}
	if(!$.isEmptyObject(p8012)){
		var num2 = GetRandomNum(1,10000000);
		p8012["equipId"] = "unknown"+num2;
		jsonobj.value["表p8012_加油站信息表"] = [p8012];
	}
	if(!$.isEmptyObject(p10012)){
		var num3 = GetRandomNum(1,10000000);
		p10012["equipId"] = "unknown"+num3;
		jsonobj.value["表p10012_餐饮业信息表"] = [p10012];
	}
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
//修改密码
function xiugaimima_anniu() {
	var old_pass = $("#old_pass").val();
	if(old_pass == "" || old_pass == null || old_pass == undefined ) {
		toastr["info"]("提示","原密码不能为空");
		return;
	}
	var str = $("#new_pass").val();
	var str1 = $("#new_pass_2").val();
	if(str == "" || str == null || str == undefined ) {
		toastr["info"]("提示","新密码不能为空");
		return;
	}
	if(str1 == "" || str1 == null || str1 == undefined ) {
		toastr["info"]("提示","确认密码不能为空");
		return;
	}
	if( str == str1){
		
	} else {
		toastr["info"]("提示","两次新密码不相同");
		return;
	}
	if(str.length<6){
		toastr["info"]("提示","新密码长度不能小于6");
		return;
	}
	var user_id = dataBase.Login_map.ID
	var data = ajax_async_t("../../updatePassword.do",{old_password:old_pass,new_password:str,u_id:userId},"json");
	if ( data == "1" ) {
		toastr["success"]("提示","修改成功");
		$( "#dialog-update").dialog("close")
		$("#old_pass").val("");
		$("#new_pass").val("");
		$("#new_pass_2").val("");
		
	} else if ( data == "2" ) {
		toastr["info"]("提示","修改失败");
	} else if ( data == "3" ) {
		toastr["info"]("提示","原密码错误");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
	}
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