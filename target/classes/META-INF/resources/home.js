jQuery.support.cors = true;
var user_id;//用户的级别
var user_state;//用户的状态
var user_list;//用户任务,在xtsy.js子页面中的任务列表接口get_list()赋值，1为有任务，0为无任务
var renwuINDEX = "";//市管理员任务管理中诊断审核点图中点的INDEX
var fu_equipId ="";//省级任务诊断审核逐源审核equipId有特殊字符
var fu_scc2 = ["电力","工业锅炉","民用燃烧","玻璃","独立焦化","钢铁","化工化纤","水泥","其他工业企业","机动车"];//排放分析电源图层中查看企业基本信息中的行业
var fu_customConditions;//排放分析中的自定义查询的条件
var fu_region;//排放分析中的地区选择
$(function () {
	$("#banner").css("background","url(img/logo/"+css_photo+".png) no-repeat left center");
	
	$("#foouft").html(home_footer);
	user_id = dataBase.Login_map.TYPE;
	if(dataBase.Login_map.TYPE=="4"||dataBase.Login_map.TYPE=="6" || dataBase.Login_map.TYPE =="7" ){
		if ( dataBase.Message_map !="" && dataBase.Message_map != null && dataBase.Message_map != undefined ) {
			 $("#u_name").html(dataBase.Login_map.USER_NAME+"&nbsp;&nbsp;"+dataBase.Message_map.OFFICE+":"+dataBase.Message_map.INFORMANT);
		 }
	} else if ( dataBase.Login_map.TYPE =="8" || dataBase.Login_map.TYPE =="10" ){
		$("#u_name").html(dataBase.Login_map.USER_NAME+"&nbsp;&nbsp;"+dataBase.Message_map.JURISDICTION+":"+dataBase.Message_map.INFORMANT);
	}else {
		if ( dataBase.Message_map !="" && dataBase.Message_map != null && dataBase.Message_map != undefined ) {
			 $("#u_name").html(dataBase.Login_map.USER_NAME+"&nbsp;&nbsp;"+dataBase.Message_map.NAME);
		 }
	}
	 
	
	$("#page-wrapper").css("margin","0px 0px 0px 0px");
	var	html="";	

	//-------此部分需要根据登录用户进行权限判断
	//验证登录用户为国家级,打开系统首页
//	$("#menu_h").show();//第一级菜单打开
	$("#iframe0").attr("src","xtsy.html");//主区域显示国家级系统首页
	$("#iframe0").attr("data-id","xtsy.html");//必须为data-id赋值，否则无法切换系统首页
	$("#HomePage").attr("data-id","xtsy.html");//修改首页页签的指向

	//-------此部分需要根据登录用户进行权限判断

	//各个菜单二级菜单
	
	
	//系统首页
	$("#xtsy").click(function () {
		$("#menu [href='#']").removeClass("cur");//一级菜单删除选中
		$("#xtsy").attr("class", "cur");//一级菜单添加选中
		$("#HomePage").click();
	});
	
	//任务管理
	$("#rwgl").click(function () {
//		$("#yijititle_pic").attr("src","zp01/style/rugl.png");//更换蓝色图标
		$("#yijititle_pic").attr("src","zp01/style/cd.png");//更换蓝色图标
		$("#menu [href='#']").removeClass("cur");//一级菜单删除选中
		$("#rwgl").attr("class", "cur");//一级菜单添加选中
		$(".dropdown11 .g").hide();//二级菜单隐藏
		$(".dropdown11 .renwuguanli").show();//二级菜单显示
		$("#left_m").show();//左侧区域显示
		$(".right_list").css("width","calc(100% - 222px)");//右侧区域调整宽度
	});
	//节点菜单的箭头效果
	$(".dropdown11 .cf").click(function () {
		var src = $(this).find('.jiantou_pic').attr('src');
		if(src=='img/1.png'){
			$(this).find('.jiantou_pic').attr('src', 'img/2.png');
		}else{
			$('.jiantou_pic').attr('src', 'img/2.png');
			$(this).find('.jiantou_pic').attr('src', 'img/1.png');
		}
	});
	
	//点击某个节点后，追加一层新的颜色样式
	$(".J_menuItem").click(function () {
		$(".dropdown11 A").removeClass("cur");
		$(this).attr("class", "cur");
	});
	
	//二级菜单控制
	$('.dropdown11').tendina({
		animate : true,
		speed : 500,
		openCallback : function($clickedEl) {
		},
		closeCallback : function($clickedEl) {
		}
	});
//	show_copyright();//版权
});

function GetRequest() { //截取URL的方法
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
		}
	}
	return theRequest;
}

//遍历tab标签,找到要关闭的页签
function findtab(subsector){
	if ( subsector == "" || subsector == "undefined" || subsector ==null ) return toastr["info"]("您没有填报任务");
		else return toastr["info"]("您没有"+subsector+"填报任务");
}

//遍历tab标签中有没有任务列表这个页签，有的话，打开新的任务列表页面
function clickRefresh(){
	$(".page-tabs-content").find("a").each(function(){
		if(this.text == "任务列表 "){//找到任务列表
			$(this).find("i").click();//关闭任务列表
			$("#renwuguanli").find("a").each(function(){
				if(this.href.indexOf("polist/zp02/0201/0202.html")>-1){
					$(this).click();//点击任务列表a标签，打开新的任务列表页面
				}
			});
		}
	});
}
//关闭编辑任务页签
function closeRefresh(){
	$(".page-tabs-content").find("a").each(function(){
		if(this.text == "编辑任务 "){//找到编辑任务
			$(this).find("i").click();//关闭编辑任务
			$("#renwuguanli").find("a").each(function(){
				if(this.href.indexOf("polist/zp02/0201/0202.html")>-1){
					$(this).click();//点击任务列表a标签，打开新的任务列表页面
				}
			});
		}
	});
}



//切换全屏效果
function switch_Full_screen(){
	if($('#banner').is(':visible')){
		$('#banner').hide();
		$('#menu').hide();
		$('#left_m').hide();
		$(".right_list").css("width","calc(100%)");//右侧区域调整宽度
		$("#zhu_floor").css("height","calc(100% - 37px)");
	}else{
		$('#banner').show();
		$('#menu').show();
		$('#left_m').show();
		$(".right_list").css("width","calc(100% - 222px)");//右侧区域调整宽度
		$("#zhu_floor").css("height","calc(100% - 190px)");
	}
}

//遍历tab标签
function bianli(){
	$(".page-tabs-content").find("a").each(function(){
		if($(this).hasClass('active')){
			var info = this.attributes[1].value;
			if(info!="zp06/01home.html"){//排除主页的按键
				var words = info.split("/");//获取“/” 分隔下的数组集合
				var Array_last = words[words.length-1];//取最后一个数组
				if(Array_last=="Key-point-source"||Array_last=="Sector-distribution"||Array_last=="Region-distribution"){//排放分析
					$("#menu_"+user_state+"_3").click();
					if(user_id!=4&&Array_last!="Key-point-source"){
						$("#subsector5_1_"+user_id).click();
					}
				}else{
					a:for(i=0; i<words.length; i++){//遍历url分隔的数组集合
						if(words[i].indexOf("zp")>-1){//当其一个中出现zp时，进行判断操作
							if(words[i]=="zp01"){//数据填报
								if(user_id==3){
									$("#menu_h_6").click();
								}else if(user_id==4){
									$("#menu_t_1").click();
								}
								break a;
							}
							if(words[i]=="zp02"){//数据收集
								$("#menu_"+user_state+"_1").click();
								break a;
							}
							if(words[i]=="zp03"){//数据诊断
								if(user_id==1||user_id==2){
									$("#menu_"+user_state+"_1").click();
								}else if(user_id==3){
									$("#menu_h_7").click();
								}else if(user_id==4){
									$("#menu_t_2").click();
								}
								break a;
							}
							if(words[i]=="zp04"){//清单管理
								$("#menu_"+user_state+"_2").click();
								break a;
							}
						}
					};
					ejcd(info);
				}
			}else{
				$("#menu_"+user_state).find("a").each(function(){
					if($(this).hasClass('avtion')){
						$(this).removeClass('avtion');
						$("#left_lan").hide();
						$("#page-wrapper").css("margin","0px 0px 0px 0px");
						$(".nav ."+user_state).hide();
					}
				});
			}
		}
	});
}
//点击标题，打开对应的二级节点
function ejcd(url_a){
	var url_2;
	$("."+user_state).find("a").each(function(){
		url_2=$(this).attr("href");
		if(url_2!=undefined){
			if(url_2==url_a){
				$("."+user_state).find("ul").each(function(){
					$(this).parent().removeClass('active');
					$(this).removeClass('in');
				});
				$(this).parent().parent().parent().addClass('active');
				$(this).parent().parent().addClass('in');
				$(this).css({ color: "#fff", background: "#607d96" });//自己变藏青色
			}
		}
	});
}

//关闭清单编制
function close_wicket(str){
	$(".page-tabs-content").find("a").each(function(){
		if(this.text == str+" "){
			$(this).find("i").click();
		}
	});
}
//关闭排放版本管理之前进行提示
function hint() {
	toastr["info"]("没有查询到排放版本管理数据...请稍后再试");
}
function close_hint() {
	toastr.clear();
}
//版权
function show_copyright() {
	var copy_region = dataBase.Login_map.REGION.substring(0,4);
	if(copyright[copy_region] != "" && copyright[copy_region] != null && copyright[copy_region] != undefined){
		var str = copyright[copy_region];
		$("#copyright").html('Copyright@ 2010 '+str.copy_eng+' <a href="'+str.copy_url+'" target="_blank">'+str.copy_nema+'</a>&nbsp;&nbsp;&nbsp;技术支持：清华大学&nbsp;&nbsp;'+str.copy_support);
//		$("#copyright").html('Copyright@ 2010 '+str.copy_eng+' <a href="'+str.copy_url+'" target="_blank">'+str.copy_nema+'</a>&nbsp;&nbsp;&nbsp;电话/传真：'+str.copy_tel+'&nbsp;&nbsp;&nbsp;技术支持：清华大学&nbsp;&nbsp;'+str.copy_support);
	}
}


window.onbeforeunload=onclose;
//function onclose (){
//	var sole = "";
//	if(typeof window.sessionStorage.getItem("sole") != "undefined"){
//		sole =  window.sessionStorage.getItem("sole") 
//	} else {
//		sole = seesion_sole;
//	}
//	var out = ajax_async_t("../../polist/onclose.do",{userId:sole},"json");
//}