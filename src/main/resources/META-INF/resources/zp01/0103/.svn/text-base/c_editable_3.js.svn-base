/**
	末端控制设备信息编辑配置项
*/
var moduan_peizhi_1 = [{
    title:"脱硫工艺",
    type:"select",
    field:"etaSO2name",
    source:function () {
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
    title:"投运时间",
	type:"text",
	field:"etaSO2startdate",
	validate:validate_3_1
},{
    title:"拆除时间",
    type:"text",
	field:"etaSO2enddate",
	validate:validate_3_1_1
},{
    title:"脱硫岛效率",
    type:"text",
    field:"etaSO2eta",
    validate:validate_6_3
},{
    title:"投运率",
    type:"text",
    field:"etaSO2ratio",
    validate:validate_6_3
},{
    title:"脱硫剂名称",
    type:"text",
    field:"etaSO2agentname",
    validate:validate_1_1
},{
    title:"脱硫剂使用量",
    type:"text",
    field:"etaSO2agentamount",
    validate:validate_5_1
},{
    title:"脱硫烟气旁路",
    type:"text",
    field:"etaSO2bypass",
    validate:validate_1_1
}];

var moduan_peizhi_2 = [{
    title:"脱硝工艺",
    type:"select",
    field:"etaNOxname",
    noeditFormatter:"etaNOxname",
    source:function () {
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
    title:"投运时间",
    type:"text",
	field:"etaNOxstartdate",
	validate:validate_3_1
},{
    title:"拆除时间",
    type:"text",
	field:"etaNOxenddate",
	validate:validate_3_1_1
},{
    title:"脱硝岛效率",
    type:"text",
    field:"etaNOxeta",
    validate:validate_6_3
},{
    title:"投运率",
    type:"text",
    field:"etaNOxratio",
    validate:validate_6_3
},{
    title:"脱硝剂名称",
    type:"text",
    field:"etaNOxagentname"
},{
    title:"脱硝剂使用量",
    type:"text",
    field:"etaNOxagentamount",
    validate:validate_5_1
}];

var moduan_peizhi_3 = [{
    title:"低氮燃烧技术",
    type:"select",
    field:"etaNOxxname",
    source:function () {
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaNOxxname"
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
    title:"是否采用低氮燃烧技术",
    type:"select",
    field:"etaNOxxornot",
    source:function () {
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
    title:"投运时间",
    type:"text",
	field:"etaNOxxstartdate",
	validate:validate_3_1
},{
    title:"燃烧器出口浓度",
    type:"text",
	field:"etaNOxxconcentrate",
	validate:validate_5_1
},{
    title:"低氮燃烧脱硝效率",
    type:"text",
    field:"etaNOxxeta",
    validate:validate_6_3
},{
    title:"投运率",
    type:"text",
    field:"etaNOxxratio",
    validate:validate_6_3
}];

var moduan_peizhi_4 = [{
    title:"除尘工艺",
    type:"select",
    field:"etaPMname",
    source:function () {
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
    title:"投运时间",
    type:"text",
	field:"etaPMstartdate",
	validate:validate_3_1
},{
    title:"除尘风机总风量",
    type:"text",
	field:"etawindamount",
	validate:validate_5_1
},{
    title:"除尘效率",
    type:"text",
    field:"etaPMeta",
    validate:validate_6_3
},{
    title:"废气收集率",
    type:"text",
    field:"etaPMjqratio",
    validate:validate_6_3
},{
    title:"投运率",
    type:"text",
    field:"etaPMratio",
    validate:validate_6_3
}];
var moduan_peizhi_5 = [{
    title:"voc回收技术",
    type:"select",
    field:"etaVOChsname",
    source:function () {
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOChsname",level1:"表p01_末端控制设备信息表"
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
    title:"其他回收技术",
    type:"text",
	field:"equipIdvochs",
	validate:validate_1_1
},{
    title:"voc销毁技术",
    type:"select",
	field:"etaVOCxhname",
    source:function () {
    	$.ajax({
            url: BackstageIP+'dictionary/findDictionary',
            async: false,
            type: "POST",
            data: {
            	sheetName: "list-etaVOCxhname",level1:"表p01_末端控制设备信息表"
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
    title:"其他回收技术",
    type:"text",
    field:"equipIdvocxh",
    validate:validate_1_1
},{
    title:"处理效率(％)",
    type:"text",
    field:"etaVOCeta",
    validate:validate_6_3
},{
    title:"年运行时间(小时)",
    type:"text",
    field:"etaVOChours",
    validate:validate_5_1
},{
    title:"设备风量(立方米/小时)",
    type:"text",
    field:"etaVOCwind",
    validate:validate_5_1
},{
    title:"有机废气排放浓度",
    type:"text",
    field:"etaVOCcons",
    validate:validate_5_1
}];
