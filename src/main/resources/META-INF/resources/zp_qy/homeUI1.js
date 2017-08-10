var userId;//用户时间戳id
var industry;//行业类别
$(function() {
	$("#banner_qian").css("background","url(../../img/logo/"+css_photo+".png) no-repeat left center");
	
	$(document).attr("title","大气污染物排放清单编制与分析系统");
	
	var foouft = "<DIV class='contacts'>" +
		"<DIV class='title'>《大气污染物排放清单编制与分析系统》由&nbsp;&nbsp;&nbsp;&nbsp;清华大学&nbsp;&nbsp;&nbsp;&nbsp;建设运行并提供相关技术服务。</DIV>" +
		"</DIV>" +
		"<DIV style='clear: both;'></DIV>" +
		"<DIV class='copyrightinfo'><a href='http://www.cnemc.cn/' target='_blank'>中国环境监测总站</a></DIV>";
	
//	$("#foouft").html(foouft);
	var banner = "" +
		"<DIV id='users'>" +
		"<A style='cursor: default;'>";
		banner+="<FONT color='red'>"+userName+"</FONT></A></DIV>";
	$("#banner_qian").html(banner);
	
	$("#foouft").html(qiye_footer);
});
