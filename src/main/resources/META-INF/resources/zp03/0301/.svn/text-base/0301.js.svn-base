jQuery.support.cors = true;
var department;
var taskId;
var	taskName="";
var	bigIndex="";
var	isPoint="";
var	ipId;
var	fileId;
var	fileName="";
var reCount_1="";
var	drop;
var	ef;
var	eta;
var	isOnline;
var online;
var	par;
var ps;
var species;
var ss;
var subId;
var Calculation_number=true;	//判断是否点击计算按钮
var jisuanrenwu_save_number=false;

var version = "1.0";
//调用父页面的全局变量
var dataBase = parent.dataBase;
/**
 * 
 * 说明：这是兼容10大类37小类的清单计算功能
 * 根据设置好的数据，不同的大类显示不同小类的名称作为查询条件，不同的sheet页有不同的查询条件，估计需要30种左右
 * 
 * 
 * 
 */

//sheet页的查询条件，不同的组合
var condition_sheet = [];
var drop = {};//选择文件后，数据分析所有的组合的下拉菜单
var par = "";//当前选择的所属行业大类

var sfscsh = true;//是否是初始化的表格
var sheet_public = "";//初始化时记录sheet页的名称
var tablepageSize = 10;//分页条数
var filter = {};//查询的条件
var sort = {};//排序的字段

var taskId = $("#taskId").val();//获取填报任务的值
var bigIndex = $("#bigIndex").find("option:selected").text();//获取排放源的值
var subId = $("#bigIndex").val();
var userId = dataBase.Login_map.SOLE;
var regionId = dataBase.Login_map.REGION;
var version = "1.0";
var jisuan_num = 0;//计算的控制系数，用于控制计算后端的地址
var myChart_1,myChart_2,myChart_3,myChart_4;//分析图变量
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
$(function(){
	var Request = new Object();
	Request = GetRequest();
	par = Request['pat'];
	department = Request['department'];
	taskId = Request['taskId'];
	taskName = Request['taskName'];
	bigIndex = Request['subSector'];
	isPoint = Request['isPoint'];
	ipId = Request['ipId'];
	fileId = Request['fileId'];
	fileName = Request['fileName'];
	reCount_1 = Request['reCount'];
	drop= Request['drop'];
	ef = Request['ef'];
	eta= Request['eta'];
	isOnline= Request['isOnline'];
	online= Request['online'];
//	par= Request['par'];
	ps= Request['ps'];
	species= Request['species'];
	ss= Request['ss'];
	subId= Request['subId'];
	if(reCount_1==1){	//如果为1，则是从排放版本管理中的重新计算按钮跳转进来的---执行以下代码
		var taskId_html = "";
			taskId_html += "<option value=\""+taskId+"\">"+taskName+"</option>";
		$("#taskId").html(taskId_html);		//填报任务赋值
		var bigIndex_html ="";
			bigIndex_html += "<option value=\""+subId+"\">"+bigIndex+"</option>";
		$("#bigIndex").html(bigIndex_html);	//排放源赋值
		var section_html="";
		section_html+="<option value='"+par+"'>"+department+"</option>";
		$("#paifangjisuanqu_select").html(section_html);
		var k = 0;
		if(isOnline=='true'){//单选
			$("#spot_0").html("<input id='isOnline' name='ps' type='checkbox' value='spot' /><label for='isOnline'>在线填报</label>");
			k++;
			if(online=="1"){
				$("#isOnline").prop("checked",true);
			}
		}
		var psId=parent.fu_psId;
		var ps=parent.fu_ps;
			for(var i=0;i<ps.length;i++){
				
				if( $.inArray(ps[i].value, psId) != "-1" ){
					$("#spot_"+k).html("<input id='spot_r"+k+"' name='ps' type='checkbox' houvalue='"+ps[i].name+"' value='"+ps[i].value+"' checked='checked'/><label for='spot_r"+k+"'>"+ps[i].name+"</label>");
					k++;
				}else{
					$("#spot_"+k).html("<input id='spot_r"+k+"' name='ps' type='checkbox' houvalue='"+ps[i].name+"' value='"+ps[i].value+"' /><label for='spot_r"+k+"'>"+ps[i].name+"</label>");
					k++;
				}
			}
			var ssId=parent.fu_ssId;
			var ss=parent.fu_ss;
			for(var i=0;i<ss.length;i++){
				if($.inArray(ss[i].value, ssId) != "-1"){
						$("#Noodles_"+i).html("<input id='Noodles_r"+i+"' name='ss' type='checkbox' houvalue='"+ss[i].name+"' value='"+ss[i].value+"' checked/><label for='Noodles_r"+i+"'>"+ss[i].name+"</label>");
					}else{
						$("#Noodles_"+i).html("<input id='Noodles_r"+i+"' name='ss' type='checkbox' houvalue='"+ss[i].name+"' value='"+ss[i].value+"'/><label for='Noodles_r"+i+"'>"+ss[i].name+"</label>");
				}
			}
		
		var ef_html = "";//一行一组单选
		var ef=parent.fu_ef;	//从0302.js中parent.fu_ef变量来获取数据
		$.each(ef,function(i,item){		
			ef_html += "<div class=\"radio radio-info radio-inline\"><input id='dr_r"+i+"' name='ef' type='radio' houvalue='"+item.name+"' value='"+item.value+"' /><label for='dr_r"+i+"'>"+item.name+"</label></div>";
		});
		$("#drain_system").html(ef_html);	//排放系数
		var eta_html = "";//一行一组单选
		var eta=parent.fu_eta;
		$.each(eta,function(i,item){
			eta_html += "<div class=\"radio radio-info radio-inline\"><input id='re_r"+i+"' name='eta' type='radio' houvalue='"+item.name+"' value='"+item.value+"' /><label for='re_r"+i+"'>"+item.name+"</label></div>";
		});
		$("#Removal_efficiency").html(eta_html);	//去除效率
		
		drop=parent.fu_drop;//下拉框内容，单独处理
		//更新数据分析菜单选项
		Initialization_Analysis_select();
		tiaojian();
		//TODO
		//jisuan_num++;//不管是什么计算，只要有计算，系统开始变化
		
		if(jisuan_num > 0){
			//出统计图
			for(var i=1; i<3; i++){
//				openPic(i);
			}
		}
			var species=parent.fu_species;	//获取全局变量species，parent.fu_species数据来自排放版本管理页面的排放结果
			//重新计算跳转后对排放结果的数据展示
			$("#so").html(species.SO2.toFixed(2));
			$("#no").html(species.NOx.toFixed(2));
			$("#pm").html(species.PM25.toFixed(2));
			$("#voc").html(species.VOC.toFixed(2));
			$("#nh").html(species.NH3.toFixed(2));
			$("#pm10").html((species.PM25+species.PMcoarse).toFixed(2));
			$("#tsp").html((species.PM25+species.PMcoarse+species.PM10more).toFixed(2));
			$("#bc").html(species.BC.toFixed(2));
			$("#oc").html(species.OC.toFixed(2));
			$("#co").html(species.CO.toFixed(2));
			
			//数据修正中数据源选取
			var ps = $('#v41 input[name="ps"]').filter(':checked').val();	//id为v41  数据源选取的4个数据
			var ss = $('#v41 input[name="ss"]').filter(':checked').val();
			
			if(ps != undefined){
				$("#ps_s").prop("disabled",false);	//数据修正--数据源  --jQuery 1.6之后attr()获取这些属性的返回值为Boolean类型：如果被选中(或禁用)就返回true，否则返回false。在jQuery 1.6及以后版本中，请使用prop()函数来设置或获取checked、selected、disabled等属性。
				$("#ps_ss").prop("disabled",false);
			}
			if(ss!= undefined){
				$("#ss_s").prop("disabled",false);
				$("#ss_ss").prop("disabled",false);
			}
			
			//数据源点源的选择
			$('#v41 input[name="ps"]').change(function(){
				jisuan_num = 0;//计算状态清零
			});
			
			//数据源面源的选择
			$("#v41 input[name='ss']").change(function(){
				jisuan_num = 0;//计算状态清零
			});
			
			//数据源排放系统的选择
			$("#v41 input[name='ef']").change(function(){
				jisuan_num = 0;//计算状态清零
			});
			
			//数据源去除效率的选择
			$("#v41 input[name='eta']").change(function(){
				jisuan_num = 0;//计算状态清零
			});
	}else{ 
	/**********************从排放计算区点击后--执行的内容************************/
		
	//第一个任务下拉菜单初始化
	Initialization_select_1();
	
	//第二个排放源下拉菜单初始化
	//Initialization_select_2();
	
	//填报任务触发事件
	$("#taskId").change(function(){
		$("#Analysis_up").empty();
		$("#Analysis_down").empty();
		$(".tab_data").empty();
		$(".tudiv").html("");
		$("#Data_correction").empty();
		$(".t1").text("");
		taskId = $("#taskId").val();
		subId = $("#bigIndex").val();
		clean_DataSource();//清理数据源内容
		
		
		$("#jisuanrenwu_save").hide();//重新选择任务后，保存按钮隐藏
		jisuan_num = 0;//计算状态清零
		for(var i=0;i<glodata.length;i++){
			if(glodata[i].id==taskId){
				var d=glodata[i].object;
				var html="";
				var html2="<option value=''></option>";
				var num=0;
				for(prop in d){
					if(num==0){
						for(var j=0;j<d[prop].length;j++){
							html2+="<option value=\""+d[prop][j].ID+"\">"+d[prop][j].SCC2+"</option>";
						}
					}
					html+="<option value=\""+pfy[prop]+"\">"+prop+"</option>";
					num++;
				}
				$("#paifangjisuanqu_select").html(html);
    			$("#bigIndex").html(html2);
			}
		}
		bigIndex = $("#bigIndex").find("option:selected").text();
		if(bigIndex)
			Initialization_DataSource();//获取数据源
	});
	
	//排放源触发事件
	$("#bigIndex").change(function(){
		$("#jisuanrenwu_save").hide();//重新选择任务后，保存按钮隐藏
		$("#jisuanrenwu_update").hide();
		if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
		clr();
		taskId = $("#taskId").val();
		bigIndex = $("#bigIndex").find("option:selected").text();
		subId = $("#bigIndex").val();
		clean_DataSource();//清理数据源内容
		if(subId)
			Initialization_DataSource();//获取数据源
		jisuan_num = 0;//计算状态清零
		tiaojian();
	});
	}	//else 结束
		//tiaojian();
	
});		//初始化结束

//数据修正的显隐控制
$("#correction_show").click(function(){
	$(".tabs-left").each(function(){
		$(this).toggle();
	});
});

//计算按钮
$("#Calculation").click(function(){
	$("#v42 input[name='correction_source']").prop("disabled",true);
	var ps =[]; 
	$('#v41 input[name="ps"]:checked').each(function(){ 
		ps.push(""+$(this).val()+""); 
	});
	var ss =[];
	$('#v41 input[name="ss"]:checked').each(function(){ss.push(""+$(this).val()+"")})
	if ( ps.length <= 0 &&  ss.length <= 0) return toastr["info"]("提示", "请选择数据源");
//	var ps = $('#v41 input[name="ps"]').filter(':checked').val();
//	var ss = $('#v41 input[name="ss"]').filter(':checked').val();
	
	
	var ef = $('#v41 input[name="ef"]').filter(':checked').val();
	var eta = $('#v41 input[name="eta"]').filter(':checked').val();
	if(reCount_1==1){
		if(typeof ps != "undefined"){//没有选择点源
			$("#v42 input[name='correction_source'][value='p']").prop("disabled",false);
			$("#ps_ss").prop("disabled",false);
		}
		
		if(typeof ss != "undefined"){
			$("#v42 input[name='correction_source'][value='s']").prop("disabled",false);
			$("#ss_ss").prop("disabled",false);
		}
		
		if(typeof ef != "undefined"){
			//数据修正部分的默认排放系数与默认去除效率两个选项一直关闭，需要打开的时候，打开两行注释即可
		}
		
		if(typeof eta != "undefined"){
		}
		
		$("#zhezhao").show();//计算中
		$("#zhezhao_title").show();
		console.log(ps);
		if(jisuan_num > 0){//计算系数有值，说明在本次条件下，已经计算过，走的方法是重新计算
			Calculation_re_result(ps, ss, ef, eta);//后端计算，并获取计算结果
		}else{
			Calculation_result(ps, ss, ef, eta);//后端计算，并获取计算结果
			$("#Data_correction").html("");
			$("#v42 input[name='correction_source']").attr("checked",false);
		}
	
		//两种判断条件，一种是四项数据源必须选中，另一种是任意选中一个即可
//		if( ps.length >0 && ss.length>0 && $('input[name="ef"]:checked').val() != undefined && $('input[name="eta"]:checked').val() != undefined ){}else{
//				toastr["info"]("提示", "请选择数据源");
//			}
				
	}else{
		if ( ps.length > 0 ) {
			$("#v42 input[name='correction_source'][value='p']").prop("disabled",false);
			$("#ps_ss").prop("disabled",false);
		} else {
			$("#ss_ss").prop("checked",true);
		}
		if ( ss.lenth > 0 ) {
			$("#v42 input[name='correction_source'][value='s']").prop("disabled",false);
			$("#ss_ss").prop("disabled",false);
		} else {
			$("#ps_ss").prop("checked",true);
		}
		if(typeof ef != "undefined"){
			//数据修正部分的默认排放系数与默认去除效率两个选项一直关闭，需要打开的时候，打开两行注释即可
		}
		
		if(typeof eta != "undefined"){
		}
		console.log(ps)
		$("#zhezhao").show();//计算中
		$("#zhezhao_title").show();
		if(jisuan_num > 0){//计算系数有值，说明在本次条件下，已经计算过，走的方法是重新计算
			Calculation_re_result(ps, ss, ef, eta);//后端计算，并获取计算结果
		}else{
			Calculation_result(ps, ss, ef, eta);//后端计算，并获取计算结果
			$("#Data_correction").html("");
			$("#v42 input[name='correction_source']").attr("checked",false);
		}
		//两种判断条件，一种是四项数据源必须选中，另一种是任意选中一个即可
//		if( ps.length >0 && ss.length>0 && $('input[name="ef"]:checked').val() != undefined && $('input[name="eta"]:checked').val() != undefined ){} else {
//			if(parent.fu_reCount!=1){
//				toastr["info"]("提示", "请选择数据源");
//			}else{
//				//什么也不用干
//			}
//		
//		}
		Initialization_Analysis_select();
	 }
	});

//数据分析--重新加载分析图
$("#Data_analysis_butt").click(function(){
	for(var i=1; i<3; i++){
		openPic(i);
	}
	$("#sjfx_modal").modal({backdrop: 'static',keyboard: false});
	 
	
});

//数据分析，选择分析指标触发更换统计图
$("#Analysis_index").change(function(){
	Initialization_Analysis_select();
	if(jisuan_num > 0){
		//出统计图
		for(var i=1; i<3; i++){
			openPic(i);
		}
	}
});
//数据分析，切换数据源触发更换统计图
$('#qyzt_2 input[name="Analysis_source"]').change(function(){
	Initialization_Analysis_select();
	if(jisuan_num > 0){
		//出统计图
		for(var i=1; i<3; i++){
			openPic(i);
		}
	}
});

//计算任务的保存
$("#jisuanrenwu_save").click(function(){
	$("#qingdan_save").modal();
	return;
	if(Calculation_number==true){
	$.ajax({  		       
	    url: BackstageIP+"calc/save/list",
	    type: "POST",
	    //async:true,
	    async: false,
	    dataType: "json",
	    data: {
	    	regionId:regionId,
	    	subSector:$("#bigIndex option:selected").text(),
	    	version:version,
	    	userId:userId
		},
	    success: function (data) {
	    	if(data != null && data !=undefined){
				if(data.status == "success"){
					var html = "";
					for(var i=0; i<data.data.length; i++){
						html += '<tr><td><div class="radio radio-info radio-inline">';
						html += '<input type="radio" id="list'+i+'" value="'+data.data[i].id+'" name="listid"/><label for="list'+i+'"></label>';
						html += '</div></td>';
						//html += "<td>"+parseInt(i+1)+"</td>";
						html += "<td>"+data.data[i].name+"</td>";
						html += "<td>"+data.data[i].ds+"</td></tr>";
					}
					$("#uplist").html(html);
				}else{
					
				}
			}
	    },
	    error: function (ret) { 
	    	
	    }  
	});
	$("#qingdan_save").modal();
}else{
	toastr["info"]("提示", "数据未发生变化");
}
});
//ip_Id = parent.fu_ipId;
var ip_Id ;
//清单真的保存起来
$("#jisuan_zhende_save").click(function(){
	var save_type = "";
	if(reCount_1==1){	//判断点击进入的入口
		var jisuanrenwu_save=$("#jisuanrenwu_save").text();
		if(jisuanrenwu_save=="另存"){
			ip_Id ="";
		}else{
			ip_Id = parent.fu_ipId;
			save_type = "reCount";
		}
		
	}else{
		save_type = "";
		if ( ip_Id == null || ip_Id == undefined ) {
			ip_Id = "";
		}
	}
	if(lookatlist() == "0"){
		if($("#qingdan_name").val() == ""|| typeof $("#qingdan_name").val() == "undefined"){
			toastr["info"]("提示", "清单名称必须填写");
			return false;
		}else if(!testmc($("#qingdan_name").val())){
			toastr["info"]("提示", "清单名称只能填写汉字、英文字母、数字和下划线");
			return false;
		}else{
			var mingcheng = $("#qingdan_name").val();
		}
		//清单描述不用验证
		if($("#qingdan_miaoshu").val()=='自主编制'){
			var miaoshu = $("#qingdan_miaoshu").val();
		}else {
			if($("#qingdan_miaoshu").val() == ""|| typeof $("#qingdan_miaoshu").val() == "undefined"){
				var miaoshu = '自主编制';
			}else{
				toastr["info"]("提示", "清单描述填写格式不正确");
				$("#qingdan_miaoshu").val('');
				return false;
			}
		}
		
		$.ajax({
		    url: BackstageIP+"calc/save",
		    type: "POST",
		    async:false,
		    dataType: "json",
		    data: {
				taskId:taskId,
				userId:userId,
				version:version,
				subSector:$("#bigIndex option:selected").text(),
				name:mingcheng,
				ds:miaoshu,
				regionId:regionId,
				ipId:ip_Id,
				type : save_type
			},
		    success: function (data) {
		    	if(data != null && data !=undefined && data!=null){
					if(data.status=="success"){
						jisuanrenwu_save_number=true;
						toastr["success"]("提示", "保存成功");
						$("#qingdan_name").val("");
						$("#qingdan_miaoshu").val("");
						$("input[type='listid']").removeAttr('checked');
						$("#jisuan_close").click();//弹出框关闭
						parent.resush('iframe6');
						$("#jisuanrenwu_update").show();
						ip_Id = data.data;
						ipId = data.data; 
						
					} else if ( data.status == "fail" ) {
						jisuanrenwu_save_number=false;
						toastr["info"]("提示",data.code);
					}else{
						jisuanrenwu_save_number=false;
						toastr["info"]("提示", "服务器异常或未查询到数据");
					}
				}
		    },
		    error: function (ret) { 
		    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
		    }  
		});
	}else{
		$.ajax({  		       
		    url: BackstageIP+"calc/save",
		    type: "POST",
		    async:true,
		    dataType: "json",
		    data: {
				taskId:taskId,
				userId:userId,
				version:version,
				subSector:$("#bigIndex option:selected").text(),
				ipId:$('input[name="listid"]').filter(':checked').val(),
				regionId:regionId,
				ipId:ip_Id,
			},
		    success: function (data) {
		    	if(data != null && data !=undefined && data!=null){
					if(data.status="success"){
						jisuanrenwu_save_number=true;
						toastr["success"]("提示", "覆盖清单任务成功");
						$("#qingdan_name").val("");
						$("#qingdan_miaoshu").val("");
						$("input[type='listid']").removeAttr('checked');
						$("#jisuan_close").click();//弹出框关闭  这里没有末路，你从不曾孤独 
					}else{
						jisuanrenwu_save_number=false;
						toastr["erroe"]("错误信息", JSON.stringify(data));
					}
				}
		    },
		    error: function (ret) { 
		    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
		    }  
		});
	}
});

//数据修正里的数据源选择，当值发生变化时，重新加载下面显示数据的表格
$('#v42 input[name="correction_source"]').change(function(){
	correct_table($('input[name="correction_source"]').filter(':checked').val());//修正参数的表格处理
});

/**
 * 条件拼接
 * @param column:当前的sheet页名称
 * @param tab：当前操作组件的父级页签，用于定位
 * @param input_id：当前组件的id，也是field
 * @param type：区分数据来源，分为固定文本、固定下拉、自定义
 * @param name：当前组件的中文名称，用于组织条件页面显示
 */
function filter_coll(column, tab, input_id, type, name){
	var num = GetRandomNum(1,1000);
	var html = "";
	if(type == "gt"){//固定文本框
		var fil = {};
		fil[input_id] = "like,"+$("#"+tab+" #"+input_id).val();
		filter[column].push(fil);
		html += "<div class='tiaojian' id='tiaojian_"+input_id+num+"'><label>"+name+" 包含 "+$("#"+tab+" #"+input_id).val()+"</label>";
		html += "<em onclick=\"del_name('"+column+"','tiaojian_"+input_id+num+"','"+tab+"','"+input_id+"','like,"+$("#"+tab+" #"+input_id).val()+"');\"></em>";
		html += "</div>";
		
	}else if(type == "gl"){//固定下拉框
		var fil = {};
		fil[input_id] = "=,"+$("#"+tab+" #"+input_id).val();
		filter[column].push(fil);
		html += "<div class='tiaojian' id='tiaojian_"+input_id+num+"'><label>"+name+" 等于 "+$("#"+tab+" #"+input_id).val()+"</label>";
		html += "<em onclick=\"del_name('"+column+"','tiaojian_"+input_id+num+"','"+tab+"','"+input_id+"','=,"+$("#"+tab+" #"+input_id).val()+"');\"></em>";
		html += "</div>";
		
	}else if(type == "z"){//自定义
		var cha = $("#"+tab+" #zidingyi_cha").val();
		var caozuo = $("#"+tab+" #zidingyi_caozuo").val();
		var neirong = $("#"+tab+" #zidingyi_neirong").val();
		var cha_name = $("#"+tab+" #zidingyi_cha").find("option:selected").text();
		if(cha != "" && caozuo != "" && neirong != ""){
			var fil = {};
			fil[cha] = caozuo+","+neirong;
			filter[column].push(fil);
			html += "<div class='tiaojian' id='tiaojian_"+input_id+num+"'><label>"+cha_name+" "+caozuo+" "+neirong+"</label>";
			html += "<em onclick=\"del_name('"+column+"','tiaojian_"+input_id+num+"','"+tab+"','"+cha+"','"+caozuo+","+neirong+"');\"></em>";
			html += "</div>";
		}
	}
	
	$("#"+tab+" #cha_jieguo").append(html);
}

/**
 * 删除查询条件
 * @param input_id：显示查询条件的ID
 * @param tab：父级页签，用于定位
 */
function del_name(column,input_id, tab, mingzi, zhi){
//	remove() - 删除被选元素（及其子元素）
//	empty() - 从被选元素中删除子元素
	var fill;
	$.each(filter[column], function(i, col) {
		if(col[mingzi] == zhi){
			fill = col;
		}
	});
	filter[column].splice($.inArray(fill, filter[column]), 1);//同时还要删除数组中的内容
	$("#"+tab+" #"+input_id).remove();
}

//数据筛选的查询按钮
function chaxun_sheet(tablename,url,sheet){
	$('#'+tablename).bootstrapTable('destroy');//销毁现有表格数据
	metTable_initialization(tablename,sheet_title[sheet],url,sheet);//重新初始化数据
}

//批量修改的保存
function save_sheet_p(column, tab, i){
	var cha = $("#"+tab+" #save_zhibiao").val();
	var neirong = $("#"+tab+" #save_neirong").val();
	var data1;
	if ( ipId == null || ipId == undefined ) {
		ipId = "";
	}
	data1={
			taskId:taskId,
			userId:userId,
			version:version,
			subSector:$("#bigIndex option:selected").text(),
			ipId:ipId,
			smallIndex:column,
			filter:JSON.stringify(filter[column]),
			param:cha,
			value:neirong
		};
	if(cha != "" && neirong != ""){
		var data = ajax_async_hou(BackstageIP+"calc/edit/multiple",data1,"json ","true");
		if(data != null && data !=undefined && data!=null){
			if(data.status="success"){
				$('#metTable'+i).bootstrapTable("refresh");
			}
		}
	}
}

//单元格精确保存数据
function dandu_save(dataId, param, value){
	var data1;
	if ( ipId == null || ipId == undefined ) ipId = "";
	
	data1={
			taskId:taskId,
			userId:userId,
			ipId:ipId,
			version:version,
			subSector:$("#bigIndex option:selected").text(),
			smallIndex:lookat(),
			dataId:dataId,
			param:param,
			value:value
		};
	var data = ajax_async_hou(BackstageIP+"calc/edit/single",data1,"json ","true");
	if(data != null && data !=undefined && data!=null){
		if(data.status="success"){
			toastr["success"]("提示", "保存成功");
		}else{
			toastr["erroe"]("错误信息", JSON.stringify(data));
		}
	}
}


//数据修正中精确修改的控制
function update_sheet_z(i){
	if($('#update_sheet'+i).html() == '<i class="fa fa-binoculars"></i> 精确修改'){
		$('#update_sheet'+i).html("<i class='fa fa-binoculars'></i> 结束修改</a>");
		$('#metTable'+i+' td A').show();
		$('#metTable'+i+' td span').hide();
		$('#tab-'+i+' .pull-right').hide(500);
	}else{
		$('#update_sheet'+i).html('<i class="fa fa-binoculars"></i> 精确修改</a>');
		$('#metTable'+i+' td A').hide();
		$('#metTable'+i+' td span').show();
		$('#tab-'+i+' .pull-right').show(500);
	}
}

var sheet_title;

//修正参数的表格处理
function correct_table(type){
	$("#zhezhao").show();	//计算中
	$("#zhezhao_title").show();
	sfscsh = true;			//开始初始化
	var county = ajax_async_t(BackstageIP+'dictionary/selectCountryByRegion',{region: dataBase.Login_map.REGION},"JSON","1");//获取当前登录用户的县级行政区划
	if(typeof bigIndex != "undefined"){
		//获取新的表头
		$.ajax({  		       
		    url: "../../getCalculationTemplate.do",
		    type: "POST",
		    async:true,
		    dataType: "JSON",
		    data: {Sector:par,Subsector:$("#bigIndex option:selected").text(),type:type},
		    success: function (data) {
		    	if(data != null && data !=undefined && data!=null){
					sheet_title = data;			//记录成全局内容，一会刷新表格的时候要用
					var head = data.head;		//页签，说明有几个sheet页
					var Data_correction = "";	//数据修正内部的html
					
					Data_correction +="<div class=\"tabs-container\">";
					
					//页签控制
					Data_correction += "<ul class=\"nav nav-tabs\" id=\"sheet_list\">";
					$.each(head, function(i, column) {
						var active = "";
						if(i == 0){
							active = "active";
						}
						
						filter[column] = [];	//每个页签一个查询条件的数据，这里必须初始化
						sort[column] = {};
						
						Data_correction += "<li class=\""+active+"\" quanming=\""+column+"\"><a data-toggle=\"tab\" href=\"#tab-"+i+"\" aria-expanded=\"true\"> ";
						Data_correction += "<i class=\"fa fa-file-o\"></i>"+column.substring(column.indexOf("_")+1,column.length)+"</a></li>";
					});
					Data_correction += "</ul>";
					
					//开始每个页签具体的内容
					Data_correction += "<div class=\"tab-content\">";
					
					$.each(head, function(i, column) {
						var active = "";
						if(i == 0){
							active = "active";
						}
						
						//先循环，确定筛选、排序、修改里面的内容都有什么
						var s_number = 0;		//记录有几个固定选择
						var guding_html = "";	//固定查询内容
						
						var zidingyi_array = [];//自定义查询内容
						var zidingyi_html = "";	//自定义查询
						
						var chaxun_html = "";	//整个查询部分的内容
						
						var update_array = [];	//修改的记录
						var update_html = "";	//修改的内容
						
						$.each(data[column], function(k, col) {	//循环sheet的表头，从每一行开始
							$.each(col, function(m, cell) {		//循环每一行的单元格
								if(typeof cell.Select != "undefined"){//等于空，既不是固定选择，也不是自定义选择
									if(cell.Select == "1"){		//固定选择
										
										guding_html += "<div class=\"col-sm-6\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\">";
										guding_html += "<span class=\"input-group-addon\" style=\"border: 1px solid #E5E6E7;\">"+cell.title+":</span>";
										if(cell.Op == "text"){//文本框
											guding_html += "<input type=\"text\" class=\"form-control\" onBlur=\"filter_coll('"+column+"','tab-"+i+"','"+cell.field+"','gt','"+cell.title+"');\" id=\""+cell.field+"\">";
										}else{//下拉框
											guding_html += "<select class=\"form-control m-b\" onChange=\"filter_coll('"+column+"','tab-"+i+"','"+cell.field+"','gl','"+cell.title+"');\" id=\""+cell.field+"\">";
											if(cell.field=="county"){//如果是县级行政区划，需要去后台获取
												guding_html += "<option></option>";
												$.each(county, function(w, coun) {
													guding_html += "<option value=\""+coun.value+"\">"+coun.text+"</option>";
												});
											}else{
												var val_arr = cell.list.split(",");
												guding_html += "<option></option>";
												$.each(val_arr, function(w, coun) {
													guding_html += "<option value=\""+coun+"\">"+coun+"</option>";
												});
											}
											guding_html += "</select>";
										}
										guding_html += "</div></div>";
										
										s_number++;
									}else if(cell.Select == "0"){//自定义选择
										zidingyi_array.push({"name":cell.title,"value":cell.field});//所有的自定义查询项进行记录
									}
									
									if(cell.Update == "1"){//等于1说明可以修改
										update_array.push({"name":cell.title,"value":cell.field});//所有的可修改项进行记录
									}
								}
							});
						});
						//一遍循环后，固定的内容已经组织好，修改和自定义的内容是在一个下拉里面，所以需要单独拼出html
						
						//自定义查询的内容
						var zidingyi_html = "";
						if(zidingyi_array.length > 0){//如果大于0，有自定义查询条件
							zidingyi_html += "<div class=\"col-sm-5\" style=\"padding-right: 5px;\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\">";
							zidingyi_html += "<span class=\"input-group-addon\" style=\"border: 1px solid #E5E6E7;\">指标:</span>";
							zidingyi_html += "<select class=\"form-control m-b\" onChange=\"filter_coll('"+column+"','tab-"+i+"','zidingyi_cha','z','');\" id=\"zidingyi_cha\">";
							zidingyi_html += "<option></option>";
							$.each(zidingyi_array, function(p, val) {
								zidingyi_html += "<option value=\""+val.value+"\">"+val.name+"</option>";
							});
							zidingyi_html += "</select></div></div>";
							zidingyi_html += "<div class=\"col-sm-3\" style=\"padding-right: 5px;padding-left: 5px;\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\">";
							zidingyi_html += "<span class=\"input-group-addon\" style=\"border: 1px solid #E5E6E7;\">关系:</span>";
							zidingyi_html += "<select class=\"form-control m-b\" onChange=\"filter_coll('"+column+"','tab-"+i+"','zidingyi_caozuo','z','');\" id=\"zidingyi_caozuo\">";
							zidingyi_html += "<option></option><option value=\"=\">等于</option><option value=\"like\">包含</option><option value=\">\">大于</option>";
							zidingyi_html += "<option value=\">=\">大于等于</option><option value=\"<\">小于</option><option value=\"<=\">小于等于</option>";
							zidingyi_html += "</select></div></div>";
							zidingyi_html += "<div class=\"col-sm-4\" style=\"padding-left: 5px;\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\">";
							zidingyi_html += "<span class=\"input-group-addon\" style=\"border: 1px solid #E5E6E7;\">内容:</span>";
							zidingyi_html += "<input type=\"text\" class=\"form-control\" onBlur=\"filter_coll('"+column+"','tab-"+i+"','zidingyi_neirong','z','');\" id=\"zidingyi_neirong\"></div></div>";
						}
						
						//读取完毕，继续拼接页面
						if(s_number == 0){//没有固定查询条件
							if(zidingyi_array.length == 0){//两种查询条件都没有
							}else{
								chaxun_html += zidingyi_html;
								chaxun_html += "<div class=\"col-sm-12\" id=\"cha_jieguo\"></div><div class=\"col-sm-6\" style=\"height: 34px;\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\"></div></div>";
								chaxun_html += "<div class=\"col-sm-6\" style=\"text-align:right;\">";
								chaxun_html += "<button type=\"button\" class=\"btn btn-outline btn-lG\" onclick=\"chaxun_sheet('metTable"+i+"','"+BackstageIP+"calc/subSector/show','"+column+"');\"><i class='fa fa-binoculars'></i> 查询</button></div>";
							}
						}else{
							if(zidingyi_array.length > 0){//如果大于0，有自定义查询条件
								chaxun_html += zidingyi_html;
							}
							chaxun_html += guding_html;
							chaxun_html += "<div class=\"col-sm-12\" id=\"cha_jieguo\"></div><div class=\"col-sm-6\" style=\"height: 34px;\">&nbsp;</div>";
							chaxun_html += "<div class=\"col-sm-6\" style=\"text-align:right;\">";
							chaxun_html += "<button type=\"button\" class=\"btn btn-outline btn-lG\" onclick=\"chaxun_sheet('metTable"+i+"','"+BackstageIP+"calc/subSector/show','"+column+"');\"><i class='fa fa-binoculars'></i> 查询</button></div>";
						}
						//查询组合完毕
						
						//修改功能
						var update_active = "";
						if(chaxun_html == ""){//如果查询为空，需要默认修改
							update_active = "active";
						}
						update_html += "<div id=\"tab-"+i+"-3\" class=\"tab-pane "+update_active+"\"><div class=\"panel-body\" style=\"width: calc(100% - 100px);margin-left: 100px;\">";
						update_html += "<div class=\"col-sm-5\" style=\"padding-right: 5px;\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\">";
						update_html += "<span class=\"input-group-addon\" style=\"border: 1px solid #E5E6E7;\">指标:</span>";
						update_html += "<select class=\"form-control m-b\" id=\"save_zhibiao\">";
						update_html += "<option></option>";
						$.each(update_array, function(p, val) {
							update_html += "<option value=\""+val.value+"\">"+val.name+"</option>";
						});
						update_html += "</select></div></div>";
						update_html += "<div class=\"col-sm-4\" style=\"padding-left: 5px;\"><div class=\"input-group m-b\" style=\"margin-bottom: 5px\">";
						update_html += "<span class=\"input-group-addon\" style=\"border: 1px solid #E5E6E7;\">修改为:</span>";
						update_html += "<input type=\"text\" class=\"form-control\" id=\"save_neirong\">";
						update_html += "</div></div>";
						update_html += "<div class=\"col-sm-3\" style=\"text-align:right;\">";
						update_html += "<button type=\"button\" class=\"btn btn-outline btn-lG\" onclick=\"save_sheet_p('"+column+"','tab-"+i+"','"+i+"');\"><i class='fa fa-binoculars'></i> 批量保存</button></div>";
						update_html += "<div class=\"col-sm-6\">&nbsp;</div>";
						update_html += "<div class=\"col-sm-6\" style=\"text-align:right;\">";
						update_html += "<button type=\"button\" class=\"btn btn-outline btn-lG\" id=\"update_sheet"+i+"\" onclick=\"update_sheet_z('"+i+"');\"><i class='fa fa-binoculars'></i> 精确修改</button></div>";
						update_html += "</div></div>";
						
						Data_correction += "<div id=\"tab-"+i+"\" class=\"tab-pane "+active+"\"><div class=\"panel-body\" style=\"padding: 0px 10px 10px;\">";
						Data_correction += "<div class=\"tabs-container\" style=\"padding: 0px  0px;\">";
						Data_correction += "<div class=\"tabs-left\" style=\"display:none;\">";
						Data_correction += "<ul class=\"nav nav-tabs\" style=\"width: 100px;\">";
						if(chaxun_html != ""){
							Data_correction += "<li class=\"active\"><a data-toggle=\"tab\" href=\"#tab-"+i+"-1\"> <i class=\"fa fa-search\"></i>筛选</a></li>";
						}
						Data_correction += "<li class=\""+update_active+"\"><a data-toggle=\"tab\" href=\"#tab-"+i+"-3\"> <i class=\"fa fa-pencil-square-o\"></i>修改</a></li>";
						
						Data_correction += "</ul>";
						Data_correction += "<div class=\"tab-content \">";
						
						if(chaxun_html != ""){
							Data_correction += "<div id=\"tab-"+i+"-1\" class=\"tab-pane active\">";
							Data_correction += "<div class=\"panel-body\" style=\"width: calc(100% - 100px);margin-left: 100px;\">";
							Data_correction += chaxun_html;
							Data_correction += "</div></div>";
						}
						Data_correction += update_html;
						
						
						Data_correction += "</div></div></div><br>";
						
						Data_correction += "<table id='metTable"+i+"'></table></div></div>";
					});
					
					//出循环两个结束，内容结束和整体结束
					Data_correction += "</div></div>";
					$("#Data_correction").html(Data_correction);
					
					//以上为查询条件
					
					//下面开始出表格
					$.each(head, function(i, column) {
						metTable_initialization("metTable"+i, data[column], BackstageIP+"calc/subSector/show", column);
						
					});
					sfscsh = false;//初始化结束
				}else{
					toastr["info"]("错误信息", "获取结构失败");
				}
		    	$("#zhezhao").hide();//计算中
		    	$("#zhezhao_title").hide();
		    },
		    error: function (ret) { 
		    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
		    	setTimeout(function(){
		    		$("#zhezhao").hide();//计算中
			    	$("#zhezhao_title").hide();
		    	}, 1000);
		    }  
		});
		
	}else{
		toastr["info"]("错误信息", "必须选择行业");
	}

}

//后端计算，并获取计算结果
function Calculation_result(ps, ss, ef, eta){
	Calculation_number=true;
	var isOnline_data = "false";
	if($.inArray("spot", ps) != "-1"){
		isOnline_data = "true";
		ps.splice(0,1);
	}
	console.log(ps)
	var value = {"ps":ps,"ss":ss,"ef":ef,"eta":eta,"isOnline":isOnline_data};
	var data1;
	if( ipId == null || ipId == undefined ) {
		ipId = "";
	} 
	data1= {taskId:taskId,userId:userId,value:JSON.stringify(value),subSector:$("#bigIndex option:selected").text(),version:version,ipId:ipId};
	$.ajax({  		       
	    url: BackstageIP+"calc/subSector/compute",
	    type: "POST",
	    async: true,
	    traditional : true,
	    dataType: "json",
	    data: data1,
	    success: function (data) {
	    	if(data != null && data !=undefined && data!=null){
	    		if(data.status == "success"){
	    			if(JSON.stringify(data.data.species) == "{}"){ 
	    				$("#zhezhao").hide();//计算中
	    		    	$("#zhezhao_title").hide();
	    				return toastr["info"]("提示", "返回species为空");
	    			}
	    			$("#so").html(data.data.species.SO2.toFixed(2));
	    			$("#no").html(data.data.species.NOx.toFixed(2));
	    			$("#pm").html(data.data.species.PM25.toFixed(2));
	    			$("#voc").html(data.data.species.VOC.toFixed(2));
	    			$("#nh").html(data.data.species.NH3.toFixed(2));
	    			$("#pm10").html((data.data.species.PM25+data.data.species.PMcoarse).toFixed(2));
	    			$("#tsp").html((data.data.species.PM25+data.data.species.PMcoarse+data.data.species.PM10more).toFixed(2));
	    			$("#bc").html(data.data.species.BC.toFixed(2));
	    			$("#oc").html(data.data.species.OC.toFixed(2));
	    			$("#co").html(data.data.species.CO.toFixed(2));
	    			
	    			if(reCount_1==1){
		    			$("#jisuanrenwu_save").show();		//计算成功后，保存按钮打开
		    			$("#jisuanrenwu_update").show();	//计算成功后,更新按钮打开
	    			}else{
	    				$("#jisuanrenwu_save").show();		//计算成功后，保存按钮打开
	    			}
//	    			$("#jisuanrenwu_save").show();		//计算成功后，保存按钮打开
	    			jisuan_num++;						//不管是什么计算，只要有计算，系统开始变化
	    			
	    			//出统计图
	    			for(var i=1; i<3; i++){
//	    				openPic(i);
	    			}
	    		}else{
	    			toastr["info"]("错误信息", JSON.stringify(data));
	    		}
	    	}else{
	    		toastr["info"]("提示", "暂无数据");
	    	}
	    	$("#zhezhao").hide();//计算中
	    	$("#zhezhao_title").hide();
	    },
	    error: function (ret) { 
	    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
	    	setTimeout(function(){
	    		$("#zhezhao").hide();//计算中
		    	$("#zhezhao_title").hide();
	    	}, 1000);
	    }  
	});
}

//数据分析
function Calculation_re_result(ps, ss, ef, eta){
	Calculation_number=true;
	var isOnline_data = "false";
	if(ps == "spot"){
		isOnline_data = "true";
		ps.splice(0, 1);
	}
	var ip_id="";
	if(reCount_1 == undefined || reCount_1 == "" || reCount_1 == null){
		//什么也没有
	}else{
		ip_id = parent.fu_ipId;
	}
	var value = {"ps":ps,"ss":ss,"ef":ef,"eta":eta,"isOnline":isOnline_data};
	var data1;
	if(ipId == null || ipId ==undefined ) {
		ipId = "";
	}
	data1={taskId:taskId,userId:userId,value:JSON.stringify(value),subSector:$("#bigIndex option:selected").text(),version:version,ipId:ipId};
	$.ajax({  		       
	    url: BackstageIP+"calc/subSector/recompute",
	    type: "POST",
	    async: true,
	    dataType: "json",
	    data: data1,
	    success: function (data) {
	    	if(data != null && data !=undefined && data!=null){
	    		if(data.status="success"){
	    			$("#so").html(data.data.species.SO2.toFixed(2));
	    			$("#no").html(data.data.species.NOx.toFixed(2));
	    			$("#pm").html(data.data.species.PM25.toFixed(2));
	    			$("#voc").html(data.data.species.VOC.toFixed(2));
	    			$("#nh").html(data.data.species.NH3.toFixed(2));
	    			$("#pm10").html((data.data.species.PM25+data.data.species.PMcoarse).toFixed(2));
	    			$("#tsp").html((data.data.species.PM25+data.data.species.PMcoarse+data.data.species.PM10more).toFixed(2));
	    			$("#bc").html(data.data.species.BC.toFixed(2));
	    			$("#oc").html(data.data.species.OC.toFixed(2));
	    			$("#co").html(data.data.species.CO.toFixed(2));
	    			
	    			if(reCount_1==1){
	    				$("#jisuanrenwu_save").show();		//计算成功后，保存按钮打开
		    			$("#jisuanrenwu_update").show();
	    			}else{
	    				$("#cover").hide();
	    				$("#jisuanrenwu_save").show();//计算成功后，保存按钮打开
	    			}
	    			
	    			$("#jisuanrenwu_save").show();//计算成功后，保存按钮打开
	    			jisuan_num++;//不管是什么计算，只要有计算，系统开始变化
	    			
	    			//出统计图
	    			for(var i=1; i<3; i++){
//	    				openPic(i);
	    			}
	    			sj_openPic('3');
	    			sj_openPic('4');
	    		}else{
	    			toastr["info"]("错误信息", JSON.stringify(data));
	    		}
	    	}else{
	    		toastr["info"]("提示", "暂无数据");
	    	}
	    	$("#zhezhao").hide();//计算中
	    	$("#zhezhao_title").hide();
	    },
	    error: function (ret) { 
	    	setTimeout(function(){
	    		$("#zhezhao").hide();//计算中
		    	$("#zhezhao_title").hide();
	    	}, 1000);
	    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
	    }  
	});
}

//根据选择的填报任务与排放源，初始化计算需要的数据源
//这里获取到的参数，包含分析图的下拉菜单
function Initialization_DataSource(){
	if ( $("#bigIndex").val() == "" || $("#bigIndex").val() == null || $("#bigIndex").val() == undefined ) return;
	taskId=$("#taskId").val();
	bigIndex=$("#bigIndex").val();
	if(taskId != "" && bigIndex != ""&& bigIndex != undefined && bigIndex != null){
		$("#zhezhao").show();//计算中
    	$("#zhezhao_title").show();
		$.ajax({
		    url: BackstageIP+"calc/subSector/data",
		    type: "POST",
		    async: true,
		    dataType: "json",
		    data: {taskId:taskId,userId:userId,subSector:$("#bigIndex option:selected").text(),subId:$("#bigIndex").val(),version:version},
		    success: function (data) {
		    	if(data != null && data !=undefined && data!=null){
					var ps = data.data.ps;//点源
					var ss = data.data.ss;//面源
					var ef = data.data.ef;//排放系统
					var eta = data.data.eta;//去除效率
					var isOnline = data.data.isOnline;//是否在线
					
					var k = 0;
					if(isOnline){//单选
						$("#spot_0").html("<input id='isOnline' name='ps' type='checkbox' value='spot'/><label for='isOnline'>在线填报</label>");
						k++;
					}
					$.each(ps,function(i,item){//一个文本框一个文件，单选
						$("#spot_"+(i+k)).html("<input id='spot_r"+i+"' name='ps' type='checkbox' houvalue='"+item.name+"' value='"+item.value+"'/><label for='spot_r"+i+"'>"+item.name+"</label>");
					});
					$.each(ss,function(i,item){//一个文本框一个文件，单选
						$("#Noodles_"+i).html("<input id='Noodles_r"+i+"' name='ss' type='checkbox' houvalue='"+item.name+"' value='"+item.value+"'/><label for='Noodles_r"+i+"'>"+item.name+"</label>");
					});
					var ef_html = "";//一行一组单选
					$.each(ef,function(i,item){
						ef_html += "<div class=\"radio radio-info radio-inline\"><input id='dr_r"+i+"' name='ef' type='radio' houvalue='"+item.name+"' value='"+item.value+"'/><label for='dr_r"+i+"'>"+item.name+"</label></div>";
					});
					$("#drain_system").html(ef_html);
					var eta_html = "";//一行一组单选
					$.each(eta,function(i,item){
						eta_html += "<div class=\"radio radio-info radio-inline\"><input id='re_r"+i+"' name='eta' type='radio' houvalue='"+item.name+"' value='"+item.value+"'/><label for='re_r"+i+"'>"+item.name+"</label></div>";
					});
					$("#Removal_efficiency").html(eta_html);
					
					drop = data.data.drop;//下拉框内容，单独处理
					//更新数据分析菜单选项
					Initialization_Analysis_select();
					//TODO
					if(jisuan_num > 0){
						//出统计图
						for(var i=1; i<3; i++){
//							openPic(i);
						}
					}
					//数据源点源的选择
					$('#v41 input[name="ps"]').change(function(){
						jisuan_num = 0;//计算状态清零
					});
					
					//数据源面源的选择
					$("#v41 input[name='ss']").change(function(){
						jisuan_num = 0;//计算状态清零
					});
					
					//数据源排放系统的选择
					$("#v41 input[name='ef']").change(function(){
						jisuan_num = 0;//计算状态清零
					});
					
					//数据源去除效率的选择
					$("#v41 input[name='eta']").change(function(){
						jisuan_num = 0;//计算状态清零
					});
					
				}else{
					toastr["info"]("提示", "暂无数据");
				}
		    	setTimeout(function(){
		    		$("#zhezhao").hide();//计算中
			    	$("#zhezhao_title").hide();
		    	}, 1000);
		    },
		    error: function (ret) { 
		    	setTimeout(function(){
		    		$("#zhezhao").hide();//计算中
			    	$("#zhezhao_title").hide();
		    	}, 1000);
		    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
		    }  
		});
	}else{
		//没选中值，暂不用处理
		toastr["info"]("提示", "请选择排放源");
	}
}

//初始化数据分析菜单选项
function Initialization_Analysis_select(){
	$("#Analysis_up").html("");
	$("#Analysis_down").html("");
	
	var Analysis_index = $("#Analysis_index").val();//数据分析--分析指标的值
	var Analysis_source = $('input[name="Analysis_source"]').filter(':checked').val();//数据分析--数据源--点源或者面源
	var shang = [];
	var xia= [];
	
	if(Analysis_index == "active"){//活动水平
		if(Analysis_source == "1"){//点源
			shang = drop.active.ps.up;
			xia = drop.active.ps.down;
		}else if(Analysis_source == "2"){//面源
			shang = drop.active.ss.up;
			xia = drop.active.ss.down;
		}
	}else if(Analysis_index == "ef"){//排放因子
		if(Analysis_source == "1"){//点源
			shang = drop.ef.ps.up;
			xia = drop.ef.ps.down;
		}else if(Analysis_source == "2"){//面源
			shang = drop.ef.ss.up;
			xia = drop.ef.ss.down;
		}
	}else if(Analysis_index == "eta"){//去除效率
		if(Analysis_source == "1"){//点源
			shang = drop.eta.ps.up;
			xia = drop.eta.ps.down;
		}else if(Analysis_source == "2"){//面源
			shang = drop.eta.ss.up;
			xia = drop.eta.ss.down;
		}
	}
	var shang_html = "";
	$.each(shang,function(i,item){
		shang_html += "<option value=\""+item.value+"\">"+item.name+"</option>";
	});
	$("#Analysis_up").html(shang_html);
	var xia_html = "";
	$.each(xia,function(i,item){
		xia_html += "<option value=\""+item.value+"\">"+item.name+"</option>";
	});
	$("#Analysis_down").html(xia_html);
}

//分析图
function openPic(id){
	var value = "";
	if(id == "1"){
		//开启图形
		myChart_1 = echarts.init(document.getElementById("Pic_1"), 'macarons');//声明id为1的div为图形dom
		myChart_1.showLoading();
		value = $("#Analysis_up").val();
	}else if(id == "2"){
		//开启图形
		myChart_2 = echarts.init(document.getElementById("Pic_2"), 'macarons');//声明id为2的div为图形dom
		if($("#Analysis_down").val() != "" && $("#Analysis_down").val() != null ) {
			myChart_2.showLoading();
		}
		value = $("#Analysis_down").val();
	}else if(id == "3"){
		//开启图形
		myChart_3 = echarts.init(document.getElementById("Pic_3"), 'macarons');//声明id为3的div为图形dom
		myChart_3.showLoading();
		value = $("#sj_left").val();
	}else{
		//开启图形
		myChart_4 = echarts.init(document.getElementById("Pic_4"), 'macarons');//声明id为4的div为图形dom
		myChart_4.showLoading();
		value = $("#sj_right").val();
	}
	
	var sourceId = $('input[name="hy_name"]').filter(':checked').val();				//排放源id
	var status = $("input:checkbox[name='zt']:checked").map(function(index,elem) {	//状态
		return $(elem).val();
	}).get().join(',');
	var region = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {//地区
		return $(elem).val();
	}).get().join(',');
	
//	if(reCount_1==1){
//		ip_Id = parent.fu_ipId;
//	}else{
//		ip_Id ="";
//	}
	if( ipId == null || ipId == undefined ) {
		ipId = "";
	}
	
	if ( value == "" || value == null || value == undefined ) {
		return;
	}
	$.ajax({  		       
		url: BackstageIP+"analysis/calc/chart.do",
		type: "POST",
		async:true,
		dataType: "JSON",
		data: {
	    	regionId:regionId,
	    	subSector:$("#bigIndex option:selected").text(),
	    	version:version,
	    	userId:userId,
	    	value:value,
	    	ipId:ipId,
		},
		success: function (ret) {
			if(id=="1"){
				//开启图形
				myChart_1.hideLoading();
			}else if(id == "2"){
				myChart_2.hideLoading();
			}else if(id == "3"){
				myChart_3.hideLoading();
			}else{
				myChart_4.hideLoading();
			}
			
			var datas = ret;
			if(datas != undefined){
				if(datas.status=="success"){
					var data = datas.data;
					var option;
					var Xmax,Ymax;	//坐标轴的取值范围
					if(data.Xmax == "0"){
						Xmax = 'auto';
					}else{
						Xmax = data.Xmax;
					}
					if(data.Ymax == "0"){
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
									nameGap:70,
									nameGap:Ymax>1?Ymax.toString().length*10:30,
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
					}else if(id=="2"){
						myChart_2.setOption(option);
					}else if(id=="3"){
						myChart_3.setOption(option);
					}else{
						myChart_4.setOption(option);
					}
				}
			}else{
				toastr["info"]("提示","数据库无返回值")
			}
		},
		error: function (e) { 
			toastr["info"]("错误信息","未连接服务器");
		}  
	});
}

//清理数据源
function clean_DataSource(){
	$("#v41 .radio-inline").html("");
	$("#drain_system").html("");
	$("#Removal_efficiency").html("");
}

//数据初始化
function metTable_initialization(tablename,columns,url,sheet){
	sheet_public = sheet;
	$('#'+tablename).bootstrapTable({
		method: 'POST',
		url: url,
		dataType: "json",
		columns: columns,		//列
		iconSize: "outline",
		clickToSelect: true,	//点击选中行
		pagination: true,		//在表格底部显示分页工具栏
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		},
		pageSize: tablepageSize,	//页面大小
		pageNumber: 1,				//页数
		striped: true,	 			//使表格带有条纹
		sidePagination: "server",	//表格分页的位置 client||server
		queryParams: queryParams1,	//参数
		queryParamsType: "limit", 	//参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  				//刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
//			row_sheetname = sheet;
		},
		onSort: function (name, order) {
			sort[sheet] = {};
			sort[sheet][name] = order;
		},
		onEditableSave: function (field, row, oldValue, $el){
			dandu_save(row.id, field, row[field]);	//保存方法
		}
	});
}

//配置参数
function queryParams1(params) {
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
//	temp.search = params.search;
	if(reCount_1==1){
		temp.ipId = parent.fu_ipId;
	}else{
		temp.ipId ="";
	}
	
	temp.taskId = taskId;	//任务id
	temp.userId = userId;
	temp.version = version;	//版本号
	temp.subSector = $("#bigIndex option:selected").text();
	if(sfscsh){				//如果处于初始化状态
		temp.smallIndex = sheet_public;	//sheet
	}else{
		temp.smallIndex = lookat();		//sheet
	}
	
	temp.filter = JSON.stringify(filter[temp.smallIndex]);
	temp.sort = JSON.stringify(sort[temp.smallIndex]);
	if( ipId == null || ipId == undefined ) {
		temp.ipId = "";
	} else {
		temp.ipId = ipId;
	}
	
	return temp;
}

//获取当前显示的是哪个页签
function lookat(){
	var sheet = "";
	$("#sheet_list").find("li").each(function(){
		if($(this)[0].className=="active"){
			sheet = $(this).attr("quanming");
			return false;
		}
	});
	return sheet;
}

//获取当前显示的是哪个页签--用于保存清单
function lookatlist(){
	var sheet = "";
	$("#tab_ul").find("li").each(function(){
		if($(this)[0].className=="active"){
			sheet = $(this).attr("quanming");
			return false;
		}
	});
	return sheet;
}

var glodata;
//第一个任务下拉菜单初始化
function Initialization_select_1(){
	$.ajax({  		       
	    url: BackstageIP+"taskDataFill/findPassed",
	    type: "POST",
	    async: true,
	    dataType: "json",
	    data: {userId:userId,version:version},
	    success: function (data) {
	    	if(data != null && data !=undefined && data!=null){
	    		if(data.status == "success"){
	    			glodata=data.data;
	    			var taskId_html = "";
	    			var html1="";
	    			var html2="<option value=''></option>";
	    			$.each(data.data,function(i,item){
	    				taskId_html += "<option value=\""+item.id+"\">"+item.name+"</option>";
	    				if(i==0){
	    					var d=item.object;
	    					var num=0;
	    					for(tem in d){
	    						if(num==0){
	    							for(var j=0;j<d[tem].length;j++){
	    								html2+="<option value=\""+d[tem][j].ID+"\">"+d[tem][j].SCC2+"</option>";
	    							}
	    						}
	    						html1+="<option value=\""+pfy[tem]+"\">"+tem+"</option>";
	    						num++;
	    					}
	    				}
	    				
	    			});
	    			$("#taskId").html(taskId_html);
	    			$("#paifangjisuanqu_select").html(html1);
	    			$("#bigIndex").html(html2);
	    			taskId = $("#taskId").val();
	    			//Initialization_DataSource();
	    		}
	    	}else{
	    		toastr["info"]("提示", "没有可供计算的任务");
	    	}
	    },
	    error: function (ret) { 
	    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
	    }
	});
}

//第二个排放源下拉菜单初始化
function Initialization_select_2(){
	var str=$("#paifangjisuanqu_select option:selected").text();
	for(var i=0;i<glodata.length;i++){
		if(glodata[i].id==taskId){
			var d=glodata[i].object;
			var html="<option value=''></option>";
			for(var j=0;j<d[str].length;j++){
				html+="<option value=\""+d[str][j].ID+"\">"+d[str][j].SCC2+"</option>";
			}
			$("#bigIndex").html(html);
		}
		
	}
	taskId = $("#taskId").val();
	bigIndex = $("#bigIndex").find("option:selected").text();
	par=str;
	/*par=$("#paifangjisuanqu_select").val();
	var html = "<option></option>";
	$.each(sj_data,function(i,item){
		if(par == item.id){
			$.each(item.value,function(k,colmn){
				html += "<option value=\""+colmn.id+"\">"+colmn.value+"</option>";
			});
			par = item.name;
		}
	});
	$("#bigIndex").html(html);*/
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

/**
 * 数据分析条件
 */
function tiaojian(){
	$.ajax({  		       
	    url: BackstageIP+"analysis/calc/config.do",
	    type: "POST",
	    async: true,
	    dataType: "json",
	    data: {sourceId:$("#bigIndex").val(),version:version},
	    success: function (data) {
	    	if(data != null && data !=undefined && data!=null){
	    		if(data.status == "success"){
	    			var html1 = '';
	    			var html2 = '';
	    			$.each(data.data.left,function(i,item){
	    				html1 += '<option value="'+item.value+'">'+item.name+'</option>'
	    			})
	    			$("#sj_left").html(html1);
	    			$.each(data.data.right,function(i,item){
	    				html2 += '<option value="'+item.value+'">'+item.name+'</option>'
	    			})
	    			$("#sj_right").html(html2);
	    			
	    			sj_openPic('3');
	    			sj_openPic('4');
	    		}
	    	}else{
	    		toastr["info"]("提示", "没有可供计算的任务");
	    	}
	    },
	    error: function (ret) { 
	    }
	});
}
//计算任务的排放版本管理的更新按钮
$("#jisuanrenwu_update").click(function(){
	if(Calculation_number==true){
		$("#qingdan_name_update").val(parent.fu_name);				//版本名称-数据回显
		$("#qingdan_miaoshu_update").val(parent.fu_description);	//版本描述-数据回显
		if ( ipId == null || ipId == undefined ) {
			ipId = "";
		}
		$.ajax({  		       
		    url: BackstageIP+"calc/update",
		    type: "POST",
		    //async:true,
		    async: false,
		    dataType: "json",
		    data: {
		    	regionId:regionId,
		    	subSector:$("#bigIndex option:selected").text(),
		    	version:version,
		    	ipId:ipId,
		    	userId:userId
			},
		    success: function (data) {
		    	
		    	if(data != null && data !=undefined){
					if(data.status == "success"){
						toastr.success("","保存成功");
						var html = "";
						for(var i=0; i<data.data.length; i++){
							html += '<tr><td><div class="radio radio-info radio-inline">';
							html += '<input type="radio" id="list'+i+'" value="'+data.data[i].id+'" name="listid"/><label for="list'+i+'"></label>';
							html += '</div></td>';
							//html += "<td>"+parseInt(i+1)+"</td>";
							html += "<td>"+data.data[i].name+"</td>";
							html += "<td>"+data.data[i].ds+"</td></tr>";
						}
						$("#uplist").html(html);
					}else{
						toastr["info"]("错误信息","保存失败!");
					}
				}
		    },
		    error: function (ret) { 
		    	
		    }  
		});
	}else{
		toastr["保存失败"]("错误信息","数据未发生变化!");
	}

	
});

//更新按钮--清单真的保存起来
$("#jisuan_zhende_update").click(function(){
	if(reCount_1==1){	//判断点击进入的入口
		var jisuanrenwu_save=$("#jisuanrenwu_update").text();
		if(jisuanrenwu_save=="保存"){
			ip_Id = parent.fu_ipId;
		}else{
			ip_Id ="";
		}
		
	}else{
		ip_Id ="";
	}
		$.ajax({  		       
		    url: BackstageIP+"calc/save",
		    type: "POST",
		    async:true,
		    dataType: "json",
		    data: {
				taskId:taskId,
				userId:userId,
				version:version,
				subSector:$("#bigIndex option:selected").text(),
				ipId:$('input[name="listid"]').filter(':checked').val(),
				regionId:regionId,
				ipId:ip_Id,
			},
		    success: function (data) {
		    	if(data != null && data !=undefined && data!=null){
					if(data.status="success"){
						toastr["success"]("提示", "覆盖清单任务成功");
						$("#qingdan_name").val("");
						$("#qingdan_miaoshu").val("");
						$("input[type='listid']").removeAttr('checked');
						$("#jisuan_close_update").click();//弹出框关闭
					}else{
						toastr["info"]("保存失败", JSON.stringify(data));
					}
				}
		    },
		    error: function (ret) { 
		    	toastr["info"]("错误信息", "服务器异常或未查询到数据");
		    }  
		});
	//}
});

//排放分析统计图
function sj_openPic(sj_id){
	if ( taskId == "" || taskId == null || taskId == undefined ) return toastr["info"]("暂无任务");
	var value = "";
	if(sj_id == "3"){
		//开启图形
		myChart_3 = echarts.init(document.getElementById("sj_Pic_3"), 'macarons');//声明id为3的div为图形dom
		myChart_3.showLoading();
		value = $("#sj_left").val();
	}else if (sj_id == "4"){
		//开启图形
		myChart_4 = echarts.init(document.getElementById("sj_Pic_4"), 'macarons');//声明id为4的div为图形dom
		myChart_4.showLoading();
		value = $("#sj_right").val();
	}
	if ( value == "" || value == "" || value == undefined ) {
		return;
	}
	var data1;
	if ( ipId == null || ipId ==undefined ) {
		ipId = "";
	}
	data1={createUserId:userId,
			sourceId : $("#bigIndex").val(),
			masterTaskId:$("#taskId").val(),//填报任务id
	    	version:version,
	    	value:value,
	    	ipId:ipId,
	    	subSector:$("#bigIndex").find("option:selected").text()
		}
	console.log(data1)
	$.ajax({  		       
		url: BackstageIP+"analysis/calc/analysis/chart",
		type: "POST",
		async:true,
		dataType: "JSON",
		data:data1,
		success: function (ret) {
			if(sj_id == "3"){
				myChart_3.hideLoading();
			}else{
				myChart_4.hideLoading();
			}
			
			var datas = ret;
			if(datas != undefined){
				if(datas.status=="success"){
					var data = datas.data;
					var option;
					var Xmax,Ymax;//坐标轴的取值范围
					if(data.Xmax == "0"){
						Xmax = 'auto';
					}else{
						Xmax = data.Xmax;
					}
					if(data.Ymax == "0"){
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
									axisLabel:{		//坐标轴文本标签选项
										interval:0,	//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:25,	//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,	//坐标轴文本标签与坐标轴的间距，默认为8，单位px
									},
								},
								yAxis: {
									axisLabel: {
										formatter: '{value}'
									},
									name:data.yAxis,
									nameLocation:'middle',
									nameGap:Ymax>1?Ymax.toString().length*9:40,
									nameTextStyle:{
										fontStyle:"normal",
										fontSize:"6"
									},
									max: Ymax,
									min: 0
								},
								series:series
						};
					}else if(data.type=="pie"){	//饼图
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
							            radius : '55%',
							            center: ['60%', '60%'],
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
					}else if(data.type=="point"){	//散点图
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
									nameGap:70,
									max: data.Xmax,
									min: 0,
									axisLabel:{		//坐标轴文本标签选项
										interval:0,	//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:25,	//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,	//坐标轴文本标签与坐标轴的间距，默认为8，单位px
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
					if ( sj_id == "3"){
						myChart_3.setOption(option);
					}else{
						myChart_4.setOption(option);
					}
				}
				$("#sj_Pic_3").show();
				$("#sj_Pic_4").show();
			}else{
				toastr["info"]("错误信息","数据库无返回值")
			}
		},
		error: function (e) { 
			toastr["info"]("错误信息","未连接服务器");
		}  
	});
}
//点击排放分析按钮
function  showDetail (){
	sj_openPic('3');
	sj_openPic('4');
}
function sjy_checked () {
	Initialization_Analysis_select();
	for(var i=1; i<3; i++){
//		openPic(i);
	}
}
function paifangjisuanqu_select(){
	$("#diqu_div").html("");
	clr();
	Initialization_select_2();
	Initialization_DataSource();
}
function clr(){
	$("#sj_left").empty();
	$("#sj_right").empty();
	$("#Analysis_up").empty();
	$("#Analysis_down").empty();
	$(".tab_data").empty();
	$(".tudiv").html("");
	$("#Data_correction").empty();
	$(".t1").text("");
}
//汉字，数字，字母，下划线
function testmc(value){
	var zh = /^[\u0391-\uFFE5\w]+$/;
	return zh.test(value);
}