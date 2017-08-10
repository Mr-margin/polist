jQuery.support.cors = true;
/**
 * Created by lvcheng on 2017/1/11.
 */
var tableTrMessage;//dom节点对象，用jqery使用时，用$()包裹，该节点保存tr元素
var dataMessage = [];
/*用于保存分页页码信息*/
var page = {
  all:1,//总页数（通过后端返回的知）
  size:10,//每页多少条数据
  now:1,
  after:2,
  before:1
};
var showMesName = ['name','SO2','NOx','VOc','NH3','PM25'];
var nowMessObj = {
  year:'',
  region:'',
  userId:'',
  pageNum:'',
  pageSize:'',
  search:''
};

//var userId = parent.dataBase.Login_map.SOLE;//userId
//var region = parent.dataBase.Message_map.REGION;//region
var userId = 1300000001111111;
var region = 130100;

/*************************操作事件*****************************/

/*分页事件*/
function changePage(type){
  switch (type){
    case 'start':
      page.now = 1;
      break;
    case 'end':
      page.now = page.all;
      break;
    case 'after':
      page.now = page.after;
      break;
    case 'before':
      page.now = page.before;

      break;
    case 'ok':
      page.now = $('.pageNow')[0].value>=page.all?page.all:$('.pageNow')[0].value;
      break;
  }
  page.after = (page.now + 1)>=page.all?page.all:(page.now + 1);
  page.before = (page.now - 1)<=1?1:(page.now - 1);
  $('.pageNow')[0].value = page.now;
  nowMessObj.pageNum = page.now;
  __updata__();
}

/*选中当前行*/
function clickTable(e){
  if(tableTrMessage){
    $(tableTrMessage).css('background-color','#fff');
    tableTrMessage = null;
  }
  tableTrMessage = e.target.parentElement;
  $(tableTrMessage).css('background-color','#dff0d8');
  $('.qdbj').attr('disabled',null);
  $('.qdsc').attr('disabled',null);
}
$('body').on('click', function(e){
  if($(e.target.parentElement)[0].tagName == 'TR' || $(e.target.parentElement.parentElement)[0].tagName == 'TR')return;
  if(tableTrMessage){
    $(tableTrMessage).css('background-color','#fff');
    tableTrMessage = null;
    $('.qdbj').attr('disabled','disabled');
    $('.qdsc').attr('disabled','disabled');
  }
});

/*年份选择*/
$('#year').change(function(){
  nowMessObj.year = $('#year').val();
  $('#list_table1').bootstrapTable('refresh',{
    query:{
      year:nowMessObj.year,
      search:nowMessObj.search
    }
  });
  //__updata__();
});

/*搜索事件*/
function clickSearch(){
  nowMessObj.search = $('#searchInput').val();
  $('#list_table1').bootstrapTable('refresh',{
    query:{
      year:nowMessObj.year,
      search:nowMessObj.search
    }
  });
  //__updata__();
}

/*删除事件*/
function clickDel(delId){
  console.log(delId)
  //var delId = $($(tableTrMessage).children()[1]).attr("data-id");
  var data = {
    region:region,
    userId:userId,
    version:'1.0',
    id:delId
  };
  var delMessage = $.ajax({
    url: 'http://www.baidu.com',//请求地址
    type: "POST",
    async:false,
    dataType: 'JSON',
    data: data,
    success: function (ret) {
      rel = ret;
    },
    error: function () {
      toastr["info"]("错误信息", "服务器异常");
    }
  });
  $.when(delMessage).done(function(){
    //clearAll();
    __updata__();
  })
}

/*点击查看*/
function clickView(id){
  console.log(id)
}
function clickEdit(id){
  console.log(id)
}

/**************************until*****************************/
/*获取列表信息*/
function getMesPost(url,parameter){
  return $.ajax({
    url: url,//请求地址
    type: "POST",
    async:false,
    dataType: 'JSON',
    data: parameter,
    success: function (rem) {
      dataMessage = rem.rows;
      page.all = Math.floor(rem.total/page.size);
      $('.allPage').html(page.all);
    },
    error: function () {
      toastr["info"]("错误信息", "服务器异常");
    }
  })
}

/*组织参数*/
function formPm(m){
  return {
    year: m.year,
    region:nowMessObj.region,
    userId:nowMessObj.userId,
    version:'1.0',
    pageNum: m.pageNum,//当前页
    pageSize: m.pageSize,//每页显示条数
    search: m.search//搜索信息
  }
}

/*移除表格中所有节点*/
function clearAll(){
  $('#list_table').empty();
}

/*创建tr td节点*/
function createTr(m,index){
  var tr = $('<tr></tr>');
  tr.append(createTd((index + ((page.now-1)*page.size) + 1)));
  tr.append(createTd(m[showMesName[0]], m.id));
  tr.append(createTd('2015'));
  tr.append(createTd(m[showMesName[1]]));
  tr.append(createTd(m[showMesName[2]]));
  tr.append(createTd(m[showMesName[3]]));
  tr.append(createTd(m[showMesName[4]]));
  tr.append(createTd(m[showMesName[5]]));
  tr.append(createTdBtn(m.edit, m.del, m.view, m.id));
  tr.appendTo($('#list_table'))
}
function createTd(value,id){
  var td = $('<td></td>');
  if(id){
    td.attr("data-id",id)
  }
  td.html(value);
  return td;
}
function createTdBtn(e,d,v,id){
  var td = $('<td></td>');
  var btn = '';
  if(e){
    btn += "<button style='margin-right:5px;' class='btn btn-outline btn-lG' onclick='clickEdit("+ id +")'><i class='fa fa-pencil'></i> 编辑 </button>"
  }
  if(v){
    btn += "<button style='margin-right:5px;' class='btn btn-outline btn-lG' onclick='clickView("+ id +")'><i class='fa fa-binoculars'></i> 查看 </button>"
  }
  if(d){
    btn += "<button style='margin-right:5px;' class='btn btn-outline btn-lO' onclick='clickDel("+ id +")'><i class='fa fa-close'></i> 删除 </button>"
  }
  td.html(btn);
  return td;
}



/*************************初始化及数据处理******************************/
/*初始化*/
function initialize(){
  nowMessObj.year = $('#year').val()||'';
  nowMessObj.region = region;
  nowMessObj.userId = userId;
  nowMessObj.search = $('searchInput').val()||'';
  list_table_init();

  __updata__();

  //var getM =  $.ajax('0402.json').done(function(rem){
  //  dataMessage = rem.List;
  //  page.all = Math.floor(rem.total/page.size);
  //  $('.allPage').html(page.all);
  //});
  //$.when(getM).done(function(){
  //  for(var dm=0;dm<dataMessage.length;dm++){
  //    createTr(dataMessage[dm],dm);
  //  }
  //})
}

function __updata__(){
  var pmData = formPm(nowMessObj);
  clearAll();
  var getM = getMesPost('0402.json',pmData);
  $.when(getM).done(function(){
    for(var dm=0;dm<dataMessage.length;dm++){
      createTr(dataMessage[dm],dm);
    }
  })

}

initialize();


$('#searchBtn').bootstrapTable('refresh',{

})


function list_table_init() {
  $('#list_table1').bootstrapTable({
    method : 'POST',
    url : '0402.json',
    dataType : "json",
    columns : [
      {
        field : 'number',
        title : '序号',
        align : 'center'
      },
      {
        field : 'name',
        title : '清单版本名称',
        align : 'center'
      }, {
        field : 'year',
        title : '年份',
        align : 'center'
      }, {
        field : 'SO2',
        title : 'SO2排放量（万吨）',
        align : 'center'
      }, {
        field : 'NOx',
        title : 'NOx排放量（万吨）',
        align : 'center'
      }, {
        field : 'VOc',
        title : 'VOc排放量（万吨）',
        align : 'center'
      },{
        field : 'NH3',
        title : 'NH3排放量（万吨）',
        align : 'center'
      },{
        field : 'PM25',
        title : 'PM2.5排放量（万吨）',
        align : 'center'
      }, {
        field : 'operation',
        title : '操作',
        formatter : function(value, row, index) {
          var e='',d='',v=''
          if(row.edit){
            e = '<a class = "update" onclick="clickEdit('+ row.id +')"><i class="fa fa-pencil"></i>&nbsp;&nbsp;修改</a>';
          }
          if(row.view){
            v = '<a class = "update" onclick="clickView('+ row.id +')"><i class="fa fa-binoculars"></i>&nbsp;&nbsp;查看</a>';
          }
          if(row.del){
            d = '<a class = "remove" onclick="clickDel('+ row.id +')"><i class="fa fa-trash"></i>&nbsp;&nbsp;删除</a>';
          }
          return e+' &nbsp;&nbsp; '+v+' &nbsp;&nbsp; '+d
        },
        events : 'operateEvents',
        align : 'center'
      } ], // 列
    //search:true,
    iconSize : "outline",
    clickToSelect : true,// 点击选中行
    pagination : true, // 在表格底部显示分页工具栏
    pageSize : 10, // 页面大小
    pageNumber : 1, // 页数
    pageList : [10],
    striped : true, // 使表格带有条纹
    sidePagination : "server",// 表格分页的位置 client||server
    //queryParams : formPm(nowMessObj),
    queryParams : function formPm(m){
      return {
        year: nowMessObj.year,
        region:nowMessObj.region,
        userId:nowMessObj.userId,
        version:'1.0',
        pageNum: (m.offset/10)+1,//当前页
        pageSize: m.limit,//每页显示条数
        search: nowMessObj.search//搜索信息
      }
    },
    queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
    silent : true, // 刷新事件必须设置
    contentType : "application/x-www-form-urlencoded", // 请求远程数据的内容类型。
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