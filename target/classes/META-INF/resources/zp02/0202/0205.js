jQuery.support.cors = true;
var version = "1.0";
var listId ="";
var dataBase = parent.dataBase;
var userId = dataBase.Login_map.SOLE;

$(function() {
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	listId=Request['listId'];
	section();//部门
	task_select();
	getSelectCompany();
	/*$("#mp").hide();*/

	
	

	$("#section_select").change(function(){section();rech_table();})
	$("#yuan_select").change(function(){
		if( $("#yuan_select").val() == "p" ) {
			$("#all_botton").show();
			
		} else {
			$("#all_botton").hide();
			
			
		}
		rech_table();
		});
	$("#trade").change(function(){rech_table();});
	
});

var myChart_1,myChart_2,myChart_3,myChart_4;
//刷新表格

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

function rech_table (){
	
	$("#qy_sele_1").html("");
	$("#qy_sele_2").html("");
	$("#shi_sele_1").html("");
	$("#shi_sele_2").html("");
	$("#qy_tudiv1").html("");
	$("#qy_tudiv2").html("");
	$("#shi_tudiv1").html("");
	$("#shi_tudiv2").html("");
	

	if($("#yuan_select").val()== "p" ) {
		$('#renwu_select1').bootstrapTable('destroy');//销毁表格数据
		task_select();
		$("#show_table_1").show();
		$("#show_table_2").hide();
		$("#dp").show();
		$("#mp").hide();
		getSelectCompany();
		
	}else {
		$('#renwu_select2').bootstrapTable('destroy');//销毁表格数据
		task_select1();
		$("#show_table_2").show();
		$("#show_table_1").hide();
		$("#mp").show();
		$("#dp").hide();
		/*openPic();*/
		
	}
}
//数据初始化--点源
function task_select(str) {
	var url = "";
	if ( str == "1" ) {
		url = "analysis/check/oneByOne/list"
	} else {
		url="taskProvince/oneByOneCheckList"
	}
	
	$('#renwu_select1').bootstrapTable({
		method : 'POST',
		url : BackstageIP+url,
		dataType : "json",
		columns : [ {
			field : 'chec',
			checkbox:true,
			align : 'center'
		}, {
			field : 'companyName',
			title : '企业名称',
			align : 'center'
		}, {
			field : 'equipId',
			title : '排污许可证编号',
			align : 'center'
		},  
		{
			field : 'state',
			title : '状态',
			align : 'center',
			formatter : function(value, row, index) {
				var c ;
				if(row.status == "3" ) {
					c = '待审核';
				} else if ( row.status == "4" ) {
					c='通过';
				} else if (row.status=="5" ) {
					c= '驳回';
				}
				return c;
			},
		},{
			field : 'operation',
			title : '操作',
			formatter : function(value, row, index) {
				var a ;
				a = '<a onclick="cha_dian(\''+row.listId+'\',\''+row.taskId+'\',\''+row.fileId+'\',\''+row.companyId+'\',\''+row.equipId+'\',\''+row.source+'\',\''+row.userId+'\')"><i class="fa fa-eye"></i>查看</a>';
				return a;
			},
			events : 'operateEvents',
			align : 'center'
		} ], // 列
		iconSize : "outline",
		clickToSelect :false,// 点击选中行
		pagination : true, // 在表格底部显示分页工具栏
		pageSize : 10, // 页面大小
		pageNumber : 1, // 页数
		pageList : [ 10, 20, 50, 100 ],
		striped : true, // 使表格带有条纹
		sidePagination : "server",// 表格分页的位置 client||server
		queryParams : function(params) {
			
			if ( str == "1" ) {
				return {
					pageSize : params.limit,
					pageNumber : params.offset,
					
					INDEX : JSON.stringify(referparam),
					listId : listId,
					subSector:$("#trade").val(),
					version:version,
					source:$("#yuan_select").val(),
					userId : userId,
				}
			} else {
				/*alert(str)*/
				return {
					pageSize : params.limit,
					pageNumber : params.offset,
					listId : listId,
					subSector:$("#trade").val(),
					version:version,
					userId : userId,
					source:$("#yuan_select").val()
				}
			}
			
		},
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		silent : true, // 刷新事件必须设置
		contentType : "application/x-www-form-urlencoded", // 请求远程数据的内容类型。
		onClickRow : function(row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons : {
			refresh : "glyphicon-repeat",
			toggle : "glyphicon-list-alt",
			columns : "glyphicon-list"
		}
	});
	 $('#renwu_select').bootstrapTable('hideColumn', 'taskId');
	 $('#wenjian_table').hide();
	 $('#qiye_table').show();
	 
}

function cha_dian (listId,taskId,fileId,companyId,equipId,source,userId) {
	parent.fu_equipId = equipId;
	
	window.parent.$("#yincang_caidan").attr("href","zp02/0201/companylist.html?userId="+userId+"&taskId="+taskId+"&listId="+listId+"&sourceId="+source+"&type=1&fileId="+fileId+"&companyId="+companyId);
	window.parent.$("#yincang_caidan").html("企业信息");
	window.parent.$("#yincang_caidan").click();
}



var shi_fileId ="";
var shi_bigIndex = "";
var shi_type = "";//点源面源
var shi_taskId="";
//数据初始化-面源
function task_select1( str ) {
	/*var url = "";
	if( str == "1" ) {
		url = "analysis/check/oneByOne/list";
	} else {
		url = "taskProvince/oneByOneCheckList";
	}*/
	$('#renwu_select2').bootstrapTable({
		method : 'POST',
		url : BackstageIP+"taskProvince/oneByOneCheckList",
		dataType : "json",
		columns : [ {
			field : 'state',
			checkbox:true,
			align : 'center'
		}, {
			field : 'number',
			title : '文件类型',
			align : 'center',
			formatter : function(value, row, index) {
				console.log(row);
				var b ='面源' ;
				return b;
			},
		}, {
			field : 'companyName',
			title : '文件名称',
			align : 'center'
		},  
		{
			field : 'status',
			title : '状态',
			align : 'center',
			formatter : function(value, row, index) {
				var c ;
				if(row.status == "3" ) {
					c = '待审核';
				} else if ( row.status == "4" ) {
					c='通过';
				} else if (row.status=="5" ) {
					c= '驳回';
				}
				return c;
			},
		},{
			field : 'operation',
			title : '操作',
			formatter : function(value, rows, index) {
				var a ;
			/*	dd=row;*/
				/*shi_bigIndex = rows.smallIndex;
				shi_fileId = rows.fileId;
				shi_taskId = rows.taskId;*/
				openPic(rows.smallIndex,rows.fileId,rows.taskId);//开启面源图
				a = '<a onclick="cha_mian(\''+rows.subsector+'\',\''+rows.taskId+'\',\''+rows.fileId+'\',\''+rows.source+'\')"><i class="fa fa-eye"></i>查看</a>';
				return a;
			},
	
			events : 'operateEvents',
			align : 'center'
		} ], // 列
		iconSize : "outline",
		clickToSelect : false,// 点击选中行
		pagination : true, // 在表格底部显示分页工具栏
		pageSize : 10, // 页面大小
		/*height:478,*/
		pageNumber : 1, // 页数
		pageList : [ 10, 20, 50, 100 ],
		striped : true, // 使表格带有条纹
		sidePagination : "server",// 表格分页的位置 client||server
		queryParams : function(params) {
		
			return {
				
				pageSize : params.limit,
				pageNumber : params.offset,
				listId : listId,
				subSector:$("#trade").val(),
				version:version,
				userId:userId,
				source:$("#yuan_select").val()
				
			}
			
		},
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		silent : true, // 刷新事件必须设置
		contentType : "application/x-www-form-urlencoded", // 请求远程数据的内容类型。
		onClickRow : function(row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons : {
			refresh : "glyphicon-repeat",
			toggle : "glyphicon-list-alt",
			columns : "glyphicon-list"
		}
	});
	 $('#renwu_select').bootstrapTable('hideColumn', 'taskId');
	 $('#qiye_table').hide();
	 $('#wenjian_table').show();

}



function cha_mian (bigIndex,taskId,fileId,source) {
	window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?bigIndex="+bigIndex+"&taskId="+taskId+"&version="+version+"&fileId="+fileId+"&commit=1&type="+source);
	window.parent.$("#yincang_caidan").html("企业信息");
	window.parent.$("#yincang_caidan").click();
}
//通过与驳回
function tongguo(str) {
	var row;
	if ( $("#yuan_select").val() == "p" ) {
		row = $("#renwu_select1").bootstrapTable('getSelections');
	} else {
		row = $("#renwu_select2").bootstrapTable('getSelections');
	}
	var pkid = [];
	if (row.length>0 ) {
		$.each(row,function(i,item){
			pkid[i]=item.id;
		})
		var data = ajax_async_t(BackstageIP+"taskProvince/oneByOnePassAndReject", {listId:listId,id:pkid,status:str}, "json");
		if ( data != null && data != "" && data!= undefined ) {
			if( data.status == "success" ) {
				if( str == "4" ) {
					toastr["success"]("提示", "通过成功");
				} else {
					toastr["success"]("提示", "驳回成功");
				}
				if($("#yuan_select").val() == "p"){
					if ( referparam.length>0 ) {
						$('#renwu_select1').bootstrapTable('destroy');//销毁表格数据
						task_select("1");
					} else {
						$('#renwu_select1').bootstrapTable('destroy');//销毁表格数据
						task_select();
					}
					
				} else {
					$('#renwu_select2').bootstrapTable('destroy');//销毁表格数据
					task_select1();
				}
			} else {
				if( str == "4" ) {//通过
					toastr["info"]("错误信息", data.error);
				} else {
					toastr["info"]("错误信息", data.error);
				}
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}

	} else {
		if(str == "4"){
			toastr["info"]("提示", "请选择要通过的企业");
		}else{
		toastr["info"]("提示", "请选择要驳回的企业");
		}
	}
}
//全部通过
function all_tongguo () {
	var data = ajax_async_t(BackstageIP+"analysis/oneByOneAllPassAndReject", {listId:listId,INDEX:JSON.stringify(referparam),userId : parent.dataBase.Login_map.SOLE,subSector :$("#trade").val()}, "json");
	if ( data != null && data != "" && data!= undefined ) {
		if( data.status == "success" ) {
			toastr["success"]("提示", "全部通过成功");
			$('#renwu_select1').bootstrapTable('destroy');//销毁表格数据
			
			if ( referparam.length>0 ) {
				task_select("1");
			} else {
				task_select();
			}
		} else {
			toastr["info"]("错误信息", data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}

}


//选取部门
function section() {
	var str = $("#section_select").val();
	var html = "";
	if ( str=="化石燃料固定燃烧源" ){
		html += '<option value="电力">电力</option>'+
				'<option value="工业锅炉">工业锅炉</option>'+
				'<option value="民用源">民用源</option>';
	} else if ( str=="工艺过程源" ){
		html += '<option value="玻璃">玻璃</option>'+
		'<option value="独立焦化">独立焦化</option>'+
		'<option value="钢铁">钢铁</option>'+
		'<option value="化工化纤">化工化纤</option>'+
		'<option value="水泥">水泥</label>'+
		'<option value="其他工业企业">其他工业企业</option>';
	} else if ( str == "移动源" ) {
		html += '<option value="机动车">机动车</option>'+
		'<option value="飞机">飞机</option>'+
		'<option value="船舶">船舶</label>'+
		'<option value="非道移机械">非道移机械</option>';
	} else if (str == "溶剂使用源" ) {
		html += '<option value="工业喷涂">工业喷涂</option>'+
		'<option value="建筑涂料">建筑涂料</option>'+
		'<option value="印刷印染">印刷印染</option>'+
		'<option value="农药使用">农药使用</option>'+
		'<option value="其他溶剂使用">其他溶剂使用</option>';
	} else if ( str == "农业源" ){
		html += '<option value="氮肥施用">氮肥施用</option>'+
		'<option value="固氮植物">固氮植物</option>'+
		'<option value="秸秆堆肥">秸秆堆肥</option>'+
		'<option value="人体粪便">人体粪便</option>'+
		'<option value="畜禽养殖">畜禽养殖</option>'+
		'<option value="土壤本底">土壤本底</option>';
	} else if ( str == "扬尘源" ) {
		html += '<option value="道路扬尘">道路扬尘</option>'+
		'<option value="堆场扬尘">堆场扬尘</option>'+
		'<option value="施工烟尘">施工烟尘</option>'+
		'<option value="土壤扬尘">土壤扬尘</option>';
	} else if ( str == "储存运输源" ) {
		html += '<option value="油汽储存">汽油储存</option>'+
		'<option value="油汽运输">油汽运输</option>'+
		'<option value="加油站">加油站</option>';
	} else if (str == "生物质燃烧源" ) {
		html += '<option value="生物质燃料">生物质燃料</option>'+
		'<option value="生物质开放燃烧">生物质开放燃烧</option>';
	} else if ( str == "废物处理源" ) {
		html += '<option value="废水处理">废水处理</option>'+
		'<option value="固废处理">固废处理</option>'+
		'<option value="烟气脱硝">烟气脱硝</option>';
	} else if ( str == "其他排放源" ) {
		html += '<option value="餐饮油烟">餐饮油烟</option>';
	}
	$("#trade").html(html);
}
//获取参数
function GetRequest() { //截取URL的方法
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
		}
	}
	return theRequest;
}


var all_index1 ;
var all_index2 ;
//企业出图
function openPic_2(id,value){
	/*alert(id+"----"+value)*/
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
	var sourceId = $('input[name="hy_name"]').filter(':checked').val();//排放源id
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {//状态
		return $(elem).val();
	}).get().join(',');
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');
	var sel;
	$.ajax({  		       
		url: BackstageIP+"analysis/check/oneByOneCheck/chart",
		type: "POST",
		async:true,
		dataType: "JSON",
		data: {
			listId:listId,
			createUserId:parent.dataBase.Login_map.SOLE,
			subSector:$("#trade").val(),
			version:version,
			value:value,
			source:$("#yuan_select").val(),
		},
		success: function (ret) {
			if(id=="1"){
				//开启图形
				myChart_1.hideLoading();
			}else{
				//开启图形
				myChart_2.hideLoading();
			}
			console.log(ret);
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
									nameGap:30,
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
						console.log(data);
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
									nameGap:Xmax.toString().length*6,
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
									nameGap:Ymax>1?Ymax.toString().length*10:30,
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
								console.log(params)
								console.log(params.name)
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
			toastr["info"]("错误信息","未连接服务器");
		}  
	});
}
var referparam = [];//判断是点击查询按钮出现的表格还是通过点击分析图的点柱出现的表格。""为查询，否则为点击图。
//企业点击了柱图上的某一数据
function getAnotherCompanytable(type,id,value){
	console.log(value)
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
	 if ( $("#yuan_select").val() == "p" ) {
		 $('#renwu_select1').bootstrapTable('destroy');//销毁表格数据
		 task_select("1");
	 } else {
		 $('#renwu_select2').bootstrapTable('destroy');//销毁表格数据
		 task_select1("1");
	 }
	
}
var active;//活动水平
var ef;//排放因子
var eta;//去除效率

function getSelectCompany(){
	var data = ajax_async_t(BackstageIP+"analysis/check/config/company.do",{
		sourceId:$('input[name="hy_name"]').filter(':checked').val(),
		subSector:$('#trade').val(),
		createUserId:dataBase.Login_map.SOLE,
		version:version},"JSON","1","POST");
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			
			active = data.data.active;
			ef = data.data.ef;
			eta = data.data.eta;
			console.log(data);
			//活动水平-左
			var html_active_left = "";
			for(var i=0; i<active.left.length; i++){
				html_active_left += "<option value='"+active.left[i].value+"'>"+active.left[i].name+"</option>";
			}
			$("#qy_sele_1").html(html_active_left);

			//活动水平-右
			var html_active_rigth = "";
			for(var i=0; i<active.right.length; i++){
				html_active_rigth += "<option value='"+active.right[i].value+"'>"+active.right[i].name+"</option>";
			}
			$("#qy_sele_2").html(html_active_rigth);
			openPic_2("1",$("#qy_sele_1").val());
			openPic_2("2",$("#qy_sele_2").val());
		}else{
			toastr["info"]("错误信息",JSON.stringify(data));
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

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
	}else{
		$("#pictures").hide();
	}
	
		
	$("#qy_sele_1").html(html_left);
	$("#qy_sele_2").html(html_rigth);
}
var shi_active = "";//市填报活动水平
var shi_ef = "";//市填报排放因子
var shi_eta = "";//市填报去除效率

function openPic(bigIndex,fileId,taskId){
	shi_fileId=fileId;
	shi_bigIndex=bigIndex;
	shi_taskId=taskId;
//	$("#shi_sele_1").html(null);
	$("#shi_tudiv1").html(null);
	$("#shi_tudiv2").html(null);
	
	$("#select_b").val("a");
	var data = ajax_async_t(BackstageIP+"analysis/check/config/file.do",{
		fileId:shi_fileId,
		bigIndex:bigIndex,
		taskId:taskId,
		createUserId:dataBase.Login_map.SOLE,
		version:version},"JSON","1","POST");
	
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			shi_active = data.data.active;
			shi_ef = data.data.ef;
			if(data.data.eta!=undefined){
				shi_eta = data.data.eta;
			}	
		
			
			/*if ( dataType=="ps" ) {
				shi_type = "p" ;
			} else {
				shi_type = "s";//面源
			}*/
			var html1 ="";
			var html2 = "";
			if(data.data.active.left!=undefined&&data.data.active.left!=null){
				$.each(data.data.active.left,function(i,item){
					html1 += '<option value="'+item.value+'">'+item.name+'</option>';
				})
			}
			$.each(data.data.active.right,function(i,item){
				html2 += '<option value="'+item.value+'">'+item.name+'</option>'
			})
			$("#shi_sele_1").html(html1);
			$("#shi_sele_2").html(html2);
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
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}


var shi_all_index1;
var shi_all_index2;
function shi_openPic_2(id,value){
	if(id=="1"){
		//开启图形
		myChart_1 = echarts.init(document.getElementById("shi_tudiv1"), 'macarons');//声明id为1的div为图形dom
		myChart_1.showLoading();
	}else{
		//开启图形
		myChart_2 = echarts.init(document.getElementById("shi_tudiv2"), 'macarons');//声明id为2的div为图形dom
		myChart_2.showLoading();
	}
//	$("#shi_tudiv1").show();
//	$("#shi_tudiv2").show();
	var taskId = $("#select_2").val();//任务id
	var sourceId = $('input[name="hy_name"]').filter(':checked').val();//排放源id
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
									nameGap:30,
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
						console.log(data);
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
									nameGap:30,
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
								console.log(params);
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
//								console.log(datas);
//								console.log(params)
								getAnotherShitable("pie",id,params.name);
							}
						});
					}
				}
			}else{
				toastr["info"]("错误信息","数据库无返回值")
			}
		},
		error: function (e) { 
			toastr["info"]("错误信息","未连接服务器");
		}  
	});
}

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
	}else{
		$("#shi_pictures").hide();
	}
	$("#shi_sele_1").html(html_left);
	$("#shi_sele_2").html(html_rigth);
}



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
//	var str = ["化石燃料固定燃烧源","工艺过程源","移动源","溶剂使用源","农业源","扬尘源","储存运输","生物质燃烧源","废弃物处理源","其它排放源"];
//	var num =  parseInt(parameter)-1;
//	parent.renwuINDEX=JSON.stringify(referparam);
//	window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?fileId="+shi_fileId+"&version=1.0&bigIndex="+$("#doc_1 input[name='hy_name']:checked").next("label").text()+"&type="+shi_type+"&shi_dian=1&index="+referparam+"");
//	window.parent.$("#yincang_caidan").html(str[num]+"-查看文件");
//	window.parent.$("#yincang_caidan").click();
}