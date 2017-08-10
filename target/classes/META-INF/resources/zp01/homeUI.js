var userId;//用户时间戳id
var industry;//行业类别
$(function() {
	userId=dataBase.Login_map.SOLE;
	if( dataBase.Message_map !="" && dataBase.Message_map != null && dataBase.Message_map != undefined ) {
		if(dataBase.Message_map.INDUSTR != "" && dataBase.Message_map.INDUSTR != null && dataBase.Message_map.INDUSTR != undefined ) {
			industry = dataBase.Message_map.INDUSTRY;
		} else {
			industry = "" ;
		} 
	} else {
		industry = "" ;
	}
	
	$(document).attr("title","大气污染物排放清单编制与分析系统");
	var banner = "" +
			"<DIV id='users'>" +
			"<A id='out_login' onClick=''>退出</A>" +
			"<A id='update_password' onClick=''>修改密码</A>" +
			"<A style='cursor: default;'>";
			if ( dataBase.Message_map != "" && dataBase.Message_map != null && dataBase.Message_map != undefined) {
				banner+="<FONT color='red'>"+dataBase.Login_map.USER_NAME+"&nbsp;&nbsp;"+dataBase.Message_map.NAME+"</FONT></A>" ;
			} else {
				banner+="<FONT color='red'>"+dataBase.Login_map.USER_NAME+"</FONT></A>" ;
			}
			"</DIV>";
	$("#banner_qian").html(banner);
	
	var goTop = "<li class='item qr-code side1 button-rotate' data-text='填报说明'><a>填报说明</a></li>" +
		"<li class='qr-code-container clearfix' style='display: none;height: 205px'>" +
		"	<span class='item-container right'>" +
		"	<ul><li>（1）首次填报的用户，请您阅读<a href='' target='_blank' style='font-size:14px;cursor: pointer;color:#4f87d1;text-decoration: none;'>“帮助信息”</a>。</li>" +
		"	<li>（2）若您已了解填报过程，且尚未进行单位备案，请首先进行<a href='' target='_blank' style='font-size:14px;cursor: pointer;color:#4f87d1;text-decoration: none;'>“用户注册”</a>进行单位备案。</li>" +
		"	<li>（3）若您已了解填报过程，且单位已备案，请您点击<a onclick='' style='font-size:14px;cursor: pointer;color:#4f87d1;text-decoration: none;'>“用户登录”</a>进行申报工作。</li>" +
		"	<li>（4）登录系统后，请您点击“填报”进行申报工作</li>" +
		"	<li>（5）如填报项目任务书，请您点击“项目申报”——“已立项项目管理”进行填报工作</li></ul></span></li>" +
		"<li class='item side2 button-rotate' data-text='常见答疑'><a href='javascript:void(0);' target='_blank'>常见答疑</a></li>" +
		"<li class='item favorite side3 button-rotate' data-text='收藏本站'><a>收藏本站</a></li>" +
		"<li class='item gotop' style='display: none;'><a title='返回顶部' onclick='window.scroll(0, 0);'></a></li>" +
		"<li class='close-tip'>收起<i class='arrow'></i></li>";
	$("#goTop").html(goTop);
	
	var foouft = "<DIV class='contacts'>" +
		"<DIV class='title'>《大气污染物排放清单编制与分析系统》由&nbsp;&nbsp;&nbsp;&nbsp;清华大学&nbsp;&nbsp;&nbsp;&nbsp;建设运行并提供相关技术服务。</DIV>" +
		"</DIV>" +
		"<DIV style='clear: both;'></DIV>" +
		"<DIV class='copyrightinfo'><a href='http://www.cnemc.cn/' target='_blank'>中国环境监测总站</a></DIV>";
	$("#foouft").html(foouft);
	show_copyright();
	
});
//版权
function show_copyright() {
	$("#foouft").html(qiye_footer);
	return ;
	var copy_region = dataBase.Login_map.REGION.substring(0,4);
	if(copyright[copy_region] != "" && copyright[copy_region] != null && copyright[copy_region] != undefined){
		var str = copyright[copy_region];
		var foot = "<DIV class='contacts'>" +
					"<DIV class='title'>《大气污染物排放清单编制与分析系统》由&nbsp;&nbsp;&nbsp;&nbsp;清华大学&nbsp;&nbsp;"+str.copy_support+"&nbsp;&nbsp;建设运行并提供相关技术服务。</DIV>" +
					"</DIV>" +
					"<DIV style='clear: both;'></DIV>" +
					"<DIV class='copyrightinfo'><a href='"+str.copy_url+"' target='_blank'>"+str.copy_nema+"</a></DIV>";
				$("#foouft").html(qiye_footer);
	}
}

