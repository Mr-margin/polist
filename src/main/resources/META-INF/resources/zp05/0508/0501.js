jQuery.support.cors = true;
var dataBase = parent.dataBase;			//调用父页面的全局变量
var version = "1.0";					//版本
var userId = dataBase.Login_map.SOLE;	//userId,获取父页面的Login_map的SOLE的值
var regionId_1 = parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';	//region行政区划代码,行政区域获取父页面的Message_map的REGION的值
var metTable1 = $('#metTable1');		//获取表格
var zNodes;
/************************************初始化*************************************/
$(function(){
	findGroupByYearList();
	$("#qdxz_Modal").modal({backdrop: 'static',keyboard: false});  			//点击调用模态窗
	zNodes = ajax_async_t(BackstageIP+"showCountryList/treeRegion",{"":""},"json");
//	grid_tuli();
});
//配色
function  show_color (){
	layer.confirm('222', {
	title : '配色方案',
    btn: ['确定','取消'], //按钮
    area: ['320px', '600px'],
    shade: false, //不显示遮罩
    content:color_content
	}, function(){
//		show();
    layer.msg("配色成功", {icon: 1});
	}, function(){
    layer.msg('取消', {shift: 6});
	});
    $(".colorpicker-demo2").colorpicker(),
    e()
}

/**
 * 查看形式
 */
function shape () {
	zdy_type = "0";
	common();
	$("#show_shape").modal('hide');
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
	var selectData = ajax_async_t(BackstageIP+"showCountryList/findGroupByYearList", {userId:userId}, "json");
	if(selectData!= undefined && selectData.length > 0){
		var data = ajax_async_t(BackstageIP+"showCountryList/findListGroupByYear", {userId:userId,version:version}, "json");
		console.log(data)
		if( JSON.stringify(data) != "{}"){
			quanJu = data;
		}else{
			toastr["info"]("无清单数据");
			return ;
		}
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
/********************************************************添加行**********************************************/
var year_id = 100;//记录行数、id
function tjqdnf(){
	
	if(quanJu == null){
		var data = ajax_async_t(BackstageIP+"showCountryList/findListGroupByYear", {userId:userId,version:version}, "json");
		console.log(data);
		if(data != undefined){
			quanJu = data;
		}else{
			toastr["info"]("无清单数据");
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
/*************************************************初始化页面进入时弹出的模态窗中的确定按钮**********************/
var qddata_select="";
		
var qddata_year_val='';
var qddata_name="";			
var qddata_name_val='';
var qddata_year=[];	
var qddata_name=[];	//清单id
var qddata_text=[];//文本名称
var qddata_name_arr=new Array();
var year_button = 0;
function qd_year_name(){	//确定按钮
	dingwei();	
	qddata_year=[];			//清空
	qddata_name=[];			//清空
	qddata_text=[];			//清空
	
	var html = "";
	var qddata=$("#metTable1 select option:selected");
	if(qddata.length<=0){
		toastr["info"]("info", "必须选择一条记录");
		return;
	}else{
		for(var i=0;i <qddata.length;i++){
			if(i%2==0){
				
			}else{
				qddata_name.push(qddata[i].value);
				qddata_text.push(qddata[i-1].value+'='+qddata[i].text);
			}
		}
		$("#qdxz_Modal").modal('toggle');				//关闭模态窗
	}
	$("#year").html(qddata_text[0].split("=")[0]+"<br>("+qddata_text[0].split("=")[1]+")");
	$("#bookId").val(qddata_name[0]);
	common();
}
/********************************************************/

function btnleft(){//左边按钮
	year_button = year_button-1;
	if ( year_button < 0 ) {
		year_button = 0 ;
		return;
	}
	$("#year").html(qddata_text[year_button].split("=")[0]+"<br>("+qddata_text[year_button].split("=")[1]+")");
	$("#bookId").val(qddata_name[year_button]);
	common();
}
function btnright() {//右边按钮
	year_button = year_button+1;
	if ( year_button > qddata_text.length-1 ) {
		year_button = qddata_text.length-1 ;
		return;
	}
	$("#year").html(qddata_text[year_button].split("=")[0]+"<br>("+qddata_text[year_button].split("=")[1]+")");
	$("#bookId").val(qddata_name[year_button]);
	common();
}

/******************************添加行业*****************************************/
//行业列表按钮
function open_hy (){
	if($('input[name="shape"]:checked').val() == "2"){
		$("#hy_modal_table1").attr("class","col-sm-8")
		$("#hy_modal_table2").show();
	} else {
		$("#hy_modal_table1").attr("class","col-sm-12")
		$("#hy_modal_table2").hide();
	}
	$("#hangye_Modal").modal();
}
var chk_hy_value = [];
function checked_hy(value) {
	chk_hy_value =[]; 
	$('input[name="w"]:checked').each(function(){ 
		chk_hy_value.push(""+$(this).val()+""); 
	});
	if(chk_hy_value.length >= 10 ) {
		hy_a();
	} else {
		hy_b();
	}
	 e();
	hy_num = 11 - chk_hy_value.length;
	for( var k = 1 ; k < $("#"+value+" input").length;k++ ) {
		if ($("#"+value+" input")[k].checked){
			$("#"+value+" input")[0].checked =true;
		} else {
			if ( hy_num == 1 ) {
				$("#"+value+" input")[0].checked =true;
			} else {
				$("#"+value+" input")[0].checked =false;
				return;
			}
			
		}
	}
}
//大于十不在选
function hy_a(){
	$("input[type=checkbox][name='w']").prop('disabled', true);
	$("input[type=checkbox][name='w']:checked").prop('disabled', false);
	$("input[type=checkbox][name='p']").prop('disabled', true);
	$("input[type=checkbox][name='p']:checked").prop('disabled', false);
}
//十一下可以选
function hy_b(){
	$("input[type=checkbox][name='w']").prop('disabled', false);
	$("input[type=checkbox][name='p']").prop('disabled', false);
}
//行业+颜色表格
function e() {
	$("#metTable_hangye").html("");
	for ( var i = 0 ; i < chk_hy_value.length;i++ ) {
		var html = '<tr><td class="text-center" id="td'+i+'">'+chk_hy_value[i]+'</td>'+
					'<td class="text-center input-group colorpicker-demo2 input-group-addon" ><input id="input'+i+'" type="text" value="'+color[chk_hy_value[i]]+'" class="form-control" style="display:none" /><span class="input-group-addon" style="border: 0px solid #E5E6E7;padding-top:3px;padding-bottom:3px;padding-left:6px;padding-right:6px; "><i></i></span></td></tr>';
		$("#metTable_hangye").append(html);
	}
	 $(".colorpicker-demo2").colorpicker();
    var e = $("body")[0].style;
    $("#demo_apidemo").colorpicker({
        color: e.backgroundColor
    }).on("changeColor",
    function(o) {
        e.backgroundColor = o.color.toHex()
    }),
    $(".enable-button").click(function(e) {})
}
/**************************添加行业确定按钮***********************************/
var chosse_hy = ["电力","工业锅炉","民用燃烧","玻璃","独立焦化","钢铁","化工化纤","水泥","其他工业企业","机动车"]; //选择的行业

var chonse_color = {"电力":"#EE82EE","工业锅炉" :"#FF1493","民用燃烧":"#AEEEEE","玻璃":"#00868B","独立焦化":"#B4EEB4","钢铁":"#B3EE3A","化工化纤":"	#8B864E","水泥":"#8B658B","其他工业企业":"#EE7942","机动车":"#FFA54F"};//分配的颜色
function hy_button(){
	chosse_hy = [];
	parent.fu_scc2 = [];
	chonse_color = {};
	$(".point_html").html("");
	var html = " ";
	var data=$("#metTable_hangye tr").length;
	for ( var i = 0 ; i < data ; i ++ ) {
		chosse_hy[i] = $("#td"+i).html();
		parent.fu_scc2[i] = $("#td"+i).html();
		chonse_color[chosse_hy[i]] = $("#input"+i).val();
		html += '<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+$("#input"+i).val()+'"></div></div><div class="col-sm-8"><span></span>'+$("#td"+i).html()+'</div></div><br>';
	}
	common();
	$("#hangye_Modal").modal('hide');
	console.log(chonse_color);
	$(".point_html").html(html);
}
/**************************************物种选择*************************************/
function wzxz_button (){
	common();
	$("#wz_Modal").modal('hide');
}
/*************************地区选择*********************************/
function region_button() {
	fu_region = adCode();
	
	common();
	$("#region_Modal").modal("hide");
}
/****************************统计图与表格*****************************/
function pffx_button(){
}
/******************************各种查询公用方法**************************/
function common(){
	if ($('input[name="shape"]:checked').val() == "1") {
		dingwei();
		$("#grid_hy").hide();//栅格表格部门
		$("#fei_grid").show();//非栅格行业
		$("#grid_tuli").hide();//栅格图例
		try {app.map.removeLayer(app.gpResultLayer);} catch (e) {}//移除栅格图层
		app.map.removeLayer(app.sheng);//省的图层
		app.map.removeLayer(app.shi);//是的图层
		app.map.removeLayer(app.xian);//县的图层
		app.gLyr.hide();//点源图层
//		app.dynamicData.hide();//栅格图层
		subsection(2);//非栅格的方法
		$("#point_tuli").hide();//仅点源的图例
		$("#Calculation").show();//图例操作
		$("#select_hangye").hide();//选择行业
	} else if ($('input[name="shape"]:checked').val() == "2") {
		$("#grid_hy").hide();//栅格表格部门
		$("#fei_grid").show();//非栅格行业
		try {app.map.removeLayer(app.gpResultLayer);} catch (e) {}//移除栅格图层
		$("#grid_tuli").hide();//栅格图例
		$("#Calculation").hide();//图例操作
		$("#select_hangye").show();//选择行业
		app.map.removeLayer(app.sheng);//省的图层
		app.map.removeLayer(app.shi);//市的图层
		app.map.removeLayer(app.xian);//县的图层
//		app.dynamicData.hide();//栅格图层
		if ( app.hasOwnProperty("legend") ) {//摧毁图层
	    	app.legend.destroy();
	    	dong.domConstruct.destroy(dojo.byId("legend"));
	  	}
		app.gLyr.clear();//清除点的图层
		point();//仅点源的方法
	} else if ($('input[name="shape"]:checked').val() == "3") {
//		app.dynamicData.show();//栅格图层
		$("#grid_hy").show();//栅格表格部门
		$("#fei_grid").hide();//非栅格行业
		$("#Calculation").hide();//图例操作
		$("#select_hangye").hide();//选择行业
		$("#point_tuli").hide();//仅点源的图例
		app.map.removeLayer(app.sheng);//省的图层
		app.map.removeLayer(app.shi);//市的图层
		app.map.removeLayer(app.xian);//县的图层
		app.gLyr.hide();
		if ( app.hasOwnProperty("legend") ) {//清除图例
	    	app.legend.destroy();
	    	dong.domConstruct.destroy(dojo.byId("legend"));
	  	}
		grid();//非栅格的方法
	}
}
/************************************************自定义查询的内容开始*******************************************************************/
function tlsb_click(value){//是否有脱硫设备
	if ( value == "有" ) {
		$("#d7_div").show();
	} else {
		
		$("#d7_div").hide();
	}
}
function txsb_click(value){//是否有脱硝设备
	if ( value == "有" ) {
		$("#d8_div").show();
	} else {
		$("#d8_div").hide();
	}
}
function sntx_click(value){//水泥脱硝设备
	if ( value == "有" ) {
		$("#sn5_div").show();
	} else {
		$("#sn5_div").hide();
	}
}
function gtgx_click(str,div) {//钢铁工序
	if ($('input[name="gt_gx"]:checkbox[value="'+str.value+'"]').is(':checked')) {
		$("#gt"+div+"_div").show();
	} else {
		$("#gt"+div+"_div").hide();
	}
}
function gttl(value) {//钢铁脱硫设备
	if ( value == "有" ) {
		$("#gt12_div").show();
	} else {
		$("#gt12_div").hide();
	}
}
function gttl_click (value) {
	if (value == "有" ) $("#gt12_div").show();
	else $("#gt12_div").hide();
}
function gygltl_click (value) {
	if ( value == "有" ) {
		$("#gygl6_div").show();
	} else {
		$("#gygl6_div").hide();
	}
}
function rl_click (value,str){//燃料类型
	if ($('input[name="rl"]:checkbox[value="'+value+'"]').is(':checked')) {
		$("."+str).show();
	} else {
		$("."+str).hide();
	}
}
var zdysj;
function changeZdy(str) {//查询条件
	var changeZdy = {"电力":"#zdy_dl","水泥":"#zdy_sn","钢铁":"#zdy_gt","玻璃":"#zdy_bl","独立焦化":"#zdy_tljh","工业锅炉":"#zdy_gygl"}
	$.each(changeZdy,function(k){
		if( k == str ) {
			$(changeZdy[k]).show();
		} else {
			$(changeZdy[k]).hide();
		}
	});
}
//确定按钮
var zdy_type = "0";
function zdy_button(){
	var str = $("#tasklist_div").val();
	if(str == "电力" ) {
		var rl =[]; //燃料类型
		var i = 0;
		if( $("#rl1").is(":checked")){
			var rl1 = {};
			rl1["fueltype"] = "燃煤";
			if($('input[name="dlfd"]:checked').val() != undefined ) rl1["coalConsumption"] = $('input[name="dlfd"]:checked').val();
			if($('input[name="dlrm"]:checked').val() != undefined ) rl1["sulfur"] = $('input[name="dlrm"]:checked').val();
			if($('input[name="dlhf"]:checked').val() != undefined ) rl1["ash"] = $('input[name="dlhf"]:checked').val();
			rl [i] = rl1;
			i++
		}
		if($("#rl2").is(":checked") ) {
			var rl2 = {};
			rl2["fueltype"] = "燃油";
			if($('input[name="dlry"]:checked').val() != undefined ) rl2["sulfur"] = $('input[name="dlry"]:checked').val();
			rl [i] = rl2;
			i++;
		}
		if($("#rl3").is(":checked") ) {
			rl [i] = {"fueltype":"燃气"};
			i++;
		}
		var linshi = {};
		if ( rl.length > 0 ) linshi["fueltype"] = rl;
		
		if ( $('input[name="zjrl"]:checked').val() != undefined ) linshi["capacity"] = $('input[name="zjrl"]:checked').val();
		if ( $('input[name="dlnx"]:checked').val() != undefined ) linshi["unityear"] = $('input[name="dlnx"]:checked').val();
		if ( $('input[name="dlfd"]:checked').val() != undefined ) linshi["coalConsumption"] = $('input[name="dlfd"]:checked').val();
		if ( $('input[name="lc"]:checked').val() != undefined ) linshi["cogenerationornot"] = $('input[name="lc"]:checked').val();
		if ( $('input[name="tlsb"]:checked').val() != undefined ) linshi["etaSO2name"] = $('input[name="tlsb"]:checked').val();
		if ( $('input[name="tlsb"]:checked').val() != "无"){if ( $('input[name="dltlxl"]:checked').val() != undefined ) linshi["fEtaSO2"] = $('input[name="dltlxl"]:checked').val();}
		if ( $('input[name="txsb"]:checked').val() != undefined ) linshi["etaNOxname"] = $('input[name="txsb"]:checked').val();
		if ( $('input[name="txsb"]:checked').val() != "无" ) {if ( $('input[name="dltxxl"]:checked').val() != undefined ) linshi["fEtaNOx"] = $('input[name="dltxxl"]:checked').val();}
		if ( $('input[name="dlccxl"]:checked').val() != undefined ) linshi["dustremoval"] = $('input[name="dlccxl"]:checked').val();
		if ( JSON.stringify(linshi) != "{}") zdysj = {"bigIndex":"merged","smallIndex": "附件p101_电力行业调查表","filters":[linshi]};
		else zdysj = {"bigIndex":"merged","smallIndex": "附件p101_电力行业调查表"};
		zdysj = {"bigIndex":"merged","smallIndex": "附件p101_电力行业调查表","filters":[linshi]};
	} else if (str == "水泥" ) {
		var sblb = [];var i = 0;
		if( $("#sblb1").is(":checked")){
			sblb [i] = {"equiptype":"新型干法"};
			i++;
		}
		if($("#sblb3").is(":checked") ) {
			sblb [i] = {"equiptype":"立窑"};
			i++;
		}
		if($("#sblb4").is(":checked") ) {
			sblb [i] = {"equiptype":"粉磨"};
			i++;
		}
		var linshi = {};
		if ( sblb.length > 0 ) linshi["fueltype"] = sblb;
		if ( $('input[name="sncn"]:checked').val() != undefined ) linshi["capacity"] = $('input[name="sncn"]:checked').val();
		if ( $('input[name="snnx"]:checked').val() != undefined ) linshi["unityear"] = $('input[name="snnx"]:checked').val();
		if ( $('input[name="sn_txsb"]:checked').val() != undefined ) linshi["etaSNOXname"] = $('input[name="sn_txsb"]:checked').val();
		if ( $('input[name="sn_txsb"]:checked').val() != "无" ) {if ( $('input[name="sntxxl"]:checked').val() != undefined ) linshi["fEtaNOx"] = $('input[name="sntxxl"]:checked').val();}
		if ( $('input[name="snccxl"]:checked').val() != undefined ) linshi["dustremoval"] = $('input[name="snccxl"]:checked').val();
		if ( JSON.stringify(linshi) != "{}") zdysj = {"bigIndex":"merged","smallIndex": "附件p202_水泥行业调查表","filters":[linshi]};
		else zdysj = {"bigIndex":"merged","smallIndex": "附件p202_水泥行业调查表"};
		
		
	} else if ( str == "钢铁" ) {
		var gt = [];var i = 0;
		if( $("#gt2").is(":checked")){
			var gt2 = {};
			gt2["gongxu"] = "烧结";
			if ( $('input[name="gtsj"]:checked').val() != undefined ) gt2["capacity"] = $('input[name="gtsj"]:checked').val();
			gt [i] = gt2;
			i++;
		}
		if($("#gt3").is(":checked") ) {
			var gt3 = {};
			gt3["gongxu"]="炼焦";
			if ( $('input[name="gtlj"]:checked').val() != undefined ) gt3["capacity"] = $('input[name="gtlj"]:checked').val();
			gt [i] = gt3;
			i++;
		}
		if($("#gt4").is(":checked") ) {
			var gt4 ={};
			gt4["gongxu"]="炼铁";
			if ( $('input[name="gtlt"]:checked').val() != undefined ) gt4["capacity"] = $('input[name="gtlt"]:checked').val();
			gt [i] = gt4;
			i++;
		}
		if($("#gt5").is(":checked") ) {
			var gt5 = {};
			gt5["gongxu"]="炼钢";
			if ( $('input[name="gtlg"]:checked').val() != undefined ) gt5["capacity"] = $('input[name="gtlg"]:checked').val();
			gt [i] = gt5;
			i++;
		}
		var linshi = {};
		
		if ( gt.length > 0 ) linshi["fueltype"] = gt;
		if ( $('input[name="gtnx"]:checked').val() != undefined ) linshi["unityear"] = $('input[name="gtnx"]:checked').val();
		if ( $('input[name="gt_tlsb"]:checked').val() != undefined ) linshi["etaSO2name"] = $('input[name="gt_tlsb"]:checked').val();
		if ( $('input[name="gt_tlsb"]:checked').val() != "无" ) {if ( $('input[name="gttlxl"]:checked').val() != undefined ) linshi["fEtaSO2"] = $('input[name="gttlxl"]:checked').val();}
		if ( $('input[name="gtccxl"]:checked').val() != undefined ) linshi["dustremoval"] = $('input[name="gtccxl"]:checked').val();
		if ( JSON.stringify(linshi) != "{}") zdysj = {"bigIndex":"merged","smallIndex": "附件p201_钢铁行业调查表","filters":[linshi]};
		else zdysj = {"bigIndex":"merged","smallIndex": "附件p201_钢铁行业调查表"};
		
	} else if (str == "玻璃" ) {
		var linshi = {};
		if ( $('input[name="blcn"]:checked').val() != undefined ) linshi["capacity"] = $('input[name="gtnx"]:checked').val();
		if ( $('input[name="blccxl"]:checked').val() != undefined ) linshi["dustremoval"] = $('input[name="blccxl"]:checked').val();
		if ( JSON.stringify(linshi) != "{}") zdysj = {"bigIndex":"merged","smallIndex": "附件p203_玻璃行业调查表","filters":[linshi]};
		else zdysj = {"bigIndex":"merged","smallIndex": "附件p203_玻璃行业调查表"};
		
	} else if ( str == "独立焦化" ) {
		var linshi = {};
		if ( $('input[name="dljhcn"]:checked').val() != undefined ) linshi["capacity"] = $('input[name="dljhcn"]:checked').val();
		if ( $('input[name="dljhnx"]:checked').val() != undefined ) linshi["unityear"] = $('input[name="dljhnx"]:checked').val();
		if ( $('input[name="dljhccxl"]:checked').val() != undefined ) linshi["dustremoval"] = $('input[name="dljhccxl"]:checked').val();
		if ( JSON.stringify(linshi) != "{}") zdysj = {"bigIndex":"merged","smallIndex": "附件p204_焦化行业调查表","filters":[linshi]};
		else zdysj = {"bigIndex":"merged","smallIndex": "附件p204_焦化行业调查表"};
	} else if ( str == "工业锅炉" ) {
		var linshi = {};
		if ( $('input[name="gyglrl"]:checked').val() != undefined ) linshi["capacity"] = $('input[name="gyglrl"]:checked').val();
		if ( $('input[name="gyglrm"]:checked').val() != undefined ) linshi["sulfur"] = $('input[name="gyglrm"]:checked').val();
		if ( $('input[name="gyglrmhf"]:checked').val() != undefined ) linshi["ash"] = $('input[name="gyglrmhf"]:checked').val();
		if ( $('input[name="gygl_tlsb"]:checked').val() != undefined ) linshi["etaSO2name"] = $('input[name="gygl_tlsb"]:checked').val();
		if ( $('input[name="gygl_tlsb"]:checked').val() != "无"){if ( $('input[name="gygltlxl"]:checked').val() != undefined ) linshi["fEtaSO2"] = $('input[name="gygltlxl"]:checked').val();}
		if ( $('input[name="gyglccxl"]:checked').val() != undefined ) linshi["dustremoval"] = $('input[name="gyglccxl"]:checked').val();
		if ( JSON.stringify(linshi) != "{}") zdysj = {"bigIndex":"merged","smallIndex": "附件p102_工业锅炉调查表","filters":[linshi]};
		else zdysj = {"bigIndex":"merged","smallIndex": "附件p102_工业锅炉调查表"};
		
		
	}
	console.log(zdysj);
	parent.fu_customConditions = zdysj;
	zdy_type = "1";
	$(".close").click();
//	var data = ajax_async_t(BackstageIP+"showCountryList/customFindPointCompany",{bookId:$("#bookId").val(),species:$('input[name="wz"]:checked').val(),scc2:chosse_hy,customConditions:JSON.stringify(zdysj),version:version},"json");
	common();
}
/************************************************自定义查询的内容结束*******************************************************************/

/****************************************排放分析模态窗口***************************************************/
/**
 * 排放分析模态窗口
 */
var pfl = "";//排放量

function section_select(value){
	var html = '';
	$.each(hangye_type1[value],function(i,g){
		html += '<option value="'+g+'">'+g+'</option>';
	})
	$("#section_hy").html(html);
	
}
//统计图
function pftj_button (){
	section_select($("#section_select").val());
	$("#tj_bar").show();
	$("#tj_table").hide();
	var region_code = adCode();
	var str = $('input[name="wz"]:checked').val();
	if(str == "PM25") str = "PM2.5";
	$("#pffx_name").html(str+"排放分析");
	
	var data = ajax_async_t(BackstageIP+"showCountryList/analyzeScc1Chart",{bookId:$("#bookId").val(),species:$('input[name="wz"]:checked').val(),region:region_code,scc2:chosse_hy},"json");
	console.log(data);
	if ( data != "" && data != null && data != undefined ) {
		if(data.status == "success" ) {
			pfl = data.data.data;
			$("#zpl_num").html('所选范围内：总排量为<a onclick="show_bar()">'+data.data.data+'</a>吨。点源共计<a onclick="show_table()">'+data.data.flag+'</a>个，排放分担率'+data.data.rate+'%');
			option = {
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data:data.data.legend
				    },
				    grid: {
				    	top:'8%',
				        left: '3%',
				        right: '15%',
				        bottom: '5%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : data.data.xAxis,
				            name:'物种名称',
							nameGap:10,
							max: "auto",
							axisLabel:{//坐标轴文本标签选项
								interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
								rotate:25,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
								margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
							},
				        }
				    ],
				    yAxis : [
				        {	name :'单位:(万吨)',
				            type : 'value',
//				            nameGap:10,
				        }
				    ],
				    series : data.data.series
				};
			myChart_1 = echarts.init(document.getElementById("bar"), 'macarons');//声明id为1的div为图形dom
			myChart_1.on('click', function (params) {
//				console.log(params.name,params.seriesName)
				fenxi_pie(params.name,params.seriesName)
			});
			myChart_1.setOption(option);
			fenxi_pie("SO2",data.data.series[0].name);
		} else {
			toastr["info"]("错误信息",data.code);
		}
	} else {
		toastr["info"]("无返回数据");
	}
}
/**
 * 点击柱状图出饼图
 */
function fenxi_pie(wz,bumen){
	console.log(wz,bumen)
	var region_code = adCode();
	var data = ajax_async_t(BackstageIP+"/showCountryList/analyzeScc2Chart",{bookId:$("#bookId").val(),species:wz,region:region_code,scc2:chosse_hy,scc1:bumen},"json");
	console.log(data)
	if( data != "" && data != null && data != undefined ) {
		if (data.status == "success" ) {
			option = {
				    title : {
				        text: bumen+"-"+wz,
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
				        data: data.data.data
				    },
				    series : [
				              {
				                  name: wz,
				                  type: 'pie',
				                  radius : '55%',
				                  center: ['50%', '60%'],
				                  data:data.data.series,
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
			myChart_2 = echarts.init(document.getElementById('pie'),'macarons');
			myChart_2.setOption(option);
		} else {
			toastr["info"]("错误信息",data.code);
		}
	} else {
		toastr["info"]("无返回数据");
	}
}

/**
 * 出统计图
 */
function show_bar(){
	$("#tj_bar").show();
	$("#tj_table").hide();
}
/**
 * 出表格
 */
function show_table(){
	$("#tj_table").show();
	$("#tj_bar").hide();
	var region_code = adCode();
	var total;
	var sum=0;
	$('#dy_table').bootstrapTable('destroy');  		//销毁表格
	$('#dy_table').bootstrapTable({
		method: 'POST',
		url:  BackstageIP+'showCountryList/analyzeFindCompany',		
		dataType: "json",
		iconSize: "outline",
		clickToSelect: true,		//点击选中行
//		height:600,					//设置固定高度
		pagination: true,			//在表格底部显示分页工具栏
		pageSize: 10,				
		pageNumber:1,				
		pageList: [10,20,50],
		striped: true,	 			//使表格带有条纹
		sidePagination: "server",	//表格分页的位置 client||server
		responseHandler:function (res) {		//可以自定义配置服务器响应返回的参数信息
			if (res!=undefined||res!=null||res!='') {
				dy_data=res;					//赋值全局变量
				if(res.data.rows==null||res.data.rows==''||res.data.rows==undefined){
					toastr.info("数据库中没有匹配数据!");
					return {						//重组远程数据
						"rows":res.data.rows,
						"total":res.data.total,
						"page":res.data.page,
						};
				}else{
					total=res.data.total;
					return {						//重组远程数据
					"rows":res.data.rows,
					"total":res.data.total,
					"page":res.data.page,
					};
				}
			} else {
				toastr.info("未成功获取服务器数据!");
			}
		},
		queryParams : function(params) {
			return {
				pageNum : params.limit,	
				pageIndex : params.offset/params.limit,
				bookId:$("#bookId").val(),			//清单id
				regionId:region_code,		//地区编号
				species:$('input[name="wz"]:checked').val(),			//排放物种名称
				scc1:$("#section_select").val(),				//部门
				scc2:$("#section_hy").val(),				//行业
				totalEmission:pfl	//选择记录的总排放量
			}
		},
		queryParamsType: "limit", 	//参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  				//刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型
		onLoadSuccess:function(res){
			rows_data=res.rows;		//加载成功设为全局变量
		},
		columns : [
		 		  {
		 	         field : 'P_REGIONNAME',
		 	         title : '省',
		 	         align : 'center',
		 	      },
		 	       {
		 	         field : 'C_REGIONNAME',
		 	         title : '市',
		 	         align : 'center',
		 		      },
	 		     {
		 	         field : 'D_REGIONNAME',
		 	         title : '县',
		 	         align : 'center',
	 		     },
//	 		    {
//		 	         field : 'scc1',
//		 	         title : '部门',
//		 	         align : 'center',
//	 		     },
//	 		    {
//		 	         field : 'scc2',
//		 	         title : '行业',
//		 	         align : 'center',
//	 		     },
		 	      {
		 	         field : 'COMPANY_NAME',
		 	         title : '企业名称',
		 	         align : 'center',
		 	        /*width : '30%',*/
		 		      },
		 	      {
		 	         field : 'EQUIP_NUM',
		 	         title : '设备个数',
		 	         align : 'center',
		 		  },
		 	       {
	 		         field : 'EMISSION',
	 		         title : '排放量（万吨）',
	 		         align : 'center',
	 		       	 formatter:function(value,row,index){
		 	        	 var EMISSION=((row.EMISSION)/10000).toFixed(2);
		 	        	  return EMISSION;
		 	          }
		 		  },
		 	       {
		 	         field : 'pffdl',
		 	         title : '排放分担率(%)',
		 	         align : 'center',
		 	         formatter:function(value,row,index){
		 	        	if(index!=total-1){
		 	        		var qyfdl=(row.EMISSION/pfl).toFixed(2)*100;
		 	        		sum+=qyfdl;
		 	        		return qyfdl.toFixed(2)+'%';
		 	        	}else{
		 	        		qyfdl=100-sum;
		 	        		return qyfdl.toFixed(2)+'%';
		 	        	}
		 	        	
		 	          }
		 		   }  
		 		], 
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

}
/****************************************排放分析模态窗口结束***************************************************/
/**
 * 地图展示统计图
 */
function chart_button (){
	return;
	chartLayer();
}
/**
 * 对比分析
 */
function contrast_modal(){
	$("#contrast_Modal").modal();
	var html = '';
	$.each(qddata_text,function(i,g){
		html += '<option value="'+qddata_name[i]+'">'+g.split("=")[0]+'-'+g.split("=")[1]+'</option>';
	})
	$("#contrast_left").html(html);
	$("#contrast_right").html(html);
}
/**
 * 对比分析确定按钮
 */
function contrast_button (){
	if ($('input[name="contrast"]:checked').val() == "是"){
		if ( $("#contrast_left").val() == "" || $("#contrast_left").val() == null || $("#contrast_left").val() == undefined ) return toastr["info"]("提示", "请选择左侧任务");
		if ( $("#contrast_right").val() == "" || $("#contrast_right").val() == null || $("#contrast_right").val() == undefined ) return toastr["info"]("提示", "请选择右侧任务");
		var obj_left = document.getElementById("contrast_left");
		var txt_left = obj_left.options[obj_left.selectedIndex].text;
		var obj_right = document.getElementById("contrast_right");
		var txt_right = obj_right.options[obj_right.selectedIndex].text;
		
		window.parent.$("#yincang_caidan").attr("href","zp05/0505/contrast.html?left="+txt_left+"&right="+txt_right+"&left_bookId="+$("#contrast_left").val()+"&right_bookId="+$("#contrast_right").val()+"&wz="+$('input[name="wz"]:checked').val()+"&flag="+$('input[name="shape"]:checked').val());
		window.parent.$("#yincang_caidan").html("分析对比");
		window.parent.$("#yincang_caidan").click();
	}
	$("#contrast_Modal").modal("hide");
}
