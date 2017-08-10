jQuery.support.cors = true;
$(function(){
	metTable_initialization()
//	get_table();
	
})
$(document).ready(function() {
	$(".input-group.date").datepicker({
    	weekStart: 1, 
    	autoclose: true, 
    	startView: 2, 
    	maxViewMode: 2,
    	minViewMode:2,
    	forceParse: false,
    	format: 'yyyy', 
	});
})
//显示表格
function get_table(){
	var data = paixu();
	var html_tbody="";
	for(var i=0;i<data.length;i++){

		html_tbody+="<tr>" +
		"<td>"+data[i].id+"</td>" +
		"<td>"+data[i].name+"</td>" +
		"<td>"+data[i].price+"</td>" +
		"<td>"+data[i].diqu+"</td>" +
		"<td>"+data[i].diqu+"</td>" +
		"</tr>";
	}

	$("#0403_tbody").html(html_tbody);
}
//对数据进行排序
function paixu(){
	for(i=0;i<data_info.length-1;i++){   
		for( j=i+1;j<data_info.length;j++){   
			if (data_info[i].id>data_info[j].id){   
				var temp=data_info[i];   
				data_info[i]=data_info[j];   
				data_info[j]=temp;   
			}   
		}  
	}
	return data_info;
}
//确定顺序
function shunxu(){
	addlabel();
}
//确定拼接
function qdpj(){
	 $("#addModal").modal();
}
function queding(){
	$("#close_add_button").click();
	swal("拼接成功！", "记录已保存", "success");
}
//数据信息
var data_info = [
                 {
                	 "id": 1,
                	 "name": "1_2014年石家庄清单v1",
                	 "price": "2014",
                	 "diqu": "河北省"
                 },
                 {
                	 "id": 2,
                	 "name": "1_2014年石家庄清单v2",
                	 "price": "2014",
                	 "diqu": "河北省"
                 },
                 {
                	 "id": 3,
                	 "name": "1_2014年保定清单v1",
                	 "price": "2014",
                	 "diqu": "河北省"
                 },
                 {
                	 "id": 4,
                	 "name": "1_2014年保定清单v2",
                	 "price": "2014",
                	 "diqu": "河北省"
                 }
                 ];


var metTable = $('#metTable');
//数据初始化
function metTable_initialization(){
	metTable.bootstrapTable({
		height: 450,
		data: paixu(),
		striped: true,	 //使表格带有条纹
		pagination: true,	//在表格底部显示分页工具栏
		toolbar: "#exampleToolbar_st",
		iconSize: "outline",
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		},
		pagination: true,	//在表格底部显示分页工具栏
		pageList: [15, 30, 60, 120],
		pageSize: 10,	//页面大小
		pageNumber: 1,	//页数
		clickToSelect: true,//点击选中行
		silent: true,  //刷新事件必须设置
		onClickRow: function (row, $element, index) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		}
	});
}
