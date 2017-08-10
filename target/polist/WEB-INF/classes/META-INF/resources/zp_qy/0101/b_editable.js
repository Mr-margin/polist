/**
	企业页面编辑配置项
*/
var emptytext = "请填写";
var reg=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/; 
var reg1=/^[1-9]+\d{3}\-(?:0[1-9]|1[0-2]|[1-9]{1})$/; 
var teshu =  /^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/;
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
	if (!v) return '不能为空';
	if (v.length>50) return "内容太多了";
	var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/  ;
	if(!email.test(v)){
		return "请输入正确的邮箱";
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
	if (v.length != 4) return "请输入正确的年份！";
}
function validate_3_2(v){
	if (v.length>7) return "内容太多了";
	if((!v.match(reg1))&&v) return '请按照YYYY-MM格式填写';
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
	if (v.length>10) return "内容太多了";
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
var columns = [
{
    title:"企业编号",
    type:"text",
    field:"companyId",
    validate:validate_1
},{
    title:"企业名称",
    type:"text",
    field:"companyname",
    validate:validate_1
},{
    title:"组织机构代码",
    type:"text",
    field:"companaynumber",
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
    title:"企业联系人",
    type:"text",
    field:"legalentitylx",
    validate:validate_1
},{
    title:"联系电话",
    type:"text",
    field:"legaltel",
    validate:validate_1_1
},{
    title:"年工业总产值",
    type:"text",
    field:"gdp",
    validate:validate_5
},{
    title:"用电量",
    type:"text",
    field:"poweramount",
    validate:validate_5
},{
    title:"连续／间歇生产",
    type:"select",
    field:"intermitornot",
    source:function () {
    	return ["连续生产","间歇生产"];
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-intermitornot"
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
    title:"生产月份",
    type:"checklist",
    field:"openmonths",
    separator:",",
    source: [{ value: '1', text: '1月' },
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
    title:"年生产天数",
    type:"text",
    field:"openhours",
    validate:validate_4
},{
    title:"投产年份",
    title: "年份",
    type:"text",
    field:"openyear",
    validate:validate_3_1
},{
    title:"调查员",
    type:"text",
    field:"interviewperson",
    validate:validate_1
},{
    title:"调查员手机号",
    type:"text",
    field:"interviewtel",
    validate:validate_1_1
},{
    title:"填表人",
    type:"text",
    field:"informant",
    validate:validate_1
},{
    title:"填表人手机号",
    type:"text",
    field:"tel",
    validate:validate_1_1
},
{
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
    field:"vill",
    validate:validate_2
},{
    title:"街道（村）",
    type:"text",
    field:"street",
    validate:validate_2
},{
    title:"路/门牌号",
    type:"text",
    field:"streetNO",
    validate:validate_2
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
}];

var columns_sccp = [{
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"工段名称",
    type:"text",
    field:"equiptype",
    validate:validate_1
},{
    title:"产品名称",
    type:"text",
    field:"aproducttype",
    validate:validate_1
},{
    title:"年产量",
    type:"text",
    field:"aproducttotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"productunit",
    validate:validate_1
},{
    title:"原料名称",
    type:"text",
    field:"materialtype",
    validate:validate_1
},{
    title:"年消耗量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"materialunit",
    validate:validate_1
},{
    title:"燃料名称",
    type:"select",
    field:"fueltype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-fueltype",
            	level1:"表simp01_产品生产信息表",
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
    title:"年消耗量",
    type:"text",
    field:"aheatfueltotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"fuelunit",
    validate:validate_1
},{
	title:"脱硫工艺",
    type:"select",
    field:"etaSO2name",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaSO2name"
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
	title:"除尘工艺",
    type:"select",
    field:"etaPMname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaPMname"
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
    title:"排放口高度",
    type:"text",
    field:"pfkheight",
    validate:validate_5_1
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}
];

var columns_sccp_cp = [{
    title:"生产工艺编号",
    type:"select",
    field:"equipId",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_sccp_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"产品名称",
    type:"text",
    field:"aproducttype",
    validate:validate_1
},{
    title:"年产量",
    type:"text",
    field:"aproducttotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"productunit",
    validate:validate_1
},{
    title:"产品编号",
    type:"text",
    field:"v1",
    validate:validate_1
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}];
var columns_sccp_yl = [{
    title:"生产工艺编号",
    type:"select",
    field:"equipId",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_sccp_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"原料名称",
    type:"text",
    field:"materialtype",
    validate:validate_1
},{
    title:"年消耗量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"materialunit",
    validate:validate_1
},{
    title:"产品编号",
    type:"select",
    field:"v1",
    source:function () {
    	var result = [];
    	$("#add_sccp_cp_table tr").each(function(){
    		if(typeof $(this).find("#v1").editable("getValue").v1 != "undefined"){
    			result.push($(this).find("#v1").editable("getValue").v1);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}
]
var columns_sccp_rl = [{
    title:"生产工艺编号",
    type:"checklist",
    field:"equipId",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_sccp_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"燃料名称",
    type:"select",
    field:"fueltype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-fueltype",
            	level1:"表simp01_产品生产信息表",
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
    title:"年消耗量",
    type:"text",
    field:"aheatfueltotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"fuelunit",
    validate:validate_1
},{
    title:"产品编号",
    type:"select",
    field:"v1",
    source:function () {
    	var result = [];
    	$("#add_sccp_cp_table tr").each(function(){
    		if(typeof $(this).find("#v1").editable("getValue").v1 != "undefined"){
    			result.push($(this).find("#v1").editable("getValue").v1);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}];
var columns_sccp_zl = [{
    title:"生产工艺编号",
    type:"checklist",
    field:"v1",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_sccp_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
	title:"脱硫工艺",
    type:"select",
    field:"etaSO2name",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaSO2name"
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
	title:"除尘工艺",
    type:"select",
    field:"etaPMname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaPMname"
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
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}];



var columns_yjrj = [{
	title:"溶剂类型",
    type:"select",
    field:"asolventtypename",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-solventtype",
            	level1:"表simp04_溶剂使用信息表"
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
    title:"溶剂名称",
    type:"text",
    field:"asolventname",
    validate:validate_1
},{
    title:"溶剂性质",
    type:"select",
    field:"solventstate",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-solventstate",
            	level1:"表simp04_溶剂使用信息表"
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
    title:"年使用量(吨)",
    type:"text",
    field:"asolventtotal",
    validate:validate_5_1
},{
    title:"VOC治理技术",
    type:"select",
    field:"etaVOCname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-voc",
            	level1:"表simp04_溶剂使用信息表"
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
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}
];
var columns_guolu = [{
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"锅炉容量",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"燃料名称",
    type:"select",
    field:"fueltype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-fueltype",
            	level1:"表simp02_锅炉信息表",
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
    title:"年消耗量",
    type:"text",
    field:"aheatfueltotal",
    validate:validate_5_1
},{
    title:"单位",
    type:"text",
    field:"fuelunit",
    validate:validate_1
},{
	title:"脱硫工艺",
    type:"select",
    field:"etaSO2name",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaSO2name"
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
	title:"除尘工艺",
    type:"select",
    field:"etaPMname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaPMname"
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
    title:"排放口高度(米)",
    type:"text",
    field:"pfkheight",
    validate:validate_5_1
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    placeholder:"请按照YYYY-MM格式填写",
    validate:validate_3_2
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    placeholder:"请按照YYYY-MM格式填写",
    validate:validate_3_2
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}
];
var columns_ltdc = [{
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"料堆类型",
    type:"select",
    field:"dctype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-dctype",
            	level1:"表simp03_露天堆场信息表"
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
    title:"料堆材料",
    type:"select",
    field:"dcmat",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-dcmat",
            	level1:"表simp03_露天堆场信息表"
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
    title:"料堆高度",
    type:"text",
    field:"dcheight",
    validate:validate_5_1
},{
    title:"占地面积",
    type:"text",
    field:"dcaera",
    validate:validate_5_1
},{
    title:"日常存储量",
    type:"text",
    field:"dcamount",
    validate:validate_5_1
},{
    title:"单车运载量",
    type:"text",
    field:"dcmeantrans",
    validate:validate_5_1
},{
    title:"年物料运载车次",
    type:"text",
    field:"dctransamount",
    validate:validate_5_1
},{
    title:"扬尘控制措施",
    type:"select",
    field:"dustcontrol",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-dealtype",
            	level1:"表simp03_露天堆场信息表"
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
    title:"",
    type:"text",
    field:"status",
    validate:validate_5_1
}];