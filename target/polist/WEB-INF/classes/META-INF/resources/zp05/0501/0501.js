jQuery.support.cors = true;
var dataBase = parent.dataBase;			//调用父页面的全局变量
var version = "1.0";					//版本
var userId = dataBase.Login_map.SOLE;	//userId,获取父页面的Login_map的SOLE的值
var regionId_1 = parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';	//region行政区划代码,行政区域获取父页面的Message_map的REGION的值
var user_type = parent.dataBase.Login_map.TYPE;
var metTable1 = $('#metTable1');		//获取表格
var table_List = $('#table_List');		
var name_select = "";
//var sheng_select2="";
var lineChart;
var region_id = dataBase.Login_map.USER_NAME;
window.onresize=function () { //浏览器调整大小后，自动对所有的图进行调整
	try{
		if(lineChart){
			lineChart.resize();
		}
		if(myChart){
			myChart.resize();
		}
	}catch(e){
	}
};
/****************************************************初始化*************************************************************************/
var bookIds_length;
var level=dataBase.Login_map.USER_NAME;
$(function(){
	if(user_type==1){
		$("#ssx_br").show(0);
		$("#ssx_select").show(0);
	}else{
		$("#all_spe").hide();
		$("#spec").val("SO2");
		$("button[name='button']").hide(0);
	}
	findGroupByYearList();
//	$("#qdxz_Modal").modal();
	$("#qdxz_Modal").modal({backdrop: 'static',keyboard: false});  			//点击先调用模态窗
	$("#show_choose1").modal({backdrop: 'static',keyboard: false});
});
var year_id = 100;//记录行数、id
//添加行
function tjqdnf(){
	if(quanJu == null){
		var data = ajax_async_t(BackstageIP+"showCountryList/findListGroupByYear", {userId:userId,version:version}, "json");
		if(data!=null&&data!=undefined&&data!=""){
			if(JSON.stringify(data) != "{}"){
				quanJu = data;
			}else{
				toastr["info"]("无清单数据");
				return ;
			}
		}else{
			toastr["info"]("错误信息", "未连接"+BackstageIP);
		}
	}else{
		var trHTML = "<tr id='trRow"+year_id+"'><td class='text-center'><select id='selectYear"+year_id+"' name='select' style='width:150px;height:25px;' onchange=\"change_year('"+year_id+"')\"></select></td><td class='text-center'><select id='selectName"+year_id+"' name='select' style='width:150px;height:25px;'></select></td><td class='text-center'><a class='remove' data-toggle='modal' onclick=\"deltr('trRow"+year_id+"')\" style='color:red'><i class='fa fa-remove'></i> 删除</a></td></tr>"
		$("#metTable1").append(trHTML);
		
		for( var prop in quanJu){
			$("#selectYear"+year_id).append('<option value=\''+prop+'\'>'+prop+'</option>');
		}
		$.each(quanJu[$("#selectYear"+year_id+">option:selected").val()],function(y,item){
			$("#selectName"+year_id).append('<option value='+item.id+'>'+item.name+'</option>');
		});
		year_id++;
	}
}
/********************************************************删除行**********************************************/
function deltr(trid){   
	$("#"+trid).remove();
}

/*************************************************初始化表格******************************************************************/
var select = "";
var name_select = "";
var table_data ;
function getOrder(){
	var data = ajax_async_t(BackstageIP+"showCountryList/findListGroupByYear", {userId:userId,version:version}, "json");
	if(data != undefined&&data!=null&&data!="" ){
		table_data = data;
		for( var prop in table_data){
			 if (table_data.hasOwnProperty(prop)) {   
				select += '<option value=\''+prop+'\'>'+prop+'</option>'
			  } 
		}
		$("#year1").html(select);
		$.each(table_data[$("#year1").val()],function(i,item){
			name_select += '<option value='+item.id+'>'+item.name+'</option>'
		})
		$("#qingdan1").html(name_select);
		
	}else{
		toastr["info"]("没有找到匹配数据");
	}
}
function add_formation(){
	
}
/**************************************************点击点源***************************************************/
function dy(dy_i) {
	var regionId="";											//行政区域编码
	if(f_data[dy_i].region==null){
		regionId = "000000";
	}else{
		regionId = f_data[dy_i].region;
	}
	if(f_data[dy_i].scc1==null||f_data[dy_i].scc1==''||f_data[dy_i].scc1==undefined||f_data[dy_i].scc1=="所有"){
		var scc1='';
		var yq_scc1='所有部门';
	}else{
		var scc1=f_data[dy_i].scc1;
		var yq_scc1=f_data[dy_i].scc1;
	}
	if(f_data[dy_i].scc2==null||f_data[dy_i].scc2==''||f_data[dy_i].scc2==undefined||f_data[dy_i].scc2=="所有"){
		var scc2='';
		var yq_scc2='所有行业';
	}else{
		var scc2=f_data[dy_i].scc2;
		var yq_scc2=f_data[dy_i].scc2;
	}
	if(f_data[dy_i].year==null||f_data[dy_i].year==''||f_data[dy_i].year==undefined){
		var dy_year=f_data[dy_i+1].year;
	}else{
		var dy_year=f_data[dy_i].year;
	}
	window.parent.$("#yincang_caidan").html(yq_scc1+"-"+yq_scc2);	//设置页签名称
	window.parent.$("#yincang_caidan").attr("href","zp05/0501/0502.html?bookId="+f_data[1].bookId+'&regionId='+regionId+'&species='+$("#renwu_select>option:selected").val()+'&scc1='+scc1+'&scc2='+scc2+'&scc3='+''+'&totalEmission='+f_data[dy_i].scc3+'&year='+dy_year);
	window.parent.$("#yincang_caidan").click();		
}

/****************************************清单展示国家级省市县三级联动*******************************************************/
var linkage_data="";	//三级数据
var	sheng_select= "";
var shi_select="";
var xian_select="";
var xian_select_jarr=[];
function linkage(){
	var qdName_select=$("#qdName_select").val();
	var section_select=$("#section_select").val();
	var renwu_select=$("#renwu_select").val();
	$.ajax({
		url:  BackstageIP+'showCountryList/linkage.do',		//请求地址
    	type: "POST",
    	async:false,
    	dataType: 'JSON',
    	data: {
    		qdName_select:'',
    		dept:'',
    		renwu_select:'',
    	},
    	success: function (data) {
    		if(data!=undefined){
    			linkage_data=data;
    			$("#sheng_select").empty();
    		    $("#sheng_select").append("<option value = ''>全部</option>");
    			for(var pro in linkage_data){
                    $("#sheng_select").append("<option value = "+pro+">"+pro.split("-")[0]+"</option>");
                }
    		}else{
    			toastr["info"]("错误信息","没有找到匹配数据");
    		}
    	},
	    error: function (data) {
	    
	    }
	});
}
/*********************************************省级事件*********************************************************************/
function sheng_change(){
    $("#shi_select").empty();
    $("#xian_select").empty();
    $("#shi_select").append("<option value = ''>全部</option>");
    $("#xian_select").append("<option value = ''>全部</option>");
    $.each(linkage_data[$("#sheng_select").val()],function(key,val){
        $("#shi_select").append("<option value = "+key+">"+key.split("-")[0]+"</option>");
    });
}
/**********************************************市级事件*********************************************************************/
function shi_change(){
    $("#xian_select").empty();
    $("#xian_select").append("<option value = ''>全部</option>");
    $.each(linkage_data[$("#sheng_select").val()][$("#shi_select").val()],function(key,val){
        $("#xian_select").append("<option value = "+val+">"+val.split("-")[0]+"</option>");
    });
}
/****************************************************按钮控制ul*********************************************************/
function species(){
		 if( $("ul").css("display")=="none"){
			 $("ul").css("display","block");
		 }else if( $("ul").css("display")=="block"){
			 $("ul").css("display","none");
		 }
}
/**************************************************确定关闭模态窗*********************************************************************/
function yes(){
	$("#qdxz_Modal").click();
}
function qdxz_Modal_1(){	//右侧第一个按钮
	$("#qdxz_Modal").modal({backdrop: 'static',keyboard: false});  	
	findGroupByYearList();//调用模态窗
}
/************************************************************************************************************************************/

function ckxs_Modal(){  
	$("#ckxs_Modal").modal({backdrop: 'static',keyboard: false});
}

function cknr_Modal(){  
	$("#cknr_Modal").modal({backdrop: 'static',keyboard: false});
}
/*************************************************初始化页面进入时弹出的模态窗中的确定按钮*****************************************************************************/
var qddata_select="";
var qddata_year_val='';
var qddata_name="";			
var qddata_name_val='';
var qddata_year=[];	
var qddata_name=[];	
var qddata_text=[];
var qddata_name_arr=new Array();

function qd_year_name(){//确定按钮
	qddata_year=[];			//清空
	qddata_name=[];			//清空
	qddata_text=[];			//清空
	$("#qdName_select").empty();
	var html = "";
	var qddata=$("#metTable1 select option:selected");
	if(qddata.length<=0){
		toastr["info"]("提示", "必须选择一条记录");
		return;
	}else{
		for(var i=0;i <qddata.length;i++){
			if(i%2==0){
				qddata_year.push(qddata[i].value);
			}else{
				qddata_name.push(qddata[i].value);
				qddata_text.push(qddata[i].text);
			}
		}
		saveGroupByYearList();
	}
	if(qddata.length<=0){		//未选择则不会往下执行
		toastr["info"]("提示", "必须选择一条记录");
	}else{
		$("#list_table").empty();
		$("#qdName_select").empty();
		for(var i = 0; i < qddata_name.length; i++){
			$("#qdName_select").append('<option value = '+qddata_name[i]+' selected>'+qddata_year[i]+'-'+qddata_text[i]+'</option>');
		}
		$('.selectpicker').selectpicker('refresh');		// 缺一不可
		$('.selectpicker').selectpicker('render');		// 缺一不可
		$('.selectpicker').selectpicker('show');		//显示数据
		$("#qdxz_Modal").modal('toggle');			    //关闭模态窗
		linkage();
		query_table();
		if($("#show_version>input:checked").val()=="p"){
			bar ();
		}
		return;
	}
}

/******************************************************保存所选择的清单*************************************************************/
function saveGroupByYearList(){
	$.ajax({
		url:  BackstageIP+'showCountryList/saveGroupByYearList',		//请求地址
    	type: "POST",
    	async:false,
    	dataType: 'JSON',
    	traditional : true,
    	data: {
    		userId : userId,
    		year: qddata_year,			//清单id,是Integer型数组
    		name: qddata_text,			//年份
    	},
    	success: function () {
    		if(user_type==1){
    			if(qddata_year.length==1)
    			{
    				$("#all_spe").show();
    			}	
    			else{
    				$("#all_spe").hide();
    				if($("#spec").val()=="")
    					$("#spec").val("SO2");
    			}
    		}
    	},
    	error: function () {
	    }
	});
}
/******************************************************查询所选择的清单*************************************************************/
var quanJu = null;
function change_year(id){
	var temp = $("#selectYear"+id+">option:selected").val();
	$("#selectName"+id).empty();
	$.each(quanJu[$("#selectYear"+id+">option:selected").val()],function(i,item){
		$("#selectName"+id).append('<option value='+item.id+'>'+item.name+'</option>');
	});
}
function findGroupByYearList(){
	$("#qdnr0").empty();
	var selectData = ajax_async_t(BackstageIP+"showCountryList/findGroupByYearList", {userId:userId}, "json");
	if(selectData!= undefined && selectData.length > 0){
		var data = ajax_async_t(BackstageIP+"showCountryList/findListGroupByYear", {userId:userId,version:version}, "json");
		if(data!=null&&data!=undefined&&data!=""){
			quanJu = data;
		}else{
			toastr["info"]("无清单数据");
			return ;
		}
		/*if(selectData.length==1){
			$("#all_spe").show();
		}
		else{
			$("#all_spe").hide();
			if($("#spec").val()=="")
				$("#spec").val("SO2");
		}*/
		for(var i = 0; i < selectData.length; i++){
			var trHTML = "<tr id='trRow"+i+"'><td class='text-center'><select id='selectYear"+i+"' name='select' style='width:150px;height:25px;' onchange=\"change_year('"+i+"')\"></select></td><td class='text-center'><select id='selectName"+i+"' name='select' style='width:150px;height:25px;'></select></td><td class='text-center'><a class='remove' data-toggle='modal' onclick=\"deltr('trRow"+i+"')\" style='color:red'><i class='fa fa-remove'></i> 删除</a></td></tr>"
			$("#metTable1").append(trHTML);
			for(var prop in quanJu){
				if(selectData[i].year == prop){
					$("#selectYear"+i).append('<option value=\''+prop+'\' selected=\"selected\">'+prop+'</option>');
				}else{
					$("#selectYear"+i).append('<option value=\''+prop+'\'>'+prop+'</option>');
				}
			}
			$.each(quanJu[$("#selectYear"+i+">option:selected").val()],function(y,item){
				if(selectData[i].name == item.name){
					$("#selectName"+i).append('<option value='+item.id+' selected=\"selected\">'+item.name+'</option>');
				}else{
					$("#selectName"+i).append('<option value='+item.id+'>'+item.name+'</option>');
				}
			});
		}
	}
}

/**************************************************************列表展示*************************************************************/
var f_data;
var r_data;
function query_table(){
	$('#table_List').bootstrapTable('destroy');  		//销毁表格
	$("#list_table").empty();
	var bookIds=$("#qdName_select").val();	//获取清单id 数组
	var dropdown_toggle=$(".dropdown-toggle");
	var title=dropdown_toggle[0].title;
	var title_arr=title.split(",");
//	var bookIds=$("#qdName_select>option:selected").val();		//多选 清单ID
	var scc1=$("#section_select>option:selected").val();		//部门
	var species = $("#renwu_select>option:selected").val();
	var regionId="";											//行政区域编码
	if($("#xian_select>option:selected").val()==null||$("#xian_select>option:selected").val()==""
		||$("#xian_select>option:selected").val()==undefined){
		if($("#shi_select>option:selected").val()==null||$("#shi_select>option:selected").val()==""
			||$("#shi_select>option:selected").val()==undefined){
			if($("#xian_select>option:selected").val()==null||$("#xian_select>option:selected").val()==""
				||$("#xian_select>option:selected").val()==undefined){
				regionId = "000000";
			}else{
				regionId = $("#sheng_select>option:selected").val().split("-")[1];
			}
		}else{
			regionId = $("#shi_select>option:selected").val().split("-")[1];
		}
	}else{
		regionId = $("#xian_select>option:selected").val().split("-")[1];
	}
	if(bookIds!=null&&bookIds!=''&&bookIds!=undefined){
	
		if(bookIds.length==1||scc1!=null&&scc1!=""){
			table_List.bootstrapTable('destroy');		//销毁表格
			$.ajax({
				url:  BackstageIP+'showCountryList/selectTableList',		//请求地址
		    	type: "POST",
		    	async:false,
		    	dataType: 'JSON',
		    	traditional : true,			//序列化转化为数组传输
		    	data: {
					pageNumber : 0,
					bookIds: bookIds,		//清单id,是Integer型数组
					scc1:scc1,					//部门
					regionId : parent.dataBase.Message_map.REGION,			//行政区代码
					species : species,
		    	},
		    	success: function (data) {
		    		f_data=data;
		    		var discharge;
		    		var dept_discharge;
		    		var hangye_discharge;
		    		var dept_sum;
		    		if(data.length > 0){
		    			var flagId = 0;
		    			flag = "";
		    			$("#list_table").empty();
		    			$.each(data,function(i,item){
	  	    				if(scc1==null||scc1==''){        //判断其部门查询条件为空
		    					
			    				if(item.scc1 == null){		//第一行
			    					discharge=item.scc3;
			    					$("#list_table").append("<tr>"+
											"<td>"+data[1].year+"</td>"+
											"<td>所有</td>"+
											"<td>所有</td>"+
											"<td>"+item.companyNum+"</td>"+
											"<td>"+(item.scc3/10000).toFixed(2)+"</td>"+
											"<td>100%</td>"+
											"<td><a id=\"dianyuan\" onclick=dy("+i+")>点源</a><a id=\"wuzhong\" onclick='wuzhong("+i+")'>&nbsp;&nbsp;全部物种</a></td>"+
										"</tr>");
			    				}
		    				}else{
		    					discharge=item.scc3;
		    				}
		    				if(item.scc2 == null && item.scc1 !=null){	//展示部门的数据
		    					flagId = item.id;
		    					item.scc2 = "所有";
		    					dept_discharge='';
		    					dept_discharge=item.scc3;
		    					if ( discharge != "0" ) {
		    						father_scc3=((item.scc3/discharge)*100).toFixed(2);
		    					} else {
		    						father_scc3="0.00";
		    					}
		    					
		    					$("#list_table").append("<tr id="+item.id+">"+
										"<td>"+item.year+"</td>"+
										"<td>"+item.scc1+"</td>"+
										"<td><a onclick=scc2("+item.id+")>"+item.scc2+"</a></td>"+
										"<td>"+item.companyNum+"</td>"+
										"<td>"+(item.scc3/10000).toFixed(2)+"</td>"+
										"<td>"+father_scc3+"%</td>"+
										"<td><a id=\"dianyuan\" onclick=dy("+i+")>点源</a><a id=\"wuzhong\" onclick='wuzhong("+i+")'>&nbsp;&nbsp;全部物种</a></td>"+
									"</tr>");
		    				}else{					//展示部门下属的子行业
		    					if(discharge != "0" ) sub_scc3=((item.scc3/discharge)*100).toFixed(2); 
		    					else sub_scc3="0.00";
		    					$("#list_table").append("<tr class=\"hhh"+flagId+"\" style = \"background: LightGray;display: none\">"+
										"<td>"+item.year+"</td>"+
										"<td id="+item.id+"_"+">"+item.scc1+"</td>"+
										"<td>"+item.scc2+"</td>"+
										"<td>"+item.companyNum+"</td>"+
										"<td>"+(item.scc3/10000).toFixed(2)+"</td>"+
										"<td>"+sub_scc3+"%</td>"+
										"<td><a id=\"dianyuan\" onclick=dy("+i+")>点源</a><a id=\"wuzhong\" onclick='wuzhong("+i+")'>&nbsp;&nbsp;全部物种</a></td>"+
									"</tr>");
		    				}
		    			});
		    		}else{
		    			toastr["info"]("错误信息","无返回数据");
		    		}
		    	},
			    error: function (data) {
			    }
			});   	 //ajax结束
		}else{
			var sub_pageNumber;
			var bookIds_obj="";
			bookIds=$("#qdName_select").val();	//获取清单id 数组
			for(var i=0;i<bookIds.length;i++){
				 bookIds_obj+=bookIds[i]+',';
			}
			var bookIds_obj1=bookIds_obj.substring(0, bookIds_obj.length-1);
			$('#table_List').bootstrapTable('destroy');  		//销毁表格
			$('#table_List').bootstrapTable({
				method: 'POST',
				url:  BackstageIP+'showCountryList/selectTableList',	//请求地址
				dataType: "json",
				numberOfPages:bookIds_length,	//设置控件显示的页码数.即：类型为page的操作按钮的数量
	//			detailView: false,     //是否显示父子表
				iconSize: "outline",
				clickToSelect: true,		//点击选中行
				striped: true,	 			//使表格带有条纹
				pagination: true,			//在表格底部显示分页工具栏
				pageSize: 11,				
				pageNumber:1,				
				sidePagination: "server",	//表格分页的位置 client||server
				totalPages:3,
				responseHandler:function (res) {		//可以自定义配置服务器响应返回的参数信息
					if (res.total!=0) {
	//					var result = b64.decode(res.ResultValue);
	//					var resultStr = $.parseJSON(result);
						return {
						"rows":res.rows,
						"total": ($($("#qdName_select").val()).length)*11
						};
					} else {
						return {
						"rows": [],
						"page":$($("#qdName_select").val()).length,
						"total": ($($("#qdName_select").val()).length)*11
						};
					}
				},
				queryParams : function(params) {
					sub_pageNumber=params.offset;
					return {
	//					pageSize : params.limit,	
						pageNumber : sub_pageNumber/11,
						bookIds : bookIds_obj1,			//清单id,是Integer型数组
						scc1:scc1,						//部门
						regionId : parent.dataBase.Message_map.REGION,				//行政区代码
						species : species,
					}
				},
				queryParamsType: "limit", 		//参数格式,发送标准的RESTFul类型的参数请求
				silent: true,  					//刷新事件必须设置
				contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
				onLoadSuccess:function (datas) {
					data=datas.rows;
					f_data=datas.rows;
		    		var discharge;
		    		var dept_discharge;
		    		var hangye_discharge;
		    		var dept_sum;
		    		if(data&&data.length > 0){
		    			var flagId = 0;
		    			flag = "";
		    			$("#list_table").empty();
		    			$.each(data,function(i,item){
		    				if(item.scc1 == null){		//第一行
		    					discharge=item.scc3;
		    					$("#list_table").append("<tr>"+
										"<td>"+data[1].year+"</td>"+
										"<td>所有</td>"+
										"<td>所有</td>"+
										"<td>"+item.companyNum+"</td>"+
										"<td>"+(item.scc3/10000).toFixed(2)+"</td>"+
										"<td>100%</td>"+
										"<td><a id=\"dianyuan\" onclick=dy("+i+")>点源</a><a id=\"wuzhong\" onclick='wuzhong("+i+")'>&nbsp;&nbsp;全部物种</a></td>"+
									"</tr>");
		    				}
		    				if(item.scc2 == null && item.scc1 !=null){	//展示部门的数据
		    					flagId = item.id;
		    					item.scc2 = "所有";
		    					dept_discharge='';
		    					dept_discharge=item.scc3;
		    					if(discharge != "0" ) father_scc3=((item.scc3/discharge)*100).toFixed(2); 
		    					else father_scc3="0.00";
		    					$("#list_table").append("<tr id="+item.id+">"+
										"<td>"+item.year+"</td>"+
										"<td>"+item.scc1+"</td>"+
										"<td><a onclick=scc2("+item.id+")>"+item.scc2+"</a></td>"+
										"<td>"+item.companyNum+"</td>"+
										"<td>"+(item.scc3/10000).toFixed(2)+"</td>"+
										"<td>"+father_scc3+"%</td>"+
										"<td><a id=\"dianyuan\" onclick=dy("+i+")>点源</a><a id=\"wuzhong\" onclick='wuzhong("+i+")'>&nbsp;&nbsp;全部物种</a></td>"+
									"</tr>");
		    				}else{					//展示部门下属的子行业
		    					if(discharge != "0" ) sub_scc3=((item.scc3/discharge)*100).toFixed(2); 
		    					else sub_scc3="0.00";
		    					$("#list_table").append("<tr class=\"hhh"+flagId+"\" style = \"background: LightGray;display: none\">"+
	//									"<td>"+$("#qdName_select>option:selected").text().split("-")[0]+"</td>"+
										"<td>"+item.year+"</td>"+
										"<td id="+item.id+"_"+">"+item.scc1+"</td>"+
										"<td>"+item.scc2+"</td>"+
										"<td>"+item.companyNum+"</td>"+
										"<td>"+(item.scc3/10000).toFixed(2)+"</td>"+
										"<td>"+sub_scc3+"%</td>"+
										"<td><a id=\"dianyuan\" onclick=dy("+i+")>点源</a><a id=\"wuzhong\" onclick='wuzhong("+i+")'>&nbsp;&nbsp;全部物种</a></td>"+
									"</tr>");
		    				}
		    			});
		    		}else{
		    			toastr["info"]("错误信息","无返回数据");
		    		}
				},
				onClickRow: function (row, $element) {
					$('.success').removeClass('success');
					$($element).addClass('success');
				},
				icons: {
					refresh: "glyphicon-repeat",
					toggle: "glyphicon-list-alt",
					columns: "glyphicon-list"
				}
			});
		}//else结束
	}else{
		toastr["info"]("未选择清单版本");
		return;
	}
}

/********************************************************点击行业操作子列事件*************************************************/
var flag = "";
function scc2(id){
	if(flag != id){
		$(".hhh"+flag).fadeOut("0");	//第一次无效隐藏
		$(".hhh"+id).fadeIn("0");		//显示
		flag = id;						//赋值id
	}else{
		$(".hhh"+id).fadeOut("0");	//隐藏
		flag ="";
	}
}
/*****************************************************点击全部物种填充模态框数据**********************************************/
function wuzhong(i){
	$("#wuzhong_Modal").modal({backdrop: 'static',keyboard: false});
	$("#bc").html((f_data[i].bc/10000).toFixed(2));
	$("#co").html((f_data[i].co/10000).toFixed(2));
	$("#nh3").html((f_data[i].nh3/10000).toFixed(2));
	$("#nox").html((f_data[i].nox/10000).toFixed(2));
	$("#oc").html((f_data[i].oc/10000).toFixed(2));
	$("#pm10").html(((f_data[i].pmcoarse+f_data[i].pm25)/10000).toFixed(2));
	$("#tsp").html((((f_data[i].pm25+f_data[i].pmcoarse+f_data[i].pm10more).toFixed(2))/10000).toFixed(2));
	$("#pm25").html((f_data[i].pm25/10000).toFixed(2));
	$("#so2").html((f_data[i].so2/10000).toFixed(2));
	$("#voc").html((f_data[i].voc/10000).toFixed(2));
	var data_sum=(f_data[i].bc+f_data[i].co+f_data[i].nh3+f_data[i].nox+f_data[i].oc+f_data[i].pmcoarse+f_data[i].pm25+f_data[i].pm25+f_data[i].pmcoarse+f_data[i].pm10more+f_data[i].pm25+f_data[i].so2+f_data[i].voc).toFixed(2);
	var data_line=(((f_data[i].co/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].oc/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].bc/data_sum).toFixed(2))*100).toFixed(0)+","+
				  ((((f_data[i].pm25+f_data[i].pmcoarse+f_data[i].pm10more)/data_sum).toFixed(2))*100).toFixed(0)+","+
				  ((((f_data[i].pmcoarse+f_data[i].pm25)/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].nh3/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].voc/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].pm25/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].nox/data_sum).toFixed(2))*100).toFixed(0)+","+
				  (((f_data[i].so2/data_sum).toFixed(2))*100).toFixed(0);
	var data_line_arr=data_line.split(",");
	var qdName_select1=$("#qdName_select option:selected").text();	//获取当前选择的文本值
	var qdName_select1_arr=qdName_select1.split("-")[0];			//获取当前选择的年份
	if(f_data[i].scc1==null){
		$("#qbwz_name").text(qdName_select1_arr+"年所有部门排放源");
	}else if(f_data[i].scc2=="所有"){
		$("#qbwz_name").text(qdName_select1_arr+"年"+f_data[i].scc1);
	}else{
		$("#qbwz_name").text(qdName_select1_arr+"年"+f_data[i].scc1+"-"+f_data[i].scc2);
	}
	lineChart = echarts.init(document.getElementById("qbwz_echarts"), 'macarons');	//获取div块的dom节点对象
	lineChart.setOption({	
        title : {					//标题组件
            	text: '',			//标题名称
                subtext: ''
        },
        tooltip : {					//触发类型
            	trigger: 'axis',	//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            	axisPointer: {
                    type: 'shadow'
                }
        },
        legend: {					//图例组件
            data:['','']			//图例名称
        },
        grid:{						//直角坐标系网格
        	top:'8%',
            left: '2%',
            right: '12%',
            bottom: '10%',
//            height: '80%',		//设置grid 组件的高度。默认自适应。
            containLabel: true
        },
        xAxis : [
            {
            type: 'value',
            name:'物种比例',
            max :'100',
            nameGap:5,
            }
        ],
        yAxis : [
            {	
            type: '',
            data: ['CO','OC','BC','TSP','PM10','NH3','VOC','PM2.5','NOx','SO2'],
            name:'物种名称',
            nameGap:10,
            }
        ],
        series : [
            {	
            	name: qdName_select1_arr,
                type: 'bar',
            	data: data_line_arr
            },
        ]
    })
}
//查看形式
function confirm(){
	$("#cknr_Modal").modal('toggle');
	if($("#show_version>input:checked").val()=="p"){
		bar ();
	}
}
//内容形式（行业、地区）
function spec_change(){
	if($("#show_version>input:checked").val()=="p"){
		bar ();
	}
}
//查看形式，确定按钮
function create(){
	$("#ckxs_Modal").modal('toggle');
	var c = $("#show_version>input:checked").val();
	if(c=="p"){
		$(".biaoge").hide();
		$(".tu").show();
		bar ();
	}else if(c=="t"){
		$(".biaoge").show();
		$(".tu").hide();
	}else{
//		toastr["info"]("无清单数据");
	}
}
var bookids=[];
var myChart;
//柱状图
function bar () {
	$("#bar").html("");
	$("#pie1").html("");
	$("#pie2").html("");
	var sign = $("#show_version1>input:checked").val();//查看形式
	bookids=[];
	bookids=$("#qdName_select").val();
	var spe=$("#spec>option:selected").val();//物种
	var regionId= parent.dataBase.Message_map.REGION;
	var data = ajax_async_t(BackstageIP+'showCountryList/scc1Chart', {bookIds:bookids,species:spe,regionId:regionId,sign:sign}, "json");
	if(data!=undefined&&data!=null&&data!=""){
		for(prop in	data.series){
			if(data.series.hasOwnProperty(prop)){
				data.series[prop].itemStyle={
	                normal: {
	                    barBorderRadius:0
	                 }
				};
			}
		}
		option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend:{ 
			    	data:data.legend
			    },
			    grid: {
			    	//x:'13%',
			    	//width:'80%',
			    	top: '12%',
		            left: '1%',
		            right: '10%',
		            containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data: data.xAxis,
						/*nameLocation:'middle',
						nameGap:30,
						max: "auto",*/
						axisLabel:{		
							interval:0,	//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
							margin:8,	
						},
			        }
			    ],
			    yAxis : [
			        {
			        	name:'吨',
			            type : 'value'
			        }
			    ],
			    series :
			    	data.series
			};
		if(bookids.length==1&&spe!=""){
			option.dataZoom={
				type: 'slider',
				show:'true',
				start:0,
				end:40
        	} 
		}
		$("#show_bar").show();
		myChart = echarts.init(document.getElementById("bar"), 'macarons');//声明id为1的div为图形dom
		myChart.setOption(option);
		myChart.on('click', function (params) {
			if(data.flag=="2.3")
			{
				pie(bookids,spe,params.seriesName+"-"+data.data[params.name],data.flag,regionId,sign,params.seriesName+"-"+params.name);
				show_table(bookids,spe,params.seriesName+"-"+data.data[params.name],data.flag,regionId,sign);
			}else{
				pie(bookids,spe,params.seriesName+"-"+params.name,data.flag,regionId,sign,params.name);
				show_table(bookids,spe,params.seriesName+"-"+params.name,data.flag,regionId,sign);
			}
		});
		if(data.flag=="2.3")
		{	
			pie(bookids,spe,data.series[0].name+"-"+data.data[data.xAxis[0]],data.flag,regionId,sign,data.series[0].name+"-"+data.xAxis[0]);
			show_table(bookids,spe,data.series[0].name+"-"+data.data[data.xAxis[0]],data.flag,regionId,sign,data.series[0].name+"-"+data.xAxis[0]);
		}
		else{
		 pie(bookids,spe,data.series[0].name+"-"+data.xAxis[0],data.flag,regionId,sign,data.xAxis[0]);
		 show_table(bookids,spe,data.series[0].name+"-"+data.xAxis[0],data.flag,regionId,sign,data.xAxis[0]);
		}
	}else{
		toastr["info"]("错误信息", "无返回数据");
	}
}
//第一个饼图
function pie(b,sp,k,f,r,sign,t) {
	var data = ajax_async_t(BackstageIP+'showCountryList/scc2OrScc3Chart', {bookIds:b,species:sp,key:k,flag:f,regionId:r,sign:sign}, "json");
	if(data!=undefined&&data!=null&&data!=""){
		var d = [];
		for (var prop in data.data){
			if(data.data.hasOwnProperty(prop))
				{
				d.push(prop);
				}
		}
		var s=[];
		var name=[];
		var snu=0;
		var ss="";
		for(var i=0;i<d.length;i++){
			for(var prop1 in data.data[d[i]]){
				if(data.data[d[i]].hasOwnProperty(prop1))
				{
						ss=data.data[d[i]][prop1];
						name.push(prop1);
						s[snu]={value:ss,name:prop1};
						snu++;
				}
			}
		}
		var title;
		if(f=="2.3"){
			title=t;
		}else{
			title=d;
		}
		if(s.length<1){
			if(f=="2.3")  return;//toastr["info"]("提示222",t+"暂无数据");
				
			else return;//toastr["info"]("提示111",k+"暂无数据");
				
		}
		option = {
			    title : {
			        text: title,
			        x:'center',
			        textStyle:{
			        	fontSize:14
			        }
			    },
			    tooltip : {
			    	position:[65,70],
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			    	padding:35,
			        orient: 'vertical',
			        x: 'left',
			        data: name
			    },
			    series : [
			        {
			            name: k.split("-")[0],
			            type: 'pie',
			            radius : '50%',
			            center: ['65%', '65%'],
			            data:s
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
		    pie2(bookids,sp,k+"-"+params.name,f,r,sign,t+params.name);
		    show_table(bookids,sp,k+"-"+params.name,f,r,sign);
		});
		myChart.setOption(option);
		 $("#show_pie2").show();
		 pie2(bookids,sp,k+"-"+name[0],f,r,sign,t+name[0]);
	}else{
		toastr["info"]("错误信息", "无返回数据");
		return;
	}
}
//第二个饼图
function pie2(b,sp,k,f,r,sign,t){
	var data = ajax_async_t(BackstageIP+'showCountryList/scc2OrScc3Chart', {bookIds:b,species:sp,key:k,flag:f,regionId:r,sign:sign}, "json");
	if(data!=undefined&&data!=null&&data!=""){
		var d = [];
		for (var prop in data.data){
			if(data.data.hasOwnProperty(prop))
				{
				d.push(prop);
				}
		}
		var s=[];
		var name=[];
		var snu=0;
		var ss="";
		for(var i=0;i<d.length;i++){
			for(var prop1 in data.data[d[i]]){
				if(data.data[d[i]].hasOwnProperty(prop1))
				{
						ss=data.data[d[i]][prop1];
						name.push(prop1);
						s[snu]={value:ss,name:prop1};
						snu++;
				}
			}
		}
		if(f=="2.3"){
			var title=t;
		}else{
			var title=d;
		}
		option = {
			    title : {
			        text: title,
			        x:'center',
			        textStyle:{
			        	fontSize:14
			        }
			    },
			    tooltip : {
			    	position:[65,70],
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			    	padding:35,
			    	x:'left',
			        orient: 'vertical',
			        data: name
			    },
			    series : [
			        {
//			            name: k.split("-")[2],
			        	name:"",
			            type: 'pie',
			            radius : '50%',
			            center: ['65%', '65%'],
			            data:s
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
		myChart = echarts.init(document.getElementById('pie2'),'macarons');
		myChart.on('click', function (params) {
		});
		myChart.setOption(option);
	}else{
		toastr["info"]("错误信息", "无返回数据");
		return;
	}
}
//清单展示图下面表格
function show_table(bookIds,species,key,flag,regionId,sign){
	$("#list_table1").html("");
	var data = ajax_async_t(BackstageIP+"showCountryList/selectChartTableList", {bookIds:bookIds,species:species,key:key,flag:flag,regionId:regionId,sign:sign,}, "json");
	if ( data != "" && data != null && data != undefined ) {
		$("#tab_List").show();
			var html = '';
			var total_scc3;
			$.each(data,function(i,item){
				if(i==0){
					total_scc3=item.scc3;
				}
				var sc3=((item.scc3/total_scc3)*100).toFixed(2)+"%";
				html += '<tr><td>'+item.bookName+'('+item.year+')'+'</td><td>'+item.region+'</td><td>'+item.scc1+'</td><td>'+item.scc2+'</td><td>'+item.companyNum+'</td><td>'+item.scc3+'</td><td>'+sc3+'</td></tr>';
			});
			$("#list_table1").html(html);
	} else {
		$("#tab_List").hide();
//		toastr["info"]("错误信息", "无返回数据");
	}
}