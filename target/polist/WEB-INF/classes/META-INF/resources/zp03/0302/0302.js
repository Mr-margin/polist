jQuery.support.cors = true;
$(function(){
	initialize();	//调用年份初始化函数
})
var list_table1 = $('#list_table1');
var dj;		//全局变量;用于判断点击从新计算跳转后排放计算区的显示

var dataMessage = [];
var nowMessObj = {
  year:'',
  region:'',
  userId:'',
  pageSize:'',
};
/*配置分页和查询的参数*/
function queryParams(params){ 
	var temp = {};
	temp.pageSize = params.limit;
	temp.pageNumber = params.offset;
	temp.userId = userId;//userId,获取父页面的Login_map的SOLE的值
	temp.year = $('#year').val();
	temp.region = parent.dataBase.Message_map.REGION;
	temp.userType = parent.dataBase.Login_map.TYPE;
	return temp;
};

var userId = parent.dataBase.Login_map.SOLE;//userId,获取父页面的Login_map的SOLE的值
//var userId =13;
var region = parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';//region,行政区域获取父页面的Message_map的REGION的值
//var region = 130100;

/*************************操作事件*****************************/

/*年份选择*/
$('#year').change(function(){
  nowMessObj.year = $('#year').val();
  $('#list_table1').bootstrapTable('refresh',{
    query:{
      pageNum:1,
      year:nowMessObj.year,
      search:nowMessObj.search
    }
  });
});


/* 编辑，删除之前先要获取选中的行数据*/
function getSelectedRow() {
    var index = list_table1.find('tr.success').data('index');
    return list_table1.bootstrapTable('getData')[index];
};
/*点击点击数字查询行业详细接口*/
function cxjs(){
	$.ajax({
		url: BackstageIP+'calc/notComputeList',//请求地址
    	type: "POST",
    	async:false,
    	dataType: 'JSON',
    	data: {
    			userId : userId,
    			year:nowMessObj.year
    			},
    	success: function (res) {
    		var dept="";
    		for(var key in res){
    			var str = '';
    			for ( var i = 0 ; i < res[key].length ; i ++ ) {
    				
    				str += res[key][i]+","
    			}
    			str = str.substr(0,str.length-1)
    			dept += '<tr><td>'+key+'</td><td>'+str+'</td></tr>';
    		}
    		$("#dept_count").html(dept);
    		},
      	error: function () {
      		swal("获取数据失败!", "请稍后尝试", "error");
      		}
    	});
	$("#0302_Modal").modal();	//根据ID调用页面的modal弹框
	
}

/*确认删除*/
function clickSureDel(id){
		swal({
	      title: "确定删除此清单？",
	      text: "删除后将无法恢复，请谨慎操作!",
	      type: "warning",
	      showCancelButton: true,
	      confirmButtonColor: "#DD6B55",
	      confirmButtonText: "删除",
	      closeOnConfirm: false
		},
	    function() {
	    	clickDel(id);
	    });
}

/*删除事件*/
function clickDel(id){
  var data = {
    id:id
  };
  var delMessage = $.ajax({
    url: BackstageIP+'calc/deleteData',//删除请求地址
    type: "POST",
    async:false,
    dataType: 'JSON',
    data: data,
    success: function (res) {
      swal("删除成功！", "您已经删除这条清单信息", "success");
    },
    error: function () {
      swal("删除失败！", "未能成功删除此清单", "error");
    }
  });
  $.when(delMessage).done(function(){
    $('#list_table1').bootstrapTable('destroy');//删除表格
    list_table_init();	//删除完毕重新初始化表格
  });
}

/*点击查看*/
function clickView(id){
  swal({
      title: "确定查看此清单？",
      //text: "需要保存吗？",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "查看",
      closeOnConfirm: true
    },
    function() {
      var qdsc = parent.document.querySelector('#qingdanshengcheng');
      var qdbzoh = $(qdsc).children()[0];
      parent.close_wicket(qdbzoh.text);
      var href = $(qdbzoh).attr('href');
      $(qdbzoh).attr('href',(href + '?id=' + id +'&view=1'));
      qdbzoh.click();
      $(qdbzoh).attr('href',(href));
    });
	
}
/*重新计算*/
function reCount(uid,department,fileName){
	var par;	//存放 用于根据在排放版本管理选中点击的部门的par，par为标签？后的第一个参数
	var result;	//用于接收该请求res中的数据
	if("化石燃料固定燃烧源"==department){
		 par=1;
	}else if("工艺过程源"==department){
		par=2;
	}else if("移动源"==department){
		par=3;
	}else if("溶剂使用源"==department){
		par=4;
	}else if("农业源"==department){
		par=5;
	}else if("扬尘源"==department){
		par=6;
	}else if("生物质燃烧源"==department){
		par=7;
	}else if("储存运输源"==department){
		par=8;
	}else if("废弃物处理源"==department){
		par=9;
	}else if("其他排放源"==department){
		par=10;
	}
		swal({
		      title: "确定重新计算此清单？",
		      //text: "需要保存吗？",
		      type: "info",
		      showCancelButton: true,
		      confirmButtonColor: "#DD6B55",
		      confirmButtonText: "确认",
		      closeOnConfirm: true
		    },
		    function() {
		    	$.ajax({
					url: BackstageIP+'calc/reCount',//请求地址
			    	type: "POST",
			    	async:false,
			    	dataType: 'JSON',
			    	data: {
			    			id : uid,		
			    			version:'1.0'	//版本
			    			},
			    	success: function (res) {
			    		result=res;
			    		parent.fu_ipId = result.ipId;
			    		parent.fu_ef = result.ef;	//现在当前的0302.html页面下引入0302_11.js文件  <script src="0302_11.js"></script>,将result中数据传给0302_11.js中声明的变量 fu_ef,然后在0301.js中就可以使用parent.fu_ef来接收数据
			    		parent.fu_eta = result.eta;
			    		parent.fu_drop = result.drop;
			    		parent.fu_ps = result.ps;
			    		parent.fu_ss = result.ss;
			    		parent.fu_species=result.species
			    		parent.fu_psId=result.psId;
			    		parent.fu_ssId=result.ssId;
			    		parent.fu_description=result.description;
			    		parent.fu_name=result.name;
			    		parent.fu_reCount=1;
			    		
			    		var	renwuguanli = parent.document.querySelector('#renwuguanli');	//获取父页面主菜单的对象
				    	var paifangjisuanqu=renwuguanli.children[4].children[0];			//获取排放计算区对象
				    	var li_1=$(paifangjisuanqu).children()[0];
				    	var reset_1=$(li_1).attr("href");
				    	var	paifangbanben=renwuguanli.children[4].children[1];				//获取排放版本管理对象
				    	var li_2=$(paifangbanben).children()[0];
				    	var reset_2=$(li_2).attr("href");
			        	$(li_1).attr("href",(reset_1 +'&pat='+par+'&subId='+result.subId+'&ipId='+result.ipId+'&department='+department+'&taskId='+result.taskId+'&taskName='+result.taskName+'&subSector='+result.subSector+'&name='+result.name+'&reCount='+1+'&isOnline='+result.isOnline+'&online='+result.online));
			        	$(li_1).prop("textContent",fileName);		//修改从排放版本点击进入后的标签页名称
			        	$(paifangjisuanqu).children()[0].click();	//点击跳转排放计算区页面
				    	$(li_2).prop("href",reset_2);				//重置排放版本管理的href属相值
				    	$(li_2).prop("textContent","排放版本管理");	//重置排放版本管理的textContent名称
				    	$(li_1).prop("href",reset_1);				//重置排放计算区的href属相值
				    	$(li_1).prop("textContent","排放计算区");	//重置排放计算区的textContent名称
			    		},
			    	error: function () {
			    		swal("获取数据失败!", "请稍后尝试", "error");
		      		}
				});
		    });
}

/*************************初始化及数据处理************************************************************************************/
/*初始化*/
function initialize(){
	var getYear = $.ajax({
		url: BackstageIP+'calc/findYear.do',//请求地址
    	type: "POST",
    	async:false,
    	dataType: 'JSON',
    	data: {
    	userId : userId,
    	version:'1.0',
    	region : parent.dataBase.Message_map.REGION,
    	userType : parent.dataBase.Login_map.TYPE,
    },
    success: function (res) {
    	if(""!=res&&res!=null&&res!="[]"){
    		for(var y=0;y<res.length;y++){
    			var opt = '<option value="'+ res[y] +'">'+ res[y] +'</option>';
    			$(opt).appendTo($('#year'));
    		}
    		
    	}else if(res=='[]'||res==null||res==""){
    		toastr["info"]("提示", "没有找到匹配的年份记录");
    		return null;
      	}
      },
    
    error: function () {
      toastr["info"]("错误信息", "服务器异常");
    }
  });
	if($('#year').val()==null||""==$('#year').val()){	//判断年份是否为空
	    return null;
	}else{
		$.when(getYear).done(function(){
		nowMessObj.year = $('#year').val()||'';
		nowMessObj.region = region;
		nowMessObj.userId = userId;
		nowMessObj.search = $('searchInput').val()||'';
		list_table_init();
		  })
	}
}

/*初始化表格*/
function list_table_init() {
  $('#list_table1').bootstrapTable({
    method : 'POST',
    url : BackstageIP+'calc/findListByPage.do',
    dataType : "json",
    columns : [
      {
        field : 'number',
        title : '序号',
        align : 'center'
      },
      {
        field : 'userName',
        title : '计算用户',
        align : 'center'
      }, 
      {
          field : 'department',
          title : '部门',
          align : 'center'
        }, 
      {
        field : 'subSector',
        title : '行业',
        align : 'center'
      }, 
      {
        field : 'name',
        title : '排放版本名称',
        align : 'center'
      }, 
      {
        field : 'pData',
        title : '点源数据',
        align : 'center',
      }, 
      {
        field : 'sData',
        title : '面源数据',
        align : 'center',
      },
      {
    	  field : 'so2',
          title : 'SO2排放量<br>（万吨）',
          align : 'center',
          formatter:function(value,row,index){
            return (value/10000).toFixed(2);
          }
        }, {
          field : 'nox',
          title : 'NOx排放量<br>（万吨）',
          align : 'center',
          formatter:function(value,row,index){
              return (value/10000).toFixed(2);
            }
      },{
        field : 'pm25',
        title : 'PM2.5排放量<br>（万吨）',
        align : 'center',
        formatter:function(value,row,index){
            return (value/10000).toFixed(2);
          }
      }, {
          field : 'voc',
          title : 'VOc排放量<br>（万吨）',
          align : 'center',
          formatter:function(value,row,index){
              return (value/10000).toFixed(2);
            }
        },
       {
        field : 'operate',
        title : '操作',
        formatter : function(value, row, index) {
        	$("#trade_num").html(row.num);	//在页面左下角添加未完成排放计算的行业数字
        	value=row.operate;
        	return value;
        },
       
        events : 'operateEvents',
        align : 'center'
      } ], // 列
      
    //search:true,
    iconSize : "outline",
    clickToSelect : true,	// 点击选中行
    pagination : true,		// 在表格底部显示分页工具栏
    pageSize : 10, 			// 页面大小
    pageNumber : 1, 		// 页数
    pageList : [10,20,50],
    striped : true, 		// 使表格带有条纹
    sidePagination : "server",// 表格分页的位置 client||server
    queryParams : queryParams,
    queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
    silent : true, // 刷新事件必须设置
    contentType : "application/x-www-form-urlencoded", // 请求远程数据的内容类型
    onClickRow : function(row, $element) {
      $('.success').removeClass('success');
      $($element).addClass('success');
    },
    icons : {
      refresh : "glyphicon-repeat",
      toggle : "glyphicon-list-alt",
      columns : "glyphicon-list"
    }

  });
  $('#list_table1').bootstrapTable('hideColumn', 'taskId');
}

