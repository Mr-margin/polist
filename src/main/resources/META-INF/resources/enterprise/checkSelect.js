var level2_smallIndex = ["表p2011_烧结工序信息表","表es2011_钢铁行业信息表","表es4041_农药使用信息表","表s3011_保有量信息表","表ep2011_烧结工序信息表","表s2011_钢铁行业信息表","表es3011_保有量信息表","表s4041_农药使用信息表",
                         "表es3014_其他机动车信息表","表p9031_烟气脱硝信息表","表s3014_其他机动车信息表","表es3012_年均行驶里程信息表","表es7021_生物质开放燃烧信息表","表s3012_年均行驶里程信息表","表s7021_生物质开放燃烧信息表","表ep9031_烟气脱硝信息表"];
function CheckSelect(row, column){
//	console.log(row,column)
	var sheetName = column.Op;//要查询的字段名称：list-region
	var requestData = {};
	
	if(sheetName == "list-equipfueltype_3"){
		
		requestData.sheetName = "list-equipfueltype";
		requestData.level1 = column.level1;
		requestData.level2 = row.fueltype;
		
	}else if(sheetName == "list-equipfueltype_2"){
		
		requestData.sheetName = "list-equipfueltype";
		requestData.level1 = column.level1;
		
	}else if(sheetName == "list-equipproducttype_2"){//设备类型
		
		requestData.sheetName = "list-equipproducttype";
		requestData.level1 = column.level1;
		
	}else if(sheetName == "list-equipproducttype_3"){//产品类型
		requestData.sheetName = "list-equipproducttype";
		requestData.level1 = column.level1;
		requestData.level2 = row.equiptype;
		
		if(column.level1 == "表p6012_施工扬尘信息表"){
			requestData.level2 = row.constagetype;
		}
		
	}else if(sheetName == "list-stageequipproducttype_3"){
		requestData.sheetName = "list-stageequipproducttype";
		requestData.level1 = column.level1;
		requestData.level2 = row.stage;
	}else if(sheetName == "list-stageequipproducttype_4"){
		requestData.sheetName = "list-stageequipproducttype";
		requestData.level1 = column.level1;
		requestData.level2 = row.stage;
		requestData.level3 = row.equiptype;
	}else if(sheetName == "list-industrytype"){//行业类别
		requestData.sheetName = sheetName;
	}else if(sheetName == "list-contype"){//回收方式---油烟净化器类型
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-fueltype"){//燃料类型
		if(column.level1 == "表simp01_产品生产信息表" ) {
			requestData.sheetName = sheetName;
			requestData.level1 = column.level1;
		} else {
			if ( $.inArray(row.smallIndex, level2_smallIndex) != "-1" ) {
				requestData.sheetName = sheetName;
				requestData.level1 = column.level1;
			} else {
				requestData.sheetName = sheetName;
				requestData.level1 = column.level1;
				requestData.level2 = row.equiptype;
			}
		
		}
		
		
		
	}else if(sheetName == "list-dealtype"){//处理方式
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-etadust"){//污染控制技术
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-dctype"){//堆场类型
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-dcmat"){//堆场材料
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-etadcload"){//最严污染控制技术
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-etadcstable"){//最严污染控制技术
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-etaSO2name"){
		requestData.sheetName = sheetName;
	}else if(sheetName == "list-etaNOxname"){
		requestData.sheetName = sheetName;
	}else if(sheetName == "list-etaNOxxname"){
		requestData.sheetName = sheetName;
	}else if(sheetName == "list-etaPMname"){
		requestData.sheetName = sheetName;
	}else if(sheetName == "list-judge"){
		requestData.sheetName = sheetName;
	}else if(sheetName == "list-region_1"){
		requestData.sheetName = "list-region";
	}else if(sheetName == "list-region"){
		requestData.sheetName = "list-region";
	}else if(sheetName == "list-region_2"){
		requestData.sheetName = "list-region";
	}else if(sheetName == "list-region_3"){
		requestData.sheetName = "list-region";
	}else if(sheetName == "list-weightDiesel"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-ethanolRatio"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-standard"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-farmtype"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-equiptype"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-sindustrytype"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-stageequipproducttype_2"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-region"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}else if(sheetName == "list-countytype"){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if (sheetName == "list-intermitornot" ){
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-solventtype" ){//溶剂类型
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-solventstate" ){//溶剂性质
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-voc" ){//VOC治理技术
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-trans" ){//煤炭运输方式
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-yongtu" ){//锅炉用途
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-etaVOChsname" ){//VOC回收方式
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-etaVOCxhname" ){//VOC销毁方式
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} else if( sheetName == "list-zztype" ){//装载方式
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	}  else if( sheetName == "list-zzway" ){//操作方式
		requestData.sheetName = sheetName;
		requestData.level1 = column.level1;
	} 
	console.log(JSON.stringify(requestData))
	return requestData;
}