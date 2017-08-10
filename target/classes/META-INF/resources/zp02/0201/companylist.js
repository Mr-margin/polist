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
	showCompany();
})
var taskId,version,userId,sourceId,equipId,type,fileId,companyId,listId;//(传进来的参数)表格名称，任务ID，版本号，文件ID

//显示企业信息
function showCompany(){
	var data ="";
	if ( type == "1" ) {
		data = ajax_async_t(BackstageIP+"taskProvince/selectCompanyAndEquip", {
			taskId: taskId,
			userId: userId,
			version:"1.0",
			
			fileId:fileId,
			companyId:companyId,
			listId:listId,
			equipId:parent.fu_equipId,
			source:sourceId,
		},"JSON","1");
		console.log(data);
	} else {
		data = ajax_async_t(BackstageIP+"dto/selectCompanyAndEquip", {
			taskId: taskId,
			companyId: userId,
			version:"1.0",
			userId:parent.dataBase.Login_map.SOLE,
//			sourceId:sourceId,
			equipId:equipId
		},"JSON","1");
		console.log(data)
	}
	if(data != null && data !=undefined && data!=null){
		var industrytype = data.company.industrytype;
		if (industrytype == "民航飞机") {
			$("#p00 #gongyeshebei").hide();//设备信息隐藏
			$("#p00 #canyin").hide();//餐饮
			$("#p00 #jiayouzhan").hide();//加油站
			$("#p00 #nian_title").hide();//年生产总值
			$("#p00 #nian_count").hide();//年生产总值
			$("#p00 #qijiang_title").show();//起降架次
			$("#p00 #qijiang_count").show();//起降架次
		}else if (industrytype == "油气储运") {
			$("#p00 #gongyeshebei").hide();//设备信息隐藏
			$("#p00 #canyin").hide();//餐饮
			$("#p00 #jiayouzhan").show();//加油站
			$("#p00 #nian_title").hide();//年生产总值
			$("#p00 #nian_count").hide();//年生产总值
			$("#p00 #qijiang_title").hide();//起降架次
			$("#p00 #qijiang_count").hide();//起降架次
		}else if (industrytype == "餐饮油烟") {
			$("#p00 #gongyeshebei").hide();//设备信息隐藏
			$("#p00 #jiayouzhan").hide();//加油站
			$("#p00 #canyin").show();//餐饮
			$("#p00 #nian_title").hide();//年生产总值
			$("#p00 #nian_count").hide();//年生产总值
			$("#p00 #qijiang_title").hide();//起降架次
			$("#p00 #qijiang_count").hide();//起降架次
		}else if (industrytype == "畜禽养殖") {
			$("#p00 #gongyeshebei").hide();//设备信息隐藏
			$("#p00 #canyin").hide();//餐饮
			$("#p00 #jiayouzhan").hide();//加油站
			$("#p00 #nian_title").hide();//年生产总值
			$("#p00 #nian_count").hide();//年生产总值
			$("#p00 #qijiang_title").hide();//起降架次
			$("#p00 #qijiang_count").hide();//起降架次
			
		}else if (industrytype == "其它溶剂使用") {
			$("#p00 #gongyeshebei").hide();//设备信息隐藏
			$("#p00 #canyin").hide();//餐饮
			$("#p00 #jiayouzhan").hide();//加油站
			$("#p00 #nian_title").hide();//年生产总值
			$("#p00 #nian_count").hide();//年生产总值
			$("#p00 #qijiang_title").hide();//起降架次
			$("#p00 #qijiang_count").hide();//起降架次
			
		}else if (industrytype == "施工扬尘") {
			$("#p00 #gongyeshebei").hide();//设备信息隐藏
			$("#p00 #canyin").hide();//餐饮
			$("#p00 #jiayouzhan").hide();//加油站
			$("#p00 #nian_title").hide();//年生产总值
			$("#p00 #nian_count").hide();//年生产总值
			$("#p00 #qijiang_title").hide();//起降架次
			$("#p00 #qijiang_count").hide();//起降架次
			
		}else{
			$("#p00 #gongyeshebei").show();//设备信息
			$("#p00 #canyin").hide();//餐饮
			$("#p00 #jiayouzhan").hide();//加油站
			$("#p00 #nian_title").show();//年生产总值
			$("#p00 #nian_count").show();//年生产总值
			$("#p00 #qijiang_title").hide();//起降架次
			$("#p00 #qijiang_count").hide();//起降架次
		}
		
		$.each(data.company,function(i,column) {//循环对企业基本信息初始化
//			$("#p00 #"+i).html(data.company[i]);
			if(typeof data.company[i]!= "undefined"){
				$("#p00 #"+i).html(data.company[i]);
			}else{
				$("#p00 #"+i).html("");
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
				if(k.indexOf("末端控制设备信息表")>0){
					$("#"+shebei_qian+" #moduankongzhi_1").show();//末端控制设备页面打开
					$.each(vol, function(p, d) {
						if(typeof d.etaSO2name != "undefined"){//脱硫设备
							var kongzhi = "<tr class=\"zhong\" id='tr1'>" +
										"<td><a id=\"etaSO2name\"></a></td>" +
										"<td><a id=\"etaSO2agentname\"></a></td>" +
										"<td><a id=\"etaSO2agentamount\"></a></td>" +
										"<td><a id=\"etaSO2bypass\"></a></td>" +
										"<td><a id=\"etaSO2eta\"></a></td>" +
										"<td><a id=\"etaSO2ratio\"></a></td>" +
										"<td><a id=\"etaSO2startdate\"></a></td>" +
										"<td><a id=\"etaSO2enddate\"></a></td>" +
										"</tr>";
							$("#"+shebei_qian+" #tl_table").append(kongzhi);
							$("#"+shebei_qian+" #tl_table").show();
							var ids=$("#"+shebei_qian+" #tl_table"+" a").map(function(){return this.id}).get();
							for(var i=0;i<ids.length;i++){
								var s=ids[i];
									if(d[s])
										$("#"+s).text(d[s]);
							}
						}else if(typeof d.etaNOxname != "undefined"){//脱硝设备
							var kongzhi = "<tr class=\"zhong\">" +
										"<td><a id=\"etaNOxname\"></a></td>" +
										"<td><a id=\"etaNOxagentname\"></a></td>" +
										"<td><a id=\"etaNOxagentamount\"></a></td>" +
										"<td><a id=\"etaNOxeta\"></a></td>" +
										"<td><a id=\"etaNOxratio\"></a></td>" +
										"<td><a id=\"etaNOxstartdate\"></a></td>" +
										"<td><a id=\"etaNOxenddate\"></a></td>" +
										"</tr>";
							$("#"+shebei_qian+" #tx_table").append(kongzhi);
							$("#"+shebei_qian+" #tx_table").show();
							var ids=$("#"+shebei_qian+" #tx_table"+" a").map(function(){return this.id}).get();
							for(var i=0;i<ids.length;i++){
								var s=ids[i];
								if(d[s])	
									$("#"+s).text(d[s]);
							}
						}else if(typeof d.etaNOxxname != "undefined"){//低氮燃烧
							var kongzhi = "<tr class=\"zhong\">" +
										"<td><a id=\"etaNOxxname\"></a></td>" +
										"<td><a id=\"etaNOxxeta\"></a></td>" +
										"<td><a id=\"etaNOxxratio\"></a></td>" +
										"<td><a id=\"etaNOxxstartdate\"></a></td>" +
										"<td><a id=\"etaNOxxenddate\"></a></td>" +
										"</tr>";
							$("#"+shebei_qian+" #dd_table").append(kongzhi);
							$("#"+shebei_qian+" #dd_table").show();
							var ids=$("#"+shebei_qian+" #dd_table"+" a").map(function(){return this.id}).get();
							for(var i=0;i<ids.length;i++){
								var s=ids[i];
								if(d[s])
									$("#"+s).text(d[s]);
							}
						}else if(typeof d.etaPMname != "undefined"){//除尘设备
							var kongzhi = "<tr class=\"zhong\">" +
									"<td><a id=\"etaPMname\"></a></td>" +
									"<td><a id=\"etaPMeta\"></a></td>" +
									"<td><a id=\"etaPMratio\"></a></td>" +
									"<td><a id=\"etaPMstartdate\"></a></td>" +
									"<td><a id=\"etaPMenddate\"></a></td>" +
									"</tr>";
							$("#"+shebei_qian+" #cc_table").append(kongzhi);
							$("#"+shebei_qian+" #cc_table").show();
							var ids=$("#"+shebei_qian+" #cc_table"+" a").map(function(){return this.id}).get();
							for(var i=0;i<ids.length;i++){
								var s=ids[i];
								if(d[s])
									$("#"+s).text(d[s]);
							}
						}
					});
				}else if(k.indexOf("在线监测信息表")>0){
					$("#"+shebei_qian+" #zaixianjiance_1").show();//在线监测页面打开
					$.each(vol[0], function(m, v1) {
						if(m == "installornot"){
							if(vol[0][m] == "是"){
								$("#"+shebei_qian+" #zx_conter1").show();
								$("#"+shebei_qian+" #zx_conter2").show();
								$("#"+shebei_qian+" #zx_conter3").show();
								$("#"+shebei_qian+" #zx_conter4").show();
								$("#"+shebei_qian+" #anzhuang1").show();
								$("#"+shebei_qian+" #anzhuang2").show();
								$("#"+shebei_qian+" #anzhuang3").show();
								$("#"+shebei_qian+" #anzhuang4").show();
								$("#"+shebei_qian+" #weianzhuang1").hide();
								$("#"+shebei_qian+" #weianzhuang2").hide();
								$("#"+shebei_qian+" #weianzhuang3").hide();
								$("#"+shebei_qian+" #weianzhuang4").hide();
							}
						}
						if(typeof vol[0][m]!= "undefined"){
							$("#"+shebei_qian+" #"+m).html(vol[0][m]);
						}else{
							$("#"+shebei_qian+" #"+m).html("");
						}
					});
				} else if (k.indexOf("表p10012_餐饮业信息表") == 0){
					$("#ahours").html(vol[0].ahours);
					$("#contype1").html(vol[0].contype);
					$("#acooknums").html(vol[0].acooknums);
					$("#agasspeed").html(vol[0].agasspeed);
					$("#conratio1").html(vol[0].conratio);
					
				} else if ( k.indexOf("表p8012_加油站信息表") == 0 ) {
					$("#agasolinesale").html(vol[0].agasolinesale);
					$("#contype").html(vol[0].contype);
					$("#adieselsale").html(vol[0].adieselsale);
					$("#conratio").html(vol[0].conratio);
				} else if ( k.indexOf("表p3032_机场信息表") == 0 ) {
					$("#qijiang_count").html(vol[0].aflynums);
				}else{
					$.each(vol[0], function(m, v1) {
						if(m == "cogenerationornot"){
							if(vol[0][m] == "是"){
								$("#"+shebei_qian+" #hotd1").show();
								$("#"+shebei_qian+" #hotd2").show();
							}
						}
//						$("#"+shebei_qian+" #"+m).html(vol[0][m]);
						if(typeof vol[0][m]!= "undefined"){
							$("#"+shebei_qian+" #"+m).html(vol[0][m]);
						}else{
							$("#"+shebei_qian+" #"+m).html("");
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
