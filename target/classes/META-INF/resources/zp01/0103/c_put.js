var version = "1.0";
//初始化末端控制设备
function chushihua_moduan(div_id){
	var tl_table_html = "<tr class=\"dise\"><td width=\"13%\">脱硫工艺<code>*</code></td><td width=\"13%\">脱硫剂名称</td>" +
		"<td width=\"12%\">脱硫剂使用量<br>(吨)</td><td width=\"12%\">脱硫烟气旁路</td>" +
		"<td width=\"11%\">脱硫岛效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
		"<td width=\"6%\">操作</td></tr>";
	$("#"+div_id+" #tl_table").html(tl_table_html);
	$("#"+div_id+" #tl_table").hide();
	
	var tx_table_html = "<tr class=\"dise\"><td width=\"13%\">脱硝工艺<code>*</code></td><td width=\"13%\">脱硝剂名称</td>" +
			"<td width=\"24%\">脱硝剂使用量<br>(吨)</td><td width=\"11%\">脱硝效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td>" +
			"<td width=\"11%\">投运时间<br>(年/月/日)</td><td width=\"6%\">操作</td></tr>";
	$("#"+div_id+" #tx_table").html(tx_table_html);
	$("#"+div_id+" #tx_table").hide();
	
	var dd_table_html = "<tr class=\"dise\"><td width=\"20%\">是否采用低氮燃烧技术<code>*</code></td><td width=\"11%\">投运时间<br>(年/月)</td>" +
			"<td width=\"11%\">燃烧器出口浓度<br>(mg/m3)</td><td width=\"11%\">投运率<br>(%)</td>" +
			"<td width=\"6%\">操作</td></tr>";
	$("#"+div_id+" #dd_table").html(dd_table_html);
	$("#"+div_id+" #dd_table").hide();
	
	var cc_table_html = "<tr class=\"dise\"><td width=\"13%\">除尘工艺<code>*</code></td><td width=\"13%\">除尘风机总风量<br>(立方米/小时)</td><td width=\"11%\">废气收集率<br>(%)</td>" +
			"<td width=\"11%\">除尘效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
			"<td width=\"6%\">操作</td></tr>";
	$("#"+div_id+" #cc_table").html(cc_table_html);
	$("#"+div_id+" #cc_table").hide();
	
	var yl_table_html = "<tr class=\"dise\"><td width=\"13%\">voc回收技术<code>*</code></td><td width=\"13%\">其他回收技术</td><td width=\"11%\">voc销毁技术<code>*</code></td>" +
	"<td width=\"11%\">其他回收技术</td><td width=\"11%\">处理效率<br>(%)</td><td width=\"11%\">设备风量<br>(立方米/小时)</td><td width=\"11%\">年运行时间<br>(小时)</td><td width=\"11%\">有机废气排放浓度<br>(毫克/立方米)</td>" +
	"<td width=\"6%\">操作</td></tr>";
	$("#"+div_id+" #yl_table").html(yl_table_html);
	$("#"+div_id+" #yl_table").hide();
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   
var look_or_up = "";//某个设备是查看还是编辑状态

//焦炭产量信息初始化
function data_yjyl_data_Initialization(div){
	var lj_html = '<tr><td width="20%" class="dise">名称<code>*</code></td><td width="20%" class="dise">使用量(吨)<code>*</code></td><td width="10%" class="dise">操作</td></tr>';
	$("#"+div+" #yjyl_table").html(lj_html);
}
//产品信息初始化
function data_chanpin_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">产品类型<code>*</code></td><td class="dise" width="6%">产品名称<code>*</code></td><td class="dise" width="6%"> 产品产量单位<code>*</code></td><td class="dise" width="6%">全年<code>*</code></td>'+
			'<td class="dise" width="5%">1月</td><td class="dise" width="5%">2月</td><td class="dise" width="5%">3月</td><td class="dise" width="5%">4月</td><td class="dise" width="5%">5月</td><td class="dise" width="5%">6月</td><td class="dise" width="5%">7月</td>'+
			'<td class="dise" width="5%">8月</td><td class="dise" width="5%">9月</td><td class="dise" width="5%">10月</td><td class="dise" width="5%">11月</td><td class="dise" width="5%">12月</td><td class="dise" width="5%">操作</td></tr>';
	$("#"+div+" #lj_chanpin_table").html(lj_html);
}
//溶剂信息
function data_rongji_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">溶剂类型<code>*</code></td><td class="dise" width="7%"></td><td class="dise" width="6%">全年<code>*</code></td>'+
			'<td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td><td class="dise" width="6%">3月</td><td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td>'+
			'<td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td><td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td>'+
			'<td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #rj_chanpin_table").html(lj_html);
}
//溶剂使用
function data_rjsy_data_Initialization(div){
	var lj_html = '<tr><td class="dise" rowspan="2" width="9%">溶剂类型<code>*</code></td><td class="dise" rowspan="2" width="9%">溶剂性质<code>*</code></td><td class="dise" colspan="2" >涂料(油漆)</td>'+
		'<td class="dise" colspan="2">稀释剂</td><td class="dise" colspan="2">胶黏剂</td><td class="dise" rowspan="2" width="6%">操作</td></tr><tr><td width="8%" class="dise" >年用量<code>*</code></td>'+
		'<td width="8%" class="dise" >单位<code>*</code></td><td width="8%" class="dise" >年用量<code>*</code></td><td width="8%" class="dise" >单位<code>*</code></td><td width="8%" class="dise" >年用量<code>*</code></td><td width="8%" class="dise" >单位<code>*</code></td></tr>';
	$("#"+div+" #brj_chanpin_table").html(lj_html);
}
//废气信息
function data_feiqi_data_Initialization(div){
	var lj_html = '<tr><td width="8%" class="dise" >废气处理方式<code>*</code></td><td width="8%" class="dise" >处理效率(％)</td><td width="8%" class="dise" >操作</td></tr>';
	$("#"+div+" #feiqi_table").html(lj_html);
}
//机动车
function data_jidongche_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">施工阶段<code>*</code></td><td class="dise" width="7%"></td><td class="dise" width="6%">1月<code>*</code></td><td class="dise" width="6%">1月<code>*</code></td><td class="dise" width="6%">2月<code>*</code></td><td class="dise" width="6%">3月<code>*</code></td>'+
		'<td class="dise" width="6%">4月<code>*</code></td><td class="dise" width="6%">5月<code>*</code></td><td class="dise" width="6%">6月<code>*</code></td><td class="dise" width="6%">7月<code>*</code></td><td class="dise" width="6%">8月<code>*</code></td><td class="dise" width="6%">9月<code>*</code></td>'+
		'<td class="dise" width="6%">10月<code>*</code></td><td class="dise" width="6%">11月<code>*</code></td><td class="dise" width="6%">12月<code>*</code></td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #wuran_table").html(lj_html);
}
//污染
function data_wuran_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">污染控制技术<code>*</code></td><td class="dise" width="7%">污染控制效率(％)</td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #wuran_table").html(lj_html);
}
//堆场
function data_duichang_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">堆场编号<code>*</code></td><td class="dise" width="7%">堆场类型<code>*</code></td><td class="dise" width="7%">其他堆场类型</td><td class="dise" width="7%">堆场材料<code>*</code></td>'+
		'<td class="dise" width="7%">其他堆场材料</td><td class="dise" width="7%">占地面积<code>*</code><br>(平方米)</td><td class="dise" width="7%">最高高度<code>*</code><br>(米)</td><td class="dise" width="7%">日常储存量(吨)<code>*</code></td>'+
		'<td class="dise" width="7%">年物料运载车次(车)<code>*</code></td><td class="dise" width="7%">单车运载量(吨/车)<code>*</code></td><td class="dise" width="7%">控制措施</td><td class="dise" width="7%">其他控制措施</td><td class="dise" width="3%">操作</td></tr>';
	$("#"+div+" #duichang_table").html(lj_html);
}
//有机液体储罐
function data_yjytcg_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">储罐编号<code>*</code></td><td class="dise" width="7%">储罐类型<code>*</code></td><td class="dise" width="7%" title="填写说明：&#10;1、若填了体积，则高度和直径可以不填；&#10;2、若填了直径，高度必填、体积可以不填；&#10;3、若填了高度，直径必填、体积可以不填；&#10;4、若三个参数都填，需满足高度和直径计算出的体积和实际填写的体积误差不超过0.001；&#10;5、体积、高度、直径不能全为空。">体积(立方米)</td>'+
		'<td class="dise" width="7%" title="填写说明：&#10;1、若填了体积，则高度和直径可以不填；&#10;2、若填了直径，高度必填、体积可以不填；&#10;3、若填了高度，直径必填、体积可以不填；&#10;4、若三个参数都填，需满足高度和直径计算出的体积和实际填写的体积误差不超过0.001；&#10;5、体积、高度、直径不能全为空。">高度(米)</td>'+
		'<td class="dise" width="7%" title="填写说明：&#10;1、若填了体积，则高度和直径可以不填；&#10;2、若填了直径，高度必填、体积可以不填；&#10;3、若填了高度，直径必填、体积可以不填；&#10;4、若三个参数都填，需满足高度和直径计算出的体积和实际填写的体积误差不超过0.001；&#10;5、体积、高度、直径不能全为空。">直径(米)</td>'+
		'<td class="dise" width="7%">占存储液体成分<code>*</code></td><td class="dise" width="7%">年进出料次数<code>*</code></td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #yjytcg_table").html(lj_html);
}
//有机液体装载信息表
function data_yjytzz_data_Initialization(div){
	var lj_html = '<tr><td class="dise" width="7%">序号<code>*</code></td><td class="dise" width="7%">作业部/车间</td><td class="dise" width="7%">装车站台编号<code>*</code></td><td class="dise" width="7%">装载物料名称<code>*</code></td>'+
		'<td class="dise" width="7%">装载方式<code>*</code></td><td class="dise" width="7%">操作方式<code>*</code></td><td class="dise" width="7%">年装载量(吨)<code>*</code></td>'+
		'<td class="dise" width="7%">装载物料密度(kg/m3)<code>*</code></td><td class="dise" width="7%">油气回收控制技术<code>*</code></td><td class="dise" width="7%">其他油气回收控制技术</td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #yjytzz_table").html(lj_html);
}

//燃料1设备初始化
function data_ranliao_data_Initialization(div){
	var fdj_rl_html = '<tr><td width="17%" class="dise">燃料类型<code>*</code></td><td width="15%" class="dise">燃料热值<br>(千卡/千克或千卡/标准立方米)</td>'+
					'<td width="10%" class="dise">燃料硫份<code>*</code><br>(%)</td><td width="10%" class="dise">燃料灰分<code>*</code><br>(%)</td>'+
					'<td width="10%" class="dise">燃料挥发分<code>*</code><br>(%)</td><td width="10%" class="dise">煤炭来源地</td><td width="15%" class="dise">煤炭运输方式</td><td width="10%" class="dise">操作</td></tr>';
	$("#"+div+" #fdj_rl_table").html(fdj_rl_html);
	
	var fdj_rl_html2 = '<tr><td class="dise" width="9%"></td><td class="dise" width="7%">全年<code>*</code></td><td class="dise" width="7%">1月</td>'+
				'<td class="dise" width="7%">2月</td><td class="dise" width="7%">3月</td><td class="dise" width="7%">4月</td><td class="dise" width="7%">5月</td>'+
				'<td class="dise" width="7%">6月</td><td class="dise" width="7%">7月</td><td class="dise" width="7%">8月</td><td class="dise" width="7%">9月</td>'+
				'<td class="dise" width="7%">10月</td><td class="dise" width="7%">11月</td><td class="dise" width="7%">12月</td></tr>';
	$("#"+div+" #fdj_rl_table2").html(fdj_rl_html2);
}
//焦炭产量信息初始化
function data_lianjiao_data_Initialization(div){
	var lj_html = '<tr ><td class="dise" width="9%">产品类型<code>*</code></td><td class="dise" width="7%">焦炭产量</td><td class="dise" width="6%">全年<code>*</code></td>'+
				'<td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td>	<td class="dise" width="6%">3月</td>	<td class="dise" width="6%">4月</td>	<td class="dise" width="6%">5月</td>	<td class="dise" width="6%">6月</td>'+
				'<td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td>	<td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td>'+
				'<td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #lianjiao_table").html(lj_html);
}
//燃料1设备初始化
function data_ranliao2_data_Initialization(div){
	var fdj_rl_html = '<tr><td class="dise" width="9%">燃料类型<code>*</code></td><td class="dise" width="6%"></td><td class="dise" width="6%">全年<code>*</code></td><td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td>'+
				'<td class="dise" width="6%">3月</td><td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td><td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td>'+
				'<td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td><td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td></tr>';
	$("#"+div+" #zgxh_rl_table").html(fdj_rl_html);
	
	var fdj_rl_html2 = '<tr><td class="dise" width="9%"></td><td class="dise" width="6%">全年<code>*</code></td><td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td><td class="dise" width="6%">3月</td>'+
					'<td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td><td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td><td class="dise" width="6%">9月</td>'+
					'<td class="dise" width="6%">10月</td><td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #zgxh_rl_table2").html(fdj_rl_html2);
}
//燃料3设备初始化
function data_ranliao3_data_Initialization(div){
	var fdj_rl_html = '<tr><td class="dise" width="9%">燃料类型<code>*</code></td><td class="dise" width="9%"></td><td class="dise" width="6%">全年<code>*</code></td><td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td>'+
			'<td class="dise" width="6%">3月</td><td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td><td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td>'+
			'<td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td><td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#"+div+" #swgl_rl_table").html(fdj_rl_html);
}
//末端控制设备的分组初始化
function data_moduan_data_Initialization(data,div){
	$.each(data,function(index, content) {
		$.each(content,function(name,value) {
			if(name == "etaSO2name"){
				var index = moduan_1_kongzhi(div);
				$.each(content,function(v1,v2) {
					$("#"+div+" #tl"+index+" #"+v1).editable("setValue",v2);
				});
				$("#"+div+" #tl_table").show();
			}else if(name == "etaNOxname"){
				var index = moduan_2_kongzhi(div);
				$.each(content,function(v1,v2) {
					$("#"+div+" #tx"+index+" #"+v1).editable("setValue",v2);
				});
				$("#"+div+" #tx_table").show();
			}else if(name == "etaNOxxornot"){
				var index = moduan_3_kongzhi(div);
				$.each(content,function(v1,v2) {
					$("#"+div+" #dd"+index+" #"+v1).editable("setValue",v2);
				});
				$("#"+div+"  #dd_table").show();
			}else if(name == "etaPMname"){
				var index = moduan_4_kongzhi(div);
				$.each(content,function(v1,v2) {
					$("#"+div+" #cc"+index+" #"+v1).editable("setValue",v2);
				});
				$("#"+div+"  #cc_table").show();
			}else if(name == "etaVOChsname"){
				var index = moduan_5_kongzhi(div);
				$.each(content,function(v1,v2) {
					$("#"+div+" #yl"+index+" #"+v1).editable("setValue",v2);
				});
				$("#"+div+" #yl_table").show();
			}
		});
	});
}
//添加燃料
function add_rl(td_name,td,div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"rl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"fuelcalvalue\"></a></td>" +
			"<td><a id=\"sulfur\"></a></td>" +
			"<td><a id=\"ash\"></a></td>" +
			"<td><a id=\"volatile\"></a></td>" +
			"<td><a id=\"coalsource\"></a></td>" +
			"<td><a id=\"coaltrans\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	var kongzhi2 = "<tr id=\"rl"+index+"ver\" class=\"zhong\">" +
			"<td>"+td_name+"</td>" +
			"<td><a id=\""+td+"total\"></a></td>" +
			"<td><a id=\""+td+"1\"></a></td>" +
			"<td><a id=\""+td+"2\"></a></td>" +
			"<td><a id=\""+td+"3\"></a></td>" +
			"<td><a id=\""+td+"4\"></a></td>" +
			"<td><a id=\""+td+"5\"></a></td>" +
			"<td><a id=\""+td+"6\"></a></td>" +
			"<td><a id=\""+td+"7\"></a></td>" +
			"<td><a id=\""+td+"8\"></a></td>" +
			"<td><a id=\""+td+"9\"></a></td>" +
			"<td><a id=\""+td+"10\"></a></td>" +
			"<td><a id=\""+td+"11\"></a></td>" +
			"<td><a id=\""+td+"12\"></a></td>" +
			"</tr>";
	$("#"+div+" #fdj_rl_table").append(kongzhi);
	$("#"+div+" #fdj_rl_table2").append(kongzhi2);
	return index;
}
//有机原料
function add_yjyl(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yjyl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"amaterialname\"></a></td>" +
			"<td><a id=\"amaterialtotal\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yjyl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #yjyl_table").append(kongzhi);
	return index;
}
//表p2052_化纤生产信息表-产品信息
function add_lj_chanpin(div){
	var index = (new Date()).valueOf();
	var td = "aproduct";
	var kongzhi = "<tr id=\"lj_chanpin"+index+"\" class=\"zhong\">" +
			"<td><a id=\"aproducttype\"></a></td>" +
			"<td><a id=\"aproductname\"></a></td>" +
			"<td><a id=\"aproductunit\"></a></td>" +
			
			"<td><a id=\""+td+"total\"></a></td>" +
			"<td><a id=\""+td+"1\"></a></td>" +
			"<td><a id=\""+td+"2\"></a></td>" +
			"<td><a id=\""+td+"3\"></a></td>" +
			"<td><a id=\""+td+"4\"></a></td>" +
			"<td><a id=\""+td+"5\"></a></td>" +
			"<td><a id=\""+td+"6\"></a></td>" +
			"<td><a id=\""+td+"7\"></a></td>" +
			"<td><a id=\""+td+"8\"></a></td>" +
			"<td><a id=\""+td+"9\"></a></td>" +
			"<td><a id=\""+td+"10\"></a></td>" +
			"<td><a id=\""+td+"11\"></a></td>" +
			"<td><a id=\""+td+"12\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'lj_chanpin_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #lj_chanpin_table").append(kongzhi);
	return index;
}
//活动水平-溶剂
function add_rj_chanpin(div){
	var index = (new Date()).valueOf();
	var td = "asolvent";
	var kongzhi = "<tr id=\"rj_chanpin"+index+"\" class=\"zhong\">" +
			"<td><a id=\"asolventtype\"></a></td>" +
			"<td>溶剂使用量<br>(万吨)</td>" +
			"<td><a id=\""+td+"total\"></a></td>" +
			"<td><a id=\""+td+"1\"></a></td>" +
			"<td><a id=\""+td+"2\"></a></td>" +
			"<td><a id=\""+td+"3\"></a></td>" +
			"<td><a id=\""+td+"4\"></a></td>" +
			"<td><a id=\""+td+"5\"></a></td>" +
			"<td><a id=\""+td+"6\"></a></td>" +
			"<td><a id=\""+td+"7\"></a></td>" +
			"<td><a id=\""+td+"8\"></a></td>" +
			"<td><a id=\""+td+"9\"></a></td>" +
			"<td><a id=\""+td+"10\"></a></td>" +
			"<td><a id=\""+td+"11\"></a></td>" +
			"<td><a id=\""+td+"12\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rj_chanpin_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #rj_chanpin_table").append(kongzhi);
	return index;
}
//添加燃料
function add_swgl_rl(td,div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"swgl_rl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td>消费总量<br>(万吨)</td>" +
			"<td><a id=\""+td+"total\"></a></td>" +
			"<td><a id=\""+td+"1\"></a></td>" +
			"<td><a id=\""+td+"2\"></a></td>" +
			"<td><a id=\""+td+"3\"></a></td>" +
			"<td><a id=\""+td+"4\"></a></td>" +
			"<td><a id=\""+td+"5\"></a></td>" +
			"<td><a id=\""+td+"6\"></a></td>" +
			"<td><a id=\""+td+"7\"></a></td>" +
			"<td><a id=\""+td+"8\"></a></td>" +
			"<td><a id=\""+td+"9\"></a></td>" +
			"<td><a id=\""+td+"10\"></a></td>" +
			"<td><a id=\""+td+"11\"></a></td>" +
			"<td><a id=\""+td+"12\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
			"</tr>";
	$("#"+div+" #swgl_rl_table").append(kongzhi);
	return index;
}
//机动车
function add_jidongche(div){
	var index = (new Date()).valueOf();
	var td = "vehnum";
	var kongzhi = "<tr id=\"jidongche"+index+"\" class=\"zhong\">" +
			"<td><a id=\"constage\"></a></td>" +
			"<td>机动车数量<br>(辆/月)</td>" +
			"<td><a id=\""+td+"1\"></a></td>" +
			"<td><a id=\""+td+"2\"></a></td>" +
			"<td><a id=\""+td+"3\"></a></td>" +
			"<td><a id=\""+td+"4\"></a></td>" +
			"<td><a id=\""+td+"5\"></a></td>" +
			"<td><a id=\""+td+"6\"></a></td>" +
			"<td><a id=\""+td+"7\"></a></td>" +
			"<td><a id=\""+td+"8\"></a></td>" +
			"<td><a id=\""+td+"9\"></a></td>" +
			"<td><a id=\""+td+"10\"></a></td>" +
			"<td><a id=\""+td+"11\"></a></td>" +
			"<td><a id=\""+td+"12\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rj_chanpin_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #jidongche_table").append(kongzhi);
	return index;
}
//污染控制
function add_wuran(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"wuran"+index+"\" class=\"zhong\">" +
			"<td><a id=\"contype\"></a></td>" +
			"<td><a id=\"conratio\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'wuran_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #wuran_table").append(kongzhi);
	return index;
}
//堆场信息
function add_duichang(div){
	var index = (new Date()).valueOf();
	var num = GetRandomNum(1,10000000);
	var kongzhi = "<tr id=\"duichang"+index+"\" class=\"zhong\">" +
			"<td><a id=\"equipId\">DC"+num+"</a></td>" +
			"<td><a id=\"dctype\"></a></td>" +
			"<td><a id=\"otherdctype\"></a></td>" +
			"<td><a id=\"dcmat\"></a></td>" +
			"<td><a id=\"otherdcmat\"></a></td>" +
			"<td><a id=\"dcaera\"></a></td>" +
			"<td><a id=\"dcheight\"></a></td>" +
			"<td><a id=\"dcamount\"></a></td>" +
			"<td><a id=\"dcmeantrans\"></a></td>" +
			"<td><a id=\"dctransamount\"></a></td>" +
			"<td><a id=\"dustcontrol\"></a></td>" +
			"<td><a id=\"otherdustcontrol\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'duichang_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #duichang_table").append(kongzhi);
	return index;
}
//有机液体储罐信息
function add_yjytcg(div){
	var index = (new Date()).valueOf();
	var num = GetRandomNum(1,10000000);
	var kongzhi = "<tr id=\"yjytcg"+index+"\" class=\"zhong\">" +
			"<td><a id=\"equipId\">CG"+num+"</a></td>" +
			"<td><a id=\"equiptype\"></a></td>" +
			"<td><a id=\"volume\"></a></td>" +
			"<td><a id=\"height\"></a></td>" +
			"<td><a id=\"diameter\"></a></td>" +
			"<td><a id=\"component\"></a></td>" +
			"<td><a id=\"inoutnums\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yjytcg_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #yjytcg_table").append(kongzhi);
	return index;
}
//有机液体储罐信息
function add_yjytzz(div){
	var index = (new Date()).valueOf();
	var num = GetRandomNum(1,10000000);
	var kongzhi = "<tr id=\"yjytzz"+index+"\" class=\"zhong\">" +
			"<td><a id=\"xh\"></a></td>" +
			"<td><a id=\"equipname\"></a></td>" +
			"<td><a id=\"equipId\">ZZ"+num+"</a></td>" +
			"<td><a id=\"materialname\"></a></td>" +
			"<td><a id=\"zztype\"></a></td>" +
			"<td><a id=\"zzway\"></a></td>" +
			"<td><a id=\"zzamount\"></a></td>" +
			"<td><a id=\"density\"></a></td>" +
			"<td><a id=\"recover\"></a></td>" +
			"<td><a id=\"otherrecover\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yjytzz_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #yjytzz_table").append(kongzhi);
	return index;
}
//活动水平-溶剂2
function add_brj_chanpin(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"brj_chanpin"+index+"\" class=\"zhong\">" +
			"<td><a id=\"asolventtype\"></a></td>" +
			"<td><a id=\"solventstate\"></a></td>" +
			"<td><a id=\"asolventpaint\"></a></td>" +
			"<td><a id=\"asolventpaintunit\"></a></td>" +
			"<td><a id=\"asolventdilute\"></a></td>" +
			"<td><a id=\"asolventdiluteunit\"></a></td>" +
			"<td><a id=\"asolventglue\"></a></td>" +
			"<td><a id=\"asolventglueunit\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'brj_chanpin_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #brj_chanpin_table").append(kongzhi);
	return index;
}
//活动水平-溶剂2
function add_feiqi(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"feiqi"+index+"\" class=\"zhong\">" +
			"<td><a id=\"solventdeal\"></a></td>" +
			"<td><a id=\"solventdealratio\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'feiqi_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #feiqi_table").append(kongzhi);
	return index;
}
function add_zg_rl(title1,td1,title2,td2,div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"zg_rl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td>"+title1+"</td>" +
			"<td><a id=\""+td1+"total\"></a></td>" +
			"<td><a id=\""+td1+"1\"></a></td>" +
			"<td><a id=\""+td1+"2\"></a></td>" +
			"<td><a id=\""+td1+"3\"></a></td>" +
			"<td><a id=\""+td1+"4\"></a></td>" +
			"<td><a id=\""+td1+"5\"></a></td>" +
			"<td><a id=\""+td1+"6\"></a></td>" +
			"<td><a id=\""+td1+"7\"></a></td>" +
			"<td><a id=\""+td1+"8\"></a></td>" +
			"<td><a id=\""+td1+"9\"></a></td>" +
			"<td><a id=\""+td1+"10\"></a></td>" +
			"<td><a id=\""+td1+"11\"></a></td>" +
			"<td><a id=\""+td1+"12\"></a></td></tr>" ;
	
	var kongzhi2 = "<tr id=\"zg_rl"+index+"ver\" class=\"zhong\">" +
			"<td>"+title2+"</td>" +
			"<td><a id=\""+td2+"mean\"></a></td>" +
			"<td><a id=\""+td2+"1\"></a></td>" +
			"<td><a id=\""+td2+"2\"></a></td>" +
			"<td><a id=\""+td2+"3\"></a></td>" +
			"<td><a id=\""+td2+"4\"></a></td>" +
			"<td><a id=\""+td2+"5\"></a></td>" +
			"<td><a id=\""+td2+"6\"></a></td>" +
			"<td><a id=\""+td2+"7\"></a></td>" +
			"<td><a id=\""+td2+"8\"></a></td>" +
			"<td><a id=\""+td2+"9\"></a></td>" +
			"<td><a id=\""+td2+"10\"></a></td>" +
			"<td><a id=\""+td2+"11\"></a></td>" +
			"<td><a id=\""+td2+"12\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'zgxh_rl_table2')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #zgxh_rl_table").append(kongzhi);
	$("#"+div+" #zgxh_rl_table2").append(kongzhi2);
	return index;
}
//焦炭产量增加行
function add_jiaotan (td,div) {
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"jiaotan"+index+"\" class=\"zhong\">" +
			"<td><a id=\"aproducttype\"></a></td>" +
			"<td>焦炭产量<br>(万吨)</td>" +
			"<td><a id=\""+td+"total\"></a></td>" +
			"<td><a id=\""+td+"1\"></a></td>" +
			"<td><a id=\""+td+"2\"></a></td>" +
			"<td><a id=\""+td+"3\"></a></td>" +
			"<td><a id=\""+td+"4\"></a></td>" +
			"<td><a id=\""+td+"5\"></a></td>" +
			"<td><a id=\""+td+"6\"></a></td>" +
			"<td><a id=\""+td+"7\"></a></td>" +
			"<td><a id=\""+td+"8\"></a></td>" +
			"<td><a id=\""+td+"9\"></a></td>" +
			"<td><a id=\""+td+"10\"></a></td>" +
			"<td><a id=\""+td+"11\"></a></td>" +
			"<td><a id=\""+td+"12\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'lianjiao_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #lianjiao_table").append(kongzhi);
	return index;
 }
//脱硫设备增加行
function moduan_1_kongzhi(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"tl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"etaSO2agentname\"></a></td>" +
			"<td><a id=\"etaSO2agentamount\"></a></td>" +
			"<td><a id=\"etaSO2bypass\"></a></td>" +
			"<td><a id=\"etaSO2eta\"></a></td>" +
			"<td><a id=\"etaSO2ratio\"></a></td>" +
			"<td><a id=\"etaSO2startdate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'tl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #tl_table").append(kongzhi);
	return index;
}
//通用的设备删除行
function moduan_delete(obj, table){}
//脱硝设备增加行
function moduan_2_kongzhi(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"tx"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaNOxname\"></a></td>" +
			"<td><a id=\"etaNOxagentname\"></a></td>" +
			"<td><a id=\"etaNOxagentamount\"></a></td>" +
			"<td><a id=\"etaNOxeta\"></a></td>" +
			"<td><a id=\"etaNOxratio\"></a></td>" +
			"<td><a id=\"etaNOxstartdate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'tx_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #tx_table").append(kongzhi);
	$.each(moduan_peizhi_2, function(i, column) {});
	return index;
}
//低氮燃烧技增加行
function moduan_3_kongzhi(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"dd"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaNOxxornot\"></a></td>" +
			"<td><a id=\"etaNOxxstartdate\"></a></td>" +
			"<td><a id=\"etaNOxxconcentrate\"></a></td>" +
			"<td><a id=\"etaNOxxratio\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'dd_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #dd_table").append(kongzhi);
	$.each(moduan_peizhi_3, function(i, column) {});
	return index;
}
//除尘设备增加行
function moduan_4_kongzhi(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"cc"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"etawindamount\"></a></td>" +
			"<td><a id=\"etaPMjqratio\"></a></td>" +
			"<td><a id=\"etaPMeta\"></a></td>" +
			"<td><a id=\"etaPMratio\"></a></td>" +
			"<td><a id=\"etaPMstartdate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'cc_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #cc_table").append(kongzhi);
	return index;
}
//添加有机废气处理增加行
function moduan_5_kongzhi(div){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaVOChsname\"></a></td>" +
			"<td><a id=\"equipIdvochs\"></a></td>" +
			"<td><a id=\"etaVOCxhname\"></a></td>" +
			"<td><a id=\"equipIdvocxh\"></a></td>" +
			"<td><a id=\"etaVOCeta\"></a></td>" +
			"<td><a id=\"etaVOCwind\"></a></td>" +
			"<td><a id=\"etaVOChours\"></a></td>" +
			"<td><a id=\"etaVOCcons\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+div+" #yl_table").append(kongzhi);
	return index;
}


//判断编辑状态
function edit_show(){
	if($('#xinxi_title').is(':visible')){
		return true;
	}else{
		return false;
	}
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