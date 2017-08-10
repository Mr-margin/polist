function ajax_async_t(url,data,dataType,async){
	var rel;
	if(async==""||async==undefined){
		async=true;
	}else{
		async=false;
	}
	$.ajax({  		       
	    url: url,
	    type: "POST",
	    async:false,
	    traditional : true,
	    dataType: "json",
	    data: data,
	    success: function (ret) {
	    	if(ret.length==0){
//	    		toastr["warning"]("", "查询数据为空");
	    	}else{
	    		rel = ret;
	    	}
	    },
	    error: function (ret) { 
//	    	toastr["error"]("", "服务器异常或未查询到数据");
	    }  
	});
	return rel;
}
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

function ajax_async_hou(url,data,dataType,async){
	var rel;
	if(async==""||async==undefined){
		async=true;
	}else{
		async=false;
	}
	$.ajax({  		       
	    url: url,
	    type: "POST",
	    async:false,
	    dataType: dataType,
	    data: data,
	    success: function (ret) {
	    	if(ret.length==0){
//	    		toastr["warning"]("", "查询数据为空");
	    	}else{
	    		rel = ret;
	    	}
	    },
	    error: function (ret) { 
	    	toastr["info"]("错误信息", "服务器连接异常");
	    }  
	}); 
	return rel;
}
//var copyright = {"0101":{copy_nema:"成都市环境保护科学研究院",copy_tel:"028-87052171",copy_url:"http://www.cdaes.org.cn/",copy_support:"北京美科思远环境科技有限公司"}};

var copyright = {"5101":{copy_nema:"成都市环境保护科学研究院",copy_tel:"028-87052171",copy_url:"http://www.cdaes.org.cn/",copy_support:"北京美科思远环境科技有限公司",copy_eng:"CDAES"}};


var css_photo = "000000";//logo图片


/**************************************首页版权下标**********************************************************/
//总站
//var footer = 'Copyright@ 2010 CNEMC 京ICP 备05007617号    <a href="http://www.cnemc.cn/" target="_blank">中国环境监测总站</a>';
//成都
//var footer = 'Copyright@ 2010 CDAES  &nbsp;&nbsp;京ICP备16048585号&nbsp;&nbsp;<a href="http://www.cdaes.org.cn/" target="_blank">成都市环境保护科学研究院</a>&nbsp; 电话/传真：028-87052171';
//济南
var footer = 'Copyright@ 2010 <a target="_blank">济南市环境监测中心站</a>&nbsp;&nbsp;&nbsp;技术支持:清华大学&nbsp;&nbsp;北京美科思远环境科技有限公司&nbsp;&nbsp;&nbsp;济南市环境监测中心站';


/*******************************************进入系统页*******************************/
//总站
//var home_footer = 'Copyright@ 2010 CNEMC 京ICP 备05007617号  <a href="http://www.cnemc.cn/" target="_blank">中国环境监测总站</a>&nbsp;&nbsp;&nbsp;电话/传真：010-84949045&nbsp;&nbsp;&nbsp;技术支持：清华大学';
//成都
//var home_footer = 'Copyright@ 2010 CDAES <a href="http://www.cdaes.org.cn/" target="_blank">成都市环境保护科学研究院</a>&nbsp;&nbsp;&nbsp;电话/传真：028-8705217&nbsp;&nbsp;&nbsp;技术支持：北京美科思远环境科技有限公司';
//济南
var home_footer = 'Copyright@ 2010  <a target="_blank">济南市环境监测中心站</a>&nbsp;&nbsp;&nbsp;电话/传真：(0531)66608600 &nbsp;&nbsp;&nbsp;技术支持：清华大学&nbsp;&nbsp;北京美科思远环境科技有限公司&nbsp;&nbsp;&nbsp;济南市环境监测中心站';


/******************************************企业****************************/
//总站
//var qiye_footer = "<DIV class='contacts'><DIV class='title'>《大气污染物排放清单编制与分析系统》由&nbsp;&nbsp;&nbsp;&nbsp;清华大学&nbsp;&nbsp;"+
//"&nbsp;&nbsp;建设运行并提供相关技术服务。</DIV></DIV><DIV style='clear: both;'></DIV><DIV class='copyrightinfo'><a href='http://www.cnemc.cn/' target='_blank'>中国环境监测总站</a></DIV>"

//成都
//var qiye_footer = "<DIV class='contacts'><DIV class='title'>《大气污染物排放清单编制与分析系统》由&nbsp;&nbsp;&nbsp;&nbsp;清华大学&nbsp;&nbsp;北京美科思远环境科技有限公司"+
//"&nbsp;&nbsp;建设运行并提供相关技术服务。</DIV></DIV><DIV style='clear: both;'></DIV><DIV class='copyrightinfo'><a href='http://www.cdaes.org.cn/' target='_blank'>成都市环境保护科学研究院</a></DIV>"

//济南
var qiye_footer = "<DIV class='contacts'><DIV class='title'>《大气污染物排放清单编制与分析系统》由&nbsp;&nbsp;&nbsp;&nbsp;清华大学&nbsp;&nbsp;北京美科思远环境科技有限公司&nbsp;&nbsp;&nbsp;济南环境监测中心站"+
"&nbsp;&nbsp;建设运行并提供相关技术服务。</DIV></DIV><DIV style='clear: both;'></DIV><DIV class='copyrightinfo'><a href='http://www.jnepb.gov.cn/moudle/main.aspx' target='_blank'>济南市环保局</a></DIV>"

