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
	}
	//企业行业类别，通过监听html的变化实现
	$("#industrytype").bind('DOMNodeInserted', function(e) {
		$.each(industrytype_key,function(i,g){$("#"+g.div_id).hide();});
		if ($(e.target).html() != "请填写" && $(e.target).html() != "Empty" ) {$("#"+industrytype_key[$(e.target).html()].div_id).show();
		if (industrytype_key[$(e.target).html()].key == "表p204_企业基本信息表") $("#scx_div").show();
		else $("#scx_div").hide();
		if (industrytype_key[$(e.target).html()].key == "表p10011_餐饮业基本信息表") $("#ranliao_div").show();
		else $("#ranliao_div").hide();
		if($(e.target).html() == "民航飞机" || $(e.target).html() == "餐饮油烟" ||$(e.target).html() == "油气储运") $("#gkgs_s").hide();
		else $("#gkgs_s").show();}
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
    $("#htornot").editable("setValue","是");//环统是否覆盖
	$("#zlornot").editable("setValue","是");//在线监测是否安装初始化
	//页面初始化，加载企业信息
	Load_enterprise();
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
});
//添加生产线/产品信息
function add_scz(){
	if ( stype != "look"){
		if ($("#edit").is(":hidden")) {
			var index = (new Date()).valueOf();
			var kongzhi = "<tr id=\"huaxue"+index+"\" class=\"zhong\">" +
					"<td><a id=\"productname\"></a></td>" +
					"<td><a id=\"productamount\"></a></td>" +
					"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'scx_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
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
					"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'ranliao_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
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
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'ranliao_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
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
			"<td><a><img title=\"删除\" onclick=\"moduan_delete(this,'scx_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#scx_table").append(kongzhi);
	
	$.each(columns_scx, function(i, column) {
		column.emptytext = emptytext;
		$("#huaxue"+index+" #"+column.field).editable(column);
	});
	return index;

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
//页面初始化，加载企业信息v
function Load_enterprise(){
	$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
	var datas = ajax_async_t(BackstageIP+"dto/selectAll",{taskId:taskId},"json ","true");
	console.log(datas)
	if( datas != "" && datas !=undefined && datas!=null) {
		if (datas.status == "success" ) {
			var data = datas.data;
			/***************************************************************基本信息**********************************************************************/
			$.each(industrytype_key,function(i,g){$("#"+g.div_id).hide();});
			qing_scx ();
			qing_ranliao();
			var str = "";
			if (data.company.industrytype != "" && data.company.industrytype != undefined && data.company.industrytype != null ) str = industrytype_key[data.company.industrytype].div_id;
			$("#"+str).show()
			$.each(data.company,function(i,g){
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
			$("#qy_title #industrytype").editable("setValue",data.company.industrytype);
			$("#producttype").editable("setValue",data.company.producttype);
			
			if (data.company.cp != "" && data.company.cp != null && data.company.cp != null ) {
				if(data.company.cp.length > 0 ) {
					for ( var j = 0 ; j < data.company.cp.length; j ++ ) {
						var index = add_scz1();
						$.each(data.company.cp[j],function(i,g) {
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
			/***************************************************************设备信息**********************************************************************/
			var shebei = datas.data.equip;
			var num = 0;
			if ( shebei.length > 0 ) {
				$.each(shebei,function(i,item){
					$.each(item,function(k,g){
						$.each(sheet,function(a,b){
							if(b.key==k){
								var f_div=document.getElementById("parent");
								var sourceNode = document.getElementById(b.value[0]); 
								var clonedNode = sourceNode.cloneNode(true); 
								clonedNode.setAttribute("id", "dayin_"+num); 
								f_div.parentNode.appendChild(clonedNode); 
								$(clonedNode).show();
								if ( k == "表p1011_机组信息表v燃料信息" || k == "表p02_锅炉信息表v燃料信息" || k == "表p2021_熟料生产信息表v燃料信息" || k == "表p2031_玻璃生产信息表v燃料信息" || k == "表p2052_化纤生产信息表v燃料信息" || k == "表p2051_化工生产信息表v燃料信息" || k == "表p2081_其他工业生产信息表v燃料信息" || k == "表p7011_生物质锅炉信息表v燃料信息" ){
									data_ranliao_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #fdj_rl_table").show();
									$("#dayin_"+num+" #fdj_rl_table2").show();
									$.each(item[k],function(e,f) {
										var index = add_rl(hangye_year[k.split("v")[0]].name,hangye_year[k.split("v")[0]].year_name,"dayin_"+num);
										$.each(f,function(g,h){
											$("#dayin_"+num+" #rl"+index+" #"+g).html(h);
											$("#dayin_"+num+" #rl"+index+"ver #"+g).html(h);
										})
										
									});
								} else if (k == "表p2011_烧结工序信息表v燃料信息" || k == "表p2014_球团工序信息表v燃料信息" || k == "表p05_炼焦工序信息表v燃料信息" || k == "表p2015_轧钢信息表v燃料信息" || k == "表p2016_石灰石信息表v燃料信息"){
									data_ranliao2_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #zgxh_rl_table").show();
									$("#dayin_"+num+" #zgxh_rl_table2").show();
									$.each(item[k],function(e,f) {
										var index = add_zg_rl("燃料消耗量(万吨)","afuel","含硫量(％)","sulfur","dayin_"+num);
										$.each(f,function(g,h){
											$("#dayin_"+num+" #zg_rl"+index+" #"+g).html(h);
											$("#dayin_"+num+" #zg_rl"+index+"ver #"+g).html(h);
										})
									});
								}else if (k == "表p7011_生物质锅炉信息表v燃料信息" || k == "表p9031_烟气脱硝信息表v燃料信息"){
									data_ranliao3_data_Initialization("dayin_"+num);
									$.each(item[k],function(e,f) {
										var index = add_swgl_rl("afuel","dayin_"+num);
										$.each(f,function(g,h){
											$("#dayin_"+num+" #swgl_rl"+index+" #"+g).html(h);
										})
									});
								} else if ( k == "表p051_炼焦工序化学加工环节信息表v焦炭产量" ) {
									data_lianjiao_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #lianjiao_table").show();
									$.each(item[k],function(e,f) {
										var index = add_jiaotan("aproduct","dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #jiaotan"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p2052_化纤生产信息表v产品信息" || k == "表p2051_化工生产信息表v产品信息" || k == "表p2081_其他工业生产信息表v产品信息") {
									data_chanpin_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #lj_chanpin_table").show();
									$.each(item[k],function(e,f) {
										var index = add_lj_chanpin("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #lj_chanpin"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p2052_化纤生产信息表v有机原料信息" || k == "表p2051_化工生产信息表v有机原料信息" || k == "表p2081_其他工业生产信息表v有机原料信息") {
									data_yjyl_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #yjyl_table").show();
									$.each(item[k],function(e,f) {
										var index = add_yjyl("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #yjyl"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p4011_印刷印染信息表v溶剂信息" ) {
									data_rongji_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #rj_chanpin_table").show();
									$.each(item[k],function(e,f) {
										var index = add_rj_chanpin("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #rj_chanpin"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p4021_表面喷涂信息表v溶剂使用" ) {
									data_rjsy_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #brj_chanpin_table").show();
									$.each(item[k],function(e,f) {
										var index = add_brj_chanpin("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #brj_chanpin"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p4021_表面喷涂信息表v废气信息" ) {
									data_feiqi_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #feiqi_table").show();
									$.each(item[k],function(e,f) {
										var index = add_feiqi("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #feiqi"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p6012_施工扬尘信息表v机动车信息" ) {
									data_jidongche_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #jidongche_table").show();
									$.each(item[k],function(e,f) {
										var index = add_jidongche("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #jidongche"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p6012_施工扬尘信息表v污染控制" ) {
									data_wuran_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #lj_chanpin_table").show();
									$.each(item[k],function(e,f) {
										var index = add_wuran("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #wuran"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p06_堆场信息表v堆场信息" ) {
									data_duichang_data_Initialization("dayin_"+num);
									$("#dayin_"+num+" #duichang_table").show();
									$.each(item[k],function(e,f) {
										var index = add_duichang("dayin_"+num);
										$.each(f,function(g,h){$("#dayin_"+num+" #duichang"+index+" #"+g).html(h);})
									});
								}else if ( k == "表p07_有机液体储罐信息表v有机液体储罐信息" ) {
									data_yjytcg_data_Initialization("dayin_"+num);
										$("#dayin_"+num+" #yjytcg_table").show();
										$.each(item[k],function(e,f) {
											var index = add_yjytcg("dayin_"+num);
											$.each(f,function(g,h){$("#dayin_"+num+" #yjytcg"+index+" #"+g).html(h);})
										});
									}else if ( k == "表p08_有机液体装载信息表v有机液体装载信息" ) {
										data_yjytzz_data_Initialization("dayin_"+num);
										$("#dayin_"+num+" #yjytzz_table").show();
										$.each(item[k],function(e,f) {
											var index = add_yjytzz("dayin_"+num);
											$.each(f,function(g,h){$("#dayin_"+num+" #yjytzz"+index+" #"+g).html(h);})
										});
								}else if (k=="表p03_在线监测信息表" ) {
									$.each(g[0],function(e,f){
										$("#dayin_"+num+" #"+e).html(f);
										if ( e == "installornot" ) xianshi_zaixian("dayin_"+num);
									});
								} else if(k=="表p01_末端控制设备信息表") {
									chushihua_moduan("dayin_"+num);
									data_moduan_data_Initialization(item.表p01_末端控制设备信息表,"dayin_"+num);
								} else {
									$.each(g[0],function(e,f){
										$("#dayin_"+num+" #year").html(window.sessionStorage.getItem("year"));
										$("#dayin_"+num+" #"+e).html(f);
										if (e == "cogenerationornot" ) {
											if ( f == "是" ) $("#dayin_"+num+" #hotd2").show();
											else $("#dayin_"+num+" #hotd2").hide();
										}
									});
								}
								num ++;
							}
						})
					});
				});
			}
		}
		 
		$('.editable').editable('disable');//将编辑控件暂时锁死，需要用户确定编辑
		get_lon_lat();//获取经纬度坐标并进行定位
	}
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