jQuery.support.cors = true;
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	taskId=Request['taskId'];//任务ID
	version=Request['version'];//版本号
	userId=Request['userId'];//文件ID
	type = Request['type'];
	sourceId=Request['sourceId'];//文件ID
	equipId = Request['equipId'];
	fileId = Request['fileId'];
	companyId = Request['companyId'];
	listId = Request['listId'];
	id = Request['id'];
	showCompany();
})
var taskId,version,userId,sourceId,equipId,type,fileId,companyId,listId,id;//(传进来的参数)表格名称，任务ID，版本号，文件ID

//显示企业信息
function showCompany(){
	var data = ajax_async_t(BackstageIP+"dto/selectCompanyAndEquip", {
		taskId: taskId,
		companyId: userId,
		version:"1.0",
		userId:parent.dataBase.Login_map.SOLE,
		equipId:equipId,
		dataLevel :"2",
		id:id
	},"JSON","1");
	console.log(data)
	if(data != null && data !=undefined && data!=null){
//		$("#userName").text(parent.dataBase.Login_map.USER_NAME);
		$.each(data.company,function(i,column) {//循环对企业基本信息初始化
			if(typeof data.company[i]!= "undefined"){
				$("#"+i).html(data.company[i]);
			}else{
				$("#"+i).html("");
			}
		});
		$.each(data.equip, function(i, column) {//循环所有的设备---数组
			var shebei_qian = "";
			var kk = 0;
			$.each(column, function(k, vol) {//每个设备里的内容，设备本身、末端控制、在线监测等等
				if(kk == 0){//设备里第一个对象是主设备
					shebei_qian = k.substring(1,k.indexOf("_"));//截取主对象的名称进行显隐控制
					$("#"+shebei_qian+"_t").show();
				}
				console.log(k)
				if( k == "表comp01_燃料信息表" ){
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_rlxx"+p+"'>" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"totalfuel\"></a></td>" +
						"<td><a id=\"fuel1\"></a></td>" +
						"<td><a id=\"fuel2\"></a></td>" +
						"<td><a id=\"fuel3\"></a></td>" +
						"<td><a id=\"fuel4\"></a></td>" +
						"<td><a id=\"fuel5\"></a></td>" +
						"<td><a id=\"fuel6\"></a></td>" +
						"<td><a id=\"fuel7\"></a></td>" +
						"<td><a id=\"fuel8\"></a></td>" +
						"<td><a id=\"fuel9\"></a></td>" +
						"<td><a id=\"fuel10\"></a></td>" +
						"<td><a id=\"fuel11\"></a></td>" +
						"<td><a id=\"fuel12\"></a></td>" +
						"</tr>";
						$("#add_rlxx").append(kongzhi1);
						var ids=$("#add_rlxx"+" #tr_rlxx"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_rlxx"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_rlxx"+p+" #"+s).text("0");
							}
						}
					});
				}else if(k == "表comp02_产品信息表" ){
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_cpxx"+p+"'>" +
						"<td><a id=\"productname\"></a></td>" +
						"<td><a id=\"prounit\"></a></td>" +
						"<td><a id=\"producttotal\"></a></td>" +
						"<td><a id=\"product1\"></a></td>" +
						"<td><a id=\"product2\"></a></td>" +
						"<td><a id=\"product3\"></a></td>" +
						"<td><a id=\"product4\"></a></td>" +
						"<td><a id=\"product5\"></a></td>" +
						"<td><a id=\"product6\"></a></td>" +
						"<td><a id=\"product7\"></a></td>" +
						"<td><a id=\"product8\"></a></td>" +
						"<td><a id=\"product9\"></a></td>" +
						"<td><a id=\"product10\"></a></td>" +
						"<td><a id=\"product11\"></a></td>" +
						"<td><a id=\"product12\"></a></td>" +
						"</tr>";
						$("#add_cpxx_table").append(kongzhi);
						var ids=$("#add_cpxx_table"+" #tr_cpxx"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_cpxx"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_cpxx"+p+" #"+s).text("0");
							}
						}
					});
				} else if (k == "表comp03_排放口信息表"){
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_pfk"+p+"'>" +
						"<td><a id=\"pfkid\"></a></td>" +
						"<td><a id=\"pfkheight\"></a></td>" +
						"<td><a id=\"pfkdiameter\"></a></td>" +
						"<td><a id=\"pfkspeed\"></a></td>" +
						"<td><a id=\"pfkvolume\"></a></td>" +
						"<td><a id=\"pfktemperature\"></a></td>" +
						"<td><a id=\"pfkoratio\"></a></td>" +
						"<td><a id=\"installornot\"></a></td>" +
						"</tr>";
						$("#add_pfk_table").append(kongzhi);
						var ids=$("#add_pfk_table"+" #tr"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_pfk"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_pfk"+p+" #"+s).text("0");
							}
						}
					});
				} else if ( k == "表comp04_自备发电机组信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_zbfdz"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"capacity\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"enddate\"></a></td>" +
						"<td><a id=\"powertotal\"></a></td>" +
						"<td><a id=\"heattotal\"></a></td>" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"afueltotal\"></a></td>" +
						"<td><a id=\"sulfur\"></a></td>" +
						"<td><a id=\"ash\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td>" +
						"</tr>";
						$("#add_zbfdz_table").append(kongzhi);
						var ids=$("#add_zbfdz_table"+" #tr_zbfdz"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_zbfdz"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_zbfdz"+p+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp05_锅炉信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_guolu"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"boileruse\"></a></td>" +
						"<td><a id=\"capacity\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"enddate\"></a></td>" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"afueltotal\"></a></td>" +
						"<td><a id=\"sulfur\"></a></td>" +
						"<td><a id=\"ash\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td>" +
						"</tr>";
						$("#add_guolu_table").append(kongzhi);
						var ids=$("#add_guolu_table"+" #tr_guolu"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_guolu"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_guolu"+p+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp06_窑炉信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yaolu"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"enddate\"></a></td>" +
						"<td><a id=\"pfkids1\"></a></td>" +
						"<td><a id=\"pfkids2\"></a></td></tr>";
						$("#add_yaolu_table1").append(kongzhi);
						var ids=$("#add_yaolu_table1"+" #tr_yaolu"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yaolu"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_yaolu"+p+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp06_窑炉信息表v产品信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yaolu_cp"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"aproducttype\"></a></td>" +
						"<td><a id=\"aproducttotal\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td></tr>";
						$("#add_yaolu_cp_table").append(kongzhi);
						var ids=$("#add_yaolu_cp_table"+" #tr_yaolu_cp"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yaolu_cp"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_yaolu_cp"+p+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp06_窑炉信息表v原料信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yaolu_yl"+p+"'>" +
						"<td><a id=\"materialtype\"></a></td>" +
						"<td><a id=\"amaterialtotal\"></a></td>" +
						"<td><a id=\"materialsulfur\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td></tr>";
						$("#add_yaolu_yl_table").append(kongzhi);
						var ids=$("#add_yaolu_yl_table"+" #tr_yaolu_yl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yaolu_yl"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_yaolu_yl"+p+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp06_窑炉信息表v燃料信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yaolu_rl"+p+"'>" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"afueltotal\"></a></td>" +
						"<td><a id=\"sulfur\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td></tr>";
						$("#add_yaolu_rl_table").append(kongzhi);
						var ids=$("#add_yaolu_rl_table"+" #tr_yaolu_rl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yaolu_rl"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_yaolu_rl"+p+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp08_溶剂使用信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_rjsy"+p+"'>" +
						"<td><a id=\"industrytype\"></a></td>" +
						"<td><a id=\"asolventtypename\"></a></td>" +
						"<td><a id=\"asolventname\"></a></td>" +
						"<td><a id=\"solventstate\"></a></td>" +
						"<td><a id=\"asolventtotal\"></a></td>" +
						"<td><a id=\"etaVOChsname\"></a></td>" +
						"<td><a id=\"etaVOCxhname\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td>" +
						"</tr>";
						$("#add_rjsy_table").append(kongzhi);
						var ids=$("#add_rjsy_table"+" #tr_rjsy"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_rjsy"+p+" #"+s).text(d[s]);
							} else {
								if ( d[s] == 0 ) $("#tr_rjsy"+p+" #"+s).text("0");
							}
									
						}
					});
				}
//				else if ( k == "表comp09_原辅料及产品信息表" ) {
//					$.each(vol, function(p, d) {
//						var kongzhi = "<tr class=\"zhong\" id='tr1'>" +
//						"<td><a id=\"equipId\"></a></td>" +
//						"<td><a id=\"equiptype\"></a></td>" +
//						"<td><a id=\"startdate\"></a></td>" +
//						"<td><a id=\"materialtype\"></a></td>" +
//						"<td><a id=\"materialunit\"></a></td>" +
//						"<td><a id=\"amaterialtotal\"></a></td>" +
//						"<td><a id=\"pfkids\"></a></td>" +
//						"</tr>";
//						var kongzhi1 = "<tr class=\"zhong\" id='tr2'>" +
//						"<td><a id=\"fulmaterialname\"></a></td>" +
//						"<td><a id=\"fulmaterialunit\"></a></td>" +
//						"<td><a id=\"afulmaterialtotal\"></a></td>" +
//						"<td><a id=\"aproducttype\"></a></td>" +
//						"<td><a id=\"productunit\"></a></td>" +
//						"<td><a id=\"aproducttotal\"></a></td>" +
//						"</tr>";
//						$("#add_yfl_table1").append(kongzhi);
//						var ids=$("#add_yfl_table1"+" a").map(function(){return this.id}).get();
//						for(var i=0;i<ids.length;i++){
//							var s=ids[i];
//								if(d[s])
//									$("#"+s).text(d[s]);
//						}
//						$("#add_yfl_table2").append(kongzhi1);
//						var ids1=$("#add_yfl_table2"+" a").map(function(){return this.id}).get();
//						for(var i=0;i<ids1.length;i++){
//							var s=ids1[i];
//								if(d[s])
//									$("#"+s).text(d[s]);
//						}
//					});
//				}
				else if ( k == "表comp09_原辅料及产品信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yfl"+p+"''>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td>" +
						"</tr>";
						$("#add_yfl_table1").append(kongzhi);
						var ids=$("#add_yfl_table1"+" #tr_yfl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yfl"+p+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_yfl"+p+" #"+s).text("0");
							}
									
						}
					});
				}else if ( k == "表comp09_原辅料及产品信息表v产品信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yfl_cp"+p+"'>" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"<td><a id=\"aproducttype\"></a></td>" +
						"<td><a id=\"productunit\"></a></td>" +
						"<td><a id=\"aproducttotal\"></a></td>" +
						"<td><a id=\"equipId\"></a></td>" +
						"</tr>";
						$("#add_yfl_cp_table").append(kongzhi);
						var ids=$("#add_yfl_cp_table"+" #tr_yfl_cp"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yfl_cp"+p+" #"+s).text(d[s]);
							} else {
								if(d[s] == 0 ){$("#tr_yfl_cp"+p+" #"+s).text("0")}
							}
						}
					});
				}else if ( k == "表comp09_原辅料及产品信息表v原料信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yfl_yl"+p+"'>" +
						"<td><a id=\"materialtype\"></a></td>" +
						"<td><a id=\"materialunit\"></a></td>" +
						"<td><a id=\"amaterialtotal\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"</tr>";
						$("#add_yfl_yl_table").append(kongzhi);
						var ids=$("#add_yfl_yl_table"+" #tr_yfl_yl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_yfl_yl"+p+" #"+s).text(d[s]);
							}else {
								if(d[s] == 0 ){$("#tr_yfl_yl"+p+" #"+s).text("0")}
							}
									
						}
					});

				}else if ( k == "表comp09_原辅料及产品信息表v辅料信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yfl_fl"+p+"'>" +
						"<td><a id=\"fulmaterialname\"></a></td>" +
						"<td><a id=\"fulmaterialunit\"></a></td>" +
						"<td><a id=\"afulmaterialtotal\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"</tr>";
						$("#add_yfl_fl_table").append(kongzhi);
						var ids=$("#add_yfl_fl_table"+" #tr_yfl_fl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_yfl_fl"+p+" #"+s).text(d[s]);
							}else {
								if(d[s] == 0 ){$("#tr_yfl_fl"+p+" #"+s).text("0")}
							}
						}
					});
				}else if ( k == "表comp10_有机液体储罐信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yjytcg"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"volume\"></a></td>" +
						"<td><a id=\"height\"></a></td>" +
						"<td><a id=\"diameter\"></a></td>" +
						"<td><a id=\"component\"></a></td>" +
						"<td><a id=\"inoutnums\"></a></td>" +
						"</tr>";
						$("#add_yjytcg_table").append(kongzhi);
						var ids=$("#add_yjytcg_table"+" #tr_yjytcg"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_yjytcg"+p+" #"+s).text(d[s]);
							}else {
								if(d[s] == 0 ){$("#tr_yjytcg"+p+" #"+s).text("0")}
							}
						}
					});
				}else if ( k == "表comp11_有机液体装载信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yjytzz"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"materialname\"></a></td>" +
						"<td><a id=\"zztype\"></a></td>" +
						"<td><a id=\"zzway\"></a></td>" +
						"<td><a id=\"zzamount\"></a></td>" +
						"<td><a id=\"density\"></a></td>" +
						"<td><a id=\"recover\"></a></td>" +
						"</tr>";
						$("#add_yjytzz_table").append(kongzhi);
						var ids=$("#add_yjytzz_table"+" #tr_yjytzz"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_yjytzz"+p+" #"+s).text(d[s]);
							}else {
								if(d[s] == 0 ){$("#tr_yjytzz"+p+" #"+s).text("0")}
							}
						}
					});
				}else if ( k == "表comp12_露天堆场信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_ltdc"+p+"'>" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"dctype\"></a></td>" +
						"<td><a id=\"dcmat\"></a></td>" +
						"<td><a id=\"dcaera\"></a></td>" +
						"<td><a id=\"dcheight\"></a></td>" +
						"<td><a id=\"dcamount\"></a></td>" +
						"<td><a id=\"dcmeantrans\"></a></td>" +
						"<td><a id=\"dctransamount\"></a></td>" +
						"<td><a id=\"dustcontrol\"></a></td>" +
						"</tr>";
						$("#add_ltdc_table").append(kongzhi);
						var ids=$("#add_ltdc_table"+" #tr_ltdc"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_ltdc"+p+" #"+s).text(d[s]);
							}else {
								if(d[s] == 0 ){$("#tr_ltdc"+p+" #"+s).text("0")}
							}
						}
					});
				}else if ( k == "表comp04_自备发电机组信息表v表comp07_末端控制措施信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_zbfdz_md"+p+"er'>" +
						"<td><a id=\"etaSO2name\"></a></td>" +
						"<td><a id=\"etaSO2hours\"></a></td>" +
						"<td><a id=\"etaSO2\"></a></td>" +
						"<td><a id=\"equipIdso2\"></a></td>" +
						"<td><a id=\"etaNOxname\"></a></td>" +
						"<td><a id=\"etaNOxhours\"></a></td>" +
						"<td><a id=\"etaNOx\"></a></td>" +
						"<td><a id=\"equipIdnox\"></a></td>" +
						"<td><a id=\"etaPMname\"></a></td>" +
						"<td><a id=\"jiqiratio\"></a></td>" +
						"<td><a id=\"etaPM\"></a></td>" +
						"<td><a id=\"equipIdpm\"></a></td>" +
						"</tr>";
						$("#add_zbfdz_md_table").append(kongzhi);
						var ids=$("#add_zbfdz_md_table #tr_zbfdz_md"+p+"er"+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_zbfdz_md"+p+"er"+" #"+s).text(d[s]);
							} else {
								if ( d[s] == 0 ) $("#tr_zbfdz_md"+p+"er"+" #"+s).text("0");
							}
									
						}
					});
				}else if ( k == "表comp05_锅炉信息表v表comp07_末端控制措施信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_guolu_md"+p+"er'>" +
						"<td><a id=\"etaSO2name\"></a></td>" +
						"<td><a id=\"etaSO2hours\"></a></td>" +
						"<td><a id=\"etaSO2\"></a></td>" +
						"<td><a id=\"equipIdso2\"></a></td>" +
						"<td><a id=\"etaNOxname\"></a></td>" +
						"<td><a id=\"etaNOxhours\"></a></td>" +
						"<td><a id=\"etaNOx\"></a></td>" +
						"<td><a id=\"equipIdnox\"></a></td>" +
						"<td><a id=\"etaPMname\"></a></td>" +
						"<td><a id=\"jiqiratio\"></a></td>" +
						"<td><a id=\"etaPM\"></a></td>" +
						"<td><a id=\"equipIdpm\"></a></td>" +
						"</tr>";
						$("#add_guolu_md_table").append(kongzhi);
						var ids=$("#add_guolu_md_table #tr_guolu_md"+p+"er"+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_guolu_md"+p+"er"+" #"+s).text(d[s]);
							} else {
								if(d[s] == 0) $("#tr_guolu_md"+p+"er"+" #"+s).text("0");
							}
						}
					});
				}else if ( k == "表comp06_窑炉信息表v表comp07_末端控制措施信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yaolu_md"+p+"er'>" +
						"<td><a id=\"etaSO2name\"></a></td>" +
						"<td><a id=\"equipIdso2\"></a></td>" +
						"<td><a id=\"etaSO2\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td>" +
						"<td><a id=\"etaNOxname\"></a></td>" +
						"<td><a id=\"equipIdnox\"></a></td>" +
						"<td><a id=\"etaNOx\"></a></td>" +
						"<td><a id=\"pfkids\"></a></td>" +
						"<td><a id=\"etaPMname\"></a></td>" +
						"<td><a id=\"jiqiratio\"></a></td>" +
						"<td><a id=\"etaPM\"></a></td>" +
						"<td><a id=\"equipIdpm\"></a></td>" +
						"</tr>";
						$("#add_yaolu_md_table").append(kongzhi);
						var ids=$("#add_yaolu_md_table #tr_yaolu_md"+p+"er"+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]){
								$("#tr_yaolu_md"+p+"er"+" #"+s).text(d[s]);
							} else {
								if (d[s] == 0 ) $("#tr_yaolu_md"+p+"er"+" #"+s).text("0");
							}
									
						}
					});
				}else if ( k == "表comp09_原辅料及产品信息表v表comp07_末端控制措施信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr class=\"zhong\" id='tr_yfl_md"+p+"er'>" +
						"<td><a id=\"etaSO2name\"></a></td>" +
						"<td><a id=\"etaSO2hours\"></a></td>" +
						"<td><a id=\"etaSO2\"></a></td>" +
						"<td><a id=\"equipIdso2\"></a></td>" +
						"<td><a id=\"etaVOChsname\"></a></td>" +
						"<td><a id=\"equipIdvochs\"></a></td>" +
						"<td><a id=\"etaVOCxhname\"></a></td>" +
						"<td><a id=\"equipIdvocxh\"></a></td>" +
						"<td><a id=\"etaPMname\"></a></td>" +
						"<td><a id=\"jiqiratio\"></a></td>" +
						"<td><a id=\"etaPM\"></a></td>" +
						"<td><a id=\"equipIdpm\"></a></td>" +
						"</tr>";
						$("#add_yfl_md_table").append(kongzhi);
						var ids=$("#add_yfl_md_table #tr_yfl_md"+p+"er"+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) {
								$("#tr_yfl_md"+p+"er"+" #"+s).text(d[s]);
							} else {
								if ( d[s] == 0 ) $("#tr_yfl_md"+p+"er"+" #"+s).text("0");
							}
									
						}
					});
				}
				kk++;
			});
		});
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
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
