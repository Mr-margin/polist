jQuery.support.cors = true;
/**
 * Created by lvcheng on 2017/1/11.
 */
var dataMessage = [];
var nowMessObj = {
  year:'',
  region:'',
  userId:'',
  pageNum:'',
  pageSize:'',
  search:''
};

var userId = parent.dataBase.Login_map.SOLE;//userId
var region = parent.dataBase.Message_map?parent.dataBase.Message_map.REGION:'';//登录用户级别区域编码
var data_type=parent.dataBase.Login_map.TYPE;//	登录用户级别
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

/*搜索事件*/
function clickSearch(){
  nowMessObj.search = $('#searchInput').val();
  $('#list_table1').bootstrapTable('refresh',{
    query:{
      pageNum:1,
      year:nowMessObj.year,
      search:nowMessObj.search
    }
  });
}


/*确认删除*/
function clickSureDel(id){
  swal({
      title: "确定删除此清单？",
      //text: "需要保存吗？",
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
    region:region,
    userId:userId,
    version:'1.0',
    id:id
  };

  var delMessage = $.ajax({
    url: BackstageIP+'/ecloudBook/delete',//请求地址
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
    $('#list_table1').bootstrapTable('destroy');
    list_table_init();
  });
}

/*点击查看*/
function clickView(id,row_name,row_year){
  swal({
      title: "确定查看此清单？",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "查看",
      closeOnConfirm: true
    },
    function() {
    	var	renwuguanli = parent.document.querySelector('#renwuguanli');	//获取父页面主菜单的对象
    	if(data_type!=1&&data_type!=2){
//    	var qingdanbianzhi=renwuguanli.children[6].children[0];				//获取清单编制对象
//    	var li_1=$(qingdanbianzhi).children()[0];
//    	var reset_1=$(li_1).attr("href");									//获取清单编制默认href值
//    	var	banbenguanli=renwuguanli.children[6].children[1];				//获取版本管理对象
//    	var li_2=$(banbenguanli).children()[0];
//    	var reset_2=$(li_2).attr("href");			//获取版本管理默认href值
//    	$(li_1).attr("href",(reset_1 + '?id=' + id +'&view=1'));
//    	$(qingdanbianzhi).children()[0].click();	//点击跳转清单编制
//    	$(li_2).prop("href",reset_2);				//重置版本管理的href属相值
//    	$(li_2).prop("textContent","版本管理");		//重置版本管理的textContent名称
//    	$(li_1).prop("href",reset_1);				//重置清单编制的href属相值
//    	$(li_1).prop("textContent","清单编制");		//重置清单编制的textContent名称
    	
    	window.parent.$("#yincang_caidan").attr("href","zp04/0401/0401.html?id=" + id +"&view=1");
    	window.parent.$("#yincang_caidan").html(row_name);
    	window.parent.$("#yincang_caidan").click();
    	
	}else if(data_type==2){
    		var qingdanouhe_li=renwuguanli.children[4].children[0];		//获取清单耦合对象
    		var bbgl_li=renwuguanli.children[4].children[1];			//获取版本管理
        	var qingdanouhe=$(qingdanouhe_li).children()[0];
        	var bbgl_li=$(bbgl_li).children()[0];
        	parent.qd_id=id;
        	parent.qd_year=row_year;
        	$(qingdanouhe).prop("textContent",row_name);
        	var qingdanouhe_href=$(qingdanouhe).attr("href");
        	$(qingdanouhe).attr("href",(qingdanouhe_href + '?number_oh=1&id='+id+'&view=2'));
        	$(qingdanouhe_li).children()[0].click();					//点击跳转清单耦合
        	$(qingdanouhe).prop("href",qingdanouhe_href);
        	$(qingdanouhe).prop("textContent","清单耦合");
    	}
    }
  );
}
/*点击编辑*/
function clickEdit(row_year,row_name,id){
  swal({
      title: "确定编辑此清单？",
      //text: "需要保存吗？",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "编辑",
      closeOnConfirm: true
    },
    function() {
    	var	renwuguanli = parent.document.querySelector('#renwuguanli');	//获取父页面主菜单的对象
    	if(data_type!=2&&data_type!=1){
//        	var qingdanbianzhi=renwuguanli.children[6].children[0];				//获取清单编制对象
//        	var li_1=$(qingdanbianzhi).children()[0];
//        	var reset_1=$(li_1).attr("href");									//获取清单编制默认href值
//        	var	banbenguanli=renwuguanli.children[6].children[1];				//获取版本管理对象
//        	var li_2=$(banbenguanli).children()[0];
//        	$(qingdanouhe).prop("textContent",row_name);
//        	var reset_2=$(li_2).attr("href");			//获取版本管理默认href值
//        	$(li_1).attr("href",(reset_1 + '?id=' + id +'&view=0'));
//        	$(qingdanbianzhi).children()[0].click();	//点击跳转清单编制
//        	$(li_2).prop("href",reset_2);				//重置版本管理的href属相值
//        	$(li_2).prop("textContent","版本管理");		//重置版本管理的textContent名称
//        	$(li_1).prop("href",reset_1);				//重置清单编制的href属相值
//        	$(li_1).prop("textContent","清单编制");		//重置清单编制的textContent名称
////        	
        	window.parent.$("#yincang_caidan").attr("href","zp04/0401/0401.html?id=" + id +"&view=0");
        	window.parent.$("#yincang_caidan").html(row_name);
        	window.parent.$("#yincang_caidan").click();
        	
        	
    	}else if(data_type==2){
    		var qingdanouhe_li=renwuguanli.children[4].children[0];		//获取清单耦合对象
    		var bbgl_li=renwuguanli.children[4].children[1];			//获取版本管理
        	var qingdanouhe=$(qingdanouhe_li).children()[0];
        	var bbgl_li=$(bbgl_li).children()[0];
        	parent.qd_id=id;
        	parent.qd_year=row_year;
        	$(qingdanouhe).prop("textContent",row_name);
        	var qingdanouhe_href=$(qingdanouhe).attr("href");
        	$(qingdanouhe).attr("href",(qingdanouhe_href + '?number_oh=1&id='+id ));
        	$(qingdanouhe_li).children()[0].click();					//点击跳转清单耦合
        	$(qingdanouhe).prop("href",qingdanouhe_href);
        	$(qingdanouhe).prop("textContent","清单耦合");
    	}else if(data_type==1){
    		var qingdanouhe_li=renwuguanli.children[4].children[0];		//获取清单耦合对象
    		console.log(qingdanouhe_li);
    		var bbgl_li=renwuguanli.children[4].children[1];			//获取版本管理
    		console.log(bbgl_li);
        	var qingdanouhe=$(qingdanouhe_li).children()[0];
        	var bbgl_li=$(bbgl_li).children()[0];
        	parent.qd_id=id;
        	parent.qd_year=row_year;
        	$(qingdanouhe).prop("textContent",row_name);
        	var qingdanouhe_href=$(qingdanouhe).attr("href");
        	$(qingdanouhe).attr("href",(qingdanouhe_href + '?number_oh=1&id='+id ));
        	$(qingdanouhe_li).children()[0].click();					//点击跳转清单耦合
        	$(qingdanouhe).prop("href",qingdanouhe_href);
        	$(qingdanouhe).prop("textContent","清单耦合");
    	}
    	
    });
}

/*************************初始化及数据处理******************************/
var data_row;
/*初始化*/
function initialize(){

  var getYear = $.ajax({
    url: BackstageIP+'/ecloudBook/year',//请求地址
    type: "POST",
    async:false,
    dataType: 'JSON',
    data: {
      region:region,
      userId : userId,
      version:'1.0'
    },
    success: function (res) {
      $('#year').append($('<option value="">全部年份</option>'));
      for(var y=0;y<res.data.length;y++){
        var opt = '<option value="'+ res.data[y] +'">'+ res.data[y] +'</option>';
        $(opt).appendTo($('#year'));
      }
    },
    error: function () {
      toastr["info"]("错误信息", "服务器异常");
    }
  });
  $.when(getYear).done(function(){
    nowMessObj.year = $('#year').val()||'';
    nowMessObj.region = region;
    nowMessObj.userId = userId;
    nowMessObj.search = $('searchInput').val()||'';
    list_table_init();
  })
}

/*初始化表格*/
function list_table_init() {
  $('#list_table1').bootstrapTable({
    method : 'POST',
    url : BackstageIP+'/ecloudBook/search',
    dataType : "json",
    columns : [
      {
        field : 'number',
        title : '序号<br>&nbsp;',
        align : 'center'
      },
      {
        field : 'name',
        title : '清单版本名称<br>&nbsp;',
        align : 'center'
      }, {
        field : 'year',
        title : '年份<br>&nbsp;',
        align : 'center'
      }, {
        field : 'SO2',
        title : 'SO2排放量<br>（万吨）',
        align : 'center',
        formatter:function(value,row,index){
          return (value/10000).toFixed(2);
        }
      }, {
        field : 'NOx',
        title : 'NOx排放量<br>（万吨）',
        align : 'center',
        formatter:function(value,row,index){
        	return (value/10000).toFixed(2);
        }
      }, {
        field : 'VOC',
        title : 'VOc排放量<br>（万吨）',
        align : 'center',
        formatter:function(value,row,index){
          return (value/10000).toFixed(2);
        }
      },{
        field : 'NH3',
        title : 'NH3排放量<br>（万吨）',
        align : 'center',
        formatter:function(value,row,index){
          return (value/10000).toFixed(2);
        }
      },{
        field : 'PM25',
        title : 'PM2.5排放量<br>（万吨）',
        align : 'center',
        formatter:function(value,row,index){
          return (value/10000).toFixed(2);
        }
      },{
          field : 'status',
          title : '状态<br>&nbsp;',
          align : 'center',
          formatter:function(value,row,index){
        	  var s = '';
        	  if ( row.status == "1" ) {
        		  s = '未提交';
        	  }else if (row.status == "2") {
        		  s = '已提交';
        	  }else if (row.status == "4") {
        		  s = '通过';
        	  }else if (row.status == "5") {
        		  s = '驳回';
        	  }
        	  return s
           }
      },{
            field : 'taskName',
            title : '提交任务<br>&nbsp;',
            align : 'center'
      },{
        field : 'operation',
        title : '操作<br>&nbsp;',
        formatter : function(value, row, index) {
          var e='',d='',v='',s='';
          if(row.load){
        	  return '<h5 style="color:rgb(79, 135, 209)">请稍后刷新,正在计算中...</h5> '
          }else{
        	  if(row.edit){//编辑
                  e = '<a class = "update" onclick="clickEdit('+ row.year +',\''+row.name+'\','+row.id+')"><i class="fa fa-pencil"></i>编辑</a>';
                }
                if(row.view){//查看
                  v = '<a class = "update" onclick="clickView('+ row.id +',\''+row.name+'\','+row.year+')"><i class="fa fa-binoculars"></i>查看</a>';
                }
                if(row.del){//删除
                  d = '<a class = "remove" data-toggle="modal" onclick="clickSureDel('+ row.id +')"><i class="fa fa-trash"></i>删除</a>';
                }
                if(data_type!='1'){	//如果为用户级别为1，不显示提交按钮
      	          if (row.status == "1"||row.status == "5") {
      	        	 s='<a class = "update" onclick="tjEdit('+ row.year +',\''+row.name+'\','+row.id+')"><i class="fa fa-long-arrow-up"></i>提交</a>';
      	          }
                }
                return e+'&nbsp;&nbsp;'+v+'&nbsp;&nbsp;'+d+'&nbsp;&nbsp;'+s
          }
          
        },
        events : 'operateEvents',
        align : 'center'
      } ], // 列
    fefresh:true,
    showRefresh: true,  //显示刷新按钮
    iconSize : "outline",
    clickToSelect : true,// 点击选中行
    pagination : true, // 在表格底部显示分页工具栏
    pageSize : 10, // 页面大小
    pageNumber : 1, // 页数
    pageList : [10,20,50],
    striped : true, // 使表格带有条纹
    sidePagination : "server",// 表格分页的位置 client||server
    queryParams : function formPm(m){
    	console.log(m)
      nowMessObj.pageSize = m.pageSize;
      nowMessObj.pageNum = m.pageNumber;
      return {
        year: nowMessObj.year,
        region:nowMessObj.region,
        userId:nowMessObj.userId,
        version:'1.0',
        pageNum: nowMessObj.pageNum,//当前页
        pageSize: nowMessObj.pageSize,//每页显示条数
        search: nowMessObj.search//搜索信息
      }
    },
    queryParamsType : "undefined", // 参数格式,发送标准的RESTFul类型的参数请求
    silent : true, // 刷新事件必须设置
    contentType : "application/x-www-form-urlencoded", // 请求远程数据的内容类型
    onLoadSuccess:function (data){
    	parent.data_row=data;
    },
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
  if(data_type=='1'){
	  $('#list_table1').bootstrapTable('hideColumn', 'status');
	  $('#list_table1').bootstrapTable('hideColumn', 'taskName');
  }
  $('#list_table1').bootstrapTable('hideColumn', 'taskId');
 
};

initialize();

var ver_name = "";//清单版本任务名称
var ver_id = "";//清单版本ID
var ver_ = "";//年份
//表格提交按钮
function tjEdit(year,name,id){
	ver_name = name;
	ver_id = id;
	ver_year = year;
	$.ajax({
	    url: BackstageIP+'/taskProvince/findTask.do',//请求地址
	    type: "POST",
	    async:false,
	    dataType: 'JSON',
	    data: {
	      listYear:year,
	      cityUserId : parent.dataBase.Login_map.SOLE,
	      version:'1.0'
	    },
	    success: function (data) {
	    	console.log(data);
	    	if ( data.length > 0 ) {
	    		var html = '<div class=" radio radio-info radio-inline">';
	    		$.each(data,function(i,item){
	    			html += '<div class=""><input id="task_select'+i+'" type="radio" value="'+item.taskId+'" name="ver"> <label for="task_select'+i+'">'+item.taskName+'('+year+'清单)</lable></div>';
	    		});
	    		html += '</div>';
	    		$("#task_select").html(html);
	    		$("#save_task").modal();
	    	} else {
	    		toastr["info"]("提示","当前没有清单任务");
	    	}
	    	
	    },
	    error: function () {
	      toastr["info"]("错误信息", "服务器异常");
	    }
	  });
}
/**
 * 提交清单任务
 */
function task_save () {
	$.ajax({
	    url: BackstageIP+'/taskProvince/updateStatus.do',//请求地址
	    type: "POST",
	    async:false,
	    dataType: 'JSON',
	    data: {
	      taskId:$('#task_select input[name="ver"]').filter(':checked').val(),
	      listId:ver_id,
	      listName:ver_name,
	      cityUserId : parent.dataBase.Login_map.SOLE,
	      listYear:ver_year,
	      taskName:$("#task_select input[name='ver']:checked").next("label").text(),
	      version:'1.0'
	    },
	    success: function (data) {
	    	if ( data.status == "success" ) {
	    		 toastr["success"]("提示", "提交成功");
	    		 $("#save_task").modal("toggle");
	    		 $('#list_table1').bootstrapTable('destroy');
	    		  list_table_init();
	    	} else {
	    		 toastr["info"]("错误信息", "提交失败");
	    	}
	    	//saveEquip (ver_id);
	    },
	    error: function () {
	      toastr["info"]("错误信息", "服务器异常");
	    }
	  });
}
//提交清单时，保存设备信息
 function saveEquip (){
	 $.ajax({
		    url: BackstageIP+'taskProvince/saveEquip',//请求地址
		    type: "POST",
		    async:false,
		    dataType: 'JSON',
		    data: {version:"1.0",listId:ver_id},
		    success: function (data) {
		    	if ( data.status == "success" ) {
		    		task_save ();
		    	} else {
		    		 toastr["info"]("错误信息", "提交失败");
		    	}
		    	
		    },
		    error: function () {
		    	
		    }
		  });
 }