jQuery.support.cors = true;
var dy_bookId;
var dy_regionId;
var dy_species;
var dy_scc1;
var dy_scc2;
var dy_scc3;
var dy_totalEmission;
var dy_year;
var rows_data;				//表格rows数组的数据
var dy_data;

/**************************************初始化*****************************************************/
$(function(){
	var Request = new Object();		
	Request = GetRequest();				//调用截取函数,截取url
	dy_bookId = Request['bookId'];
	dy_regionId = Request['regionId'];
	dy_species = Request['species'];
	dy_scc1 = Request['scc1'];
	dy_scc2 = Request['scc2'];
	dy_scc3 = Request['scc3'];
	dy_totalEmission = Request['totalEmission'];
	dy_year = Request['year'];
	$("#qiye_title").html('<code>*</code>'+dy_year+'年'+dy_scc1+dy_scc2+'行业企业列表');
	var total;
	var sum=0;
	$('#dy_table').bootstrapTable('destroy');  		//销毁表格
	$('#dy_table').bootstrapTable({
		method: 'POST',
		url:  BackstageIP+'showCountryList/findCompanys',		
		dataType: "json",
		iconSize: "outline",
		clickToSelect: true,		//点击选中行
//		height:600,					//设置固定高度
		pagination: true,			//在表格底部显示分页工具栏
		pageSize: 10,				
		pageNumber:1,				
		pageList: [10,20,50],
		striped: true,	 			//使表格带有条纹
		sidePagination: "server",	//表格分页的位置 client||server
		responseHandler:function (res) {		//可以自定义配置服务器响应返回的参数信息
			if (res!=undefined||res!=null||res!='') {
				dy_data=res;					//赋值全局变量
				if(res.data.rows==null||res.data.rows==''||res.data.rows==undefined){
					toastr.info("数据库中没有匹配数据!");
					return {						//重组远程数据
						"rows":res.data.rows,
						"total":res.data.total,
						"page":res.data.page,
						};
				}else{
					total=res.data.total;
					return {						//重组远程数据
					"rows":res.data.rows,
					"total":res.data.total,
					"page":res.data.page,
					};
				}
			} else {
				toastr.info("未成功获取服务器数据!");
			}
		},
		queryParams : function(params) {
			return {
				pageNum : params.limit,	
				pageIndex : params.offset/params.limit,
				bookId:dy_bookId,			//清单id
				regionId:dy_regionId,		//地区编号
				species:dy_species,			//排放物种名称
				scc1:dy_scc1,				//部门
				scc2:dy_scc2,				//行业
				scc3:dy_scc3,				//点源
				totalEmission:dy_totalEmission	//选择记录的总排放量
			}
		},
		queryParamsType: "limit", 	//参数格式,发送标准的RESTFul类型的参数请求
		silent: true,  				//刷新事件必须设置
		contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型
		onLoadSuccess:function(res){
			rows_data=res.rows;		//加载成功设为全局变量
		},
		columns : [
		 		  {
		 	         field : 'P_REGIONNAME',
		 	         title : '省',
		 	         align : 'center',
		 	      },
		 	       {
		 	         field : 'C_REGIONNAME',
		 	         title : '市',
		 	         align : 'center',
		 		      },
		 	      {
		 	         field : 'COMPANY_NAME',
		 	         title : '企业名称',
		 	         align : 'center',
		 		      },
		 	      {
		 	         field : 'EQUIP_NUM',
		 	         title : '设备个数',
		 	         align : 'center',
		 		  },
		 	       {
	 		         field : 'EMISSION',
	 		         title : '排放量（万吨）',
	 		         align : 'center',
	 		       	 formatter:function(value,row,index){
		 	        	 var EMISSION=((row.EMISSION)/10000).toFixed(2);
		 	        	  return EMISSION;
		 	          }
		 		  },
		 	       {
		 	         field : 'pffdl',
		 	         title : '排放分担率(%)',
		 	         align : 'center',
		 	         formatter:function(value,row,index){
		 	        	if(index!=total-1){
		 	        		if ( dy_totalEmission == "0" ) return '0.00%';
		 	        		else {
		 	        			var qyfdl=(row.EMISSION/dy_totalEmission).toFixed(2)*100;
			 	        		sum+=qyfdl;
			 	        		return qyfdl.toFixed(2)+'%';
		 	        		}
		 	        	}else{
		 	        		var qyfdl=100-sum;
		 	        		return qyfdl.toFixed(2)+'%';
		 	        	}
		 	          }
		 		   },
		            {
		 			field : 'caozuo',
		 			formatter : function(value,row, index) {
		 				var a='<a onclick="cksb('+index+')"><i class="fa fa-eye""></i>&nbsp;查看</a>';
		 			    return a;
		 			},
		 		  },  
		 		], 
		onClickRow: function (row, $element) {
			$('.success').removeClass('success');
			$($element).addClass('success');
		},
		icons: {
			refresh: "glyphicon-repeat",
			toggle: "glyphicon-list-alt",
			columns: "glyphicon-list"
		}
	});
});	//初始化结束
/**********************************************查看设备*************************************************/
function cksb(row_index){				//参数为行下标
	$("#shebei_title").html('<code>*</code>'+dy_year+'年'+rows_data[row_index].COMPANY_NAME+'设备列表');
	$('#sblb_table').html("");			//清空表格
	$(".sblb").show();
	var sb_data=ajax_async_t(BackstageIP+"showCountryList/findEquipments",
			{
			bookId:dy_data.data.bookId,								//清单id
			companyId:dy_data.data.rows[row_index].COMPANY_ID,		//企业id
			regionId:dy_data.data.regionId,							//地区编号
			species:dy_data.data.species,							//排放物种名称
			scc1:dy_data.data.scc1,									//部门
			scc2:dy_data.data.scc2,									//行业
			scc3:dy_data.data.scc3,									//点源
			totalEmission:rows_data[row_index].EMISSION				//选择记录的总排放量
			},
			"json");
	var qyzl=rows_data[row_index].EMISSION;		//获取父表的排放量
	if(typeof sb_data!=null||typeof sb_data!=undefined||typeof sb_data!=''&&typeof sb_data.status=="success"){
		$.each(sb_data.data.equipment,function(i,item){
			if((sb_data.data.equipment[i].EMISSION/qyzl).toFixed(2)=="NaN"){
				var sbfdl=(0.00).toFixed(2);
			}else{
				var sbfdl=(((sb_data.data.equipment[i].EMISSION/qyzl).toFixed(2))*100).toFixed(2);
			}
			$("#sblb_table").append("<tr id="+sb_data.data.equipment[i].EQUIP_ID+">" +
					"<td>"+sb_data.data.equipment[i].EQUIP_ID+"</td>" +
					"<td>"+((sb_data.data.equipment[i].EMISSION)/10000).toFixed(2)+"</td>" +
					"<td>"+sbfdl+"%</td>" +
					"</tr>"
			);
		});
	}else{
		toastr["info"]("错误信息","未成功获取服务器数据!");
	}
	
}
