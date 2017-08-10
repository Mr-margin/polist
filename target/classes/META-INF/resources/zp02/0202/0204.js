jQuery.support.cors = true;
var version = "1.0";
$(function() {
	select_task();
//	groupByStatus();
//	schedule_select('ALL');
	show_table();
});
dataBase=parent.dataBase;
var sc_taskId="";
window.onresize=function () { //浏览器调整大小后，自动对所有的图进行调整
	try{
		if(myChart){
			myChart.resize();
		}
		
	}catch(e){
	}
};
function chonse_renwu(){
	$("#list_table").empty();
	show_table();
}
//任务下拉框
function select_task () {
	var data = ajax_async_t(BackstageIP+"taskProvince/selectTaskName.do", {provinceUserId:parent.dataBase.Login_map.SOLE,version:version,flag:true}, "json");
	if(data != "" && data != null && data != undefined ) {
		if ( data.status == "success" ) {
			if ( data.data.length > 0 ) {
				var html = '';
				$.each(data.data,function(i,item){
					if ( i == 0 ) {
						sc_taskId = item.taskId;
					}
					html += '<option value="'+item.taskId+'">'+item.taskName+'</option>'
				});
				$("#renwu_select").html(html);
			} else {
				toastr["info"]("错误信息",data.code);
			}
		} else {
			toastr["info"]("错误信息",data.code);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
//默认表格
var checkedTable = {};

function show_table (){
	var a=document.getElementsByName("v1");
	var chk_value =[]; 
	$('input[name="v1"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	if(chk_value.length<0) return toastr["info"]("提示", "请选择查询的任务状态");
	if($("#renwu_select").val() != "" && $("#renwu_select").val() != null && $("#renwu_select").val() != undefined)
		var data = ajax_async_t(BackstageIP+"taskProvince/checkStatus.do", {provinceUserId:parent.dataBase.Login_map.SOLE,version:version,taskId:$("#renwu_select").val(),status:chk_value}, "json");
	else return toastr["info"]("提示", "请选择任务名称");
	console.log(data)
	$("#list_table").html("");
	if ( data != "" && data != null && data != undefined ) {
			var html = '';
			$.each(data,function(i,item){
				html += '<tr><td><input onclick="table_checked(\'table'+i+'\');" id="table'+i+'" type="checkbox" value="'+item.listId+'PL'+item.cityUserId+'" name="v2" ><label for="table'+i+'"></label></td>'+
						'<td>'+item.city+'</td><td>'+item.listName+'</td><td>'+item.status+'</td><td><a onclick="analyse('+item.listId+')"><i class="fa fa-bar-chart"></i> 分析&nbsp;&nbsp;</a><a onclick="cha_info('+item.listId+')"><i class="fa fa-check"></i> 逐源审核</a></td></tr>';
				checkedTable['table'+i]=false;
			});
			$("#list_table").html(html);
//		}
	} else {
		toastr["info"]("提示", "无返回数据");
	}
}
var checkedObj = {};
checkedObj['checked_1']=true;	
checkedObj['checked_2']=true;	
checkedObj['checked_3']=true;	
//全选与全不选
function all_checkbox(){
	var checkbox = document.getElementById('checked_0');
	  if(checkbox.checked){
		  $("#checked_status :checkbox").prop("checked",true);
			for(var ce in checkedObj){
				checkedObj[ce] = true;
			}
	  }else{
		  $("#checked_status :checkbox").prop("checked",false);
			for(var ce in checkedObj){
				checkedObj[ce] = false;
			}
	  }
	 // show_table();
}
function onle_checked(id){
	var checkbox = document.getElementById('checked_0');
	var onlecheckbox = document.getElementById(id);
	if(onlecheckbox.checked){
		checkedObj[id] = true;
	}else{
		checkedObj[id] = false;
	}
	var i = 0;
	for(var ce in checkedObj){
		if(!checkedObj[ce]){
			i++;
			$(checkbox).prop("checked",false);
		}
	}
	if(!i){
		$(checkbox).prop("checked",true);
	}
	i=0;
	//show_table();
}
//表格全选
function table_all_checked(){
	var checkbox = document.getElementById('all');
	  if(checkbox.checked){
		  $("#table_qing :checkbox").prop("checked",true);
			for(var ce in checkedTable){
				checkedTable[ce] = true;
			}
	  }else{
		  $("#table_qing :checkbox").prop("checked",false);
			for(var ce in checkedTable){
				checkedTable[ce] = false;
			}
	  }
}
function table_checked(id){
	var checkbox = document.getElementById('all');
	var onlecheckbox = document.getElementById(id);
	if(onlecheckbox.checked){
		checkedTable[id] = true;
	}else{
		checkedTable[id] = false;
	}
	var i = 0;
	for(var ce in checkedTable){
		if(!checkedTable[ce]){
			i++;
			$(checkbox).prop("checked",false);
		}
	}
	if(!i){
		$(checkbox).prop("checked",true);
	}
	i=0;
}
/**
 * 通过
 */
function adopt (listId){
	var a=document.getElementsByName("v2");
	var chk_value =[]; 
	var chk_value1 =[]; 
	$('input[name="v2"]:checked').each(function(){ 
		var str = $(this).val().split("PL")
		chk_value.push(str[0]); 
		chk_value1.push(str[1]); 
	});
	if(chk_value1.length == 0 || chk_value.length == 0 ) {
		if(listId=="4"){
			toastr["info"]("提示", "请选择要通过的清单");
		}
	
		 return;
	}
	if(listId=="4"){
		var t= "您确定要通过这些清单吗？";
	}
	swal({
		title:t,
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	},
	function() {
	var data = ajax_async_t(BackstageIP+"taskProvince/passAndReject.do", {version:version,taskId:$("#renwu_select").val(),cityUserId:chk_value1,listId:chk_value,status:listId}, "json");
	if ( data != "" && data != null && data != undefined ) {
		if ( data.status == "success" ) {
			if(listId == 4 ) {
				swal("操作成功！", "这些清单通过成功", "success");
			} else if ( listId == 5 ) {
				swal("操作成功！", "这些清单驳回成功", "success");
			}
			$("#all").prop("checked",false);
			show_table();
		} else {
			if(listId == 4 ) {
				swal("操作失败", data.error, "error");
			} else if ( listId == 5 ) {
				swal("操作失败", data.error, "error");
			}
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
	});
}
//全部通过
function all_adopt(){
	swal({
		title: "您确定要通过全部清单吗？",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	},
	function() {
	var a=document.getElementsByName("v1");
	var chk_value =[]; 
	$('input[name="v1"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	var data = ajax_async_t(BackstageIP+"taskProvince/allPassed.do", {taskId:$("#renwu_select").val(),status:chk_value}, "json");
	if(data!="" && data!=null || data!=undefined ) {
		if(data.status == "success" ) {
			swal("操作成功！", "所有清单状态以改为通过", "success");
			$("#all").prop("checked",false);
			show_table();
		} else {
			swal("操作失败", data.error, "error");
		}
	}else{
		toastr["info"]("提示", "未连接"+BackstageIP);
	}
	});
}

/**
 * 查看
 */
function cha_info(listId) {
	var data = ajax_async_t(BackstageIP+"taskProvince/oneByOneCheckTaskName.do", {listId:listId}, "json");
	var listYear = "";
	var listName = "";
	var taskName = "";
	if (data != "" && data != null && data != undefined) {
		console.log(data)
		listYear = data.listYear;
		listName = data.listName;
		taskName = data.taskName;
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
	window.parent.$("#yincang_caidan").attr("href","zp02/0202/0205.html?listId="+listId);
	window.parent.$("#yincang_caidan").html(taskName+" > "+data.listName);
	window.parent.$("#yincang_caidan").click();
}

var myChart;
function analyse(listId){
	$("#zhezhao").show();//创建中
	$("#zhezhao_title").show();
	$.ajax({  		       
	    url: BackstageIP+'taskProvince/chart.do',
	    type: "POST",
	    async:true,
	    dataType: 'json',
//	    traditional : true,
	    data: {
	    	listId:listId,
	    },
	    success: function (data) {
	    	console.log(data);
	    	if(data.status=="success"){
	    		$("#show_bar").hide();
	    		$("#show_pie1").hide();
	    		$("#show_pie2").hide();
	    		SCC1 =data.data.SCC1;
	    		SCC2 = data.data.SCC2;
	    		SCC3 = data.data.SCC3;
	    		relation = data.data.relation;
	    		var zhu = [];
	    		var num =0;
	    		for (var prop in SCC1) {  
	    			  if (SCC1.hasOwnProperty(prop)) {   
	    				  zhu[num] = prop;
	    				  num ++;
	    			  } 
	    		}
	    		var s1 = new Array();
	    		for( var i = 0 ; i < zhu.length; i ++ ) {
//		    		 s1[i]={name:""+zhu[i]+"",type:"bar",data:[SCC1[zhu[i]].CO,SCC1[zhu[i]].NOx,SCC1[zhu[i]].SO2,SCC1[zhu[i]].VOC,SCC1[zhu[i]].NH3,SCC1[zhu[i]].PM25,SCC1[zhu[i]].PMcoarse,SCC1[zhu[i]].PM10more,SCC1[zhu[i]].BC,SCC1[zhu[i]].OC],stack:"数据"};
	    			s1[i]={
	    					name:""+zhu[i]+"",
	    					type:"bar",
	    					data:[
	    					      ((SCC1[zhu[i]].CO)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].NOx)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].SO2)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].VOC)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].NH3)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].PM25)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].PMcoarse)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].PM10more)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].BC)/10000).toFixed(2), 
	    					      ((SCC1[zhu[i]].OC)/10000).toFixed(2) 
	    					      ],
						stack : "数据"
					};
	    		}
	    		$("#show_bar").show();
	    		
	    		console.log(s1);
	    		bar(zhu,s1,data.xAxis);
	    		document.getElementById('show_bar').scrollIntoView();
	    		$("#qigndan_build").show();
	    		
	    		$("#zhezhao").hide();//分析中
	    		$("#zhezhao_title").hide();
	    		
	    	} else if ( data.status == "fail" ) {
	    		$("#zhezhao").hide();//分析中
	    		$("#zhezhao_title").hide();
	    		toastr["info"]("提示","数据库中未找到匹配数据");
	    		
	    	}
	    },
	    error: function (data) {
	    	console.log(data);
	    }  
	})
}
function bar (zhu,s1,str) {
	option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:zhu
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['CO','NOx','SO2','VOC','NH3','PM2.5','PMcoarse','PM10more','BC','OC'],
		            name:str,
					nameGap:30,
					max: "auto",
					axisLabel:{//坐标轴文本标签选项
						interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
						rotate:25,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
						margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
					},
		        }
		    ],
		    yAxis : [
		        {	name: '万吨',
		            type : 'value'
		        }
		    ],
		    series : s1
		};
	myChart = echarts.init(document.getElementById("bar"), 'macarons');//声明id为1的div为图形dom
	myChart.on('click', function (params) {
		console.log(params);
	    var diqu=params.seriesName;
	    $("#show_pie1").show();
	    pie(params.seriesName,params.name);
	});
	myChart.setOption(option);
	
	 $("#show_pie1").show();
	 pie(zhu[0],'CO');
}
//第一个饼图
function pie(str,d_name) {
	var zhu=[];
	var num =0;
	if(str == "" || str == null || str == undefined ) {
		 return;
	}
	for (var prop in relation[str]) {  
		  if (relation[str].hasOwnProperty(prop)) {   
			  zhu[num] = prop;
			  num ++;
		  } 
	}
	var s = new Array();

	var snu =0;
	var name =[];
	var ss="";
	console.log(SCC2[str]);
	for ( var i = 0 ; i < zhu.length; i ++ ) {
		for (var prop1 in SCC2[zhu[i]]) {  
			  if (SCC2[zhu[i]].hasOwnProperty(prop1)) {   
				  if(prop1==d_name){
					  ss= ((SCC2[zhu[i]][prop1])/10000).toFixed(2);
				  }
			  } 
		}
		if(SCC2[zhu[i]] != "" && SCC2[zhu[i]] != null && SCC2[zhu[i]]!=undefined) {
			name[snu]=zhu[i].split("-")[1];
			s[snu]= {value:ss,name:zhu[i].split("-")[1]};
			 snu++;
		}
	}
	

	option = {
		    title : {
		        text: d_name+str,
		        subtext: '',
		        x:'left'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	top:'30',
		        orient: 'vertical',
		        left: 'left',
		        data: name
//		    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'] 
		    },
		    series : [
		        {
		            name: str,
		            type: 'pie',
		            radius : '50%',
		            center: ['65%', '65%'],
		            data:
		                s
		            ,
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
	myChart = echarts.init(document.getElementById('pie1'),'macarons');
	myChart.on('click', function (params) {
	    $("#show_pie2").show();
	    pie2(str,str+"-"+params.name,d_name);
	});
	myChart.setOption(option);
	 $("#show_pie2").show();
	 pie2(str,str+"-"+name[0],d_name);
}
//第二个饼图
function pie2(str,str1,d_name){
	var zhu=[];
	var num =0;
	var s = new Array();
	var s1= [];
	var snu =0;
	var name =[];
	var name_num =0 ;
	var ss ;
	for ( var i = 0 ; i < relation[str][str1].length; i ++ ) {
		for (var prop1 in SCC3[relation[str][str1][i]]) { 
			  if (SCC3[relation[str][str1][i]].hasOwnProperty(prop1)) {   
				  if(prop1==d_name){
					  ss= ((SCC3[relation[str][str1][i]][prop1])/10000).toFixed(2);
				  }
			  } 
		}
		if(SCC3[relation[str][str1][i]]!="" && SCC3[relation[str][str1][i]] != null && SCC3[relation[str][str1][i]] != undefined ) {
			name[snu]=relation[str][str1][i].split("-")[2];
			 s[snu]= {value:ss,name:relation[str][str1][i].split("-")[2]};
			  snu++;
		}
	}
	console.log(name)
	console.log(s1)
	option = {
		    title : {
		        text: d_name+str1,
		       
		        subtext: '',
		        x:'left'
		        	
		    },
		    tooltip : {
		    	 trigger: 'item',
		         formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	top:'30',
		        orient: 'vertical',
		        left: 'left',
		        data:name
		    },
		    series : [
		        {	
		            name: str1,
		            type: 'pie',
		            radius : '50%',
		            center: ['65%', '70%'],
		            data:s,
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
	myChart = echarts.init(document.getElementById('pie2'),'macarons');
	myChart.on('click', function (params) {
	});
	myChart.setOption(option);
}
//点击驳回
function reject(){
	var chk_value =[]; 
	var chk_value1 =[]; 
	$('input[name="v2"]:checked').each(function(){ 
		var str = $(this).val().split("PL")
		chk_value.push(str[0]); 
		chk_value1.push(str[1]); 
	});
	if(chk_value1.length == 0 || chk_value.length == 0 ) {
			toastr["info"]("提示", "请选择要驳回的清单");
		 return;
	}
	$("#reject_table").modal();
}
function rejectbody(listId){
	
	var chk_value =[]; 
	var chk_value1 =[]; 
	$('input[name="v2"]:checked').each(function(){ 
		var str = $(this).val().split("PL")
		chk_value.push(str[0]); 
		chk_value1.push(str[1]); 
	});
	var str = (JSON.stringify(chk_value).replace("[","")).replace("]", "");
	var str1 = (JSON.stringify(chk_value1).replace("[","")).replace("]", ""); 
	console.log(str);
	console.log(str1);
	var file=$("#file");
	var rejectContent = $("#reject_content").val();
	if($.trim(file.val())==""&&rejectContent==""){
		toastr["info"]("请选择文件，或填写驳回原因");
		return;
	}
		swal({
			title: "您确定要驳回这些清单吗？",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		},
		function() {
			$.ajaxFileUpload
            (
                    { url: BackstageIP+'taskProvince/passAndReject?taskId='+$("#renwu_select").val()+'&userId='+dataBase.Login_map.SOLE+'&cityUserId='+chk_value1+
                        '&listId='+chk_value+'&version=1.0&reason='+rejectContent+'&status='+listId, //用于文件上传的服务器端请求地址
                        secureuri: false, //是否需要安全协议，一般设置为false
                        data:{
//                        	INDEX:index_strs
                        },
                        fileElementId: 'file', //文件上传域的ID
                        dataType: 'json',
                        success: function (data, status)  //服务器成功响应处理函数
                        {	
                        	if(data != undefined){
                				if(data.status == "success"){
                					swal("操作成功！", "这些文件状态改为驳回", "success");
                					show_table();
//                					$('#metTable1').bootstrapTable('destroy');//销毁表格数据
//                					metTable_initialization();//生成企业表格
//                					$('#metTable1').bootstrapTable('selectPage', page_qy);
//                					$("#reject_table").modal('toggle');
//                					parent.findIframe();//刷新任务列表中的文字和列表
                				}else if(data.status == "fail"){
                					swal("操作失败", data.error, "error");
                				}
                			}
                        },
                        error: function (data, status, e)//服务器响应失败处理函数
                        {
//                            console.log(data);
                            swal("操作失败", data.error, "error");
                        }
}
            )
		});
//		var	renwuguanli = parent.document.querySelector('#renwuguanli');	//获取父页面主菜单的对象
//		var home=$(renwuguanli.children[0]).attr("href");
//			$(renwuguanli.children[0]).attr("href",home+'?BH='+1);
//			renwuguanli.children[0].click();
	//}
	//$("#reject_table").modal('toggle');
}