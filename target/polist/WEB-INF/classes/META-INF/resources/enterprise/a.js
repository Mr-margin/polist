var _hmt = _hmt || [];
$(function() {
	$('.dropdown').tendina({
		animate : true,
		speed : 500,
		openCallback : function($clickedEl) {
		},
		closeCallback : function($clickedEl) {
		}
	})
});

!function() {
	require.async([ 'common:widget/sidebar/sidebar.js' ], function(
			Sidebar) {
		$(function() {
			$("#sideLogin").attr("onclick",
					$("#login").attr("onclick"));
			var sidebar = new Sidebar();
			sidebar.init();
		});
	});
}();

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.parent.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; //返回参数值
}

function MM_changePropForZxlx(objId, theProp, theValue) { //v9.0
	var obj = null;
	with (document) {
		if (getElementById)
			obj = getElementById(objId);
	}
	if (obj) {
		if (theValue == true || theValue == false)
			eval("obj.style." + theProp + "=" + theValue);
		else
			eval("obj.style." + theProp + "='" + theValue + "'");
	}
}

function MM_changeProp(objId, x, theProp, theValue, curType) { //v9.0
	if (curType != "") {
		$("#ky").attr("src",
				"../login/login.html?curType=" + curType);
	}
	var obj = null;
	with (document) {
		if (getElementById)
			obj = getElementById(objId);
	}
	if (obj) {
		if (theValue == true || theValue == false)
			eval("obj.style." + theProp + "=" + theValue);
		else
			eval("obj.style." + theProp + "='" + theValue + "'");
	}

}

function iframeFarword(obj, url, height, blank, curType, menuName) {
	loginTip(menuName, curType);
}

function iframeFarword2(obj, url, height) {
	$(".right_list").html("<iframe src=\""+url+"\" id=\"contentR\" height=\""+height+"px\" width=\"935px\" frameborder=\"0\" scrolling=\"no\"></iframe>")
	$("#nal li a").removeClass("cur");
	$(obj).addClass("cur");
}

function loginTip(menuName, curType) {
	$("#dialog-hint").dialog({
		autoOpen : false,
		modal : false,
		resizable : false,
		position : 'center',
		hide : 'fade',
		bgiframe : false,
		width : '400',
		buttons : {
			"确定" : function() {
				$(this).dialog("close");
				MM_changeProp('fudong', '', 'display', 'block', curType);
			}
		}
	});
	$("#menuName").html(menuName);
	$("#dialog-hint").dialog("open");
}

function loginCert() {
	$("#dialog-cert").dialog({
		autoOpen : false,
		modal : false,
		resizable : false,
		position : 'center',
		hide : 'fade',
		bgiframe : false,
		width : '400',
		buttons : {
			"确定" : function() {
				location.reload();
			}
		}
	});
	$("#dialog-cert").dialog("open");
}

function loginChange(curType) {
	$("#dialog-change").dialog({
		autoOpen : false,
		modal : false,
		resizable : false,
		position : 'center',
		hide : 'fade',
		bgiframe : false,
		width : '400',
		buttons : {
			"是" : function() {
				$("#dialog-change").dialog("close");
				MM_changeProp('fudong', '', 'display', 'block', curType);
			},
			"否" : function() {
				$("#dialog-change").dialog("close");
			}
		}
	});
	$("#dialog-change").dialog("open");
}

function openW(url) {
	window
			.open(
					url,
					'国家科技管理信息系统公共服务平台',
					'directories=no,left=100,resizable=no,top=100,width=920,titlebar=yes,scrollbars=yes,status=yes,location=no');
}