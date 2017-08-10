jQuery.support.cors = true;
var yuan_str = ["电力","工业锅炉","民用源","玻璃","独立焦化","钢铁","化工化纤","水泥","其它工业企业","机动车","飞机","船舶","非道移机械","工业喷涂","建筑涂料","印刷印染","农药使用","其它溶剂使用","氮肥施用","固氮植物","秸秆堆肥","人体粪便","畜禽养殖","土壤本底","道路扬尘","堆场扬尘","施工扬尘","土壤扬尘","加油站","油气储存","油气输送","生物质燃料","生物质开放燃烧","废水处理","固废处理","烟气脱硝","餐饮油烟"]
var show_str='';
var flag=true;
var level='';
var dataBase = parent.dataBase;
$(function(){
	var Request = new Object();//截取URL的方法
	Request = GetRequest();
	parameter=Request['par'];
	show_str = yuan_str [parseInt(parameter)-1];
	level=dataBase.Login_map.TYPE;
	up_select();//赋值下拉框的选项
})

var parameter;//传进来的参数
var iJson;//39个排放源数据
var version = "1.0";//版本号
var taskId;//任务ID
var myChart_1,myChart_2,myChart_3,myChart_4;

var dataAll;//表格数据

//调用父页面的全局变量


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

function dt_init(){
	var html = "";
	$("#dt").html("");
	for(var y=0; y<data_types.length; y++){
		html += "<div class='radio radio-info radio-inline'>";
		html += "<input type='radio' id='"+data_types[y].id+"' value='"+data_types[y].type+"' name='hy_name' onclick='changesource();'";
		if(y == 0){
			html += "checked='checked'";
		}
		html += ">";
		html += "<label for='"+data_types[y].id+"'>"+data_types[y].type+"</label>";
		html += "</div>";
	}
	$("#dt").html(html);
	changesource();
}

var global_data;
var data_types=[];
var section_data;
//赋值下拉框的选项
var data_level='';
function up_select(){
	if(level=='4'){
		var data = ajax_async_t(BackstageIP+"taskDataFillChild/cityUser/listSimpleTask",{version:"1.0",userType:dataBase.Login_map.TYPE,userId:dataBase.Login_map.SOLE},"JSON","1");//获取表头数据
		if(data!=undefined&&data!=null&data!=""){
			if(data.data.length<1){
				toastr["info"]("提示", "当前用户没有查到任务");
				return;
			}
			data_level=data;
			var data_up_sel='';
			var dept='';
			for(var i=0;i<data.data.length;i++){
				data_up_sel+="<option value="+data.data[i].id+">"+data.data[i].name+"</option>";
			}
			$("#data_up_sel").html(data_up_sel);
			for(var i=0;i<data.data.length;i++){
				if($("#data_up_sel option:selected").text()==data.data[i].name){
					for(prop in data.data[i].object){
						dept+="<option value="+prop+">"+prop+"</option>";
					}
					$("#paifangjisuanqu_sel").html(dept);
				}
			}
			var industry='';
			for(var i=0;i<data.data.length;i++){
				if($("#data_up_sel option:selected").text()==data.data[i].name){
					for(prop in data.data[i].object){
						if($("#paifangjisuanqu_sel option:selected").text()==prop){
							for(var j=0;j<data.data[i].object[prop].length;j++){
								industry+="<option value="+data.data[i].object[prop][j].ID+">"+data.data[i].object[prop][j].SCC2+"</option>";
							}
							$("#paifangyuan_sel").html(industry);
						}
					}
				}
			}
			html_value();
		}
	}else if(level=='6'){
		var data = ajax_async_t(BackstageIP+"taskDataFillChild/cityUser/listSimpleTask",{version:"1.0",sourceId:$("#paifangyuan_sel").val(),userType:dataBase.Login_map.TYPE,userId:dataBase.Login_map.SOLE},"JSON","1");//获取表头数据
	if(data != undefined){
		if(data.status == "success"){
			global_data=data.data;
			if(data.data.length == 0){
				$("#data_up_sel").html(null);
				$(".panel-heading").hide();		//数据长度为0时，隐藏数据上传列表
				parent.findtab($("#paifangyuan_sel").find("option:selected").text());	//调用父页面函数执行右上角的弹窗提示
			}else{
				var html = "";
				var html1 ="";
				var html2 ="";
				$("#paifangjisuanqu_sel").html("");
				$("#paifangyuan_sel").html("");
				if(data.data.length > 0){
					for(var i=0; i<data.data.length; i++){
						html += "<option value='"+data.data[i].id+"'>"+data.data[i].name+"</option>";
					}
					$("#data_up_sel").html(html);
					var d=data.data[0];
					var num=0;
					section_data=d.object;
					for(prop in d.object){
						html1+="<option value='"+prop+"'>"+prop+"</option>"
						num++;
						if(num==1)
						{
							var tem=d.object[prop];
							for(var i=0;i<tem.length;i++){
								html2 += "<option value='"+tem[i].ID+"'>"+tem[i].SCC2+"</option>";
							}
						}
					}
					$("#paifangjisuanqu_sel").html(html1);
					$("#paifangyuan_sel").html(html2);
					taskId = data.data[0].id;
					
				}	
					if(level=="6"){
						$('#data_type').show();
						data_types = data.data[0].list;
						dt_init();
						
					}else{
						html_value();
					}
					//为页面赋值
					
				}
			}
		}else{
			toastr["info"]("错误信息", data.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//准备上传
function up_begin(dml){
	//打开隐藏的标题
	$(".modal-title").show();
	$("#mod_head_1").show();
	$("#mod_head_2").hide();//上传中
	$("#ImportForm").show();
	$("#ImportForm_2").hide();
	$("#modal_foot").show();

	var html ="";
	if(dml=="p"){
		//*[@id="show_save"]/div/div/div[3]/input
		html="<button type='button' class='btn btn-info' onclick=\"shangchuan('ps','p');\">上传</button>";
	}else if(dml=="s"){
		html="<button type='button' class='btn btn-info' onclick=\"shangchuan('ss','s');\">上传</button>";
	}else if(dml=="e"){
		html="<button type='button' class='btn btn-info' onclick=\"shangchuan('ep','l');\">上传</button>";
	}else{
		html="<button type='button' class='btn btn-info' onclick=\"shangchuan('es','l');\">上传</button>";
	}
	html += "<button type='button' class='btn btn-white' data-dismiss='modal'>关闭</button>";
	$("#modal_foot").html(html);
	$("#Import_modal").modal();
}

//点击上传按钮
function shangchuan(dml,dml_2){
	var dt=$("#paifangyuan_sel").val();
	if(level=="6"){
		dt=$("input[name='hy_name']:checked")[0].id;
		var dtName=$("input[name='hy_name']:checked").val();
		if(dt=="1000"){
			dt=$("#paifangyuan_sel").val();
		}
	}
	
	taskId=$("#data_up_sel").val();
	$("#mod_head_1").hide();
	$("#mod_head_2").show();
	$("#ImportForm").hide();
	$("#modal_foot").hide();
	$.ajaxFileUpload({
		//taskId 填报任务编号，version 版本,bigIndex 行业类别，description 文件描述,file Excel上传文件
		url: BackstageIP+'file/uploadData?sourceId='+dt+'&taskId='+taskId+'&region='+dataBase.Login_map.REGION+"&userType="+level+'&dataType='+dml+'&version='+version+'&description=上传文件&userId='+dataBase.Login_map.SOLE, //用于文件上传的服务器端请求地址
		secureuri: false, //是否需要安全协议，一般设置为false
		fileElementId: 'file', //文件上传域的ID
		dataType: 'json', //返回值类型 一般设置为json
		success: function (data, status)  //服务器成功响应处理函数
		{
			if(data != undefined&&data!=null&&data!=""){
				if(data.status == "success"){
					$("#Import_modal").modal("hide");
					if(level=="6"){
						html_value1();
					}else{
						html_value();
					}
					
					swal({
						title: "上传成功",
						text: "成功上传",
						type: "success"
							//+iJson[parseInt(parameter)-1]["data_"+dml_2]
					});
				}else{
					if(data.code == "2001"){
						//隐藏标题
						$(".modal-title").hide();
						var html = "<button type='button' class='btn btn-warning' data-dismiss='modal'>关闭</button>";
						$("#modal_foot").html(html);
						$("#modal_foot").show();
						$("#ImportForm").hide();
						$("#ImportForm_2").html("<p style='text-align: center;'><strong style='color:red;'>上传文件数据格式错误，请下载错误报告。</strong></p><br>" +
								"<p style='text-align: center;'>" +
								"<a href='"+BackstageIP+data.data+"' style='text-decoration:underline;' target=_blank>点击下载错误报告</a></p>");
						$("#ImportForm_2").show();
					}else if(data.code == "2000"){
						$("#Import_modal").modal("hide");
						swal({
							title: "上传失败",
							text: data.error,
							type: "error"
						});
					}else{
						$("#Import_modal").modal("hide");
						swal({
							title: "上传失败",
							text: data.error,
							type: "error"
						});
					}
				}
			}else{
				toastr["info"]("提示","无返回值")
			}
		},
		error: function (data, status, e)//服务器响应失败处理函数
		{
			$("#Import_modal").modal("hide");
			swal({
				title: "上传失败",
				text: "网络错误",
				type: "error"
			});
		}
	});
}

//为页面中的显示任务列表，部分表格进行赋值  市填报用户
function html_value(){
	
	var html = "";
	//表头
	html += "<tr>";
	html +=	"<th style='text-align: center; width:14%;padding:0;'>文件类型</th>" +
	"<th style='text-align: center; width:14%;padding:0;'>模板下载</th>" +
	"<th style='text-align: center; width:10%;'>上传</th>" +
	"<th style='text-align: center; width:30%;'>文件名称</th>" +
	"<th style='text-align: center; width:12%;'>状态</th>" +
	"<th style='text-align: center; width:20%;'>操作</th></tr>";
	$("#sj_tbody").html("");
	dataAll = ajax_async_t(BackstageIP+"file/list.do",{sourceId:$("#paifangyuan_sel").val(),userType:level,taskId:$("#data_up_sel").val(),version:version},"json","1","POST");
	if(dataAll != null&&dataAll!=undefined&&dataAll!=""){
		if(dataAll.status == "success"){
			//点源排放基础数据
			if(dataAll.data.files.ps != undefined){
				html +=	"<tr id='dy_tr'>";
				html +=	"<td>点源</td>";
				html +=	"<td id='download_1' rowspan='4'><a href='"+BackstageIP+"file/download?fileId=template/1.0/"+$("#paifangyuan_sel option:selected").text()+".rar' target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
				html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"</tr>";
			}
			
			//面源排放数据
			if(dataAll.data.files.ss != undefined){
				html +=	"<tr id='my_tr'>";
				html +=	"<td>面源</td>";
				if(dataAll.data.files.ps == undefined){
					html +=	"<td id='download_2' rowspan='3'><a href='"+BackstageIP+"file/download?fileId=template/1.0/"+$("#paifangyuan_sel option:selected").text()+".rar' target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
				}
				html +=	"<td id='sc_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='wjmc_2' style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='zt_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='cz_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"</tr>";
			}
			
			//排放量基础数据
			if(dataAll.data.files.ep != undefined){
				html +=	"<tr id='pfl_tr'>";
				html +=	"<td>点源排放量</td>";
				if(dataAll.data.files.ps == undefined && dataAll.data.files.ss == undefined){
					html +=	"<td id='download_3' rowspan='2'><a href='"+BackstageIP+"file/download?fileId=template/1.0/"+$("#paifangyuan_sel option:selected").text()+".rar' target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";

				}
				html +=	"<td id='sc_3'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='wjmc_3' style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='zt_3'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='cz_3'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"</tr>";
			}
			//面源排放量
			if(dataAll.data.files.es != undefined){
				html +=	"<tr id='pflm_tr'>";
				html +=	"<td>面源排放量</td>";
				if(dataAll.data.files.ps == undefined && dataAll.data.files.ss == undefined&&dataAll.data.files.ep == undefined){
					html +=	"<td id='download_4'><a href='"+BackstageIP+"file/download?fileId=template/1.0/"+$("#paifangyuan_sel option:selected").text()+".rar' target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
				}
				html +=	"<td id='sc_4'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='wjmc_4' style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='zt_4'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"<td id='cz_4'   style='padding-right: 0px; padding-left: 0px;'></td>";
				html +=	"</tr>";
			}
			$("#sj_tbody").html(html);
			//为表格中的文件名称赋值
			table_wj();
		}else{
			toastr["info"]("错误信息", dataAll.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
function changesource(){
	var id=$("input[name='hy_name']:checked")[0].id;
	if(id=="1000"||id=="1004"||id=="1005"){
		$(".si").show();
	}else{
		$(".si").hide();
	}
	
	html_value1();
}
var dataAll;
var data_tt=[];
//环保用户
function html_value1(){
	var dt=$("input[name='hy_name']:checked")[0].id;
	var dtName=$("input[name='hy_name']:checked").val();
	if(dt=="1000"){
		dt=$("#paifangyuan_sel").val();
	}
	dataAll = ajax_async_t(BackstageIP+"file/list.do",{sourceId:dt,userType:level,taskId:taskId,version:version},"json","1","POST");
	$("#sj_tbody").html("");
	if(dataAll != null&&dataAll!=""&&dataAll!=undefined){
		if(dataAll.status == "success"){
			var html = "";
			data_tt=[];
			//表头
			html += "<tr>";
			html +=	"<th style='text-align: center; width:14%;padding:0;'>文件类型</th>" +
			"<th style='text-align: center; width:14%;padding:0;'>模板下载</th>" +
			"<th style='text-align: center; width:10%;'>上传</th>" +
			"<th style='text-align: center; width:30%;'>文件名称</th>" +
			"<th style='text-align: center; width:12%;'>状态</th>" +
			"<th style='text-align: center; width:20%;'>操作</th></tr>";
			//点源排放基础数据
				
				if(dataAll.data.files.ef != undefined){
					data_tt.push(dataAll.data.files.ef);
					
					html +=	"<tr id='pf_tr'>";
					html +=	"<td>排放因子</td>";
					html +=	"<td id='download1' rowspan='1'><a href='"+BackstageIP+"file/export/template?region="+dataBase.Login_map.REGION+"&sourceId="+dt+" 'target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
//					html +=	"<td id='download_1' rowspan='3'><a href='"+BackstageIP+"file/download?fileId=template/1.0/"+iJson[parameter-1].sourceId+".rar' target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
					html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
					
				}else if(dataAll.data.files.sh!= undefined){
					data_tt.push(dataAll.data.files.sh);
					html +=	"<tr id='pf_tr'>";
					html +=	"<td>社会经济参数</td>";
					html +=	"<td id='download1' rowspan=''><a href='"+BackstageIP+"file/export/template?region="+dataBase.Login_map.REGION+"&sourceId="+dt+" 'target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
					html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
				}else if(dataAll.data.files.env!= undefined){
					data_tt.push(dataAll.data.files.env);
					html +=	"<tr id='pf_tr'>";
					html +=	"<td>气象参数</td>";
					html +=	"<td id='download1' rowspan=''><a href='"+BackstageIP+"file/export/template?region="+dataBase.Login_map.REGION+"&sourceId="+dt+" 'target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
					html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
				}else if(dataAll.data.files.eta!= undefined){
					data_tt.push(dataAll.data.files.eta);
					html +=	"<tr id='pf_tr'>";
					html +=	"<td>去除效率</td>";
					html +=	"<td id='download1' rowspan=''><a href='"+BackstageIP+"file/export/template?region="+dataBase.Login_map.REGION+"&sourceId="+dt+" 'target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
					html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
				}else if(dataAll.data.files.py!= undefined){
					data_tt.push(dataAll.data.files.py);
					html +=	"<tr id='pf_tr'>";
					html +=	"<td>VOC源谱</td>";
					html +=	"<td id='download1' rowspan='2'><a href='"+BackstageIP+"file/export/template?region="+dataBase.Login_map.REGION+"&sourceId="+dt+" 'target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
					html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
					html +=	"<tr id='pf_tr2'>";
					html +=	"<td>PM<sub>2.5</sub>源谱</td>";
					html +=	"<td id='sc_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_2' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
				}else if(dataAll.data.files.sk!= undefined){
					data_tt.push(dataAll.data.files.sk);
					html +=	"<tr id='pf_tr'>";
					html +=	"<td>时间分配参数</td>";
					html +=	"<td id='download1' rowspan='2'><a href='"+BackstageIP+"file/export/template?region="+dataBase.Login_map.REGION+"&sourceId="+dt+" 'target=_blank><i class='glyphicon glyphicon-save'></i></a></td>";
					html +=	"<td id='sc_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_1' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_1'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
					html +=	"<tr id='pf_tr2'>";
					html +=	"<td>空间分配参数</td>";
					html +=	"<td id='sc_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='wjmc_2' style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='zt_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"<td id='cz_2'   style='padding-right: 0px; padding-left: 0px;'></td>";
					html +=	"</tr>";
				}
			$("#sj_tbody").html(html);
			//为表格中的文件名称赋值
			table_wj1();
		}else{
			toastr["info"]("错误信息",dataAll.error);
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
var dtarray={"排放因子":"ef","去除效率":"eta","气象参数":"env","社会经济参数":"society","时空分配系数":"sk","源谱数据":"py"}
function table_wj1(){
	var tadkId=$("#data_up_sel").val();
	var dt=$("input[name='hy_name']:checked")[0].id;
	var dtName=$("input[name='hy_name']:checked").val();
	var type="";
	type=dtarray[dtName];
	if(dt=="1000"){
		dt=$("#paifangyuan_sel").val();
	}
	var html_d="";//为文件名称赋值
	var html_dcz="";//为操作赋值
	var html_dzt="";//为状态赋值
	
	
	var datap = data_tt[0];//点源文件
	if(datap != undefined ){
			var datap_length = 0;
			if(datap.length == 0){
				//上传
				$("#sc_1").html("<div class='col-sm-12'><a onclick=\"up_begin('p');\"><i class='glyphicon glyphicon-open'></i></a></div>");
				//文件名称
				html_d +=	"<div class='col-sm-12'><strong>无文件</strong></div>";
				//状态
				html_dzt = "<strong>未上传</strong>";
				//操作
				$("#cz_1").html("");
			}else{
				datap_length = datap.length;
				for(var i=0; i<datap.length; i++){
					var filename="";
					//如果文件名过长
					filename = datap[i].fileName;
					if(filename.length>20){
						if(filename.indexOf(".")>-1){
							filename = filename.split(".")[0];
						}
						if(filename.length>20){
							filename = filename.substr(0, 20)+"..";
						}
					}
					//文件名
					html_d += "<div class='col-sm-12 tbody_div'";
					//操作
					html_dcz += "<div class='col-sm-12 tbody_div'";
					//状态
					html_dzt += "<div class='col-sm-12 tbody_div'";
					if(i == datap.length-1){
						html_d += "style='border-bottom:0px;'";
						html_dcz += "style='border-bottom:0px;'";
						html_dzt += "style='border-bottom:0px;'";
					}
					html_d += "><a style='padding-left: 0;' onclick=\"chakanxiangxi('"+dtName+"','"+taskId+"','"+version+"','"+datap[i].id+"','"+datap[i].status+"','"+type+"','"+datap[i].fileName+"','"+datap[i].dataLevel+"');\" title='"+datap[i].fileName+"'>"+datap[i].fileName+"</a></div>";
					html_dcz += ">";
					html_dzt += "><strong>";
					//判断状态，为状态和操作赋值
					if(datap[i].status=="WAIT_REVIEW"){//已提交
						html_dzt += "已提交";
						//操作
						html_dcz += "<a class='a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
					}else if(datap[i].status=="WAIT_COMMIT"){//未提交
						//状态
						html_dzt += "未提交";
						//操作
						html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datap[i].id+"')\">删除</a>";
						html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
						html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">提交</a>";
					}else if(datap[i].status=="REJECT"){//已驳回
						//状态
						html_dzt += "已驳回";
						//操作
						html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datap[i].id+"')\">删除</a>";
						html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
						html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">提交</a>";
					}else if(datap[i].status=="PASSED"){//已通过
						//状态
						html_dzt += "已通过";
						//操作
						html_dcz += "<a class='a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
					}
					html_dzt += "</strong></div>";
					html_dcz += "</div>";
				}
				if(datap_length == 0){//如果数据库返回的没有数据
					//状态
					html_dzt = "<strong>未上传</strong>";
					//文件名称
					html_d ="<div class='col-sm-12'><strong>无文件</strong></div>";
				}else if(datap_length > 4){//如果数据库返回的数据等于5条
					$("#sc_1").html("<div class='col-sm-12'></div>");
				}else{
					$("#sc_1").html("<div class='col-sm-12'><a onclick=\"up_begin('p');\"><i class='glyphicon glyphicon-open'></i></a></div>");
				}
			}
			if(dt=="1004"||dt=="1005"){
				$("#sc_2").html("<div class='col-sm-12'><a onclick=\"up_begin('p');\"><i class='glyphicon glyphicon-open'></i></a></div>");
				$("#wjmc_2").html(html_d);
				//状态
				$("#zt_2").html(html_dzt);
				//操作
				$("#cz_2").html(html_dcz);
			}
			$("#wjmc_1").html(html_d);
			//状态
			$("#zt_1").html(html_dzt);
			//操作
			$("#cz_1").html(html_dcz);
		
	}
	
	
	
}
//为表格中的文件名称赋值
function table_wj(){
	var tadkId=$("#data_up_sel").val();
	var html_d="",html_s="",html_e="",html_m="";//为文件名称赋值
	var html_dcz="",html_scz="",html_ecz="",html_mcz="";//为操作赋值
	var html_dzt="",html_szt="",html_ezt="",html_mzt="";//为状态赋值
	var datap = dataAll.data.files.ps;//点源文件
	var datas = dataAll.data.files.ss;//面源文件
	var datae = dataAll.data.files.ep;//点源排放量文件
	var datam = dataAll.data.files.es;//面源排放量文件
	//点源文件
	if(datap != undefined){
		
		var datap_length = 0;
		if(datap.length == 0){
			//上传
			$("#sc_1").html("<div class='col-sm-12'><a onclick=\"up_begin('p');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			//文件名称
			html_d +=	"<div class='col-sm-12'><strong>无文件</strong></div>";
			//状态
			html_dzt = "<strong>未上传</strong>";
			//操作
			$("#cz_1").html("");
		}else{
			datap_length = datap.length;
			for(var i=0; i<datap.length; i++){
				var filename="";

				//如果文件名过长
				filename = datap[i].fileName;
				if(filename.length>20){
					if(filename.indexOf(".")>-1){
						filename = filename.split(".")[0];
					}
					if(filename.length>20){
						filename = filename.substr(0, 20)+"..";
					}
				}
				//文件名
				html_d += "<div class='col-sm-12 tbody_div'";
				//操作
				html_dcz += "<div class='col-sm-12 tbody_div'";
				//状态
				html_dzt += "<div class='col-sm-12 tbody_div'";
				if(i == datap.length-1){
					html_d += "style='border-bottom:0px;'";
					html_dcz += "style='border-bottom:0px;'";
					html_dzt += "style='border-bottom:0px;'";
				}
				html_d += "><a style='padding-left: 0;' onclick=\"chakanxiangxi('"+$("#paifangyuan_sel").find("option:selected").text()+"','"+taskId+"','"+version+"','"+datap[i].id+"','"+datap[i].status+"','p','"+datap[i].fileName+"','"+datap[i].dataLevel+"');\" title='"+datap[i].fileName+"'>"+datap[i].fileName+"</a></div>";
				html_dcz += ">";
				html_dzt += "><strong>";
				//判断状态，为状态和操作赋值
				if(datap[i].status=="WAIT_REVIEW"){//已提交
					html_dzt += "已提交";
					//操作
					html_dcz += "<a class='a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
				}else if(datap[i].status=="WAIT_COMMIT"){//未提交
					//状态
					html_dzt += "未提交";
					//操作
					html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datap[i].id+"')\">删除</a>";
					html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
					html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">提交</a>";
				}else if(datap[i].status=="REJECT"){//已驳回
					//状态
					html_dzt += "已驳回";
					//操作
					html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datap[i].id+"')\">删除</a>";
					html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
					html_dcz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">提交</a>";
				}else if(datap[i].status=="PASSED"){//已通过
					//状态
					html_dzt += "已通过";
					//操作
					html_dcz += "<a class='a_xhx' onclick=\"fenxi('"+datap[i].bigIndex+"','"+taskId+"','"+version+"','"+datap[i].id+"');\">分析</a>" ;
				}
				html_dzt += "</strong></div>";
				html_dcz += "</div>";
			}
			if(datap_length == 0){//如果数据库返回的没有数据
				//状态
				html_dzt = "<strong>未上传</strong>";
				//文件名称
				html_d ="<div class='col-sm-12'><strong>无文件</strong></div>";
			}else if(datap_length > 4){//如果数据库返回的数据等于5条
				$("#sc_1").html("<div class='col-sm-12'></div>");
			}else{
				$("#sc_1").html("<div class='col-sm-12'><a onclick=\"up_begin('p');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			}
		}
	}
	
	//面源文件
	if(datas != undefined ){
		var datas_length = 0;
		if(datas.length == 0){
			//上传
			$("#sc_2").html("<div class='col-sm-12'><a onclick=\"up_begin('s');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			//文件名称
			html_s +=	"<div class='col-sm-12'><strong>无文件</strong></div>";
			//状态
			html_szt = "<strong>未上传</strong>";
			//操作
			$("#cz_2").html("");
		}else{
			datas_length = datas.length;
			for(var i=0; i<datas.length; i++){
				var filename="";
				//如果文件名过长
				filename = datas[i].fileName;
//				if(filename.length>7){
//					if(filename.indexOf("_")>-1){
//						filename = filename.split("_")[1];
//					}
//					if(filename.indexOf(".")>-1){
//						filename = filename.split(".")[0];
//					}
//					if(filename.length>7){
//						filename = filename.substr(0, 7)+"..";
//					}
//				}
				//文件名
				html_s += "<div class='col-sm-12 tbody_div'";
				//操作
				html_scz += "<div class='col-sm-12 tbody_div'";
				//状态
				html_szt += "<div class='col-sm-12 tbody_div'";
				if(i == datas.length-1){
					html_s += "style='border-bottom:0px;'";
					html_scz += "style='border-bottom:0px;'";
					html_szt += "style='border-bottom:0px;'";
				}
				html_s += "><a style='padding-left: 0;' onclick=\"chakanxiangxi('"+$("#paifangyuan_sel").find("option:selected").text()+"','"+taskId+"','"+version+"','"+datas[i].id+"','"+datas[i].status+"','s','"+datas[i].fileName+"','"+datas[i].dataLevel+"');\" title='"+datas[i].fileName+"'>"+datas[i].fileName+"</a></div>";
				html_scz += ">";
				html_szt += "><strong>";
				//判断状态，为状态和操作赋值
				if(datas[i].status=="WAIT_REVIEW"){//已提交
					html_szt += "已提交";
					//操作
					html_scz += "<a class='a_xhx' onclick=\"fenxi('"+datas[i].bigIndex+"','"+taskId+"','"+version+"','"+datas[i].id+"');\">分析</a>" ;
				}else if(datas[i].status=="WAIT_COMMIT"){//未提交
					//状态
					html_szt += "未提交";
					//操作
					html_scz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datas[i].id+"')\">删除</a>";
					html_scz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datas[i].bigIndex+"','"+taskId+"','"+version+"','"+datas[i].id+"');\">分析</a>" ;
					html_scz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datas[i].bigIndex+"','"+taskId+"','"+version+"','"+datas[i].id+"');\">提交</a>";
				}else if(datas[i].status=="REJECT"){//已驳回
					//状态
					html_szt += "已驳回";
					//操作
					html_scz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datas[i].id+"')\">删除</a>";
					html_scz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datas[i].bigIndex+"','"+taskId+"','"+version+"','"+datas[i].id+"');\">分析</a>" ;
					html_scz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datas[i].bigIndex+"','"+taskId+"','"+version+"','"+datas[i].id+"');\">提交</a>";
				}else if(datas[i].status=="PASSED"){//已通过
					//状态
					html_szt += "已通过";
					//操作
					html_scz += "<a class='a_xhx' onclick=\"fenxi('"+datas[i].bigIndex+"','"+taskId+"','"+version+"','"+datas[i].id+"');\">分析</a>" ;
				}
				html_szt += "</strong></div>";
				html_scz += "</div>";
			}
			if(datas_length == 0){//如果数据库返回的没有数据
				//状态
				html_szt = "<strong>未上传</strong>";
				//文件名称
				html_s ="<div class='col-sm-12'><strong>无文件</strong></div>";
			}else if(datas_length > 4){//如果数据库返回的数据等于5条
				$("#sc_2").html("<div class='col-sm-12'></div>");
			}else{
				$("#sc_2").html("<div class='col-sm-12'><a onclick=\"up_begin('s');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			}
		}
	}	
	//点源排放量文件
	if(datae != undefined  ){
		var datae_length = 0;
		if(datae.length == 0){
			//上传
			$("#sc_3").html("<div class='col-sm-12'><a onclick=\"up_begin('e');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			//文件名称
			html_e +=	"<div class='col-sm-12'><strong>无文件</strong></div>";
			//状态
			html_ezt = "<strong>未上传</strong>";
			//操作
			$("#cz_3").html("");
		}else{
			datae_length = datae.length;
			for(var i=0; i<datae.length; i++){
				var filename="";
				//如果文件名过长
				filename = datae[i].fileName;
				if(filename.length>7){
					if(filename.indexOf("_")>-1){
						filename = filename.split("_")[1];
					}
					if(filename.indexOf(".")>-1){
						filename = filename.split(".")[0];
					}
					if(filename.length>7){
						filename = filename.substr(0, 7)+"..";
					}
				}
				//文件名
				html_e += "<div class='col-sm-12 tbody_div'";
				//操作
				html_ecz += "<div class='col-sm-12 tbody_div'";
				//状态
				html_ezt += "<div class='col-sm-12 tbody_div'";
				if(i == datae.length-1){
					html_e += "style='border-bottom:0px;'";
					html_ecz += "style='border-bottom:0px;'";
					html_ezt += "style='border-bottom:0px;'";
				}
				html_e += "><a style='padding-left: 0;' onclick=\"chakanxiangxi('"+$("#paifangyuan_sel").find("option:selected").text()+"','"+taskId+"','"+version+"','"+datae[i].id+"','"+datae[i].status+"','ep','"+datae[i].fileName+"','"+datap[i].dataLevel+"');\" title='"+datae[i].fileName+"'>"+datae[i].fileName+"</a></div>";
				html_ecz += ">";
				html_ezt += "><strong>";
				//判断状态，为状态和操作赋值
				if(datae[i].status=="WAIT_REVIEW"){//已提交
					html_ezt += "已提交";
					//操作
					html_ecz += "<a class='a_xhx' onclick=\"fenxi('"+datae[i].bigIndex+"','"+taskId+"','"+version+"','"+datae[i].id+"');\">分析</a>" ;
				}else if(datae[i].status=="WAIT_COMMIT"){//未提交
					//状态
					html_ezt += "未提交";
					//操作
					html_ecz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datae[i].id+"')\">删除</a>";
					html_ecz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datae[i].bigIndex+"','"+taskId+"','"+version+"','"+datae[i].id+"');\">分析</a>" ;
					html_ecz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datae[i].bigIndex+"','"+taskId+"','"+version+"','"+datae[i].id+"');\">提交</a>";
				}else if(datae[i].status=="REJECT"){//已驳回
					//状态
					html_ezt += "已驳回";
					//操作
					html_ecz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datae[i].id+"')\">删除</a>";
					html_ecz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datae[i].bigIndex+"','"+taskId+"','"+version+"','"+datae[i].id+"');\">分析</a>" ;
					html_ecz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datae[i].bigIndex+"','"+taskId+"','"+version+"','"+datae[i].id+"');\">提交</a>";
				}else if(datae[i].status=="PASSED"){//已通过
					//状态
					html_ezt += "已通过";
					//操作
					html_ecz += "<a class='a_xhx' onclick=\"fenxi('"+datae[i].bigIndex+"','"+taskId+"','"+version+"','"+datae[i].id+"');\">分析</a>" ;
				}
				html_ezt += "</strong></div>";
				html_ecz += "</div>";
			}
			if(datae_length == 0){//如果数据库返回的没有数据
				//状态
				html_ezt = "<strong>未上传</strong>";
				//文件名称
				html_e ="<div class='col-sm-12'><strong>无文件</strong></div>";
			}else if(datae_length > 4){//如果数据库返回的数据等于5条
				$("#sc_3").html("<div class='col-sm-12'></div>");
			}else{
				$("#sc_3").html("<div class='col-sm-12'><a onclick=\"up_begin('e');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			}
		}
	}
	
	//面源排放量文件
	if(datam != undefined  ){
		var datam_length = 0;
		if(datam.length == 0){
			//上传
			$("#sc_4").html("<div class='col-sm-12'><a onclick=\"up_begin('m');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			//文件名称
			html_m +=	"<div class='col-sm-12'><strong>无文件</strong></div>";
			//状态
			html_mzt = "<strong>未上传</strong>";
			//操作
			$("#cz_4").html("");
		}else{
			datam_length = datam.length;
			for(var i=0; i<datam.length; i++){
				var filename="";
				//如果文件名过长
				filename = datam[i].fileName;
				if(filename.length>7){
					if(filename.indexOf("_")>-1){
						filename = filename.split("_")[1];
					}
					if(filename.indexOf(".")>-1){
						filename = filename.split(".")[0];
					}
					if(filename.length>7){
						filename = filename.substr(0, 7)+"..";
					}
				}
				//文件名
				html_m += "<div class='col-sm-12 tbody_div'";
				//操作
				html_mcz += "<div class='col-sm-12 tbody_div'";
				//状态
				html_mzt += "<div class='col-sm-12 tbody_div'";
				if(i == datam.length-1){
					html_m += "style='border-bottom:0px;'";
					html_mcz += "style='border-bottom:0px;'";
					html_mzt += "style='border-bottom:0px;'";
				}
				html_m += "><a style='padding-left: 0;' onclick=\"chakanxiangxi('"+$("#paifangyuan_sel").find("option:selected").text()+"','"+taskId+"','"+version+"','"+datam[i].id+"','"+datam[i].status+"','es','"+datam[i].fileName+"','"+datap[i].dataLevel+"');\" title='"+datam[i].fileName+"'>"+datam[i].fileName+"</a></div>";
				html_mcz += ">";
				html_mzt += "><strong>";
				//判断状态，为状态和操作赋值
				if(datam[i].status=="WAIT_REVIEW"){//已提交
					html_mzt += "已提交";
					//操作
					html_mcz += "<a class='a_xhx' onclick=\"fenxi('"+datam[i].bigIndex+"','"+taskId+"','"+version+"','"+datam[i].id+"');\">分析</a>" ;
				}else if(datam[i].status=="WAIT_COMMIT"){//未提交
					//状态
					html_mzt += "未提交";
					//操作
					html_mcz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datam[i].id+"')\">删除</a>";
					html_mcz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datam[i].bigIndex+"','"+taskId+"','"+version+"','"+datam[i].id+"');\">分析</a>" ;
					html_mcz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datam[i].bigIndex+"','"+taskId+"','"+version+"','"+datam[i].id+"');\">提交</a>";
				}else if(datam[i].status=="REJECT"){//已驳回
					//状态
					html_mzt += "已驳回";
					//操作
					html_mcz += "<a class='col-sm-4 a_xhx' onclick=\"delete_9('"+datam[i].id+"')\">删除</a>";
					html_mcz += "<a class='col-sm-4 a_xhx' onclick=\"fenxi('"+datam[i].bigIndex+"','"+taskId+"','"+version+"','"+datam[i].id+"');\">分析</a>" ;
					html_mcz += "<a class='col-sm-4 a_xhx' onclick=\"tijiao('"+datam[i].bigIndex+"','"+taskId+"','"+version+"','"+datam[i].id+"');\">提交</a>";
				}else if(datam[i].status=="PASSED"){//已通过
					//状态
					html_mzt += "已通过";
					//操作
					html_mcz += "<a class='a_xhx' onclick=\"fenxi('"+datam[i].bigIndex+"','"+taskId+"','"+version+"','"+datam[i].id+"');\">分析</a>" ;
				}
				html_mzt += "</strong></div>";
				html_mcz += "</div>";
			}
			if(datam_length == 0){//如果数据库返回的没有数据
				//状态
				html_mzt = "<strong>未上传</strong>";
				//文件名称
				html_m ="<div class='col-sm-12'><strong>无文件</strong></div>";
			}else if(datam_length > 4){//如果数据库返回的数据等于5条
				$("#sc_4").html("<div class='col-sm-12'></div>");
			}else{
				$("#sc_4").html("<div class='col-sm-12'><a onclick=\"up_begin('m');\"><i class='glyphicon glyphicon-open'></i></a></div>");
			}
		}
	}

	//文件名称
	$("#wjmc_1").html(html_d);
	$("#wjmc_2").html(html_s);
	$("#wjmc_3").html(html_e);
	$("#wjmc_4").html(html_m);

	//状态
	$("#zt_1").html(html_dzt);
	$("#zt_2").html(html_szt);
	$("#zt_3").html(html_ezt);
	$("#zt_4").html(html_mzt);

	//操作
	$("#cz_1").html(html_dcz);
	$("#cz_2").html(html_scz);
	$("#cz_3").html(html_ecz);
	$("#cz_4").html(html_mcz);
}

//点击删除按钮
function delete_9(fileid){
	swal({
		title: "您确定要删除这条信息吗",
		text: "删除后将无法恢复，请谨慎操作！",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	}, function () {
		var data = ajax_async_t(BackstageIP+"file/delete.do",{bigIndex:"附件p101_电力行业调查表",taskId:taskId,version:version,fileId:fileid,userId:dataBase.Login_map.SOLE},"json","1","GET");
		if(data !=undefined&&data != null &&data != ""){
			if(data.status == "success"){
				swal({
					title: "删除成功",
					text: "成功删除该文件",
					type: "success"
				})
				if(level=="6"){
					html_value1();
				}else{
					html_value();
				}
				 
				
			}else{
				swal({
					title: "删除失败",
					text: data.error,
					type: "error"
				})
			}
		}else{
			swal({
				title: "删除失败",
				text: "未连接"+BackstageIP,
				type: "error"
			})
		}
	});
};

//打开详细页面
function chakanxiangxi(bigIndex,taskId,version,fileId,commit,type,fileName,dataLevel){
	taskId=$("#data_up_sel").val();
	bigIndex=$("#paifangyuan_sel option:selected").text();
	var data= ajax_async_t(BackstageIP+"analysis/cueFile/current",{version:version,fileId:fileId,userId:dataBase.Login_map.SOLE},"json","1","POST");
	//第一次打开
	if(data.data==null){
		var c="success";
		if(flag=true){
			var  data= ajax_async_t(BackstageIP+"analysis/cueFile/open.do",{version:version,fileId:fileId,userId:dataBase.Login_map.SOLE},"json","1","POST");
			if(data!=undefined&&data!=null&&data!=""){
				c=data.status;
				if(c=="success")
				{
					window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?bigIndex="+bigIndex+"&taskId="+taskId+"&version="+version+"&fileId="+fileId+"&commit="+commit+"&type="+type+"&edit="+data.data.edit+"&dataLevel="+dataLevel);
					if(level=="6"){
						var dtName=$("input[name='hy_name']:checked").val();
						if(dtName=="去除效率"||dtName=="气象参数"||dtName=="社会经济参数")
						{
							window.parent.$("#yincang_caidan").html(dtName+"->"+fileName);
						}else{
							window.parent.$("#yincang_caidan").html(dtName+"->"+$("#paifangyuan_sel option:selected").text()+"->"+fileName);
						}
					}else{
						window.parent.$("#yincang_caidan").html($("#paifangyuan_sel option:selected").text()+"->"+fileName);
					}
					window.parent.$("#yincang_caidan").click();
				}else{
					toastr["info"]("错误信息", data.error);
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
		}
		
	}else if(data.data.ssId==fileId||data.data.psId==fileId||data.data.epId==fileId||data.data.esId==fileId){//打开相同文件
	
			window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?bigIndex="+bigIndex+"&taskId="+taskId+"&version="+version+"&fileId="+fileId+"&commit="+commit+"&type="+type+"&edit="+data.data.edit+"&dataLevel="+dataLevel);
			if(level=="6"){
				var dtName=$("input[name='hy_name']:checked").val();
				if(dtName=="去除效率"||dtName=="气象参数"||dtName=="社会经济参数")
				{
					window.parent.$("#yincang_caidan").html(dtName+"->"+fileName);
				}else{
					window.parent.$("#yincang_caidan").html(dtName+"->"+$("#paifangyuan_sel option:selected").text()+"->"+fileName);
				}
			}else{
				window.parent.$("#yincang_caidan").html($("#paifangyuan_sel option:selected").text()+"->"+fileName);
			}
			window.parent.$("#yincang_caidan").click();
	}else{//打开不同文件
		if(data.data.edit==true){//可编辑
			swal({
				  title: "提示",
				  text: "是否放弃对("+data.data.subSector+">"+data.data.missionName+">"+data.data.unitType+">"+data.data.fileName+")的修改?",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonText: "确认",
				  cancelButtonText: "取消",
				 // closeOnConfirm: false,
				  //closeOnCancel: false
				},
				function(isConfirm){
					  if (isConfirm) {
						  var c="success";
							if(flag=true){
								data= ajax_async_t(BackstageIP+"analysis/cueFile/open.do",{version:version,fileId:fileId,userId:dataBase.Login_map.SOLE},"json","1","POST");
								c=data.status;
							}
							if(data!=undefined&&data!=null&&data!=""){
								if(c=="success")
								{
									window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?bigIndex="+bigIndex+"&taskId="+taskId+"&version="+version+"&fileId="+fileId+"&commit="+commit+"&type="+type+"&edit="+data.data.edit+"&dataLevel="+dataLevel);
									if(level=="6"){
										var dtName=$("input[name='hy_name']:checked").val();
										if(dtName=="去除效率"||dtName=="气象参数"||dtName=="社会经济参数")
										{
											window.parent.$("#yincang_caidan").html(dtName+"->"+fileName);
										}else{
											window.parent.$("#yincang_caidan").html(dtName+"->"+$("#paifangyuan_sel option:selected").text()+"->"+fileName);
										}
									}else{
										window.parent.$("#yincang_caidan").html($("#paifangyuan_sel option:selected").text()+"->"+fileName);
									}
									window.parent.$("#yincang_caidan").click();
								}else{
									toastr["info"]("错误信息", data.error);
								}
							}else{
								toastr["info"]("错误信息", "未连接"+BackstageIP);
							}
						  } else {
							    return;
						  }
						});
		}else{
			var c="success";
			if(flag=true){
			    data= ajax_async_t(BackstageIP+"analysis/cueFile/open.do",{version:version,fileId:fileId,userId:dataBase.Login_map.SOLE},"json","1","POST");
				c=data.status;
			}
			if(data!=undefined&&data!=null&&data!=""){
				if(c=="success")
				{
					window.parent.$("#yincang_caidan").attr("href","zp01/9999/9999_ck.html?bigIndex="+bigIndex+"&taskId="+taskId+"&version="+version+"&fileId="+fileId+"&commit="+commit+"&type="+type+"&edit="+data.data.edit+"&dataLevel="+dataLevel);
					if(level=="6"){
						var dtName=$("input[name='hy_name']:checked").val();
						if(dtName=="去除效率"||dtName=="气象参数"||dtName=="社会经济参数")
						{
							window.parent.$("#yincang_caidan").html(dtName+"->"+fileName);
						}else{
							window.parent.$("#yincang_caidan").html(dtName+"->"+$("#paifangyuan_sel option:selected").text()+"->"+fileName);
						}
					}else{
						window.parent.$("#yincang_caidan").html($("#paifangyuan_sel option:selected").text()+"->"+fileName);
					}
					window.parent.$("#yincang_caidan").click();
				}else{
					toastr["info"]("错误信息", data.error);
				}
			}else{
				toastr["info"]("错误信息", "未连接"+BackstageIP);
			}
			
		}
	}
}

//点击分析
function fenxi(bigIndex,taskId,version,fileId){
	var data = ajax_async_t(BackstageIP+"analysis/itemPool/cusFile.do",{userId:dataBase.Login_map.SOLE,version:version,fileId:fileId},"json","1","POST");
	
	if(data.status!="success")
		return toastr["info"]("错误信息",data.code);
	$("#pic_all").show();
	//获取下拉菜单
	$(".tudiv").html("");
	var datas = ajax_async_t(BackstageIP+"analysis/template/config.do",{bigIndex:bigIndex,taskId:taskId,version:version,fileId:fileId},"json","1","POST");
	if(datas != undefined&&datas!=null&&datas!=""){
		if(datas.status=="success"){
			if(datas.data == "" || datas.data == null || JSON.stringify(datas.data) == "{}") {
				for ( var k = 1 ; k < 5; k  ++  ) {
					$("#sm"+k).hide();
				}
				return toastr["info"]("错误信息","无返回数据"); ;
			}
			$("#sm1").show();
			$("#sm2").show();
			$("#sm3").show();
			$("#sm4").show();
			var data = datas.data;
			for(var nums=1; nums<5; nums++){//为4个下拉框赋值，每次循环出一个图
				var num = nums.toString();
				$("#file_"+num).html("");
				if (num in data) {
					var pic_value = "";
					//循环出横轴下拉框
					var html_1 = "<select id='zbtu_"+num+"' class='form-control m-b' onchange=\"select_c('"+bigIndex+"','"+fileId+"','"+num+"','"+taskId+"','"+version+"');\">";
					for(var i=0; i<data[num].length; i++){
						if(i == 0){
							pic_value = data[num][0].value;
						}
						html_1 += "<option value='"+data[num][i].value+"'>"+data[num][i].name+"</option>";
					}
					html_1 += "</select>";
					
					$("#file_"+num).html(html_1);
					//显示图表
					open_pic(bigIndex,fileId,taskId,version,pic_value,num);
				} else {
					var html_2 = "<select id='zbtu_"+num+"' class='form-control m-b' onchange=\"select_c('"+bigIndex+"','"+fileId+"','"+num+"','"+taskId+"','"+version+"');\"></select";
					$("#file_"+num).html(html_2);
					//					toastr["info"]("无数据",num+"-下拉菜单无数据");
				}
			}
			for ( var k = 1 ; k < 5; k  ++  ) {
				if ( $("#zbtu_"+k).val() == "" || $("#zbtu_"+k).val() == null || $("#zbtu_"+k).val() == undefined ) {
					$("#sm"+k).hide();
				}
			}
		}else{
			toastr["info"]("错误信息","未获取到-"+bigIndex+"-下拉菜单数据")
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//select点击事件
function select_c(bigIndex,fileId,tuid,taskId,version){
	var selectValue = $("#zbtu_"+tuid).val();
	open_pic(bigIndex,fileId,taskId,version,selectValue,tuid);
}
//显示图表
function open_pic(bigIndex,fileId,taskId,version,selectValue,tuid){

	if(tuid=="1"){
		//开启图形
		myChart_1 = echarts.init(document.getElementById("1"), 'macarons');//声明id为1的div为图形dom
		myChart_1.showLoading();
	}else if(tuid=="2"){
		//开启图形
		myChart_2 = echarts.init(document.getElementById("2"), 'macarons');//声明id为1的div为图形dom
		myChart_2.showLoading();
	}else if(tuid=="3"){
		//开启图形
		myChart_3 = echarts.init(document.getElementById("3"), 'macarons');//声明id为1的div为图形dom
		myChart_3.showLoading();
	}else{
		//开启图形
		myChart_4 = echarts.init(document.getElementById("4"), 'macarons');//声明id为1的div为图形dom
		myChart_4.showLoading();
	}

	$.ajax({  		       
		url: BackstageIP+"analysis/template/chart.do",
		type: "POST",
		async:true,
		dataType: "JSON",
		data: {bigIndex:bigIndex,fileId:fileId,taskId:taskId,version:version,selectValue:selectValue,userId:dataBase.Login_map.SOLE},
		success: function (ret) {
			if(tuid=="1"){
				//开启图形
				myChart_1.hideLoading();
			}else if(tuid=="2"){
				//开启图形
				myChart_2.hideLoading();
			}else if(tuid=="3"){
				//开启图形
				myChart_3.hideLoading();
			}else{
				//开启图形
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
									axisLabel:{//坐标轴文本标签选项
										interval:0,//小标记显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） | {number}（用户指定选择间隔）
										rotate:0,//标签旋转的角度，默认为0，不旋转，正值为逆时针，负值为顺时针，可选为：-90-90
										margin:8,//坐标轴文本标签与坐标轴的间距，默认为8，单位px
									},
								},
								yAxis: {
									axisLabel: {
										formatter: '{value}'
									},
									name:data.yAxis,
									nameLocation:'middle',
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
									type: 'scatter',
									itemStyle:{
						                  normal:{color:'#00CACA'}
						              }
							};

							newdatas.push(data_1);
						}

						var data_2;
						if ( data.Linetipvalue != null && data.Linetipvalue != "" && data.Linetipvalue != undefined ) {
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
									nameGap:70,
									max: data.Ymax,
									min: 0,
									nameTextStyle:{
										fontStyle:"normal",
										fontSize:"6"
									},
								},
								series: newdatas
						};
					}
					if(tuid=="1"){
						myChart_1.setOption(option);
					}else if(tuid=="2"){
						myChart_2.setOption(option);
					}else if(tuid=="3"){
						myChart_3.setOption(option);
					}else{
						myChart_4.setOption(option);
					}
				}
			}else{
				toastr["info"]("错误信息","数据库无返回值")
			}
		},
		error: function (e) { 
			toastr["info"]("服务器异常：analysis/template/chart");
		}  
	});
}

//点击提交
function tijiao(bigIndex,taskId,version,fileId){
	var data = ajax_async_t(BackstageIP+"taskDataFillChild/cityUser/commitFile.do",{version:version,fileId:fileId,userId:dataBase.Login_map.SOLE},"JSON","1","POST");//获取表头数据
	if(data != undefined&&data!=null&&data!=""){
		if(data.status == "success"){
			if(level=="6"){
				html_value1();
			}else{
				html_value();
			}
			swal({
				title: "提交成功",
				text: "提交文件成功",
				type: "success"
			})
		}else{
			swal({
				title: "提交失败",
				text: data.error,
				type: "error"
			})
		}
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}

//切换任务刷新表格
function changetask(taskid){
	if(level=='4'){
		
		$("#paifangjisuanqu_sel").html("");
		$("#paifangyuan_sel").html("");
		var dept='';
		for(var i=0;i<data_level.data.length;i++){
			if($("#data_up_sel option:selected").text()==data_level.data[i].name){
				for(prop in data_level.data[i].object){
					dept+="<option value="+prop+">"+prop+"</option>";
				}
				$("#paifangjisuanqu_sel").html(dept);
			}
		}
		var industry='';
		for(var i=0;i<data_level.data.length;i++){
			if($("#data_up_sel option:selected").text()==data_level.data[i].name){
				for(prop in data_level.data[i].object){
					if($("#paifangjisuanqu_sel option:selected").text()==prop){
						for(var j=0;j<data_level.data[i].object[prop].length;j++){
							industry+="<option value="+data_level.data[i].object[prop][j].ID+">"+data_level.data[i].object[prop][j].SCC2+"</option>";
						}
						$("#paifangyuan_sel").html(industry);
					}
				}
			}
		}
//		$("#pic_all").hide();
		html_value();
//		$("#pic_all").show();
	}else if(level=='6'){
		var taskid=$("#data_up_sel").val();
		taskId = taskid;
		for(var i=0;i<global_data.length;i++){
			
			if(global_data[i].id==taskid){
				
				var html1 ="";
				var html2 ="";
				$("#paifangjisuanqu_sel").html("");
				$("#paifangyuan_sel").html("");
				
				section_data=global_data[i].object;
				data_types=global_data[i].list;
				var num=0;
				for(prop in section_data){
					html1+="<option value='"+prop+"'>"+prop+"</option>";
					num+=1;
					if(num==1){
						for(var j=0;j<section_data[prop].length;j++){
							html2 += "<option value='"+section_data[prop][j].ID+"'>"+section_data[prop][j].SCC2+"</option>";
						}
					}
					
				}
				
				$("#paifangjisuanqu_sel").html(html1);
				$("#paifangyuan_sel").html(html2);
				dt_init();
				
			}
		}
		//html_value();
		$("#pic_all").hide();
		
		
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
//ajax通用方法
function ajax_async_t(url,data,dataType,async,type){
	var rel;
	if(async==""||async==undefined){
		async=true;
	}else{
		async=false;
	}
	$.ajax({  		       
		url: url,
		type: type,
		async:async,
		dataType: dataType,
		data: data,
		success: function (ret) {
			rel = ret;
		},
		error: function (e) { 
			toastr["info"]("错误信息", "服务器异常："+url);
		}  
	});
	return rel;
}

//点击部门更换行业
function paifangjisuanqu_sel(){
	$("#paifangyuan_sel").html("");
	$("#pic_all").hide();
	var paifangjisuanqu_sel=$("#paifangjisuanqu_sel").val();
	
	if(level=="4"){
		
		var industry='';
		for(var i=0;i<data_level.data.length;i++){
			if($("#data_up_sel option:selected").text()==data_level.data[i].name){
				for(prop in data_level.data[i].object){
					if($("#paifangjisuanqu_sel option:selected").text()==prop){
						for(var j=0;j<data_level.data[i].object[prop].length;j++){
							industry+="<option value="+data_level.data[i].object[prop][j].ID+">"+data_level.data[i].object[prop][j].SCC2+"</option>";
						}
						$("#paifangyuan_sel").html(industry);
					}
				}
			}
		}
		parameter = parseInt($("#paifangyuan_sel").val());
		show_str = yuan_str [parseInt($("#paifangyuan_sel").val())-1];
		html_value();
//		$("#pic_all").show();
		
	}else{
	
	if(level=="6"||level=="4"){
		$("#paifangyuan_sel").html("");
		var html2="";
		for(prop in section_data){
			if(paifangjisuanqu_sel==prop){
				var tem=section_data[prop];
				for(var i=0;i<tem.length;i++){
					html2 += "<option value='"+tem[i].ID+"'>"+tem[i].SCC2+"</option>";
				}
				$("#paifangyuan_sel").html(html2);
			}
			
		}
			if(level=="6"){
				html_value1();
			}else if(level=="4"){
				parameter = parseInt($("#paifangyuan_sel").val());
				show_str = yuan_str [parseInt($("#paifangyuan_sel").val())-1];
				html_value();
			}
			
		
	}else{
		var option="";
		if(paifangjisuanqu_sel=='化石燃料固定燃烧源'){
			option="<option value=1>电力</option><option value=2>工业锅炉</option><option value=3>民用源</option>";
			$("#paifangyuan_sel").html(option);
			parameter="1";
		}else if(paifangjisuanqu_sel=='工艺过程源'){
			option="<option value=4>玻璃</option><option value=5>独立焦化</option><option value=6>钢铁</option><option value=7>化工化纤</option><option value=8>水泥</option><option value=9>其他工业企业</option>";
			$("#paifangyuan_sel").html(option);
			parameter="2";
		}else if(paifangjisuanqu_sel=='移动源'){
			option="<option value=10>机动车</option><option value=11>飞机</option><option value=12>船舶</option><option value=13>非道移机械</option>";
			$("#paifangyuan_sel").html(option);
			parameter="3";
		}else if(paifangjisuanqu_sel=='溶剂使用源'){
			option="<option value=14>工业喷涂</option><option value=15>建筑涂料</option><option value=16>印刷印染</option><option value=17>农药使用</option><option value=18>其他溶剂使用</option>";
			$("#paifangyuan_sel").html(option);
			parameter="4";
		}else if(paifangjisuanqu_sel=='农业源'){
			option="<option value=19>氮肥施用</option><option value=20>固氮植物</option><option value=21>秸秆堆肥</option><option value=22>人体粪便</option><option value=23>畜禽养殖</option><option value=24>土壤本底</option>";
			$("#paifangyuan_sel").html(option);
			parameter="5";
		}else if(paifangjisuanqu_sel=='扬尘源'){
			option="<option value=25>道路扬尘</option><option value=26>堆场扬尘</option><option value=27>施工扬尘</option><option value=28>土壤扬尘</option>";
			$("#paifangyuan_sel").html(option);
			parameter="6";
		}else if(paifangjisuanqu_sel=='存储运输源'){
			option="<option value=30>油气储存</option><option value=31>油气输送</option><option value=29>加油站</option>";
			$("#paifangyuan_sel").html(option);
			parameter="7";
		}else if(paifangjisuanqu_sel=='生物质燃烧源'){
			option="<option value=32>生物质燃料</option><option value=33>生物质开放燃烧</option>";
			$("#paifangyuan_sel").html(option);
			parameter="8";
		}else if(paifangjisuanqu_sel=='废物处理源'){
			option="<option value=34>废水处理</option><option value=35>固废处理</option><option value=36>烟气脱硝</option>";
			$("#paifangyuan_sel").html(option);
			parameter="9";
		}else if(paifangjisuanqu_sel=='其他排放源'){
			option="<option value=37>餐饮油烟</option>";
			$("#paifangyuan_sel").html(option);
			parameter="10";
		}
		parameter = parseInt($("#paifangyuan_sel").val());
		show_str = yuan_str [parseInt($("#paifangyuan_sel").val())-1];
//		up_select();	//赋值下拉框的选项
		html_value();
	}
	
	
	}
	
}
//点击行业触发事件
function paifangyuan_sel(){
	$("#pic_all").hide();
	var paifangyuan_sel=$("#paifangyuan_sel").val();
	parameter=paifangyuan_sel;
	parameter = parseInt($("#paifangyuan_sel").val());
	show_str = yuan_str [parseInt($("#paifangyuan_sel").val())-1];
//	up_select();	//赋值下拉框的选项
	if(level=="6"){
	html_value1();	
	}else if(level=="4"){
	html_value();
	}
}