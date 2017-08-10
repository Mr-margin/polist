jQuery.support.cors = true;
/**获取父页面的数据*/
var userId = parent.dataBase.Login_map.SOLE;	//userId用户唯一标识,获取父页面的Login_map的SOLE的值
//var userId =13;
var regionId = parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';	//region行政区划代码,行政区域获取父页面的Message_map的REGION的值
var user_type = parent.dataBase.Login_map.TYPE;;
//var region = 130100;
//var regionId = parent.dataBase.Login_map.REGION;
var	optRegionId="";		//选中行政区划代码
var version='1.0';		//版本
var edit="";			//所编辑清单id
var bookId;				//清单ID
var description="";		//描述
var factorRegionIds =[];//地区
var species_jar=[];		//排放系数

var cha_factor=[];//所选数据
var num_div =0;//添加div用的
var snum=0;

var SCC1 = "";//柱状图数据源
var SCC2 = "";//饼图一数据
var SCC3 = "";//饼图二数据
var relation = "";//对应关系
var new_bookId;
var view;
var metTable1 = $('#metTable1');
var optRegion ;				//选中区域
var qd_id=parent.qd_id;		//获取从版本管理父页面的跳转传递过来的清单id
var qd_year=parent.qd_year;	//获取从版本管理父页面的跳转传递过来的清单年份

/**********************************************************页面初始化函数*****************************************************************/
var myChart,paifangzhanshi_pie1,paifangzhanshi_pie2;
window.onresize=function () { //浏览器调整大小后，自动对所有的图进行调整
	try{
		if(myChart){
			myChart.resize();
		}if(paifangzhanshi_pie1){
			paifangzhanshi_pie1.resize();
		}if(paifangzhanshi_pie2){
			paifangzhanshi_pie2.resize();
		}
	}catch(e){
	}
};
$(function(){
	var Request = new Object();
	Request = GetRequest();
	number_oh = Request['number_oh'];
	view = Request['view'];
	if ( number_oh == "1" ) {
		$("#zhezhao").show();//创建中
		$("#zhezhao_title").show();
	}
	if(number_oh==1){
		new_bookId=Request['id']
		if(view==2){
			$("select").prop("disabled",true);
			$("input").prop("disabled",true);
			$("#Calculation").hide();
			$("#jisuanrenwu_save").hide();
			
		}
		initialize()
		qd_edit(optRegion);
		show(optRegion,null);
	}else{
		initialize();
	}
	
	section();					//部门
	checkbox_dept(parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'');	//地区
	
	$("#section_select").change(function(){		//部门
		$("#region input[name='p']").removeAttr("checked");
		$("#region input[name='city']").removeAttr("checked");
		$("#q_div input[name='q']").removeAttr("checked");
		$("#q_div input[name='w']").removeAttr("checked");
		$("#xzxs").val('');
		section();
		if(number_oh==1){
			var industry_show=$("#trade option:selected");	//行业
			subsector_text=industry_show.text();
			show(optRegionId,subsector_text);
		}
	})
	$("#trade").change(function(){				//行业
		delete_div('all');
		$("#xishu").html("");
		$("#region input[name='p']").removeAttr("checked");
		$("#region input[name='city']").removeAttr("checked");
		$("#q_div input[name='q']").removeAttr("checked");
		$("#q_div input[name='w']").removeAttr("checked");
		$("#xzxs").val('');
		var industry_show=$("#trade option:selected");		//行业
		subsector_text=industry_show.text();
		show(optRegion,subsector_text);
	})
	
});

/*****************************************************************初始化方法**********************************************************************/

function initialize(){
	var ip_url;
	var ip_data;
	if(number_oh==1){
		regionId=optRegion;
	}else{
		regionId=parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';
	}
//	alert(regionId)
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/init';
		 ip_data={userId:userId,version:version,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',edit:qd_id};
	}else{
		 ip_url=BackstageIP+'createList/init.do';
		 ip_data={userId : userId,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',optRegionId:optRegionId,version:version,edit:qd_id};
	}
	var getYear = $.ajax({
		url:ip_url,
    	type: "POST",
    	async:true,
    	dataType: 'JSON',
    	data:ip_data,
    success: function (res) {
    	
      },
    error: function () {
      toastr["info"]("错误信息", "服务器异常");
    }
  });
	$.when(getYear).done(function(){
		findYear();
		
	});
}

/*********************************************清单编辑******************************************************/
function qd_edit(optRegion,subsector_text){
	var ip_url;
	var ip_data;
	if(optRegion==null||optRegion==undefined||optRegion==''){
		qdedit_optRegionId=regionId;
	}else{
		qdedit_optRegionId=optRegion;
	}
	if(user_type=='1'){//国家
		 ip_url=BackstageIP+'countryList/edit';
		 var industry_show=$("#trade option:selected");	//行业
			subsector_text=industry_show.text();
		 ip_data={userId:userId,version:version,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',edit:qd_id,subSector:subsector_text,year:qd_year};
	}else{		//省份
		 ip_url=BackstageIP+'createList/edit';
		 ip_data={bookId:qd_id,userId:parent.dataBase.Login_map.SOLE,version:version,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',optRegionId:qdedit_optRegionId};
	}
	var data = ajax_async_t(ip_url,ip_data,"json");
	if ( data !="" && data != undefined ) {
		if ( data.status == "success" ) {
			
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
    			s1[i]={name:""+zhu[i]+"",type:"bar",data:[SCC1[zhu[i]].BC.toFixed(2),SCC1[zhu[i]].CO.toFixed(2),(SCC1[zhu[i]].CO2).toFixed(2),SCC1[zhu[i]].NH3.toFixed(2),SCC1[zhu[i]].NOx.toFixed(2),SCC1[zhu[i]].OC.toFixed(2),SCC1[zhu[i]].PM10more.toFixed(2),SCC1[zhu[i]].PM25.toFixed(2),SCC1[zhu[i]].PMcoarse.toFixed(2),SCC1[zhu[i]].SO2.toFixed(2),SCC1[zhu[i]].VOC.toFixed(2)],stack:"数据"};
    		}
    		$("#paifangzhanshi_echarts").show();
    		
    		bar(zhu,s1,data.xAxis);
    		document.getElementById('paifangzhanshi_echarts').scrollIntoView();
    		$("#jisuanrenwu_save").show();
		} else {
			toastr["info"]("错误信息", "数据异常："+data.code);
		}
	}
	
}
/****************************************************************查询修正系数******************************************************************************/

function show(optRegion,subsector_show){
	
	$("#xishu").empty();
	var ip_url;
	var ip_data;
	if(user_type=='1'){
		window.onload = function () {
			showHighlight('110000','1');	//省为1
		}
	}else if(user_type=='2'){
		window.onload = function () {		//市为2
			showHighlight(parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'','1');
		}
	}
	if(optRegion==null||optRegion==undefined||optRegion==''){
		qdedit_optRegionId=regionId;
	}else{
		qdedit_optRegionId=optRegion;
	}
	
	var industry_show=$("#trade option:selected");	//行业
	subsector_text=industry_show.text();
	
	if(subsector_show==null||subsector_show==undefined||subsector_show==''){
		
		qdshow_subsector='电力';
	}else{
		qdshow_subsector=subsector_show;
	}
	
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/show';
		 ip_data={userId:userId,version:version,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',subsector:qdshow_subsector,optRegionId:qdedit_optRegionId};
	}else{
		 ip_url=BackstageIP+'createList/show';
		 ip_data={userId:parent.dataBase.Login_map.SOLE,version:version,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',optRegionId:qdedit_optRegionId,subsector:qdshow_subsector};
	}
		var data = ajax_async_t(ip_url,ip_data,"json");
		console.log(data);
	if ( data !="" && data != undefined ) {
		if ( data.status == "success"&&data.data!=null) {
			var jsonO = eval("("+data.data.factor+")");			//数组
			
			var json1 = eval("("+data.data.factorRegions+")");	//数组
			var city=$("input[name='city']");
			var w=$("input[name='w']");
			$("#xishu").html("");
			for(z=0;z<jsonO.length;z++){
				add_div(jsonO);
			}
			
		}else {
//			toastr["info"]("info", "没有找到排放结果修正匹配的记录");
		}
	}else{
//		toastr["info"]("info", "没有找到排放结果修正匹配的记录");
	}
	
//	}
}

/*****************************************年份初始化************************************/
function findYear(){
	var ip_url;
	var ip_data;
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/findYear';
		 ip_data={userId:userId,version:version,region:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:''};
	}else{
		 ip_url=BackstageIP+'createList/findYear.do';
		 ip_data={userId : userId,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',version:version,edit:qd_id};
	}
	
	$.ajax({
		url:ip_url,
    	type: "POST",
    	async:true,
    	dataType: 'JSON',
    	data:ip_data,
    	
	    success: function (res) {
	    	if(""!=res&&res!=null&&res!="[]"){
	    		for(var y=0;y<res.length;y++){
	    			var opt = '<option value="'+ res[y] +'">'+ res[y] +'</option>';
	    			$(opt).appendTo($('#taskId'));
	    			if(res[y]==qd_year){
	    				$("#taskId").val(qd_year);
	    			}
	    		}
	    		metTable_initialization();
	    	}else if(res=='[]'||res==null||res==""){
	    		toastr["info"]("提示", "没有找到服务器中匹配的记录!");
	    		
	      	}
	      },
	    error: function () {
	      toastr["info"]("错误信息", "服务器异常!");
	    }
	});
	
}
function change(){
	metTable1.bootstrapTable('destroy');	//销毁现有表格数据
	metTable_initialization();
}

/***************************************数据初始化******************************************/
function metTable_initialization(){
	var ip_url;
	var ip_data;
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/search';
	}else{
		 ip_url=BackstageIP+'createList/search.do';
	}
	if(number_oh==1){
		if(optRegion==null||optRegion==''||optRegion==undefined){
			optRegion=parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';
		}
	}else{
		if(optRegion==null||optRegion==''||optRegion==undefined){
			optRegion=parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';
		}
	}
	var url = "";
	$('#metTable1').bootstrapTable({
		method: 'POST',
		url:ip_url,
		columns : [ {
			field : 'checked',
            radio : true,
			formatter : function(value, row, index) {
				if (row.selected == true)
				   return {
			            checked : true		//设置选中
			        };
			    return value;
			},
		},  
		{
			field : 'name',
			title : '清单名称',
			align : 'center'
		}, {
			field : 'description',
			title : '备注',
			align : 'center'
		} ], // 列
		dataType: "json",
		iconSize : "outline",
		clickToSelect : true,// 点击选中行
		pagination : true, // 在表格底部显示分页工具栏
		pageSize : 10, // 页面大小
		pageNumber : 1, // 页数
		pageList : [ 10, 20, 50 ],
		striped : true, // 使表格带有条纹
		sidePagination : "server",// 表格分页的位置 client||server
		queryParams : function formPm (m) {
			
		    console.log(m)
			if(user_type=='1'){
				return {
					pageNum: m.pageNumber-1,//当前页
			        pageSize: m.pageSize,//每页显示条数
					userId : userId,			//userId,获取父页面的Login_map的SOLE的值
					version:version,
					year : $('#taskId').val(),
					region:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',	//行政区划
					optRegion:optRegion,
				}
			}else{
				return {
					pageNum: m.pageNumber-1,//当前页
			        pageSize: m.pageSize,//每页显示条数
					userId : userId,			
					version:version,
					year : $('#taskId').val(),
					region:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',	//行政区划
					optRegion:optRegion,
					edit:qd_id					//所编辑清单id
				}
			}
		},
		queryParamsType: "undefined", 	//参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  				//刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		}});
	
	$("#zhezhao").hide();//创建中
	$("#zhezhao_title").hide();
}

function getSelectedRow() {
	var index = metTable1.find('tr.selected').data('index');
    return metTable1.bootstrapTable('getData')[index];
};
/*********************************耦合按钮---排放分析****************************************/
var industry='';
function calcPro(){
	var ip_url;
	var ip_data;
	
	if(pitch_on==null||pitch_on==''||pitch_on==undefined){
		toastr["info"]("提示", "请先选择操作地区！");
		return;
	}
	if(getSelectedRow()==undefined){
		toastr["info"]("提示", "请先选择清单版本！");
		return;
	}
	var row = getSelectedRow(metTable1);	//必须确认先选中一条数据
	var edit=row.id;
	var section_select=$("#section_select option:selected");	//部门
	str=section_select.text();
	var industry_sel=$("#trade option:selected");	//行业
	industry=industry_sel.text();
	
	var number="";
		number=$("#xzxs").val();	//修正系数
	var species=[];					//污染物筛选
	var species_job="";
	factorRegionIds.splice(0,factorRegionIds.length);	//清空数组 
	$('input[name="city"]:checked').each(function(){
		factorRegionIds.push($(this).val()); 
	});
	$('input[name="w"]:checked').each(function(){
		species.push($(this).val()); 
	});
	species_job={"species":species,"number":number};
	species_jar.push(species_job);
	
	$("#paifangzhanshi_echarts").html("");
	$("#paifangzhanshi_pie1").html("");
	$("#paifangzhanshi_pie2").html("");
	
	var factorRegionIds_jar=[];
	var factor_jar=[];
//	var lineChart = echarts.init(document.getElementById("paifangzhanshi_echarts"));	//获取div块的dom节点对象
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/calcPro';
		 ip_data={userId:userId,version:version,regionId:regionId,optRegionId:optRegion,bookId:edit,subSector:industry,factorRegionIds:JSON.stringify(factorRegionIds),factor:JSON.stringify(cha_factor)};
	}else{
		 ip_url=BackstageIP+'createList/calcPro.do';
		 ip_data={userId : userId,version:version,optRegionId:optRegion,regionId:regionId,bookId:edit,subSector:industry,factorRegionIds: JSON.stringify(factorRegionIds),factor:JSON.stringify(cha_factor)};
	}
	$("#zhezhao").show();//耦合中
	$("#zhezhao_title").show();
	$.ajax({
		url:ip_url,
    	type: "POST",
    	async:true,
    	dataType: 'JSON',
    	data:ip_data,
	    success: function (data) {
	    	if(data.status=="success"){
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
	    			s1[i]={
	    					name:""+zhu[i]+"",
	    					type:"bar",
	    					stack:"数据",
	    					data:[
	    					      ((SCC1[zhu[i]].BC)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].CO)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].CO2)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].NH3)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].NOx)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].OC)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].PM10more)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].PM25)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].PMcoarse)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].SO2)/10000).toFixed(2),
	    					      ((SCC1[zhu[i]].VOC)/10000).toFixed(2)
	    			],
	    					      itemStyle:{normal:{barBorderRadius:0}}};
	    		}
	    		$("#paifangzhanshi_echarts").show();
	    		
	    		bar(zhu,s1,data.xAxis);
	    		document.getElementById('paifangzhanshi_echarts').scrollIntoView();
	    		$("#jisuanrenwu_save").show();
	    		if(number_oh==1){
	    			$("#jisuanrenwu_update").show();
	    		}
	    		$("#zhezhao").hide();//耦合中
	    		$("#zhezhao_title").hide();
	    	} else if ( data.status == "fail" ) {
	    		$("#zhezhao").hide();
	    		$("#zhezhao_title").hide();
	    		toastr["info"]("提示","数据库中未找到匹配数据,返回状态为'fail'");
	    	}
	    },
	    error: function (data) {
    		$("#zhezhao").hide();
    		$("#zhezhao_title").hide();
    		toastr["info"]("错误信息",data.code);
    	
	    }  
	})
}
//柱状图
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
		    	x:'20%',
		    	width:'80%',
		      
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['BC','CO','CO2','NH3','NOx','OC','PM10more','PM25','PMcoarse','SO2','VOC'],
		            name:str,
					nameLocation:'middle',
					nameGap:30,
					max: "auto",
					axisLabel:{		//坐标轴文本标签选项
						interval:0,	//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
						rotate:15,	//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
						margin:7,	//坐标轴文本标签与坐标轴的间距，默认为8，单位px
					},
		        }
		    ],
		    yAxis : [
		        {
		        	axisLabel:{		//坐标轴文本标签选项
						interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
					},
		            type : 'value'
		        }
		    ],
		    series : s1
		};
	myChart = echarts.init(document.getElementById("paifangzhanshi_echarts"), 'macarons');	//声明id为1的div为图形dom
	myChart.on('click', function (params) {
		$("#paifangzhanshi_pie1").show();
		$("#paifangzhanshi_pie2").show();
		if(params.data!='0.00'&&params.data!=null&&params.data!=''&&params.data!=undefined&&params.value!=null&&params.value!=''&&params.value!=undefined&&params.value!='0.00'){
			var diqu=params.seriesName;
		    $("#pie1").show();
		    pie(params.seriesName,params.name);
		}else{
//			toastr["info"]("",params.name+"-"+params.seriesName+'无数据');
			$("#paifangzhanshi_pie1").hide();
			$("#paifangzhanshi_pie2").hide();
			return;
		}
	    
	});
	myChart.setOption(option);
	$("#paifangzhanshi_pie1").html('');
	$("#paifangzhanshi_pie2").html('');
	 $("#pie1").show();
	 pie(zhu[0],'BC');
}

/**************************************************第一个饼图************************************************/
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
		        x:'center',
		        textStyle:{
		        	fontSize:14,
		        }
		    },
		    tooltip : {
		    	position:[65,70],
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)",
		        confine:true,	
		    },
		    
		    legend: {
		    	padding:35,
		        orient: 'horizontal',
		        x: 'left',
		        data: name
		    },
		    series : [
		        {
		            name: str,
		            type: 'pie',
		            radius : '50%',
		            center: ['50%', '60%'],
		            legendHoverLink:true,
		            hoverAnimation:true,
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
	paifangzhanshi_pie1 = echarts.init(document.getElementById('paifangzhanshi_pie1'),'macarons');
	paifangzhanshi_pie1.on('click', function (params) {
		$("#paifangzhanshi_pie2").show();
		if(params.data!='0.00'&&params.data!=null&&params.data!=''&&params.data!=undefined&&params.value!=null&&params.value!=''&&params.value!=undefined&&params.value!='0.00'){
			$("#pie2").show();
		    pie2(str,str+"-"+params.name,d_name);
		}else{
//			toastr["info"]("",params.name+"-"+params.seriesName+'无数据');
			$("#paifangzhanshi_pie2").hide();
		}
		
	});
	
	paifangzhanshi_pie1.on('legendunselected', function (params) {
		$("#paifangzhanshi_pie2").show();
		 // 获取点击图例的选中状态
	    var isSelected = params.selected[params.name];
	    // 在控制台中打印
//	    console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
	    // 打印所有图例的状态
//	    console.log(params.selected);
	});
	if(ss!=0){
		paifangzhanshi_pie1.setOption(option);
		$("#pie2").show();
		 pie2(str,str+"-"+name[0],d_name);		
	}else{
//		toastr["info"]("",'BC-农业源无数据');
		return;
	}
	if(s[0].value==0){
//		toastr["info"]("",s[0].name+'无数据');
		$("#paifangzhanshi_pie2").hide();
	}
//	paifangzhanshi_pie1.setOption(option);
//	$("#pie2").show();
//	 pie2(str,str+"-"+name[0],d_name);
}
/*************************************************第二个饼图*********************************************/
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
	option = {
		    title : {
		        text: d_name+str1,
		        subtext: '',
		        x:'center',
		        textStyle:{
		        	fontSize:14,
		        }
		        
		    },
		    tooltip : {
		    	 position:[150,70],
		    	 trigger: 'item',
		         formatter: "{a} <br/>{b} : {c} ({d}%)",
		         confine:true,
		    },
		    legend: {
		    	padding:35,
		        orient: 'horizontal',
		        x: 'left',
		        data:name
		       
		    },
		    series : [
		        {
		            name: str1,
		            type: 'pie',
		            radius : '50%',
		            center: ['55%', '60%'],
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
	paifangzhanshi_pie2 = echarts.init(document.getElementById('paifangzhanshi_pie2'),'macarons');
	paifangzhanshi_pie2.on('click', function (params) {
	});
	paifangzhanshi_pie2.setOption(option);
}
 		
/******************************生成清单按钮*************************************/
function shengchengqingdan(){
	$("#shengchengqingdan_Modal").modal();		//根据ID调用页面的modal弹框
}

function create(){
	var ip_url;
	var ip_data;
	
	var year=$("#taskId").val();
	
	if($("#qingdan_name").val() == ""|| typeof $("#qingdan_name").val() == "undefined"){
		toastr["info"]("提示", "清单名称必须填写");
		return false;
	}else{
		var bookName=$("#qingdan_name").val();
	}
	
	if($("#qingdan_miaoshu").val()=='国家发布'||$("#qingdan_miaoshu").val()=='自主编制'){
		var description=$("#qingdan_miaoshu").val();
	}else {
		if($("#qingdan_miaoshu").val() == ""|| typeof $("#qingdan_miaoshu").val() == "undefined"){
			if(user_type==1){
				var description='国家发布';
			}else if(user_type==2){
				var description='自主编制';
			}
			
		}else{
			toastr["info"]("提示", "版本描述填写格式不正确");
			$("#qingdan_miaoshu").val('');
			return false;
		}
	}
	
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/create';
		 ip_data={userId:userId,version:version,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',optRegionId:optRegion,bookName:bookName,year:year,description:description};
	}else{
		 ip_url=BackstageIP+'createList/create.do';
		 ip_data={userId:userId,version:version,optRegionId:optRegion,regionId:parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'',bookName:bookName,year:year,description:description,factorRegionIds:JSON.stringify(factorRegionIds),factor:JSON.stringify(species_jar)};
	}
	
	$.ajax({
		url: ip_url,
    	type: "POST",
    	async:false,
    	dataType: 'JSON',
    	data:ip_data,
	    success: function (res) {
	    	if("success"==res.status){
	    		new_bookId=res.data.bookId;
	    		$("#jisuanrenwu_update").show();
	    		$("#shengchengqingdan_Modal").click();
		    	toastr["success"]("提示", "生成成功！");
	    	}else if("fail"==res.status){
	    		toastr["info"]("错误信息",res.code);
	    	}
	      },
	    error: function () {
	      toastr["info"]("错误信息", "服务器异常");
	    }
	});
	
};

/*******************************清单保存按钮*************************************/
function save(){
	var ip_url;
	var ip_data;
	if(user_type=='1'){
		 ip_url=BackstageIP+'countryList/save';
		 ip_data={bookId:new_bookId,userId:userId,version:version,regionId:regionId,optRegion:optRegion};
	}else{
		 ip_url=BackstageIP+'createList/save.do';
		 ip_data={bookId:new_bookId,userId : userId,version:version,regionId:regionId,optRegionId:optRegion};
	}
	
	$.ajax({
		url:ip_url,
    	type: "POST",
    	async:false,
    	dataType: 'JSON',
    	data:ip_data,
	    success: function (res) {
	    	if("success"==res.status){
		    	toastr["success"]("提示", "保存成功！");
	    	}else{
	    		toastr["info"]("错误信息", "保存失败！");
	    	}
	      },
	    error: function () {
	      toastr["info"]("错误信息", "服务器异常");
	    }
	});
}

/********************************动态添加修正系数div**************************************/
function add_div(chk_value_1) {
	var industry_val=$("#qingdanouhe_hangye option:selected").val();
	var chk_value =[]; 
	var address_val=[];
	var xzdq;
	var xzdq_arr=[];
	var s=[];
	var xzxs;
	
	if(chk_value_1!=null&&chk_value_1!=undefined&&chk_value_1!=''){
		for ( var i = 0 ; i <chk_value_1.length;i++ ) {
			for ( var j = 0 ; j <$(chk_value_1[i].species).length;j++ ) {
				chk_value.push(chk_value_1[i].species[j]);
			}
			for ( var z = 0 ; z < chk_value.length;z++ ) {
				s[z]= ''+chk_value[z]+'';
				
			}
			xzxs=chk_value_1[i].number;
		}
		
		
	}else{
		$('input[name="w"]:checked').each(function(){ 
			chk_value.push(""+$(this).val()+""); 
		});
		for ( var i = 0 ; i < chk_value.length;i++ ) {
			s[i]= ''+chk_value[i]+'';
			
		}
		  xzxs=$("#xzxs").val();
		 
	  $('input[name="city"]:checked').each(function(){ 
		  address_val.push(""+$(this).next()["0"].textContent+""); 
		});
		for ( var i = 0 ; i < address_val.length;i++ ) {
			xzdq_arr[i]= ''+address_val[i]+'';
			
		}
	}
	
	var com = document.createElement("div");
	document.getElementById("xishu").appendChild(com);		//行业：'+industry_val+';&nbsp;&nbsp;地区：'+address_val+';&nbsp;&nbsp;
	com.innerHTML='<div style="margin-left:10px;margin-top:15px;" class="tiaojian" id="div_'+num_div+'"><label>部门：'+$("#section_select option:selected").text()+';行业：'+$("#trade option:selected").text()+';<br>地区：'+xzdq_arr+';污染物：'+chk_value+';&nbsp;&nbsp;修正系数：'+xzxs+'</label><em onclick="delete_div(\'div_'+num_div+'\',\''+s+'\',\''+$("#xzxs").val()+'\');"></em></div>';
	cha_factor[snum] ={"species":s,"number":""+$("#xzxs").val()};
	num_div = num_div+1;
	snum = snum+1;
}

/********************************************删除div******************************************************/
function delete_div(str,shuzu,name){
	var ste = str.substring(4, str.length);
	if ( str == "all" ) {
		$('#xishu').html("");
		cha_factor = [];
		snum=0;
		num_div=0;
	}else {
		var box = document.getElementById(str);
		 var main = document.getElementById("xishu");
		 var newMask = document.createElement("div");
		 newMask.id ="newMask";
		 main.appendChild(newMask); 
		 if(box){
		     box.parentNode.removeChild(box);
		 }
		var sz = shuzu.split(",")
		 for(var i =0 ; i<cha_factor.length;i++ ) {
			 if(sz.toString() ==  cha_factor[i].species.toString() &&  cha_factor[i].number.toString() == name) {
				 cha_factor.splice(i,1) 
			 }
		 }
		 snum = snum-1;
	}
}

/*******************************************点击状态中的全选**************************************************************/
function all_checkbox(){
	if($("#q")["0"].checked == true){
		$("#q_div input[name='w']").prop("checked","true");
		$("#q_div input[name='w']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
	}else{
		$("#q_div input[name='w']").removeAttr("checked");
		$("#q_div input[name='w']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}
//地区全选
function all_checkbox1(){
	if($("#p")["0"].checked == true){
		$("#region input[name='city']").prop("checked","true");
		$("#region input[name='city']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
	}else{
		$("#region input[name='city']").removeAttr("checked")
		$("#region input[name='city']").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}
/**************************************************点击状态中的除了全选的那三个*********************************************/
function click_city(){
	var ztList = $("input:checkbox[name='city']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(ztList != ""){
		var ztListSize = ztList.split(",")
		if(ztListSize.length == $("input:checkbox[name='city']").length){
			$("#p").prop("checked","true");
			$("#p").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#p").removeAttr("checked");
			$("#p").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#p").removeAttr("checked");
		$("#p").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}

function click_w(){
	var ztList = $("input:checkbox[name='w']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(ztList != ""){
		var ztListSize = ztList.split(",")
		if(ztListSize.length == $("input:checkbox[name='w']").length){
			$("#q").prop("checked","true");
			$("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
		}else{
			$("#q").removeAttr("checked");
			$("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
		}
	}else{
		$("#q").removeAttr("checked");
		$("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
	}
}

/*************************************************加载地区******************************************************************/
function checkbox_dept(province){
	var province_html = "";
	if(province==110000){	//北京市
		province_html += '<input type="checkbox" id="c1" value=110100 name="city" onclick="click_city();"><label for="c1">市辖区</label>'
			+'<input type="checkbox" id="c2"  value=110101 name="city" onclick="click_city();"><label for="c2">东城区</label>'
			+'<input type="checkbox" id="c3"  value=110102 name="city" onclick="click_city();"><label for="c3">西城区</label>'
			+'<input type="checkbox" id="c4"  value=110105 name="city" onclick="click_city();"><label for="c4">朝阳区</label>'
			+'<input type="checkbox" id="c5"  value=110106 name="city" onclick="click_city();"><label for="c5">丰台区</label>'
			+'<input type="checkbox" id="c6"  value=110107 name="city" onclick="click_city();"><label for="c6">石景山区</label>'
			+'<input type="checkbox" id="c7"  value=110108 name="city" onclick="click_city();"><label for="c7">海淀区</label>'
			+'<input type="checkbox" id="c8"  value=110109 name="city" onclick="click_city();"><label for="c8">门头沟区</label>'
			+'<input type="checkbox" id="c9"  value=110111 name="city" onclick="click_city();"><label for="c9">房山区</label>'
			+'<input type="checkbox" id="c10" value=110112 name="city" onclick="click_city();"><label for="c10">通州区</label>'
			+'<input type="checkbox" id="c11" value=110113 name="city" onclick="click_city();"><label for="c11">顺义区</label>'
			+'<input type="checkbox" id="c12" value=110114 name="city" onclick="click_city();"><label for="c12">昌平区</label>'
			+'<input type="checkbox" id="c13" value=110115 name="city" onclick="click_city();"><label for="c13">大兴区</label>'
			+'<input type="checkbox" id="c14" value=110116 name="city" onclick="click_city();"><label for="c14">怀柔区</label>'
			+'<input type="checkbox" id="c15" value=110117 name="city" onclick="click_city();"><label for="c15">平谷区</label>';
	}else if (province==120000){
		province_html += '<input type="checkbox" id="c1" value=120100 name="city" onclick="click_city();"><label for="c1">市辖区</label>'
			+'<input type="checkbox" id="c2"  value=120101 name="city" onclick="click_city();"><label for="c2">和平区</label>'
			+'<input type="checkbox" id="c3"  value=120102 name="city" onclick="click_city();"><label for="c3">河东区</label>'
			+'<input type="checkbox" id="c4"  value=120103 name="city" onclick="click_city();"><label for="c4">河西区</label>'
			+'<input type="checkbox" id="c5"  value=120104 name="city" onclick="click_city();"><label for="c5">南开区</label>'
			+'<input type="checkbox" id="c6"  value=120105 name="city" onclick="click_city();"><label for="c6">河北区</label>'
			+'<input type="checkbox" id="c7"  value=120106 name="city" onclick="click_city();"><label for="c7">红桥区</label>'
			+'<input type="checkbox" id="c8"  value=120110 name="city" onclick="click_city();"><label for="c8">东丽区</label>'
			+'<input type="checkbox" id="c9"  value=120111 name="city" onclick="click_city();"><label for="c9">西青区</label>'
			+'<input type="checkbox" id="c10" value=120112 name="city" onclick="click_city();"><label for="c10">津南区</label>'
			+'<input type="checkbox" id="c11" value=120113 name="city" onclick="click_city();"><label for="c11">北辰区</label>'
			+'<input type="checkbox" id="c12" value=120114 name="city" onclick="click_city();"><label for="c12">武清区</label>'
			+'<input type="checkbox" id="c13" value=120115 name="city" onclick="click_city();"><label for="c13">宝坻区</label>'
			+'<input type="checkbox" id="c14" value=120116 name="city" onclick="click_city();"><label for="c14">滨海新区</label>';
	}else if (province==130000){
		province_html += '<input type="checkbox" id="c1" value=130100 name="city" onclick="click_city();"><label for="c1">石家庄市</label>'
			+'<input type="checkbox" id="c2"  value=130600 name="city" onclick="click_city();"><label for="c2">保定市</label>'
			+'<input type="checkbox" id="c3"  value=130300 name="city" onclick="click_city();"><label for="c3">秦皇岛市</label>'
			+'<input type="checkbox" id="c4"  value=130200 name="city" onclick="click_city();"><label for="c4">唐山市</label>'
			+'<input type="checkbox" id="c5"  value=130400 name="city" onclick="click_city();"><label for="c5">邯郸市</label>'
			+'<input type="checkbox" id="c6"  value=130500 name="city" onclick="click_city();"><label for="c6">邢台市</label>'
			+'<input type="checkbox" id="c7"  value=130900 name="city" onclick="click_city();"><label for="c7">沧州市</label>'
			+'<input type="checkbox" id="c8"  value=130800 name="city" onclick="click_city();"><label for="c8">承德市</label>'
			+'<input type="checkbox" id="c9"  value=131000 name="city" onclick="click_city();"><label for="c9">廊坊市</label>'
			+'<input type="checkbox" id="c10" value=131100 name="city" onclick="click_city();"><label for="c10">衡水市</label>'
			+'<input type="checkbox" id="c11" value=130700 name="city" onclick="click_city();"><label for="c11">张家口市</label>';
	}else if ( province==140000 ){
		province_html += '<input type="checkbox" id="c1" value=140100 name="city" onclick="click_city();"><label for="c1">太原市</label>'
			+'<input type="checkbox" id="c2"  value=140200 name="city" onclick="click_city();"><label for="c2">大同市</label>'
			+'<input type="checkbox" id="c3"  value=140300 name="city" onclick="click_city();"><label for="c3">阳泉市</label>'
			+'<input type="checkbox" id="c4"  value=140400 name="city" onclick="click_city();"><label for="c4">长治市</label>'
			+'<input type="checkbox" id="c5"  value=141000 name="city" onclick="click_city();"><label for="c5">临汾市</label>'
			+'<input type="checkbox" id="c6"  value=140700 name="city" onclick="click_city();"><label for="c6">晋中市</label>'
			+'<input type="checkbox" id="c7"  value=140800 name="city" onclick="click_city();"><label for="c7">运城市</label>'
			+'<input type="checkbox" id="c8"  value=140500 name="city" onclick="click_city();"><label for="c8">晋城市</label>'
			+'<input type="checkbox" id="c9"  value=140900 name="city" onclick="click_city();"><label for="c9">忻州市</label>'
			+'<input type="checkbox" id="c10" value=140600 name="city" onclick="click_city();"><label for="c10">朔州市</label>'
			+'<input type="checkbox" id="c11" value=141100 name="city" onclick="click_city();"><label for="c11">吕梁市</label>';
	}else if ( province==150000 ){
		province_html += '<input type="checkbox" id="c1" value=150100 name="city" onclick="click_city();"><label for="c1">呼和浩特市</label>'
			+'<input type="checkbox" id="c2"  value=150700 name="city" onclick="click_city();"><label for="c2">呼伦贝尔市</label>'
			+'<input type="checkbox" id="c3"  value=150200 name="city" onclick="click_city();"><label for="c3">包头市</label>'
			+'<input type="checkbox" id="c4"  value=150400 name="city" onclick="click_city();"><label for="c4">赤峰市</label>'
			+'<input type="checkbox" id="c5"  value=150300 name="city" onclick="click_city();"><label for="c5">乌海市</label>'
			+'<input type="checkbox" id="c6"  value=150500 name="city" onclick="click_city();"><label for="c6">通辽市</label>'
			+'<input type="checkbox" id="c7"  value=150600 name="city" onclick="click_city();"><label for="c7">鄂尔多斯市</label>'
			+'<input type="checkbox" id="c8"  value=150900 name="city" onclick="click_city();"><label for="c8">乌兰察布市</label>'
			+'<input type="checkbox" id="c9"  value=150800 name="city" onclick="click_city();"><label for="c9">巴彦淖尔市</label>';
	}else if ( province==210000 ){
		province_html += '<input type="checkbox" id="c1" value=211100 name="city" onclick="click_city();"><label for="c1">盘锦市</label>'
			+'<input type="checkbox" id="c2"  value=210300 name="city" onclick="click_city();"><label for="c2">鞍山市</label>'
			+'<input type="checkbox" id="c3"  value=210400 name="city" onclick="click_city();"><label for="c3">抚顺市</label>'
			+'<input type="checkbox" id="c4"  value=210500 name="city" onclick="click_city();"><label for="c4">本溪市</label>'
			+'<input type="checkbox" id="c5"  value=211200 name="city" onclick="click_city();"><label for="c5">铁岭市</label>'
			+'<input type="checkbox" id="c6"  value=210700 name="city" onclick="click_city();"><label for="c6">锦州市</label>'
			+'<input type="checkbox" id="c7"  value=210600 name="city" onclick="click_city();"><label for="c7">丹东市</label>'
			+'<input type="checkbox" id="c8"  value=211000 name="city" onclick="click_city();"><label for="c8">辽阳市</label>'
			+'<input type="checkbox" id="c9"  value=211400 name="city" onclick="click_city();"><label for="c9">葫芦岛市</label>'
			+'<input type="checkbox" id="c10" value=210900 name="city" onclick="click_city();"><label for="c10">阜新市</label>'
			+'<input type="checkbox" id="c11" value=211300 name="city" onclick="click_city();"><label for="c11">朝阳市</label>'
			+'<input type="checkbox" id="c12"  value=210800 name="city" onclick="click_city();"><label for="c12">营口市</label>';
	}else if ( province==220000 ){
		province_html += '<input type="checkbox" id="c1" value=220200 name="city" onclick="click_city();"><label for="c1">吉林市</label>'
			+'<input type="checkbox" id="c2"  value=220500 name="city" onclick="click_city();"><label for="c2">通化市</label>'
			+'<input type="checkbox" id="c3"  value=220800 name="city" onclick="click_city();"><label for="c3">白城市</label>'
			+'<input type="checkbox" id="c4"  value=220300 name="city" onclick="click_city();"><label for="c4">四平市</label>'
			+'<input type="checkbox" id="c5"  value=220400 name="city" onclick="click_city();"><label for="c5">辽源市</label>'
			+'<input type="checkbox" id="c6"  value=220700 name="city" onclick="click_city();"><label for="c6">松原市</label>'
			+'<input type="checkbox" id="c7"  value=220600 name="city" onclick="click_city();"><label for="c7">白山市 </label>';
	}else if ( province==230000 ){
		province_html += '<input type="checkbox" id="c1" value=230700 name="city" onclick="click_city();"><label for="c1">伊春市</label>'
			+'<input type="checkbox" id="c2"  value=231000 name="city" onclick="click_city();"><label for="c2">牡丹江市</label>'
			+'<input type="checkbox" id="c3"  value=230600 name="city" onclick="click_city();"><label for="c3">大庆市</label>'
			+'<input type="checkbox" id="c4"  value=230300 name="city" onclick="click_city();"><label for="c4">鸡西市</label>'
			+'<input type="checkbox" id="c5"  value=230400 name="city" onclick="click_city();"><label for="c5">鹤岗市</label>'
			+'<input type="checkbox" id="c6"  value=231200 name="city" onclick="click_city();"><label for="c6">绥化市</label>'
			+'<input type="checkbox" id="c7"  value=230500 name="city" onclick="click_city();"><label for="c7">双鸭山市</label>'
			+'<input type="checkbox" id="c8"  value=230900 name="city" onclick="click_city();"><label for="c8">七台河市</label>'
			+'<input type="checkbox" id="c9"  value=230800 name="city" onclick="click_city();"><label for="c9">佳木斯市</label>'
			+'<input type="checkbox" id="c10" value=231100 name="city" onclick="click_city();"><label for="c10">黑河市</label>'
			+'<input type="checkbox" id="c11" value=230200 name="city" onclick="click_city();"><label for="c11">齐齐哈尔市</label>';
	}else if ( province==310000 ){
		province_html += '<input type="checkbox" id="c1" value=310000 name="city" onclick="click_city();"><label for="c1">上海市</label>';
	}
	else if ( province==320000 ){
		province_html += '<input type="checkbox" id="c1" value=320200 name="city" onclick="click_city();"><label for="c1">无锡市</label>'
			+'<input type="checkbox" id="c2"  value=320400 name="city" onclick="click_city();"><label for="c2">常州市</label>'
			+'<input type="checkbox" id="c3"  value=321000 name="city" onclick="click_city();"><label for="c3">扬州市</label>'
			+'<input type="checkbox" id="c4"  value=320300 name="city" onclick="click_city();"><label for="c4">徐州市</label>'
			+'<input type="checkbox" id="c5"  value=320500 name="city" onclick="click_city();"><label for="c5">苏州市</label>'
			+'<input type="checkbox" id="c6"  value=320700 name="city" onclick="click_city();"><label for="c6">连云港市</label>'
			+'<input type="checkbox" id="c7"  value=320900 name="city" onclick="click_city();"><label for="c7">盐城市</label>'
			+'<input type="checkbox" id="c8"  value=320800 name="city" onclick="click_city();"><label for="c8">淮安市</label>'
			+'<input type="checkbox" id="c9"  value=321300 name="city" onclick="click_city();"><label for="c9">宿迁市</label>'
			+'<input type="checkbox" id="c10" value=321100 name="city" onclick="click_city();"><label for="c10">镇江市</label>'
			+'<input type="checkbox" id="c11" value=320600 name="city" onclick="click_city();"><label for="c11">南通市</label>'
			+'<input type="checkbox" id="c12" value=321200 name="city" onclick="click_city();"><label for="c12">泰州市</label>';
	}else if ( province==330000 ){
		province_html += '<input type="checkbox" id="c1" value=330600 name="city" onclick="click_city();"><label for="c1">绍兴市</label>'
			+'<input type="checkbox" id="c2"  value=330300 name="city" onclick="click_city();"><label for="c2">温州市</label>'
			+'<input type="checkbox" id="c3"  value=330500 name="city" onclick="click_city();"><label for="c3">湖州市</label>'
			+'<input type="checkbox" id="c4"  value=330400 name="city" onclick="click_city();"><label for="c4">嘉兴市</label>'
			+'<input type="checkbox" id="c5"  value=331000 name="city" onclick="click_city();"><label for="c5">台州市</label>'
			+'<input type="checkbox" id="c6"  value=330700 name="city" onclick="click_city();"><label for="c6">金华市</label>'
			+'<input type="checkbox" id="c7"  value=330900 name="city" onclick="click_city();"><label for="c7">舟山市</label>'
			+'<input type="checkbox" id="c8"  value=330800 name="city" onclick="click_city();"><label for="c8">衢州市</label>'
			+'<input type="checkbox" id="c9"  value=331100 name="city" onclick="click_city();"><label for="c9">丽水市</label>';
	}else if ( province==340000 ){
		province_html += '<input type="checkbox" id="c1" value=340100 name="city" onclick="click_city();"><label for="c1">合肥市</label>'
			+'<input type="checkbox" id="c2"  value=340200 name="city" onclick="click_city();"><label for="c2">芜湖市</label>'
			+'<input type="checkbox" id="c3"  value=341600 name="city" onclick="click_city();"><label for="c3">亳州市</label>'
			+'<input type="checkbox" id="c4"  value=340500 name="city" onclick="click_city();"><label for="c4">马鞍山市</label>'
			+'<input type="checkbox" id="c5"  value=341700 name="city" onclick="click_city();"><label for="c5">池州市</label>'
			+'<input type="checkbox" id="c6"  value=340400 name="city" onclick="click_city();"><label for="c6">淮南市</label>'
			+'<input type="checkbox" id="c7"  value=340600 name="city" onclick="click_city();"><label for="c7">淮北市</label>'
			+'<input type="checkbox" id="c8"  value=340300 name="city" onclick="click_city();"><label for="c8">蚌埠市</label>'
			+'<input type="checkbox" id="c9"  value=340181 name="city" onclick="click_city();"><label for="c9">巢湖市</label>'
			+'<input type="checkbox" id="c10" value=340800 name="city" onclick="click_city();"><label for="c10">安庆市</label>'
			+'<input type="checkbox" id="c11" value=341300 name="city" onclick="click_city();"><label for="c11">宿州市</label>'
			+'<input type="checkbox" id="c12" value=341800 name="city" onclick="click_city();"><label for="c12">宣城市</label>'
			+'<input type="checkbox" id="c13" value=341100 name="city" onclick="click_city();"><label for="c13">滁州市</label>'
			+'<input type="checkbox" id="c14" value=341000 name="city" onclick="click_city();"><label for="c14">黄山市</label>'
			+'<input type="checkbox" id="c15" value=341500 name="city" onclick="click_city();"><label for="c15">六安市</label>'
			+'<input type="checkbox" id="c16" value=341200 name="city" onclick="click_city();"><label for="c16">阜阳市</label>'
			+'<input type="checkbox" id="c17" value=340700 name="city" onclick="click_city();" ><label for="c17">铜陵市</label>';
	}else if ( province==350000 ){
		province_html += '<input type="checkbox" id="c1" value=350100 name="city" onclick="click_city();"><label for="c1">福州市</label>'
			+'<input type="checkbox" id="c2"  value=350500 name="city" onclick="click_city();"><label for="c2">泉州市</label>'
			+'<input type="checkbox" id="c3"  value=350600 name="city" onclick="click_city();"><label for="c3">漳州市</label>'
			+'<input type="checkbox" id="c4"  value=350700 name="city" onclick="click_city();"><label for="c4">南平市</label>'
			+'<input type="checkbox" id="c5"  value=350400 name="city" onclick="click_city();"><label for="c5">三明市</label>'
			+'<input type="checkbox" id="c6"  value=350800 name="city" onclick="click_city();"><label for="c6">龙岩市</label>'
			+'<input type="checkbox" id="c7"  value=350300 name="city" onclick="click_city();"><label for="c7">莆田市</label>'
			+'<input type="checkbox" id="c8"  value=350900 name="city" onclick="click_city();"><label for="c8">宁德市</label>';
	}else if ( province==360000 ){
		province_html += '<input type="checkbox" id="c1" value=360100 name="city" onclick="click_city();"><label for="c1">南昌市</label>'
			+'<input type="checkbox" id="c2"  value=360700 name="city" onclick="click_city();"><label for="c2">赣州市</label>'
			+'<input type="checkbox" id="c3"  value=360200 name="city" onclick="click_city();"><label for="c3">景德镇市</label>'
			+'<input type="checkbox" id="c4"  value=360400 name="city" onclick="click_city();"><label for="c4">九江市</label>'
			+'<input type="checkbox" id="c5"  value=360300 name="city" onclick="click_city();"><label for="c5">萍乡市</label>'
			+'<input type="checkbox" id="c6"  value=360500 name="city" onclick="click_city();"><label for="c6">新余市</label>'
			+'<input type="checkbox" id="c7"  value=361000 name="city" onclick="click_city();"><label for="c7">抚州市</label>'
			+'<input type="checkbox" id="c8"  value=360900 name="city" onclick="click_city();"><label for="c8">宜春市</label>'
			+'<input type="checkbox" id="c9"  value=361100 name="city" onclick="click_city();"><label for="c9">上饶市</label>'
			+'<input type="checkbox" id="c10" value=360600 name="city" onclick="click_city();"><label for="c10">鹰潭市</label>'
			+'<input type="checkbox" id="c11" value=360800 name="city" onclick="click_city();"><label for="c11">吉安市</label>';
	}else if ( province==370000 ){
		province_html += '<input type="checkbox" id="c1" value=370700 name="city" onclick="click_city();"><label for="c1">潍坊市</label>'
			+'<input type="checkbox" id="c2"  value=370300 name="city" onclick="click_city();"><label for="c2">淄博市</label>'
			+'<input type="checkbox" id="c3"  value=371000 name="city" onclick="click_city();"><label for="c3">威海市</label>'
			+'<input type="checkbox" id="c4"  value=370400 name="city" onclick="click_city();"><label for="c4">枣庄市</label>'
			+'<input type="checkbox" id="c5"  value=370900 name="city" onclick="click_city();"><label for="c5">泰安市</label>'
			+'<input type="checkbox" id="c6"  value=371300 name="city" onclick="click_city();"><label for="c6">临沂市</label>'
			+'<input type="checkbox" id="c7"  value=370500 name="city" onclick="click_city();"><label for="c7">东营市</label>'
			+'<input type="checkbox" id="c8"  value=370800 name="city" onclick="click_city();"><label for="c8">济宁市</label>'
			+'<input type="checkbox" id="c9"  value=370600 name="city" onclick="click_city();"><label for="c9">烟台市</label>'
			+'<input type="checkbox" id="c10" value=371700 name="city" onclick="click_city();"><label for="c10">菏泽市</label>'
			+'<input type="checkbox" id="c11" value=371100 name="city" onclick="click_city();"><label for="c11">日照市</label>'
			+'<input type="checkbox" id="c12" value=371400 name="city" onclick="click_city();"><label for="c12">德州市</label>'
			+'<input type="checkbox" id="c13" value=371500 name="city" onclick="click_city();"><label for="c13">聊城市</label>'
			+'<input type="checkbox" id="c14" value=371600 name="city" onclick="click_city();"><label for="c14">滨州市</label>'
			+'<input type="checkbox" id="c15" value=371200 name="city" onclick="click_city();"><label for="c15">莱芜市 </label>';
	}else if ( province==410000 ){
		province_html += '<input type="checkbox" id="c1" value=410100 name="city" onclick="click_city();"><label for="c1">郑州市</label>'
			+'<input type="checkbox" id="c2"  value=410300 name="city" onclick="click_city();"><label for="c2">洛阳市</label>'
			+'<input type="checkbox" id="c3"  value=410800 name="city" onclick="click_city();"><label for="c3">焦作市</label>'
			+'<input type="checkbox" id="c4"  value=411400 name="city" onclick="click_city();"><label for="c4">商丘市</label>'
			+'<input type="checkbox" id="c5"  value=411500 name="city" onclick="click_city();"><label for="c5">信阳市</label>'
			+'<input type="checkbox" id="c6"  value=410700 name="city" onclick="click_city();"><label for="c6">新乡市</label>'
			+'<input type="checkbox" id="c7"  value=410500 name="city" onclick="click_city();"><label for="c7">安阳市</label>'
			+'<input type="checkbox" id="c8"  value=410200 name="city" onclick="click_city();"><label for="c8">开封市</label>'
			+'<input type="checkbox" id="c9"  value=411100 name="city" onclick="click_city();"><label for="c9">漯河市</label>'
			+'<input type="checkbox" id="c10" value=411300 name="city" onclick="click_city();"><label for="c10">南阳市</label>'
			+'<input type="checkbox" id="c11" value=410600 name="city" onclick="click_city();"><label for="c11">鹤壁市</label>'
			+'<input type="checkbox" id="c12" value=410400 name="city" onclick="click_city();"><label for="c12">平顶山市</label>'
			+'<input type="checkbox" id="c13" value=410900 name="city" onclick="click_city();"><label for="c13">濮阳市</label>'
			+'<input type="checkbox" id="c14" value=411000 name="city" onclick="click_city();"><label for="c14">许昌市</label>'
			+'<input type="checkbox" id="c15" value=411600 name="city" onclick="click_city();"><label for="c15">周口市</label>'
			+'<input type="checkbox" id="c16" value=411200 name="city" onclick="click_city();"><label for="c16">三门峡市</label>'
			+'<input type="checkbox" id="c17" value=411700 name="city" onclick="click_city();"><label for="c17">驻马店市</label>';
	}else if ( province==420000 ){
		province_html += '<input type="checkbox" id="c1" value=420800 name="city" onclick="click_city();"><label for="c1">荆门市</label>'
			+'<input type="checkbox" id="c2"  value=421200 name="city" onclick="click_city();"><label for="c2">咸宁市</label>'
			+'<input type="checkbox" id="c3"  value=420600 name="city" onclick="click_city();"><label for="c3">襄阳市</label>'
			+'<input type="checkbox" id="c4"  value=421000 name="city" onclick="click_city();"><label for="c4">荆州市</label>'
			+'<input type="checkbox" id="c5"  value=420200 name="city" onclick="click_city();"><label for="c5">黄石市</label>'
			+'<input type="checkbox" id="c6"  value=420500 name="city" onclick="click_city();"><label for="c6">宜昌市</label>'
			+'<input type="checkbox" id="c7"  value=421300 name="city" onclick="click_city();"><label for="c7">随州市</label>'
			+'<input type="checkbox" id="c8"  value=420700 name="city" onclick="click_city();"><label for="c8">鄂州市</label>'
			+'<input type="checkbox" id="c9"  value=420900 name="city" onclick="click_city();"><label for="c9">孝感市</label>'
			+'<input type="checkbox" id="c10" value=421100 name="city" onclick="click_city();"><label for="c10">黄冈市</label>'
			+'<input type="checkbox" id="c11" value=420300 name="city" onclick="click_city();"><label for="c11">十堰市</label>'
			+'<input type="checkbox" id="c11" value=420100 name="city" onclick="click_city();"><label for="c11">武汉市</label>'
			;
	}else if ( province==430000 ){
		province_html += '<input type="checkbox" id="c1" value=430100 name="city" onclick="click_city();"><label for="c1">长沙市</label>'
			+'<input type="checkbox" id="c2"  value=431000 name="city" onclick="click_city();"><label for="c2">郴州市</label>'
			+'<input type="checkbox" id="c3"  value=431300 name="city" onclick="click_city();"><label for="c3">娄底市</label>'
			+'<input type="checkbox" id="c4"  value=430400 name="city" onclick="click_city();"><label for="c4">衡阳市</label>'
			+'<input type="checkbox" id="c5"  value=430200 name="city" onclick="click_city();"><label for="c5">株洲市</label>'
			+'<input type="checkbox" id="c6"  value=430300 name="city" onclick="click_city();"><label for="c6">湘潭市</label>'
			+'<input type="checkbox" id="c7"  value=430600 name="city" onclick="click_city();"><label for="c7">岳阳市</label>'
			+'<input type="checkbox" id="c8"  value=430700 name="city" onclick="click_city();"><label for="c8">常德市</label>'
			+'<input type="checkbox" id="c9"  value=430500 name="city" onclick="click_city();"><label for="c9">邵阳市</label>'
			+'<input type="checkbox" id="c10" value=430900 name="city" onclick="click_city();"><label for="c10">益阳市</label>'
			+'<input type="checkbox" id="c11" value=431100 name="city" onclick="click_city();"><label for="c11">永州市</label>'
			+'<input type="checkbox" id="c12" value=430800 name="city" onclick="click_city();"><label for="c12">张家界市</label>'
			+'<input type="checkbox" id="c13" value=431200 name="city" onclick="click_city();"><label for="c13">怀化市</label>';
	}else if ( province==440000 ){
		province_html += '<input type="checkbox" id="c1" value=440700 name="city" onclick="click_city();"><label for="c1">江门市</label>'
			+'<input type="checkbox" id="c2"  value=440600 name="city" onclick="click_city();"><label for="c2">佛山市</label>'
			+'<input type="checkbox" id="c3"  value=440500 name="city" onclick="click_city();"><label for="c3">汕头市</label>'
			+'<input type="checkbox" id="c4"  value=440800 name="city" onclick="click_city();"><label for="c4">湛江市</label>'
			+'<input type="checkbox" id="c5"  value=440200 name="city" onclick="click_city();"><label for="c5">韶关市</label>'
			+'<input type="checkbox" id="c6"  value=442000 name="city" onclick="click_city();"><label for="c6">中山市</label>'
			+'<input type="checkbox" id="c7"  value=440400 name="city" onclick="click_city();"><label for="c7">珠海市</label>'
			+'<input type="checkbox" id="c8"  value=440900 name="city" onclick="click_city();"><label for="c8">茂名市</label>'
			+'<input type="checkbox" id="c9"  value=441200 name="city" onclick="click_city();"><label for="c9">肇庆市</label>'
			+'<input type="checkbox" id="c10" value=441700 name="city" onclick="click_city();"><label for="c10">阳江市</label>'
			+'<input type="checkbox" id="c11" value=441300 name="city" onclick="click_city();"><label for="c11">惠州市</label>'
			+'<input type="checkbox" id="c12" value=445100 name="city" onclick="click_city();"><label for="c12">潮州市</label>'
			+'<input type="checkbox" id="c13" value=445200 name="city" onclick="click_city();"><label for="c13">揭阳市</label>'
			+'<input type="checkbox" id="c14" value=441800 name="city" onclick="click_city();"><label for="c14">清远市</label>'
			+'<input type="checkbox" id="c15" value=441600 name="city" onclick="click_city();"><label for="c15">河源市</label>'
			+'<input type="checkbox" id="c16" value=441900 name="city" onclick="click_city();"><label for="c16">东莞市</label>'
			+'<input type="checkbox" id="c17" value=441500 name="city" onclick="click_city();"><label for="c17">汕尾市</label>'
			+'<input type="checkbox" id="c18" value=445300 name="city" onclick="click_city();"><label for="c18">云浮市</label>';
	}else if ( province==450000 ){
		province_html += '<input type="checkbox" id="c1" value=450100 name="city" onclick="click_city();"><label for="c1">南宁市</label>'
			+'<input type="checkbox" id="c2"  value=451100 name="city" onclick="click_city();"><label for="c2">贺州市</label>'
			+'<input type="checkbox" id="c3"  value=450200 name="city" onclick="click_city();"><label for="c3">柳州市</label>'
			+'<input type="checkbox" id="c4"  value=450300 name="city" onclick="click_city();"><label for="c4">桂林市</label>'
			+'<input type="checkbox" id="c5"  value=450400 name="city" onclick="click_city();"><label for="c5">梧州市</label>'
			+'<input type="checkbox" id="c6"  value=450500 name="city" onclick="click_city();"><label for="c6">北海市</label>'
			+'<input type="checkbox" id="c7"  value=450900 name="city" onclick="click_city();"><label for="c7">玉林市</label>'
			+'<input type="checkbox" id="c8"  value=450700 name="city" onclick="click_city();"><label for="c8">钦州市</label>'
			+'<input type="checkbox" id="c9"  value=451000 name="city" onclick="click_city();"><label for="c9">百色市</label>'
			+'<input type="checkbox" id="c10" value=450600 name="city" onclick="click_city();"><label for="c10">防城港市</label>'
			+'<input type="checkbox" id="c11" value=450800 name="city" onclick="click_city();"><label for="c11">贵港市</label>'
			+'<input type="checkbox" id="c12" value=451200 name="city" onclick="click_city();"><label for="c12">河池市</label>'
			+'<input type="checkbox" id="c13" value=451400 name="city" onclick="click_city();"><label for="c13">崇左市</label>'
			+'<input type="checkbox" id="c14" value=451300 name="city" onclick="click_city();"><label for="c14">来宾市</label>';
	}else if ( province==460000 ){
		province_html += '<input type="checkbox" id="c1" value=460100 name="city" onclick="click_city();"><label for="c1">海口市</label>'
			+'<input type="checkbox" id="c2"  value=460200 name="city" onclick="click_city();"><label for="c2">三亚市</label>'
			+'<input type="checkbox" id="c3"  value=460300 name="city" onclick="click_city();"><label for="c3">三沙市</label>';
	}else if ( province==500000 ){
		province_html += '<input type="checkbox" id="c1" value=500000 name="city" onclick="click_city();"><label for="c1">重庆市</label>';
	}
	else if ( province==510000 ){
		province_html += '<input type="checkbox" id="c1" value=511100 name="city" onclick="click_city();"><label for="c1">乐山市</label>'
			+'<input type="checkbox" id="c2"  value=511800 name="city" onclick="click_city();"><label for="c2">雅安市</label>'
			+'<input type="checkbox" id="c3"  value=511600 name="city" onclick="click_city();"><label for="c3">广安市</label>'
			+'<input type="checkbox" id="c4"  value=511300 name="city" onclick="click_city();"><label for="c4">南充市</label>'
			+'<input type="checkbox" id="c5"  value=510300 name="city" onclick="click_city();"><label for="c5">自贡市</label>'
			+'<input type="checkbox" id="c6"  value=510500 name="city" onclick="click_city();"><label for="c6">泸州市</label>'
			+'<input type="checkbox" id="c7"  value=511000 name="city" onclick="click_city();"><label for="c7">内江市</label>'
			+'<input type="checkbox" id="c8"  value=511500 name="city" onclick="click_city();"><label for="c8">宜宾市</label>'
			+'<input type="checkbox" id="c9"  value=510800 name="city" onclick="click_city();"><label for="c9">广元市</label>'
			+'<input type="checkbox" id="c10" value=511700 name="city" onclick="click_city();"><label for="c10">达州市</label>'
			+'<input type="checkbox" id="c11" value=512000 name="city" onclick="click_city();"><label for="c11">资阳市</label>'
			+'<input type="checkbox" id="c12" value=510700 name="city" onclick="click_city();"><label for="c12">绵阳市</label>'
			+'<input type="checkbox" id="c13" value=511400 name="city" onclick="click_city();"><label for="c13">眉山市</label>'
			+'<input type="checkbox" id="c14" value=511900 name="city" onclick="click_city();"><label for="c14">巴中市</label>'
			+'<input type="checkbox" id="c15" value=510400 name="city" onclick="click_city();"><label for="c15">攀枝花市</label>'
			+'<input type="checkbox" id="c16" value=510900 name="city" onclick="click_city();"><label for="c16">遂宁市</label>'
			+'<input type="checkbox" id="c17" value=510600 name="city" onclick="click_city();"><label for="c17">德阳市 </label>';
	}else if ( province==520000 ){
		province_html += '<input type="checkbox" id="c1" value=520100 name="city" onclick="click_city();"><label for="c1">贵阳市</label>'
			+'<input type="checkbox" id="c2"  value=520400 name="city" onclick="click_city();"><label for="c2">安顺市</label>'
			+'<input type="checkbox" id="c3"  value=520300 name="city" onclick="click_city();"><label for="c3">遵义市</label>'
			+'<input type="checkbox" id="c4"  value=520200 name="city" onclick="click_city();"><label for="c4">六盘水市</label>';
	}else if ( province==530000 ){
		province_html += '<input type="checkbox" id="c1" value=530100 name="city" onclick="click_city();"><label for="c1">昆明市</label>'
			+'<input type="checkbox" id="c2"  value=530400 name="city" onclick="click_city();"><label for="c2">玉溪市</label>'
			+'<input type="checkbox" id="c3"  value=532901 name="city" onclick="click_city();"><label for="c3">大理市</label>'
			+'<input type="checkbox" id="c4"  value=530300 name="city" onclick="click_city();"><label for="c4">曲靖市</label>'
			+'<input type="checkbox" id="c5"  value=530600 name="city" onclick="click_city();"><label for="c5">昭通市</label>'
			+'<input type="checkbox" id="c6"  value=530500 name="city" onclick="click_city();"><label for="c6">保山市</label>'
			+'<input type="checkbox" id="c7"  value=530700 name="city" onclick="click_city();"><label for="c7">丽江市</label>'
			+'<input type="checkbox" id="c8"  value=530900 name="city" onclick="click_city();"><label for="c8">临沧市</label>';
	}else if ( province==540000 ){
		province_html += '<input type="checkbox" id="c1" value=540100 name="city" onclick="click_city();"><label for="c1">拉萨市</label>'
//			+'<input type="checkbox" id="c2"  value=540200 name="city"><label for="c2">阿里</label>';
	}else if ( province==610000 ){
		province_html += '<input type="checkbox" id="c1" value=610400 name="city" onclick="click_city();"><label for="c1">咸阳市</label>'
			+'<input type="checkbox" id="c2"  value=610800 name="city" onclick="click_city();"><label for="c2">榆林市</label>'
			+'<input type="checkbox" id="c3"  value=610300 name="city" onclick="click_city();"><label for="c3">宝鸡市</label>'
			+'<input type="checkbox" id="c4"  value=610200 name="city" onclick="click_city();"><label for="c4">铜川市</label>'
			+'<input type="checkbox" id="c5"  value=610500 name="city" onclick="click_city();"><label for="c5">渭南市</label>'
			+'<input type="checkbox" id="c6"  value=610700 name="city" onclick="click_city();"><label for="c6">汉中市</label>'
			+'<input type="checkbox" id="c7"  value=610900 name="city" onclick="click_city();"><label for="c7">安康市</label>'
			+'<input type="checkbox" id="c8"  value=611000 name="city" onclick="click_city();"><label for="c8">商洛市</label>'
			+'<input type="checkbox" id="c9"  value=610600 name="city" onclick="click_city();"><label for="c9">延安市</label>';
	}else if ( province==620000 ){
		province_html += '<input type="checkbox" id="c1" value=620100 name="city" onclick="click_city();"><label for="c1">兰州市</label>'
			+'<input type="checkbox" id="c2"  value=620400 name="city" onclick="click_city();"><label for="c2">白银市</label>'
			+'<input type="checkbox" id="c3"  value=620600 name="city" onclick="click_city();"><label for="c3">武威市</label>'
			+'<input type="checkbox" id="c4"  value=620300 name="city" onclick="click_city();"><label for="c4">金昌市</label>'
			+'<input type="checkbox" id="c5"  value=620800 name="city" onclick="click_city();"><label for="c5">平凉市</label>'
			+'<input type="checkbox" id="c6"  value=620700 name="city" onclick="click_city();"><label for="c6">张掖市</label>'
			+'<input type="checkbox" id="c7"  value=620200 name="city" onclick="click_city();"><label for="c7">嘉峪关市</label>'
			+'<input type="checkbox" id="c8"  value=620900 name="city" onclick="click_city();"><label for="c8">酒泉市</label>'
			+'<input type="checkbox" id="c9"  value=621000 name="city" onclick="click_city();"><label for="c9">庆阳市</label>'
			+'<input type="checkbox" id="c10" value=621100 name="city" onclick="click_city();"><label for="c10">定西市</label>'
			+'<input type="checkbox" id="c11" value=621200 name="city" onclick="click_city();"><label for="c11">陇南市</label>'
			+'<input type="checkbox" id="c12" value=620500 name="city" onclick="click_city();"><label for="c12">天水市</label>';
	}else if ( province==630000 ){
		province_html += '<input type="checkbox" id="c1" value=630100 name="city" onclick="click_city();"><label for="c1">西宁市</label>'
			+'<input type="checkbox" id="c2"  value=630200 name="city" onclick="click_city();"><label for="c2">海东市</label>';
	}else if ( province==640000 ){
		province_html += '<input type="checkbox" id="c1" value=640100 name="city" onclick="click_city();"><label for="c1">银川市</label>'
			+'<input type="checkbox" id="c2"  value=640400 name="city" onclick="click_city();"><label for="c2">固原市</label>'
			+'<input type="checkbox" id="c3"  value=640381 name="city" onclick="click_city();"><label for="c3">青铜峡市</label>'
			+'<input type="checkbox" id="c4"  value=640200 name="city" onclick="click_city();"><label for="c4">石嘴山市</label>'
			+'<input type="checkbox" id="c5"  value=640500 name="city" onclick="click_city();"><label for="c5">中卫市</label>';
	}else if ( province==650000 ){
		province_html += '<input type="checkbox" id="c1" value=650100 name="city" onclick="click_city();"><label for="c1">乌鲁木齐市</label>'
			+'<input type="checkbox" id="c2"  value=650200 name="city" onclick="click_city();"><label for="c2">克拉玛依市</label>';
	}else if ( province==810000 ){
		province_html += '<input type="checkbox" id="c1" value=810000 name="city" onclick="click_city();"><label for="c1">香港特别行政区</label>';
	}else if ( province==820000 ){
		province_html += '<input type="checkbox" id="c1" value=820000 name="city" onclick="click_city();"><label for="c1">澳门特别行政区</label>';
	}else if ( province==710000 ){
		province_html += '<input type="checkbox" id="c1" value=710000 name="city" onclick="click_city();"><label for="c1">台湾省</label>';
	}else if( province==000000){
		province_html += '<input type="checkbox" id="c1" value=110000 name="city" onclick="click_city();"><label for="c1">北京市</label>'
			+'<input type="checkbox" id="c2"  value=120000 name="city" onclick="click_city();"><label for="c2">天津市</label>'
			+'<input type="checkbox" id="c3"  value=130000 name="city" onclick="click_city();"><label for="c3">河北省</label>'
			+'<input type="checkbox" id="c4"  value=140000 name="city" onclick="click_city();"><label for="c4">山西省</label>'
			+'<input type="checkbox" id="c5"  value=150000 name="city" onclick="click_city();"><label for="c5">内蒙古自治区</label>'
			+'<input type="checkbox" id="c6"  value=210000 name="city" onclick="click_city();"><label for="c6">辽宁省</label>'
			+'<input type="checkbox" id="c7"  value=220000 name="city" onclick="click_city();"><label for="c7">吉林省</label>'
			+'<input type="checkbox" id="c8"  value=230000 name="city" onclick="click_city();"><label for="c8">黑龙江省</label>'
			+'<input type="checkbox" id="c9"  value=310000 name="city" onclick="click_city();"><label for="c9">上海市</label>'
			+'<input type="checkbox" id="c10"  value=320000 name="city" onclick="click_city();"><label for="c10">江苏省</label>'
			+'<input type="checkbox" id="c11"  value=330000 name="city" onclick="click_city();"><label for="c11">浙江省</label>'
			+'<input type="checkbox" id="c12"  value=340000 name="city" onclick="click_city();"><label for="c12">安徽省</label>'
			+'<input type="checkbox" id="c13"  value=350000 name="city" onclick="click_city();"><label for="c13">福建省</label>'
			+'<input type="checkbox" id="c14"  value=360000 name="city" onclick="click_city();"><label for="c14">江西省</label>'
			+'<input type="checkbox" id="c15"  value=370000 name="city" onclick="click_city();"><label for="c15">山东省</label>'
			+'<input type="checkbox" id="c16"  value=410000 name="city" onclick="click_city();"><label for="c16">河南省</label>'
			+'<input type="checkbox" id="c17"  value=420000 name="city" onclick="click_city();"><label for="c17">湖北省</label>'
			+'<input type="checkbox" id="c18"  value=430000 name="city" onclick="click_city();"><label for="c18">湖南省</label>'
			+'<input type="checkbox" id="c19"  value=440000 name="city" onclick="click_city();"><label for="c19">广东省</label>'
			+'<input type="checkbox" id="c20"  value=450000 name="city" onclick="click_city();"><label for="c20">广西壮族自治区</label>'
			+'<input type="checkbox" id="c21"  value=460000 name="city" onclick="click_city();"><label for="c21">海南省</label>'
			+'<input type="checkbox" id="c22"  value=500000 name="city" onclick="click_city();"><label for="c22">重庆市</label>'
			+'<input type="checkbox" id="c23"  value=510000 name="city" onclick="click_city();"><label for="c23">四川省</label>'
			+'<input type="checkbox" id="c24"  value=520000 name="city" onclick="click_city();"><label for="c24">贵州省</label>'
			+'<input type="checkbox" id="c25"  value=530000 name="city" onclick="click_city();"><label for="c25">云南省</label>'
			+'<input type="checkbox" id="c26"  value=540000 name="city" onclick="click_city();"><label for="c26">西藏自治区</label>'
			+'<input type="checkbox" id="c27"  value=610000 name="city" onclick="click_city();"><label for="c27">陕西省</label>'
			+'<input type="checkbox" id="c28"  value=620000 name="city" onclick="click_city();"><label for="c28">甘肃省</label>'
			+'<input type="checkbox" id="c29"  value=630000 name="city" onclick="click_city();"><label for="c29">青海省</label>'
			+'<input type="checkbox" id="c30"  value=640000 name="city" onclick="click_city();"><label for="c30">宁夏回族自治区</label>'
			+'<input type="checkbox" id="c31"  value=650000 name="city" onclick="click_city();"><label for="c31">新疆维吾尔自治区</label>'
			+'<input type="checkbox" id="c32"  value=810000 name="city" onclick="click_city();"><label for="c32">香港特别行政区</label>'
			+'<input type="checkbox" id="c33"  value=820000 name="city" onclick="click_city();"><label for="c33">澳门特别行政区</label>'
			+'<input type="checkbox" id="c34"  value=710000 name="city" onclick="click_city();"><label for="c34">台湾省</label>';
	}
	$("#region").html(province_html);
	$("#region").prepend("<input type='checkbox' id='p' value='p' name='p' onclick='all_checkbox1();'><label for='p'>全选</label>");
	if(view==2){
		$("select").prop("disabled",true);
		$("input").prop("disabled",true);
		$("#Calculation").hide();
		$("#jisuanrenwu_save").hide();
	}
}

/*********************************************选取部门*******************************/
var str="";
function section(str,industry) {
	var str = $("#section_select").val();
	var html = "";
	if ( str=="化石燃料固定燃烧源" ){
		html += '<option value="电力">电力</option>'+
				'<option value="工业锅炉">工业锅炉</option>'+
				'<option value="民用燃烧">民用燃烧</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true); 
		}
		
	} else if ( str=="工艺过程源" ){
		html += '<option value="玻璃">玻璃</option>'+
		'<option value="独立焦化">独立焦化</option>'+
		'<option value="钢铁">钢铁</option>'+
		'<option value="化工化纤">化工化纤</option>'+
		'<option value="水泥">水泥</label>'+
		'<option value="其他工业企业">其他工业企业</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if ( str == "移动源" ) {
		html += '<option value="机动车">机动车</option>'+
		'<option value="飞机">飞机</option>'+
		'<option value="船舶">船舶</label>'+
		'<option value="非道移机械">非道移机械</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if (str == "溶剂使用源" ) {
		html += '<option value="工业喷涂">工业喷涂</option>'+
		'<option value="建筑涂料">建筑涂料</option>'+
		'<option value="印刷印染">印刷印染</option>'+
		'<option value="农药使用">农药使用</option>'+
		'<option value="其他溶剂使用">其他溶剂使用</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if ( str == "农业源" ){
		html += '<option value="氮肥施用">氮肥施用</option>'+
		'<option value="固氮植物">固氮植物</option>'+
		'<option value="秸秆堆肥">秸秆堆肥</option>'+
		'<option value="人体粪便">人体粪便</option>'+
		'<option value="畜禽养殖">畜禽养殖</option>'+
		'<option value="土壤本底">土壤本底</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if ( str == "扬尘源" ) {
		html += '<option value="道路扬尘">道路扬尘</option>'+
		'<option value="堆场扬尘">堆场扬尘</option>'+
		'<option value="施工烟尘">施工烟尘</option>'+
		'<option value="土壤扬尘">土壤扬尘</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if ( str == "储存运输源" ) {
		html += '<option value="汽油储存">汽油储存</option>'+
		'<option value="汽油运输">汽油运输</option>'+
		'<option value="加油站">加油站</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if (str == "生物质燃烧源" ) {
		html += '<option value="生物质燃料">生物质燃料</option>'+
		'<option value="生物质开放燃烧">生物质开放燃烧</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if ( str == "废物处理源" ) {
		html += '<option value="废水处理">废水处理</option>'+
		'<option value="固废处理">固废处理</option>'+
		'<option value="烟气脱硝">烟气脱硝</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	} else if ( str == "其他排放源" ) {
		html += '<option value="餐饮油烟">餐饮油烟</option>';
		if(number_oh==1){
			$("#trade").find("option[text="+industry+"]").attr("selected",true);
		}
	}
	$("#trade").html(html);
	
}
