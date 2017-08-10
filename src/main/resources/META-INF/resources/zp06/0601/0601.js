$(function(){
	
	
	//初始化编辑控件
	$.each(columns, function(i, column) {
		column.emptytext = emptytext;
		$("#"+column.field).editable(column);
	});
//	$.each(columns_jiayouzhan, function(i, column) {
//		column.emptytext = emptytext;
//		$("#jiayouzhan #"+column.field).editable(column);
//	});
//	$.each(columns_canyin, function(i, column) {
//		column.emptytext = emptytext;
//		$("#canyin #"+column.field).editable(column);
//	});
	$('.editable').editable('enable');
	
	$("#create").click(function(){
		$("#show_rough").modal();
	})
	
})

