jQuery.support.cors = true;
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	taskId=Request['taskId'];//任务ID
	version=Request['version'];//版本号
	userId=Request['userId'];//文件ID
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
		dataLevel :"1",
		id:id
	},"JSON","1");
	console.log(data)
	if(data != null && data !=undefined && data!=null){
		
		
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
				if( k == "表simp01_产品生产信息表" ){
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_sccp"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"equiptype\"></a></td>" +
						"<td><a id=\"pfkheight\"></a></td>" +
						"</tr>";
						//脱硫设备
						
						$("#add_sccp_table1").append(kongzhi);
						
						var ids=$("#add_sccp_table1"+" #tr_sccp"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#tr_sccp"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_sccp"+p+" #"+s).text("0");
						}
					
					});
				} else if ( k == "表simp01_产品生产信息表v产品信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_sccp_cp"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"aproducttype\"></a></td>" +
						"<td><a id=\"aproducttotal\"></a></td>" +
						"<td><a id=\"productunit\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"</tr>";
						//脱硫设备
						$("#add_sccp_cp_table").append(kongzhi);
						var ids=$("#add_sccp_cp_table"+" #tr_sccp_cp"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#tr_sccp_cp"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_sccp_cp"+p+" #"+s).text("0");
						}
					
					});
				}else if ( k == "表simp01_产品生产信息表v原料信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_sccp_yl"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"materialtype\"></a></td>" +
						"<td><a id=\"amaterialtotal\"></a></td>" +
						"<td><a id=\"materialunit\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"</tr>";
						//脱硫设备
						$("#add_sccp_yl_table").append(kongzhi);
						var ids=$("#add_sccp_yl_table"+" #tr_sccp_yl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#tr_sccp_yl"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_sccp_yl"+p+" #"+s).text("0");
						}
					
					});
				}else if ( k == "表simp01_产品生产信息表v燃料信息" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_sccp_rl"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"aheatfueltotal\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"</tr>";
						//脱硫设备
						$("#add_sccp_rl_table").append(kongzhi);
						var ids=$("#add_sccp_rl_table"+" #tr_sccp_rl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s]) $("#tr_sccp_rl"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_sccp_rl"+p+" #"+s).text("0");
						}
					
					});
				}else if ( k == "表simp01_产品生产信息表v治理措施" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_sccp_zl"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"bigIndex\"></a></td>" +
						"<td><a id=\"etaSO2name\"></a></td>" +
						"<td><a id=\"etaPMname\"></a></td>" +
						"</tr>";
						//脱硫设备
						$("#add_sccp_zl_table").append(kongzhi);
						var ids=$("#add_sccp_zl_table"+" #tr_sccp_zl"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#tr_sccp_zl"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_sccp_zl"+p+" #"+s).text("0");
						}
					});
				}else if(k == "表simp02_锅炉信息表" ){
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"trguolu"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"capacity\"></a></td>" +
						"<td><a id=\"startdate\"></a></td>" +
						"<td><a id=\"enddate\"></a></td>" +
						"<td><a id=\"fueltype\"></a></td>" +
						"<td><a id=\"aheatfueltotal\"></a></td>" +
						"<td><a id=\"fuelunit\"></a></td>" +
						"<td><a id=\"etaSO2name\"></a></td>" +
						"<td><a id=\"etaPMname\"></a></td>" +
						"<td><a id=\"pfkheight\"></a></td>" +
						"</tr>";
						$("#add_guolu_table").append(kongzhi);
						var ids=$("#add_guolu_table"+" #trguolu"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#trguolu"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#trguolu"+p+" #"+s).text("0");
						}
					});
				} else if (k == "表simp04_溶剂使用信息表"){
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_yjrj"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"asolventtypename\"></a></td>" +
						"<td><a id=\"asolventname\"></a></td>" +
						"<td><a id=\"solventstate\"></a></td>" +
						"<td><a id=\"asolventtotal\"></a></td>" +
						"<td><a id=\"etaVOCname\"></a></td>" +
						"</tr>";
						$("#add_yjrj_table").append(kongzhi);
						var ids=$("#add_yjrj_table"+" #tr_yjrj"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#tr_yjrj"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_yjrj"+p+" #"+s).text("0");
						}
					});
				} else if ( k == "表simp03_露天堆场信息表" ) {
					$.each(vol, function(p, d) {
						var kongzhi = "<tr id=\"tr_lydc"+p+"\" class=\"zhong\"  height=\"35px\">" +
						"<td><a id=\"equipId\"></a></td>" +
						"<td><a id=\"dctype\"></a></td>" +
						"<td><a id=\"dcmat\"></a></td>" +
						"<td><a id=\"dcheight\"></a></td>" +
						"<td><a id=\"dcaera\"></a></td>" +
						"<td><a id=\"dcamount\"></a></td>" +
						"<td><a id=\"dcmeantrans\"></a></td>" +
						"<td><a id=\"dctransamount\"></a></td>" +
						"<td><a id=\"dustcontrol\"></a></td>" +
						"</tr>";
						$("#add_lydc_table").append(kongzhi);
						var ids=$("#add_lydc_table"+" #tr_lydc"+p+" a").map(function(){return this.id}).get();
						for(var i=0;i<ids.length;i++){
							var s=ids[i];
							if(d[s])$("#tr_lydc"+p+" #"+s).text(d[s]);
							else if (d[s] == 0 ) $("#tr_lydc"+p+" #"+s).text("0");
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
