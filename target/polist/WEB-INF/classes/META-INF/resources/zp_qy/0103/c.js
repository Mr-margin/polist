var emptytext = "请填写";
var version = "1.0";
var edit_state_url = "";//保存和修改的地址
var equipId_update = "";//排污许可证编号，专用于编辑时，返回原始的内容，否则修改可能变成新建
var stype ="";//查看还是编辑

/**说明
 * 设备基本与活动水平都是一一对应的
 * 末端控制：
 * 		moduankongzhi_1： 工业
 * 在线监测：
 * 		zaixianjiance_1： 工业
 */
var sheet_name = "";//全局，表示当前活动的是哪种设备
//生成弹出框样式
function generate_select_style(industry){
	
	var select_shebei_t = "";
	var select_shebei_1 = "";
	var select_shebei_2 = "";
	var select_shebei_3 = "";
	var select_shebei_4 = "";
	
	var kaishi = '<li><a href="#" class="export-a shebei-a" onclick="';

	var jieshu = '</a></li>';
	
	var select_html_1 = kaishi+'New_equipment(\'表p1011_机组信息表\');">发电机组'+jieshu;
	var select_html_2 = kaishi+'New_equipment(\'表p02_锅炉信息表\');">工业锅炉'+jieshu;
	var select_html_3 = kaishi+'New_equipment(\'表p2011_烧结工序信息表\');">烧结'+jieshu;
	var select_html_4 = kaishi+'New_equipment(\'表p2012_炼铁工序信息表\');">炼铁'+jieshu;
	var select_html_5 = kaishi+'New_equipment(\'表p2013_炼钢工序信息表\');">炼钢'+jieshu;
	
	var select_html_5_1 = kaishi+'New_equipment(\'表p2014_球团工序信息表\');">球团'+jieshu;
	var select_html_5_3 = kaishi+'New_equipment(\'表p2015_轧钢信息表\');">轧钢'+jieshu;
	var select_html_5_4 = kaishi+'New_equipment(\'表p2016_石灰石信息表\');">石灰石'+jieshu;
	var select_html_5_5 = kaishi+'New_equipment(\'表p07_有机液体储罐信息表\');">有机液体储罐'+jieshu;
	var select_html_5_6 = kaishi+'New_equipment(\'表p08_有机液体装载信息表\');">有机液体装载'+jieshu;
	
	
	
	var select_html_6 = kaishi+'New_equipment(\'表p05_炼焦工序信息表\');">炼焦'+jieshu;
	var select_html_7 = kaishi+'New_equipment(\'表p2021_熟料生产信息表\');">熟料生产'+jieshu;
	var select_html_8 = kaishi+'New_equipment(\'表p2022_水泥生产信息表\');">水泥生产'+jieshu;
	var select_html_9 = kaishi+'New_equipment(\'表p2031_玻璃生产信息表\');">玻璃生产'+jieshu;
	var select_html_10 = kaishi+'New_equipment(\'表p2052_化纤生产信息表\');">化纤生产'+jieshu;
	var select_html_11 = kaishi+'New_equipment(\'表p2051_化工生产信息表\');">化工生产'+jieshu;
	
	var select_html_11_1 = kaishi+'New_equipment(\'表p2053_泄漏实施LDAR信息表\');">泄漏实施LDAR'+jieshu;
	var select_html_11_2 = kaishi+'New_equipment(\'表p2054_泄漏未实施LDAR信息表\');">泄漏未实施LDAR'+jieshu;
	
	
	var select_html_12 = kaishi+'New_equipment(\'表p2081_其他工业生产信息表\');">其他工业生产'+jieshu;
	var select_html_13 = kaishi+'New_equipment(\'表p9011_废水处理信息表\');">废水处理'+jieshu;
	var select_html_14 = kaishi+'New_equipment(\'表p9021_固废处理信息表\');">固废处理'+jieshu;
	var select_html_15 = kaishi+'New_equipment(\'表p9031_烟气脱硝信息表\');">烟气脱硝'+jieshu;
	var select_html_16 = kaishi+'New_equipment(\'表p7011_生物质锅炉信息表\');">生物质锅炉'+jieshu;
	var select_html_17 = kaishi+'New_equipment(\'表p4011_印刷印染信息表\');">印刷印染'+jieshu;
	var select_html_18 = kaishi+'New_equipment(\'表p4021_表面喷涂信息表\');">表面喷涂'+jieshu;
	var select_html_19 = kaishi+'New_equipment(\'表p4032_干洗信息表\');">干洗'+jieshu;
	var select_html_20 = kaishi+'New_equipment(\'表p5012_畜禽养殖量信息表\');">畜禽养殖'+jieshu;
	var select_html_21 = kaishi+'New_equipment(\'表p6012_施工扬尘信息表\');">工地'+jieshu;
	var select_html_22 = kaishi+'New_equipment(\'表p06_堆场信息表\');">堆场'+jieshu;
	
	
	
	var kong = '<li><a href="#" class="export-a shebei-a">&nbsp;</a></li>';	
	if(industry == "电力生产"){
		select_shebei_t = select_html_1+select_html_22+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_2+select_html_3+select_html_4+select_html_5+select_html_6+select_html_7+select_html_5_5;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_21+select_html_12+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4+kong;
	}else if(industry == "石油加工、炼焦和核燃料加工业"){
		select_shebei_t = select_html_2+select_html_22+select_html_6+select_html_12+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_3+select_html_4+select_html_5+select_html_7+select_html_5_5+select_html_5_6;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14+select_html_11_1;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_11_2;
		select_shebei_4 = select_html_21+select_html_5_1+select_html_5_3+select_html_5_4+kong+kong+kong;
	}else if(industry == "非金属矿物制品业"){
		select_shebei_t = select_html_2+select_html_22+select_html_7+select_html_8+select_html_9+kong+kong;
		select_shebei_1 = select_html_1+select_html_12+select_html_5_5+select_html_5_6+select_html_11_1+select_html_11_2+select_html_5_1;
		select_shebei_2 = select_html_10+select_html_11+select_html_13+select_html_14+select_html_4+select_html_3+select_html_5_3;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_5_4;
		select_shebei_4 = select_html_21+select_html_6+select_html_5+kong+kong+kong+kong;
	}else if(industry == "黑色金属冶炼和压延加工业"){
		select_shebei_t = select_html_2+select_html_22+select_html_6+select_html_5+select_html_4+select_html_3+kong;
		select_shebei_1 = select_html_1+select_html_12+select_html_7+select_html_5_5+select_html_5_6+select_html_11_1+select_html_11_2;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14+select_html_5_1;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_5_3;
		select_shebei_4 = select_html_21+select_html_5_4+kong+kong+kong+kong+kong;
	}else if(industry == "橡胶和塑料制品业"){
		select_shebei_t = select_html_2+select_html_22+select_html_12+select_html_7+select_html_8+select_html_9+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_5_5+select_html_5_6+select_html_11_1+select_html_11_2;
		select_shebei_2 = select_html_4+select_html_3+select_html_10+select_html_11+select_html_13+select_html_14+select_html_5_1;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_5_3;
		select_shebei_4 = select_html_21+select_html_5_4+kong+kong+kong+kong+kong;
	}else if(industry == "化学原料和化学制品制造业"){
		select_shebei_t = select_html_2+select_html_22+select_html_11+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_10+select_html_12+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_21+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4+kong+kong;
	}else if(industry == "化学纤维制造业"){
		select_shebei_t = select_html_2+select_html_22+select_html_10+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_21+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4+kong+kong;
	}else if(industry == "印刷印染"){
		select_shebei_t = select_html_17+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_18+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_2+select_html_22+select_html_21+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "工业喷涂"){
		select_shebei_t = select_html_18+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_2+select_html_22+select_html_21+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "施工扬尘"){
		select_shebei_t = select_html_21+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_2+select_html_22+select_html_18+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "堆场扬尘"){
		select_shebei_t = select_html_22+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_2+select_html_21+select_html_18+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "废水处理"){
		select_shebei_t = select_html_13+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_14+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_2+select_html_22+select_html_18+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "固废处理"){
		select_shebei_t = select_html_14+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_2+select_html_22+select_html_18+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "其它溶剂使用"){
		select_shebei_t = select_html_19+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_2+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "畜禽养殖"){
		select_shebei_t = select_html_20+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_22+select_html_19+select_html_11_1;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "生活垃圾"){
		select_shebei_t = select_html_22+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20+select_html_11_1;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "生物质燃料"){
		select_shebei_t = select_html_16+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_20+select_html_10+select_html_17+select_html_22+select_html_19+select_html_11_1;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
		
	}else if(industry == "烟气脱硝"){
		select_shebei_t = select_html_15+kong+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_16+select_html_20+select_html_10+select_html_17+select_html_22+select_html_19+select_html_11_1;
		select_shebei_4 = select_html_18+select_html_2+select_html_14+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4;
	}else if(industry == "电力供应"||industry == "工业热力生产和供应"||industry == "民用热力生产和供应"||industry == "燃气生产和供应业"){
		select_shebei_t = select_html_2+select_html_22+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9+select_html_5_5;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13+select_html_5_6;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_20+select_html_19+select_html_11_1;
		select_shebei_4 = select_html_18+select_html_14+select_html_11_2+select_html_5_1+select_html_5_3+select_html_5_4+kong;
	}else{
		select_shebei_t = select_html_2+select_html_22+select_html_12+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_3+select_html_4+select_html_5+select_html_6+select_html_5_5+select_html_5_6;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_11_1+select_html_11_2+select_html_13;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20+select_html_14;
		select_shebei_4 = select_html_21+select_html_7+select_html_5_1+select_html_5_3+select_html_5_4+kong+kong;
	}
	
	$("#select_shebei_t").html(select_shebei_t);
	$("#select_shebei_1").html(select_shebei_1);
	$("#select_shebei_2").html(select_shebei_2);
	$("#select_shebei_3").html(select_shebei_3);
	$("#select_shebei_4").html(select_shebei_4);
}

//选择要新建的设备，进行页面控制
function New_equipment(type){
	$("#dialog-xuanzeshebei").dialog( "close" );//关闭设备列表
	$("#xinxi_title_name").html(type);//头部标题控制
	$("#xinxi_title").show();//头部标题显示
	$("#xinxi_box").show();//内容外框
	$("#zhanwei").hide();//占位隐藏
	$("#xinxi_box").children().hide();//内容节点下所有一级子元素全部隐藏
	//根据设备类型循环所有的配置项，找出对应的页面结构进行显示
	for(var k = 0;k<sheet.length;k++){
		if(sheet[k].key == type){
			for(var p = 0;p<sheet[k].value.length;p++){
				$("#"+sheet[k].value[p]).show();
				var num = GetRandomNum(1,10000000);
				$("#"+sheet[k].value[0]+" #equipId").editable("setValue",bianhao[$("#xinxi_title_name").html()]+num);
				$("#"+sheet[k].value[0]+" #year").editable("setValue",year);
				$("#"+sheet[k].value[0]+" #year").html(year);
			}
		}
	}
	//初始化
	chushihua_moduan();
	data_ranliao_data_Initialization();
	data_lianjiao_data_Initialization();
	data_yjyl_data_Initialization();
	data_chanpin_data_Initialization();
	data_rongji_data_Initialization(); 
	data_rjsy_data_Initialization();
	data_feiqi_data_Initialization();
	data_jidongche_data_Initialization();
	data_wuran_data_Initialization();
	data_duichang_data_Initialization();
//	data_yunzai_data_Initialization();
//	data_cuoshi_data_Initialization();
	data_yjytcg_data_Initialization();
	data_yjytzz_data_Initialization();
	data_ranliao2_data_Initialization();
	data_ranliao3_data_Initialization();
	
	
	$("#shebei_1 #cogenerationornot").editable("setValue","否");//是否热电联产
	$("#zaixianjiance_1 #installornot").editable("setValue","否");//在线监测是否安装初始化
	
	//平滑定位到设备详细信息
	$('html, body').animate({
		scrollTop: $($.attr(this, 'xinxi_title')).offset().top
	}, 500);
	sheet_name = type;//记录当前的活动设备
	edit_state_url = BackstageIP+"dto/insert.do";//地址切换为新建
	$("#save").show();
	$("#close").show();
//	$('.editable').editable('enable');
}

//初始化末端控制设备
function chushihua_moduan(){
	var tl_table_html = "<tr class=\"dise\"><td width=\"13%\">脱硫工艺<code>*</code></td><td width=\"13%\">脱硫剂名称</td>" +
	"<td width=\"12%\">脱硫剂使用量<br>(吨)</td><td width=\"12%\">脱硫烟气旁路</td>" +
	"<td width=\"11%\">脱硫岛效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
	"<td width=\"6%\">操作</td></tr>";
$("#tl_table").html(tl_table_html);
$('#tl_table').hide();

var tx_table_html = "<tr class=\"dise\"><td width=\"13%\">脱硝工艺<code>*</code></td><td width=\"13%\">脱硝剂名称</td>" +
		"<td width=\"24%\">脱硝剂使用量<br>(吨)</td><td width=\"11%\">脱硝效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td>" +
		"<td width=\"11%\">投运时间<br>(年/月/日)</td><td width=\"6%\">操作</td></tr>";
$("#tx_table").html(tx_table_html);
$('#tx_table').hide();

var dd_table_html = "<tr class=\"dise\"><td width=\"20%\">是否采用低氮燃烧技术<code>*</code></td><td width=\"11%\">投运时间<br>(年/月)</td>" +
		"<td width=\"11%\">燃烧器出口浓度<br>(mg/m3)</td><td width=\"11%\">投运率<br>(%)</td>" +
		"<td width=\"6%\">操作</td></tr>";
$("#dd_table").html(dd_table_html);
$('#dd_table').hide();

var cc_table_html = "<tr class=\"dise\"><td width=\"13%\">除尘工艺<code>*</code></td><td width=\"13%\">除尘风机总风量<br>(立方米/小时)</td><td width=\"11%\">废气收集率<br>(%)</td>" +
		"<td width=\"11%\">除尘效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
		"<td width=\"6%\">操作</td></tr>";
$("#cc_table").html(cc_table_html);
$('#cc_table').hide();

var yl_table_html = "<tr class=\"dise\"><td width=\"13%\">voc回收技术<code>*</code></td><td width=\"13%\">其他回收技术</td><td width=\"11%\">voc销毁技术<code>*</code></td>" +
"<td width=\"11%\">其他回收技术</td><td width=\"11%\">处理效率<br>(%)</td><td width=\"11%\">设备风量<br>(立方米/小时)</td><td width=\"11%\">年运行时间<br>(小时)</td><td width=\"11%\">有机废气排放浓度<br>(毫克/立方米)</td>" +
"<td width=\"6%\">操作</td></tr>";
$("#yl_table").html(yl_table_html);
$('#yl_table').hide();
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   
//查询设备总览
function shebei_list(){
	var data = ajax_async_t(BackstageIP+"dto/findEquip.do",{taskId:taskId,userId:userId,version:version},"json ","true");
	var html='<tr class="dise"><td>序号</td><td>设备类型</td><td>设备编号</td><td>投运时间(年/月/日)</td> <td>关停时间(年/月/日)</td><td>状态</td><td>操作</td></tr>';
	var k = 0;
	if ( data !=null && data != undefined ) {
		$.each(data,function(i,item){
			var num = i+1;
			var type_name = item.sheet.substring(item.sheet.indexOf("_")+1);
			
			html +=' <tr> <td>'+num+'</td><td>'+type_name+'</td><td>'+item.equipId+'</td><td>'+item.startdate+'</td> <td>'+item.enddate+'</td><td>'+item.status+'</td>';
			
			if(stype=="look"){
				html += '<td class="zhong"><a onclick="update_shebei(\''+item.equipId+'\',\''+item.sheet+'\',1)">查看</a></tr></td>';
			} else {
				if ( item.status == "通过" || item.status == "待审核" ) {
					html += '<td class="zhong"><a onclick="update_shebei(\''+item.equipId+'\',\''+item.sheet+'\',1)">查看</a></tr></td>';
				} else {
					html += '<td class="zhong"><a onclick="update_shebei(\''+item.equipId+'\',\''+item.sheet+'\',0)">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a onclick="delete_tishi(\''+item.equipId+'\')">删除</a></tr></td>';
				}
			}
					
			k += 34;
		});
	}
	if(document.body.clientHeight>(86+56+212+188+k)){
		//当设备少的时候，屏幕高度大于头尾等固定内容+设备行数高度，需要占位的空行，保证一屏显示
		$("#zhanwei").css("height",(document.body.clientHeight-(452+k))+"px");
		$("#zhanwei").show();
	}
	$("#shebei_list").html(html);
}
var look_or_up = "";//某个设备是查看还是编辑状态
//编辑设备
function update_shebei(equipId, type,sta){
	$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-tiaozhuan").dialog("open");
	window.setTimeout(function() {
		var data = ajax_async_t(BackstageIP+"dto/selectEquip.do",{taskId:taskId,userId:userId,equipId:equipId,version:version},"json");
		if ( data != null && data != undefined ) {
			$("#xinxi_title_name").html(type);//头部标题控制
			$("#xinxi_title").show();//头部标题显示
			$("#xinxi_box").show();//内容外框
			$("#zhanwei").hide();//占位隐藏
			$("#xinxi_box").children().hide();//内容节点下所有一级子元素全部隐藏
			//末端控制设备初始化
			chushihua_moduan();
			$("#shebei_1 #cogenerationornot").editable("setValue","否");//是否热电联产
			$("#zaixianjiance_1 #installornot").editable("setValue","否");//在线监测是否安装初始化
			//根据设备类型循环所有的配置项，找出对应的页面结构进行显示，一些特殊的页面单独处理
			equipId_update = equipId;
			for(var k = 0;k<sheet.length;k++){
				if(sheet[k].key == type){
					for(var p = 0;p<sheet[k].value.length;p++){
						$("#"+sheet[k].value[p]).show();
						try {
							$.each(data[type],function(index, content) {
								$.each(content,function(name,value) {
									if( name == "year" ) {
									} else {
										$("#"+sheet[k].value[p]+" #"+name).editable("setValue",value);
										
										$.each(sheet[k].Strengthen,function(v1,v2) {//循环加强显示
											if(name == v2){
												$("#"+sheet[k].value[p]+" #"+name).html(value);
											}
										});
									}
									
								});
							});
						} catch (e) {
							// TODO: handle exception
						}
						$("#"+sheet[k].value[0]+" #year").html(window.sessionStorage.getItem("year"));
						$("#"+sheet[k].value[0]+" #year").editable("setValue",window.sessionStorage.getItem("year"));
						if(sheet[k].value[p] == "shebei_20"||sheet[k].value[p] == "shebei_21"||sheet[k].value[p] == "shebei_22"){
							
						}else{
							if(sheet[k].value[p].indexOf("moduankongzhi")>=0){
								if(typeof data["表p01_末端控制设备信息表"] != "undefined"){
									data_moduan_data_Initialization(data["表p01_末端控制设备信息表"],sheet[k].value[p],type);
								}
							}else if(sheet[k].value[p].indexOf("zaixianjiance")>=0){
								//这里在线监测和末端控制如果多了，以后可以判断type的内容决定用什么值
								$.each(data["表p03_在线监测信息表"],function(index, content) {
									$.each(content,function(name,value) {
										$("#"+sheet[k].value[p]+" #"+name).editable("setValue",value);
									});
								});
							}else if(sheet[k].value[p].indexOf("lianjiaohuaxuejiagong")>=0){
								//这里在线监测和末端控制如果多了，以后可以判断type的内容决定用什么值
								if(typeof data["表p051_炼焦工序化学加工环节信息表"] != "undefined"){
									$.each(data["表p051_炼焦工序化学加工环节信息表"],function(index, content) {
										$.each(content,function(name,value) {
											$("#"+sheet[k].value[p]+" #"+name).editable("setValue",value);
										});
									});
								}
							}
						}
						$("#"+sheet[k].value[0]+" #year").editable("setValue",year);
						$("#"+sheet[k].value[0]+" #year").html(year);
					}
				}
			}
			
			var str = $("#xinxi_title_name").html()+"v燃料信息";
			if (data[str] != "" && data[str] != null && data[str] != undefined ) {
				if ( $("#xinxi_title_name").html() == "表p2011_烧结工序信息表" || $("#xinxi_title_name").html() == "表p2014_球团工序信息表" ||$("#xinxi_title_name").html() == "表p05_炼焦工序信息表" || $("#xinxi_title_name").html() == "表p2015_轧钢信息表" || $("#xinxi_title_name").html() == "表p2016_石灰石信息表") {
					data_ranliao2_data_Initialization();
					$("#zgxh_rl_table").show("");
					$("#zgxh_rl_table2").show("");
					for ( var j = 0 ; j < data[str].length; j ++ ) {
						var index = add_zg_rl("燃料消耗量(万吨)","afuel","含硫量(％)","sulfur");
						$.each(data[str][j],function(i,g) {
							$("#zg_rl"+index+" #"+i).editable("setValue",g);
							$("#zg_rl"+index+"ver #"+i).editable("setValue",g);
						});
					}
				} else if ( $("#xinxi_title_name").html() == "表p7011_生物质锅炉信息表" || $("#xinxi_title_name").html() == "表p9031_烟气脱硝信息表" ){
					data_ranliao3_data_Initialization();
					$("#swgl_rl_table").show();
					for ( var j = 0 ; j < data[str].length; j ++ ) {
						var index = add_swgl_rl("afuel");
						$.each(data[str][j],function(i,g) {
							 $("#swgl_rl"+index+" #"+i).editable("setValue",g);
						});
					}
				}else {
					data_ranliao_data_Initialization();
					$("#fdj_rl_table").show("");
					$("#fdj_rl_table2").show("");
					for ( var j = 0 ; j < data[str].length; j ++ ) {
						var index = add_rl(hangye_year[$("#xinxi_title_name").html()].name,hangye_year[$("#xinxi_title_name").html()].year_name);
						$.each(data[str][j],function(i,g) {
							$("#rl"+index+" #"+i).editable("setValue",g);
							$("#rl"+index+"ver #"+i).editable("setValue",g);
						});
					}
				}
			}
			
			//焦炭产量
			var ste = "表p051_炼焦工序化学加工环节信息表v焦炭产量";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_lianjiao_data_Initialization();
				$("#lianjiao_table").show("");
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_jiaotan("aproduct");
					$.each(data[ste][j],function(i,g) {
						$("#jiaotan"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//有机原料
			var ste =  $("#xinxi_title_name").html()+"v有机原料信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_yjyl_data_Initialization();
				$("#yjyl_table").show("");
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_yjyl();
					$.each(data[ste][j],function(i,g) {
						$("#yjyl"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//产品信息
			var ste =  $("#xinxi_title_name").html()+"v产品信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_chanpin_data_Initialization();
				$("#lj_chanpin_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_lj_chanpin();
					$.each(data[ste][j],function(i,g) {
						$("#lj_chanpin"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//溶剂
			var ste =  $("#xinxi_title_name").html()+"v溶剂信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_rongji_data_Initialization();
				$("#rj_chanpin_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_rj_chanpin();
					$.each(data[ste][j],function(i,g) {
						$("#rj_chanpin"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//溶剂使用
			var ste =  $("#xinxi_title_name").html()+"v溶剂使用";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_rjsy_data_Initialization();
				$("#brj_chanpin_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_brj_chanpin();
					$.each(data[ste][j],function(i,g) {
						$("#brj_chanpin"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//废气信息
			var ste =  $("#xinxi_title_name").html()+"v废气信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_feiqi_data_Initialization();
				$("#feiqi_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_feiqi();
					$.each(data[ste][j],function(i,g) {
						$("#feiqi"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//机动车
			var ste =  $("#xinxi_title_name").html()+"v机动车信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_jidongche_data_Initialization();
				$("#jidongche_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_jidongche();
					$.each(data[ste][j],function(i,g) {
						$("#jidongche"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//污染
			var ste =  $("#xinxi_title_name").html()+"v污染控制";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_wuran_data_Initialization();
				$("#wuran_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_wuran();
					$.each(data[ste][j],function(i,g) {
						$("#wuran"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//堆场信息
			var ste =  $("#xinxi_title_name").html()+"v堆场信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_duichang_data_Initialization();
				$("#duichang_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_duichang();
					$.each(data[ste][j],function(i,g) {
						$("#duichang"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//有机液体储罐信息
			var ste =  $("#xinxi_title_name").html()+"v有机液体储罐信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_yjytcg_data_Initialization();
				$("#yjytcg_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_yjytcg();
					$.each(data[ste][j],function(i,g) {
						$("#yjytcg"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//有机液体装载信息
			var ste =  $("#xinxi_title_name").html()+"v有机液体装载信息";
			if (data[ste] != "" && data[ste] != null && data[ste] != undefined ) {
				data_yjytzz_data_Initialization();
				$("#yjytzz_table").show();
				for ( var j = 0 ; j < data[ste].length; j ++ ) {
					var index = add_yjytzz();
					$.each(data[ste][j],function(i,g) {
						$("#yjytzz"+index+" #"+i).editable("setValue",g);
					});
				}
			}
			//平滑定位到设备详细信息
			$('html, body').animate({
				scrollTop: $($.attr(this, 'xinxi_title')).offset().top
			}, 500);
			sheet_name = type;//记录当前的活动设备
			edit_state_url = BackstageIP+"dto/updateEquip.do";//地址切换为修改
		}else{
			if( data == undefined || data == null || data == "" ) {
				$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>内部错误！</b><br>错误代码：无返回值</span>");
				$("#dialog-tiaozhuan").dialog("open");
			} else {
				
			}
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>内部错误！</b><br>错误代码："+JSON.stringify(data.code)+"</span>");
			$("#dialog-tiaozhuan").dialog("open");
		}
		look_or_up = sta;
		if( sta == 1  ){
			$("#save").hide();
//			$("#close").hide();
//			$('.editable').editable('disable');
		}else{
			$("#save").show();
			$("#close").show();
//			$('.editable').editable('enable');
		}
		$("#dialog-tiaozhuan").dialog("close");
	}, 0)
}
//燃料1设备初始化
function data_ranliao_data_Initialization(){
	var fdj_rl_html = '<tr><td width="17%" class="dise">燃料类型<code>*</code></td><td width="15%" class="dise">燃料热值<br>(千卡/千克或千卡/标准立方米)</td>'+
					'<td width="10%" class="dise">燃料硫份<code>*</code><br>(%)</td><td width="10%" class="dise">燃料灰分<code>*</code><br>(%)</td>'+
					'<td width="10%" class="dise">燃料挥发分<code>*</code><br>(%)</td><td width="10%" class="dise">煤炭来源地</td><td width="15%" class="dise">煤炭运输方式</td><td width="10%" class="dise">操作</td></tr>';
	$("#fdj_rl_table").html(fdj_rl_html);
	
	var fdj_rl_html2 = '<tr><td class="dise" width="9%"></td><td class="dise" width="7%">全年<code>*</code></td><td class="dise" width="7%">1月</td>'+
				'<td class="dise" width="7%">2月</td><td class="dise" width="7%">3月</td><td class="dise" width="7%">4月</td><td class="dise" width="7%">5月</td>'+
				'<td class="dise" width="7%">6月</td><td class="dise" width="7%">7月</td><td class="dise" width="7%">8月</td><td class="dise" width="7%">9月</td>'+
				'<td class="dise" width="7%">10月</td><td class="dise" width="7%">11月</td><td class="dise" width="7%">12月</td></tr>';
	$("#fdj_rl_table2").html(fdj_rl_html2);
	
	$('#fdj_rl_table').hide();
	$('#fdj_rl_table2').hide();
}
//焦炭产量信息初始化
function data_lianjiao_data_Initialization(){
	var lj_html = '<tr height="51px"><td class="dise" width="9%">产品类型<code>*</code></td><td class="dise" width="7%">焦炭产量</td><td class="dise" width="6%">全年<code>*</code></td>'+
				'<td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td>	<td class="dise" width="6%">3月</td>	<td class="dise" width="6%">4月</td>	<td class="dise" width="6%">5月</td>	<td class="dise" width="6%">6月</td>'+
				'<td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td>	<td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td>'+
				'<td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#lianjiao_table").html(lj_html);
	$("#lianjiao_table").hide();
}
//焦炭产量信息初始化
function data_yjyl_data_Initialization(){
	var lj_html = '<tr><td width="20%" class="dise">名称<code>*</code></td><td width="20%" class="dise">使用量(吨)<code>*</code></td><td width="10%" class="dise">操作</td></tr>';
	$("#yjyl_table").html(lj_html);
	$("#yjyl_table").hide();
}
//产品信息初始化
function data_chanpin_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">产品类型<code>*</code></td><td class="dise" width="6%">产品名称<code>*</code></td><td class="dise" width="6%"> 产品产量单位<code>*</code></td><td class="dise" width="6%">全年<code>*</code></td>'+
			'<td class="dise" width="5%">1月</td><td class="dise" width="5%">2月</td><td class="dise" width="5%">3月</td><td class="dise" width="5%">4月</td><td class="dise" width="5%">5月</td><td class="dise" width="5%">6月</td><td class="dise" width="5%">7月</td>'+
			'<td class="dise" width="5%">8月</td><td class="dise" width="5%">9月</td><td class="dise" width="5%">10月</td><td class="dise" width="5%">11月</td><td class="dise" width="5%">12月</td><td class="dise" width="5%">操作</td></tr>';
	$("#lj_chanpin_table").html(lj_html);
	$("#lj_chanpin_table").hide();
}
//溶剂信息
function data_rongji_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">溶剂类型<code>*</code></td><td class="dise" width="7%"></td><td class="dise" width="6%">全年<code>*</code></td>'+
			'<td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td><td class="dise" width="6%">3月</td><td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td>'+
			'<td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td><td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td>'+
			'<td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#rj_chanpin_table").html(lj_html);
	$("#rj_chanpin_table").hide();
}
//溶剂使用
function data_rjsy_data_Initialization(){
	var lj_html = '<tr><td class="dise" rowspan="2" width="9%">溶剂类型<code>*</code></td><td class="dise" rowspan="2" width="9%">溶剂性质<code>*</code></td><td class="dise" colspan="2" >涂料(油漆)</td>'+
		'<td class="dise" colspan="2">稀释剂</td><td class="dise" colspan="2">胶黏剂</td><td class="dise" rowspan="2" width="6%">操作</td></tr><tr><td width="8%" class="dise" >年用量<code>*</code></td>'+
		'<td width="8%" class="dise" >单位<code>*</code></td><td width="8%" class="dise" >年用量<code>*</code></td><td width="8%" class="dise" >单位<code>*</code></td><td width="8%" class="dise" >年用量<code>*</code></td><td width="8%" class="dise" >单位<code>*</code></td></tr>';
	$("#brj_chanpin_table").html(lj_html);
	$("#brj_chanpin_table").hide();
}
//废气信息
function data_feiqi_data_Initialization(){
	var lj_html = '<tr><td width="8%" class="dise" >废气处理方式<code>*</code></td><td width="8%" class="dise" >处理效率(％)</td><td width="8%" class="dise" >操作</td></tr>';
	$("#feiqi_table").html(lj_html);
	$("#feiqi_table").hide();
}
//机动车
function data_jidongche_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">施工阶段<code>*</code></td><td class="dise" width="7%"></td><td class="dise" width="6%">1月<code>*</code></td><td class="dise" width="6%">1月<code>*</code></td><td class="dise" width="6%">2月<code>*</code></td><td class="dise" width="6%">3月<code>*</code></td>'+
		'<td class="dise" width="6%">4月<code>*</code></td><td class="dise" width="6%">5月<code>*</code></td><td class="dise" width="6%">6月<code>*</code></td><td class="dise" width="6%">7月<code>*</code></td><td class="dise" width="6%">8月<code>*</code></td><td class="dise" width="6%">9月<code>*</code></td>'+
		'<td class="dise" width="6%">10月<code>*</code></td><td class="dise" width="6%">11月<code>*</code></td><td class="dise" width="6%">12月<code>*</code></td><td class="dise" width="6%">操作</td></tr>';
	$("#jidongche_table").html(lj_html);
	$("#jidongche_table").hide();
}
//污染
function data_wuran_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">污染控制技术<code>*</code></td><td class="dise" width="7%">污染控制效率(％)</td><td class="dise" width="6%">操作</td></tr>';
	$("#wuran_table").html(lj_html);
	$("#wuran_table").hide();
}
//堆场
function data_duichang_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">堆场编号<code>*</code></td><td class="dise" width="7%">堆场类型<code>*</code></td><td class="dise" width="7%">其他堆场类型</td><td class="dise" width="7%">堆场材料<code>*</code></td>'+
		'<td class="dise" width="7%">其他堆场材料</td><td class="dise" width="7%">占地面积<code>*</code><br>(平方米)</td><td class="dise" width="7%">最高高度<code>*</code><br>(米)</td><td class="dise" width="7%">日常储存量(吨)<code>*</code></td>'+
		'<td class="dise" width="7%">年物料运载车次(车)<code>*</code></td><td class="dise" width="7%">单车运载量(吨/车)<code>*</code></td><td class="dise" width="7%">控制措施</td><td class="dise" width="7%">其他控制措施</td><td class="dise" width="3%">操作</td></tr>';
	$("#duichang_table").html(lj_html);
	$("#duichang_table").hide();
}
//有机液体储罐
function data_yjytcg_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">储罐编号<code>*</code></td><td class="dise" width="7%">储罐类型<code>*</code></td><td class="dise" width="7%" title="填写说明：&#10;1、若填了体积，则高度和直径可以不填；&#10;2、若填了直径，高度必填、体积可以不填；&#10;3、若填了高度，直径必填、体积可以不填；&#10;4、若三个参数都填，需满足高度和直径计算出的体积和实际填写的体积误差不超过0.001；&#10;5、体积、高度、直径不能全为空。">体积(立方米)</td>'+
		'<td class="dise" width="7%" title="填写说明：&#10;1、若填了体积，则高度和直径可以不填；&#10;2、若填了直径，高度必填、体积可以不填；&#10;3、若填了高度，直径必填、体积可以不填；&#10;4、若三个参数都填，需满足高度和直径计算出的体积和实际填写的体积误差不超过0.001；&#10;5、体积、高度、直径不能全为空。">高度(米)</td>'+
		'<td class="dise" width="7%" title="填写说明：&#10;1、若填了体积，则高度和直径可以不填；&#10;2、若填了直径，高度必填、体积可以不填；&#10;3、若填了高度，直径必填、体积可以不填；&#10;4、若三个参数都填，需满足高度和直径计算出的体积和实际填写的体积误差不超过0.001；&#10;5、体积、高度、直径不能全为空。">直径(米)</td>'+
		'<td class="dise" width="7%">占存储液体成分<code>*</code></td><td class="dise" width="7%">年进出料次数<code>*</code></td><td class="dise" width="6%">操作</td></tr>';
	$("#yjytcg_table").html(lj_html);
	$("#yjytcg_table").hide();
}
//有机液体装载信息表
function data_yjytzz_data_Initialization(){
	var lj_html = '<tr><td class="dise" width="7%">序号<code>*</code></td><td class="dise" width="7%">作业部/车间</td><td class="dise" width="7%">装车站台编号<code>*</code></td><td class="dise" width="7%">装载物料名称<code>*</code></td>'+
		'<td class="dise" width="7%">装载方式<code>*</code></td><td class="dise" width="7%">操作方式<code>*</code></td><td class="dise" width="7%">年装载量(吨)<code>*</code></td>'+
		'<td class="dise" width="7%">装载物料密度(kg/m3)<code>*</code></td><td class="dise" width="7%">油气回收控制技术<code>*</code></td><td class="dise" width="7%">其他油气回收控制技术</td><td class="dise" width="6%">操作</td></tr>';
	$("#yjytzz_table").html(lj_html);
	$("#yjytzz_table").hide();
}
//燃料1设备初始化
function data_ranliao2_data_Initialization(){
	var fdj_rl_html = '<tr><td class="dise" width="9%">燃料类型<code>*</code></td><td class="dise" width="6%"></td><td class="dise" width="6%">全年<code>*</code></td><td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td>'+
				'<td class="dise" width="6%">3月</td><td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td><td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td>'+
				'<td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td><td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td></tr>';
	$("#zgxh_rl_table").html(fdj_rl_html);
	
	var fdj_rl_html2 = '<tr><td class="dise" width="9%"></td><td class="dise" width="6%">全年<code>*</code></td><td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td><td class="dise" width="6%">3月</td>'+
					'<td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td><td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td><td class="dise" width="6%">9月</td>'+
					'<td class="dise" width="6%">10月</td><td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#zgxh_rl_table2").html(fdj_rl_html2);
	
	$('#zgxh_rl_table').hide();
	$('#zgxh_rl_table2').hide();
}
//燃料3设备初始化
function data_ranliao3_data_Initialization(){
	var fdj_rl_html = '<tr><td class="dise" width="9%">燃料类型<code>*</code></td><td class="dise" width="9%"></td><td class="dise" width="6%">全年<code>*</code></td><td class="dise" width="6%">1月</td><td class="dise" width="6%">2月</td>'+
			'<td class="dise" width="6%">3月</td><td class="dise" width="6%">4月</td><td class="dise" width="6%">5月</td><td class="dise" width="6%">6月</td><td class="dise" width="6%">7月</td><td class="dise" width="6%">8月</td>'+
			'<td class="dise" width="6%">9月</td><td class="dise" width="6%">10月</td><td class="dise" width="6%">11月</td><td class="dise" width="6%">12月</td><td class="dise" width="6%">操作</td></tr>';
	$("#swgl_rl_table").html(fdj_rl_html);
	$('#swgl_rl_table').hide();
}
//末端控制设备的分组初始化
function data_moduan_data_Initialization(data,zenmejiuqibulemingzi,type){
	$.each(data,function(index, content) {
		$.each(content,function(name,value) {
			if(name == "etaSO2name"){
				var index = moduan_1_kongzhi();
				$.each(content,function(v1,v2) {
					$("#tl"+index+" #"+v1).editable("setValue",v2);
				});
				$('#tl_table').show();
			}else if(name == "etaNOxname"){
				var index = moduan_2_kongzhi();
				$.each(content,function(v1,v2) {
					$("#tx"+index+" #"+v1).editable("setValue",v2);
				});
				$('#tx_table').show();
			}else if(name == "etaNOxxornot"){
				var index = moduan_3_kongzhi();
				$.each(content,function(v1,v2) {
					$("#dd"+index+" #"+v1).editable("setValue",v2);
				});
				$('#dd_table').show();
			}else if(name == "etaPMname"){
				var index = moduan_4_kongzhi();
				$.each(content,function(v1,v2) {
					$("#cc"+index+" #"+v1).editable("setValue",v2);
				});
				$('#cc_table').show();
			}else if(name == "etaVOChsname"){
				var index = moduan_5_kongzhi();
				$.each(content,function(v1,v2) {
					$("#yl"+index+" #"+v1).editable("setValue",v2);
				});
				$('#yl_table').show();
			}
		});
	});
}
//删除设备的提示框
function delete_tishi(equipId){
	if(edit_show()){
		//显示意味着处于编辑状态
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>您正在编辑设备信息，请先保存设备信息或取消。</b></span>");
		$("#dialog-tiaozhuan").dialog("open");
	}else{
		$("#dialog-delete-content").html("<span style='color:red'><b>您将删除此设备，请确认！</b></span><a id=\"nisenmyexiangbudao\" style=\"display: none;\">"+equipId+"</a>");
		$("#dialog-delete").dialog("open");
	}
}
//删除设备
function delete_shbei(equipId){
	var data = ajax_async_t(BackstageIP+"dto/deleteEquip.do",{taskId:taskId,userId:userId,equipId:equipId,version:version},"json");
	if(data.status == "success") {
		shebei_list();
	}else if ( data.status == "fail" ){
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>删除失败！</b><br>错误代码："+JSON.stringify(data.code)+"</span>");
		$("#dialog-tiaozhuan").dialog("open");
	}
}
//有机原料
function add_yjyl(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"yjyl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"amaterialname\"></a></td>" +
			"<td><a id=\"amaterialtotal\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yjyl_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#yjyl_table").append(kongzhi);
	$.each(shebei_editable_10, function(i, column) {
		column.emptytext = emptytext;
		$("#yjyl"+index+" #"+column.field).editable(column);
	});
	return index;
}
//添加燃料
function add_rl(td_name,td){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"rl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"fueltype\"></a></td>" +
			"<td><a id=\"fuelcalvalue\"></a></td>" +
			"<td><a id=\"sulfur\"></a></td>" +
			"<td><a id=\"ash\"></a></td>" +
			"<td><a id=\"volatile\"></a></td>" +
			"<td><a id=\"coalsource\"></a></td>" +
			"<td><a id=\"coaltrans\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rl_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
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
	$("#fdj_rl_table").append(kongzhi);
	$("#fdj_rl_table2").append(kongzhi2);
	$.each(shebei_editable_1, function(i, column) {
		column.emptytext = emptytext;
		$("#rl"+index+" #"+column.field).editable(column);
	});
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		$("#rl"+index+"ver #"+td+column.field).editable(column);
	});
	return index;
}
//表p2052_化纤生产信息表-产品信息
function add_lj_chanpin(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'lj_chanpin_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#lj_chanpin_table").append(kongzhi);
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		if ( column.field == "aproducttype" || column.field == "aproductname" || column.field == "aproductunit" ) $("#lj_chanpin"+index+" #"+column.field).editable(column);
		else $("#lj_chanpin"+index+" #"+td+column.field).editable(column);
	});
	return index;
}
//活动水平-溶剂
function add_rj_chanpin(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rj_chanpin_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#rj_chanpin_table").append(kongzhi);
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		if ( column.field == "asolventtype") $("#rj_chanpin"+index+" #"+column.field).editable(column);
		else $("#rj_chanpin"+index+" #"+td+column.field).editable(column);
	});
	return index;
}
//机动车
function add_jidongche(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rj_chanpin_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#jidongche_table").append(kongzhi);
	$.each(shebei_editable_21, function(i, column) {
		column.emptytext = emptytext;
		 $("#jidongche"+index+" #"+column.field).editable(column);
	});
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		 $("#jidongche"+index+" #"+td+column.field).editable(column);
	});
	return index;
}
//污染控制
function add_wuran(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"wuran"+index+"\" class=\"zhong\">" +
			"<td><a id=\"contype\"></a></td>" +
			"<td><a id=\"conratio\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'wuran_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#wuran_table").append(kongzhi);
	$.each(shebei_editable_21, function(i, column) {
		column.emptytext = emptytext;
		 $("#wuran"+index+" #"+column.field).editable(column);
	});
	return index;
}
//堆场信息
function add_duichang(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'duichang_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#duichang_table").append(kongzhi);
	$.each(shebei_editable_22, function(i, column) {
		column.emptytext = emptytext;
		 $("#duichang"+index+" #"+column.field).editable(column);
	});
	return index;
}
//有机液体储罐信息
function add_yjytcg(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yjytcg_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#yjytcg_table").append(kongzhi);
	$.each(shebei_editable_3_5, function(i, column) {
		column.emptytext = emptytext;
		 $("#yjytcg"+index+" #"+column.field).editable(column);
	});
	return index;
}
//有机液体储罐信息
function add_yjytzz(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yjytzz_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#yjytzz_table").append(kongzhi);
	$.each(shebei_editable_3_6, function(i, column) {
		column.emptytext = emptytext;
		 $("#yjytzz"+index+" #"+column.field).editable(column);
	});
	return index;
}
//运载信息
//function add_yunzai(){
//	var index = (new Date()).valueOf();
//	var kongzhi = "<tr id=\"yunzai"+index+"\" class=\"zhong\">" +
//			"<td><a id=\"dcmeantrans\"></a></td>" +
//			"<td><a id=\"dctransamount\"></a></td>" +
//			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yunzai_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
//	$("#yunzai_table").append(kongzhi);
//	$.each(shebei_editable_22, function(i, column) {
//		column.emptytext = emptytext;
//		 $("#yunzai"+index+" #"+column.field).editable(column);
//	});
//	return index;
//}
//控制措施
//function add_cuoshi(){
//	var index = (new Date()).valueOf();
//	var kongzhi = "<tr id=\"cuoshi"+index+"\" class=\"zhong\">" +
//			"<td><a id=\"dustcontrol\"></a></td>" +
//			"<td><a id=\"otherdustcontrol\"></a></td>" +
//			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'cuoshi_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
//	$("#cuoshi_table").append(kongzhi);
//	$.each(shebei_editable_22, function(i, column) {
//		column.emptytext = emptytext;
//		 $("#cuoshi"+index+" #"+column.field).editable(column);
//	});
//	return index;
//}
//活动水平-溶剂2
function add_brj_chanpin(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'brj_chanpin_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#brj_chanpin_table").append(kongzhi);
	$.each(shebei_editable_18, function(i, column) {
		column.emptytext = emptytext;
		$("#brj_chanpin"+index+" #"+column.field).editable(column);
	});
	return index;
}
//活动水平-溶剂2
function add_feiqi(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"feiqi"+index+"\" class=\"zhong\">" +
			"<td><a id=\"solventdeal\"></a></td>" +
			"<td><a id=\"solventdealratio\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'feiqi_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#feiqi_table").append(kongzhi);
	$.each(shebei_editable_18, function(i, column) {
		column.emptytext = emptytext;
		$("#feiqi"+index+" #"+column.field).editable(column);
	});
	return index;
}
//添加燃料
function add_swgl_rl(td){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'rl_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
			"</tr>";
	$("#swgl_rl_table").append(kongzhi);
	$.each(yuefentongyong_lg, function(i, column) {
		column.emptytext = emptytext;
		
		if(column.field == "fueltype" ) $("#swgl_rl"+index+" #fueltype").editable(column);
		else $("#swgl_rl"+index+" #"+td+column.field).editable(column);
	});
	return index;
}
function add_zg_rl(title1,td1,title2,td2){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"zg_rl"+index+"ver\" class=\"zhong\">" +
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
	
	var kongzhi2 = "<tr id=\"zg_rl"+index+"\" class=\"zhong\">" +
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'zgxh_rl_table2')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#zgxh_rl_table").append(kongzhi);
	$("#zgxh_rl_table2").append(kongzhi2);
	$.each(yuefentongyong_lg, function(i, column) {
		column.emptytext = emptytext;
		if ( column.field == "fueltype" ){
			$("#zgxh_rl_table #zg_rl"+index+"ver #"+column.field).editable(column);
		}else {
			$("#zgxh_rl_table #zg_rl"+index+"ver #"+td1+column.field).editable(column);
			$("#zgxh_rl_table2 #zg_rl"+index+" #"+td2+column.field).editable(column);

		}
	});
	return index;
}

//烧结-燃料
function add_sj_rl(title,td){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"rl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"fueltype\"></a></td>" +
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'"+title+"_rl_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#"+title+"_rl_table").append(kongzhi);
	$.each(yuefentongyong_lg, function(i, column) {
		column.emptytext = emptytext;
		if ( column.field == "fueltype" ) $("#rl"+index+" #"+column.field).editable(column);
		else $("#rl"+index+" #"+td+column.field).editable(column);
	});
	return index;
 }
//焦炭产量增加行
function add_jiaotan (td) {
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'lianjiao_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#lianjiao_table").append(kongzhi);
	$.each(yuefentongyong_lg, function(i, column) {
		column.emptytext = emptytext;
		if ( column.field == "aproducttype" ) $("#jiaotan"+index+" #"+column.field).editable(column);
		else $("#jiaotan"+index+" #"+td+column.field).editable(column);
	});
	return index;
 }
//脱硫设备增加行
function moduan_1_kongzhi(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"tl"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaSO2name\"></a></td>" +
			"<td><a id=\"etaSO2agentname\"></a></td>" +
			"<td><a id=\"etaSO2agentamount\"></a></td>" +
			"<td><a id=\"etaSO2bypass\"></a></td>" +
			"<td><a id=\"etaSO2eta\"></a></td>" +
			"<td><a id=\"etaSO2ratio\"></a></td>" +
			"<td><a id=\"etaSO2startdate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'tl_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#tl_table").append(kongzhi);
	$.each(moduan_peizhi_1, function(i, column) {
		column.emptytext = emptytext;
		$("#tl"+index+" #"+column.field).editable(column);
	});
	return index;
}
//通用的设备删除行
function moduan_delete(obj, table){
	if ( table == "rl_table" ){
		//删除父节点的父节点的父节点
		$(obj).parent().parent().parent().remove();
		$("#"+$(obj).parent().parent().parent()[0].id+"ver").remove();
		var index = $("#"+table+" tr").length;//获取当前表格的行数量
		if(index == 1){
			$("#"+table).hide();
			$("#"+table+"2").hide();
		}
	} else if (table == "zgxh_rl_table2") {
		$(obj).parent().parent().parent().remove();
		$("#"+$(obj).parent().parent().parent()[0].id+"ver").remove();
		if( $("#zgxh_rl_table tr").length == 1){
			$("#zgxh_rl_table").hide();
			$("#zgxh_rl_table2").hide();
		}
		
	}else {
		//删除父节点的父节点的父节点
		$(obj).parent().parent().parent().remove();
		var index = $("#"+table+" tr").length;//获取当前表格的行数量
		if(index == 1){
			//如果只有一行了，说明只剩标题行，整个表格应该隐藏
			$("#"+table).hide();
		}
	}
	
}
//脱硝设备增加行
function moduan_2_kongzhi(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"tx"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaNOxname\"></a></td>" +
			"<td><a id=\"etaNOxagentname\"></a></td>" +
			"<td><a id=\"etaNOxagentamount\"></a></td>" +
			"<td><a id=\"etaNOxeta\"></a></td>" +
			"<td><a id=\"etaNOxratio\"></a></td>" +
			"<td><a id=\"etaNOxstartdate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'tx_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#tx_table").append(kongzhi);
	$.each(moduan_peizhi_2, function(i, column) {
		column.emptytext = emptytext;
		$("#tx"+index+" #"+column.field).editable(column);
	});
	return index;
}
//低氮燃烧技增加行
function moduan_3_kongzhi(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"dd"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaNOxxornot\"></a></td>" +
			"<td><a id=\"etaNOxxstartdate\"></a></td>" +
			"<td><a id=\"etaNOxxconcentrate\"></a></td>" +
			"<td><a id=\"etaNOxxratio\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'dd_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#dd_table").append(kongzhi);
	$.each(moduan_peizhi_3, function(i, column) {
		column.emptytext = emptytext;
		$("#dd"+index+" #"+column.field).editable(column);
	});
	return index;
}
//除尘设备增加行
function moduan_4_kongzhi(){
	var index = (new Date()).valueOf();
	var kongzhi = "<tr id=\"cc"+index+"\" class=\"zhong\">" +
			"<td><a id=\"etaPMname\"></a></td>" +
			"<td><a id=\"etawindamount\"></a></td>" +
			"<td><a id=\"etaPMjqratio\"></a></td>" +
			"<td><a id=\"etaPMeta\"></a></td>" +
			"<td><a id=\"etaPMratio\"></a></td>" +
			"<td><a id=\"etaPMstartdate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'cc_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#cc_table").append(kongzhi);
	$.each(moduan_peizhi_4, function(i, column) {
		column.emptytext = emptytext;
		$("#cc"+index+" #"+column.field).editable(column);
	});
	return index;
}
//添加有机废气处理增加行
function moduan_5_kongzhi(){
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
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'yl_table')\" src=\"../../zp01/images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#yl_table").append(kongzhi);
	$.each(moduan_peizhi_5, function(i, column) {
		column.emptytext = emptytext;
		$("#yl"+index+" #"+column.field).editable(column);
	});
	return index;
}
//数据校验
function Data_check(){
	var check_Result = [];
	for(var k = 0;k<sheet.length;k++){//循环所有的配置项
		if(sheet[k].key == sheet_name){//如果配置项和当前的活动设备一致，可以取到当前设备的页面范围
			var shebei_html = sheet[k].value;
			for(var p = 0; p<shebei_html.length; p++){//循环活动设备的所有内容，包括基本信息、燃料信息、活动水平、末端和在线监测
				$("#"+shebei_html[p]).find(".editable").each(function(el,n){//循环指标分组下的所有编辑框
					var obj = $(n);
					if(obj.is(':visible')){//判断是否隐藏
						//如果没有隐藏的话，说明这个指标项是活动状态，需要根据是否必填项进行验证
						//机组的基本信息、炼焦的基本信息、炼铁的基本信息等内容，都有特殊处理的地方，不是分组显示了，内容就全显示，所以一定要判断每个指标的显隐状态
						var html_id = obj.attr("id");//页面上每个编辑框的ID
						var html_value = obj.editable("getValue")[html_id];//获取到页面的实际的值
						if(shebei_html[p].indexOf("shebei")>=0){//各种不同的设备
							$.each(sheet[k].validate, function(i, column) {
								if(html_id == column.field){
									if (html_value === "" || html_value == undefined || html_value == null ){
										check_Result.push(column.title);
									}
								}
							});
						}else if(shebei_html[p].indexOf("ranliao_1")>=0){//燃料1
							if(html_id == "fueltype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料类型");
								}
							}else if(html_id == "sulfur"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料硫份");
								}
							}else if(html_id == "ash"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料灰分");
								}
							}else if(html_id == "volatile"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料挥发分");
								}
							}else if(html_id == "year"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年份");
								}
							}else if(html_id == hangye_year[$("#xinxi_title_name").html()].year_name+"total"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料信息全年");
								}
							}
						}else if(shebei_html[p].indexOf("ranliao_2")>=0){//燃料1
							//末端控制只有四个工艺是必填项，直接判断
							if(html_id == "fueltype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料类型");
								}
							}else if(html_id == "afueltotal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("全年燃料消耗量");
								}
							}else if(html_id == "sulfurmean"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("全年含硫量");
								}
							}
						}else if(shebei_html[p].indexOf("ranliao_3")>=0){//燃料3
							//末端控制只有四个工艺是必填项，直接判断
							if(html_id == "fueltype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("燃料类型");
								}
							}else if(html_id == "afueltotal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("全年燃料消耗量");
								}
							}
						}else if(shebei_html[p].indexOf("yjyl_1")>=0){//有机原料
							if(html_id == "amaterialname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("名称");
								}
							}else if(html_id == "amaterialtotal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("使用量");
								}
							}
						}else if(shebei_html[p].indexOf("chanpin_1")>=0){//产品信息
							if(html_id == "aproducttype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("产品类型");
								}
							}else if(html_id == "aproducttotal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("产品全年");
								}
							}else if(html_id == "aproductname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("产品名称");
								}
							}else if(html_id == "aproductunit"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("产品产量单位");
								}
							}
						}else if(shebei_html[p].indexOf("chanpin_2")>=0){//产品信息2
							if(html_id == "asolventtype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("溶剂类型");
								}
							}else if(html_id == "asolventtotal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("溶剂使用量全年");
								}
							}
						}else if(shebei_html[p].indexOf("wuran_1")>=0){//污染
							if(html_id == "contype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("污染控制技术");
								}
							}
						}else if(shebei_html[p].indexOf("duichang_1")>=0){//堆场
							if(html_id == "equipId"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("堆场编号");
								}
							} else if(html_id == "dctype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("堆场类型");
								}
							}else if(html_id == "dcmat"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("堆场材料");
								}
							}else if(html_id == "dcaera"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("占地面积");
								}
							}else if(html_id == "dcheight"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("最高高度");
								}
							}else if(html_id == "dcamount"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("日常储存量");
								}
							} else if(html_id == "dcmeantrans"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年物料运载车次");
								}
							}if(html_id == "dctransamount"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("单车运载量");
								}
							}
						}else if(shebei_html[p].indexOf("feiqi_1")>=0){//产品信息2
							if(html_id == "solventdeal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("废气处理方式");
								}
							}
						}else if(shebei_html[p].indexOf("yjytcg_1")>=0){//有机液体储罐信息
							if(html_id == "equipId"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("储罐编号");
								}
							} else if(html_id == "equiptype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("储罐类型");
								}
							} else if(html_id == "component"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("占存储液体成分");
								}
							} else if(html_id == "inoutnums"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年进出料次数");
								}
							} 
						}else if(shebei_html[p].indexOf("yjytzz_1")>=0){//有机液体装载信息表
							if(html_id == "equipId"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("装车站台编号");
								}
							} else if(html_id == "xh"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("序号");
								}
							} else if(html_id == "materialname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("装载物料名称");
								}
							} else if(html_id == "zztype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("装载方式");
								}
							} else if(html_id == "zzway"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("操作方式");
								}
							} else if(html_id == "zzamount"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年装载量");
								}
							} else if(html_id == "density"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("装载物料密度");
								}
							} else if(html_id == "recover"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("油气回收控制技术");
								}
							} 
						}else if(shebei_html[p].indexOf("jidongche_1")>=0){//机动车
							if(html_id == "constage"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("施工阶段");
								}
							}else if(html_id == "vehnum1"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("1月");
								}
							}else if(html_id == "vehnum2"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("2月");
								}
							}else if(html_id == "vehnum3"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("3月");
								}
							}else if(html_id == "vehnum4"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("4月");
								}
							}else if(html_id == "vehnum5"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("5月");
								}
							}else if(html_id == "vehnum6"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("6月");
								}
							}else if(html_id == "vehnum7"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("7月");
								}
							}else if(html_id == "vehnum8"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("8月");
								}
							}else if(html_id == "vehnum9"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("9月");
								}
							}else if(html_id == "vehnum10"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("10月");
								}
							}else if(html_id == "vehnum11"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("11月");
								}
							}else if(html_id == "vehnum12"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("12月");
								}
							}
						}else if(shebei_html[p].indexOf("chanpin_3")>=0){//产品信息2
							if(html_id == "asolventtype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("溶剂类型");
								}
							}else if(html_id == "solventstate"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("溶剂性质");
								}
							}
							else if(html_id == "asolventpaint"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年用量(涂料)");
								}
							}
							else if(html_id == "asolventpaintunit"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("单位(涂料)");
								}
							}else if(html_id == "asolventdilute"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年用量(稀释剂)");
								}
							}else if(html_id == "asolventdiluteunit"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("单位(稀释剂)");
								}
							}else if(html_id == "asolventglue"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("年用量(胶黏剂)");
								}
							}else if(html_id == "asolventglueunit"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("单位(胶黏剂)");
								}
							}
							
						}else if(shebei_html[p].indexOf("moduankongzhi")>=0){//处理末端控制
							//末端控制只有四个工艺是必填项，直接判断
							if(html_id == "etaSO2name"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("脱硫工艺");
								}
							}else if(html_id == "etaNOxname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("脱硝工艺");
								}
							}else if(html_id == "etaNOxxname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("低氮燃烧技术");
								}
							}else if(html_id == "etaPMname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("除尘工艺");
								}
							}else if(html_id == "etaVOChsname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("voc回收技术");
								}
							}else if(html_id == "etaVOCxhname"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("voc销毁技术");
								}
							}
						}else if(shebei_html[p].indexOf("zaixianjiance")>=0){//处理在线监测
							if(html_id == "installornot"){
								if (html_value ==="" || html_value == undefined ) {
									check_Result.push("设备编号");
								}
							} else if(html_id == "countrykornot"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("在线监测是否国控重点污染源");
								}
							} else if(html_id == "provkornot"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("在线监测是否省控重点污染源");
								}
							} else if(html_id == "citykornot"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("在线监测是否市控重点污染源");
								}
							}
						}else if(shebei_html[p].indexOf("lianjiaohuaxuejiagong_1")>=0){//处理在线监测
							if(html_id == "isornot"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("是否存在化学加工环节");
								}
							} else if(html_id == "aproducttype"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("产品类型");
								}
							} else if(html_id == "aproducttotal"){
								if (html_value === "" || html_value == undefined ) {
									check_Result.push("全年焦炭产量");
								}
							}
						}
						
					}
				});
			}
		}
	}
	var html = $("#xinxi_title_name").html();
	if (html == "表p1011_机组信息表" || html == "表p02_锅炉信息表"  ){
		if ($("#ranliao_1 tr").length == 2 ) check_Result.push("请添加燃料信息");
	} else if ( html == "表p9031_烟气脱硝信息表" || html == "表p7011_生物质锅炉信息表" ){
		if ($("#ranliao_3 tr").length == 1 ) check_Result.push("请添加燃料信息");
	}
	
	return check_Result;
}
//页面初始化
function html_close(){
	var str = "";
	$.each(sheet,function(i,g){
		if ( g.key == $("#xinxi_title_name").html() ) str = g.value[0];
	})
	$("#"+str+" #aproducttype").editable("setValue","");
//	$("#"+str+" #constage").editable("setValue","");
	
	$("#xinxi_box .editable").editable("setValue","");//所有的编辑框全部清空
	
	$("#xinxi_box").children().hide();//内容节点下所有一级子元素全部隐藏
	
	chushihua_moduan();//末端控制设备初始化
	//判断编辑状态和新建状态
	//只有新建状态才隐藏详细内容，编辑状态执行初始化操作
	$("#xinxi_title").hide();//头部标题显示
	$("#xinxi_box").hide();//内容外框
	$("#zhanwei").show();//占位隐藏
	sheet_name = "";//取消时，活动设备清空
	edit_state_url = "";//地址清空
	equipId_update = "";//记录的排污许可证号清空
}

//判断编辑状态
function edit_show(){
	if($('#xinxi_title').is(':visible')){
		return true;
	}else{
		return false;
	}
}

//保存设备
function save_data(){
	var jsonobj = {};
	jsonobj.userId = userId;
	jsonobj.taskId = taskId;
	jsonobj.version = version;
	jsonobj.status = statusCode;
	jsonobj.isCompany = false;
//	jsonobj.equipId = equipId_update;
jsonobj.value = {};
	
	for(var k = 0;k<sheet.length;k++){//循环所有的配置项
		if(sheet[k].key == sheet_name){//如果配置项和当前的活动设备一致，可以取到当前设备的页面范围
			var shebei_html = sheet[k].value;
			
			var jiben_json = {};
			var moduan_json = [];
			var zaixian = {};
			var zaixian_s = [];
			
			var huaxue = {};
			var huaxue_s = [];
			
			var yjyl = {};
			var yjyl_s = [];
			
			var chanpin_s = [];
			var rongji_s = [];
			var rjsy_s = [];
			var jidongche_s = [];
			var wuran_s = [];
			
			var duichang_s = [];
			var yunzai_s = [];
			var cuoshi_s = [];
			var yjytcg_s = [];
			var yjytzz_s = [];
			
			var jiaotan = {};
			var jiaotan_s = [];
			var feiqi_s = [];
			
			var ranliao = {};
			var ranliao_s = [];
			var ranliao3_s = [];
			var equipId = "";
			for(var p = 0; p<shebei_html.length; p++){//循环活动设备的所有内容，包括基本信息、燃料信息、活动水平、末端和在线监测
				
				if(shebei_html[p].indexOf("shebei")>=0){
					$("#"+shebei_html[p]+" .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
						if($(this).is(":visible")) jiben_json[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
						if(sheet_name == "表p5012_畜禽养殖量信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "PC"+num;
						}else if(sheet_name == "表p6012_施工扬尘信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "PC"+num;
						}else if(sheet_name == "表p2053_泄漏实施LDAR信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "PC"+num;
						}else if(sheet_name == "表p2054_泄漏未实施LDAR信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "PC"+num;
						}
					});
					equipId = $("#"+shebei_html[p]+" #equipId").editable("getValue").equipId;//记录设备排污许可证编号
				}else if(shebei_html[p].indexOf("moduankongzhi")>=0){//处理末端控制
					//循环表格内所有的行，逐行取数据
					$("#"+shebei_html[p]+" #tl_table tr").each(function(){
						//每次需要判断一下必填项有没有，没有填写，本行数据无效
						if(typeof $(this).find("#etaSO2name").editable("getValue").etaSO2name != "undefined"){//判断这一行是否是数据行
							var tl_json_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							tl_json_value.equipId = equipId;//补充设备排污许可证编号
							moduan_json.push(tl_json_value);
						}
					});
					$("#"+shebei_html[p]+" #tx_table tr").each(function(){
						//每次需要判断一下必填项有没有，没有填写，本行数据无效
						if(typeof $(this).find("#etaNOxname").editable("getValue").etaNOxname != "undefined"){
							var tx_json_value = $(this).find(".editable").editable("getValue");
							tx_json_value.equipId = equipId;
							moduan_json.push(tx_json_value);
						}
					});
					$("#"+shebei_html[p]+" #dd_table tr").each(function(){
						//每次需要判断一下必填项有没有，没有填写，本行数据无效
						if(typeof $(this).find("#etaNOxxornot").editable("getValue").etaNOxxornot != "undefined"){
							var dd_json_value = $(this).find(".editable").editable("getValue");
							dd_json_value.equipId = equipId;
							moduan_json.push(dd_json_value);
						}
					});
					$("#"+shebei_html[p]+" #cc_table tr").each(function(){
						//每次需要判断一下必填项有没有，没有填写，本行数据无效
						if(typeof $(this).find("#etaPMname").editable("getValue").etaPMname != "undefined"){
							var cc_json_value = $(this).find(".editable").editable("getValue");
							cc_json_value.equipId = equipId;
							moduan_json.push(cc_json_value);
						}
					});
					$("#"+shebei_html[p]+" #yl_table tr").each(function(){
						//每次需要判断一下必填项有没有，没有填写，本行数据无效
						if(typeof $(this).find("#etaVOChsname").editable("getValue").etaVOChsname != "undefined"){
							var yj_json_value = $(this).find(".editable").editable("getValue");
							yj_json_value.equipId = equipId;
							moduan_json.push(yj_json_value);
						}
					});
				}else if(shebei_html[p].indexOf("zaixianjiance")>=0){//处理在线监测
					$("#"+shebei_html[p]+" .editable").each(function(){
						if($(this).is(":visible")) zaixian[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
					});
					zaixian.equipId = equipId;
					zaixian_s.push(zaixian);
				} else if (shebei_html[p].indexOf("ranliao_1")>=0 ) {//燃料信息
					
					$("#"+shebei_html[p]+" #fdj_rl_table tr").each(function(i,g){
						if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){//判断这一行是否是数据行
							var ranliao_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							ranliao_value.equipId = equipId;//补充设备排污许可证编号
							ranliao_s.push(ranliao_value);
						}
					});
					
					
					$("#"+shebei_html[p]+" #fdj_rl_table2 tr").each(function(){
						if ( $("#xinxi_title_name").html() == "表p1011_机组信息表") {
							if(typeof $(this).find("#aheatfueltotal").editable("getValue").aheatfueltotal != "undefined"){//判断这一行是否是数据行
								var ranliao_value2 = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
								ranliao_value2.equipId = equipId;//补充设备排污许可证编号
								ranliao_s.push(ranliao_value2);
							}
						} else{

							if(typeof $(this).find("#afueltotal").editable("getValue").afueltotal != "undefined"){//判断这一行是否是数据行
								var ranliao_value2 = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
								ranliao_value2.equipId = equipId;//补充设备排污许可证编号
								ranliao_s.push(ranliao_value2);
							}
						} 
						
						
					});
					
				} else if (shebei_html[p].indexOf("ranliao_2")>=0 ) {//燃料信息
					
					$("#"+shebei_html[p]+" #zgxh_rl_table tr").each(function(i,g){
						if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){//判断这一行是否是数据行
							var ranliao_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							ranliao_value.equipId = equipId;//补充设备排污许可证编号
							ranliao_s.push(ranliao_value);
						}
					});
					$("#"+shebei_html[p]+" #zgxh_rl_table2 tr").each(function(){
						if(typeof $(this).find("#sulfurmean").editable("getValue").sulfurmean != "undefined"){//判断这一行是否是数据行
							var ranliao_value2 = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							ranliao_value2.equipId = equipId;//补充设备排污许可证编号
							ranliao_s.push(ranliao_value2);
						}
					});
					
				}else if (shebei_html[p].indexOf("lianjiaohuaxuejiagong_1")>=0 ) {//化学
					$("#"+shebei_html[p]+" .editable").each(function(){
						if($(this).is(":visible")) {
							if ( $(this).attr("id") == "isornot" ) {
								huaxue[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
							}
						}
					});
					huaxue.equipId = equipId;
					huaxue_s.push(huaxue);
					
					$("#"+shebei_html[p]+" #lianjiao_table tr").each(function(i,g){
						if(typeof $(this).find("#aproducttype").editable("getValue").aproducttype != "undefined"){//判断这一行是否是数据行
							var jiaotan_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							jiaotan_value.equipId = equipId;//补充设备排污许可证编号
							jiaotan_s.push(jiaotan_value);
						}
					});
				}else if (shebei_html[p].indexOf("yjyl_1")>=0 ) {//有机原料
					$("#"+shebei_html[p]+" #yjyl_table tr").each(function(i,g){
						if(typeof $(this).find("#amaterialname").editable("getValue").amaterialname != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							yjyl_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("ranliao_3")>=0 ) {//ranliao
					$("#"+shebei_html[p]+" #swgl_rl_table tr").each(function(i,g){
						if(typeof $(this).find("#fueltype").editable("getValue").fueltype != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							ranliao_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("chanpin_1")>=0 ) {//产品信息
					$("#"+shebei_html[p]+" #lj_chanpin_table tr").each(function(i,g){
						if(typeof $(this).find("#aproducttype").editable("getValue").aproducttype != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							chanpin_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("chanpin_2")>=0 ) {//溶剂
					$("#"+shebei_html[p]+" #rj_chanpin_table tr").each(function(i,g){
						if(typeof $(this).find("#asolventtype").editable("getValue").asolventtype != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							rongji_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("chanpin_3")>=0 ) {//溶剂
					$("#"+shebei_html[p]+" #brj_chanpin_table tr").each(function(i,g){
						if(typeof $(this).find("#asolventtype").editable("getValue").asolventtype != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							rjsy_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("feiqi_1")>=0 ) {//废气
					$("#"+shebei_html[p]+" #feiqi_table tr").each(function(i,g){
						if(typeof $(this).find("#solventdeal").editable("getValue").solventdeal != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							feiqi_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("jidongche_1")>=0 ) {//机动车
					$("#"+shebei_html[p]+" #jidongche_table tr").each(function(i,g){
						if(typeof $(this).find("#constage").editable("getValue").constage != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = jiben_json.equipId;//补充设备排污许可证编号
							jidongche_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("wuran_1")>=0 ) {//污染
					$("#"+shebei_html[p]+" #wuran_table tr").each(function(i,g){
						if(typeof $(this).find("#contype").editable("getValue").contype != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
							yjyl_value.equipId = jiben_json.equipId;//补充设备排污许可证编号
							wuran_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("duichang_1")>=0 ) {//堆场
					$("#"+shebei_html[p]+" #duichang_table tr").each(function(i,g){
						if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
//							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							duichang_s.push(yjyl_value);
						}
					});
				}else if (shebei_html[p].indexOf("yjytcg_1")>=0 ) {//表p07_有机液体储罐信息表
					$("#"+shebei_html[p]+" #yjytcg_table tr").each(function(i,g){
						if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
//							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							yjytcg_s.push(yjyl_value);
						} 
					});
				}else if (shebei_html[p].indexOf("yjytzz_1")>=0 ) {//表p08_有机液体装载信息表
					$("#"+shebei_html[p]+" #yjytzz_table tr").each(function(i,g){
						if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){//判断这一行是否是数据行
							var yjyl_value = $(this).find(".editable").editable("getValue");//数据行去本行内所有的编辑框存为一个对象
//							yjyl_value.equipId = equipId;//补充设备排污许可证编号
							yjytzz_s.push(yjyl_value);
						} 
					});
				}
			}
			if(yjytzz_s.length>0) jsonobj.value[sheet_name+"v有机液体装载信息"] = yjytzz_s;
			if(yjytcg_s.length>0) jsonobj.value[sheet_name+"v有机液体储罐信息"] = yjytcg_s;
			if(duichang_s.length>0) jsonobj.value[sheet_name+"v堆场信息"] = duichang_s;
			if(wuran_s.length>0) jsonobj.value[sheet_name+"v污染控制"] = wuran_s;
			if(jidongche_s.length>0) jsonobj.value[sheet_name+"v机动车信息"] = jidongche_s;
			if(feiqi_s.length>0) jsonobj.value[sheet_name+"v废气信息"] = feiqi_s;
			if(rjsy_s.length>0) jsonobj.value[sheet_name+"v溶剂使用"] = rjsy_s;
			if(rongji_s.length>0) jsonobj.value[sheet_name+"v溶剂信息"] = rongji_s;
			if(chanpin_s.length>0) jsonobj.value[sheet_name+"v产品信息"] = chanpin_s;
			if(yjyl_s.length>0) jsonobj.value[sheet_name+"v有机原料信息"] = yjyl_s;
			if(huaxue_s.length>0) jsonobj.value["表p051_炼焦工序化学加工环节信息表"] = huaxue_s;
			if(jiaotan_s.length>0) jsonobj.value["表p051_炼焦工序化学加工环节信息表v焦炭产量"] = jiaotan_s;
			jsonobj.value[sheet_name] = [jiben_json];
			if(ranliao_s.length>0) jsonobj.value[sheet_name+"v燃料信息"] = ranliao_s;
			if(ranliao3_s.length>0) jsonobj.value[sheet_name+"v燃料信息"] = ranliao3_s;
			if(moduan_json.length>0) jsonobj.value["表p01_末端控制设备信息表"] = moduan_json;
			if(zaixian_s.length>0) jsonobj.value["表p03_在线监测信息表"] = zaixian_s;
		}
	}
	if ( $("#xinxi_title_name").html() != "表p9031_烟气脱硝信息表" ){
		var value_html = $("#xinxi_title_name").html()+"v燃料信息";
		if ( jsonobj.value[value_html] != "" && jsonobj.value[value_html] != null && jsonobj.value[value_html] != undefined ){
			if( jsonobj.value[value_html].length > 0 ) {
				var str = [];
				var ss = jsonobj.value[value_html];
				var lengths = ss.length;
				for ( var i = 0 ;  i < lengths/2; i ++ ) {
					var a = ss[i];
					var b = ss[i+lengths/2];
					var obj = Object.assign(a, b);
					str.push(obj);
				}
				jsonobj.value[value_html]=str;
			}
		}
	}
	
	$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-tiaozhuan").dialog("open");
	console.log(JSON.stringify(jsonobj));
	setTimeout(function() {
		var data = ajax_async_t(edit_state_url,{data:JSON.stringify(jsonobj),equipId:equipId_update},"json","false");
		if(data.status == "success") {
			html_close();//页面初始化
			shebei_list();//重新加载设备列表
			$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存成功！</b></span>");
			$("#dialog-tiaozhuan").dialog("open");
			return true;
		}else if ( data.status == "fail" ){
			$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>保存失败！</b><br>错误代码："+JSON.stringify(data.code)+"</span>");
			$("#dialog-tiaozhuan").dialog("open");
			return false;
		}
	}, 0)
}
//修改密码
function xiugaimima_anniu(old_pass,str){
	var data = ajax_async_t("../../updatePassword.do",{old_password:old_pass,new_password:str,u_id:userId},"json");
	if ( data == "1" ) {
		$( "#dialog-update").dialog("close")
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>修改成功！</b></span>");
	} else if ( data == "2" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>修改失败！</b></span>");
	} else if ( data == "3" ) {
		$("#dialog-tiaozhuan").dialog("open");
		$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>原密码错误！</b></span>");
	}else if ( data == "0" ) {
		var url = window.location.href;
		if(url.substring(url.lastIndexOf("/")+1)!="index.html"){
			window.location.replace("/polist/index.html");
		}
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

var bianhao = {"表p02_锅炉信息表":"GL","表p07_有机液体储罐信息表":"CG","表p1011_机组信息表":"JZ","表p05_炼焦工序信息表":"LJ","表p2011_烧结工序信息表":"SJ","表p2014_球团工序信息表":"QT","表p2012_炼铁工序信息表":"LT",
		"表p2013_炼钢工序信息表":"LG","表p2015_轧钢信息表":"ZG","表p2016_石灰石信息表":"YL","表p06_堆场信息表":"DC","表p2021_熟料生产信息表":"SL","表p2022_水泥生产信息表":"SN","表p2031_玻璃生产信息表":"BL","表p08_有机液体装载信息表":"ZZ",
		"表p9031_烟气脱硝信息表":"TX","表p2051_化工生产信息表":"SCX","表p2081_其他工业生产信息表":"SCX","表p9011_废水处理信息表":"FS","表p7011_生物质锅炉信息表":"GL","表p2052_化纤生产信息表":"SCX","表p4011_印刷印染信息表":"YS",
		"表p4032_干洗信息表":"GX","表p4021_表面喷涂信息表":"TL","表p9021_固废处理信息表":"GF"};