jQuery.support.cors = true;
var sa = {"化石燃料固定燃烧源":"1","工艺过程源":"2","移动源":"3","溶剂使用源":"4","农业源":"5","扬尘源":"6","储存运输源":"7","生物质燃烧源":"8","废物处理源":"9","其他排放源":"10"};

$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	parameter=Request['par'];
	updatacity();//对地区赋值
	uplist();//对任务赋值
	uptbody();
	$("#caozuo_div2").css("margin-top",($("#caozuo_div1").height()-33)/2);
//	if ( dataBase.Login_map.TYPE == "8" ) $("#caozuo_div1").hide();
 });
function zhenduan_select(){
	var section = $("#zhenduan_select :selected").text();
	var html="";
	for(prop in dataAll1){
		if(prop == section){
			var data=dataAll1[prop];
			for(var i=0;i<data.length;i++)
			{
				html+="<option id='hangye"+i+"' value='"+data[i].ID+"' name='hy_name' >"+data[i].SCC2+"</option>";
			}
		}
	}
	$("#zhenduan_select1").html(html);
}

/**
 * 点击用户类型刷洗列表
 */
function checked_yh() {
	uptbody();
	if ($('input[name="yonghuname"]').filter(':checked').val() == "企业" ) {
		$("#qy_name_div").show();
		$("#shr_name_div").show();
		$("#qy_region").show();
	} else {
		$("#qy_name_div").hide();
		$("#shr_name_div").hide();
		$("#qy_region").hide();
	}
}

var referparam = [];//判断是点击查询按钮出现的表格还是通过点击分析图的点柱出现的表格。""为查询，否则为点击图。
var changeState = "";//用于判断是否更换了筛选条件
var sourceNum = "";//缓存排放源

var myChart_1,myChart_2,myChart_3,myChart_4;
//调用父页面的全局变量
var dataBase = parent.dataBase;

window.onresize=function () { //浏览器调整大小后，自动对所有的图进行调整
	try{
		if(myChart_1){
			myChart_1.resize();
		}
		if(myChart_2){
			myChart_2.resize();
		}
		if(myChart_3){
			myChart_3.resize();
		}
		if(myChart_4){
			myChart_4.resize();
		}
	}catch(e){
	}
};

var version ="1.0";
var countryLength = 0;//存放城市长度
//对排放源赋值
function upsource(){
	parameter=$("#zhenduan_select").val();
	a:for(var i=0; i<sj_data.length; i++){//为标题赋值
		if(sj_data[i].id == parameter){
			var pangfangyuan = sj_data[i].value;
			var html = "";
			for(var y=0; y<pangfangyuan.length; y++){
				html += "<option id='hangye"+y+"' value='"+pangfangyuan[y].id+"' name='hy_name' >"+pangfangyuan[y].value+"</label>";
			}
			$("#zhenduan_select1").html(html);
			break a;
		}
	}
}
var dataALl;
//对任务赋值
function uplist(){
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	var ut="5";
	if(radio=="企业"){
		ut="5";
	}else if(radio=="市填报用户"){
		ut="4";
	}else{
		ut="6";
	}
	var data = ajax_async_t(BackstageIP+"taskDataFill/listSimpleTask.do",{version:version,createUserId:dataBase.Login_map.SOLE,flag:false,userType:dataBase.Login_map.TYPE},"JSON","1","POST");
	var html = "";
	dataAll=data.data;
	if(data != undefined && data !=null && data != ""){
		if(data.status == "success"){
			var datas = data.data;
			if(datas.length > 0){
				for(var i=0; i<datas.length; i++){//循环出任务下拉框
					html += "<option value='"+datas[i].id+"'>"+datas[i].name+"</option>"; 
				}
				$("#select_1").html(html);
				chang_sel();
			}else{
				toastr["info"]("","暂无提交任务");
				return;
			}
			
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//对地区赋值
function updatacity(){
	var data = ajax_async_t(BackstageIP+"userManager/findRegion.do",{userId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data !=undefined&&data != null && data !=""){
		if(data.status=="success"){
			if(data.data.length>0){
				countryLength = data.data.length;
				var html = "<div class='checkbox checkbox-info' style='margin:0px;width:100%;'>";
				html += "<input onclick=\"quanxuan();\" id='quanxuan' name='classdiquAll' type='checkbox' value='' checked='true'/>";
				html += "<label for='quanxuan' style='width:6%;'>全选</label>";
				
				for(var i=0; i<countryLength; i++){
					html += "<input onclick=\"notallsel();\" id='checkbox"+i+"' type='checkbox' value='"+data.data[i].code+"' name='classdiqu' checked='true'/>";
					html += "<label for='checkbox"+i+"' style='width:6%;'>"+data.data[i].name+"</label>";
				}
				html += "</div>";
				$("#diqu_div").html(html);
			}
		}else{
			toastr["info"]("错误信息",data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//点击企业
function clickqiye(){
	/*$("#city_allDiv").show();
	$("#sj_table").hide();//市级文件列表
	$("#qy_table").show();*///企业列表
	//updatacity();//对地区赋值
	uplist();//对任务赋值
	//uptbody();
}

//点击市级填报
function clickcity(i){
	/*$("#city_allDiv").hide();
	$("#qy_table").hide();//企业列表
	$("#sj_table").show();//市级文件列表
	$("#shi_tudiv1").html('');
	$("#shi_tudiv2").html('');
	$("#shi_sele_1").val('');
	$("#shi_sele_2").val('');*/
	uplist();//对任务赋值
	//uptbody(i);
}

//应该查询哪个文件列表
function uptbody(i){
	$("#shi1").hide();
	$("#shi2").hide();
	$("#shi3").hide();
	referparam = [];
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	sourceNum = $('#zhenduan_select1').val();//排放源id
	var taskId = $("#select_1").val();//任务id
	$("#shi_tudiv1").html('');
	$("#shi_tudiv2").html('');
	$("#shi_sele_1").val('');
	$("#shi_sele_2").val('');
	$("#select_a").val("a");
	if ( taskId == "" || taskId == null || taskId == undefined ) return ;
	if ( radio == "" || radio == null || radio == undefined ) return toastr["info"]("请选择用户类型");
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');
	if(radio == "企业"){
		if(status == ""){
			toastr["info"]("提示","请选择审核状态");
		}else if(region == ""){
			toastr["info"]("提示","请选择企业所在地区");
		}else{
			var data = ajax_async_t(BackstageIP+"analysis/itemPool/cmrCompany.do",{version:version,sourceId:sourceNum,taskId:taskId,region:region,status:status,userId:dataBase.Login_map.SOLE,verifier:$("#shr_name").val()},"JSON","1","POST");
			if(data!=undefined&&data!=null&&data!=""){
				if(data.status=="success"){
					$("#sj_table").hide();
					$("#qy_table").show();
					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
					metTable_initialization();//生成企业表格
					$("#metTable1 thead tr:first th .th-inner").addClass("thalign");//表格标题左对齐
					$("#metTable1 thead tr:first th .th-inner").show();
					changeState = "";//点击了查询按钮
					$("#qy_tudiv1").html("");
					$("#qy_tudiv2").html("");
					getSelectCompany();//更新企业分析图中的查询条件
				}else{
					toastr["info"]("错误信息",data.error);
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
		}
	}else{
			if(status == ""){
				toastr["info"]("提示","请选择审核状态");
			}else{
				$("#qy_table").hide();
				$("#sj_table").show();
				$('#metTable2').bootstrapTable('destroy');//销毁表格数据
				metTable_initialization_2();//更新市级表格
				$("#metTable2 thead tr:first th .th-inner").addClass("thalign");
				$("#metTable2 thead tr:first th .th-inner").show();
				changeState = "";//点击了查询按钮
				$("#sj1_tudiv1").html("");
				$("#sj1_tudiv2").html("");
			}
	}
}

var active;//活动水平
var ef;//排放因子
var eta;//去除效率
var emis ;//排放量
//获取企业分析图中的查询条件
function getSelectCompany(){
	var data = ajax_async_t(BackstageIP+"analysis/check/config/company.do",{
		sourceId:$('#zhenduan_select1').val(),
		createUserId:dataBase.Login_map.SOLE,
		version:version},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			active = data.data.active;
			ef = data.data.ef;
			eta = data.data.eta;
			emis = data.data.emis;
			//活动水平-左
			var html_active_left = "";
			for(var i=0; i<active.left.length; i++){
				html_active_left += "<option value='"+active.left[i].value+"'>"+active.left[i].name+"</option>";
				if(i==0){
					openPic_2("1",active.left[i].value);
				}
			}
			$("#qy_sele_1").html(html_active_left);
			
			if( $("#qy_sele_1").val() == "" || $("#qy_sele_1").val() == "" || $("#qy_sele_1").val() == null ) {
				$("#div_qy_sele_1").hide();
				
			} else {
				$("#div_qy_sele_1").show();
			}
			
			
			
			//活动水平-右
			var html_active_rigth = "";
			for(var i=0; i<active.right.length; i++){
				html_active_rigth += "<option value='"+active.right[i].value+"'>"+active.right[i].name+"</option>";
				if(i==0){
					openPic_2("2",active.right[i].value);
				}
			}
			$("#qy_sele_2").html(html_active_rigth);
			if( $("#qy_sele_2").val() == "" || $("#qy_sele_2").val() == "" || $("#qy_sele_2").val() == null ) {
				$("#div_qy_sele_2").hide();
				
			} else {
				$("#div_qy_sele_2").show();
			}
			
			
		}else{
			toastr["info"]("提示",JSON.stringify(data));
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//点击切换页签-活动水平
function clickTab(par){
	var html_left = "";//左图
	var html_rigth = "";//右图
	$("#pictures").show();
	if(par == "a"){
		//活动水平-左
		for(var i=0; i<active.left.length; i++){
			html_left += "<option value='"+active.left[i].value+"'>"+active.left[i].name+"</option>";
			if(i==0){
				openPic_2("1",active.left[i].value);
			}
		}
		//活动水平-右
		for(var i=0; i<active.right.length; i++){
			html_rigth += "<option value='"+active.right[i].value+"'>"+active.right[i].name+"</option>";
			if(i==0){
				openPic_2("2",active.right[i].value);
			}
		}
	}else if(par =="b"){
		//排放因子-左
		for(var i=0; i<ef.left.length; i++){
			html_left += "<option value='"+ef.left[i].value+"'>"+ef.left[i].name+"</option>";
			if(i==0){
				openPic_2("1",ef.left[i].value);
			}
		}
		//排放因子-右
		for(var i=0; i<ef.right.length; i++){
			html_rigth += "<option value='"+ef.right[i].value+"'>"+ef.right[i].name+"</option>";
			if(i==0){
				openPic_2("2",ef.right[i].value);
			}
		}
	}else if(par =="c"){
		//去除效率-左
		for(var i=0; i<eta.left.length; i++){
			html_left += "<option value='"+eta.left[i].value+"'>"+eta.left[i].name+"</option>";
			if(i==0){
				openPic_2("1",eta.left[i].value);
			}
		}
		//去除效率-右
		var html_eta_rigth = "";
		for(var i=0; i<eta.right.length; i++){
			html_rigth += "<option value='"+eta.right[i].value+"'>"+eta.right[i].name+"</option>";
			if(i==0){
				openPic_2("2",eta.right[i].value);
			}
		}
	} else if ( par == "e" ) {

		//排放量-左
		for(var i=0; i<emis.left.length; i++){
			html_left += "<option value='"+emis.left[i].value+"'>"+emis.left[i].name+"</option>";
			if(i==0){
				openPic_2("1",emis.left[i].value);
			}
		}
		//排放量-右
		var html_eta_rigth = "";
		for(var i=0; i<emis.right.length; i++){
			html_rigth += "<option value='"+emis.right[i].value+"'>"+emis.right[i].name+"</option>";
			if(i==0){
				openPic_2("2",emis.right[i].value);
			}
		}
	
	}else{
		$("#pictures").hide();
	}
	$("#qy_sele_1").html(html_left);
	$("#qy_sele_2").html(html_rigth);
	
	
	if( $("#qy_sele_1").val() == "" || $("#qy_sele_1").val() == "" || $("#qy_sele_1").val() == null ) {
		$("#div_qy_sele_1").hide();
		
	} else {
		$("#div_qy_sele_1").show();
	}
	if( $("#qy_sele_2").val() == "" || $("#qy_sele_2").val() == "" || $("#qy_sele_2").val() == null ) {
		$("#div_qy_sele_2").hide();
		
	} else {
		$("#div_qy_sele_2").show();
	}
	
}
//点击切换页签-活动水平_市级
function shi_clickTab(par){
	var html_left = "";//左图
	var html_rigth = "";//右图
	$("#shi_pictures").show();
	if(par == "a"){
		//活动水平-左
		for(var i=0; i<shi_active.left.length; i++){
			html_left += "<option value='"+shi_active.left[i].value+"'>"+shi_active.left[i].name+"</option>";
			if(i==0){
				shi_openPic_2("1",shi_active.left[i].value);
			}
		}
		//活动水平-右
		for(var i=0; i<shi_active.right.length; i++){
			html_rigth += "<option value='"+shi_active.right[i].value+"'>"+shi_active.right[i].name+"</option>";
			if(i==0){
				shi_openPic_2("2",shi_active.right[i].value);
			}
		}
	}else if(par =="b"){
		//排放因子-左
		for(var i=0; i<shi_ef.left.length; i++){
			html_left += "<option value='"+shi_ef.left[i].value+"'>"+shi_ef.left[i].name+"</option>";
			if(i==0){
				shi_openPic_2("1",shi_ef.left[i].value);
			}
		}
		//排放因子-右
		for(var i=0; i<shi_ef.right.length; i++){
			html_rigth += "<option value='"+shi_ef.right[i].value+"'>"+shi_ef.right[i].name+"</option>";
			if(i==0){
				shi_openPic_2("2",shi_ef.right[i].value);
			}
		}
	}else if(par =="c"){
		//去除效率-左
		for(var i=0; i<shi_eta.left.length; i++){
			html_left += "<option value='"+shi_eta.left[i].value+"'>"+shi_eta.left[i].name+"</option>";
			if(i==0){
				shi_openPic_2("1",shi_eta.left[i].value);
			}
		}
		//去除效率-右
		var html_eta_rigth = "";
		for(var i=0; i<shi_eta.right.length; i++){
			html_rigth += "<option value='"+shi_eta.right[i].value+"'>"+shi_eta.right[i].name+"</option>";
			if(i==0){
				shi_openPic_2("2",shi_eta.right[i].value);
			}
		}
	} else if ( par == "e" ) {
		//排放量-左
		for(var i=0; i<shi_emis.left.length; i++){
			html_left += "<option value='"+shi_emis.left[i].value+"'>"+shi_emis.left[i].name+"</option>";
			if(i==0){
				shi_openPic_2("1",shi_emis.left[i].value);
			}
		}
		//排放量-右
		var html_eta_rigth = "";
		for(var i=0; i<shi_emis.right.length; i++){
			html_rigth += "<option value='"+shi_emis.right[i].value+"'>"+shi_emis.right[i].name+"</option>";
			if(i==0){
				shi_openPic_2("2",shi_emis.right[i].value);
			}
		}
	}else{
		$("#shi_pictures").hide();
	}
	$("#shi_sele_1").html(html_left);
	$("#shi_sele_2").html(html_rigth);
}

var all_index1 ;
var all_index2 ;
//企业出图
function openPic_2(id,value){
	$("#shi3").show();
	if(id=="1"){
		//开启图形
		myChart_1 = echarts.init(document.getElementById("qy_tudiv1"), 'macarons');//声明id为1的div为图形dom
		myChart_1.showLoading();
	}else{
		//开启图形
		myChart_2 = echarts.init(document.getElementById("qy_tudiv2"), 'macarons');//声明id为2的div为图形dom
		myChart_2.showLoading();
	}
	var taskId = $("#select_1").val();//任务id
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");

	var sourceId = $('#zhenduan_select1').val();//排放源id
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');
	
	$.ajax({  		       
		url: BackstageIP+"analysis/check/company/chart.do",
		type: "POST",
		async:true,
		dataType: "JSON",
		data: {
			masterTaskId : taskId,//任务id
			version : version,//版本号
			sourceId : sourceId,//排放源id
			status : status,//状态
			createUserId : dataBase.Login_map.SOLE,
			value:value,
			region:region
		},
		success: function (ret) {
			if(id=="1"){
				//开启图形
				myChart_1.hideLoading();
			}else{
				//开启图形
				myChart_2.hideLoading();
			}
			var datas = ret;
			if(datas != undefined){
				if(datas.status=="success"){
					if( id == "1" ) {
						all_index1 = datas;
					} else {
						all_index2 = datas;
					}
					var data = datas.data;
					var option;
					var Xmax,Ymax;//坐标轴的取值范围
					if(data.Xmax == "0" || typeof data.Xmax == undefined){
						Xmax = 'auto';
					}else{
						Xmax = data.Xmax;
					}
					if(data.Ymax == "0" || typeof data.Ymax == undefined){
						Ymax = 'auto';
					}else{
						Ymax = data.Ymax;
					}
					if(data.type=="bar" || data.type=="bars"){//柱状图
						//添加提示框的内容
						var legend = "";
						for(var i=0; i<data.legend.length; i++){
							if(i == 0){
								legend += data.xAxis+':{b'+i+'}<br>';
							}
							legend += '{a'+i+'}:{c'+i+'}<br>';
						}
						//添加mark线
						var series = data.value;
						if(data.LineX != null){
							for(var ii=0; ii<data.LineX.length; ii++){
								series.push(data.LineX[ii]);
							}
						}
						if(data.LineY != null){
							for(var ii=0; ii<data.LineY.length; ii++){
								series.push(data.LineY[ii]);
							}
						}
						option = {
								tooltip: {
									trigger:'axis',
//									enterable:true,//鼠标是否能进入到提示框中
									formatter: legend
								},
							    legend: {
							        data: data.legend,
							    },
								grid: {
									left: '8%',
									right: '8%',
									bottom: '10%',
									containLabel: true
								},
								xAxis: {
									type:"category",
									data:data.Xdata,
									name:data.xAxis,
									nameLocation:'middle',
									nameGap:30,
									max: Xmax,
									axisLabel:{//坐标轴文本标签选项
										interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:25,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
									},
								},
								yAxis: {
									axisLabel: {
										formatter: '{value}'
									},
									name:data.yAxis,
									nameLocation:'middle',
									nameGap:Ymax>1?Ymax.toString().length*6:30,
									nameTextStyle:{
										fontStyle:"normal",
										fontSize:"6"
									},
									max: Ymax,
									min: 0
								},
								series:series
						};
					}else if(data.type=="pie"){//饼图
						var  legend = data.legend;
						option = {
							    title : {
							        text: '',
							        subtext: '',
							        x:'center'
							    },
							    tooltip : {
							        trigger: 'item',
							        formatter: "{a} <br/>{b} : {c} ({d}%)"
							    },
							    legend: {
							        orient: 'vertical',
							        left: 'left',
							        data: data.legend
							    },
							    series : [
							        {
							            name: data.xName,
							            type: 'pie',
							            radius : '55%',
							            center: ['50%', '60%'],
							            data:data.value,
							            itemStyle: {
							                emphasis: {
							                    shadowBlur: 10,
							                    shadowOffsetX: 0,
							                    shadowColor: 'rgba(0, 0, 0, 0.5)'
							                }
							            }
							        }
							    ]
							};
					}else if(data.type=="point"){//散点图
						var legend = data.legend;
						var newdatas = [];
						for(var i=0; i<data.data.length; i++){
							var tip_name = "";
							for(var y=0; y<legend.length; y++){
								if(y != 0){
									tip_name += "<br>";
								}
								tip_name += legend[y].name+":"+data.data[i][legend[y].param];
							}
							var data_1;

							data_1 = {
									name: tip_name,
									data: [[data.data[i].x,data.data[i].y]],
									type: 'scatter'
							};
							newdatas.push(data_1);
						}
						var data_2;
						for(var i=0; i<data.Linetipvalue.length; i++){
							data_2 = {
									name: i,
									type: 'scatter',
									markLine: {
										tooltip: {
											formatter: data.Linetipvalue[i].formatter
										},
										data: [
										       [{
										    	   coord: data.Linetipvalue[i].star,
										    	   symbol: 'none'
										       }, {
										    	   coord: data.Linetipvalue[i].end,
										    	   symbol: 'none'
										       }]
										       ]
									}
							};
							newdatas.push(data_2);
						}
						option = {
								tooltip: {
									formatter: '{a}'
								},
								grid: {
									left: '8%',
									right: '8%',
									bottom: '10%',
									containLabel: true
								},
								xAxis: {
									name:data.xAxis,
									nameLocation:'middle',
									nameGap:30,
									max: Xmax,
									min: 0,
									axisLabel:{//坐标轴文本标签选项
										interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:25,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
									}
								},
								yAxis: {
									name:data.yAxis,
									nameLocation:'middle',
									nameGap:data.Ymax.toString().length*10,
//									nameGap:Ymax>1?Ymax.toString().length*6:30,
									max: Ymax,
									min: 0,
									nameTextStyle:{
										fontStyle:"normal",
										fontSize:"6"
									}
								},
								series: newdatas
						};
					}

					if(id=="1"){
						myChart_1.setOption(option);
						myChart_1.on('click', function (params) {
							if(data.type == "point"){
								getAnotherCompanytable("point",id,data.data[params.seriesIndex].index);
							}else if(data.type == "bar"){
								getAnotherCompanytable("bar",id,params.name);
							}else{
								
							}
						});
					}else{
						myChart_2.setOption(option);
						myChart_2.on('click', function (params) {
							if(data.type == "point"){
								getAnotherCompanytable("point",id,data.data[params.seriesIndex].index);
							}else if(data.type == "bar"){
								getAnotherCompanytable("bar",id,params.name);
							}else{
								getAnotherCompanytable("pie",id,params.name);
							}
						});
					}
				}
			}else{
				toastr["info"]("错误信息","数据库无返回值")
			}
		},
		error: function (e) { 
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}  
	});
}
var per='45%';
//市填报出图
var shi_all_index1;
var shi_all_index2;
function shi_openPic_2(id,value){
	$("#shi3").show();
	if(id=="1"){
		//开启图形
		myChart_1 = echarts.init(document.getElementById("shi_tudiv1"), 'macarons');//声明id为1的div为图形dom
		myChart_1.showLoading();
	}else{
		//开启图形
		myChart_2 = echarts.init(document.getElementById("shi_tudiv2"), 'macarons');//声明id为2的div为图形dom
		myChart_2.showLoading();
	}
	var taskId = $("#select_2").val();//任务id
	var sourceId = $('#zhenduan_select1').val();//排放源id
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	$.ajax({  		       
		url: BackstageIP+"analysis/check/file/chart.do",
		type: "POST",
		async:true,
		dataType: "JSON",
		data: {
//			masterTaskId : taskId,//任务id
			version : version,//版本号
//			sourceId : sourceId,//排放源id
//			status : status,//状态
			createUserId : dataBase.Login_map.SOLE,
			value:value,
			fileId:shi_fileId,
			fileBigIndex:shi_bigIndex
//			region:region
		},
		success: function (ret) {
			if(id=="1"){
				//开启图形
				myChart_1.hideLoading();
				shi_all_index1 = ret;
			}else{
				//开启图形
				myChart_2.hideLoading();
				shi_all_index2 = ret;
			}
			var datas = ret;
			if(datas != undefined){
				if(datas.status=="success"){
					var data = datas.data;
					var option;
					var Xmax,Ymax;//坐标轴的取值范围
					if(data.Xmax == "0" || typeof data.Xmax == undefined){
						Xmax = 'auto';
					}else{
						Xmax = data.Xmax;
					}
					if(data.Ymax == "0" || typeof data.Ymax == undefined){
						Ymax = 'auto';
					}else{
						Ymax = data.Ymax;
					}
					if(data.type=="bar" || data.type=="bars"){//柱状图
						//添加提示框的内容
						var legend = "";
						for(var i=0; i<data.legend.length; i++){
							if(i == 0){
								legend += data.xAxis+':{b'+i+'}<br>';
							}
							legend += '{a'+i+'}:{c'+i+'}<br>';
						}
						//添加mark线
						var series = data.value;
						if(data.LineX != null){
							for(var ii=0; ii<data.LineX.length; ii++){
								series.push(data.LineX[ii]);
							}
						}
						if(data.LineY != null){
							for(var ii=0; ii<data.LineY.length; ii++){
								series.push(data.LineY[ii]);
							}
						}
						option = {
								tooltip: {
									trigger:'axis',
//									enterable:true,//鼠标是否能进入到提示框中
									formatter: legend
								},
							    legend: {
							        data: data.legend,
							    },
								grid: {
									left: '8%',
									right: '8%',
									bottom: '10%',
									containLabel: true
								},
								xAxis: {
									type:"category",
									data:data.Xdata,
									name:data.xAxis,
									nameLocation:'middle',
									nameGap:35,
									max: Xmax,
									axisLabel:{//坐标轴文本标签选项
										interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:60,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
									},
								},
								yAxis: {
									axisLabel: {
										formatter: '{value}'
									},
									name:data.yAxis,
									nameLocation:'middle',
									nameGap:Ymax>1?Ymax.toString().length*6:30,
									nameTextStyle:{
										fontStyle:"normal",
										fontSize:"6"
									},
									max: Ymax,
									min: 0
								},
								series:series
						};
					}else if(data.type=="pie"){//饼图
						var  legend = data.legend;
						option = {
							    title : {
							        text: '',
							        subtext: '',
							        x:'center'
							    },
							    tooltip : {
							        trigger: 'item',
							        formatter: "{a} <br/>{b} : {c} ({d}%)"
							    },
							    legend: {
							        orient: 'horizontal',
							        left: 'left',
							        data: data.legend
							    },
							    series : [
							        {
							            name: data.xName,
							            type: 'pie',
							            radius : per,
							            center: ['55%', '65%'],
							            data:data.value,
							            itemStyle: {
							                emphasis: {
							                    shadowBlur: 10,
							                    shadowOffsetX: 0,
							                    shadowColor: 'rgba(0, 0, 0, 0.5)'
							                }
							            }
							        }
							    ]
							};
					}else if(data.type=="point"){//散点图
						var legend = data.legend;
						var newdatas = [];
						for(var i=0; i<data.data.length; i++){
							var tip_name = "";
							for(var y=0; y<legend.length; y++){
								if(y != 0){
									tip_name += "<br>";
								}
								tip_name += legend[y].name+":"+data.data[i][legend[y].param];
							}
							var data_1;

							data_1 = {
									name: tip_name,
									data: [[data.data[i].x,data.data[i].y]],
									type: 'scatter'
							};

							newdatas.push(data_1);
						}
						var data_2;
						for(var i=0; i<data.Linetipvalue.length; i++){
							data_2 = {
									name: i,
									type: 'scatter',
									markLine: {
										tooltip: {
											formatter: data.Linetipvalue[i].formatter
										},
										data: [
										       [{
										    	   coord: data.Linetipvalue[i].star,
										    	   symbol: 'none'
										       }, {
										    	   coord: data.Linetipvalue[i].end,
										    	   symbol: 'none'
										       }]
										       ]
									}
							};
							newdatas.push(data_2);
						}
						option = {
								tooltip: {
									formatter: '{a}'
								},
								grid: {
									left: '8%',
									right: '8%',
									bottom: '10%',
									containLabel: true
								},
								xAxis: {
									name:data.xAxis,
									nameLocation:'middle',
									nameGap:30,
									max: data.Xmax,
									min: 0,
									axisLabel:{//坐标轴文本标签选项
										interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:25,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
									}
								},
								yAxis: {
									name:data.yAxis,
									nameLocation:'middle',
									nameGap:Ymax>1?Ymax.toString().length*10:30,
									max: data.Ymax,
									min: 0,
									nameTextStyle:{
										fontStyle:"normal",
										fontSize:"6"
									}
								},
								series: newdatas
						};
					}

					if(id=="1"){
						myChart_1.setOption(option);
						myChart_1.on('click', function (params) {
							if(data.type == "point"){
								getAnotherShitable("point",id,data.data[params.seriesIndex].index);
							}else if(data.type == "bar"){
								getAnotherShitable("bar",id,params.name);
							}else if (data.type=="pie"){
								getAnotherShitable("pie",id,params.name);
							}
						});
					}else{
						myChart_2.setOption(option);
						myChart_2.on('click', function (params) {
							if(data.type == "point"){
								getAnotherShitable("point",id,data.data[params.seriesIndex].index);
							}else if(data.type == "bar"){
								getAnotherShitable("bar",id,params.name);
							}else if (data.type == "pie" ){
								getAnotherShitable("pie",id,params.name);
							}
						});
					}
				}
			}else{
				toastr["info"]("提示","数据库无返回值")
			}
		},
		error: function (e) { 
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}  
	});
}
//企业点击了柱图上的某一数据
function getAnotherCompanytable(type,id,value){
	referparam = [];
	if(type == "point"){
		referparam.push(value);
	}else if ( type == "bar" ){
		if ( id=="1" ) {
			referparam=all_index1.data.index[value];
		} else {
			referparam=all_index2.data.index[value];
		}
	} else if ( type == "pie" ) {
		referparam=all_index2.data.index[value];
	}
	$('#metTable1').bootstrapTable('destroy');//销毁表格数据
	metTable_initialization();
}
//市填报点击统计图中的某处
function getAnotherShitable(type,id,value){
	referparam = [];
	if(type == "point"){
		referparam.push(value);
	}else if ( type=="bar" ){ 
		if( id == "1" ) {
			referparam = shi_all_index1.data.index[value];
		} else {
			referparam = shi_all_index2.data.index[value];
		}
	} else if ( type == "pie" ) {
		if(id == "1" ) {
			referparam=shi_all_index1.data.index[value];
		} else {
			referparam=shi_all_index2.data.index[value];
		}
	}
	var str = ["化石燃料固定燃烧源","工艺过程源","移动源","溶剂使用源","农业源","扬尘源","储存运输","生物质燃烧源","废弃物处理源","其它排放源"];
	var num =  parseInt(parameter)-1;
	parent.renwuINDEX=JSON.stringify(referparam);
	window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?fileId="+shi_fileId+"&version=1.0&bigIndex="+subsector+"&type="+shi_type+"&shi_dian=1&index="+referparam[0].表p00_企业基本信息表+"");
	window.parent.$("#yincang_caidan").html(str[num]+"-查看文件");
	window.parent.$("#yincang_caidan").click();
//	window.open(URL,name,specs,replace);
}
//获取市级分析图中的查询条件
var shi_active = "";//市填报活动水平
var shi_ef = "";//市填报排放因子
var shi_eta = "";//市填报去除效率
var shi_fileId ="";
var shi_bigIndex = "";
var shi_type = "";//点源面源
var subsector="";
var shi_emis ;
function openPic(fileId,bigIndex,taskId,dataType){
	parameter=$("#zhenduan_select").val();
	subsector=$("#zhenduan_select1 option:selected").text();
	$("#shi3").show();
	var data = ajax_async_t(BackstageIP+"analysis/itemPool/cmrFile.do",{version:version,fileId:fileId,userId:dataBase.Login_map.SOLE},"JSON","1","POST");
	if(data!=undefined&&data!=null&&data!=""){
		if(data.status=="success")
		{	
			$("#shi_tudiv1").html(null);
			$("#shi_tudiv2").html(null);
			shi_fileId = fileId;
			shi_bigIndex = bigIndex;
			$("#select_b").val("a");
			var data = ajax_async_t(BackstageIP+"analysis/check/config/file.do",{
				fileId:fileId,
				bigIndex:bigIndex,
				taskId:taskId,
				createUserId:dataBase.Login_map.SOLE,
				version:version},"JSON","1","POST");
			if(data != undefined){
				if(data.status == "success"){
					shi_active = data.data.active;
					shi_ef = data.data.ef;
					shi_eta = data.data.eta;
					shi_emis = data.data.emis;
					if ( dataType=="ps" ) {
						shi_type = "p" ;
					} else {
						shi_type = "s";//面源
					}
					var html1 ="";
					var html2 = "";
					$.each(data.data.active.left,function(i,item){
						html1 += '<option value="'+item.value+'">'+item.name+'</option>';
					})
					$.each(data.data.active.right,function(i,item){
						html2 += '<option value="'+item.value+'">'+item.name+'</option>'
					})
					$("#shi_sele_1").html(html1);
					$("#shi_sele_2").html(html2);
					if ( $("#shi_sele_1").val() != "" && $("#shi_sele_1").val() !=null && $("#shi_sele_1").val() != undefined ) {
						per='45%';
						if ( $("#shi_sele_2").val() != "" && $("#shi_sele_2").val() !=null && $("#shi_sele_2").val() != undefined ) {
							$("#shi1").show();
							$("#shi2").show();
							if($("#shi1").hasClass("col-sm-12")){
								$("#shi1").removeClass("col-sm-12");
								$("#shi1").addClass("col-sm-6");
							}
							if($("#shi2").hasClass("col-sm-12")){
								$("#shi2").removeClass("col-sm-12");
								$("#shi2").addClass("col-sm-6");
							}
						}else{
							per='60%';
							$("#shi1").show();
							$("#shi2").hide();
							if($("#shi1").hasClass("col-sm-6")){
								$("#shi1").removeClass("col-sm-6");
								$("#shi1").addClass("col-sm-12");
							}
						}
					}else{
						per='60%';
						if ( $("#shi_sele_2").val() != "" && $("#shi_sele_2").val() !=null && $("#shi_sele_2").val() != undefined ) {
							$("#shi2").show();
							$("#shi1").hide();
							if($("#shi2").hasClass("col-sm-6")){
								$("#shi2").removeClass("col-sm-6");
								$("#shi2").addClass("col-sm-12");
							}
							
						}else{
							$("#shi1").hide();
							$("#shi2").hide();
						}
					}
					if ( $("#shi_sele_1").val() != "" && $("#shi_sele_1").val() !=null && $("#shi_sele_1").val() != undefined ) {
						shi_openPic_2("1",$("#shi_sele_1").val());
					}
					if ( $("#shi_sele_2").val() != "" && $("#shi_sele_2").val() !=null && $("#shi_sele_2").val() != undefined ) {
						shi_openPic_2("2",$("#shi_sele_2").val());
					}
				}else{
					toastr["info"]("错误信息",JSON.stringify(data));
				}
			}else{
				toastr["info"]("错误信息",data.error);
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}
}
//点击全选
function quanxuan(){
	if($("#quanxuan")["0"].checked == true){
		$("#diqu_div input[name='classdiqu']").prop("checked","true");
		$("#diqu_div input[name='classdiqu']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
	}else{
		$("#diqu_div input[name='classdiqu']").removeAttr("checked")
		$("#diqu_div input[name='classdiqu']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
	changeState = "1";//改变了查询条件
}

//点击地区
function notallsel(){
	var countyList = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(countyList != ""){
		var countrySize = countyList.split(",")
		if(countryLength == countrySize.length){
			$("#quanxuan").prop("checked","true");
			$("#quanxuan").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#quanxuan").removeAttr("checked");
			$("#quanxuan").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#quanxuan").removeAttr("checked");
		$("#quanxuan").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
	changeState = "1";//改变了查询条件
}

//点击通过
function passbody(){
	var taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	var qysj = "";
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	if(radio == "企业"){
		passCompany("通过");//通过企业
	}else{
		passCity("通过");//通过市级填报
	}
}
//点击全部通过
function allPassbody(){
	if(changeState == ""){
		var qysj = "";
		var radio = $('input[name="yonghuname"]').filter(':checked').val();
		var taskId = $("#select_1").val();//任务id
		if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");

		var sourceId = $('#zhenduan_select1').val();//排放源id
		var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
			return $(elem).val();
		}).get().join(',');
		
		if(radio == "企业"){
			var ns=$('#metTable1').bootstrapTable('getOptions').data.length;
			if(ns>0)
			{
				allpassCompany();
			}else{
				toastr["info"]("没有可通过企业");
			}
		}else{
			var ns=$('#metTable2').bootstrapTable('getOptions').data.length;
			if(ns>0){
				allpassCity();//全部通过市级填报
			}else{
				toastr["info"]("没有可通过文件");
			}
		}
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}


//企业 通过
function passCompany(value){
	if(changeState == ""){
		var row = $("#metTable1").bootstrapTable('getSelections');
		if (row.length>0 ) {
			var str = "";
			var str1 ="" 
			var str2 = "";
			var verifier = "";
			if ( dataBase.Login_map.TYPE == "3" ) verifier = dataBase.Message_map.NAME;
			else verifier = dataBase.Message_map.INFORMANT;
			
			$.each(row,function(i,item){
				str += item.id+",";
				str1 += item.equipId+",";
				str2 += item.userId+",";
			});
			str = str.substring(0,str.length-1);
			str1 = str1.substring(0,str1.length-1);
			str2 = str2.substring(0,str2.length-1);
			
//			if (value == "" )
			
			swal({
				title: "您确定要"+value+"这些企业吗？",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				closeOnConfirm: false
			},
			function() {
				var advice = false;
				if ( value == "建议驳回") advice = true; else advice = false;
				var data = ajax_async_t(BackstageIP+"analysis/check/equip/pass.do",{tId:$("#select_1").val(),id:str,status:3,userId:dataBase.Login_map.SOLE,equipId:str1,uId:str2,verifier:verifier,version:version,advice:advice},"JSON","1","POST");
				if(data != undefined&&data!=null&&data!=""){
					if(data.status == "success"){
						$('#metTable1').bootstrapTable('destroy');//销毁表格数据
						metTable_initialization();//生成企业表格
						$('#metTable1').bootstrapTable('selectPage', page_qy);
						swal("操作成功！", "这些企业状态改为"+value+"", "success");
					}else if(data.status == "fail"){
						swal("操作失败", data.error, "error");
					}
				}else{
					toastr["info"]("错误信息", "未连接"+BackstageIP);
				}
			});
		}else{
			toastr["info"]("请选择要"+value+"的企业");
		}
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}
//企业 全部通过
function allpassCompany(){
	if(changeState == ""){
		swal({
			title: "您确定要全部通过企业吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			var taskId = $("#select_1").val();//任务id
			var sourceId = $('#zhenduan_select1').val();//排放源id
			var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
				return $(elem).val();
			}).get().join(',');
			var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
				return $(elem).val();
			}).get().join(',');

			var url = "";
			var data = "";
			var verifier ="";
			if ( dataBase.Login_map.TYPE == "3" ) verifier = dataBase.Message_map.NAME;
			else verifier = dataBase.Message_map.INFORMANT;
			if(referparam==""){
				url = BackstageIP+'analysis/check/equip/pass.do'
				data = ajax_async_t(url,{version:version,userId:dataBase.Login_map.SOLE,verifier:verifier},"JSON","1","POST");
			}else{
				url = BackstageIP+'analysis/check/equip/pass.do'
				data = ajax_async_t(url,{version:version,userId:dataBase.Login_map.SOLE,INDEX : JSON.stringify(referparam),verifier:verifier},"JSON","1","POST");
			}
			if(data != undefined&&data!=null&&data!=""){
				if(data.status == "success"){
					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
					metTable_initialization();//生成企业表格
					swal("操作成功！", "这些企业状态改为通过", "success");
				}else if(data.status == "fail"){
					swal("操作失败", data.error, "error");
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
		});
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}
//通过市级填报
function passCity(value){
	if(changeState == ""){
		var row = $("#metTable2").bootstrapTable('getSelections');
		if (row.length>0 ) {
			var str = "";
			$.each(row,function(i,item){
				str += item.id+",";
			});
			str = str.substring(0,str.length-1);
			swal({
				title: "您确定要"+value+"这些文件吗？",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				closeOnConfirm: false
			},
			function() {
				var data = ajax_async_t(BackstageIP+"taskDataFillChild/manager/passCityUserTask.do",{
					masterTaskId:$("#select_1").val(),
					fileIds:str,
					createUserId:dataBase.Login_map.SOLE,
					//uId:str2,
					version:version},"JSON","1","POST");

				if(data != undefined&&data!=null&&data!=""){
					if(data.status == "success"){
						$('#metTable2').bootstrapTable('destroy');//销毁表格数据
						metTable_initialization_2();//生成企业表格
						$('#metTable2').bootstrapTable('selectPage', page_sj);
						swal("操作成功！", "这些文件状态改为"+value+"", "success");
					}else if(data.status == "fail"){
						swal("操作失败", data.error, "error");
					}
				}else{
					toastr["info"]("错误信息", "未连接"+BackstageIP);
				}
			});
		}else{
			toastr["info"]("请选择要通过的文件");
		}
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}
//市级 全部通过
function allpassCity(){
	if(changeState == ""){
		swal({
			title: "您确定要全部通过这些文件吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			var taskId = $("#select_1").val();//任务id
			var sourceId = $('#zhenduan_select1').val();//排放源id
			var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
				return $(elem).val();
			}).get().join(',');

			var data = ajax_async_t(BackstageIP+"taskDataFillChild/manager/passAllCityUserTask.do",{
				taskId:taskId,
				sourceId:sourceId,
				status:status,
				masterTaskId:$("#select_1").val(),
				createUserId:dataBase.Login_map.SOLE,
				version:version},"JSON","1","POST");

			if(data != undefined&&data!=null&&data!=""){
				if(data.status == "success"){
					$('#metTable2').bootstrapTable('destroy');//销毁表格数据
					metTable_initialization_2();//生成市级表格
					swal("操作成功！", "这些文件状态改为通过", "success");
				}else if(data.status == "fail"){
					swal("操作失败", data.error, "error");
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
		});
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}

//点击驳回
function reject(){
	var taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	if(changeState == ""){
		$("#reject_table").modal();
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}
//建议驳回
function suggest(){
	var taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	var radio = $('input[name="yonghuname"]').filter(':checked').val();
	if(radio == "企业"){
		passCompany("建议驳回");//通过企业
	}else{
		return toastr["info"]("暂不支持企业填报建议驳回。");
		passCity("建议驳回");//通过市级填报
	}

}	


function rejectbody(){
	var file=$("#file");
	var str= $("#reject_content").val();
	if($.trim(file.val())==""&&str==""){
		toastr["info"]("请选择文件，或填写驳回原因");
		return;
	}
	if(changeState == ""){
		var qysj = "";
		var radio = $('input[name="yonghuname"]').filter(':checked').val();
		if(radio == "企业"){
			rejectCompany();//企业
		}else if(radio == "市填报用户"){
			rejectCity();//市级填报
		}
	}else{
		toastr["info"]("您更换了选择条件，请先点击查询按钮");
	}
}
//企业 驳回
function rejectCompany(){
	var rejectContent = $("#reject_content").val();
	var row = $("#metTable1").bootstrapTable('getSelections');
	var file= $("#file");
	if (row.length>0 ) {
		var str = "";
		var str1 = "";
		var str2 = "";
		var companyNames='';
		var verifier ="";
		if ( dataBase.Login_map.TYPE == "3" ) verifier = dataBase.Message_map.NAME;
		else verifier = dataBase.Message_map.INFORMANT;
//		document.domain = "polist/home.html";
		$.each(row,function(i,item){
			str += item.id+",";
			str1 += item.equipId+",";
			str2 +=item.userId+",";
			var companyName=item.companyName;
			var indexOf = companyName.indexOf(">");
			var lastIndexOf = companyName.lastIndexOf("<");
			companyNames+=companyName.substring(indexOf+1,lastIndexOf)+',';
		});
		companyNames=companyNames.substring(0,companyNames.length-1);
		str = str.substring(0,str.length-1);
		str1 = str1.substring(0,str1.length-1);
		str2 = str2.substring(0,str2.length-1);
		swal({
			title: "您确定要驳回这些文件吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			$.ajaxFileUpload
            (
                    {
                        url: BackstageIP+'analysis/check/equip/reject?tId='+$("#select_1").val()+'&userId='+dataBase.Login_map.SOLE+
                        '&version=1.0&reason='+rejectContent+'&id='+str+'&verifier='+verifier, //用于文件上传的服务器端请求地址
                        secureuri: false, //是否需要安全协议，一般设置为false
                        data:{
                        },
                        fileElementId: 'file', //文件上传域的ID
                        dataType:'json',
                        success: function (data, status)  //服务器成功响应处理函数
                        {	
                        	if(data != undefined){
                				if(data.status == "success"){
                					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
                					metTable_initialization();//生成企业表格
                					$('#metTable1').bootstrapTable('selectPage', page_qy);
                					swal("操作成功！", "这些文件状态改为驳回", "success");
                					$("#reject_table").modal('toggle');
//                					parent.findIframe();//刷新任务列表中的文字和列表
                				}else if(data.status == "fail"){
                					swal("操作失败", data.error, "error");
                				}
                			}
                        },
                        error: function (data, status, e)//服务器响应失败处理函数
                        {
                        	console.log(e)
                            swal("操作失败", data.error, "error");
                        }
                    }
            )
		});
	}else{
		toastr["info"]("请选择要驳回的企业");
	}
}
//市级驳回
function rejectCity(){
	var rejectContent = $("#reject_content").val();
	taskId=$("#select_1").val();
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");

	var row = $("#metTable2").bootstrapTable('getSelections');
	if (row.length>0 ) {
		var str = "";
		var str1 = "";
		var str2="";
		$.each(row,function(i,item){
			str += item.id+",";
			str1 += item.equipId+",";
			str2 += item.userId+",";
		});
		str = str.substring(0,str.length-1);
		str1 = str1.substring(0,str1.length-1);
		str2 = str2.substring(0,str2.length-1);
		swal({
			title: "您确定要驳回这些文件吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			$.ajaxFileUpload
            (
                    {
                        url: BackstageIP+'taskDataFillChild/manager/rejectCityUserTask.do?masterTaskId='+$("#select_1").val()+'&fileIds='+str+'&uId='+str2+'&createUserId='+dataBase.Login_map.SOLE+
        				'&version=1.0&reason='+rejectContent, //用于文件上传的服务器端请求地址
                        secureuri: false, //是否需要安全协议，一般设置为false
                        fileElementId: 'file', //文件上传域的ID
                        dataType: 'json',
                        success: function (data, status)  //服务器成功响应处理函数
                        {
                        	if(data != undefined){
                				if(data.status == "success"){
                					$('#metTable2').bootstrapTable('destroy');//销毁表格数据
                					metTable_initialization_2();//生成市级表格
                					$('#metTable2').bootstrapTable('selectPage', page_sj);
                					swal("操作成功！", "这些文件状态改为驳回", "success");
                					$("#reject_table").modal("toggle");
//                					parent.findIframe();
                				}else if(data.status == "fail"){
                					swal("操作失败", data.error, "error");
                					return;
                				}
                			}
                        },
                        error: function (data, status, e)//服务器响应失败处理函数
                        {
                            swal("操作失败", data.error, "error");
                        }
                    }
            )
		});
	}else{
		toastr["info"]("请选择要驳回的文件");
		return;
	}
}
var dataAll1;
//换了任务
function chang_sel(){
	var taskName=$("#select_1 :selected").text();
	for(var i=0;i<dataAll.length;i++){
		if(dataAll[i].name==taskName){
			dataAll1=dataAll[i].object;
			if(dataAll1==undefined||dataAll1==null||dataAll1==""){
				toastr["info"]("提示", "没有查看"+taskName+"相应的部门");
				return;
			}
			var html="";
			for(prop in dataAll1){
				html+="<option value="+sa[prop]+">"+prop+"</option>";
			}
			$("#zhenduan_select").html(html);
			zhenduan_select();
			var list=dataAll[i].userList;
			$("#yh4").hide();
			$("#yh5").hide();
			$("#yh6").hide();
			for(var x=4;x<7;x++){
				if($("#yonghu"+x).checked=true){
					$("#yonghu"+x).prop("checked",false);
				}
			}
			for(var j=0;j<list.length;j++){
				$("#yh"+list[j]).show();
				if(j==0){
					$("#yonghu"+list[j]).prop("checked",true);
				}
			}
		}
	}
	changeState = "1";
	if ($('input[name="yonghuname"]').filter(':checked').val() == "企业" ) {
		$("#qy_name_div").show();
		$("#shr_name_div").show();
		$("#qy_region").show();
	} else {
		$("#qy_name_div").hide();
		$("#shr_name_div").hide();
		$("#qy_region").hide();
	}
}

//换了排放源
function changesource(){
	if(sourceNum != $('#zhenduan_select1').val()){
		changeState = "1";
	}
}

//点击企业文件名称
function openCompany(taskId,userId,equipId,name,level,id){
	if ( level == "1" ) window.parent.$("#yincang_caidan").attr("href","zp02/0201/companylist1.html?userId="+userId+"&taskId="+taskId+"&version="+version+"&sourceId="+$("#zhenduan_select1").val()+"&equipId="+equipId+"&id="+id);
	else if ( level == "2" ) window.parent.$("#yincang_caidan").attr("href","zp02/0201/companylist2.html?userId="+userId+"&taskId="+taskId+"&version="+version+"&sourceId="+$("#zhenduan_select1").val()+"&equipId="+equipId+"&id="+id);
	else if ( level == "3") window.parent.$("#yincang_caidan").attr("href","zp02/0201/companylist3.html?userId="+userId+"&taskId="+taskId+"&version="+version+"&sourceId="+$("#zhenduan_select1").val()+"&equipId="+equipId+"&id="+id);
	window.parent.$("#yincang_caidan").html(name);
	window.parent.$("#yincang_caidan").click();
	return;
	swal({
		title: "您确定要跳转页面审核企业(有可能您的浏览器不支持)？",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	},
	function() {
		try {
			if ( level == "1" ) window.open("../../zp_qy/0101/b.html?userId="+userId+"&taskId="+taskId+"&equipId="+equipId);
			else if ( level == "2" ) window.open("../../zp_qy/0102/bb.html?userId="+userId+"&taskId="+taskId+"&equipId="+equipId);
			else if ( level == "3") window.open("../../zp_qy/0103/b.html?userId="+userId+"&taskId="+taskId+"equipId="+equipId);
			swal("操作成功！", "成功跳转", "success");
		} catch (e) {
			swal("操作失败！", "浏览器不支持", "error");
		}
		
	});
};
//点击市级文件名称
function openfile(fileId,bigIndex,taskId,wenjiantype,fileName,type,dataLevel){
	if(wenjiantype == "ss") {
		wenjiantype = "s";//面源
	} else if(wenjiantype == "ps") {
		wenjiantype = "p";//点源
	}
	chakanxiangxi(bigIndex,taskId,version,fileId,wenjiantype,fileName,type,dataLevel);
}

//打开市级填报详细页面
function chakanxiangxi(bigIndex,taskId,version,fileId,wenjiantype,fileName,type,dataLevel){
	window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?bigIndex="+type+"&taskId="+taskId+"&version="+version+"&fileId="+fileId+"&commit=1&type="+wenjiantype+"&dataLevel="+dataLevel);
	window.parent.$("#yincang_caidan").html(type+"->"+fileName);
	window.parent.$("#yincang_caidan").click();
}

//ajax通用方法
function ajax_async_t(url,data,dataType,async,type){
	var rel;
	if(async==""||async==undefined){
		async=true;
	}else{
		async=false;
	}
	$.ajax({  		       
		url: url,
		type: type,
		async:async,
		dataType: dataType,
		data: data,
		success: function (ret) {
			rel = ret;
		},
		error: function (e) { 
			toastr["info"]("错误信息", "服务器异常："+url);
		}  
	});
	return rel;
}
var indexs='';	//index数据
var index_arr=[];
var index_strs='';
var page_qy;

var pageNum = 1;//企业表格-当前页数
//数据初始化-企业表格
function metTable_initialization(){
	var url = BackstageIP+'analysis/check/company/list.do'
	$('#metTable1').bootstrapTable({
		method: 'POST',
		url: url,
		dataType: "json",
		iconSize: "outline",
		clickToSelect: false,//点击选中行
		pagination: true,	//在表格底部显示分页工具栏
		pageSize: 8,	//页面大小
		pageNumber: pageNum,	//页数
		pageList: [10],
		striped: true,	 //使表格带有条纹
		sidePagination: "server",//表格分页的位置 client||server
		queryParams: queryParams, //参数
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  //刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
		onLoadSuccess:function (data) {
			indexs=data.rows;
			page_qy=data.page;
			for(var i=0;i<indexs.length;i++){
				index_arr.push(indexs[i].index);
			}
			var index_str=JSON.stringify(index_arr);
			index_strs=index_str.replace(/"/g, '');
		},
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		}});
}

//配置参数
function queryParams(params) {  
	var taskId = $("#select_1").val();//任务id
	var sourceId = $('#zhenduan_select1').val();//排放源id
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');

	var temp = {};
	if(referparam == ""){//点击查询
		temp.pageSize = params.limit;
		temp.pageNumber = params.offset;
		temp.taskId = taskId;//任务id
		temp.version = version;//版本号
		temp.sourceId = sourceId;//排放源id
		temp.region = region;//地区
		temp.status = status;//状态
		temp.userId=dataBase.Login_map.SOLE;
		temp.companyNameLike = $("#qy_name").val();
	}else{//点击分析图
		temp.pageSize = params.limit;
		temp.pageNumber = params.offset;
		temp.taskId = taskId;//任务id
		temp.version = version;//版本号
		temp.sourceId = sourceId;//排放源id
		temp.userId = dataBase.Login_map.SOLE;
		temp.companyNameLike = $("#qy_name").val();
		if(referparam==undefined){
			 referparam=[];
		}
		temp.INDEX = JSON.stringify(referparam)//点击图取到的数据。
	}
	pageNum2 = params.offset == 0 ? 1 : (params.offset/params.limit)+1;
	return temp;
}

var page_sj;
var pageNum2 = 1;//企业表格-当前页数
//数据初始化-市级表格
function metTable_initialization_2(){
	$('#metTable2').bootstrapTable({
		method: 'POST',
		url: BackstageIP+"taskDataFillChild/manager/listCityUserTask.do",
		dataType: "json",
		iconSize: "outline",
		clickToSelect: false,//点击选中行
		pagination: true,	//在表格底部显示分页工具栏
		pageSize: 8,	//页面大小
		pageNumber: pageNum2,	//页数
		pageList: [10],
		striped: true,	 //使表格带有条纹
		sidePagination: "server",//表格分页的位置 client||server
		queryParams: queryParams_2, //参数
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  //刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型
		onLoadSuccess:function (data) {
			page_sj=data.page;
		},
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		}});
}

//配置参数
function queryParams_2(params) {  
	var taskId = $("#select_1").val();//任务id
	var sourceId = $('#zhenduan_select1').val();//排放源id
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');

	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.taskId = taskId;//任务id
	temp.version = version;//版本号
	temp.sourceId = sourceId;//排放源id
	temp.status = status;//状态
	temp.createUserId = dataBase.Login_map.SOLE;
	pageNum2 = params.offset == 0 ? 1 : (params.offset/params.limit)+1;
	return temp;
}
//获取参数
function GetRequest() { //截取URL的方法
	var url = location.search; //获取url中"?"符后的字串，获取访问链接的.search键中的值
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {	//判断该变量中是否存在？号，不村在则返回-1
		var str = url.substr(1);	//获取该变量下标从1开始的后面的值
		strs = str.split("&");		//使用&对str进行截取并放到数组中
		for(var i = 0; i < strs.length; i ++) {	//循环该数组
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
		}
	}
	return theRequest;
}
//
function uploadFile(){
	$("#mod_head_1").hide();
	$("#mod_head_2").show();
	$("#ImportForm").hide();
	$("#modal_foot").hide();
	$("#modal-re").hide();
	
	$.ajaxFileUpload({
		//taskId 填报任务编号，version 版本,bigIndex 行业类别，description 文件描述,file Excel上传文件
		url: BackstageIP+'file/uploadData?sourceId='+iJson[parseInt(parameter)-1].sourceId+'&taskId='+taskId+'&dataType='+dml+'&version='+version+'&description=上传文件&userId='+dataBase.Login_map.SOLE, //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'file', //文件上传域的ID
		dataType: 'json', //返回值类型 一般设置为json
		success: function (data, status)  //服务器成功响应处理函数
		{
			if(data != undefined){
				if(data.status == "success"){
					$("#reject_table").modal("hide");
					html_value();
					swal({
						title: "上传成功",
						text: "成功上传"+iJson[parseInt(parameter)-1]["data_"+dml_2],
						type: "success"
					});
				}else{
					if(data.code == "2001"){
						//隐藏标题
						$(".modal-title").hide();
						var html = "<button type='button' class='btn btn-warning' data-dismiss='modal'>关闭</button>";
						$("#modal_foot").html(html);
						$("#modal_foot").show();
						$("#ImportForm").hide();
						$("#ImportForm_2").html("<p style='text-align: center;'><strong style='color:red;'>上传文件数据格式错误，请下载错误报告。</strong></p><br>" +
								"<p style='text-align: center;'>" +
								"<a href='"+BackstageIP+data.data+"' style='text-decoration:underline;' target=_blank>点击下载错误报告</a></p>");
						$("#ImportForm_2").show();
					}else if(data.code == "2000"){
						$("#Import_modal").modal("hide");
						swal({
							title: "上传失败",
							text: data.error,
							type: "error"
						});
					}else{
						$("#Import_modal").modal("hide");
						swal({
							title: "上传失败",
							text: data.error,
							type: "error"
						});
					}
				}
			}else{
				toastr["info"]("错误信息","无返回值")
			}
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			$("#Import_modal").modal("hide");
			swal({
				title: "上传失败",
				text: "网络错误",
				type: "error"
			});
		}
	});
}
