//仅点源行业默认对应的颜色
var color = {"电力":"#EE82EE","工业锅炉" :"#FF1493","民用燃烧":"#AEEEEE","玻璃":"#00868B","独立焦化":"	#B4EEB4","钢铁":"	#B3EE3A","化工化纤":"	#8B864E","水泥":"#8B658B","其他工业企业":"#EE7942","机动车":"#FFA54F",
		"飞机":"#7FFFD4","船舶":"#C1FFC1","非道移机械":"#9BCD9B","工业喷涂":"#0000FF","建筑涂料":"#4682B4","印刷印染":"#B3EE3A","农药使用":"#48D1CC","其他溶剂使用":"#6E8B3D","氮肥使用":"#2E8B57","固氮植物":"#7CFC00","秸秆堆肥":"#8B658B","人体粪便":"#FFC1C1",
		"畜禽养殖":"#CD9B9B","土壤本底":"#8B3A3A","道路扬尘":"#F5DEB3","堆场扬尘":"#DB7093",
		"施工烟尘":"#EE2C2C","土壤扬尘":"#DDA0DD","生物质燃烧":"#8B2323","生物质开放燃烧汽油储存":"#CD7054","汽油运输":"#D8BFD8","加油站":"#9370DB","废水处理":"#8B7D6B","固废处理":"#CD6090","烟气脱硝":"#F0FFF0","餐饮油烟":"#CD00CD"
}
//非栅格的配色方案
var color_content = '<div class="row">'+
						'<div class="col-sm-12">'+
							'<div class="cl-sm-4" style="padding-left:0px">'+
								'<button class="btn btn-outline btn-lG" onclick="show_color()" style="float:left;">'+
									'<i class="fa fa-plus-square"></i> 新建'+
								'</button>'+
							'</div>'+
							'<div class="cl-sm-4">'+
								'<button class="btn btn-outline btn-lG" onclick="show_color()" style="float:left;margin-left:10px;">'+
									'<i class="fa fa-plus-square"></i> 预览'+
								'</button>'+
							'</div>'+
							'<div class="cl-sm-4">'+
								'<button class="btn btn-outline btn-lG" onclick="show_color()" style="float:left;margin-left:10px;">'+
									'<i class="fa fa-plus-square"></i> 保存'+
								'</button>'+
							'</div>'+
						'</div>'+
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<div class="input-group m-b" style="margin-bottom: 0px">'+
								'<span class="input-group-addon" style="border: 1px solid #E5E6E7;">配色方案: </span>'+
								'<select class="form-control m-b" id="paifangjisuanqu_select" name="taskId" onchange="">'+
								'</select>'+
							'</div>'+
						'</div>'+
						
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"> 方案名称： </span> '+
								'<input type="text" class="form-control" id="searchInput">'+
							'</div>'+
						'</div>'+
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<div class="input-group">'+
								'<span class="input-group-addon"> 色标单位： </span> '+
								'<input type="text" class="form-control" id="searchInput">'+
							'</div>'+
						'</div>'+
						
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<div class="col-sm-6" style="padding-left:0">'+
								'<div class="input-group m-b" style="margin-bottom: 0px">'+
									'<span class="input-group-addon" style="border: 1px solid #E5E6E7;">宽度: </span>'+
									'<select class="form-control m-b" id="paifangjisuanqu_select" name="taskId" onchange="">'+
									'</select>'+
								'</div>'+
							'</div>'+
							
							'<div class="col-sm-3">'+
								'<div class="checkbox checkbox-info checkbox-right" style="padding-left:0px">'+
									'<input type="checkbox" id="q" value="q" name="q" onclick="">'+
									'<label for="q">MIN</label>'+
								'</div>'+
							'</div>'+
							'<div class="col-sm-3">'+
								'<div class="checkbox checkbox-info checkbox-right" style="padding-left:0px">'+
									'<input type="checkbox" id="qq" value="qq" name="qq" onclick="">'+
									'<label for="qq">MAX</label>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<div class="col-sm-6" style="padding-left:0">'+
								'<button class="btn btn-outline btn-lG" onclick="" style="float:left;">'+
									'<i class="fa fa-plus-square"></i> 添加一行'+
								'</button>'+
							'</div>'+
							'<div class="col-sm-6">'+
								'<button class="btn btn-outline btn-lG" onclick="" style="float:left;margin-right:10px;">'+
									'<i class="fa fa-plus-square"></i> 删除最后一行'+
								'</button>'+
							'</div>'+
						'</div>'+
						
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<table class="table table-bordered">'+
								'<thead>'+
									'<tr>'+
										'<th>坐值</th>'+
										'<th>右值</th>'+
										'<th>颜色</th>'+
									'</tr>'+
								'</thead>'+
								'<tbody>'+
									'<tr><td>1</td><td>2</td>'+
									'<td class="input-group colorpicker-demo2 input-group-addon"><input type="text" value="" class="form-control" style="display:none" /><span class="input-group-addon" style="border: 0px solid #E5E6E7;padding-top:3px;padding-bottom:3px;padding-left:6px;padding-right:6px; "><i></i></span></td></tr>'+
								'</tbody>'+
							'</table>'+
						'</div>'+
						
						'<div class="col-sm-12">'+
							'<div class="col-sm-6" style="padding-left:0;">'+
								'<div class="input-group">'+
									'<span class="input-group-addon">最小值:</span> '+
									'<input type="text" class="form-control" id="searchInput">'+
								'</div>'+
							'</div>'+
							
							'<div class="col-sm-6">'+
								'<div class="input-group">'+
									'<span class="input-group-addon">最大值:</span> '+
									'<input type="text" class="form-control" id="searchInput">'+
								'</div>'+
							'</div>'+
						'</div>'+
						
						'<div class="col-sm-12" style="padding-top:10px;">'+
							'<div class="col-sm-6" style="padding-left:0;">'+
								'<div class="input-group">'+
									'<span class="input-group-addon">间距:</span> <input type="text" class="form-control" id="searchInput">'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

//var grid_tuli = '<div id="SO2">'
var grid_num = {"BC":["0-0.1","0.1-0.5","0.5-1","1-2","2-5","5-10","10-15","15-20","20-25","25-30","30-40","40-50","50-60","60-80","&gt;80"],
				"CO":["0-0.1","0.1-0.5","0.5-1","1-2","2-5","5-10","10-15","15-20","20-25","25-30","30-40","40-50","50-60","60-80","&gt;80"],
				"NH3":["0-0.1","0.1-0.5","0.5-1","1-2","2-5","5-10","10-15","15-20","20-25","25-30","30-40","40-50","50-60","60-80","&gt;80"],
				"NOx":["0-0.5","0.5-1","1-5","5-10","10-20","20-30","30-40","40-50","50-60","60-80","80-100","100-200","200-300","300-1000","&gt;1000"],
				"OC":["0-0.1","0.1-0.5","0.5-1","1-2","2-5","5-10","10-15","15-20","20-25","25-30","30-40","40-50","50-60","60-80","&gt;80"],
				"PM10":["0-0.2","0.2-1","1-2","2-4","4-10","10-20","20-30","30-40","40-50","50-60","60-80","80-100","100-120","120-160","&gt;160"],
				"PM25":["0-0.1","0.1-0.5","0.5-1","1-2","2-5","5-10","10-15","15-20","20-25","25-30","30-40","40-50","50-60","60-80","&gt;80"],
				"VOC":["0-0.5","0.5-1","1-5","5-10","10-20","20-30","30-40","40-50","50-60","60-80","80-100","100-200","200-300","300-1000","&gt;1000"],
				"SO2":["0-0.1","0.1-0.2","0.2-0.5","0.5-1","1-2","2-3","3-4","4-5","5-10","10-20","20-50","50-100","100-500","500-1000","&gt;1000"]
				}

var grid_corlor = ["rgb(43,65,255)","rgb(56,109,255)","rgb(59,157,255)","rgb(48,207,255)","rgb(0,255,255)","rgb(112,255,210)","rgb(161,255,164)","rgb(199,255,120)","rgb(231,255,74)","rgb(255,255,0)","rgb(255,213,0)","rgb(255,166,0)","rgb(255,123,0)","rgb(255,77,0)","rgb(255,0,0)"];
var grid_wz = ["BC","CO","NH3","NOx","OC","PM10","PM25","VOC","SO2"]
function grid_tuli(){
	var html = '';
	$.each(grid_wz,function(j,o){
		html+='<div id="'+o+'" style=""><div class="row">';
		var str = grid_num[o];
			for(var i = 0 ; i < str.length; i++ ) {
				html+='<div class="col-sm-6"><div style="height:15px;width:20px;border:1px solid #57585A;background-color:'+grid_corlor[i]+'"></div></div><div class="col-sm-6">'+str[i]+'</div>'
			}
		html+='</div></div>'
		
	})
	console.log(html)
//	$("#grid_tuli").html(html);
	
}


//点的图例行业颜色
var point_type = '<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.电力+'"></div></div><div class="col-sm-8"><span></span>电力</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.工业锅炉+'"></div></div><div class="col-sm-8"><span></span>工业锅炉</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.民用燃烧+'"></div></div><div class="col-sm-8"><span></span>民用燃烧</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.玻璃+'"></div></div><div class="col-sm-8"><span></span>玻璃</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.独立焦化+'"></div></div><div class="col-sm-8"><span></span>独立焦化</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.钢铁+'"></div></div><div class="col-sm-8"><span></span>钢铁</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.化工化纤+'"></div></div><div class="col-sm-8"><span></span>化工化纤</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.水泥+'"></div></div><div class="col-sm-8"><span></span>水泥</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.其他工业企业+'"></div></div><div class="col-sm-8"><span></span>其他工业企业</div></div><br>'+
				'<div class="row" ><div class="col-sm-4"><div style="width:20px;height:20px;border-radius: 50%;background:'+color.机动车+'"></div></div><div class="col-sm-8"><span></span>机动车</div></div><br>';
$(".point_html").html(point_type);
//行业的选择
var hangye_type = ['电力','工业锅炉','民用燃烧','玻璃','独立焦化','钢铁','化工化纤','水泥','其他工业企业','机动车','飞机','船舶','非道移机械','工业喷涂','建筑涂料','印刷印染','农药使用','其他溶剂使用','氮肥使用','固氮植物','秸秆堆肥','人体粪便','畜禽养殖','土壤本底','道路扬尘','堆场扬尘','施工烟尘','土壤扬尘',
                   '生物质燃烧','生物质开放燃烧汽油储存','汽油储存','汽油运输','加油站','废水处理','固废处理','烟气脱硝','餐饮油烟'];
//前十个行业
var bumen_type = ["化石燃料固定燃烧源","工艺过程源","移动源","溶剂使用源","农业源","扬尘源","生物质燃烧源","储存运输员","废物处理源","其他排放源"];//部门
//部门对应的行业
var hangye_type1 = {"化石燃料固定燃烧源":['电力','工业锅炉','民用燃烧'],"工艺过程源":['玻璃','独立焦化','钢铁','化工化纤','水泥','其他工业企业'],"移动源":['机动车','飞机','船舶','非道移机械'],"溶剂使用源":['工业喷涂','建筑涂料','印刷印染','农药使用','其他溶剂使用'],
					"农业源":['氮肥使用','固氮植物','秸秆堆肥','人体粪便','畜禽养殖','土壤本底'],"扬尘源":['道路扬尘','堆场扬尘','施工烟尘','土壤扬尘'],"生物质燃烧源":['生物质燃烧','生物质开放燃烧汽油储存'],"储存运输员":['汽油储存','汽油运输','加油站'],"废物处理源":['废水处理','固废处理','烟气脱硝'],"其他排放源":['餐饮油烟']}
select_hagnye();
function  select_hagnye () {//选择行业
	var html ="";
	var html1 ="";
	var num = 0 ;
	$.each(bumen_type,function(g){
		var k = hangye_type1[bumen_type[g]];
		html += '<tr id="tr'+g+'"><td><div class="checkbox checkbox-info checkbox-right"><input type="checkbox" id="b'+g+'" value="'+bumen_type[g]+'" name="p" onclick="checked_bumen(\'tr'+g+'\')"><label for="b'+g+'">'+bumen_type[g]+'</label></div></td><td><div class="checkbox checkbox-info checkbox-right">';
		html1 += '<tr id="tr'+g+'"><td><div class="radio radio-info radio-inline"><input type="radio" id="bg'+g+'" value="'+bumen_type[g]+'" name="g" ><label for="bg'+g+'">'+bumen_type[g]+'</label></div></td><td><div class="radio radio-info radio-inline">';
		$.each(k,function(i,o){
			html += '<div class="col-sm-4"><input type="checkbox" id="w'+num+'" value="'+o+'" name="w" onclick="checked_hy(\'tr'+g+'\')"><label for="w'+num+'">'+o+'</label></div>';
			html1 += '<input type="radio" id="g'+num+'" value="'+o+'" name="g" ><label for="g'+num+'">'+o+'</label>';
			num++;
		})
		html += '</div></td></tr>'
	})

	$("#hangye_type").html(html);
	$("#hangye_grid").html(html1);
	$("input[name='g']").eq(0).attr("checked","checked");
	checked_hy();
}
var hy_num = 11 ; 
function checked_bumen(value){//选择部门
	chk_hy_value =[]; 
	var checked = $("#"+value+" input")[0].checked;
	var num = hy_num;
	for (var i = 1 ; i < $("#"+value+" input").length; i ++ ) {
		chk_hy_value =[];
		if ( checked ) {
			if($("#"+value+" input")[i].checked) {
			} else {
				$("#"+value+" input")[i].checked = checked;
				hy_num -- ;
			}
			$('input[name="w"]:checked').each(function(){ 
				chk_hy_value.push(""+$(this).val()+""); 
			});
			if(chk_hy_value.length >= 10 ) {
				hy_a();
				e();
				return;
			} else {
				hy_b();
				e();
			}
		} else {
			if($("#"+value+" input")[i].checked){
				$("#"+value+" input")[i].checked = checked;
				hy_num ++ ;
			}
		}
	}
	if (hy_num != 1 ) {
		hy_b();
	} else {
		hy_a();
	}
	$('input[name="w"]:checked').each(function(){ 
		chk_hy_value.push(""+$(this).val()+""); 
	});
	e();
}

shou_hangye();
//默认选中十个行业
function shou_hangye() {
	$.each(hangye_type,function(i,o){
		if(i < 10 ) {
			$('input[name="w"]:checkbox[value="'+o+'"]').prop("checked",true);
		}
	})
	$('input[name="p"]:checkbox[value="化石燃料固定燃烧源"]').prop("checked",true);
	$('input[name="p"]:checkbox[value="工艺过程源"]').prop("checked",true);
	$('input[name="p"]:checkbox[value="移动源"]').prop("checked",true);
	checked_hy();
}
/***************************选择地区code***********************************/
var showCode = [{}, {},{}];
var setting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback:{
			onCheck :function ( e , t , tr ) {
			      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			      if (tr.checked) {
			        if (tr.level == 0) {
			          level0(tr)
			        } else {
			          level12(tr)
			        }
			      } else {
			        if (tr.level == 0) {
			          delNode0(tr)
			        } else {
			          delNode12(tr)
			        }
			      }

			    }
		}
	};
$(document).ready(function(){
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
/**************************************************************************/
//选择行政区划转换成一维数组
function adCode(){
	var sfd = [];
	var num = 0;
	 for (var prop in showCode[0]) {
         if (showCode[0].hasOwnProperty(prop)) {
        	 sfd [num] = prop;
         }
         num ++;
       }
	 for (var prop in showCode[1]) {
		 for(var prop1 in showCode[1][prop] ) {
			 if (showCode[1][prop].hasOwnProperty(prop1)) {
	        	 sfd [num] = prop1;
	         }
			 num ++;
		 }
       }
	 return sfd;
}
//勾选取消省
function delNode0(node) {
	  delete showCode[node.level][node.id];
	  delete showCode[node.level + 1][node.id];
	  var ad = node.id;
	  var show = showCode[2];
	  for (var i in show) {
	    if (i == ad) {
	      delete showCode[2][i];
	    }
	  }
	}
//勾选取消市
function delNode12(node) {
  var parNode = node.getParentNode();
  if (!showCode[node.level][parNode.id]) {
    if (node.level == 1) {
      delNode0(parNode);
    } else {
      delNode12(parNode);
    }
    showCode[node.level][parNode.id] = {};
    var child = parNode.children;
    for (var n = 0; n < child.length; n++) {
      if (!child[n].chkDisabled) {
        showCode[node.level][parNode.id][child[n].id] = child[n].name;
      }
    }
  }
  delete showCode[node.level][parNode.id][node.id];
  if ($.isEmptyObject(showCode[node.level][parNode.id])) {
    delete showCode[node.level][parNode.id];
  }
}
//勾选选中省
function level0(node) {
	  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	  var nodesDis = treeObj.getNodesByParam('chkDisabled', true, node);
	  if (nodesDis.length == 0) {
	    showCode[node.level][node.id] = node.name;
	    delete showCode[node.level + 1][node.id];
	    for (var i = 1; i < showCode.length; i++) {
	      for (var a in showCode[i]) {
	        if (a.toString().substr(0, 2) == node.id.toString().substr(0, 2)) {
	          delete showCode[i][a];
	        }
	      }
	    }
	  } else {
	    var child = node.children;
	    for (var ch = 0; ch < child.length; ch++) {
	      if (!child[ch].chkDisabled) {
	        level12(child[ch])
	      }
	    }
	  }
	}
//勾选选中市
function level12(node) {
	  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	  var nodesDis = treeObj.getNodesByParam('chkDisabled', true, node);
	  var parNode = node.getParentNode();

	  if (nodesDis.length == 0) {
	    if (!showCode[node.level][parNode.id]) {
	      showCode[node.level][parNode.id] = {}
	    }
	    showCode[node.level][parNode.id][node.id] = node.name;
	    if (parNode.children.length == Object.keys(showCode[node.level][parNode.id]).length) {
	      delete showCode[node.level][parNode.id];
	      if (node.level == 1) {
	        level0(parNode);
	      } else {
	        level12(parNode);
	      }
	    }
	    if (node.level == 1) {
	      delete showCode[node.level + 1][node.id];
	    }
	  } else {
	    var child = node.children;
	    if (!showCode[node.level + 1][node.adcode]) {
	      showCode[node.level + 1][node.adcode] = {};
	    }
	    for (var ch = 0; ch < child.length; ch++) {
	      if (!child[ch].chkDisabled) {
	        showCode[node.level + 1][node.adcode][child[ch].adcode] = child[ch].name;
	      }
	    }
	  }
}
/*选择节点，控制勾选状态*/
function selectNode(node) {
  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
  var parNode = node.getParentNode();

  if (parNode) {
    treeObj.checkNode(parNode, true, false, false);
    var child = parNode.children;
    for (var c = 0; c < child.length; c++) {
      if (!child[c].checked) {
        treeObj.checkNode(parNode, false, false, false);
        if (parNode.getParentNode()) {
          treeObj.checkNode(parNode.getParentNode(), false, false, false);
        }
        break;
      }
    }
    if (parNode.checked) {
      var parparNode = parNode.getParentNode();
      if (parparNode) {
        treeObj.checkNode(parparNode, true, false, false);
        var proChild = parparNode.children;
        for (var c = 0; c < proChild.length; c++) {
          if (!proChild[c].checked) {
            treeObj.checkNode(parparNode, false, false, false);
            break;
          }
        }
      }
    }
  }
}