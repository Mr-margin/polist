$(function(){
	$("#editArea").modal();
})
/*全局变量*/
var totalWidth, totalDate, startDate, qjMsg;
var index, indexPar, handle, minLeft, maxLeft, selfLeft, startX, leftWidth, rightWidth;
var allData = [];
var areaIndex, timeIndex;
var showCode = [{}, {},{}];
var zTreeSetting = {
  check: {
    enable: true,
//				autoCheckTrigger:true,
    chkboxType: {"Y": "ps", "N": "ps"}, //设置父子联动
    chkDisabledInherit: true //是否沿用disabled
  },
  data: {
    simpleData: {
      enable: true,     //简单数据模式
      idKey: "id",
      pIdKey: "pId" //子父级关系对照
    },
    key: {
      name: 'name',
    }
  },
  callback: {
    onCheck: function (e, t, tr) {
      var treeObj = $.fn.zTree.getZTreeObj("adcodeTree");

      if (tr.checked) {

        if (tr.level == 0) {
          level0(tr)
        } else {
          level12(tr)
        }
        console.log(showCode)
      } else {
        if (tr.level == 0) {
          delNode0(tr)
        } else {
          delNode12(tr)
        }
        console.log(showCode)
      }

    }
  }
};
var zTreeData;
initZTree();  //初始化zTree数据
/*初始化zTree数据*/
function initZTree() {
	zTreeData = ajax_async_t(BackstageIP+"showCountryList/treeRegion",{"":""},"json");
}

$.fn.zTree.init($("#adcodeTree"), zTreeSetting, zTreeData);
/*zTree相关方法*/
/*选择节点，控制勾选状态*/
function selectNode(node) {
  var treeObj = $.fn.zTree.getZTreeObj("adcodeTree");
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
function level0(node) {
  var treeObj = $.fn.zTree.getZTreeObj("adcodeTree");
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

function level12(node) {
	  var treeObj = $.fn.zTree.getZTreeObj("adcodeTree");
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

