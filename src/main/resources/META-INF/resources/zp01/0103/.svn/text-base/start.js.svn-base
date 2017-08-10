$(function(){
	//查看还是编辑状态判断
	stype = window.sessionStorage.getItem("type");
	if ( stype == "look" ) {$("#New_equipment").hide();}
	
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
	$( "#dialog-xuanzeshebei").dialog({//选择设备
		autoOpen: false,
		width: 850,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto"
	});
	$( "#dialog-xmsb").dialog({//数据校验提示
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
	$( "#dialog-tiaozhuan").dialog({//通用提示框
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade", 
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {$( this ).dialog( "close" );}
		}]
	});
	$( "#dialog-delete").dialog({//删除提示
		autoOpen: false,
		width: 400,
		modal : true,
		resizable : false,
		hide : "fade",
		bgiframe : false,
		height : "auto",
		buttons: [{
			text: "确定",
			click: function() {
				delete_shbei($("#nisenmyexiangbudao").html());
				$( this ).dialog( "close" );
			}
		},{
			text: "取消",
			click: function() {
				$("#nisenmyexiangbudao").html("");
				$( this ).dialog( "close" );
			}
		}]
	});
	if(typeof window.sessionStorage.getItem("taskId") != "undefined"){
		taskId = window.sessionStorage.getItem("taskId");
	}else{
		//没有获取到任务ID，所有按钮关闭
		$("#synchronization").hide();
		$("#New_equipment").hide();
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>任务获取失败，请刷新重试</b></span>");
		$("#dialog-tiaozhuan").dialog("open");
	}
	if(typeof window.sessionStorage.getItem("industrytype") != "undefined"){
		generate_select_style(window.sessionStorage.getItem("industrytype"));
	}else{
		$("#synchronization").hide();
		$("#New_equipment").hide();
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>请先选择企业所属行业</b></span>");
		$("#dialog-tiaozhuan").dialog("open");
	}
	//新建设备
	$("#New_equipment").click(function (){
		if(edit_show()){
			//显示意味着处于编辑状态
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>您正在编辑设备信息，请先保存设备信息或取消。</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
		}else{
			$("#dialog-xuanzeshebei").dialog("open");
		}
	});
	
	//取消，两种状态，编辑和新建
	$("#close").click(function (){
		html_close();//页面初始化
	});
	
	//保存，也是两种状态，，编辑和新建
	$("#save").click(function (){
		var check_Result = Data_check();
		if(check_Result.length>0){
			//有错误，出提示框
			var str_html = "<ul style='color:red'>";
			for(var i = 0;i<check_Result.length;i++){
				str_html += "<li>"+check_Result[i]+"</li>";
			}
			str_html += "</ul>";
			$("#dialog-xmsb-content").html(str_html);
			$("#dialog-xmsb").dialog("open");
		}else{
			//没有错误，执行保存
			save_data();
		}
	});
	
/***************************************添加燃料-发电机组********************************************************************/
	$("#add_fdj_rl").click(function (){
		if($('#fdj_rl_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#fdj_rl_table').show();
			$("#fdj_rl_table2").show();
			add_rl(hangye_year[$("#xinxi_title_name").html()].name,hangye_year[$("#xinxi_title_name").html()].year_name);
		}else{
			//隐藏
			$('#fdj_rl_table').show();
			$("#fdj_rl_table2").show();
			add_rl(hangye_year[$("#xinxi_title_name").html()].name,hangye_year[$("#xinxi_title_name").html()].year_name);
		}
		
	});
	
	/***************************************产品信息***********************************************************/
	$("#add_lj_chanpin").click(function (){
		if($('#lj_chanpin_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#lj_chanpin_table').show();
			add_lj_chanpin();
		}else{
			//隐藏
			$('#lj_chanpin_table').show();
			add_lj_chanpin();
		}
	});
	/***************************************溶剂***********************************************************/
	$("#add_rj_chanpin").click(function (){
		if($('#rj_chanpin_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#rj_chanpin_table').show();
			add_rj_chanpin();
		}else{
			$('#rj_chanpin_table').show();
			add_rj_chanpin();
		}
	});
	/***************************************废气**********************************************************/
	$("#add_feiqi").click(function (){
		if($('#feiqi_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#feiqi_table').show();
			add_feiqi();
		}else{
			$('#feiqi_table').show();
			add_feiqi();
		}
	});
	/**************************************机动车*********************************************************/
	$("#add_jidongche").click(function (){
		if($('#jidongche_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#jidongche_table').show();
			add_jidongche();
		}else{
			$('#jidongche_table').show();
			add_jidongche();
		}
		
	});
	/**************************************污染控制*******************************************************/
	$("#add_wuran").click(function (){
		if($('#wuran_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#wuran_table').show();
			add_wuran();
		}else{
			$('#wuran_table').show();
			add_wuran();
		}
		
	});
	/************************************堆场信息*****************************************************/
	$("#add_duichang").click(function (){
		if($('#duichang_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#duichang_table').show();
			add_duichang();
		}else{
			$('#duichang_table').show();
			add_duichang();
		}
		
	});
	/***********************************运载***************************************************/
	$("#add_yunzai").click(function (){
		if($('#yunzai_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#yunzai_table').show();
			add_yunzai();
		}else{
			$('#yunzai_table').show();
			add_yunzai();
		}
		
	});
	/**********************************控制措施**********************************************/
	$("#add_cuoshi").click(function (){
		if($('#cuoshi_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#cuoshi_table').show();
			add_cuoshi();
		}else{
			$('#cuoshi_table').show();
			add_cuoshi();
		}
		
	});
	/******************************有机液体储罐信息********************************************/
	$("#add_yjytcg").click(function (){
		if($('#yjytcg_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#yjytcg_table').show();
			add_yjytcg();
		}else{
			$('#yjytcg_table').show();
			add_yjytcg();
		}
		
	});
	/*****************************有机液体装载信息表*******************************************/
	$("#add_yjytzz").click(function (){
		if($('#yjytzz_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#yjytzz_table').show();
			add_yjytzz();
		}else{
			$('#yjytzz_table').show();
			add_yjytzz();
		}
		
	});
	/***************************************溶剂2***********************************************************/
	$("#add_brj_chanpin").click(function (){
		if($('#brj_chanpin_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#brj_chanpin_table').show();
			add_brj_chanpin();
		}else{
			$('#brj_chanpin_table').show();
			add_brj_chanpin();
		}
		
	});
	
	
	//添加有机原料
	$("#add_yjyl").click(function (){
		if($('#yjyl_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#yjyl_table').show();
			add_yjyl();
		}else{
			//隐藏
			$('#yjyl_table').show();
			add_yjyl();
		}
		
	});
	
	/*******************************添加燃料******************************************************/
	$("#add_swgl_rl").click(function (){
		if($('#swgl_rl_table').is(':visible')){//判断脱硫表格是否隐藏
			$('#swgl_rl_table').show();
			add_swgl_rl("afuel");
		}else{
			//隐藏
			$('#swgl_rl_table').show();
			add_swgl_rl("afuel");
		}
	});
	
	
	/****************************************添加焦炭产量********************************************************/
	$("#add_jiaotan").click(function(){
		if($('#lianjiao_table').is(':visible')){
			$("#lianjiao_table").show();
			add_jiaotan("aproduct");
			
		}else{
			$("#lianjiao_table").show();
			add_jiaotan("aproduct");
		}
		
	});
	
	/***********************************添加燃料-发电机组*******************************************************/
	$("#add_zgxh_rl").click(function (){
		if($('#zgxh_rl_table').is(':visible')){//判断脱硫表格是否隐藏hangye_year2
			var str = hangye_year2[$("#xinxi_title_name").html()];
			add_zg_rl(str.name1,str.year_name1,str.name2,str.year_name2);
		}else{
			var str = hangye_year2[$("#xinxi_title_name").html()];
			$('#zgxh_rl_table').show();
			$('#zgxh_rl_table2').show();
			add_zg_rl(str.name1,str.year_name1,str.name2,str.year_name2);
		}
		
	});
	
	
	//添加脱硫设备
	$("#add_tl").click(function (){
		if($('#tl_table').is(':visible')){//判断脱硫表格是否隐藏
			if($("#tl_table tr").length<6){
				//在被选元素的结尾插入内容
				moduan_1_kongzhi();
			}
		}else{
			//隐藏
			$('#tl_table').show();
			moduan_1_kongzhi();
		}
		
	});
	
	//添加脱硝设备
	$("#add_tx").click(function (){
		if($('#tx_table').is(':visible')){//判断脱硫表格是否隐藏
			if($("#tx_table tr").length<6){
				//在被选元素的结尾插入内容
				moduan_2_kongzhi();
			}
		}else{
			//隐藏
			$('#tx_table').show();
			moduan_2_kongzhi();
		}
		
	});
	
	//添加低氮燃烧技术
	$("#add_dd").click(function (){
		if($('#dd_table').is(':visible')){//判断脱硫表格是否隐藏
			if($("#dd_table tr").length<6){
				//在被选元素的结尾插入内容
				moduan_3_kongzhi();
			}
		}else{
			//隐藏
			$('#dd_table').show();
			moduan_3_kongzhi();
		}
		
	});
	
	//添加除尘设备
	$("#add_cc").click(function (){
		if($('#cc_table').is(':visible')){//判断脱硫表格是否隐藏
			if($("#cc_table tr").length<6){
				//在被选元素的结尾插入内容
				moduan_4_kongzhi();
			}
		}else{
			//隐藏
			$('#cc_table').show();
			moduan_4_kongzhi();
		}
		
	});
	
	//添加有机废气
	$("#add_yl").click(function (){
		if($('#yl_table').is(':visible')){//判断脱硫表格是否隐藏
			if($("#yl_table tr").length<6){
				//在被选元素的结尾插入内容
				moduan_5_kongzhi();
			}
		}else{
			//隐藏
			$('#yl_table').show();
			moduan_5_kongzhi();
		}
		
	});
	
	//热电联产的状态判断，通过监听html的变化实现
	$("#cogenerationornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") {
//			$("#hotd1").show();
			$("#hotd2").show();
		}else{
//			$("#hotd1").hide();
			$("#hotd2").hide();
		}
		
	});
	$("#lianjiaohuaxuejiagong_1 #isornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") $("#p051_ljgx").show();
		else $("#p051_ljgx").hide();
	});
	//是否安装在线监测
	$("#installornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") {
			$("#weianzhuang1").hide();
			$("#weianzhuang2").hide();
			$("#weianzhuang3").hide();
			$("#weianzhuang4").hide();
			$("#weianzhuang5").hide();
			$("#weianzhuang6").hide();
			
			$("#anzhuang1").show();
			$("#anzhuang2").show();
			$("#anzhuang3").show();
			$("#anzhuang4").show();
			$("#anzhuang5").show();
			$("#anzhuang6").show();
			
			$("#zx_conter1").show();
			$("#zx_conter2").show();
			$("#zx_conter3").show();
			$("#zx_conter4").show();
			
			$("#v1").attr("colspan", 2);
			$("#v2").attr("colspan", 2);
			$("#v3").attr("colspan", 2);
			$("#v4").attr("colspan", 2);
			$("#v5").attr("colspan", 2);
			$("#v6").attr("colspan", 2);
			$("#v7").attr("colspan", 2);
			
			$("#v1").attr("width", 0);
			$("#v2").attr("width", 0);
			$("#v3").attr("width", 0);
			$("#v4").attr("width", 0);
			$("#v5").attr("width", 0);
			$("#v6").attr("width", 0);
			$("#v7").attr("width", 0);
			
		}else{
			$("#weianzhuang1").show();
			$("#weianzhuang2").show();
			$("#weianzhuang3").show();
			$("#weianzhuang4").show();
			$("#weianzhuang5").show();
			$("#weianzhuang6").show();
			
			$("#anzhuang1").hide();
			$("#anzhuang2").hide();
			$("#anzhuang3").hide();
			$("#anzhuang4").hide();
			$("#anzhuang5").hide();
			$("#anzhuang6").hide();
			
			$("#zx_conter1").hide();
			$("#zx_conter2").hide();
			$("#zx_conter3").hide();
			$("#zx_conter4").hide();
			
			$("#v1").attr("colspan", 0);
			$("#v2").attr("colspan", 0);
			$("#v3").attr("colspan", 0);
			$("#v4").attr("colspan", 0);
			$("#v5").attr("colspan", 0);
			$("#v6").attr("colspan", 0);
			$("#v7").attr("colspan", 0);
			
			$("#v1").attr("width", "7%");
			$("#v2").attr("width", "7%");
			$("#v3").attr("width", "14%");
			$("#v4").attr("width", "7%");
			$("#v5").attr("width", "14%");
			$("#v6").attr("width", "7%");
			$("#v7").attr("width", "14%");
		}
	});
	
	//同步
	$("#synchronization").click(function (){
		if(edit_show()){
			//显示意味着处于编辑状态
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>您正在编辑设备信息，请先保存设备信息或取消。</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
		}else{
			
		}
	});
	
	//系统首页
	$("#sy").click(function (){
		if ( stype =="look" ) {
			window.location.replace("/polist/zp01/a.html");
		} else {
			if( look_or_up == 1 ) {
//				window.location.href="a.html";
				window.location.replace("/polist/zp01/a.html");
			} else {
				if(edit_show()){
					//显示意味着处于编辑状态
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>您正在编辑设备信息，请先保存设备信息或取消。</b></span>");
					$("#dialog-tiaozhuan").dialog("open");
				}else{
					window.location.replace("/polist/zp01/a.html");
				}
			}
		}
	});
	
	//企业信息
	$("#gkgs").click(function (){
		if ( stype =="look" ) {
			window.location.replace("/polist/zp01/0103/b.html");
		} else {
			if( look_or_up == 1 ) {
				window.location.replace("/polist/zp01/0103/b.html");
			} else {
				if(edit_show()){
					//显示意味着处于编辑状态
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>您正在编辑设备信息，请先保存设备信息或取消。</b></span>");
					$("#dialog-tiaozhuan").dialog("open");
				}else{
					window.location.replace("/polist/zp01/0103/b.html");
				}
			}
		}
	});
	
	//查询设备总览
	shebei_list();
});
var sheet = [{
	key: "表p1011_机组信息表",
	value: ["shebei_1","ranliao_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[{field:"equipId",title:"机组编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"capacity",title:"装机容量"},
	          {field:"cogenerationornot",title:"是否热电联产"},
	          {field:"fueltype",title:"燃料类型"},
	          {field:"sulfur",title:"燃料硫分"},
	          {field:"ash",title:"燃料灰分"},
	          {field:"volatile",title:"燃料挥发分"},
	          {field:"year",title:"年份"},
	          {field:"apowerfueltotal",title:"全年供电燃料消费总量"},
	          {field:"powertotal",title:"全年发电量"},
	          {field:"aheatfueltotal",title:"全年供热燃料消费总量"},
	          {field:"heattotal",title:"全年供热量"},
	          {field:"countrykornot",title:"是否国控重点污染源"},
	          {field:"provkornot",title:"是否省控重点污染源"},
	          {field:"citykornot",title:"是否市控重点污染源"}
	          ],
	Strengthen:["equiptype"]
},{
	key: "表p02_锅炉信息表",
	value: ["shebei_2","ranliao_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"锅炉编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"capacity",title:"锅炉容量"},
	          
	          {field:"year",title:"年份"},
	          {field:"afueltotal",title:"全年供热燃料消费总量"},
	          {field:"fueltype",title:"燃料类型"},
	        
	          {field:"sulfur",title:"燃料硫分"},
	          {field:"ash",title:"燃料灰分"},
	          {field:"volatile",title:"燃料挥发分"}],
	Strengthen:["equiptype"]
},{
	key: "表p2011_烧结工序信息表",
	value: ["shebei_3","ranliao_2","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"aroetotal",title:"全年铁矿石使用量"},
	          {field:"oresulfurtmean",title:"全年含硫率"},
	          {field:"aproducttotal",title:"全年烧结矿产量"},
	          {field:"aproductmjytotal",title:"全年煤焦油产量"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2014_球团工序信息表",
	value: ["shebei_3_1","ranliao_2","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"gmcapacity",title:"规模"},
	          {field:"aroetotal",title:"全年铁矿石使用量"},
	          {field:"oresulfurtmean",title:"全年含硫率"},
	          {field:"aproducttype",title:" 产品类型"},
	          {field:"aproducttotal",title:"全年球团矿产量"}
	         ],
	Strengthen:["aproducttype"]
},{
	key: "表p2015_轧钢信息表",
	value: ["shebei_3_3","ranliao_2","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"capacity",title:"产能"},
	          {field:"gmcapacity",title:"规模"},
	          {field:"year",title:"年份"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"aproducttotal",title:"全年产品信息"}
	         ],
	Strengthen:["aproducttype"]
},{
	key: "表p2016_石灰石信息表",
	value: ["shebei_3_4","ranliao_2","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"窑炉编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"capacity",title:"产能"},
	          {field:"gmcapacity",title:"规模"},
	          {field:"year",title:"年份"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"aproducttotal",title:"全年石灰产量"},
	         ],
	Strengthen:["aproducttype"]
},{
	key: "表p07_有机液体储罐信息表",
	value: ["shebei_3_5","yjytcg_1"],
	validate:[
	          {field:"equipId",title:"储罐编号"},
	          {field:"equiptype",title:"储罐类型"},
	          {field:"component",title:"存储液体成分"},
	          {field:"inoutnums",title:"年进出料次数"}
	         ],
	Strengthen:["aproducttype"]
},{
	key: "表p08_有机液体装载信息表",
	value: ["shebei_3_6","yjytzz_1"],
	validate:[
	          {field:"equipId",title:"装车站台编号"},
	          {field:"xh",title:"序号"},
	          {field:"materialname",title:"装载物料名称"},
	          {field:"zztype",title:"装载方式"},
	          {field:"zzway",title:"操作方式"},
	          {field:"zzamount",title:"年装载量"},
	          {field:"density",title:"装载物料密度"},
	          {field:"recover",title:"油气回收控制技术"}
	         ],
	Strengthen:["aproducttype"]
},{
	key: "表p2012_炼铁工序信息表",
	value: ["shebei_4","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"capacity",title:"产能"},
	          
	          {field:"year",title:"年份"},
	          {field:"gmcapacity",title:"高炉容积"},
	          {field:"aproducttotal",title:"全年生铁产量"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2013_炼钢工序信息表",
	value: ["shebei_5","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttotal",title:"全年粗钢产量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p05_炼焦工序信息表",
	value: ["shebei_6","ranliao_2","moduankongzhi_1","zaixianjiance_1","lianjiaohuaxuejiagong_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"equiptype",title:"炼焦方法"},
	          {field:"capacity",title:"产能"},
	          {field:"ljmethod",title:"炼焦方法"},
	          {field:"xjmethod",title:"熄焦工艺"},
	          {field:"sulfurpromean",title:"全年含硫率"},
	          {field:"asulphatetotal",title:"全年硫酸"},
	          {field:"asulphurtotal",title:"全年硫磺产量"},
	          {field:"agastotal",title:"全年煤气产生量"},
	          {field:"agash2sratiototal",title:"全年煤气中H2S浓度"},
	          {field:"agasselftotal",title:"全年煤气自用量"},
	          {field:"aproductmjytotal",title:"全年煤焦油产量"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2021_熟料生产信息表",
	value: ["shebei_7","ranliao_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"窑炉编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2022_水泥生产信息表",
	value: ["shebei_8","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"粉磨站编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2031_玻璃生产信息表",
	value: ["shebei_9","ranliao_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"mxtype",title:"芒硝成分"},
	          {field:"amxtotal",title:"全年芒硝用量"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年平板玻璃产量"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"amaterialname",title:"名称"},{field:"amaterialtotal",title:"使用量"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2052_化纤生产信息表",
	value: ["shebei_10","chanpin_1","ranliao_1","yjyl_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"生产线编号"},
//	          {field:"equiptype",title:"生产工艺"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"aproductname",title:"产品名称"},
	          {field:"aproductunit",title:"全年产品产量"},
	          {field:"aproducttotal",title:"产品产量单位"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"year",title:"年份"}
	          ],
	Strengthen:["aproducttype"]
},{
	key: "表p2053_泄漏实施LDAR信息表",
	value: ["shebei_11_1"],
	validate:[{field:"sbtotal",title:"生产装置总数"},
	          {field:"vocsbtotal",title:"涉及VOC装置"},
	          {field:"ldarsbtotal",title:"开展LDAR装置"},
	          {field:"ldarnums",title:"开展LDAR"},
	          {field:"umldarnums",title:"未开展LDAR装置"},
	          {field:"freesb",title:"豁免装置"},
	          {field:"mftotalnums",title:"动静密封点总数"},
	          {field:"unmums",title:"不可达点"}
	            
	            
	            ],
	Strengthen:["aproducttype"]
},{
	key: "表p2054_泄漏未实施LDAR信息表",
	value: ["shebei_11_2"],
	validate:[{field:"afgasnums",title:"阀:气体"},
	          {field:"aflightliquidnums",title:"阀:轻液体"},
	          {field:"afheavyiquidnums",title:"阀:重液体"},
	          {field:"ablightliquidnums",title:"泵:轻液体"},
	          {field:"abheavyiquidnums",title:"泵:重液体"},
	          {field:"aysjnums",title:"压缩机"},
	          {field:"asafefgasnums",title:"安全阀:气体"},
	          {field:"asafeflightliquidnums",title:"安全阀:轻液体"},
	          {field:"asafefheavyiquidnums",title:"安全阀:重液体"},
	          {field:"aflgasnums",title:"法兰:气体"},
	          {field:"afllightliquidnums",title:"法兰:轻液体"},
	          {field:"aflheavyiquidnums",title:"法兰:重液体"},
	          {field:"akkgxnums",title:"开口管线"},
	          {field:"acyljnums",title:"采样连接"}
	          ],
	Strengthen:["aproducttype"]
},{
	key: "表p2051_化工生产信息表",
	value: ["shebei_11","chanpin_1","ranliao_1","yjyl_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"生产线编号"},
//	          {field:"equiptype",title:"生产工艺"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"aproductname",title:"产品名称"},
	          {field:"aproductunit",title:"全年产品产量"},
	          {field:"aproducttotal",title:"产品产量单位"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"year",title:"年份"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2081_其他工业生产信息表",
	value: ["shebei_12","chanpin_1","ranliao_1","yjyl_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"生产工艺"},
	          {field:"amaterialname",title:"名称"},
	          {field:"amaterialtotal",title:"使用量"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p9011_废水处理信息表",
	value: ["shebei_13","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年废水处理量"},
	          {field:"equiptype",title:"处理方式"}],
	Strengthen:[]
},{
	key: "表p9021_固废处理信息表",
	value: ["shebei_14","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"处理方式"}],
	Strengthen:[]
},{
	key: "表p9031_烟气脱硝信息表",
	value: ["shebei_15","ranliao_3","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年燃料消耗量"},
	          {field:"equiptype",title:"烟气脱硝设施类型"},
	          {field:"fueltype",title:"燃料类型"}],
	Strengthen:[]
},{
	key: "表p7011_生物质锅炉信息表",
	value: ["shebei_16","ranliao_3","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"fueltype",title:"燃料类型"},
	          {field:"afueltotal",title:"全年燃料消费总量"},
	          {field:"equiptype",title:"设备类型"},
	         ],
	Strengthen:["equiptype"]
},{
	key: "表p4011_印刷印染信息表",
	value: ["shebei_17","chanpin_2","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"equiptype",title:"喷涂工序"},
	          {field:"year",title:"年份"}],
	Strengthen:["asolventtype"]
},{
	key: "表p4021_表面喷涂信息表",
	value: ["shebei_18","chanpin_3","feiqi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"equiptype",title:"喷涂工序"},
	          {field:"year",title:"年份"}],
	Strengthen:["asolventtype"]
},{
	key: "表p4032_干洗信息表",
	value: ["shebei_19"],
	validate:[
	          {field:"equipId",title:"设备编号"},
	          {field:"year",title:"年份"},
	          {field:"asolventC2Cl4",title:"四氯乙烯"},
	          {field:"asolventCCl4",title:"四氯化碳"},
	          
	          {field:"asolventPetroleum",title:"石油溶剂"},
	          {field:"asolventOthers",title:"其他"},
	          {field:"solventdeal",title:"处理方式"}],
	Strengthen:["asolventtype"]
},{
	key: "表p5012_畜禽养殖量信息表",
	value: ["shebei_20"],
	validate:[
	          {field:"amilkingcow",title:"奶牛"},
	          {field:"apig",title:"母猪"},
	          {field:"ahorse",title:"马"},
	          {field:"adonkey",title:"驴"},
	          {field:"amule",title:"骡"},
	          {field:"acamel",title:"骆驼"},
	          {field:"alayinghen",title:"蛋鸡"},
	          {field:"alayingduck",title:"蛋鸭"},
	          {field:"alayinggoose",title:"蛋鹅"},
	          {field:"ameatchiken",title:"肉鸡"},
	          {field:"ameatduck",title:"肉鸭"},
	          {field:"ameatgoose",title:"肉鹅"},
	          {field:"ameatcow",title:"肉牛"},
	          {field:"ameatpig",title:"肉猪"},
	          {field:"agoat",title:"山羊"},
	          {field:"asheep",title:"绵羊"}],
	Strengthen:[]
},{
	key: "表p6012_施工扬尘信息表",
	value: ["shebei_21","jidongche_1","wuran_1"],
	validate:[
	          {field:"constagetype",title:"施工类型"},
	          {field:"constage",title:"施工阶段"},
	          {field:"vehnum1",title:"1月"},
	          {field:"vehnum2",title:"2月"},
	          {field:"vehnum3",title:"3月"},
	          {field:"vehnum4",title:"4月"},
	          {field:"vehnum5",title:"5月"},
	          {field:"vehnum6",title:"6月"},
	          {field:"vehnum7",title:"7月"},
	          {field:"vehnum8",title:"8月"},
	          {field:"vehnum9",title:"9月"},
	          {field:"vehnum10",title:"10月"},
	          {field:"vehnum11",title:"11月"},
	          {field:"vehnum12",title:"12月"},
	          {field:"contype",title:"污染控制技术"}],
	Strengthen:["constage"]
},{
	key: "表p06_堆场信息表",
	value: ["shebei_22","duichang_1"],
	validate:[
	          {field:"equipId",title:"堆场编号"},
	          {field:"dctype",title:"堆场类型"},
	          {field:"dcmat",title:"堆场材料"},
	          {field:"dcaera",title:"占地面积"},
	          {field:"dcheight",title:"最高高度"},
	          {field:"dcamount",title:"日常储存量"},
	          {field:"dcmeantrans",title:"年物料运载车次"},
	          {field:"dctransamount",title:"单车运载量"},
	       ],
	Strengthen:[]
}];
//添加燃料对一个的id以及name
var hangye_year = {"表p1011_机组信息表":{"name":"燃料消费总量<br>(万吨或立方米)","year_name":"aheatfuel","list_type":"list-equipfueltype"},
		"表p02_锅炉信息表":{"name":"燃料消耗量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-equipfueltype"},
		"表p2021_熟料生产信息表":{"name":"燃料消耗量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-fueltype"},
		"表p2031_玻璃生产信息表":{"name":"燃料消耗量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-fueltype"},
		"表p2052_化纤生产信息表":{"name":"燃料消费总量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-fueltype"},
		"表p2051_化工生产信息表":{"name":"燃料消费总量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-fueltype"},
		"表p2081_其他工业生产信息表":{"name":"燃料消费总量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-fueltype"},
		"表p7011_生物质锅炉信息表":{"name":"燃料消费总量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-equipfueltype"},
		"表p05_炼焦工序信息表":{"name":"燃料消费总量<br>(万吨或立方米)","year_name":"afuel","list_type":"list-equipfueltype"}
};
//添加燃料对一个的id以及name
var hangye_year2 = {"表p2011_烧结工序信息表":{"name1":"燃料消耗量(万吨)","year_name1":"afuel","name2":"含硫量(％)","year_name2":"sulfur","list_type":"list-fueltype"},
		"表p2014_球团工序信息表":{"name1":"燃料消耗量(万吨)","year_name1":"afuel","name2":"含硫量(％)","year_name2":"sulfur","list_type":"list-fueltype"},
		"表p05_炼焦工序信息表":{"name1":"燃料消耗量(万吨)","year_name1":"afuel","name2":"含硫量(％)","year_name2":"sulfur","list_type":"list-fueltype"},
		"表p2015_轧钢信息表":{"name1":"燃料消耗量(万吨)","year_name1":"afuel","name2":"含硫量(％)","year_name2":"sulfur","list_type":"list-fueltype"},
		"表p2016_石灰石信息表":{"name1":"燃料消耗量(万吨)","year_name1":"afuel","name2":"含硫量(％)","year_name2":"sulfur","list_type":"list-fueltype"},
};
