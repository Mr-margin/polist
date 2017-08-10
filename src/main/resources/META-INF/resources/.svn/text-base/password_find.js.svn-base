var loginname=$('#loginname');
//var code=$('#code');
var codeimg=$('#codeimg');
var pcid=$('#pcid');
var btn=$('#btn');
var errortip=$('#errortip');
var tipspan=$('#tip_span');
var codemsg=$('#codemsg');
var codep=$('#codep');
var licon=$('#licon');
var entry = "sso";
$(function(){
		changecode()
		$("#btn1").hide();
		$('#change_code').on('click', function () {
	        $('#codespan').attr('class','hid');
	        changecode();
	    });
	    loginname.on('focus',function(){
	        $('#tip_span').attr('class','hid');
	    });
	   /* code.on('focus',function(){
	        $('#codespan').attr('class','hid');
	    });*/
	    $('#btn').on('click', function () {
	        if(!loginname.val()){
	            errortip.html('请输入登录名');
	            $('#tip_span').attr('class','form_prompt');
	            return;
	        }
	        if(!$("#checkcode1").val()){
	            codemsg.html('请输入验证码');
	            codep.attr('class','W_icon icon_rederrorS');
	            $('#codespan').attr('class','form_prompt');
	            return;
	        }
	        checkmail();
	    });
})

function checkmail() {
	var email=$("#loginname").val();
	var ut=$("#ut").val();
	var data = ajax_async_t("yzm.do",{zhi:$("#checkcode1").val()},"json");
	if(data=="1"){
		var data = ajax_async_t("forgetPassword_Controller.do",{email:email,userType:ut},"json");
		if(data=="1"){
			errortip.html('');
			codemsg.html('');
			$("#t1").html("填写验证码");
			$("#btn").hide();
			$("#btn1").show();
			$(".a1").hide();
			$("#info").show();
			$("#checkcode1").hide();
			$("#checkcode2").show();
			$("#checkcode1").val("");
			$("#login1").show();
			$("#login1").html("验证码以发送到您的邮箱("+email.substring(0,6)+"***)，验证后修改密码");
		}else{
			 errortip.html('没有账号与此邮箱关联');
	            $('#tip_span').attr('class','form_prompt');
		}
	}else{
		codemsg.html('验证码输入错误');
        codep.attr('class','W_icon icon_rederrorS');
        $('#codespan').attr('class','form_prompt');
	}
}   
function checkcode1(str) {
	
	var data = ajax_async_t("checkyzm_Controller.do",{zhi:$("#checkcode2").val()},"json");
	if(data=="1"){
		$("#checkinfo").hide();
		$("#changepwd").show();
		$("#t1").html("创建新密码");
	}else{
		codemsg.html('验证码输入错误');
        codep.attr('class','W_icon icon_rederrorS');
        $('#codespan').attr('class','form_prompt');
        return;
	}
} 

function changecode(){
	codeimg.attr("src", "img.do?timestamp=" + (new Date()).valueOf());
}
function confirmc(){
	var newpwd=$("#newpwd").val();
	var cpwd=$("#confirmpwd").val();
	if(newpwd.length<6){
		swal({
			title: "密码错误",
			text: "密码长度不能小于六位",
			type: "error"
		})
		return;
	}else if(newpwd!=cpwd){
		swal({
			title: "输入错误",
			text: "两次输入不同",
			type: "error"
		})
		return;
	}
	var data = ajax_async_t("changePassword.do",{new_password:newpwd},"json");
	if(data=="1"){
		swal({
			title: "修改成功",
			text: "修改成功",
			type: "success"
		},function(){
			window.location.href="index.html"
	});
	}else{
		
	}
}