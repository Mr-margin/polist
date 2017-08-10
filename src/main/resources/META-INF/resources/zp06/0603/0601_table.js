var emptytext = "请填写";
function validate_1(v){
	if (!v) return '不能为空';
	if (v.length>50) return "内容太多了";
}
var columns = [
{
    title:"拼接清单版本名称",
    type:"text",
    field:"modename",
    validate:validate_1
},
{
    title:"清单年份",
    type:"select",
    field:"orderyear",
    validate:validate_1
}
];