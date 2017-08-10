jQuery.support.cors = true;
$(function () {
	shouye();
	$("#yijititle_pic").attr("src","zp01/style/cd.png");//更换蓝色图标
	$("#menu [href='#']").removeClass("cur");//一级菜单删除选中
	$("#rwgl").attr("class", "cur");//一级菜单添加选中
	$(".dropdown11 .g").hide();//二级菜单隐藏
	$(".dropdown11 .renwuguanli").show();//二级菜单显示
	$("#left_m").show();//左侧区域显示
	$(".right_list").css("width","calc(100% - 200px)");//右侧区域调整宽度
});
//动态菜单
function shouye () {
	var html2 = '' ;
	var data = ajax_async_t("menu.do",{level:1,city_or_all:city_or_all},"json");
	if( data != "" && data != null && data != undefined ) {
		$.each(data,function(i,item){
			var html_li = "";
			var span='';
			var clss="";
			if(item.url=="" || item.url == null || item.url == undefined ) {
				
				if(item.level_xia.length>0){
					span='<span><IMG class="jiantou_pic" src="img/2.png"></span>';
					clss = "cf";
				}else {
					clss = "J_menuItem";
				}
				
				html_li = '<ul style="display:none;">';
				html2 += '<A class="'+clss+'" href="#">'+item.m_name+span+'</A>';
				$.each(item.level_xia,function(j,items){
					html_li += '<li><a class="J_menuItem" href="'+items.url+'" >'+items.m_name+'</a></li>';
				});
				html_li += '</ul>';
			} else {
				if(item.level_xia.length>0){
					span='<span><IMG class="jiantou_pic" src="img/2.png"></span>';
					clss = "cf";
				}else {
					clss = "J_menuItem";
				}
				html2 += '<A class="'+clss+'" href="'+item.url+'">'+item.m_name+span+'</A>';
			}
			
			html2 += html_li+'</ul>';
		});
	}
	$("#renwuguanli").html(html2);
}
 

/**
 * 刷新子页面
 */
function  resush(name){
	try {
		window.frames[name].location.reload(true)
	} catch (e) {
		console.log(e);
	}
}
