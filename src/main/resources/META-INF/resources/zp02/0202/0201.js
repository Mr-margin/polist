jQuery.support.cors = true;
var version = "1.0";
$(function(){
	$("#data_1 .input-group.date").datepicker({
		endDate:'+0y',
		minViewMode : 2,
		startView : 1,
		keyboardNavigation : !1,
		forceParse : !1,
		autoclose : !0,
		format: "yyyy",
	})
	$("#data_2 .input-group.date").datepicker({
		startDate: '+2d',
		minViewMode: 0,
		todayBtn: "linked",
		keyboardNavigation: !1,
		forceParse: !1,
		autoclose: !0,
		format: "yyyy-mm-dd",
	});
	show_user();
});

var checkedObj = {};
//获取所有用户信息
function show_user (){
	var data = ajax_async_t(BackstageIP+"taskProvince/findProvinceUserManager.do",{userId:parent.dataBase.Login_map.SOLE},"json");
	if ( data != "" && data != null && data != undefined ) {
		
		var html = '<tr><th id="th_title" style="text-align:center;" width="10%" rowspan=""><div id="" class="checkbox checkbox-info">'+
					'<div class="row"><div class="col-sm-12" style="height:40px;"><input onclick="all_checkbox()" id="user_0" type="checkbox" value="全选"  name=""><label for="user_0" >目标下达用户</label> </div>'+
					'</div></div></th></tr>';
//		var html = '';
		var num = 1 ;
		$.each(data.data,function(i,item){
			
			if( i%4 == 0 ) {
				html+='<tr style="background-color: #fff;"><th><div id="user_select" class="checkbox checkbox-info"><div class="row">'
					num++;
			}
			html += '<div class="col-sm-3"><input onclick="onle_checked(\'user_checkbox'+i+'\')" id="user_checkbox'+i+'" type="checkbox" value="'+item.userId+'"  name="v1"> <label for="user_checkbox'+i+'">'+item.userName+'</label></div>';
			if((i+1)%4 == 0 ) {
				html+='</div></div></th></tr>'
				
			}
			if ( i == data.data.length-1){
				if((i+1)%4 == 0 ) {
				}else {
					html+='</div></div></th></tr>';
				}
			}
			checkedObj['user_checkbox'+i] = false;
		})
		$("#qy_tbody").html(html);
		$("#th_title").attr("rowspan",num);
	}else{
		toastr["info"]("错误信息", "未连接"+BackstageIP);
	}
}
//新建提交任务
function save(){
	var a=document.getElementsByName("v1");
	var chk_value =[]; 
	$('input[name="v1"]:checked').each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	if ( $("#renwu_name").val() == "" || $("#renwu_name").val() == null ) {
		toastr["info"]("提示","请填写任务名称");
		return ;
	}
	if ( $("#qdnf").val() == "" || $("#qdnf").val() == null ) {
		toastr["info"]("提示","请填写清单年份");
		return ;
	}
	if ( $("#rwjzrq").val() == "" || $("#rwjzrq").val() == null ) {
		toastr["info"]("提示","请填写任务截止日期");
		return ;
	}
	if ( chk_value.length == 0 ){
		toastr["info"]("提示","请选择用户");
		return ;
	}
	$("#zhezhao").show();//创建中
	$("#zhezhao_title").show();
	$.ajax({  		       
	    url: BackstageIP+'taskProvince/createTaskToCityUser.do',
	    type: "POST",
	    async:false,
	    dataType: 'json',
	    traditional : true,
	    data: {
	    	taskName:$("#renwu_name").val(),listYear:$("#qdnf").val(),endTime:$("#rwjzrq").val(),version:version,userIds:chk_value,ProvinceUserId:parent.dataBase.Login_map.SOLE},
	    success: function (data) {
	    	if(data.status=="success"){
	    		toastr["success"]("提示","新建成功");
	    		$("#renwu_name").val("");
	    		$("#qdnf").val("");
	    		$("#rwjzrq").val("");
	    		$(":checkbox").prop("checked",false);
	    		$("#zhezhao").hide();//创建中
	    		$("#zhezhao_title").hide();
	    		parent.resush('iframe2');
	    	} else if ( data.status == "fail" ) {
	    		$("#zhezhao").hide();//创建中
	    		$("#zhezhao_title").hide();
	    		toastr["info"]("错误信息",data.code);
	    	}
	    },
	    error: function (data) {
	    	toastr["info"]("错误信息",data.error);
	    }  
	})
}
//全选与全不选
function all_checkbox(){
	var checkbox = document.getElementById('user_0');
	  if(checkbox.checked){
		  $(":checkbox").prop("checked",true);
			for(var ce in checkedObj){
				checkedObj[ce] = true;
			}
	  }else{
		  $(":checkbox").prop("checked",false);
			for(var ce in checkedObj){
				checkedObj[ce] = false;
			}
	  }
}
function onle_checked(id){
	var checkbox = document.getElementById('user_0');
	var onlecheckbox = document.getElementById(id);
	if(onlecheckbox.checked){
		checkedObj[id] = true;
	}else{
		checkedObj[id] = false;
	}
	var i = 0;
	for(var ce in checkedObj){
		if(!checkedObj[ce]){
			i++;
			$(checkbox).prop("checked",false);
		}
	}
	if(!i){
		$(checkbox).prop("checked",true);
	}
	i=0;
}
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
//天数
function DateDiff(sDate1, sDate2){
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("/")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //轉換為12-18-2002格式
    aDate = sDate2.split("/")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24) //把相差的毫秒數轉抽象為天數
    return iDays
}
