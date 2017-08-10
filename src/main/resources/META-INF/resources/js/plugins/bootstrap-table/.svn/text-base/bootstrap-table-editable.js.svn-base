/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * extensions: https://github.com/vitalets/x-editable
 */

var reg=/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;

//text
function validate_1(v){
	if (!v) return '不能为空';
	if (v.length>50) return "内容太多了";
}

function validate_1_1(v){
	if (v.length>50) return "内容太多了";
}


//data
function validate_3(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if(!v.match(reg)) return '请按照YYYY-MM-DD格式填写';
}

function validate_3_1(v){
	if (v.length>10) return "内容太多了";
	if(!v.match(reg)) return '请按照YYYY-MM-DD格式填写';
}

//int
function validate_4(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
}

function validate_4_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
}


//dauble
function validate_5(v){
	if (!v) return '不能为空';
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	
}

function validate_5_1(v){
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
}
function validate_5_2(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
}
function validate_5_2_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
}
function validate_5_3(v){
	if (!v) return '不能为空';
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100000000) return '必须填写0到100000000之间';
}
function validate_5_3_1(v){
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100000000) return '必须填写0到100000000之间';
}
function validate_5_4(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 14) return '必须填写0到14之间';
}
function validate_5_4_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';;
	var age = parseFloat(v);
	if (age < 0||age > 14) return '必须填写0到14之间';
}
function validate_5_5_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < -51||age > 50) return '必须填写-51到50之间';
}
function validate_5_5(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < -51||age > 50) return '必须填写-51到50之间';
}
function validate_5_6(v){
	if (!v) return '不能为空';
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0.00001||age > 100000000) return '必须填写0.00001到100000000之间';
}
function validate_5_6_1(v){
	if (v.length>20) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0.00001||age > 100000000) return '必须填写0.00001到100000000之间';
}
function validate_5_7(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < -155||age > 8848.13) return '必须填写-155到8848.13之间';
}
function validate_5_7_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < -155||age > 8848.13) return '必须填写-155到8848.13之间';
}

//fanwei
function validate_6_1(v){
	if (!v) return '不能为空';
	if (v.length>4) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) return '不能填写小数';
	var age = parseInt(v);
	if (age < 1900|| age >2050 ) return '年份必须填写1900到2050之间';
}
function validate_6_1_1(v){
	if (v.length>4) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf(".") >= 0) return '不能填写小数';
	var age = parseInt(v);
	if (age < 1900|| age >2050 ) return '年份必须填写1900到2050之间';
}

function validate_6_2(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-") == 0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
}

function validate_6_3(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-") == 0) return '不能填写负数';
	if ((v+"").indexOf(".") >= 0) if (v.toString().split(".")[1].length > 5) return '小数不能超过五位';
	var age = parseFloat(v);
	if (age < 0||age > 100) return '必须填写0到100之间';
}

function validate_6_4(v){
	if (!v) return '不能为空';
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 180) return '必须填写0到180之间';
}

function validate_6_5(v){
	if (!v) return '不能为空';
	if (v.length>2) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 60) return '必须填写0到60之间';
}

function validate_6_6(v){
	if (!v) return '不能为空';
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 73||age > 136) return '必须填写中国境内经度73到136之间';
}
function validate_6_6_1(v){
	if (v.length>3) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 73||age > 136) return '必须填写中国境内经度73到136之间';
}
function validate_6_7(v){
	if (!v) return '不能为空';
	if (v.length>2) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 3||age > 54) return '必须填写中国境内纬度3到54之间';
}
function validate_6_7_1(v){
	if (v.length>2) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 3||age > 54) return '必须填写中国境内纬度3到54之间';
}

function validate_6_8_1(v){
	if (v.length>2) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 60) return '必须填写0到60之间';
}
function validate_6_8(v){
	if (!v) return '不能为空';
	if (v.length>2) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 60) return '必须填写0到60之间';
}
function validate_6_9(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 100000000) return '必须填写0到100000000之间';
}
function validate_6_9_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
	var age = parseInt(v);
	if (age < 0||age > 100000000) return '必须填写0到100000000之间';
}
function validate_6_10(v){
	if (!v) return '不能为空';
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
}
function validate_6_10_1(v){
	if (v.length>10) return "内容太多了";
	if (isNaN(v)) return '必须是数字';
	if ((v+"").indexOf("-")==0) return '不能填写负数';
	if (v.indexOf(".")>=0) return '不能有小数';
}

(function($) {

    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        editable: true,
        onEditableInit: function() {
            return false;
        },
        onEditableSave: function(field, row, oldValue, $el) {
            return false;
        },
        onEditableShown: function(field, row, $el, editable) {
            return false;
        },
        onEditableHidden: function(field, row, $el, reason) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'editable-init.bs.table': 'onEditableInit',
        'editable-save.bs.table': 'onEditableSave',
        'editable-shown.bs.table': 'onEditableShown',
        'editable-hidden.bs.table': 'onEditableHidden'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
        _initBody = BootstrapTable.prototype.initBody;

    BootstrapTable.prototype.initTable = function() {
        var that = this;
        _initTable.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function(i, column) {
            if (!column.editable) {
                return;
            }

            var editableOptions = {},
                editableDataMarkup = [],
                editableDataPrefix = 'editable-';

            var processDataOptions = function(key, value) {
                // Replace camel case with dashes.
                var dashKey = key.replace(/([A-Z])/g, function($1) {
                    return "-" + $1.toLowerCase();
                });
                if (dashKey.slice(0, editableDataPrefix.length) == editableDataPrefix) {
                    var dataKey = dashKey.replace(editableDataPrefix, 'data-');
                    editableOptions[dataKey] = value;
                }
            };

            $.each(that.options, processDataOptions);

            column.formatter = column.formatter || function(value, row, index) {
                return value;
            };
            column._formatter = column._formatter ? column._formatter : column.formatter;
            column.formatter = function(value, row, index) {
                var result = column._formatter ? column._formatter(value, row, index) : value;

                if(typeof result == "undefined"){
                	result = "";
                }
                
                $.each(column, processDataOptions);

                $.each(editableOptions, function(key, value) {
                    editableDataMarkup.push(' ' + key + '="' + value + '"');
                });

                var _dont_edit_formatter = false;
                if (column.editable.hasOwnProperty('noeditFormatter')) {
                	
                	
                	
                	column.editable.noeditFormatter = function (value, row, index) {
                		if(typeof value == "undefined"){
                			value = "";
                        }
	                    return '<a style="display:none;" data-name="'+column.field+'" class="editable editable-click">' + value + '</a><span>'+value+'</span>';
	                }
                	
                	
                    _dont_edit_formatter = column.editable.noeditFormatter(value, row, index);
                    return _dont_edit_formatter;
                }

                if (_dont_edit_formatter === false) {
                    return ['<a style="display:none;" href="#"',
                        ' data-name="' + column.field + '"',
                        ' data-pk="' + row[that.options.idField] + '"',
                        ' data-value="' + result + '"',
                        editableDataMarkup.join(''),
                        '>' + '</a><span>'+result+'</span>'
                    ].join('');
                } else {
                    return _dont_edit_formatter;
                }
                
                
                

            };
        });
    };

    BootstrapTable.prototype.initBody = function() {
        var that = this;
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.editable) {
            return;
        }

        $.each(this.columns, function(i, column) {
            if (!column.editable) {
                return;
            }

            
            if (column.editable.hasOwnProperty('noeditFormatter')) {
            	column.editable.noeditFormatter = function (value, row, index) {
                    return '<a style="display:none;" data-name="'+column.field+'" class=\'editable editable-click\'>' + value + '</a><span style="display:none;">'+value+'</span>';
                }
            }
            if (column.editable.hasOwnProperty('source')) {
            	column.editable.source = function () {
                    var result;
                    var index = $(this).parent().parent().attr("data-index");
                    console.log(column);
                    var str = parseInt(column.editable.metTable)+1;
                    var row = $('#metTable'+str).bootstrapTable('getData')[index];
                    var requestData = CheckSelect(row, column);
                    var url = "";
                    if(column.field=="prov"){

                    }else if(column.field=="city"){
                    	if(typeof row.prov != "undefined"){
                    		requestData["level1"] = row.prov;
                    	}else{
                    		requestData["level1"] = "";
                    	}
                    }else if(column.field=="county"){
                    	if(typeof row.prov != "undefined"){
                    		requestData["level1"] = row.prov;
                    	}else{
                    		requestData["level1"] = "";
                    	}
                    	if(typeof row.city != "undefined"){
                    		requestData["level2"] = row.city;
                    	}else{
                    		requestData["level2"] = "";
                    	}
                    }else if(column.field=="fueltype"){
                    	if(typeof row.equiptype != "undefined"){
                    		requestData["level2"] = row.equiptype;
                    	}else{
                    		requestData["level2"] = "";
                    	}
                    }
                  
                    $.ajax({
                        url: BackstageIP+'dictionary/findDictionary',
                        async: false,
                        type: "POST",
                        data: requestData,
                        success: function (data, status) {
                            result = data;
                        },
                        error: function(data){
                        }
                    });
                    return result;
                }
            }
            if (column.editable.hasOwnProperty('validate')) {
            	if(column.editable.validate == "validate_1"){
            		column.editable.validate = validate_1;
            	}else if(column.editable.validate == "validate_1_1"){
            		column.editable.validate = validate_1_1;
            	}else if(column.editable.validate == "validate_3"){
            		column.editable.validate = validate_3;
            	}else if(column.editable.validate == "validate_3_1"){
            		column.editable.validate = validate_3_1;
            	}else if(column.editable.validate == "validate_5"){
            		column.editable.validate = validate_5;
            	}else if(column.editable.validate == "validate_5_1"){
            		column.editable.validate = validate_5_1;
            	}else if(column.editable.validate == "validate_5_2"){
            		column.editable.validate = validate_5_2;
            	}else if(column.editable.validate == "validate_5_2_1"){
            		column.editable.validate = validate_5_2_1;
            	}else if(column.editable.validate == "validate_5_3"){
            		column.editable.validate = validate_5_3;
            	}else if(column.editable.validate == "validate_5_3_1"){
            		column.editable.validate = validate_5_3_1;
            	}else if(column.editable.validate == "validate_5_4"){
            		column.editable.validate = validate_5_4;
            	}else if(column.editable.validate == "validate_5_4_1"){
            		column.editable.validate = validate_5_4_1;
            	}else if(column.editable.validate == "validate_5_5"){
            		column.editable.validate = validate_5_5;
            	}else if(column.editable.validate == "validate_5_5_1"){
            		column.editable.validate = validate_5_5_1;
            	}else if(column.editable.validate == "validate_5_6"){
            		column.editable.validate = validate_5_6;
            	}else if(column.editable.validate == "validate_5_6_1"){
            		column.editable.validate = validate_5_6_1;
            	}else if(column.editable.validate == "validate_5_7"){
            		column.editable.validate = validate_5_7;
            	}else if(column.editable.validate == "validate_5_7_1"){
            		column.editable.validate = validate_5_7_1;
            	}else if(column.editable.validate == "validate_6_1"){
            		column.editable.validate = validate_6_1;
            	}else if(column.editable.validate == "validate_6_1_1"){
            		column.editable.validate = validate_6_1_1;
            	}else if(column.editable.validate == "validate_6_2"){
            		column.editable.validate = validate_6_2;
            	}else if(column.editable.validate == "validate_6_3"){
            		column.editable.validate = validate_6_3;
            	}else if(column.editable.validate == "validate_6_4"){
            		column.editable.validate = validate_6_4;
            	}else if(column.editable.validate == "validate_6_5"){
            		column.editable.validate = validate_6_5;
            	}else if(column.editable.validate == "validate_6_6"){
            		column.editable.validate = validate_6_6;
            	}else if(column.editable.validate == "validate_6_6_1"){
            		column.editable.validate = validate_6_6_1;
            	}else if(column.editable.validate == "validate_6_7"){
            		column.editable.validate = validate_6_7;
            	}else if(column.editable.validate == "validate_6_7_1"){
            		column.editable.validate = validate_6_7_1;
            	}else if(column.editable.validate == "validate_6_8"){
            		column.editable.validate = validate_6_8;
            	}else if(column.editable.validate == "validate_6_8_1"){
            		column.editable.validate = validate_6_8_1;
            	}else if(column.editable.validate == "validate_6_9"){
            		column.editable.validate = validate_6_9;
            	}else if(column.editable.validate == "validate_6_9_1"){
            		column.editable.validate = validate_6_9_1;
            	}else if(column.editable.validate == "validate_6_10"){
            		column.editable.validate = validate_6_10;
            	}else if(column.editable.validate == "validate_6_10_1"){
            		column.editable.validate = validate_6_10_1;
            	}
            }

            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('save').on('save', function(e, params) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index],
                        oldValue = row[column.field];

                    $(this).data('value', params.submitValue);
                    row[column.field] = params.submitValue;
                    that.trigger('editable-save', column.field, row, oldValue, $(this));
                    that.resetFooter();
                    
                    
                    //新的值写到span里面，用于退出编辑时显示
                    $(this).nextAll('span').html(params.submitValue);
                    
//                    for(var vl = 0; vl<reValue.length;vl++){
//                    	if(reValue[vl].sheetName==lookat()){//如果数组对象中的sheet名称   等于   当前活动页签
//                    		reValue[vl].value[index].id = row.id;
//                    		eval("reValue[vl].value[index]."+column.field+"=\""+params.submitValue+"\"");
//                    	}
//                    }
                    
                    
                });
            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('shown').on('shown', function(e, editable) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];

                    that.trigger('editable-shown', column.field, row, $(this), editable);
                });
            that.$body.find('a[data-name="' + column.field + '"]').editable(column.editable)
                .off('hidden').on('hidden', function(e, reason) {
                    var data = that.getData(),
                        index = $(this).parents('tr[data-index]').data('index'),
                        row = data[index];

                    that.trigger('editable-hidden', column.field, row, $(this), reason);
                });
        });
        this.trigger('editable-init');
    };

})(jQuery);
