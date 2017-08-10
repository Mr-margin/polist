/**
 * Created by LC on 2017/8/7.
 */
jQuery.support.cors = true;
$.validator.addMethod("zh", function(value, element) {
    var tel = /^\w+$/;
    return this.optional(element) || (tel.test(value));
}, "<i class='fa fa-times-circle'></i>只能填写英文字母、数字和下划线");
$.validator.addMethod("mc", function(value, element) {
    var zh = /^[\u0391-\uFFE5\w]+$/;
    return this.optional(element) || zh.test(value);
}, "<i class='fa fa-times-circle'></i>只能使用中文字、英文字母、数字和下划线");
$.validator.addMethod('mobile', function( value, element ){
    var dh=/^((0\d{2,3}-?\d{6,8})|(1[35847]\d{9}))$/;
    return this.optional( element ) || dh.test( value );
}, "<i class='fa fa-times-circle'></i>请输入正确的联系方式");
$.validator.addMethod("chinese", function(value, element) {
    var chinese = /^[\u4e00-\u9fa5]+$/;
    return this.optional(element) || (chinese.test(value));
}, "<i class='fa fa-times-circle'></i>只能输入中文");
$.validator.addMethod("email", function(value, element) {
    var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/  ;
    return this.optional(element) || (email.test(value));
}, "<i class='fa fa-times-circle'></i>请输入正确的email");

$(function(){
    hq_szdq();//所在地区
    getAllRw();//获取所有任务下拉菜单
    fz_hylb("classdiqu");//为用户类别赋值
    level=dataBase.Login_map.TYPE;
    $("#szdw_1").height($("#szdw_2").height());
    // metTable_initialization();//tab1表格
    metTable_initialization_2();//tab2表格
    //validate实时验证
    $("#add_Form").validate({
        onfocusout: function(element){
            $(element).valid();
        }
    });
});

//调用父页面的全局变量
var dataBase = parent.dataBase;
var version = "1.0";
var seesion_sole;
var userId;
var dataTypeTj;
var level;
//存放负责行业的json，每次进行临时操作的时候，暂时存放到这个表格中，点击保存操作的时候，就将这个传到后台
var fzhy_map = {
    createUserId:dataBase.Login_map.SOLE,
    mappings:[]
};

$('#qy_zhuantai').on('change',function (e) {
    var value = $(e.target).val();
    $('#qy_tianbao').empty();
    $('#qy_tianbao').append($('<option value="-1">全部</option>'));
    if(value == 'WAIT_COMMIT' || value == 'REJECT'){
        $('#qy_tianbao').append($('<option value="1">未填报</option>'));
        $('#qy_tianbao').append($('<option value="2">进行中</option>'));
    }else if(value == 'ALL'){
        $('#qy_tianbao').append($('<option value="1">未填报</option>'));
        $('#qy_tianbao').append($('<option value="2">进行中</option>'));
        $('#qy_tianbao').append($('<option value="3">已完成</option>'));
    }else{
        $('#qy_tianbao').append($('<option value="3">已完成</option>'));
    }
})

//获取所有任务下拉菜单
function getAllRw() {
    var data = ajax_async_t(BackstageIP+"fillUser/showTasks",{cityRegion:dataBase.Login_map.REGION,fillId:dataBase.Login_map.SOLE},"JSON","1","POST");
    if(data !=undefined&&data!=null&&data!=""){
        if(data.status=="success"){
            if(data.data.length>0){
                $('#select_1').empty();
                // $('#select_1').append($('<option value="-1">无</option>'));
                $.each(data.data,function (i, vol) {
                    $('#select_1').append($('<option value="'+ vol.taskId +'">'+ vol.taskName +'</option>'));
                })
                getSelectRwHy($('#select_1').val())//获取该任务下所有行业
            }
        }else{
            toastr["info"]("错误信息",'')
        }
    }else{
        toastr["info"]("错信息","无返回值");
    }
}

function changeRw() {
    getSelectRwHy($('#select_1').val());
}

//获取任务下所有行业
function getSelectRwHy(taskId) {

    if(taskId == "-1"){
        $('#select_2').empty();
        $('#select_2').append($('<option value="-1">全部</option>'));
    }else{
        var data = ajax_async_t(BackstageIP+"fillUser/showIndustrys",{cityRegion:dataBase.Login_map.REGION.substr(0,4),taskId:taskId},"JSON","1","POST");
        if(data !=undefined&&data!=null&&data!=""){
            if(data.status=="success"){
                if(data.data.length>0){
                    $('#select_2').empty();
                    $('#select_2').append($('<option value="-1">全部</option>'));
                    $.each(data.data,function (i, vol) {
                        $('#select_2').append($('<option value="'+ vol.PKID +'">'+ vol.INDUSTRY +'</option>'));
                    })
                }
            }else{
                toastr["info"]("错误信息",data.status,data.error)
            }
        }else{
            toastr["info"]("错信息","无返回值");
        }
    }
}

var countyName = "";
//获取账号列表中的所在地区
function hq_szdq(){
    var html = "<div class='checkbox checkbox-info' style='margin:1px'>";
    var html_2 = "<option value=''>请选择</option>";
    var data = ajax_async_t(BackstageIP+"fillUser/findRegion ",{region:dataBase.Login_map.REGION.substr(0,4)},"JSON","1","POST");
    html+="<input type='checkbox' id='q' value='q' name='q' onClick='all_checkbox()' checked><label for='q' style='width:6%;'>全选</label>";

    if(data !=undefined&&data!=null&&data!=""){
        if(data.status=="success"){
            if(data.data.length>0){
                for(var i=0; i<data.data.length; i++){
                    html += "<input id='checkbox"+i+"' type='checkbox' onclick='notallsel();' value='"+data.data[i].REGIONID+"' name='classdiqu'>";
                    html += "<label for='checkbox"+i+"' style='width:6%;'>"+data.data[i].REGIONNAME+"</label>";
                    html_2 += "<option value='"+data.data[i].REGIONID+"'>"+data.data[i].REGIONNAME+"</option>";

                    if(i != 0){
                        countyName += ",";
                    }
                    countyName += data.data[i].REGIONNAME;
                }
                html += "</div>";
            }
        }else{
            toastr["info"]("错误信息",data.error)
        }
    }else{
        toastr["info"]("错信息","无返回值");
    }
    $("#szdq_2").html(html);
    $("#in_region").html(html_2);
    $("#sel_xian").html(html_2);
}

//全选行业类别/所在地区
function fz_hylb(name){
    var ids="";
    if(name=="qy_hymc") ids = "hylb_2";
    else ids = "szdq_2";
    $("#"+ids+" input[name='"+name+"']").prop("checked","true");
    $("#"+ids+" input[name='"+name+"']").parent(".icheckbox_square-green").addClass("checked");
}

//全选 选项联动
function notallsel(){
    var checkList = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
        return $(elem).val();
    }).get().join(',');
    var regionList = $("input:checkbox[name='classdiqu']").map(function(index,elem) {
        return $(elem).val();
    }).get().join(',');
    var regionSize = regionList.split(",");
    if(checkList != ""){
        var checkSize = checkList.split(",")
        if(regionSize.length == checkSize.length){
            $("#q").prop("checked","true");
            $("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").addClass("checked");
        }else{
            $("#q").removeAttr("checked");
            $("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
        }
    }else{
        $("#q").removeAttr("checked");
        $("#q").parent(".icheckbox_square-green").parent(".icheckbox_square-green").removeAttr("checked");
    }

}

//全选与全不选
function all_checkbox(){
    var checkbox = document.getElementById('q');
    if(checkbox.checked){
        $("input:checkbox[name='classdiqu']").prop("checked",true);
    }else{
        $("input:checkbox[name='classdiqu']").prop("checked",false);
    }
}

var table_data;

var change_flag=[];

//点击查询2
function chaxun_2(){

    if($('#dcy').val() == ''){
        $('#delDcy').hide();
        $('#addDcy').show();
    }else{
        $('#addDcy').hide();
        $('#delDcy').show();
    }

    var dw_value1 = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
        return $(elem).val();
    }).get();
    if(dw_value1.length<1){
        toastr["info"]("至少选择一个地区");
        return;
    }
    var dw_value2 = $("input:checkbox[name='qyzt']:checked").map(function(index,elem) {
        return $(elem).val();
    }).get();
    if(dw_value2.length<1){
        toastr["info"]("至少选择一个企业等级");
        return;
    }
    $('#metTable2').bootstrapTable('destroy');//销毁表格数据
    metTable_initialization_2();
}
//关闭模态窗
function quxiaomtk(){
    $("#creat_modal").modal("hide");

    $("#userid").val("");
    $("#tbr_in").val("");
    $('#szdw_in').val("");
    $("#szks_in").val("");
    $("#lxdh_in").val("");
    $("#yx_in").val("");
    $("#tbr_in-error").hide();
    $('#szdw_in-error').hide();
    $("#lxdh_in-error").hide();
    $("#yx_in-error").hide();
}

// //ajax通用方法
// function ajax_async_t(url,data,dataType,async,type){
//     var rel;
//     if(async==""||async==undefined){
//         async=true;
//     }else{
//         async=false;
//     }
//     $.ajax({
//         url: url,
//         type: 'POST',
//         async:false,
//         dataType: dataType,
//         data: data,
//         success: function (ret) {
//             rel = ret;
//         },
//         error: function (e) {
//             toastr["info"]("错误信息", "服务器异常："+url);
//         }
//     });
//     return rel;
// }

//数据初始化
function metTable_initialization_2(){
    $('#metTable2').bootstrapTable({
        method: 'POST',
        url: BackstageIP+'fillUser/showCompany',
        dataType: "json",
        iconSize: "outline",
        clickToSelect: true,//点击选中行
        pagination: true,	//在表格底部显示分页工具栏
        pageSize: 10,	//页面大小
        pageNumber: 1,	//页数
        pageList: [10],
        striped: true,	 //使表格带有条纹
        sidePagination: "server",//表格分页的位置 client||server
        queryParams: queryParams_2, //参数
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        silent: true,  //刷新事件必须设置
        contentType: "application/x-www-form-urlencoded",	//请求远程数据的内容类型。
        onClickRow: function (row, $element) {
            $('.success').removeClass('success');
            $($element).addClass('success');
            userId = row.companyId;
            dataTypeTj = row.status;
        },
        icons: {
            refresh: "glyphicon-repeat",
            toggle: "glyphicon-list-alt",
            columns: "glyphicon-list"
        }});
}
//配置参数
function queryParams_2(params) {
    var dw_value1 = $("input:checkbox[name='classdiqu']:checked").map(function(index,elem) {
        return $(elem).val();
    }).get().join(",");//所选地区
    var dw_value2 = $("input:checkbox[name='qyzt']:checked").map(function(index,elem) {
        return $(elem).val();
    }).get().join(",");//企业状态
    var temp = {};
    temp.regions = dw_value1;
    temp.dataLevel = dw_value2;
    temp.cityRegion = dataBase.Login_map.REGION.substr(0,4);
    temp.taskId = $('#select_1').val();
    temp.industry = $('#select_2').val();
    temp.fillId = dataBase.Login_map.SOLE;
    temp.status = $('#qy_zhuantai').val();
    temp.writeStatus = $('#qy_tianbao').val();
    temp.pageSize = params.limit;
    temp.pageNumber = params.offset;
    return temp;
}

//操作format函数
function operating(value, row, index) {
    var html = ''
    if(row.zt_Chinese == '未提交' || row.zt_Chinese == '已驳回'){
        var tian = DateDiff(row.endTime,getNowFormatDate());
        if (tian  == "NaN" || tian == "" || tian == NaN) {
            html += '<a onclick="edit_task('+row.id+',\'update\','+row.year+','+row.status+',\''+ row.zt +'\',\''+row.companyId+'\',\''+ row.companyName +'\')">编辑</a>&nbsp;&nbsp;&nbsp;<a onclick="tijiao('+row.id+','+row.commit+')">提交</a>';
        } else {
            html += '<a onclick="edit_task('+row.id+',\'update\','+row.year+','+row.status+',\''+ row.zt +'\',\''+row.companyId+'\',\''+ row.companyName +'\')">编辑</a>&nbsp;&nbsp;&nbsp;<a onclick="tijiao('+row.id+','+row.commit+')">提交</a>'+
                '&nbsp;&nbsp;&nbsp;<a onclick="wei_yuanyin('+row.id+')">补充说明</a>&nbsp;&nbsp;&nbsp;<a onclick="wei_photo('+row.id+')">现场照片</a>';
        }
    }else{
        html = '<a onclick="edit_task('+row.id+',\'look\','+row.year+','+row.status+',\''+ row.zt +'\',\''+row.companyId+'\',\''+ row.companyName +'\')">查看</a>'
    }

    return html
}

//开始编辑任务
function edit_task(taskId,update,year,level,status,userId,userName){
	swal({
		title: "您确定要跳转页面审核企业(有可能您的浏览器不支持)？",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
	},
	function() {
		try {
			if ( level == "1" ) window.open("../../zp_qy/0101/b.html?userId="+userId+"&taskId="+taskId+"&status="+status+"&userName="+userName+"&year="+year+"&update="+update);
			else if ( level == "2" ) window.open("../../zp_qy/0102/bb.html?userId="+userId+"&taskId="+taskId+"&status="+status+"&userName="+userName+"&year="+year+"&update="+update);
			else if ( level == "3") window.open("../../zp_qy/0103/b.html?userId="+userId+"&taskId="+taskId+"&status="+status+"&userName="+userName+"&year="+year+"&update="+update);
			swal("操作成功！", "成功跳转", "success");
		} catch (e) {
			console.log(e);
			swal("操作失败！", "浏览器不支持", "error");
		}
	
	});
}

var jitiao_taskId=''
/**
 * 提交
 */
function tijiao(taskId,str){
    jitiao_taskId =taskId;
    tijiao_str = str;
    $("#dialog-chakan .modal-body").html("是否提交当前信息");
    $("#dialog-chakan").modal("show");
}

//真的提交啦
function sure_tijiao (){
    var data = ajax_async_t(BackstageIP+"taskDataFillChild/updateCompanyTaskStatus.do",{userId:userId,version:version,id:jitiao_taskId,dataType:dataTypeTj},"json");
    if ( data != "" && data != null && data != undefined ){
        $("#dialog-chakan").modal("hide");
        if (data.status == "success") {
            renwu();
            $("#dialog-tiaozhuan .modal-body").html("<span style='color:green'><b>提交成功！</b></span>");
            $("#dialog-tiaozhuan").modal("show");
        } else if ( data.status == "fail") {
            $("#dialog-tiaozhuan .modal-body").html("<span style='color:red'><b>"+data.error+"</b></span>");
            $("#dialog-tiaozhuan").modal("show");
        }
    }
}

//补充说明按钮s
var buchong_id ="";
function wei_yuanyin (id) {
    buchong_id=id;
    // $( "#dialog-yuanyin").dialog("open");
    // var data = ajax_async_t(BackstageIP+"taskDataFillChild/selectReason",{taskId:id},"json")
    // if( data != null && data != "" && data != undefined ) {
    // 	if(data.status == "success" ) {
    // 		$("#yunyin").val(data.data);
    // 	} else {
    // 		$("#yunyin").val("");
    // 	}
    // } else {
    // 	$("#yunyin").val("");
    // }

    $("#dialog-photo .modal-body").html("");
    // $("#dialog-photo").attr('title','上传说明照片');


    $("#dialog-photo").modal("show");
    window.setTimeout(function () {
        $("#dialog-photo  .modal-body").html(photo_html);
        Img_load('1',id,'bangfucuoshi',1,'reason');
        photo_select(id,'taskDataFillChild/selectReason',"taskDataFillChild/deleteReason");
    },200)

}

function renwu() {
    chaxun_2();
}

//查看图片
function photo_select (taskId,url,delUrl) {
//	$("#dialog-photo_select").dialog("open");
    var data = ajax_async_t(BackstageIP+url,{taskId:taskId},"json");
    if (data!= "" && data != undefined && data != null ) {
        if ( data.status == "success" ) {
            if(url.indexOf('Reason') != -1){
                if(data.data.length == 1 && (data.data[0].v1 == 'image')){
                    $('#cuoshi_img_load').css('display','none')
                    // $('#cuoshi_img_load').removeAttr('dasabled')
                }else{
                    $('#cuoshi_img_load').css('display','block')
                    // $("#dialog-photo").dialog("close");
                    $("#dialog-photo  .modal-body").html("");
                    // $("#dialog-photo").attr('title','上传说明照片');


                    // $("#dialog-photo").dialog("open");
                    $("#dialog-photo  .modal-body").html(photo_html);
                    Img_load('1',taskId,'bangfucuoshi',1,'reason');
                    // $('#cuoshi_img_load').attr('dasabled',true)
                }
            }
            if(data.data.length == 1 && (data.data[0].v1 == 'text')){
                $("#dialog-photo").modal("hide");
                $("#dialog-yuanyin").modal("open");
                $("#yunyin").css('display','block')
                $("#yunyin").html(data.data[0].realUrl)
            }else {
                //现有图片
                var tupian_html = "";
                $.each(data.data,function(i,item){
                    tupian_html += "<li id=\"pin_li_"+item.id+"\"><p class=\"imgWrap\"><a href=\"../gg/"+item.realUrl+"\" title=\"现场照片\" data-gallery=\"\"  target='_blank'>" +
                        "<img src=\"../gg/"+item.realUrl+"\" style=\"margin:0;vertical-align:baseline;width:130px;height:85px;\"></a></p>" +
                        "<div id=\"pin_del_"+item.id+"\" class=\"file-panel\" style=\"height: 0px;\"><span class=\"cancel\" onclick='pic_del("+item.id+",\""+url+"\",\""+ delUrl +"\","+taskId+");'>删除</span></div></li>";
                });

                $('#poht_list').html(tupian_html);//要先循环一遍加上html后 再循环一遍，添加事件
                $.each(data.data,function(i,item){
                    $("#pin_li_"+item.id).mouseenter(function(){
                        $("#pin_del_"+item.id).stop().animate({
                            height: 30
                        });
                    });
                    $("#pin_li_"+item.id).mouseleave(function(){
                        $("#pin_del_"+item.id).stop().animate({
                            height: 0
                        });
                    });
                });
            }
        } else {
            Img_load('1',taskId,'bangfucuoshi',1,'reason');
            $("#dialog-tiaozhuan").modal("show");
            $("#dialog-tiaozhuan .modal-body").html("<span style='color:red'><b>图片加载错误！</b></span>");
        }
    } else {
        $("#dialog-tiaozhuan").modal("show");
        $("##dialog-tiaozhuan .modal-body").html("<span style='color:red'><b>图片加载错误！</b></span>");
    }
}

//现场照片
var photo_taskId="";
function wei_photo (id) {
    photo_taskId = id;
    $("#dialog-photo  .modal-body").html("");
    // $("#dialog-photo").attr('title','上传现场照片');
    $("#dialog-photo").modal("show");
    window.setTimeout(function () {
        $("#dialog-photo  .modal-body").html(photo_html);
        Img_load('1',id,'bangfucuoshi',15,'photo');
        photo_select(id,"picture/selectPicture","picture/deletePicture");
    },200)
}

//删除照片
function pic_del(id,url,delUrl,taskId){
    var data = ajax_async_t(BackstageIP+delUrl,{id:id},"json");
    if ( data != "" && data != null && data != null ) {
        if(data.status == "success" ) {
            $("#dialog-tiaozhuan").modal("show");
            $("#dialog-tiaozhuan .modal-body").html("<span style='color:green'><b>删除成功！</b></span>");
            photo_select(taskId,url,delUrl);
        } else {
            $("#dialog-tiaozhuan").modal("show");
            $("#dialog-tiaozhuan .modal-body").html("<span style='color:red'><b>删除失败！</b></span>");
        }
    } else {
        $("#dialog-tiaozhuan").modal("show");
        $("#dialog-tiaozhuan .modal-body").html("<span style='color:red'><b>删除失败！</b></span>");
    }
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

//天数 ---火狐、ie支持
function  DateDiff (sDate1,sDate2){
    //结束时间
    var end_str = sDate1.replace(/-/g,"/");//一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。
    var end_date = new Date(end_str);//将字符串转化为时间
    //开始时间
    var sta_str = sDate2.replace(/-/g,"/");
    var sta_date = new Date(sta_str);
    var num = (end_date-sta_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数
    var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
    return days;
}

var photo_html = '<div id="cuoshi_img_load"><div class="page-container"><p>您可以尝试文件拖拽，使用QQ截屏工具，然后激活窗口后粘贴，或者点击添加图片按钮。支持：gif,jpg,jpeg,png,bmp。</p><div id="uploader" class="wu-example">'+
    '<div class="queueList"><div id="dndArea" class="placeholder"><div id="filePicker"></div><p class="textPrompt">或将照片拖到这里，单次最多可选15张，单张照片限5M，总共限45M</p></div>'+
    '</div><div class="statusBar" style="display:none;"><div class="progress"><span class="text">0%</span><span class="percentage"></span></div>'+
    '<div class="info"></div><div class="btns"><div id="filePicker2"></div><div class="uploadBtn">开始上传</div></div></div></div></div></div>'+
    '<div class=""><div class=""  id="yidi_pic_show"><div class="" id="qilegeguaile"><div class="lightBoxGallery"><div class="queueList filled">'+
    '<ul class="filelist" id="poht_list"></ul></div><div id="blueimp-gallery" class="blueimp-gallery"><div class="slides"></div>'+
    '<a class="play-pause"></a><ol class="indicator"></ol> </div></div></div></div></div>';

Array.prototype.contains = function ( needle ) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

/**
 * 导出全部用户
 */
function export_all (){
    window.location.href = BackstageIP+"/fillUser/exportFillUser?cityRegion="+dataBase.Login_map.REGION
}
