var emptytext = "请填写";
var taskId = "";
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
var sheet = [{
	key: "表p1011_机组信息表",
	value: ["shebei_1","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"capacity",title:"装机容量"},
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"apowerfueltotal",title:"全年供电燃料消费总量"},
	          {field:"powertotal",title:"全年发电量"},
	          {field:"aheatfueltotal",title:"全年供热燃料消费总量"},
	          {field:"heattotal",title:"全年供热量"},
	          {field:"fueltype",title:"燃料类型"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"cogenerationornot",title:"是否热电联产"},
	          {field:"sulfur",title:"燃料硫分"},
	          {field:"ash",title:"燃料灰分"},
	          {field:"volatile",title:"燃料挥发分"}],
	Strengthen:["equiptype"]
},{
	key: "表p02_锅炉信息表",
	value: ["shebei_2","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"afueltotal",title:"全年供热燃料消费总量"},
	          {field:"fueltype",title:"燃料类型"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"sulfur",title:"燃料硫分"},
	          {field:"ash",title:"燃料灰分"},
	          {field:"volatile",title:"燃料挥发分"},
	          {field:"capacity",title:"产能"}],
	Strengthen:["equiptype"]
},{
	key: "表p2011_烧结工序信息表",
	value: ["shebei_3","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"fueltype",title:"燃料类型"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"},
	          {field:"fuelamount",title:"燃料使用量"},
	          {field:"oreamount",title:"烧结矿使用量"},
	          {field:"oresulfur",title:"烧结矿硫份"},
	          {field:"sulfur",title:"燃料硫分"},
	          {field:"ash",title:"燃料灰分"},
	          {field:"volatile",title:"燃料挥发分"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2012_炼铁工序信息表",
	value: ["shebei_4","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2013_炼钢工序信息表",
	value: ["shebei_5","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p05_炼焦工序信息表",
	value: ["shebei_6","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"capacity",title:"产能"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2021_熟料生产信息表",
	value: ["shebei_7","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
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
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2031_玻璃生产信息表",
	value: ["shebei_9","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"capacity",title:"产能"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2052_化纤生产信息表",
	value: ["shebei_10","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"生产工艺"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2051_化工生产信息表",
	value: ["shebei_11","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"生产工艺"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p2081_其他工业生产信息表",
	value: ["shebei_12","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"生产工艺"},
	          {field:"aproducttype",title:"产品类型"}],
	Strengthen:["aproducttype"]
},{
	key: "表p9011_废水处理信息表",
	value: ["shebei_13","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"处理方式"}],
	Strengthen:[]
},{
	key: "表p9021_固废处理信息表",
	value: ["shebei_14","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年产品产量"},
	          {field:"equiptype",title:"处理方式"}],
	Strengthen:[]
},{
	key: "表p9031_烟气脱硝信息表",
	value: ["shebei_15","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"aproducttotal",title:"全年燃料消耗量"},
	          {field:"equiptype",title:"烟气脱硝设施类型"},
	          {field:"fueltype",title:"燃料类型"}],
	Strengthen:[]
},{
	key: "表p7011_生物质锅炉信息表",
	value: ["shebei_16","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"afueltotal",title:"全年燃料消费总量"},
	          {field:"equiptype",title:"设备类型"},
	          {field:"fueltype",title:"燃料类型"}],
	Strengthen:["equiptype"]
},{
	key: "表p4011_印刷印染信息表",
	value: ["shebei_17","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"asolventtotal",title:"全年溶剂使用量"},
	          {field:"equiptype",title:"喷涂工序"},
	          {field:"asolventtype",title:"溶剂类型"}],
	Strengthen:["asolventtype"]
},{
	key: "表p4021_表面喷涂信息表",
	value: ["shebei_18","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"asolventtotal",title:"全年溶剂使用量"},
	          {field:"equiptype",title:"喷涂工序"},
	          {field:"asolventtype",title:"溶剂类型"}],
	Strengthen:["asolventtype"]
},{
	key: "表p4032_干洗信息表",
	value: ["shebei_19","moduankongzhi_1","zaixianjiance_1"],
	validate:[
	          {field:"equipId",title:"排污许可证编号"},
	          {field:"year",title:"年份"},
	          {field:"asolventtotal",title:"全年溶剂使用量"},
	          {field:"equiptype",title:"喷涂工序"},
	          {field:"asolventtype",title:"溶剂类型"}],
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
	value: ["shebei_21"],
	validate:[
	          {field:"aconsaera",title:"施工区域面积"},
	          {field:"aconsmonths",title:"施工活跃月份数"},
	          {field:"dustratio",title:"起尘面积率"},
	          {field:"windspeed25",title:"地面2.5m处风速"},
	          {field:"dustwaterratio",title:"表面积尘含水率"},
	          {field:"dustload",title:"工地路面尘积负荷"},
	          {field:"vehnum",title:"机动车数量"},
	          {field:"contype",title:"污染控制技术"},
	          {field:"constagetype",title:"施工类型"},
	          {field:"constage",title:"施工阶段"}],
	Strengthen:["constage"]
},{
	key: "表p06_堆场信息表",
	value: ["shebei_22"],
	validate:[
	          {field:"countytype",title:"地区类型"},
	          {field:"dctype",title:"堆场类型"},
	          {field:"dcmat",title:"堆场材料"},
	          {field:"windspeed",title:"地面平均风速"},
	          {field:"nload",title:"年料堆物料装卸总次数"},
	          {field:"meanamount",title:"单词物料装卸量"},
	          {field:"rtrans",title:"物料粒度乘数"},
	          {field:"matwaterratio",title:"物料含水率"},
	          {field:"contypeload",title:"最严污染控制技术"},
	          {field:"surfaceaera",title:"料堆表面积"},
	          {field:"rstable",title:"物料粒度乘数"},
	          {field:"nraodong",title:"年料堆受扰动总次数"},
	          {field:"criticalwindspeed",title:"起尘临界摩擦风速"},
	          {field:"frictionwindspeed",title:"摩擦风速"},
	          {field:"contypestable",title:"最严污染控制技术"}],
	Strengthen:[]
}];

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
	var select_html_6 = kaishi+'New_equipment(\'表p05_炼焦工序信息表\');">炼焦'+jieshu;
	var select_html_7 = kaishi+'New_equipment(\'表p2021_熟料生产信息表\');">熟料生产'+jieshu;
	var select_html_8 = kaishi+'New_equipment(\'表p2022_水泥生产信息表\');">水泥生产'+jieshu;
	var select_html_9 = kaishi+'New_equipment(\'表p2031_玻璃生产信息表\');">玻璃生产'+jieshu;
	var select_html_10 = kaishi+'New_equipment(\'表p2052_化纤生产信息表\');">化纤生产'+jieshu;
	var select_html_11 = kaishi+'New_equipment(\'表p2051_化工生产信息表\');">化工生产'+jieshu;
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
		select_shebei_t = select_html_1+select_html_22+kong+kong+kong+kong;
		select_shebei_1 = select_html_2+select_html_3+select_html_4+select_html_5+select_html_6+select_html_7;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+select_html_12+kong+kong+kong+kong;
	}else if(industry == "石油加工、炼焦和核燃料加工业"){
		select_shebei_t = select_html_2+select_html_22+select_html_6+select_html_12+kong+kong;
		select_shebei_1 = select_html_1+select_html_3+select_html_4+select_html_5+select_html_7+kong;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+kong+kong+kong+kong+kong;
	}else if(industry == "非金属矿物制品业"){
		select_shebei_t = select_html_2+select_html_22+select_html_7+select_html_8+select_html_9+kong;
		select_shebei_1 = select_html_1+select_html_12+kong+kong+kong+kong;
		select_shebei_2 = select_html_10+select_html_11+select_html_13+select_html_14+select_html_4+select_html_3;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+select_html_6+select_html_5+kong+kong+kong;
	}else if(industry == "黑色金属冶炼和压延加工业"){
		select_shebei_t = select_html_2+select_html_22+select_html_6+select_html_5+select_html_4+select_html_3;
		select_shebei_1 = select_html_1+select_html_12+select_html_7+kong+kong+kong;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+kong+kong+kong+kong+kong;
	}else if(industry == "橡胶和塑料制品业"){
		select_shebei_t = select_html_2+select_html_22+select_html_12+select_html_7+select_html_8+select_html_9;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+kong+kong+kong;
		select_shebei_2 = select_html_4+select_html_3+select_html_10+select_html_11+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+kong+kong+kong+kong+kong;
	}else if(industry == "化学原料和化学制品制造业"){
		select_shebei_t = select_html_2+select_html_22+select_html_11+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_10+select_html_12+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+kong+kong+kong+kong+kong;
	}else if(industry == "化学纤维制造业"){
		select_shebei_t = select_html_2+select_html_22+select_html_10+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+kong+kong+kong+kong+kong;
	}else if(industry == "印刷印染"){
		select_shebei_t = select_html_17+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_2+select_html_22+select_html_21+kong+kong+kong;
	}else if(industry == "工业喷涂"){
		select_shebei_t = select_html_18+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20;
		select_shebei_4 = select_html_2+select_html_22+select_html_21+kong+kong+kong;
	}else if(industry == "施工扬尘"){
		select_shebei_t = select_html_21+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20;
		select_shebei_4 = select_html_2+select_html_22+select_html_18+kong+kong+kong;
	}else if(industry == "堆场扬尘"){
		select_shebei_t = select_html_22+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20;
		select_shebei_4 = select_html_2+select_html_21+select_html_18+kong+kong+kong;
	}else if(industry == "废水处理"){
		select_shebei_t = select_html_13+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20;
		select_shebei_4 = select_html_2+select_html_22+select_html_18+kong+kong+kong;
	}else if(industry == "固废处理"){
		select_shebei_t = select_html_14+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20;
		select_shebei_4 = select_html_2+select_html_22+select_html_18+kong+kong+kong;
	}else if(industry == "其它溶剂使用"){
		select_shebei_t = select_html_19+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_22+select_html_20;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+kong+kong+kong;
	}else if(industry == "畜禽养殖"){
		select_shebei_t = select_html_20+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_22+select_html_19;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+kong+kong+kong;
	}else if(industry == "生活垃圾"){
		select_shebei_t = select_html_22+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_19+select_html_20;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+kong+kong+kong;
	}else if(industry == "生物质燃料"){
		select_shebei_t = select_html_16+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_15+select_html_20+select_html_10+select_html_17+select_html_22+select_html_19;
		select_shebei_4 = select_html_18+select_html_22+select_html_14+kong+kong+kong;
	}else if(industry == "烟气脱硝"){
		select_shebei_t = select_html_15+kong+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_16+select_html_20+select_html_10+select_html_17+select_html_22+select_html_19;
		select_shebei_4 = select_html_18+select_html_2+select_html_14+kong+kong+kong;
	}else if(industry == "电力供应"||industry == "工业热力生产和供应"||industry == "民用热力生产和供应"||industry == "燃气生产和供应业"){
		select_shebei_t = select_html_2+select_html_22+kong+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_6+select_html_5+select_html_7+select_html_8+select_html_9;
		select_shebei_2 = select_html_4+select_html_3+select_html_11+select_html_12+select_html_21+select_html_13;
		select_shebei_3 = select_html_15+select_html_16+select_html_10+select_html_17+select_html_20+select_html_19;
		select_shebei_4 = select_html_18+select_html_14+kong+kong+kong+kong;
	}else{
		select_shebei_t = select_html_2+select_html_22+select_html_12+kong+kong+kong;
		select_shebei_1 = select_html_1+select_html_3+select_html_4+select_html_5+select_html_6+select_html_7;
		select_shebei_2 = select_html_8+select_html_9+select_html_10+select_html_11+select_html_13+select_html_14;
		select_shebei_3 = select_html_15+select_html_16+select_html_17+select_html_18+select_html_19+select_html_20;
		select_shebei_4 = select_html_21+kong+kong+kong+kong+kong;
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
				if(typeof window.sessionStorage.getItem("year") != "undefined"){
					$("#"+sheet[k].value[0]+" #year").editable("setValue",window.sessionStorage.getItem("year"));
					$("#"+sheet[k].value[0]+" #year").html(window.sessionStorage.getItem("year"));
				}
			}
		}
	}
	//末端控制设备初始化
	chushihua_moduan();

	$("#shebei_1 #cogenerationornot").editable("setValue","否");//是否热电联产
	$("#zaixianjiance_1 #installornot").editable("setValue","否");//在线监测是否安装初始化
	
	//平滑定位到设备详细信息
	$('html, body').animate({
		scrollTop: $($.attr(this, 'xinxi_title')).offset().top
	}, 500);
	sheet_name = type;//记录当前的活动设备
	edit_state_url = BackstageIP+"dto/insert.do";//地址切换为新建

	
}

//初始化末端控制设备
function chushihua_moduan(){
	var tl_table_html = "<tr class=\"dise\"><td width=\"13%\">脱硫工艺<code>*</code></td><td width=\"13%\">脱硫剂名称</td>" +
		"<td width=\"12%\">脱硫剂使用量</td><td width=\"12%\">脱硫烟气旁路</td>" +
		"<td width=\"11%\">脱硫岛效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
		"<td width=\"11%\">拆除时间<br>(年/月/日)</td><td width=\"6%\">操作</td></tr>";
	$("#tl_table").html(tl_table_html);
	$('#tl_table').hide();
	
	var tx_table_html = "<tr class=\"dise\"><td width=\"13%\">脱硝工艺<code>*</code></td><td width=\"13%\">脱硝剂名称</td>" +
			"<td width=\"24%\">脱硝剂使用量</td><td width=\"11%\">脱硝岛效率<br>(%)</td><td width=\"11%\">投运率<br>(%)</td>" +
			"<td width=\"11%\">投运时间<br>(年/月/日)</td><td width=\"11%\">拆除时间<br>(年/月/日)</td><td width=\"6%\">操作</td></tr>";
	$("#tx_table").html(tx_table_html);
	$('#tx_table').hide();
	
	var dd_table_html = "<tr class=\"dise\"><td width=\"50%\">低氮燃烧技术<code>*</code></td><td width=\"11%\">低氮燃烧脱硝效率<br>(%)</td>" +
			"<td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
			"<td width=\"11%\">拆除时间<br>(年/月/日)</td><td width=\"6%\">操作</td></tr>";
	$("#dd_table").html(dd_table_html);
	$('#dd_table').hide();
	
	var cc_table_html = "<tr class=\"dise\"><td width=\"50%\">除尘工艺<code>*</code></td><td width=\"11%\">除尘效率<br>(%)</td>" +
			"<td width=\"11%\">投运率<br>(%)</td><td width=\"11%\">投运时间<br>(年/月/日)</td>" +
			"<td width=\"11%\">拆除时间<br>(年/月/日)</td><td width=\"6%\">操作</td></tr>";
	$("#cc_table").html(cc_table_html);
	$('#cc_table').hide();
}
function GetRandomNum(Min,Max){   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   
//查询设备总览
function shebei_list(){
	var data = ajax_async_t(BackstageIP+"dto/findEquip.do",{taskId:taskId,userId:userId,version:version},"json ","true");
	var html='<tr class="dise"><td>序号</td><td>设备类型</td><td>排污许可证编号</td><td>投运时间(年/月/日)</td> <td>关停时间(年/月/日)</td><td>状态</td><td>操作</td></tr>';
	var k = 0;
	if ( data !=null && data != undefined ) {
		$.each(data,function(i,item){
			var num = i+1;
//			var eeeid = item.equipId;
//			if (eeeid.indexOf("-")==0){
//				eeeid = "";
//			}
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
		$("#zhanwei").css("height",(document.body.clientHeight-(86+56+212+188+k))+"px");
		$("#zhanwei").show();
	}
	$("#shebei_list").html(html);
}
var look_or_up = "";//某个设备是查看还是编辑状态
//编辑设备
function update_shebei(equipId, type,ste){
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
			for(var k = 0;k<sheet.length;k++){
				if(sheet[k].key == type){
					for(var p = 0;p<sheet[k].value.length;p++){
						$("#"+sheet[k].value[p]).show();
						$.each(data[type],function(index, content) {
							$.each(content,function(name,value) {
								$("#"+sheet[k].value[0]+" #year").html(window.sessionStorage.getItem("year"));
								$("#"+sheet[k].value[0]+" #year").editable("setValue",window.sessionStorage.getItem("year"));
								if( name == "year" ) {
									$("#"+sheet[k].value[0]+" #year").html(window.sessionStorage.getItem("year"));
								} else {
									$("#"+sheet[k].value[p]+" #"+name).editable("setValue",value);
									if(name=="equipId"){//在基本信息中，取出排污许可证编号，用于编辑保存时返回给后端
										equipId_update = value;
									}
									$.each(sheet[k].Strengthen,function(v1,v2) {//循环加强显示
										if(name == v2){
											$("#"+sheet[k].value[p]+" #"+name).html(value);
										}
									});
								}
								
							});
						});
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
							}
						}
						
					}
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
		look_or_up = ste;
		if( ste == 1  ){
			$("#save").hide();
			$("#close").hide();
			$('.editable').editable('disable');
		}else{
			$("#save").show();
			$("#close").show();
			$('.editable').editable('enable');
		}
		$("#dialog-tiaozhuan").dialog("close");
	}, 0)
	 
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
			}else if(name == "etaNOxxname"){
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
			"<td><a id=\"etaSO2enddate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'tl_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#tl_table").append(kongzhi);
	$.each(moduan_peizhi_1, function(i, column) {
		column.emptytext = emptytext;
		$("#tl"+index+" #"+column.field).editable(column);
	});
	return index;
}
//通用的设备删除行
function moduan_delete(obj, table){
	//删除父节点的父节点的父节点
	$(obj).parent().parent().parent().remove();
	var index = $("#"+table+" tr").length;//获取当前表格的行数量
	if(index == 1){
		//如果只有一行了，说明只剩标题行，整个表格应该隐藏
		$("#"+table).hide();
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
			"<td><a id=\"etaNOxenddate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'tx_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
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
			"<td><a id=\"etaNOxxname\"></a></td>" +
			"<td><a id=\"etaNOxxeta\"></a></td>" +
			"<td><a id=\"etaNOxxratio\"></a></td>" +
			"<td><a id=\"etaNOxxstartdate\"></a></td>" +
			"<td><a id=\"etaNOxxenddate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'dd_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
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
			"<td><a id=\"etaPMeta\"></a></td>" +
			"<td><a id=\"etaPMratio\"></a></td>" +
			"<td><a id=\"etaPMstartdate\"></a></td>" +
			"<td><a id=\"etaPMenddate\"></a></td>" +
			"<td><a><img title=\"删除设备\" onclick=\"moduan_delete(this,'cc_table')\" src=\"../images/delete.png\" style=\"width:16px;height:16px;\"></a></td></tr>";
	$("#cc_table").append(kongzhi);
	$.each(moduan_peizhi_4, function(i, column) {
		column.emptytext = emptytext;
		$("#cc"+index+" #"+column.field).editable(column);
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
									if (!html_value){
										check_Result.push(column.title);
									}
								}
							});
						}else if(shebei_html[p].indexOf("moduankongzhi")>=0){//处理末端控制
							//末端控制只有四个工艺是必填项，直接判断
							if(html_id == "etaSO2name"){
								if (html_value == "" || html_value == undefined ) {
									check_Result.push("脱硫工艺");
								}
							}else if(html_id == "etaNOxname"){
								if (html_value == "" || html_value == undefined ) {
									check_Result.push("脱硝工艺");
								}
							}else if(html_id == "etaNOxxname"){
								if (html_value == "" || html_value == undefined ) {
									check_Result.push("低氮燃烧技术");
								}
							}else if(html_id == "etaPMname"){
								if (html_value == "" || html_value == undefined ) {
									check_Result.push("除尘工艺");
								}
							}
						}else if(shebei_html[p].indexOf("zaixianjiance")>=0){//处理在线监测
							if(html_id == "installornot"){
								//在线监测只有是否安装为必填项，单独处理就好
								if (html_value == "" || html_value == undefined ) {
									check_Result.push("在线监测是否安装");
								}
							}
						}
						
					}
				});
			}
		}
	}
	return check_Result;
}
//页面初始化
function html_close(){
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

$(function(){
	//查看还是编辑状态判断
	stype = window.sessionStorage.getItem("type");
	if ( stype == "look" ) {
		$("#New_equipment").hide();
		$("#synchronization").hide();
	}
	
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
//			if(save_data()){
//				html_close();//页面初始化
//				shebei_list();//重新加载设备列表
//				$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>保存成功！</b></span>");
//				$("#dialog-tiaozhuan").dialog("open");
//			}
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
		if( stype == "look" ) $('.editable').editable('disable');
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
		if( stype == "look" ) $('.editable').editable('disable');
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
		if( stype == "look" ) $('.editable').editable('disable');
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
		if( stype == "look" ) $('.editable').editable('disable');
	});
	
	//热电联产的状态判断，通过监听html的变化实现
	$("#cogenerationornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") {
			$("#hotd1").show();
			$("#hotd2").show();
		}else{
			$("#hotd1").hide();
			$("#hotd2").hide();
		}
		if( stype == "look" ) $('.editable').editable('disable');
	});
	
	//是否安装在线监测
	$("#installornot").bind('DOMNodeInserted', function(e) {
		if ( $(e.target).html() == "是") {
			$("#weianzhuang1").hide();
			$("#weianzhuang2").hide();
			$("#weianzhuang3").hide();
			$("#weianzhuang4").hide();
			$("#anzhuang1").show();
			$("#anzhuang2").show();
			$("#anzhuang3").show();
			$("#anzhuang4").show();
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
			$("#anzhuang1").hide();
			$("#anzhuang2").hide();
			$("#anzhuang3").hide();
			$("#anzhuang4").hide();
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
//			window.location.href="b.html";
			window.location.replace("/polist/zp01/b.html");
		} else {
			if( look_or_up == 1 ) {
				window.location.replace("/polist/zp01/b.html");
			} else {
				if(edit_show()){
					//显示意味着处于编辑状态
					$("#dialog-tiaozhuan-content").html("<span style='color:red'><b>您正在编辑设备信息，请先保存设备信息或取消。</b></span>");
					$("#dialog-tiaozhuan").dialog("open");
				}else{
					window.location.replace("/polist/zp01/b.html");
				}
			}
		}
	});
	
	//查询设备总览
	shebei_list();
});

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
	$("#dialog-tiaozhuan-content").html("<span style='color:green'><b>请稍后！</b></span>");
	$("#dialog-tiaozhuan").dialog("open");
	
	var jsonobj = {};
	jsonobj.userId = userId;
	jsonobj.taskId = taskId;
	jsonobj.version = version;
	jsonobj.isCompany = false;
//	jsonobj.equipId = equipId_update;
	jsonobj.value = {};
	
	for(var k = 0;k<sheet.length;k++){//循环所有的配置项
		if(sheet[k].key == sheet_name){//如果配置项和当前的活动设备一致，可以取到当前设备的页面范围
			var shebei_html = sheet[k].value;
			
			var jiben_json = {};
			var moduan_json = [];
			var zaixian = {};
			var zaixian_s = []
			var equipId = "";
			for(var p = 0; p<shebei_html.length; p++){//循环活动设备的所有内容，包括基本信息、燃料信息、活动水平、末端和在线监测
				
				if(shebei_html[p].indexOf("shebei")>=0){
					$("#"+shebei_html[p]+" .editable").each(function(){//获取基本信息中所有的编辑框，循环判断每个编辑框的显隐状态，隐藏的跳过，显示的存入json中
						if($(this).is(":visible")) jiben_json[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
						if(sheet_name == "表p5012_畜禽养殖量信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "unknown"+num;
						}else if(sheet_name == "表p6012_施工扬尘信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "unknown"+num;
						}else if(sheet_name == "表p06_堆场信息表"){
							var num = GetRandomNum(1,10000000);
							jiben_json["equipId"] = "unknown"+num;
						}
					});
					equipId = $("#"+shebei_html[p]+" #equipId").editable("getValue").equipId;//记录设备排污许可证编号
				}else if(shebei_html[p].indexOf("moduankongzhi")>=0){//处理末端控制
					//循环表格内所有的行，逐行取数据
					$("#"+shebei_html[p]+" #tl_table tr").each(function(){
						//每次需要判断一下必填项有没有，没有填写，本行数据无效
						if(typeof $(this).find("#etaSO2name").editable("getValue").etaSO2name != "undefined"){//判断这一行是否是数据行
//							console.log($(this).find(".editable").editable("getValue"));
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
						if(typeof $(this).find("#etaNOxxname").editable("getValue").etaNOxxname != "undefined"){
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
				}else if(shebei_html[p].indexOf("zaixianjiance")>=0){//处理在线监测
					$("#"+shebei_html[p]+" .editable").each(function(){
						if($(this).is(":visible")) zaixian[$(this).attr("id")] = $(this).editable("getValue")[$(this).attr("id")];
					});
					zaixian.equipId = equipId;
					zaixian_s.push(zaixian);
				}
			}
			jsonobj.value[sheet_name] = [jiben_json];
			if(moduan_json.length>0){
				jsonobj.value["表p01_末端控制设备信息表"] = moduan_json;
			}
			if(zaixian_s.length>0){
				jsonobj.value["表p03_在线监测信息表"] = zaixian_s;
			}
		}
	}
	consolelog(JSON.stringify(jsonobj));
	return;
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