//获取选中行数据
function getSelectedRow() {
	var index = metTable.find('tr.success').data('index');
	return metTable.bootstrapTable('getData')[index];
}

//删除信息
function shanchu_xx(){
	var row = metTable.bootstrapTable('getSelections');
	if (row.length>0 ) {
		var str = "";
		$.each(row,function(i,item){
			str += item.pkid+",";
		});
		str = str.substring(0,str.length-1);
		swal({
			title: "您确定要删除吗？",
			text: "删除后，列表中将不会再显示此信息，请谨慎！",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删除",
			closeOnConfirm: false
		},
		function() {
			swal("删除成功！", "您已经删除了此信息。", "success");
		});
	}else{
		toastr["info"]("提示", "请选择要删除的数据");
	}
}

//搜索框
$("#fenge").click(function(e) {
	if($("#chaxuntiaojian").is(":hidden")){
		$("#fenge").html("【隐藏搜索区域】");
		$("#area1").css("height", "100px");
		$("#area2").css("height", "calc(100% - 268px)");
	}else{
		$("#fenge").html("【展开搜索区域】");
		$("#area1").css("height", "20px");
		$("#area2").css("height", "calc(100% - 78px)");
	}
	$("#chaxuntiaojian").toggle(10);
});

