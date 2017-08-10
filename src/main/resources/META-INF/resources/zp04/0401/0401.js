jQuery.support.cors = true;
var version = "1.0";
var regionId = "";//行政区划
var cha_factor=[];//所选数据
var SCC1 = "";//柱状图数据源
var SCC2 = "";//饼图一数据
var SCC3 = "";//饼图二数据
relation = "";//对应关系

var all = "0";//全局变量-判断是否进行保存
var bumen ="";//部门
var renwu_name="";//任务名称

var num_div =0;//添加div用的
var snum=0;

var edit = "";//版本管理id
var view = "";//编辑还是查看

var myChart_1,myChart_2,myChart_3;//分析图变量
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
	}catch(e){
	}
};
$(function(){
	var Request = new Object();
	Request = GetRequest();
	edit = Request['id'];
	view = Request['view'];
	$("#section_select").change(function(){
		section();
		$("#show_version").html('');
		$("#renwu_select").html('');
		task_select ();
	})
	$("#data_1 .input-group.date").datepicker({
		minViewMode : 2,
		startView : 1,
		keyboardNavigation : !1,
		forceParse : !1,
		autoclose : !0,
		format: "yyyy",
	})
	if(parent.dataBase.Message_map != "" && parent.dataBase.Message_map != null && parent.dataBase.Message_map != undefined ) {
		regionId = parent.dataBase.Message_map.REGION;
	}
	
	
	
	ecloudhlder();//初始化
	calcTrade();//计算完成行业
	section();//部门
	
	if(edit == undefined ) {
		edit = "";
	}
	task_select();//年份下拉框
	
	if(view=="0"){//编辑
		bianji(edit,view);
		$("#show_button").show();
	}else if (view == "1" ) {//查看
		bianji(edit,view);
		$("#show_button").hide();
		$(".v1").hide();
	}
	
	$("#trade").change(function(){
		$("#show_version").html('');
		$("#renwu_select").html('');
		task_select ();
//		show_version($("#trade").val());
		
	})
	
});
//数据初始化
function ecloudhlder () {
	var data = ajax_async_t(BackstageIP+"factor/init.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,edit:edit},"json");
	if ( data !="" && data != undefined &&data !=null ) {
		if ( data.status == "success" ) {
			console.log(data.data);
		} else {
			
		}
	}
}
//完成计算的行业信息
function calcTrade(){
	var table1 ;
	var trade = {化石燃烧固定燃烧源:["电力","工业锅炉","民用源"],工艺过程源:["玻璃","独立焦化","钢铁","化工化纤","水泥","其他工业企业"],移动源:["机动车","飞机","船舶","非道移机械"],溶剂使用源:["工业喷涂","建筑涂料","印刷印染","农药使用","其它溶剂使用"],农业源:["氮肥施用","固氮植物","秸秆堆肥","人体粪便","畜禽养殖","土壤本底"],扬尘源:["道路扬尘","堆场扬尘","施工扬尘","土壤扬尘"],存储运输源:["油气储存","油气输送","加油站"],生物质燃烧源:["生物质燃料","生物质开放燃烧"],废物处理源:["废水处理","固废处理","烟气脱硝"],其他排放源:["餐饮油烟"]};
	var bumen = ["化石燃烧固定燃烧源","工艺过程源","移动源","溶剂使用源","农业源","扬尘源","存储运输源","生物质燃烧源","废物处理源","其他排放源"];
	var hangye = ["电力","工业锅炉","民用源","玻璃","独立焦化","钢铁","化工化纤","水泥","其他工业企业","机动车","飞机","船舶","非道移机械","工业喷涂","建筑涂料","印刷印染","农药使用","其它溶剂使用","氮肥施用","固氮植物","秸秆堆肥","人体粪便","畜禽养殖","土壤本底","道路扬尘","堆场扬尘","施工扬尘","土壤扬尘","油气储存","油气输送","加油站","生物质燃料","生物质开放燃烧","废水处理","固废处理","烟气脱硝","餐饮油烟"];
	var data = ajax_async_t(BackstageIP+"factor/calcTrade.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId},"json");
	if ( data !="" && data != undefined&&data !=null ) {
		if ( data.status == "success" ) {
			console.log(data)
			var html ='';
			$("#wei_ji").html(37-parseInt(data.data.length));
			for ( var i = 0 ; i < data.data.length; i ++ ) {
				hangye.remove(data.data[i]);
			}
			
			for ( var j = 0 ; j < bumen.length ;  j ++ ) {//部门
				var table2 = "";
				var ret = trade[bumen[j]];//行业
				for ( var a = 0 ; a < ret.length ; a ++ ) {//循环行业
					for ( var b = 0 ; b <hangye.length; b ++ ) {
						if( ret[a] ==  hangye[b] ) {
							table2 += hangye[b]+",";
						}
					}
				}
				table2 = table2.substring(0,table2.length-1)
				if ( table2!="" ) {
					html += '<tr><td>'+bumen[j]+'</td><td>'+table2+'</td></tr>';
				}
			}
			$("#table_rough").html(html);
		} else {
			
		}
	}else{
		toastr["info"]("提示","无匹配数据");
	}
}
//年份 
function task_select () {
	var data = ajax_async_t(BackstageIP+"factor/task.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:parent.dataBase.Login_map.REGION,edit:edit,subSector:$("#trade").val()},"json");
	console.log(data);
	if ( data != "" && data !=null && data != undefined ) {
		if ( data.status=="success" ) {
			if ( edit != undefined && edit!="" ) {
				var html = "";
				$.each(data.data.list,function(i,item) {
					if (item.select == true ) {
						html += '<option value="'+item.name+'" selected="selected">'+item.name+'</option>'
					} else {
						html += '<option value="'+item.name+'">'+item.name+'</option>'
					}
					
				});
				$("#renwu_select").html(html);
			}else {
				var html = "";
				$.each(data.data.list,function(i,item) {
					html += '<option value="'+item.name+'">'+item.name+'</option>'
				});
				$("#renwu_select").html(html);
			}
			show_version($("#trade").val());
		}else{
			toastr["info"]("提示","无可选年份");
		}
	}
}
/**
 * 改变年份
 * @param year
 */
function  chonse_year(){
	show_version($("#trade").val());
}
//选择排放版本
function checked_version() {
	delete_div('all');
}
//排放版本
function  show_version(str){
	var data = ajax_async_t(BackstageIP+"factor/show.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,year:$("#renwu_select").val(),subSector:str,edit:edit},"json");
	console.log(data);
	if ( data != "" && data != null && data != undefined ) {
		if(data.status=="success"){
			if ( edit != undefined && edit!="" ) {
				var html = "";
				console.log(data.data.list)
				delete_div('all','','');
				$.each(data.data.list,function(i,item){
					var num = i+1;
					if ( item.select == true ) {
						html += '<div class="col-sm-3"><input type="radio" id="ver_'+num+'" value="'+item.id+'" name="ver" checked="checked" onclick="checked_version()"><label for="ver_'+num+'">'+item.name+'</label></div>';
					} else {
						html += '<div class="col-sm-3"><input type="radio" id="ver_'+num+'" value="'+item.id+'" name="ver" onclick="checked_version()"><label for="ver_'+num+'">'+item.name+'</label></div>';
					}
				});
				$("#show_version").html(html);
				if(data.data.factor != "" && data.data.factor != undefined ) {
					if(data.data.factor.length > 0 ) {
						$.each( data.data.factor,function(i,item){
							var com = document.createElement("div");
							document.getElementById("xishu").appendChild(com);
							com.innerHTML='<div style="margin-left:10px;" class="tiaojian" id="div_'+num_div+'"><label>污染物:'+item.species+',修正系数：'+item.number+'</label><em onclick="delete_div(\'div_'+num_div+'\',\''+item.species+'\',\''+item.number+'\');"></em></div>';
							cha_factor[snum] ={"species":item.species,"number":""+item.number};
							num_div = num_div+1;
							snum = snum+1;
						});
					}
				}
			} else {
				var html = "";
				$.each(data.data.list,function(i,item){
					var num = i+1;
					if ( item.select == true ) {
						html += '<div class="col-sm-3"><input type="radio" id="ver_'+num+'" value="'+item.id+'" name="ver" checked="checked" onclick="checked_version()"><label for="ver_'+num+'">'+item.name+'</label></div>';
					} else {
						html += '<div class="col-sm-3"><input type="radio" id="ver_'+num+'" value="'+item.id+'" name="ver" onclick="checked_version()"><label for="ver_'+num+'">'+item.name+'</label></div>';
					}
				});
				$("#show_version").html(html);
				if(data.data.factor != "" && data.data.factor != undefined ) {
					if ( data.data.factor.length > 0 ){
						$.each(data.data.factor,function(i,item){
							var com = document.createElement("div");
							document.getElementById("xishu").appendChild(com);
							com.innerHTML='<div style="margin-left:10px;" class="tiaojian" id="div_'+num_div+'"><label>污染物:'+item.species+',修正系数：'+item.number+'</label><em onclick="delete_div(\'div_'+num_div+'\',\''+item.species+'\',\''+item.number+'\');"></em></div>';
							cha_factor[snum] ={"species":item.species,"number":""+item.number};
							num_div = num_div+1;
							snum = snum+1;
						});
					}
				}
			}
			if( view == "1" ){
				$("input").prop("disabled","true");
				$("#renwu_select").prop("disabled","true");
				$(".tianjian").removeClass("tiaojian");
				 $("em").removeAttr("onclick");
			}
		}
	} 
}

//全选与全不选
function all_checkbox(){
	var checkbox = document.getElementById('q');
	  if(checkbox.checked){
		  $(":checkbox").prop("checked",true); 
	  }else{
		  $(":checkbox").prop("checked",false);
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
		'<option value="汽油运输">油汽运输</option>'+
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

//排放分析
function analyse(){
	console.log(JSON.stringify(cha_factor));
	if($('input[name="ver"]:checked').val() =="" || $('input[name="ver"]:checked').val() == null || $('input[name="ver"]:checked').val() == undefined ) {
		toastr["info"]("提示","请选择排放版本");
		return;
	} 
	$("#paifangzhanshi").show();
	var chk_value =[]; 
	$('input[name="w"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	$("#zhezhao").show();//分析中
	$("#zhezhao_title").show();
	$.ajax({  		       
	    url: BackstageIP+'factor/calc.do',
	    type: "POST",
	    async:false,
	    dataType: 'json',
//	    traditional : true,
	    data: {
	    	userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,year:$("#renwu_select").val(),
			ipId:$('input[name="ver"]:checked').val(),subSector:$("#trade").val(),
			factor:JSON.stringify(cha_factor)
	    },
	    success: function (data) {
	    	console.log(data);
	    	if(data.status=="success"){
//	    		$("#show_bar").hide();
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
		    				       stack:"数据"
		    				    	   };
	    		}
	    		$("#show_bar").show();
	    		
	    		console.log(s1);
	    		bar(zhu,s1,data.xAxis);
//	    		document.getElementById('show_bar').scrollIntoView();
	    		$("#qigndan_build").show();
	    		if(view=="0"){
	    			$("#qingdan_save").show();
	    		}
	    		
	    		
	    		$("#zhezhao").hide();//分析中
	    		$("#zhezhao_title").hide();
	    		document.getElementById('paifangzhanshi').scrollIntoView()
	    	} else if ( data.status == "fail" ) {
	    		toastr["info"]("错误信息",data.code);
	    	}
	    },
	    error: function (data) {
	    	console.log(data);
	    }  
	})
}
//柱状图
function bar (zhu,s1,str) {
	$("#paifangzhanshi").show();
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
		    	top:'8%',
		        left: '3%',
		        right: '15%',
		        bottom: '5%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['CO','NOx','SO2','VOC','NH3','PM2.5','PMcoarse','PM10more','BC','OC'],
//		            name:str,
		            name:'物种名称',
//					nameLocation:'middle',
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
		        {	name :'单位:(万吨)',
		            type : 'value'
		        }
		    ],
		    series : s1
		};
	myChart_1 = echarts.init(document.getElementById("bar"), 'macarons');//声明id为1的div为图形dom
	myChart_1.on('click', function (params) {
		console.log(params);
	    var diqu=params.seriesName;
	    $("#show_pie1").show();
	    pie(params.seriesName,params.name);
	});
	myChart_1.setOption(option);
	
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
	
	console.log(s)
	option = {
		    title : {
		        text: d_name+str,
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
		        data: name
//		    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'] 
		    },
		    series : [
		        {
		            name: str,
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data: s
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
	myChart_2 = echarts.init(document.getElementById('pie1'),'macarons');
	myChart_2.on('click', function (params) {
	    $("#show_pie2").show();
	    pie2(str,str+"-"+params.name,d_name);
	});
	myChart_2.setOption(option);
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
		        x:'center'
		    },
		    tooltip : {
		    	 trigger: 'item',
		         formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data:name
		    },
		    series : [
		        {
		            name: str1,
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '70%'],
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
	myChart_3 = echarts.init(document.getElementById('pie2'),'macarons');
	myChart_3.on('click', function (params) {
	});
	myChart_3.setOption(option);
}
//清单生成按钮
function qigndan_build(){
	$("#qingdan_name").val('');
	$("#qdnf").val('');
	$("#add_content").val('');
	$("#show_save").modal();
}
//保存
function qingdan_save(){
	findSaved();
	$("#show_save1").modal();
	
}
//动态添加修正系数div
function add_div() {
//	<div class="tiaojian" id="tiaojian151484141290699_238"><label>填报人是</label></div>
	var chk_value =[]; 
	$('input[name="w"]:checked').each(function(){ 
		chk_value.push(""+$(this).val()+""); 
	});
	var s=[];
	for ( var i = 0 ; i < chk_value.length;i++ ) {
		s[i]= ''+chk_value[i]+'';
		
	}
	if ( chk_value.length == 0 ) return toastr["info"]("提示","请选择污染物。");
	if ( $("#xzxs").val() == "" ) return toastr["info"]("提示","请填写修正系数。");
	
	var com = document.createElement("div");
	document.getElementById("xishu").appendChild(com);
	com.innerHTML='<div style="margin-left:10px;" class="tiaojian" id="div_'+num_div+'"><label>污染物:'+chk_value+',修正系数：'+$("#xzxs").val()+'</label><em onclick="delete_div(\'div_'+num_div+'\',\''+s+'\',\''+$("#xzxs").val()+'\');"></em></div>';
	console.log(s);
	cha_factor[snum] ={"species":s,"number":""+$("#xzxs").val()};
	num_div = num_div+1;
	snum = snum+1;
}
//删除div
function delete_div(str,shuzu,name){
	var ste = str.substring(4, str.length);
	if ( str == "all" ) {
		$('#xishu').html("");
		cha_factor = [];
		console.log(JSON.stringify(cha_factor))
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
var bookId = "";
//清单生成保存按钮
function  add_formation(){
	if($("#qingdan_name").val() == "" || $("#qingdan_name").val() == null || $("#qingdan_name").val() == undefined ) {
		toastr["info"]("提示","清单版本名称不能为空");
		return;
	} else if($("#qdnf").val() == "" || $("#qdnf").val() == null || $("#qdnf").val() == undefined ){
		toastr["info"]("提示","清单年份不能为空");
		return;
	}else if(!testmc($("#qingdan_name").val())){
		toastr["info"]("清单版本名称只能填写汉字、英文字母、数字和下划线");
		return;
	}
	
	if($("#add_content").val()=='自主编制'){
		var miaoshu = $("#add_content").val();
	}else {
		if($("#add_content").val() == ""|| typeof $("#add_content").val() == "undefined"){
			var miaoshu = '自主编制';
		}else{
			toastr["info"]("错误信息", "清单描述填写格式不正确");
			$("#add_content").val('');
			return false;
		}
	}
	
	var data = ajax_async_t(BackstageIP+"factor/create.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,name:$("#qingdan_name").val(),year:$("#qdnf").val(),ds:miaoshu},"json");
	console.log(data);
	if ( data != "" && data != null && data != undefined ) {
		if ( data.status=="success" ) {
			toastr["success"]("提示","保存成功");
			$("#show_save").modal("hide");
			if(view!="0"&&view!="1"){
				$("#qingdan_save").show();
			}
			/*$("#qingdan_save").show();*/
			console.log(data);
			edit = data.data.bookId;
			calcTrade();
			parent.resush('iframe8');
		}else {
			if(data.code.indexOf("请更换名称") > 0){
				toastr["info"]("错误信息",data.code);
			}else{
				toastr["info"]("错误信息","保存失败");
			}
			
		}
	}
}

//保存中的清单版本任务
function  findSaved(){
	var data = ajax_async_t(BackstageIP+"factor/findSaved.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,bookId:edit},"json");
	if ( data != "" && data != null && data != undefined ) {
		if (data.status == "success" ) {
			var html ='';
			$.each(data.data,function(i,item){
				html+= '<option value="'+item.value+'">'+item.name+'</option>'
			});
			$("#find_Saved").html(html);
		}
	} else if (data == null || data == "" || data == undefined ) {
		toastr["info"]("错误信息","无返回数据");
	}
}


//保存按钮（修改中的保存）
function  update_formation () {
	
	$("#zhezhao").show();
	$("#zhezhao_title").show();
	var data = ajax_async_t(BackstageIP+"factor/save.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,factor:JSON.stringify(cha_factor),eId:$("#find_Saved").val(),year:$("#renwu_select").val()},"json");
	console.log(data);
	if ( data !="" && data != null && data != undefined ) {
		if ( data.status=="success"){
			toastr["success"]("","保存成功");
			$("#show_save1").modal("hide");
			calcTrade();
			parent.resush('iframe8');
			$("#zhezhao").hide();
			$("#zhezhao_title").hide();
		} else {
			$("#zhezhao").hide();
			$("#zhezhao_title").hide();
			toastr["info"]("错误信息","保存失败");
		}
	}
}
//编辑要执行的  
function  bianji(edit,str) {
	var data = ajax_async_t(BackstageIP+"factor/edit.do",{userId:parent.dataBase.Login_map.SOLE,version:version,regionId:regionId,edit:edit,subSector:$("#trade").val(),year:$("#renwu_select").val()},"json");
	console.log(data);
	if(data!="" && data!=null && data != undefined) {
		if( data.status =="success" ) {
			console.log(data)
			SCC1 =data.data.data.SCC1;
    		SCC2 = data.data.data.SCC2;
    		SCC3 = data.data.data.SCC3;
    		relation = data.data.data.relation;
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
//	    		 s1[i]={name:""+zhu[i]+"",type:"bar",data:[SCC1[zhu[i]].CO,SCC1[zhu[i]].NOx,SCC1[zhu[i]].SO2,SCC1[zhu[i]].VOC,SCC1[zhu[i]].NH3,SCC1[zhu[i]].PM25,SCC1[zhu[i]].PMcoarse,SCC1[zhu[i]].PM10more,SCC1[zhu[i]].BC,SCC1[zhu[i]].OC]};
    			s1[i]={
    					name:""+zhu[i]+"",
    					type:"bar",
    					stack:'数据',
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
    			};
    		}
    		$("#show_bar").show();
    		console.log(s1);
    		bar(zhu,s1,data.xAxis);
//    		pie1();
//    		pie2();
			if(str == "0" ) {//编辑 
				
			} else if ( str == "1" ) {//查看
				
			}
		}
	}
}
//非全选
function notallsel(){
	var countyList = $("input:checkbox[name='w']:checked").map(function(index,elem) {
		return $(elem).val();
	}).get().join(',');
	if(countyList != ""){
		var countrySize = countyList.split(",")
		if(10 == countrySize.length){
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

//查看 
function  cha_qing(){
//	 $("#renwu_select").attr("disabled",true);
//	 $("select").attr("disabled",true);
//	 var data = ajax_asunc_t ();
	
}
//汉字，数字，字母，下划线
function testmc(value){
	var zh = /^[\u0391-\uFFE5\w]+$/;
	return zh.test(value);
}
//未完成列表
function wei_rough(){
	$("#show_rough").modal();
}
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
	this.splice(index, 1);
	}
	};