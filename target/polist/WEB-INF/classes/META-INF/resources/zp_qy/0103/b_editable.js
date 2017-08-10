/**
	企业页面编辑配置项
*/
var emptytext = "请填写";
var reg=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/; 
var reg1=/^((?:(?:0[0-9]|1[0-9]|2[0-4]))-(?:(?:0[0-9]|1[0-9]|2[0-3])))$/; 
function validate_1(v){
	if (!v) return '不能为空';
	if (v.length>50) return "内容太多了";
}
function validate_1_1(v){
	if (!v) return '不能为空';
	if (v.length>50) return "内容太多了";
	var dh=/^((0\d{2,3}-?\d{6,8})|(1[35847]\d{9}))$/;
	if(!dh.test(v)){
		return "请输入正确的联系方式";
	}
}
function validate_1_2(v){
	if ( $("#industrytype").html() == "畜禽养殖" || $("#industrytype").html() == "施工扬尘" || $("#industrytype").html() == "餐饮油烟" ) {
		if (!v){
		} else {
			if (v.length>50) return "内容太多了";
			var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/  ;
			if(!email.test(v)){
				return "请输入正确的邮箱";
			}
		}
		
	} else {
		if (!v) return '不能为空';
		if (v.length>50) return "内容太多了";
		var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/  ;
		if(!email.test(v)){
			return "请输入正确的邮箱";
		}
	}
	
}
function validate_2(v){
	if (v.length>50) return "内容太多了";
}

function validate_3(v){
	if (v.length>10) return "内容太多了";
	if((!v.match(reg))&&v) return '请按照YYYY-MM-DD格式填写';
}
function validate_3_1(v){
	if (!v) {}else {
		if (isNaN(v)) return '必须是数字';
		if (v.length != 4) return "请输入正确的年份！";
	}
	
}
function validate_4(v){
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
  var date = new Date().getFullYear();
  var allDay = 365;
  if(Math.floor(date/100) == (date/100)){
    if(Math.floor(date/400) == (date/400)){
      allDay = 366;
    }
  }else{
    if(Math.floor(date/4) == (date/4)){
      allDay = 366;
    }
  }
	if (age < 0||age > allDay) return '必须填写0到'+allDay+'之间';
}
function validate_5(v){
	if (!v) return '不能为空';
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
}

function validate_5_1(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
}
function validate_5_2(v){
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
}
function validate_5_3(v){
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
}
function validate_5_1_1(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
}
function validate_6(v){
	if (!v) return '不能为空';
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 73||age > 136) return '必须填写中国境内经度73到136之间';
}
function validate_6_1(v){
	if (!v) return '不能为空';
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 3||age > 54) return '必须填写中国境内纬度3到54之间';
}
function validate_6_3(v){
	if (v.length>9) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-") == 0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length >5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
}
function validate_7(v){
	if (!v) return '不能为空';
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 60) return '必须填写0到60之间';
}

function validate_8(v){
	if (!v) return '不能为空';
	if (v.length>4) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 8760) return '必须填写0到8760之间';
}
function validate_9(v){
    if (!v) return '不能为空';
    if (v.length>4) return "内容太多了";
    if (isNaN(v)) return '必须是数字';
    if ((v+"").indexOf("-")==0) return '不能填写负数';
    if (v.indexOf(".")>=0) return '不能有小数';
    var age = parseInt(v);
    if (age < 0||age > 12) return '必须填写0到12之间';
}
function validate_9_1(v){
    if (v.length>6) return "内容太多了";
    if((!v.match(reg1))&&v) return '请按照HH-HH格式填写';
}
var columns = [
{
    title:"企业编号",
    type:"text",
    field:"companyId",
    validate:validate_1
},{
    title:"控股集团",
    type:"text",
    field:"kgcompany",
    validate:validate_1
},{
        title:"企业名称",
        type:"text",
        field:"companyname",
        validate:validate_1
    },{
        title:"施工单位",
        type:"text",
        field:"companynamename",
        validate:validate_1
    },{
        title:"控股集团",
        type:"text",
        field:"jyCom",
        validate:validate_1
    },{
        title:"	工地名称",
        type:"text",
        field:"gdName",
        validate:validate_1
    },{
        title:"	施工单位",
        type:"text",
        field:"gdCom",
        validate:validate_1
    },{
    title:"组织机构代码",
    type:"text",
    field:"companaynumber",
    validate:validate_1
},{
        title:"组织机构代码",
        type:"text",
        field:"jyCode",
        validate:validate_1
    },{
    title:"行业类别",
    type:"select",
    field:"industrytype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-industrytype"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
},{
    title:"法人代表",
    type:"text",
    field:"legalentity",
    validate:validate_2
},{
    title:"填报人",
    type:"text",
    field:"informant",
    validate:validate_1
},{
    title:"联系电话",
    type:"text",
    field:"tel",
    validate: validate_1_1
},{
    title:"邮箱",
    type:"text",
    field:"mail",
    validate: validate_1_2
},{
        title:"邮箱",
        type:"text",
        field:"legalmail",
        validate: validate_1_2
    },{
    title:"开业时间",
    type:"text",
    field:"opendate",
    validate:validate_3
},{
        title:"营业时段",
        type:"text",
        field:"openhourperiod",
        validate:validate_9_1
    },{
        title:"开工时间",
        type:"text",
        field:"startdate",
        validate:validate_3
    },{
        title:"结束时间",
        type:"text",
        field:"enddate",
        validate:validate_3
    },{
    title:"年生产天数",
    type:"text",
    field:"openhours",
    validate:validate_4
},{
    title:"年工业总产值",
    type:"text",
    field:"gdp",
    validate:validate_5_2
},{
    title:"县（县级市、区、旗）",
    type:"select",
    field:"county",
    sourceCache: true,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/selectCountry',
            async: false,
            type: "POST",
            data: {
            	city: $("#city").html()
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
},{
    title:"乡（镇）",
    type:"text",
    emptytext: emptytext,
    field:"vill",
    validate:validate_2
},{
    title:"街道（村）",
    type:"text",
    emptytext: emptytext,
    field:"street",
    validate:validate_2
},{
    title:"门牌号",
    type:"text",
    emptytext: emptytext,
    field:"streetNO",
    validate:validate_2
},{
    title:"年煤炭消耗量",
    type:"text",
    field:"totalcoal",
    validate:validate_5_1_1
},{
    title:"年燃气消耗量",
    type:"text",
    field:"totalgas",
    validate:validate_5_1_1
},{
    title:"年燃油消耗量",
    type:"text",
    field:"totaloil",
    validate:validate_5_1_1
},{
        title:"封闭式台数",
        type:"text",
        field:"fengbinums",
        validate:validate_5_3
    },{
        title:"开放式台数",
        type:"text",
        field:"kaiqinums",
        validate:validate_5_3
    },{
        title:"设备总容量",
        type:"text",
        field:"totalvolume",
        validate:validate_5_2
    },{
    title:"工业锅炉数",
    type:"text",
    field:"boilernumbers",
    validate:validate_5_3
},{
    title:"锅炉总蒸吨数",
    type:"text",
    field:"boilertons",
    validate:validate_5_2
},{
    title:"工业窑炉数",
    type:"text",
    field:"kilnnumbers",
    validate:validate_5_1_1
},{
    title:"中心经度-度",
    type:"text",
    field:"lon1",
    validate:validate_6
},{
    title:"中心经度-分",
    type:"text",
    field:"lon2",
    validate:validate_7
},{
    title:"中心经度-秒",
    type:"text",
    field:"lon3",
    validate:validate_7
},{
    title:"中心纬度-度",
    type:"text",
    field:"lat1",
    validate:validate_6_1
},{
    title:"中心纬度-分",
    type:"text",
    field:"lat2",
    validate:validate_7
},{
    title:"中心纬度-秒",
    type:"text",
    field:"lat3",
    validate:validate_7
},{
	title:"汽油销售量",
    type:"text",
    field:"agasolinesale",
    validate:validate_5_1
},{
	title:"柴油销售量",
    type:"text",
    field:"adieselsale",
    validate:validate_5_1
},{
	title:"去除效率",
    type:"text",
    field:"conratio",
    validate:validate_6_3
},{
	title:"固定灶头数",
    type:"text",
    field:"acooknums",
    validate:validate_5_1
},{
	title:"烟气排放速率",
    type:"text",
    field:"agasspeed",
    validate:validate_5_1
},{
	title:"年总经营时间",
    type:"text",
    field:"ahours",
    validate:validate_8
},{
	title:"营业月份",
	type:"checklist",
	field:"openmonths",
	source:[{ value: '1', text: '1月'},
            { value: '2', text: '2月' },
            { value: '3', text: '3月' },
            { value: '4', text: '4月' },
            { value: '5', text: '5月' },
            { value: '6', text: '6月' },
            { value: '7', text: '7月' },
            { value: '8', text: '8月' },
            { value: '9', text: '9月' },
            { value: '10', text: '10月' },
            { value: '11', text: '11月' },
            { value: '12', text: '12月' }
            ],
},{
	title:"起降架次",
	type:"text",
	field:"aflynums",
	validate:validate_5_1
},{
	title:"统一社会信用代码",
    type:"text",
    field:"companysocietynumber",
    validate:validate_1
},{
	title:"排污许可证编号",
    type:"text",
    field:"pwnumber",
    validate:validate_2
},{
	title:"SO2总量控制限值",
    type:"text",
    field:"pwSO2",
    validate:validate_5_2
},{
    title:"焚烧炉燃料使用量",
    type:"text",
    field:"fsfuelamount",
    validate:validate_5_1
},{
    title:"年用电量",
    type:"text",
    field:"poweramount",
    validate:validate_5_2
},{
    title:"废水排放量",
    type:"text",
    field:"wateramount",
    validate:validate_5_1
},{
    title:"废水自处理率",
    type:"text",
    field:"waterdealratio",
    validate:validate_6_3
},{
	title:"NOx总量控制限值",
    type:"text",
    field:"pwNOx",
    validate:validate_5_2
},{
	title:"环统是否覆盖",
    type:"select",
    field:"htornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
},{
    title:"污水处理池是否加盖",
    type:"select",
    field:"watercoverornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
},{
    title:"焚烧炉类型",
    type:"text",
    field:"fstype",
    validate:validate_1
},{
    title:"餐饮类型",
    type:"text",
    field:"cateringtype",
    validate:validate_1
},{
    title:"是否有焚烧炉",
    type:"select",
    field:"fsornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
},{
	title:"环境统计年份",
	type:"text",
	field:"htyear",
	validate:validate_3_1
},{
	title:"环统二氧化硫排放量",
    type:"text",
    field:"htSO2",
    validate:validate_5_2
},{
	title:"环统NOx排放量",
    type:"text",
    field:"htNOx",
    validate:validate_5_2
},{
	title:"环统VOC排放量",
    type:"text",
    field:"htVOC",
    validate:validate_5_2
},{
	title:"环统烟粉尘排放量",
    type:"text",
    field:"htPM",
    validate:validate_5_2
},{
	title:"发电机组个数",
    type:"text",
    field:"zbjznums",
    validate:validate_5_1_1
},{
	title:"有机液体储罐数",
    type:"text",
    field:"cgnums",
    validate:validate_5_1_1
},{
	title:"露天堆场个数",
    type:"text",
    field:"dcnums",
    validate:validate_5_1_1
},{
	title:"企业填报人",
    type:"text",
    field:"legalentitylx",
    validate:validate_1
},{
	title:"企业联系电话",
    type:"text",
    field:"legaltel",
    validate:validate_1_1
},{
	title:"企业邮箱",
    type:"text",
    field:"legalmail",
    validate:validate_1_2
},{
	title:"	封闭式台数",
	type:"text",
	field:"clearMeter_1",
	validate:validate_5_1_1
},{
    title:"	开放式台数",
    type:"text",
    field:"clearMeter_2",
    validate:validate_5_1_1
},{
    title:"	设备总容量",
    type:"text",
    field:"clearMeter_3",
    validate:validate_5_1_1
},{
    title:"	建筑面积",
    type:"text",
    field:"aconsaera",
    validate:validate_5_1_1
},{
    title:"	占地面积",
    type:"text",
    field:"atotalaera",
    validate:validate_5_1_1
},{
    title:"	硬化道路面积",
    type:"text",
    field:"aroadaera",
    validate:validate_5_1_1
},{
    title:"	裸土面积",
    type:"text",
    field:"asoilaera",
    validate:validate_5_1_1
},{
	title:"总量核查是否覆盖",
    type:"select",
    field:"zlornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
},{
	title:"总量核查年份",
    type:"text",
    field:"zlyear",
    validate:validate_3_1
},{
	title:"总量核查SO2排放量",
    type:"text",
    field:"zlSO2",
    validate:validate_5_2
},{
	title:"	总量核查NOx排放量",
    type:"text",
    field:"zlNOx",
    validate:validate_5_2
},{
	title:"回收方式",
    type:"select",
    field:"contype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-contype",
            	level1:"表p8012_加油站信息表"
            },
            success: function (data, status) {
            	console.log(data);
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
},{
  title:"去除效率",
  type:"text",
  field:"conratio",
  validate:validate_6_3
},{
	title:"油烟净化器类型",
    type:"select",
    field:"contype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-contype",
            	level1:"表p10012_餐饮业信息表"
            },
            success: function (data, status) {
            	console.log(data);
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
},{
  title:"去除效率",
  type:"text",
  field:"conratio",
  validate:validate_6_3
},{
	  title:"产品类型",
	  type:"text",
	  field:"producttype",
	    source:function () {
	    	var result = [];
	    	$.ajax({
	            url: BackstageIP+'dictionary/findDictionary',
	            async: false,
	            type: "POST",
	            data: {
	            	sheetName: "list-prodcuttype",
	            	level1:"表p204_企业基本信息表"
	            },
	            success: function (data, status) {
	                result = data;
	            },
	            error: function(data){
	            }
	        });
	        return result;
	    }
},{
  title:"汽油销售量",
  type:"text",
  field:"agasolinesale",
  validate:validate_5_1
},{
  title:"柴油销售量",
  type:"text",
  field:"adieselsale",
  validate:validate_5_1
},{
  title:"回收方式",
  type:"text",
  field:"contype",
  source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-contype",
            	level1:"表p8012_加油站信息表"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
},{
  title:"去除效率",
  type:"text",
  field:"conratio",
	  validate:validate_6_3
	}
,{
  title:"营业面积",
  type:"text",
  field:"workingaera",
  validate:validate_5_2
},{
  title:"固定灶头数",
  type:"text",
  field:"acooknums",
  validate:validate_6_3
},{
  title:"油烟净化器类型",
  type:"text",
  field:"contype",
  source:function () {
	  	var result = [];
	  	$.ajax({
	          url: BackstageIP+'dictionary/findDictionary',
	          async: false,
	          type: "POST",
	          data: {
	          	sheetName: "list-contype",
	          	level1:"表p10012_餐饮业信息表"
	          },
	          success: function (data, status) {
	              result = data;
	          },
	          error: function(data){
	          }
	      });
	      return result;
	  }
}
];
var columns_scx = [{
	  title:"产品名称",
	  type:"text",
	  field:"productname",
	  validate:validate_1
	},{
		  title:"产品产量",
		  type:"text",
		  field:"productamount",
		  validate:validate_5_1
		}];
var columns_ranliao = [{
  title:"燃料名称",
  type:"text",
  field:"fueltype",
  source:function () {
  	var result = [];
  	$.ajax({
          url: BackstageIP+'dictionary/findDictionary',
          async: false,
          type: "POST",
          data: {
          	sheetName: "list-fueltype",
          	level1:"表p10012_餐饮业信息表"
          },
          success: function (data, status) {
              result = data;
          },
          error: function(data){
          }
      });
      return result;
  }
},{
  title:"单位",
  type:"text",
  field:"fuelunit",
  validate:validate_1
},{
  title:"年消耗量",
  type:"text",
  field:"aheatfueltotal",
  validate:validate_5_1
}];