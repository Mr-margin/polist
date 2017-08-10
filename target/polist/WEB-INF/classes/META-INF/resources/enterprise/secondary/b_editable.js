/**
	企业页面编辑配置项
*/
var emptytext = "请填写";
var reg=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/; 
var reg1=/^[1-9]+\d{3}\-(?:0[1-9]|1[0-2]|[1-9]{1})$/; 

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
function validate_3_2(v){
	if (v.length>7) return "内容太多了";
	if((!v.match(reg1))&&v) return '请按照YYYY-MM格式填写';
}
function validate_3_1(v){
	if (v.length != 4) return "请输入正确的年份！";
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
function validate_5_1_2(v){
	if (v.length>10) return "内容太多了";
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
function validate_8_1(v){
	if (v.length>4) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length >5) return '小数不能超过五位';
	var age = parseInt(v);
	if (v < 0||v > 8784) return '必须填写0到8760之间';
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
},
{
    title:"统一社会信用代码",
    type:"text",
    field:"companysocietynumber",
    validate:validate_1
},{
    title:"年工业总产值",
    type:"text",
    field:"gdp",
    validate:validate_5
},{
    title:"年用电量",
    type:"text",
    field:"poweramount",
    validate:validate_5
},{
    title:"生产月份",
    type:"checklist",
    field:"openmonths",
    separator:",",
    source: [{ value: '1', text: '1月'},
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
    title:"连续生产/间歇生产",
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
            	sheetName: "list-intermitornot",
            	level1:""
            	
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
    title:"年煤炭消耗量(吨)",
    type:"text",
    field:"totalcoal",
    validate:validate_5_1
},{
    title:"投产日期",
    type:"text",
    field:"openyear",
    validate:validate_3_1
},{
    title:"年生产天数",
    type:"text",
    field:"openhours",
    validate:validate_4
},{
    title:"年煤炭消耗量（吨）",
    type:"text",
    field:"totalcoal",
    validate:validate_5_1
},{
    title:"年燃气消耗量（万立方米）",
    type:"text",
    field:"totalgas",
    validate:validate_5_1
},{
    title:"年燃油消耗量（吨）",
    type:"text",
    field:"totaloil",
    validate:validate_5_1
},{
    title:"锅炉数（台）",
    type:"text",
    field:"boilernumbers",
    validate:validate_5_1_2
},{
    title:"锅炉总蒸吨数（吨/小时）",
    type:"text",
    field:"boilertons",
    validate:validate_5
},{
    title:"工业窑炉数",
    type:"text",
    field:"kilnnumbers",
    validate:validate_5_1_2
},{
    title:"煤炭来源地",
    type:"text",
    field:"coalsource",
    validate:validate_1
},{
    title:"煤炭运输方式",
    type:"select",
    field:"coaltrans",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-trans",
            	level1:"表comp00_企业基本信息表"
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
    title:"主要原料来源地",
    type:"text",
    field:"materialsource",
    validate:validate_1
},{
    title:"原料运输方式",
    type:"select",
    field:"materialtrans",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-trans",
            	level1:"表comp00_企业基本信息表"
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
    title:"是否重点污染源",
    type:"select",
    field:"importantornot",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-judge"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
},


{
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
    title:"企业联系人",
    type:"text",
    field:"legalentitylx",
    validate:validate_1
},{
    title:"企业联系电话",
    type:"text",
    field:"legaltel",
    validate: validate_1_1
},{
    title:"企业邮箱",
    type:"text",
    field:"legalmail",
    validate: validate_1_2
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
    field:"vill",
    validate:validate_2
},{
    title:"街道（村）",
    type:"text",
    field:"street",
    validate:validate_2
},{
    title:"门牌号",
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

var columns_rlxx = [{//表comp01_燃料信息表
    title:"燃料类型",
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
            	level1:"表comp01_燃料信息表"
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
    title:"全年",
    type:"text",
    field:"totalfuel",
    validate:validate_5_1
},{
    title:"1月",
    type:"text",
    field:"fuel1",
    validate:validate_5
},{
    title:"2月",
    type:"text",
    field:"fuel2",
    validate:validate_5
},{
    title:"3月",
    type:"text",
    field:"fuel3",
    validate:validate_5
},{
    title:"4月",
    type:"text",
    field:"fuel4",
    validate:validate_5
},{
    title:"5月",
    type:"text",
    field:"fuel5",
    validate:validate_5
},{
    title:"6月",
    type:"text",
    field:"fuel6",
    validate:validate_5
},{
    title:"7月",
    type:"text",
    field:"fuel7",
    validate:validate_5
},{
    title:"8月",
    type:"text",
    field:"fuel8",
    validate:validate_5
},{
    title:"9月",
    type:"text",
    field:"fuel9",
    validate:validate_5
},{
    title:"10月",
    type:"text",
    field:"fuel10",
    validate:validate_5
},{
    title:"11月",
    type:"text",
    field:"fuel11",
    validate:validate_5
},{
    title:"12月",
    type:"text",
    field:"fuel12",
    validate:validate_5
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];

var columns_cpcl = [{//表comp02_产品信息表
    title:"产品名称",
    type:"text",
    field:"productname",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"prounit",
    validate:validate_1
},{
    title:"全年",
    type:"text",
    field:"producttotal",
    validate:validate_5_1
},{
    title:"1月",
    type:"text",
    field:"product1",
    validate:validate_5
},{
    title:"2月",
    type:"text",
    field:"product2",
    validate:validate_5
},{
    title:"3月",
    type:"text",
    field:"product3",
    validate:validate_5
},{
    title:"4月",
    type:"text",
    field:"product4",
    validate:validate_5
},{
    title:"5月",
    type:"text",
    field:"product5",
    validate:validate_5
},{
    title:"6月",
    type:"text",
    field:"product6",
    validate:validate_5
},{
    title:"7月",
    type:"text",
    field:"product7",
    validate:validate_5
},{
    title:"8月",
    type:"text",
    field:"product8",
    validate:validate_5
},{
    title:"9月",
    type:"text",
    field:"product9",
    validate:validate_5
},{
    title:"10月",
    type:"text",
    field:"product10",
    validate:validate_5
},{
    title:"11月",
    type:"text",
    field:"product11",
    validate:validate_5
},{
    title:"12月",
    type:"text",
    field:"product12",
    validate:validate_5
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];
var columms_pfk = [{//表comp03_排放口信息表
    title:"编号",
    type:"text",
    field:"pfkid",
    validate:validate_1
},{
    title:"排放口高度",
    type:"text",
    field:"pfkheight",
    validate:validate_5
},{
    title:"排放口直径(米)",
    type:"text",
    field:"pfkdiameter",
    validate:validate_5
},{
    title:"排放出口废气流速",
    type:"text",
    field:"pfkspeed",
    validate:validate_5
},{
    title:"废气排放流量",
    type:"text",
    field:"pfkvolume",
    validate:validate_5
},{
    title:"废气温度",
    type:"text",
    field:"pfktemperature",
    validate:validate_5
},{
    title:"废气含氧量",
    type:"text",
    field:"pfkoratio",
    validate:validate_5
},{
    title:"是否安装在线监测装置",
    type:"select",
    field:"installornot",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-judge"
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
    validate:validate_5
}];

var columns_zbfdz = [{//自备发电组
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"锅炉类型",
    type:"select",
    field:"equiptype",
    source:function () {
    	var result = [];
    	var ss = $(this).parent().parent().attr("id");
    	$("#"+ss+" #fueltype").editable("setValue","");
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-equipfueltype",
            	level1:"表comp04_自备发电机组信息表"
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
    title:"装机容量",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_2
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_2
},{
    title:"年发电量",
    type:"text",
    field:"powertotal",
    validate:validate_5_1
},{
    title:"年供热量",
    type:"text",
    field:"heattotal",
    validate:validate_5_1
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    source:function (v) {
    	var ss = $(this).parent().parent().attr("id");
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-equipfueltype",
            	level1:"表comp04_自备发电机组信息表",
            	level2:$("#"+ss+" #equiptype").html()
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
    field:"afueltotal",
    validate:validate_5_1
},{
    title:"硫份",
    type:"text",
    field:"sulfur",
    validate:validate_6_3
},{
    title:"灰分",
    type:"text",
    field:"ash",
    validate:validate_6_3
},{
    title:"排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];
var columns_guolu = [{//表comp05_锅炉信息表
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"锅炉类型",
    type:"select",
    field:"equiptype",
    source:function () {
    	var result = [];
    	var ss = $(this).parent().parent().attr("id");
    	$("#"+ss+" #fueltype").editable("setValue","");
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-equipfueltype",
            	level1:"表comp05_锅炉信息表"
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
    title:"锅炉用途",
    type:"select",
    field:"boileruse",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-yongtu",
            	level1:"表comp05_锅炉信息表"
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
    title:"锅炉容量",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_2
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_2
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    source:function () {
    	var ss = $(this).parent().parent().attr("id");
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-equipfueltype",
            	level1:"表comp05_锅炉信息表",
            	level2:$("#"+ss+" #equiptype").html()
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
    field:"afueltotal",
    validate:validate_5_1
},{
    title:"硫份",
    type:"text",
    field:"sulfur",
    validate:validate_6_3
},{
    title:"灰分",
    type:"text",
    field:"ash",
    validate:validate_6_3
},{
    title:"排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];

var columns_yaolu = [{//表comp06_窑炉信息表
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"窑炉类型",
    type:"text",
    field:"equiptype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "test",
            	level1:"表comp06_窑炉信息表"
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
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_2
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_2
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
    title:"硫份",
    type:"text",
    field:"materialsulfur",
    validate:validate_6_3
},{
    title:"燃料类型",
    type:"text",
    field:"fueltype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "test",
            	level1:"表comp06_窑炉信息表"
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
    field:"afueltotal",
    validate:validate_5_1
},{
    title:"硫份",
    type:"text",
    field:"sulfur",
    validate:validate_6_3
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
    title:"窑头",
    type:"select",
    field:"pfkids1",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"窑尾",
    type:"select",
    field:"pfkids2",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];
var columns_rjsy = [{//表comp08_溶剂使用信息表
    title:"溶剂类别",
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
            	level1:"表comp08_溶剂使用信息表"
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
            	level1:"表comp08_溶剂使用信息表"
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
    title:"年使用量",
    type:"text",
    field:"asolventtotal",
    validate:validate_5_1
},{
    title:"VOC回收方式",
    type:"select",
    field:"etaVOChsname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOChsname",
            	level1:"表comp08_溶剂使用信息表"
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
    title:"VOC销毁方式",
    type:"select",
    field:"etaVOCxhname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOCxhname",
            	level1:"表comp08_溶剂使用信息表"
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
    title:"排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];
var columns_yfl =[{//表comp09_原辅料及产品信息表
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
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_2
},{
    title:"原料名称",
    type:"text",
    field:"materialtype",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"materialunit",
    validate:validate_1
},{
    title:"年使用量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5_1
},{
    title:"辅料名称",
    type:"text",
    field:"fulmaterialname",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"fulmaterialunit",
    validate:validate_1
},{
    title:"年使用量",
    type:"text",
    field:"afulmaterialtotal",
    validate:validate_5_1
},{
    title:"产品名称",
    type:"text",
    field:"aproducttype",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"productunit",
    validate:validate_1
},{
    title:"年产量",
    type:"text",
    field:"aproducttotal",
    validate:validate_5_1
},{
    title:"排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
},{
    title:"产品编号",
    type:"text",
    field:"v1",
    validate:validate_1
},{
    title:"工段编号",
    type:"select",
    field:"equipId",
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"工段编号",
    type:"select",
    field:"equipId",
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"产品编号",
    type:"select",
    field:"v1",
    source:function () {
    	var result = [];
    	$("#add_yfl_cp_table tr").each(function(){
    		if(typeof $(this).find("#v1").editable("getValue").v1 != "undefined"){
    			result.push($(this).find("#v1").editable("getValue").v1);
    		}
    	});
    	return result;
    }
},{
    title:"工段编号",
    type:"select",
    field:"equipId",
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"产品编号",
    type:"select",
    field:"v1",
    source:function () {
    	var result = [];
    	$("#add_yfl_cp_table tr").each(function(){
    		if(typeof $(this).find("#v1").editable("getValue").v1 != "undefined"){
    			result.push($(this).find("#v1").editable("getValue").v1);
    		}
    	});
    	return result;
    }
}];
//表comp09_原辅料及产品信息表——产品信息 
var columns_yfl_cp =[{
    title:"产品名称",
    type:"text",
    field:"aproducttype",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"productunit",
    validate:validate_1
},{
    title:"年产量",
    type:"text",
    field:"aproducttotal",
    validate:validate_5_1
},{
    title:"产品编号",
    type:"text",
    field:"v1",
    validate:validate_1
},{
    title:"工段编号",
    type:"select",
    field:"equipId",
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];
//表comp09_原辅料及产品信息表——原料信息
var columns_yfl_yl =[{
    title:"原料名称",
    type:"text",
    field:"materialtype",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"materialunit",
    validate:validate_1
},{
    title:"年使用量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5_1
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
},{
    title:"产品编号",
    type:"select",
    field:"v1",
    source:function () {
    	var result = [];
    	$("#add_yfl_cp_table tr").each(function(){
    		if(typeof $(this).find("#v1").editable("getValue").v1 != "undefined"){
    			result.push($(this).find("#v1").editable("getValue").v1);
    		}
    	});
    	return result;
    }
},{
    title:"工段编号",
    type:"select",
    field:"equipId",
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
}];
//表comp09_原辅料及产品信息表——辅料信息 
var columns_yfl_fl =[{
    title:"辅料名称",
    type:"text",
    field:"fulmaterialname",
    validate:validate_1
},{
    title:"单位",
    type:"text",
    field:"fulmaterialunit",
    validate:validate_1
},{
    title:"年使用量",
    type:"text",
    field:"afulmaterialtotal",
    validate:validate_5_1
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
},{
    title:"产品编号",
    type:"select",
    field:"v1",
    source:function () {
    	var result = [];
    	$("#add_yfl_cp_table tr").each(function(){
    		if(typeof $(this).find("#v1").editable("getValue").v1 != "undefined"){
    			result.push($(this).find("#v1").editable("getValue").v1);
    		}
    	});
    	return result;
    }
},{
    title:"工段编号",
    type:"select",
    field:"equipId",
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
}];

var columns_yjytcg = [{//表comp10_有机液体储罐信息表
    title:"储罐编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"储罐类型",
    type:"select",
    field:"equiptype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-equiptype",
            	level1:"表comp10_有机液体储罐信息表"
            	
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
    title:"体积(立方米)",
    type:"text",
    field:"volume",
    validate:validate_5_1
},{
    title:"高度(米)",
    type:"text",
    field:"height",
    validate:validate_5_1
},{
    title:"直径(米)",
    type:"text",
    field:"diameter",
    validate:validate_5_1
},{
    title:"存储液体成分",
    type:"text",
    field:"component",
    validate:validate_1
},{
    title:"年进出料次数",
    type:"text",
    field:"inoutnums",
    validate:validate_5_1_2
},{
    title:"",
    type:"text",
    field:"status",
    validate:validate_5
}];
var columns_yjytzz = [{//表comp11_有机液体装载信息表
    title:"装车站台编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"装载物料名称",
    type:"text",
    field:"materialname",
    validate:validate_1
},{
    title:"装载方式",
    type:"select",
    field:"zztype",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-zztype",
            	level1:"表comp11_有机液体装载信息表"
            	
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
    title:"操作方式",
    type:"select",
    field:"zzway",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-zzway",
            	level1:"表comp11_有机液体装载信息表"
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
    title:"年装载量",
    type:"text",
    field:"zzamount",
    validate:validate_5_1
},{
    title:"装载物料密度",
    type:"text",
    field:"density",
    validate:validate_5_1
},{
    title:"油气回收技术",
    type:"select",
    field:"recover",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-voc",
            	level1:"表comp11_有机液体装载信息表"
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
    validate:validate_5
}];
var columns_lydc = [{//表comp12_露天堆场信息表
    title:"编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"堆场类型",
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
            	level1:"表comp12_露天堆场信息表"
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
    title:"堆场材料",
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
            	level1:"表comp12_露天堆场信息表"
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
    title:"占地面积",
    type:"text",
    field:"dcaera",
    validate:validate_5_1
},{
    title:"最高高度",
    type:"text",
    field:"dcheight",
    validate:validate_5_1
},{
    title:"日常存储量",
    type:"text",
    field:"dcamount",
    validate:validate_5_1
},{
    title:"年物料运载车次",
    type:"text",
    field:"dcmeantrans",
    validate:validate_5_1
},{
    title:"单车运载量",
    type:"text",
    field:"dctransamount",
    validate:validate_5_1
},{
    title:"控制措施",
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
            	level1:"表comp12_露天堆场信息表"
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
    validate:validate_5
}];
var columns_mdkz = [{//表comp07_末端控制措施信息表
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdso2",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_zbfdz_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"对应排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdnox",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_zbfdz_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdpm",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_zbfdz_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvochs",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_zbfdz_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvocxh",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_zbfdz_table tr").each(function(){//燃料信息表
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
},
{
    title:"年工作时间",
    type:"text",
    field:"etaSO2hours",
    validate:validate_8_1
},{
    title:"脱硫效率",
    type:"text",
    field:"etaSO2",
    validate:validate_6_3
},{
    title:"废气收集率",
    type:"text",
    field:"jiqiratio",
    validate:validate_6_3
},{
    title:"脱硝工艺",
    type:"select",
    field:"etaNOxname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaNOxname"
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
    title:"年工作时间",
    type:"text",
    field:"etaNOxhours",
    validate:validate_8_1
},{
    title:"脱硝效率",
    type:"text",
    field:"etaNOx",
    validate:validate_6_3
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
    title:"年工作时间",
    type:"text",
    field:"etaPMhours",
    validate:validate_8_1
},{
    title:"除尘效率",
    type:"text",
    field:"etaPM",
    validate:validate_6_3
},{
    title:"voc回收",
    type:"select",
    field:"etaVOChsname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOChsname",
            	level1:"表comp07_末端控制措施信息表"
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
    title:"voc销毁",
    type:"select",
    field:"etaVOCxhname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOCxhname",
            	level1:"表comp07_末端控制措施信息表"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
}];
var columns_mdkz2 = [{//表comp07_末端控制措施信息表
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdso2",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_guolu_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"对应排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdnox",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_guolu_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdpm",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_guolu_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvochs",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_guolu_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvocxh",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_guolu_table tr").each(function(){//燃料信息表
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
},
{
    title:"年工作时间",
    type:"text",
    field:"etaSO2hours",
    validate:validate_8_1
},{
    title:"脱硫效率",
    type:"text",
    field:"etaSO2",
    validate:validate_6_3
},{
    title:"废气收集率",
    type:"text",
    field:"jiqiratio",
    validate:validate_6_3
},{
    title:"脱硝工艺",
    type:"select",
    field:"etaNOxname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaNOxname"
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
    title:"年工作时间",
    type:"text",
    field:"etaNOxhours",
    validate:validate_8_1
},{
    title:"脱硝效率",
    type:"text",
    field:"etaNOx",
    validate:validate_6_3
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
    title:"年工作时间",
    type:"text",
    field:"etaPMhours",
    validate:validate_8_1
},{
    title:"除尘效率",
    type:"text",
    field:"etaPM",
    validate:validate_6_3
},{
    title:"voc回收",
    type:"select",
    field:"etaVOChsname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOChsname",
            	level1:"表comp07_末端控制措施信息表"
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
    title:"voc销毁",
    type:"select",
    field:"etaVOCxhname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOCxhname",
            	level1:"表comp08_溶剂使用信息表"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
}];
var columns_mdkz3 = [{//表comp07_末端控制措施信息表
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdso2",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yaolu_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"对应排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdnox",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yaolu_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdpm",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yaolu_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"废气收集率",
    type:"text",
    field:"jiqiratio",
    validate:validate_6_3
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvochs",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yaolu_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvocxh",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yaolu_table1 tr").each(function(){//燃料信息表
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
},
{
    title:"年工作时间",
    type:"text",
    field:"etaSO2hours",
    validate:validate_8_1
},{
    title:"脱硫效率",
    type:"text",
    field:"etaSO2",
    validate:validate_6_3
},{
    title:"脱硝工艺",
    type:"select",
    field:"etaNOxname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaNOxname"
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
    title:"年工作时间",
    type:"text",
    field:"etaNOxhours",
    validate:validate_8_1
},{
    title:"脱硝效率",
    type:"text",
    field:"etaNOx",
    validate:validate_6_3
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
    title:"年工作时间",
    type:"text",
    field:"etaPMhours",
    validate:validate_8_1
},{
    title:"除尘效率",
    type:"text",
    field:"etaPM",
    validate:validate_6_3
},{
    title:"voc回收",
    type:"select",
    field:"etaVOChsname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOChsname",
            	level1:"表comp07_末端控制措施信息表"
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
    title:"voc销毁",
    type:"select",
    field:"etaVOCxhname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOCxhname"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
}];
var columns_mdkz4 = [{//表comp07_末端控制措施信息表
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdso2",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"对应排放口编号",
    type:"select",
    field:"pfkids",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_pfk_table tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#pfkid").editable("getValue").pfkid != "undefined"){
    			result.push($(this).find("#pfkid").editable("getValue").pfkid);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdnox",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdpm",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvochs",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"所属生产设备编号",
    type:"select",
    field:"equipIdvocxh",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$("#add_yfl_table1 tr").each(function(){//燃料信息表
    		if(typeof $(this).find("#equipId").editable("getValue").equipId != "undefined"){
    			result.push($(this).find("#equipId").editable("getValue").equipId);
    		}
    	});
    	return result;
    }
},{
    title:"废气收集率",
    type:"text",
    field:"jiqiratio",
    validate:validate_6_3
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
},
{
    title:"年工作时间",
    type:"text",
    field:"etaSO2hours",
    validate:validate_8_1
},{
    title:"脱硫效率",
    type:"text",
    field:"etaSO2",
    validate:validate_6_3
},{
    title:"脱硝工艺",
    type:"select",
    field:"etaNOxname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaNOxname"
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
    title:"年工作时间",
    type:"text",
    field:"etaNOxhours",
    validate:validate_8_1
},{
    title:"脱硝效率",
    type:"text",
    field:"etaNOx",
    validate:validate_6_3
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
    title:"年工作时间",
    type:"text",
    field:"etaPMhours",
    validate:validate_8_1
},{
    title:"除尘效率",
    type:"text",
    field:"etaPM",
    validate:validate_6_3
},{
    title:"voc回收",
    type:"select",
    field:"etaVOChsname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOChsname",
            	level1:"表comp07_末端控制措施信息表"
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
    title:"voc销毁",
    type:"select",
    field:"etaVOCxhname",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOCxhname",
            	level1:"表comp07_末端控制措施信息表"
            },
            success: function (data, status) {
                result = data;
            },
            error: function(data){
            }
        });
        return result;
    }
}];