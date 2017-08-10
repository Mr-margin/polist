/**
	基本信息编辑配置项
*/
var emptytext = "请填写";
var reg=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/; 

//text
function validate_1(v){
	if (!v) return '不能为空';
	if (v.length>50) return "内容太多了";
}

function validate_1_1(v){
	if (v.length>50) return "内容太多了";
}

function validate_year(v){
	if( v != window.sessionStorage.getItem("year") ) return "年份应为"+year; 
}


//data
function validate_3(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if(!v.match(reg)) return '请按照YYYY-MM-DD格式填写';
}

function validate_3_1(v){
	if (v.length>10) return "内容太多了";
	if (v) if(!v.match(reg)) return '请按照YYYY-MM-DD格式填写';
	if (v) if(new Date(v).getTime()>new Date().getTime())return '投运时间应当不大于当前时间'
}
function validate_3_1_1(v){
	if (v.length>10) return "内容太多了";
	if (v) if(!v.match(reg)) return '请按照YYYY-MM-DD格式填写';
}

//int
function validate_4(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	if (v>100000000) return '不能大于100000000';
}

function validate_4_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	if (v>100000000) return '不能大于100000000';
}


//dauble
function validate_5(v){
	if (!v) return '不能为空';
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
}

function validate_5_1(v){
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
}
//fanwei
function validate_6_1(v){
	if (!v) return '不能为空';
	if (v.length>4) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) return '不能填写小数';
	var age = parseInt(v);
	if (age < 1900||age>2050) return '必须填写1900到2050之间';
}

function validate_6_2(v){
	if (!v) return '不能为空'; 
	if (v.length>9) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-") == 0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
	if (v.slice(-1) == "." ) return '最后一位不能为小数点';
	
}

function validate_6_3(v){
	if (v.length>9) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-") == 0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length >5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
}

var jichutongyong = [{
	title:"设备编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_1
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_1_1
},{
	title:"年份",
    type:"text",
    field:"year",
    validate:validate_year
}
];

var yuefentongyong = [{
	title:"全年",
    type:"text",
    field:"total",
    validate:validate_5
},{
	title:"全年",
    type:"text",
    field:"oresulfurtmean",
    validate:validate_5
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    validate:validate_1,
    source:function () {
    	var result = [];
    	var level2 = "";
    	$.each(sheet,function(i,g){if ( g.key == $("#xinxi_title_name").html()) level2 = g.value[0];});
    	var html = $("#xinxi_title_name").html();
    	var data = "";
    	if( html == "表p2051_化工生产信息表" || html == "表p2052_化纤生产信息表" ) {
    		data =  {sheetName: "list-producttype",level1:$("#xinxi_title_name").html()}
    	} else {
    		data =  {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#"+level2 +" #equiptype").html()}
    	}
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: data,
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"产品名称",
    type:"text",
    field:"aproductname",
    validate:validate_1
},{
	title:"产品产量单位",
    type:"text",
    field:"aproductunit",
    validate:validate_1
},{
	title:"全年",
    type:"text",
    field:"sulfurmean",
    validate:validate_5
},{
	title:"全年",
    type:"text",
    field:"sulfurpromean",
    validate:validate_5
},{
    title:"溶剂类型",
    type:"select",
    field:"asolventtype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_17 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"1月",
    type:"text",
    field:"1",
    validate:validate_5_1
},{
    title:"2月",
    type:"text",
    field:"2",
    validate:validate_5_1
},{
    title:"3月",
    type:"text",
    field:"3",
    validate:validate_5_1
},{
    title:"4月",
    type:"text",
    field:"4",
    validate:validate_5_1
},{
    title:"5月",
    type:"text",
    field:"5",
    validate:validate_5_1
},{
    title:"6月",
    type:"text",
    field:"6",
    validate:validate_5_1
},{
    title:"7月",
    type:"text",
    field:"7",
    validate:validate_5_1
},{
    title:"8月",
    type:"text",
    field:"8",
    validate:validate_5_1
},{
    title:"9月",
    type:"text",
    field:"9",
    validate:validate_5_1
},{
    title:"10月",
    type:"text",
    field:"10",
    validate:validate_5_1
},{
    title:"11月",
    type:"text",
    field:"11",
    validate:validate_5_1
},{
    title:"12月",
    type:"text",
    field:"12",
    validate:validate_5_1
}];

//炼钢全年
var yuefentongyong_lg = [{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	var data ="";
    	var level2 = "";
    	$.each(sheet,function(i,g){
    		if ( g.key == $("#xinxi_title_name").html()) level2 = g.value[0];
    	});
    	if ( $("#xinxi_title_name").html() == "表p7011_生物质锅炉信息表") {
    		data = {sheetName: "list-equipfueltype",level1:$("#xinxi_title_name").html(),level2:$("#"+level2 +" #equiptype").html()};
    	} 
    	else { data = {sheetName: "list-fueltype",level1:$("#xinxi_title_name").html()};}
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: data,
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产品类型",
    type:"text",
    field:"aproducttype",
    emptytext: emptytext,
    validate:validate_1,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"全年",
    type:"text",
    field:"total",
    validate:validate_5
},{
	title:"全年",
    type:"text",
    field:"mean",
    validate:validate_5
},{
    title:"1月",
    type:"text",
    field:"1",
    validate:validate_5_1
},{
    title:"2月",
    type:"text",
    field:"2",
    validate:validate_5_1
},{
    title:"3月",
    type:"text",
    field:"3",
    validate:validate_5_1
},{
    title:"4月",
    type:"text",
    field:"4",
    validate:validate_5_1
},{
    title:"5月",
    type:"text",
    field:"5",
    validate:validate_5_1
},{
    title:"6月",
    type:"text",
    field:"6",
    validate:validate_5_1
},{
    title:"7月",
    type:"text",
    field:"7",
    validate:validate_5_1
},{
    title:"8月",
    type:"text",
    field:"8",
    validate:validate_5_1
},{
    title:"9月",
    type:"text",
    field:"9",
    validate:validate_5_1
},{
    title:"10月",
    type:"text",
    field:"10",
    validate:validate_5_1
},{
    title:"11月",
    type:"text",
    field:"11",
    validate:validate_5_1
},{
    title:"12月",
    type:"text",
    field:"12",
    validate:validate_5_1
}];

var shebei_editable_1 = [{
	title:"锅炉铭牌型号",
    type:"text",
    field:"equipnumber",
    validate:validate_1_1
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	var level2 = "";
    	$.each(sheet,function(i,g){
    		if ( g.key == $("#xinxi_title_name").html()) level2 = g.value[0];
    	});
    	var datas;
    	if ( hangye_year[$("#xinxi_title_name").html()] != "" && hangye_year[$("#xinxi_title_name").html()]!= null && hangye_year[$("#xinxi_title_name").html()] != undefined ){
    		datas = {sheetName:hangye_year[$("#xinxi_title_name").html()].list_type,level1:$("#xinxi_title_name").html()};
    		
    	} else {
    		datas = {sheetName:"",level1:$("#xinxi_title_name").html()};
    	}
    	if ($("#xinxi_title_name").html() == "表p1011_机组信息表" || $("#xinxi_title_name").html() == "表p02_锅炉信息表" || $("#xinxi_title_name").html() == "表p7011_生物质锅炉信息表") {
    		datas = {sheetName: hangye_year[$("#xinxi_title_name").html()].list_type,level1:$("#xinxi_title_name").html(),level2:$("#"+level2 +" #equiptype").html()};
    	}
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: datas,
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipfueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"是否热电联产",
    type:"select",
    field:"cogenerationornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
},{
    title:"燃烧器布置方式",
    type:"text",
    field:"arrangement",
    validate:validate_1_1
},{
    title:"装机容量",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"燃料硫分",
    type:"text",
    field:"sulfur",
    validate:validate_6_2
},{
    title:"燃料灰分",
    type:"text",
    field:"ash",
    validate:validate_6_2
},{
    title:"燃料挥发分",
    type:"text",
    field:"volatile",
    validate:validate_6_2
},{
    title:"煤炭来源地",
    type:"text",
    field:"coalsource",
    validate:validate_1_1
},{
    title:"燃料热值",
    type:"text",
    field:"fuelcalvalue",
    validate:validate_5_1
},{
    title:"煤炭运输方式",
    type:"select",
    field:"coaltrans",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-trans",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];
//表p02_锅炉信息表
var shebei_editable_2 = [{
	title:"锅炉铭牌型号",
    type:"text",
    field:"equipnumber",
    validate:validate_1_1
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipfueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipfueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"锅炉用途",
    type:"select",
    field:"arrangement",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-yongtu",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"锅炉容量",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"燃料硫分",
    type:"text",
    field:"sulfur",
    validate:validate_6_2
},{
    title:"燃料灰分",
    type:"text",
    field:"ash",
    validate:validate_6_2
},{
    title:"燃料挥发分",
    type:"text",
    field:"volatile",
    validate:validate_6_2
}];

var shebei_editable_3 = [{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-fueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_3 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"燃料使用量",
    type:"text",
    field:"fuelamount",
    validate:validate_5
},{
	title:"集气率",
    type:"text",
    field:"jiqiratio",
    validate:validate_6_3
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
	title:"规模",
    type:"text",
    field:"gmcapacity",
    validate:validate_5_1
},{
    title:"燃料硫分",
    type:"text",
    field:"sulfur",
    validate:validate_6_2
},{
    title:"燃料灰分",
    type:"text",
    field:"ash",
    validate:validate_6_2
},{
    title:"燃料挥发分",
    type:"text",
    field:"volatile",
    validate:validate_6_2
},{
	title:"烧结矿使用量",
    type:"text",
    field:"oreamount",
    validate:validate_5
},{
	title:"烧结矿硫份",
    type:"text",
    field:"oresulfur",
    validate:validate_5
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];
var shebei_editable_3_1 = [{
	title:"设备编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_3_1 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-fueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_1
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_1_1
},{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
	title:"规模",
    type:"text",
    field:"gmcapacity",
    validate:validate_5
}];

var shebei_editable_3_2 = [{
    title:"产品类型",
    type:"text",
    field:"aproducttype",
    emptytext: emptytext,
    validate:validate_1,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"是否存在化学加工环节",
    type:"select",
    field:"isornot",
    emptytext: emptytext,
    source:function () {
    	var result = ["是","否"];
        return result;
    }
}];

var shebei_editable_3_3 = [{
	title:"设备编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-producttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-fueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_1
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_1_1
},{
    title:"设备类型",
    type:"text",
    field:"equiptype",
    emptytext: emptytext,
    validate:validate_1
   
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
	title:"规模",
    type:"text",
    field:"gmcapacity",
    validate:validate_5
}];

var shebei_editable_3_4 = [{
	title:"设备编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-producttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-fueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"投运时间",
    type:"text",
    field:"startdate",
    validate:validate_3_1
},{
    title:"关停时间",
    type:"text",
    field:"enddate",
    validate:validate_3_1_1
},{
    title:"设备类型",
    type:"text",
    field:"equiptype",
    emptytext: emptytext,
    validate:validate_1
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
	title:"规模",
    type:"text",
    field:"gmcapacity",
    validate:validate_1
}];

var shebei_editable_3_5 = [{
	title:"储罐编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
    title:"储罐类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equiptype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"体积",
    type:"text",
    field:"volume",
    validate:validate_5_1
},{
    title:"高度",
    type:"text",
    field:"height",
    validate:validate_5_1
},{
    title:"直径",
    type:"text",
    field:"diameter",
    emptytext: emptytext,
    validate:validate_5_1
},{
	title:"年进出料次数",
    type:"text",
    field:"inoutnums",
    validate:validate_5_1
},{
	title:"存储液体成分",
    type:"text",
    field:"component",
    validate:validate_1
}];

var shebei_editable_3_6 = [{
	title:"装车站台编号",
    type:"text",
    field:"equipId",
    emptytext: emptytext,
    validate:validate_1
},{
	title:"序号",
    type:"text",
    field:"xh",
    validate:validate_1
},{
	title:"作业部/车间",
    type:"text",
    field:"equipname",
    validate:validate_1
},{
	title:"其他油气回收控制技术",
    type:"text",
    field:"otherrecover",
    validate:validate_1_1
},{
    title:"装载方式",
    type:"select",
    field:"zztype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-zztype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"装载物料名称",
    type:"text",
    field:"materialname",
    emptytext: emptytext,
    validate:validate_1
},{
    title:"操作方式",
    type:"select",
    field:"zzway",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-zzway",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"年装载量(吨)",
    type:"text",
    field:"zzamount",
    emptytext: emptytext,
    validate:validate_5
},{
	title:"装载物料密度(kg/m3)",
    type:"text",
    field:"density",
    validate:validate_5
},{
	title:"油气回收控制技术",
    type:"select",
    field:"recover",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-voc",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_4 = [{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_4 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"煤气产生量",
    type:"text",
    field:"irongasamount",
    validate:validate_5_1
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
	title:"高炉容积",
    type:"text",
    field:"gmcapacity",
    validate:validate_5
},{
	title:"热风炉煤气用量",
    type:"text",
    field:"rflgasamount",
    validate:validate_5_1
},{
	title:"烟气量",
    type:"text",
    field:"gasamount",
    validate:validate_5_1
},{
	title:"煤气回收率",
    type:"text",
    field:"irongasratio",
    validate:validate_6_3
},{
    title:"煤气H2S含量",
    type:"text",
    field:"ironh2sratio",
    validate:validate_5_1
},{
    title:"高炉喷煤量",
    type:"text",
    field:"ironpenmei",
    validate:validate_5_1
}];

var shebei_editable_5 = [{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_5 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_6 = [{
    title:"炼焦方法",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_6 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"熄焦工艺",
    type:"select",
    field:"xjmethod",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dealtype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"炭化室高度",
    type:"text",
    field:"height",
    validate:validate_5_1
},{
    title:"煤气产生量",
    type:"text",
    field:"cokegasamount",
    validate:validate_5_1
},{
    title:"炼焦方法",
    type:"select",
    field:"ljmethod",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-lj",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_7 = [{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"产能",
    type:"text",
    field:"capacity",
    validate:validate_5
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_7 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_8 = [{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_8 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_9 = [{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"芒硝成分",
    type:"text",
    field:"mxtype",
    validate:validate_1
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_9 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_10 = [{
    title:"生产工艺",
    field:"equiptype",
    emptytext: emptytext,
    validate:validate_1_1
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-producttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"名称",
    type:"text",
    field:"amaterialname",
    validate:validate_1
},{
	title:"使用量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5
},{
	title:"产品名称",
    type:"text",
    field:"aproductname",
    validate:validate_1
},{
	title:"产品产量单位",
    type:"text",
    field:"aproductunit",
    validate:validate_1
}];

var shebei_editable_11 = [{
    title:"生产工艺",
    type:"text",
    field:"equiptype",
    emptytext: emptytext,
    validate:validate_1_1
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-producttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"名称",
    type:"text",
    field:"amaterialname",
    validate:validate_1
},{
	title:"使用量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5
},{
	title:"产品名称",
    type:"text",
    field:"aproductname",
    validate:validate_1
},{
	title:"产品产量单位",
    type:"text",
    field:"aproductunit",
    validate:validate_1
}];

var shebei_editable_11_1 = [{
	title:"生产装置总数(套)",
    type:"text",
    field:"sbtotal",
    validate:validate_4
},{
	title:"涉及VOC装置(套)",
    type:"text",
    field:"vocsbtotal",
    validate:validate_4
},{
	title:"开展LDAR装置(套)",
    type:"text",
    field:"ldarsbtotal",
    validate:validate_4
},{
	title:"开展LDAR(轮)",
    type:"text",
    field:"ldarnums",
    validate:validate_4
},{
	title:"未开展LDAR装置(套)",
    type:"text",
    field:"umldarnums",
    validate:validate_4
},{
	title:"豁免装置(套)",
    type:"text",
    field:"freesb",
    validate:validate_4
},{
	title:"动静密封点总数(个)",
    type:"text",
    field:"mftotalnums",
    validate:validate_4
},{
	title:"不可达点(个)",
    type:"text",
    field:"unmums",
    validate:validate_4
},{
	title:"估算方法",
    type:"text",
    field:"calmethod",
    validate:validate_1_1
},{
	title:"泄漏排放量(吨)",
    type:"text",
    field:"xlemis",
    validate:validate_5_1
},{
	title:"检测轮编号",
    type:"text",
    field:"ldarid",
    validate:validate_1_1
},{
	title:"密封点(个)",
    type:"text",
    field:"mfnums",
    validate:validate_4_1
},{
	title:"泄漏密封点(个)",
    type:"text",
    field:"xlnums",
    validate:validate_4_1
},{
	title:"修复(个)",
    type:"text",
    field:"repairnums",
    validate:validate_4_1
},{
	title:"是否达标",
    type:"select",
    field:"dbornot",
    source:function () { return ["是","否"];}
},{
	title:"是否达到国内水平",
    type:"select",
    field:"nationmeanornot",
    source:function () { return ["是","否"];}
},{
	title:"是否达到国内先进水平",
    type:"select",
    field:"nationbestornot",
    source:function () { return ["是","否"];}
},{
	title:"削减潜力(吨/年)",
    type:"text",
    field:"reduceemis",
    validate:validate_5_1
}];
var shebei_editable_11_2 = [{
	title:"气体",
    type:"text",
    field:"afgasnums",
    validate:validate_4
},{
	title:"轻液体",
    type:"text",
    field:"aflightliquidnums",
    validate:validate_4
},{
	title:"重液体",
    type:"text",
    field:"afheavyiquidnums",
    validate:validate_4
},{
	title:"轻液体",
    type:"text",
    field:"ablightliquidnums",
    validate:validate_4
},{
	title:"重液体",
    type:"text",
    field:"abheavyiquidnums",
    validate:validate_4
},{
	title:"压缩机(件)",
    type:"text",
    field:"aysjnums",
    validate:validate_4
},{
	title:"气体",
    type:"text",
    field:"asafefgasnums",
    validate:validate_4
},{
	title:"轻液体",
    type:"text",
    field:"asafeflightliquidnums",
    validate:validate_4
},{
	title:"重液体",
    type:"text",
    field:"asafefheavyiquidnums",
    validate:validate_4
},{
	title:"气体",
    type:"text",
    field:"aflgasnums",
    validate:validate_4
},{
	title:"轻液体",
    type:"text",
    field:"afllightliquidnums",
    validate:validate_4
},{
	title:"重液体",
    type:"text",
    field:"aflheavyiquidnums",
    validate:validate_4
},{
	title:"开口管线(件)",
    type:"text",
    field:"akkgxnums",
    validate:validate_4
},{
	title:"采样连接(件)",
    type:"text",
    field:"acyljnums",
    validate:validate_4
}];


var shebei_editable_12 = [{
    title:"生产工艺",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"产品类型",
    type:"select",
    field:"aproducttype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
      	var level2 = "";
    	$.each(sheet,function(i,g){
    		if ( g.key == $("#xinxi_title_name").html()) level2 = g.value[0];
    	});
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#"+level2 +" #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"名称",
    type:"text",
    field:"amaterialname",
    validate:validate_1
},{
	title:"使用量",
    type:"text",
    field:"amaterialtotal",
    validate:validate_5
}];

var shebei_editable_13 = [{
    title:"处理方式",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dealtype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_14 = [{
    title:"处理方式",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dealtype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_15 = [{
	title:"锅炉类型",
    type:"text",
    field:"boilertype",
    validate:validate_1_1
},{
    title:"烟气脱硝设施类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dealtype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-fueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"排污设施位置高度",
    type:"text",
    field:"height",
    validate:validate_5_1
}];

var shebei_editable_16 = [{
	title:"锅炉铭牌型号",
    type:"text",
    field:"equipnumber"
},{
    title:"燃料类型",
    type:"select",
    field:"fueltype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipfueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"设备类型",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipfueltype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_17 = [{
    title:"喷涂工序",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"溶剂类型",
    type:"select",
    field:"asolventtype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_17 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_18 = [{
	title:"喷涂工序",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"溶剂类型",
    type:"select",
    field:"asolventtype",
    emptytext: emptytext,
//    validate:validate_1,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html(),level2:$("#shebei_18 #equiptype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"年用量",
    type:"text",
    field:"asolventpaint",
    validate:validate_5
},{
	title:"单位",
    type:"text",
    field:"asolventpaintunit",
    validate:validate_1
},{
	title:"年用量",
    type:"text",
    field:"asolventdilute",
    validate:validate_5
},{
	title:"单位",
    type:"text",
    field:"asolventdiluteunit",
    validate:validate_1
},{
	title:"年用量",
    type:"text",
    field:"asolventglue",
    validate:validate_5
},{
	title:"单位",
    type:"text",
    field:"asolventglueunit",
    validate:validate_1
},{
	title:"废气处理方式",
    type:"text",
    field:"solventdeal",
    validate:validate_1
},{
	title:"处理效率(％)",
    type:"text",
    field:"solventdealratio",
    validate:validate_6_3
},{
	title:"溶剂性质",
    type:"select",
    field:"solventstate",
    validate:validate_1,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-solventstate",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_19 = [{
	title:"喷涂工序",
    type:"select",
    field:"equiptype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
    title:"溶剂类型",
    type:"select",
    field:"asolventtype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"干洗设备型号",
    type:"text",
    field:"equipxinghao",
    validate:validate_1_1
},{
	title:"干洗设备品牌",
    type:"text",
    field:"equipbrand",
    validate:validate_1_1
},{
	title:"四氯乙烯",
    type:"text",
    field:"asolventC2Cl4",
    validate:validate_5
},{
	title:"四氯化碳",
    type:"text",
    field:"asolventCCl4",
    validate:validate_5
},{
	title:"石油溶剂",
    type:"text",
    field:"asolventPetroleum",
    validate:validate_5
},{
	title:"其他",
    type:"text",
    field:"asolventOthers",
    validate:validate_5
},{
	title:"处理方式",
    type:"text",
    field:"solventdeal",
    validate:validate_1
},{
	title:"年产生量",
    type:"text",
    field:"solventdealamount",
    validate:validate_5_1
},{
	title:"单位",
    type:"text",
    field:"solventdealunit",
    validate:validate_1_1
}];
//p5012
var shebei_editable_20 = [{
	title:"奶牛",
    type:"text",
    field:"amilkingcow",
    validate:validate_5
},{
	title:"母猪",
    type:"text",
    field:"apig",
    validate:validate_5
},{
	title:"马",
    type:"text",
    field:"ahorse",
    validate:validate_5
},{
	title:"驴",
    type:"text",
    field:"adonkey",
    validate:validate_5
},{
	title:"骡",
    type:"text",
    field:"amule",
    validate:validate_5
},{
	title:"骆驼",
    type:"text",
    field:"acamel",
    validate:validate_5
},{
	title:"蛋鸡",
    type:"text",
    field:"alayinghen",
    validate:validate_5
},{
	title:"蛋鸭",
    type:"text",
    field:"alayingduck",
    validate:validate_5
},{
	title:"蛋鹅",
    type:"text",
    field:"alayinggoose",
    validate:validate_5
},{
	title:"肉鸡",
    type:"text",
    field:"ameatchiken",
    validate:validate_5
},{
	title:"肉鸭",
    type:"text",
    field:"ameatduck",
    validate:validate_5
},{
	title:"肉鹅",
    type:"text",
    field:"ameatgoose",
    validate:validate_5
},{
	title:"肉牛",
    type:"text",
    field:"ameatcow",
    validate:validate_5
},{
	title:"肉猪",
    type:"text",
    field:"ameatpig",
    validate:validate_5
},{
	title:"山羊",
    type:"text",
    field:"agoat",
    validate:validate_5
},{
	title:"绵羊",
    type:"text",
    field:"asheep",
    validate:validate_5
}];

var shebei_editable_21 = [{
	title:"施工区域面积",
    type:"text",
    field:"aconsaera",
    validate:validate_5
},{
	title:"施工活跃月份数",
    type:"text",
    field:"aconsmonths",
    validate:validate_5
},{
	title:"起尘面积率",
    type:"text",
    field:"dustratio",
    validate:validate_6_2
},{
	title:"地面2.5m处风速",
    type:"text",
    field:"windspeed25",
    validate:validate_5
},{
	title:"表面积尘含水率",
    type:"text",
    field:"dustwaterratio",
    validate:validate_6_2
},{
	title:"工地路面尘积负荷",
    type:"text",
    field:"dustload",
    validate:validate_5
},{
	title:"机动车数量",
    type:"text",
    field:"vehnum",
    validate:validate_4
},{
	title:"污染控制效率",
    type:"text",
    field:"conratio",
    validate:validate_6_3
},{
	title:"污染控制技术",
    type:"select",
    field:"contype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-etadust",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"施工类型",
    type:"select",
    field:"constagetype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"施工阶段",
    type:"select",
    field:"constage",
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-equipproducttype",level1:"表p6012_施工扬尘信息表",level2:$("#shebei_21 #constagetype").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
}];

var shebei_editable_22 = [{
	title:"堆场类型",
    type:"select",
    field:"dctype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dctype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"地区类型",
    type:"select",
    field:"countytype",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-countytype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"堆场材料",
    type:"select",
    field:"dcmat",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dcmat",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"堆场编号",
    type:"text",
    field:"equipId",
    validate:validate_1
},{
	title:"其他堆场类型",
    type:"text",
    field:"otherdctype",
    validate:validate_1_1
},{
	title:"其他堆场材料",
    type:"text",
    field:"otherdcmat",
    validate:validate_1_1
},{
	title:"占地面积(平方米)",
    type:"text",
    field:"dcaera",
    validate:validate_5
},{
	title:"最高高度(米)",
    type:"text",
    field:"dcheight",
    validate:validate_5
},{
	title:"控制措施",
    type:"select",
    field:"dustcontrol",
    emptytext: emptytext,
    source:function () {
    	var result = [];
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,type: "POST",
            data: {sheetName: "list-dealtype",level1:$("#xinxi_title_name").html()},
            success: function (data, status) {result = data;}
        });
        return result;
    }
},{
	title:"日常储存量(吨)",
    type:"text",
    field:"dcamount",
    validate:validate_5
},{
	title:"年物料运载车次(车)",
    type:"text",
    field:"dcmeantrans",
    validate:validate_5
},{
	title:"单车运载量(吨/车)",
    type:"text",
    field:"dctransamount",
    validate:validate_5
},{
	title:"其他控制措施",
    type:"text",
    field:"otherdustcontrol",
    validate:validate_1_1
}];

$(function(){
	var zong_sheet_number = ["shebei_1","shebei_2","shebei_3","shebei_4","shebei_5","shebei_6","shebei_7","shebei_8","shebei_9","shebei_10","shebei_11","shebei_12","shebei_13","shebei_14","shebei_15","shebei_16","shebei_17","shebei_18","shebei_19"];
	
	//基础通用
	$.each(jichutongyong, function(i, column) {
		column.emptytext = emptytext;
		for(var k = 0;k<zong_sheet_number.length;k++){
			$("#"+zong_sheet_number[k]+" #"+column.field).editable(column);
		}
	});

	//表p1011_机组信息表
	$.each(shebei_editable_1, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_1 #"+column.field).editable(column);
	});
	var shebei_editable_yue_1 = ["apowerfuel","power","aheatfuel","heat"];
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		for(var k = 0;k<shebei_editable_yue_1.length;k++){
			$("#shebei_1 #"+shebei_editable_yue_1[k]+column.field).editable(column);
		}
	});
	
	//表p02_锅炉信息表
	$.each(shebei_editable_2, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_2 #"+column.field).editable(column);
	});
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_2 #afuel"+column.field).editable(column);
		$("#shebei_16 #afuel"+column.field).editable(column);
	});
	
	//表p2011_烧结工序信息表
	$.each(shebei_editable_3, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3 #"+column.field).editable(column);
	});
	//表p2014_球团工序信息表
	$.each(shebei_editable_3_1, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3_1 #"+column.field).editable(column);
	});
	//表p051_炼焦工序化学加工环节信息表
	$.each(shebei_editable_3_2, function(i, column) {
		column.emptytext = emptytext;
		$("#lianjiaohuaxuejiagong_1 #"+column.field).editable(column);
	});
	//表p2015_轧钢信息表
	$.each(shebei_editable_3_3, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3_3 #"+column.field).editable(column);
	});
	//表p2016_石灰石信息表
	$.each(shebei_editable_3_4, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3_4 #"+column.field).editable(column);
	});
	//表p07_有机液体储罐信息表
	$.each(shebei_editable_3_5, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3_5 #"+column.field).editable(column);
	});
	//表p08_有机液体装载信息表
	$.each(shebei_editable_3_6, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3_6 #"+column.field).editable(column);
	});
	
	//表p2053_泄漏实施LDAR信息表
	$.each(shebei_editable_11_1, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_11_1 #"+column.field).editable(column);
	});
	
	//表p2053_泄漏实施LDAR信息表
	$.each(shebei_editable_11_2, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_11_2 #"+column.field).editable(column);
	});
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_3 #aproduct"+column.field).editable(column);
		$("#shebei_3 #aroe"+column.field).editable(column);
		$("#shebei_3 #oresulfur"+column.field).editable(column);
		$("#shebei_3 #aproductmjy"+column.field).editable(column);
		
		$("#shebei_3_1 #aproduct"+column.field).editable(column);
		$("#shebei_3_1 #aroe"+column.field).editable(column);
		$("#shebei_3_1 #oresulfur"+column.field).editable(column);
		$("#shebei_3_1 #aproductmjy"+column.field).editable(column);
	
		if (column.field == "oresulfurtmean" ){
			$("#shebei_3 #oresulfurtmean").editable(column);
			$("#shebei_3_1 #oresulfurtmean").editable(column);
		}
		$("#shebei_3_2 #aproduct"+column.field).editable(column);
		$("#shebei_3_3 #aproduct"+column.field).editable(column);
		$("#shebei_3_4 #aproduct"+column.field).editable(column);
		
		
		$("#shebei_4 #aproduct"+column.field).editable(column);
		$("#shebei_5 #aproduct"+column.field).editable(column);
		$("#shebei_6 #aproduct"+column.field).editable(column);
		
		$("#shebei_6 #sulfurpro"+column.field).editable(column);
		
		
		$("#shebei_6 #asulphate"+column.field).editable(column);
		
		$("#shebei_6 #asulphur"+column.field).editable(column);
		$("#shebei_6 #agas"+column.field).editable(column);
		$("#shebei_6 #agash2sratio"+column.field).editable(column);
		$("#shebei_6 #agasself"+column.field).editable(column);
		$("#shebei_6 #aproductmjy"+column.field).editable(column);
		if (column.field == "sulfurpromean") $("#shebei_6 #sulfurpromean").editable(column);
		
		
		$("#shebei_7 #aproduct"+column.field).editable(column);
		$("#shebei_9 #amx"+column.field).editable(column);
		$("#shebei_8 #aproduct"+column.field).editable(column);
		$("#shebei_9 #aproduct"+column.field).editable(column);
		$("#shebei_10 #aproduct"+column.field).editable(column);
		$("#shebei_11 #aproduct"+column.field).editable(column);
		$("#shebei_12 #aproduct"+column.field).editable(column);
		$("#shebei_13 #aproduct"+column.field).editable(column);
		$("#shebei_14 #aproduct"+column.field).editable(column);
		$("#shebei_15 #aproduct"+column.field).editable(column);
		$("#shebei_21 #vehnum"+column.field).editable(column);
		
		$("#lianjiaohuaxuejiagong_1 #aproduct"+column.field).editable(column);
	});
	
	//表p2012_炼铁工序信息表 
	$.each(shebei_editable_4, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_4 #"+column.field).editable(column);
	});
	
	//表p2013_炼钢工序信息表
	$.each(shebei_editable_5, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_5 #"+column.field).editable(column);
	});
	
	//表p05_炼焦工序信息表
	$.each(shebei_editable_6, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_6 #"+column.field).editable(column);
	});
	
	//表p2021_熟料生产信息表
	$.each(shebei_editable_7, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_7 #"+column.field).editable(column);
	});
	
	//表p2022_水泥生产信息表
	$.each(shebei_editable_8, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_8 #"+column.field).editable(column);
	});
	
	//表p2031_玻璃生产信息表
	$.each(shebei_editable_9, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_9 #"+column.field).editable(column);
	});
	
	//表p2061_化纤生产信息表
	$.each(shebei_editable_10, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_10 #"+column.field).editable(column);
	});
	
	//表p2051_化工生产信息表
	$.each(shebei_editable_11, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_11 #"+column.field).editable(column);
	});
	
	//表p2081_其他工业生产信息表
	$.each(shebei_editable_12, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_12 #"+column.field).editable(column);
	});
	
	//表p9011_废水处理信息表
	$.each(shebei_editable_13, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_13 #"+column.field).editable(column);
	});
	
	//表p9021_固废处理信息表
	$.each(shebei_editable_14, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_14 #"+column.field).editable(column);
	});
	
	//表p9031_烟气脱硝信息表
	$.each(shebei_editable_15, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_15 #"+column.field).editable(column);
	});
	
	//表p7011_生物质锅炉信息表
	$.each(shebei_editable_16, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_16 #"+column.field).editable(column);
	});
	
	//表p4011_印刷印染信息表
	$.each(shebei_editable_17, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_17 #"+column.field).editable(column);
	});
	$.each(yuefentongyong, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_17 #asolvent"+column.field).editable(column);
		$("#shebei_18 #asolvent"+column.field).editable(column);
		$("#shebei_19 #asolvent"+column.field).editable(column);
	});
	
	//表p4021_表面喷涂信息表
	$.each(shebei_editable_18, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_18 #"+column.field).editable(column);
	});
	
	//表p4032_干洗信息表
	$.each(shebei_editable_19, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_19 #"+column.field).editable(column);
	});
	
	//表p5012_畜禽养殖量信息表
	$.each(shebei_editable_20, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_20 #"+column.field).editable(column);
	});
	
	//表p6012_施工扬尘信息表
	$.each(shebei_editable_21, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_21 #"+column.field).editable(column);
	});
	
	//表p06_堆场信息表
	$.each(shebei_editable_22, function(i, column) {
		column.emptytext = emptytext;
		$("#shebei_22 #"+column.field).editable(column);
	});
	
});

