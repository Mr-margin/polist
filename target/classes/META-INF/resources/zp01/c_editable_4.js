/**
	在线监测信息
*/
var zaixianjiance_tongyong_editable = [{
    title:"是否安装",
    type:"select",
    field:"installornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
},{
    title:"安装位置",
    type:"text",
    field:"installplace",
    validate:validate_1_1
},{
    title:"是否联网",
    type:"select",
    field:"webornot",
    source:[{value:"是",text:"是"},{value:"否",text:"否"}]
}];

var zaixianjiance_editable = [{
    title:"全年平均",
    type:"text",
    field:"anual",
    validate:validate_5_1
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

$(function(){
	
	var zaixian_Initialization = ["SO2con","NOxcon","PMcon"];
	
	$.each(zaixianjiance_tongyong_editable, function(i, column) {
		column.emptytext = emptytext;
		$("#zaixianjiance_1 #"+column.field).editable(column);
	});
	
	$.each(zaixianjiance_editable, function(i, column) {
		for(var k = 0;k<zaixian_Initialization.length;k++){
			column.emptytext = emptytext;
			$("#zaixianjiance_1 #"+zaixian_Initialization[k]+column.field).editable(column);
		}
	});
	
});

