package com.gistone.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 解析调查模板表，根据参数返回json数据，用于生成表格
 * @author Administrator
 *
 */
@RestController
@RequestMapping
public class AnaTemplate {
	/**
	 * 调用解析模板，获取文件路径
	 * 接收调查表分类参数，返回所有分类的json格式表结构
	 * @param request
	 * @param response
	 * @throws IOException
	 */
//	@RequestMapping("getAnaTemplate_1.do")
//	public void getPOITemplate_1(HttpServletRequest request,HttpServletResponse response) throws IOException{
////		System.out.println(System.currentTimeMillis());
//		
//		
//		String TempType = request.getParameter("TempType");
//		String savePath = request.getServletContext().getRealPath("/")+ "ord_data/调查表模版.xlsx";
//		
//		JSONObject JSONVal = readExcelToObj(savePath, TempType);
//		
//		
//		response.getWriter().write(JSONVal.toString());
//	}
	//http://localhost:8082/polist/getAnaTemplate_1.do?TempType=附件p101_电力行业调查表
	
	/**  
	* 读取excel数据  
	* @param path  
	*/  
	private JSONObject readExcelToObj(String path, String TempType) {
		Workbook wb = null;
		try {
			//WorkbookFactory.create()自动判定excel版本，调用合适的对象进行初始化
			wb = WorkbookFactory.create(new File(path));
			return readExcel(wb, 0, 0, 0, TempType);
		} catch (InvalidFormatException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**  
	* 读取excel文件  
	* @param wb   
	* @param sheetIndex sheet页下标：从0开始  
	* @param startReadLine 开始读取的行:从0开始  
	* @param tailLine 去除最后读取的行  
	*/  
	private JSONObject readExcel(Workbook wb, int sheetIndex, int startReadLine, int tailLine, String TempType) {
		JSONObject JSONVal = new JSONObject();
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = null;
		int sheetMergeCount = sheet.getNumMergedRegions();//合并单元格的数量
		
		Map<String, Map> Temp_map = new HashMap();
		for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
			row = sheet.getRow(i);
			if(getCellValue(row.getCell(0)).equals(TempType)){
				Temp_map.put(getCellValue(row.getCell(0)), new HashMap());
			}
		}
		
		for(String key:Temp_map.keySet()){
			Map<String,String> Temp_2_map = new HashMap();
			for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
				row = sheet.getRow(i);
				if(getCellValue(row.getCell(0)).equals(key)){
					Temp_2_map.put(getCellValue(row.getCell(1)), getCellValue(row.getCell(0)));
				}
			}
			Temp_map.put(key, Temp_2_map);
		}
		
		JSONArray head = new JSONArray();
		Date start2 = new Date();
		int pp = 0;
		for(String key1:Temp_map.keySet()){
			Map<String,String> Temp_2_map = Temp_map.get(key1);
			int metTable_index = 1;
			for(String key:Temp_2_map.keySet()){
				head.add(key);
				JSONArray gridPanel = new JSONArray();
				JSONArray h_1 = new JSONArray();
				JSONArray h_2 = new JSONArray();
				JSONArray h_3 = new JSONArray();
				JSONArray h_4 = new JSONArray();
				//全局跨行，专用于基本的单元格
				int rowspan = 0;
				
				for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
					row = sheet.getRow(i);//从数据行开始，每行获取数据
					
					if(getCellValue(row.getCell(0)).equals(key1) && getCellValue(row.getCell(1)).equals(key) && getCellValue(row.getCell(15)).equals("1")){
						//3-6为合并部分
						for (int k = 0; k < sheetMergeCount; k++) {
							CellRangeAddress range = sheet.getMergedRegion(k);
							int firstColumn = range.getFirstColumn();//开始的行号
							int lastColumn = range.getLastColumn();//结束的行号
							int firstRow = range.getFirstRow();//开始的列号
							int lastRow = range.getLastRow();//结束的列号
							pp++;
							if(i >= firstRow && i <= lastRow){//当前行在合并单元格的开始行和结束行之间
								
								if(firstRow == lastRow){//开始行与结束行一致，说明这是一个跨列，在一行显示
									
									String v2 = getCellValue(row.getCell(2));//Etitle
									String v7 = getCellValue(row.getCell(7)).equals("无")? "" : "("+getCellValue(row.getCell(7)).trim()+")";//单位
									String v8 = getCellValue(row.getCell(8));//type
									String v9 = getCellValue(row.getCell(9));//Op
									String v10 = getCellValue(row.getCell(10));//Range_min
									String v11 = getCellValue(row.getCell(11));//Range_max
									String v12 = getCellValue(row.getCell(12));//Rquired
									String v13 = getCellValue(row.getCell(13));//Sector
									String v14 = getCellValue(row.getCell(14));//Subsector
									String v15 = getCellValue(row.getCell(15));//RealTemplate
									String v16 = getCellValue(row.getCell(16));//Select
									String v17 = getCellValue(row.getCell(17));//Update
									String v18 = getCellValue(row.getCell(18));
									
									if(firstColumn == 3){//开始跨列的列号等于3，是开始的第一级
										JSONObject d_1 = new JSONObject();
										d_1.put("title", getCellValue(row.getCell(3))+v7);
										d_1.put("field", v2);
										d_1.put("align", "center");
										d_1.put("valign", "middle");
										if(v8.equals("double")){
											d_1.put("sortable", true);
										}
										d_1.put("rowspan", rowspan);
										d_1.put("Op", v9);
										d_1.put("RealTemplate", v15);
										d_1.put("Select", v16);
										d_1.put("Update", v17);
										d_1.put("list", v18);
										d_1.put("level1", key);
										d_1.put("editable", getEditable(v2, getCellValue(row.getCell(3)), v8, v9, v10, v11, v12, metTable_index));
										h_1.add(d_1);
									}else if(firstColumn == 4){//开始跨列的列号等于4，是开始的第二级
										JSONObject d_2 = new JSONObject();
										d_2.put("title", getCellValue(row.getCell(4))+v7);
										d_2.put("field", v2);
										d_2.put("align", "center");
										d_2.put("valign", "middle");
										if(v8.equals("double")){
											d_2.put("sortable", true);
										}
										d_2.put("rowspan", rowspan);
										d_2.put("Op", v9);
										d_2.put("RealTemplate", v15);
										d_2.put("Select", v16);
										d_2.put("Update", v17);
										d_2.put("list", v18);
										d_2.put("level1", key);
										d_2.put("editable", getEditable(v2, getCellValue(row.getCell(4)), v8, v9, v10, v11, v12, metTable_index));
										h_2.add(d_2);
									}else if(firstColumn == 5){//开始跨列的列号等于5，是开始的第三级
										JSONObject d_3 = new JSONObject();
										d_3.put("title", getCellValue(row.getCell(5)).trim()+v7);
										d_3.put("field", v2);
										d_3.put("align", "center");
										d_3.put("valign", "middle");
										if(v8.equals("double")){
											d_3.put("sortable", true);
										}
										d_3.put("rowspan", rowspan);
										d_3.put("Op", v9);
										d_3.put("RealTemplate", v15);
										d_3.put("Select", v16);
										d_3.put("Update", v17);
										d_3.put("list", v18);
										d_3.put("level1", key);
										d_3.put("editable", getEditable(v2, getCellValue(row.getCell(5)), v8, v9, v10, v11, v12, metTable_index));
										h_3.add(d_3);
									}else{//第四级不用判断，第五级是单位，所以第四级为最后一级
										JSONObject d_4 = new JSONObject();
										d_4.put("title", getCellValue(row.getCell(6))+v7);
										d_4.put("field", v2);
										d_4.put("align", "center");
										d_4.put("valign", "middle");
										if(v8.equals("double")){
											d_4.put("sortable", true);
										}
										d_4.put("Op", v9);
										d_4.put("RealTemplate", v15);
										d_4.put("Select", v16);
										d_4.put("Update", v17);
										d_4.put("list", v18);
										d_4.put("level1", key);
										d_4.put("editable", getEditable(v2, getCellValue(row.getCell(6)), v8, v9, v10, v11, v12, metTable_index));
										h_4.add(d_4);
									}
									
								}
								
								if(firstColumn==lastColumn){//开始列与结束列一致，说明这是一个跨行，多行显示
									if(firstColumn == 3){//开始跨行的列号等于3，是开始的第一级
										
										if(i==firstRow){//只有当前行号等于跨行开始行号，才开始记录，否则不记录，为了跨行只记录一次
											JSONObject d_1 = new JSONObject();
											d_1.put("title", getCellValue(row.getCell(3)));
											d_1.put("colspan", (lastRow-firstRow)+1);
											d_1.put("align", "center");
											h_1.add(d_1);
										}
										
									}else if(firstColumn == 4){//开始跨行的列号等于4，是开始的第二级
										
										if(i==firstRow){//只有当前行号等于跨行开始行号，才开始记录，否则不记录，为了跨行只记录一次
											JSONObject d_2 = new JSONObject();
											d_2.put("title", getCellValue(row.getCell(4)));
											d_2.put("colspan", (lastRow-firstRow)+1);
											d_2.put("align", "center");
											h_2.add(d_2);
										}
										
									}else if(firstColumn == 5){//开始跨行的列号等于5，是开始的第三级
										
										if(i==firstRow){//只有当前行号等于跨行开始行号，才开始记录，否则不记录，为了跨行只记录一次
											JSONObject d_3 = new JSONObject();
											d_3.put("title", getCellValue(row.getCell(5)));
											d_3.put("colspan", (lastRow-firstRow)+1);
											d_3.put("align", "center");
											h_3.add(d_3);
										}
										
									}//第四级是最后一级，不可能出现跨行
								}
							}
						}
					}
				}
				
				gridPanel.add(h_1);
				gridPanel.add(h_2);
				gridPanel.add(h_3);
				gridPanel.add(h_4);
				
				
				JSONVal.put(key, rowcol(gridPanel));
				metTable_index++;
			}
		}
		System.out.println("处理成功，共用时 " + (new Date().getTime() - start2.getTime()) + " ms"+pp);
		JSONVal.put("head", head);
		return JSONVal;
	}
	
	
	/**
	 * 
	 * @param field 字段名称
	 * @param Etitle 字段名称
	 * @param Type 数据类型
	 * @param Range_min
	 * @param Range_max
	 * @param Rquired 1为必填，0非必填
	 * @param Op 下拉选项
	 * @return
	 */
	public JSONObject getEditable(String field, String Etitle, String Type, String Op, String Range_min, String Range_max, String Rquired, int metTable_index){
		
		JSONObject JSONVal = new JSONObject();
		
		
		
		if(Op.equals("text")){//文本框
			
			if(Type.equals("date")){
				JSONVal.put("title", Etitle);
				JSONVal.put("type", "text");
				JSONVal.put("field", field);
				JSONVal.put("emptytext", "请填写");
				if(Rquired.equals("1")){
					JSONVal.put("validate", "validate_3");
				}else{
					JSONVal.put("validate", "validate_3_1");
				}
				JSONVal.put("metTable", metTable_index);
				return JSONVal;
			}else if(Type.equals("double")){
				JSONVal.put("title", Etitle);
				JSONVal.put("type", "text");
				JSONVal.put("field", field);
				JSONVal.put("emptytext", "请填写");
				if(Range_max.equals("100")){
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_6_2");
					}else{
						JSONVal.put("validate", "validate_6_3");
					}
				}else if(Range_max.equals("180")){
					JSONVal.put("validate", "validate_6_4");
				}else if(Range_max.equals("60")){
					JSONVal.put("validate", "validate_6_5");
				}else{
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_5");
					}else{
						JSONVal.put("validate", "validate_5_1");
					}
				}
				JSONVal.put("metTable", metTable_index);
				return JSONVal;
			}else if(Type.equals("int")){
				JSONVal.put("title", Etitle);
				JSONVal.put("type", "text");
				JSONVal.put("field", field);
				JSONVal.put("emptytext", "请填写");
				JSONVal.put("validate", "validate_6_1");
				JSONVal.put("metTable", metTable_index);
			}else if(Type.equals("string")){
				JSONVal.put("title", Etitle);
				JSONVal.put("type", "text");
				JSONVal.put("field", field);
				JSONVal.put("emptytext", "请填写");
				if(Rquired.equals("1")){
					JSONVal.put("validate", "validate_1");
				}else{
					JSONVal.put("validate", "validate_1_1");
				}
				JSONVal.put("metTable", metTable_index);
			}
		}else if(Op.startsWith("list")){//下拉框
			JSONVal.put("title", Etitle);
			JSONVal.put("type", "select");
			JSONVal.put("emptytext", "请填写");
			JSONVal.put("noeditFormatter", field);
			JSONVal.put("source", Op);
			JSONVal.put("metTable", metTable_index);
			return JSONVal;
		}
		return JSONVal;
	}
	
	
	/**
	 * 对空值进行筛选，并根据已有行数重新定义跨行的行号
	 * @param gridPanel
	 * @return
	 */
	public JSONArray rowcol(JSONArray gridPanel){
		JSONArray val = new JSONArray();
		JSONArray jsonArray_1 = JSONArray.fromObject(gridPanel.get(0));
		JSONArray jsonArray_2 = JSONArray.fromObject(gridPanel.get(1));
		JSONArray jsonArray_3 = JSONArray.fromObject(gridPanel.get(2));
		JSONArray jsonArray_4 = JSONArray.fromObject(gridPanel.get(3));
		
		if(jsonArray_4.size()==0){//第四级为空
			if(jsonArray_3.size()==0){//第三级为空
				if(jsonArray_2.size()==0){//第二级为空，没有任何的跨行，删除第一级所有的跨行标识
					JSONArray x_1 = new JSONArray();
					for (int i = 0; i < jsonArray_1.size(); i++) {
						JSONObject jsonObject = (JSONObject) jsonArray_1.get(i);
						JSONObject jsonObject2 = jsonObject.discard("rowspan");
						x_1.add(jsonObject2);
					}
					val.add(x_1);
					
				}else{
					//第二级有内容
					JSONArray x_1 = new JSONArray();
					JSONArray x_2 = new JSONArray();
					//先将第二级的跨行标识删除
					for (int i = 0; i < jsonArray_2.size(); i++) {
						JSONObject jsonObject = (JSONObject) jsonArray_2.get(i);
						JSONObject jsonObject2 = jsonObject.discard("rowspan");
						x_2.add(jsonObject2);
					}
					//修改所有第一级有标识的对象，跨行为2
					for (int i = 0; i < jsonArray_1.size(); i++) {
						JSONObject jsonObject = (JSONObject) jsonArray_1.get(i);
						if(jsonObject.get("rowspan")!=null){
							jsonObject.put("rowspan", 2);
							x_1.add(jsonObject);
						}else{
							x_1.add(jsonObject);
						}
					}
					val.add(x_1);
					val.add(x_2);
				}
				
			}else{
				//第三级有内容
				JSONArray x_1 = new JSONArray();
				JSONArray x_2 = new JSONArray();
				JSONArray x_3 = new JSONArray();
				//先将第三级的跨行标识删除
				for (int i = 0; i < jsonArray_3.size(); i++) {
					JSONObject jsonObject = (JSONObject) jsonArray_3.get(i);
					JSONObject jsonObject2 = jsonObject.discard("rowspan");
					x_3.add(jsonObject2);
				}
				//修改所有第二级有标识的对象，跨行为2
				for (int i = 0; i < jsonArray_2.size(); i++) {
					JSONObject jsonObject = (JSONObject) jsonArray_2.get(i);
					if(jsonObject.get("rowspan")!=null){
						jsonObject.put("rowspan", 2);
						x_2.add(jsonObject);
					}else{
						x_2.add(jsonObject);
					}
				}
				//修改所有第一级有标识的对象，跨行为3
				for (int i = 0; i < jsonArray_1.size(); i++) {
					JSONObject jsonObject = (JSONObject) jsonArray_1.get(i);
					if(jsonObject.get("rowspan")!=null){
						jsonObject.put("rowspan", 3);
						x_1.add(jsonObject);
					}else{
						x_1.add(jsonObject);
					}
				}
				val.add(x_1);
				val.add(x_2);
				val.add(x_3);
			}
			
		}else{
			//四级全部有内容，逐层处理
			JSONArray x_1 = new JSONArray();
			JSONArray x_2 = new JSONArray();
			JSONArray x_3 = new JSONArray();
			JSONArray x_4 = new JSONArray();
			//先将第三级的跨行标识删除
			for (int i = 0; i < jsonArray_4.size(); i++) {
				JSONObject jsonObject = (JSONObject) jsonArray_4.get(i);
				JSONObject jsonObject2 = jsonObject.discard("rowspan");
				x_4.add(jsonObject2);
			}
			//修改所有第二级有标识的对象，跨行为2
			for (int i = 0; i < jsonArray_3.size(); i++) {
				JSONObject jsonObject = (JSONObject) jsonArray_3.get(i);
				if(jsonObject.get("rowspan")!=null){
					jsonObject.put("rowspan", 2);
					x_3.add(jsonObject);
				}else{
					x_3.add(jsonObject);
				}
			}
			//修改所有第二级有标识的对象，跨行为3
			for (int i = 0; i < jsonArray_2.size(); i++) {
				JSONObject jsonObject = (JSONObject) jsonArray_2.get(i);
				if(jsonObject.get("rowspan")!=null){
					jsonObject.put("rowspan", 3);
					x_2.add(jsonObject);
				}else{
					x_2.add(jsonObject);
				}
			}
			//修改所有第一级有标识的对象，跨行为4
			for (int i = 0; i < jsonArray_1.size(); i++) {
				JSONObject jsonObject = (JSONObject) jsonArray_1.get(i);
				if(jsonObject.get("rowspan")!=null){
					jsonObject.put("rowspan", 4);
					x_1.add(jsonObject);
				}else{
					x_1.add(jsonObject);
				}
			}
			val.add(x_1);
			val.add(x_2);
			val.add(x_3);
			val.add(x_4);
		}
		
		return val;
	}
	
	  
	/**   
	* 获取单元格的值   
	* @param cell   
	* @return   
	*/    
	public String getCellValue(Cell cell){
		if(cell == null) return "";
		switch (cell.getCellType()) {   //根据cell中的类型来输出数据  
	        case HSSFCell.CELL_TYPE_NUMERIC:
	        	return String.valueOf((int)cell.getNumericCellValue()).trim();
	        case HSSFCell.CELL_TYPE_STRING:
	        	return cell.getStringCellValue().trim();
	        case HSSFCell.CELL_TYPE_BOOLEAN:
	            return String.valueOf(cell.getBooleanCellValue()).trim();
	        case HSSFCell.CELL_TYPE_FORMULA:
	            return cell.getCellFormula().trim();
	        default:
	            return "";
		}
	}
	
}
