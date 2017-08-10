package com.gistone.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gistone.util.OverallSituation;

/**
 * 解析调查模板表，根据参数返回json数据，用于生成表格
 * @author Administrator
 *
 */
@RestController
@RequestMapping
public class QuestTemplate {
	
	
	/**
	 * 获取计算用的表格模板-简单
	 * @return
	 */
	public JSONObject getCalculation_Template1(){
		Date start1 = new Date();
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/CalculationTemplate1.json");
		String sets=ReadFile(classFilePath);//获得json文件的内容
		System.out.println("读取简化版共用时(查看) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		System.out.println("生成简化版共用时(查看) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		return JSONVal;
	}
	/**
	 * 获取计算用的表格模板-中等
	 * @return
	 */
	public JSONObject getCalculation_Template2(){
		Date start1 = new Date();
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/CalculationTemplate2.json");
		String sets=ReadFile(classFilePath);//获得json文件的内容
		System.out.println("读取通用版共用时(查看) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		System.out.println("生成通用版共用时 （查看）" + (new Date().getTime() - start1.getTime())/1000 + " m");
		return JSONVal;
	}
	/**
	 * 获取计算用的表格模板-复杂
	 * @return
	 */
	public JSONObject getCalculation_Template3(){
		Date start1 = new Date();
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/CalculationTemplate3.json");
		String sets=ReadFile(classFilePath);//获得json文件的内容
		System.out.println("读取专用版共用时(查看) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		System.out.println("生成专用版共用时(查看) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		return JSONVal;
	}
	
	/**
	 * 获取修改用的表格模板-简单
	 * @return
	 */
	public JSONObject getUpdate_Template1(){
		Date start1 = new Date();
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/UpdateTemplate1.json");
		String sets=ReadFile(classFilePath);//获得json文件的内容
		System.out.println("读取简化版共用时(修改) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		System.out.println("生成专用版共用时(修改) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		return JSONVal;
	}
	/**
	 * 获取修改用的表格模板-中等
	 * @return
	 */
	public JSONObject getUpdate_Template2(){
		Date start1 = new Date();
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/UpdateTemplate2.json");
		String sets=ReadFile(classFilePath);//获得json文件的内容
		System.out.println("读取通用版共用时(修改) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		System.out.println("生成通用版共用时(修改) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		return JSONVal;
	}
	/**
	 * 获取修改用的表格模板-复杂
	 * @return
	 */
	public JSONObject getUpdate_Template3(){
		Date start1 = new Date();
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/UpdateTemplate3.json");
		String sets=ReadFile(classFilePath);//获得json文件的内容
		System.out.println("读取专用版共用时(修改) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		System.out.println("生成专用版共用时(修改) " + (new Date().getTime() - start1.getTime())/1000 + " m");
		return JSONVal;
	}
	
	/**
	 * 获取修改用的表格模板
	 * @return
	 */
	public JSONObject getUpdateh_Template(){
		String classFilePath = this.getClass().getResource("QuestTemplate.class").toString();
		classFilePath = (classFilePath.substring(5, classFilePath.indexOf("polist")+7)+"ord_data/hUpdateTemplate.json");
		System.out.println(classFilePath);
		String sets=ReadFile(classFilePath);//获得json文件的内容
		JSONObject JSONVal = JSONObject.fromObject(sets);//格式化成json对象
		return JSONVal;
	}
	/**
	 * 调用解析模板，获取文件路径
	 * 接收调查表分类参数，返回所有分类的json格式表结构
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getCalculationTemplate.do")
	public void getCalculationTemplate(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String level = request.getParameter("level");//用户级别
		String Subsector = request.getParameter("Subsector").trim();
		String type = request.getParameter("type").trim();
		System.out.println("11111111111111111111111");

		type="件"+type;
		JSONObject JSONVal = OverallSituation.Calculation_Template_p3;
		JSONObject retJSON = new JSONObject();
		Iterator it = JSONVal.keys();
		while(it.hasNext()){
			if(Subsector.equals(it.next().toString())){
				JSONObject Subsector_json = JSONVal.getJSONObject(Subsector);
				Iterator iterator = Subsector_json.keys();
				while(iterator.hasNext()){
					String key = iterator.next().toString();
					if(key.indexOf(type)>0){
						retJSON = Subsector_json.getJSONObject(key);
					}
				}
			}
		}
		response.getWriter().write(retJSON.toString());
	
//		if("1".equals(level)){
//			
//		} else if ( "2".equals(level) ) {
//			
//		} else if ("3".equals(level)){}
	}
	//http://localhost:8082/polist/getCalculationTemplate.do?Subsector=电力&type=p
	
	
	/**
	 * 调用解析模板，获取文件路径
	 * 接收调查表分类参数，返回所有分类的json格式表结构
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getUpdateTemplate.do")
	public void getUpdateTemplate(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String userType = request.getParameter("userType").trim();
		String type = request.getParameter("type").trim();
		type="件"+type;
		if(userType.equals("6")){
			JSONObject JSONVal = OverallSituation.Update_Template_h;
			JSONObject retJSON = new JSONObject();
			Iterator iterator = JSONVal.keys();
					while(iterator.hasNext()){
						String key = iterator.next().toString();
						if(key.indexOf(type)>0){
							retJSON = JSONVal.getJSONObject(key);
						}
					}
//			System.out.println("筛选数据........，共用时 " + (new Date().getTime() - start2.getTime())/1000 + " m");
			response.getWriter().write(retJSON.toString());
		}else{
			String Subsector = request.getParameter("Subsector").trim();
			
			String level = request.getParameter("level");
			if ( "1" .equals(level) ) {
				JSONObject JSONVal = OverallSituation.Update_Template_p1;
				JSONObject retJSON = new JSONObject();
				JSONObject Subsector_json = JSONVal.getJSONObject(Subsector);
				retJSON = Subsector_json.getJSONObject("附件simp1_规下企业调查表");
				response.getWriter().write(retJSON.toString());
			} else if ( "2" .equals(level) ) {
				JSONObject JSONVal = OverallSituation.Update_Template_p2;
				JSONObject retJSON = new JSONObject();
				JSONObject Subsector_json = JSONVal.getJSONObject(Subsector);
				retJSON = Subsector_json.getJSONObject("附件comp1_规上企业调查表");
				response.getWriter().write(retJSON.toString());
			} else {
				JSONObject JSONVal = OverallSituation.Update_Template_p3;
				JSONObject retJSON = new JSONObject();
				Iterator it = JSONVal.keys();
				while(it.hasNext()){
					if(Subsector.equals(it.next().toString())){
						JSONObject Subsector_json = JSONVal.getJSONObject(Subsector);
						Iterator iterator = Subsector_json.keys();
						while(iterator.hasNext()){
							String key = iterator.next().toString();
							if(key.indexOf(type)>0){
								retJSON = Subsector_json.getJSONObject(key);
							}
						}
					}
				}
				response.getWriter().write(retJSON.toString());
			}
			
		}
	}
	//http://localhost:8082/polist/getUpdateTemplate.do?Subsector=电力&type=p
	
	/**
	 * 调用解析模板，获取文件路径
	 * 接收调查表分类参数，返回所有分类的json格式表结构
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("QuestTemplateTOjson.do")
	public void QuestTemplateTOjson(HttpServletRequest request,HttpServletResponse response) throws IOException{
		/*String savePath1 = request.getServletContext().getRealPath("/")+ "ord_data/环保用户调查表模版.xlsx";
		JSONObject JSONVal_HU = readExcelToObj_HU(savePath1);
		String hujsonPath = request.getServletContext().getRealPath("/")+ "ord_data/hUpdateTemplate.json";
        File hufile = new File(hujsonPath);
        if(hufile.exists() && hufile.isFile()) hufile.delete();
        
        try {
        	writeToJson(hujsonPath,JSONVal_HU);
        	response.getWriter().write("环境修改文件生成完毕");
		} catch (Exception e) {
			response.getWriter().write("失败");
		}*/
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		
		String savePath = request.getServletContext().getRealPath("/")+ "ord_data/调查表模版.xlsx";
		for ( int i = 0 ; i < 3; i ++ ){
			JSONObject JSONVal_C = readExcelToObj_C(savePath,i);
			JSONObject JSONVal_U = readExcelToObj_U(savePath,i);
			String cjsonPath = request.getServletContext().getRealPath("/")+ "ord_data/CalculationTemplate"+(3-i)+".json";
			String ujsonPath = request.getServletContext().getRealPath("/")+ "ord_data/UpdateTemplate"+(3-i)+".json";
			File cfile = new File(cjsonPath);
	        if(cfile.exists() && cfile.isFile()) cfile.delete();
	        File ufile = new File(ujsonPath);
	        if(ufile.exists() && ufile.isFile()) ufile.delete();
	        try {
	        	writeToJson(cjsonPath,JSONVal_C);
	        	writeToJson(ujsonPath,JSONVal_U);
	        	response.getWriter().write("计算文件<<"+i+">>生成完毕<br>修改文件生成完毕");
//	        	response.getWriter().write("计算文件生成完毕<br>修改文件生成完毕");
			} catch (Exception e) {
				// TODO: handle exception
				response.getWriter().write("失败");
			}		}
		
	}

	
	public void writeToJson(String filePath,JSONObject object) throws IOException{
		File file = new File(filePath);
		char [] stack = new char[1024];
		int top=-1;

		String string = object.toString();

		StringBuffer sb = new StringBuffer();
		char [] charArray = string.toCharArray();
		for(int i=0;i<charArray.length;i++){
			char c= charArray[i];
			if ('{' == c || '[' == c) {  
				stack[++top] = c; 
				sb.append("\n"+charArray[i] + "\n");  
				for (int j = 0; j <= top; j++) {  
					sb.append("\t");  
				}  
				continue;  
			}
			if ((i + 1) <= (charArray.length - 1)) {  
				char d = charArray[i+1];  
				if ('}' == d || ']' == d) {  
					top--; 
					sb.append(charArray[i] + "\n");  
					for (int j = 0; j <= top; j++) {  
						sb.append("\t");  
					}  
					continue;  
				}  
			}  
			if (',' == c) {  
				sb.append(charArray[i] + "");  
				for (int j = 0; j <= top; j++) {  
					sb.append("");  
				}  
				continue;  
			}  
			sb.append(c);  
		}  

		Writer write = new FileWriter(file);  
		write.write(sb.toString());  
		write.flush();  
		write.close();  
	}
	
	/**  
	* 读取excel数据  
	* @param path  
	*/  
	private JSONObject readExcelToObj_U(String path,int num) {
		System.out.println(num);
		Workbook wb = null;
		try {
			//WorkbookFactory.create()自动判定excel版本，调用合适的对象进行初始化
			wb = WorkbookFactory.create(new File(path));
			return readExcel_U(wb, num, 1, 0);
		} catch (InvalidFormatException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	/**  
	* 读取excel数据  
	* @param path  
	*/  
	private JSONObject readExcelToObj_HU(String path) {
		Workbook wb = null;
		try {
			//WorkbookFactory.create()自动判定excel版本，调用合适的对象进行初始化
			wb = WorkbookFactory.create(new File(path));
			return readExcel_HU(wb, 0, 1, 0);
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
	private JSONObject readExcel_HU(Workbook wb,int sheetIndex, int startReadLine, int tailLine) {
		JSONObject JSONVal = new JSONObject();
		
		
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = null;
		int sheetMergeCount = sheet.getNumMergedRegions();//合并单元格的数量
			Map<String,Map> Temp_2_map = new HashMap();
			for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
				row = sheet.getRow(i);
				Temp_2_map.put(getCellValue(row.getCell(0)), new HashMap());
			}
			for(String key2:Temp_2_map.keySet()){
				Map<String,String> Temp_3_map = new HashMap();
				for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
					row = sheet.getRow(i);
					if(getCellValue(row.getCell(0)).equals(key2)){
						Temp_3_map.put(getCellValue(row.getCell(1)), getCellValue(row.getCell(0)));
					}
				}
				Temp_2_map.put(key2, Temp_3_map);
			}
			//循环第1层fileID，每一个fileID对应页面的一个请求，不同源的点面源的请求
			for(String fileID:Temp_2_map.keySet()){
				Map<String,String> Temp_3_map = Temp_2_map.get(fileID);
				JSONObject fileIDVal = new JSONObject();
				
				JSONArray head = new JSONArray();
				JSONArray title = new JSONArray();
				int metTable_index = 0;
				//循环第2层seetID
				for(String sheetID:Temp_3_map.keySet()){
					
					head.add(sheetID);//记录每个file下有多少个sheet，每个sheet对应前台一个页签
					JSONArray gridPanel = new JSONArray();//准备四个数组，分别对应可能出现的四行表头
					JSONArray h_1 = new JSONArray();
					JSONArray h_2 = new JSONArray();
					JSONArray h_3 = new JSONArray();
					JSONArray h_4 = new JSONArray();
					//全局跨行，专用于基本的单元格
					int rowspan = 0;
					
					for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
						row = sheet.getRow(i);//从数据行开始，每行获取数据
						if(getCellValue(row.getCell(0)).equals(fileID) && getCellValue(row.getCell(1)).equals(sheetID) && getCellValue(row.getCell(13)).equals("1")){
							//3-6为合并部分
							for (int k = 0; k < sheetMergeCount; k++) {
								CellRangeAddress range = sheet.getMergedRegion(k);
								int firstColumn = range.getFirstColumn();//开始的行号
								int lastColumn = range.getLastColumn();//结束的行号
								int firstRow = range.getFirstRow();//开始的列号
								int lastRow = range.getLastRow();//结束的列号
								
								if(i >= firstRow && i <= lastRow){//当前行在合并单元格的开始行和结束行之间
									if(firstRow == lastRow){//开始行与结束行一致，说明这是一个跨列，在一行显示
										
										String v2 = getCellValue(row.getCell(2));//Etitle
										String v7 = getCellValue(row.getCell(7)).equals("无")? "" : "("+getCellValue(row.getCell(7)).trim()+")";//单位
										String v8 = getCellValue(row.getCell(8));//type
										String v9 = getCellValue(row.getCell(9));//Op
										String v10 = getCellValue(row.getCell(10));//Range_min
										String v11 = getCellValue(row.getCell(11));//Range_max
										String v12 = getCellValue(row.getCell(12));//Rquired
										/*String v13 = getCellValue(row.getCell(13));//Sector
										String v14 = getCellValue(row.getCell(14));//Subsector
*/										String v15 = getCellValue(row.getCell(13));//RealTemplate
										String v16 = getCellValue(row.getCell(14));//Select
										String v17 = getCellValue(row.getCell(15));//Update
										String v18 = getCellValue(row.getCell(16));
										
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
											d_1.put("level1", sheetID);
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
											d_2.put("level1", sheetID);
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
											d_3.put("level1", sheetID);
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
											d_4.put("level1", sheetID);
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
					}//for ,结束数据行循环，证明一个sheet已经完成
					gridPanel.add(h_1);
					gridPanel.add(h_2);
					gridPanel.add(h_3);
					gridPanel.add(h_4);
					
					fileIDVal.put(sheetID, rowcol(gridPanel));
					metTable_index++;
				}//结束了sheet循环，说明一个fileID的
				fileIDVal.put("head", head);
			JSONVal.put(fileID, fileIDVal);
		}
		return JSONVal;
	}
	/**  
	* 读取excel文件  
	* @param wb   
	* @param sheetIndex sheet页下标：从0开始  
	* @param startReadLine 开始读取的行:从0开始  
	* @param tailLine 去除最后读取的行  
	*/  
	private JSONObject readExcel_U(Workbook wb,int sheetIndex, int startReadLine, int tailLine) {
		JSONObject JSONVal = new JSONObject();
		
		
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = null;
		int sheetMergeCount = sheet.getNumMergedRegions();//合并单元格的数量
		//获取所有的Subsector，共37个
		Map<String, Map> Temp_map = new HashMap();
		for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
			row = sheet.getRow(i);
			Temp_map.put(getCellValue(row.getCell(14)), new HashMap());
		}
		
		for(String key:Temp_map.keySet()){
			Map<String,Map> Temp_2_map = new HashMap();
			//为每个Subsector补充FileID
			for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
				row = sheet.getRow(i);
				if(getCellValue(row.getCell(14)).equals(key)){
					Temp_2_map.put(getCellValue(row.getCell(0)), new HashMap());
				}
			}
			Temp_map.put(key, Temp_2_map);
		}
		
		for(String key:Temp_map.keySet()){
			Map<String,Map> Temp_2_map = Temp_map.get(key);
			for(String key2:Temp_2_map.keySet()){
				Map<String,String> Temp_3_map = new HashMap();
				for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
					row = sheet.getRow(i);
					if(getCellValue(row.getCell(0)).equals(key2)){
						Temp_3_map.put(getCellValue(row.getCell(1)), getCellValue(row.getCell(0)));
					}
				}
				Temp_2_map.put(key2, Temp_3_map);
			}
		}
		
		
		//循环第一层Subsector
		for(String Subsector:Temp_map.keySet()){
			Map<String,Map> Temp_2_map = Temp_map.get(Subsector);
			JSONObject SubsectorVal = new JSONObject();
			
			//循环第二层fileID，每一个fileID对应页面的一个请求，不同源的点面源的请求
			for(String fileID:Temp_2_map.keySet()){
				Map<String,String> Temp_3_map = Temp_2_map.get(fileID);
				JSONObject fileIDVal = new JSONObject();
				
				JSONArray head = new JSONArray();
				JSONArray title = new JSONArray();
				int metTable_index = 0;
				//循环第三层seetID
				for(String sheetID:Temp_3_map.keySet()){
					
					head.add(sheetID);//记录每个file下有多少个sheet，每个sheet对应前台一个页签
					JSONArray gridPanel = new JSONArray();//准备四个数组，分别对应可能出现的四行表头
					JSONArray h_1 = new JSONArray();
					JSONArray h_2 = new JSONArray();
					JSONArray h_3 = new JSONArray();
					JSONArray h_4 = new JSONArray();
					//全局跨行，专用于基本的单元格
					int rowspan = 0;
					
					for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
						row = sheet.getRow(i);//从数据行开始，每行获取数据
						if(getCellValue(row.getCell(0)).equals(fileID) && getCellValue(row.getCell(1)).equals(sheetID) && getCellValue(row.getCell(14)).equals(Subsector) && getCellValue(row.getCell(15)).equals("1")){
							//3-6为合并部分
							for (int k = 0; k < sheetMergeCount; k++) {
								CellRangeAddress range = sheet.getMergedRegion(k);
								int firstColumn = range.getFirstColumn();//开始的行号
								int lastColumn = range.getLastColumn();//结束的行号
								int firstRow = range.getFirstRow();//开始的列号
								int lastRow = range.getLastRow();//结束的列号
								
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
											d_1.put("level1", sheetID);
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
											d_2.put("level1", sheetID);
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
											d_3.put("level1", sheetID);
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
											d_4.put("level1", sheetID);
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
					}//for ,结束数据行循环，证明一个sheet已经完成
					gridPanel.add(h_1);
					gridPanel.add(h_2);
					gridPanel.add(h_3);
					gridPanel.add(h_4);
					
					fileIDVal.put(sheetID, rowcol(gridPanel));
					metTable_index++;
				}//结束了sheet循环，说明一个fileID的
				fileIDVal.put("head", head);
				
				SubsectorVal.put(fileID, fileIDVal);
				
			}//结束了file循环，说明一个行业的结束
			JSONVal.put(Subsector, SubsectorVal);
		}
		return JSONVal;
	}
	

	/**  
	* 读取excel数据  
	* @param path  
	*/  
	private JSONObject readExcelToObj_C(String path,int num) {
		System.out.println(num);
		Workbook wb = null;
		try {
			//WorkbookFactory.create()自动判定excel版本，调用合适的对象进行初始化
			wb = WorkbookFactory.create(new File(path));
			return readExcel_C(wb, num, 1, 0);
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
	private JSONObject readExcel_C(Workbook wb,int sheetIndex, int startReadLine, int tailLine) {
		JSONObject JSONVal = new JSONObject();
		
		
		Sheet sheet = wb.getSheetAt(sheetIndex);
		Row row = null;
		int sheetMergeCount = sheet.getNumMergedRegions();//合并单元格的数量
		
		//获取所有的Subsector，共37个
		Map<String, Map> Temp_map = new HashMap();
		for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
			row = sheet.getRow(i);
			Temp_map.put(getCellValue(row.getCell(14)), new HashMap());
		}
		
		for(String key:Temp_map.keySet()){
			Map<String,Map> Temp_2_map = new HashMap();
			//为每个Subsector补充FileID
			for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
				row = sheet.getRow(i);
				if(getCellValue(row.getCell(14)).equals(key)){
					Temp_2_map.put(getCellValue(row.getCell(0)), new HashMap());
				}
			}
			Temp_map.put(key, Temp_2_map);
		}
		
		for(String key:Temp_map.keySet()){
			Map<String,Map> Temp_2_map = Temp_map.get(key);
			for(String key2:Temp_2_map.keySet()){
				Map<String,String> Temp_3_map = new HashMap();
				for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
					row = sheet.getRow(i);
					if(getCellValue(row.getCell(0)).equals(key2)){
						Temp_3_map.put(getCellValue(row.getCell(1)), getCellValue(row.getCell(0)));
					}
				}
				Temp_2_map.put(key2, Temp_3_map);
			}
		}
		
		
		//循环第一层Subsector
		for(String Subsector:Temp_map.keySet()){
			Map<String,Map> Temp_2_map = Temp_map.get(Subsector);
			JSONObject SubsectorVal = new JSONObject();
			
			//循环第二层fileID，每一个fileID对应页面的一个请求，不同源的点面源的请求
			for(String fileID:Temp_2_map.keySet()){
				Map<String,String> Temp_3_map = Temp_2_map.get(fileID);
				JSONObject fileIDVal = new JSONObject();
				
				JSONArray head = new JSONArray();
				JSONArray title = new JSONArray();
				int metTable_index = 0;
				//循环第三层seetID
				for(String sheetID:Temp_3_map.keySet()){
					
					head.add(sheetID);//记录每个file下有多少个sheet，每个sheet对应前台一个页签
					JSONArray gridPanel = new JSONArray();//准备四个数组，分别对应可能出现的四行表头
					JSONArray h_1 = new JSONArray();
					JSONArray h_2 = new JSONArray();
					JSONArray h_3 = new JSONArray();
					JSONArray h_4 = new JSONArray();
					//全局跨行，专用于基本的单元格
					int rowspan = 0;
					
					for(int i=startReadLine; i<sheet.getLastRowNum()-tailLine+1; i++) {
						row = sheet.getRow(i);//从数据行开始，每行获取数据
						if(getCellValue(row.getCell(0)).equals(fileID) && getCellValue(row.getCell(1)).equals(sheetID) && getCellValue(row.getCell(14)).equals(Subsector)){
							//3-6为合并部分
							for (int k = 0; k < sheetMergeCount; k++) {
								CellRangeAddress range = sheet.getMergedRegion(k);
								int firstColumn = range.getFirstColumn();//开始的行号
								int lastColumn = range.getLastColumn();//结束的行号
								int firstRow = range.getFirstRow();//开始的列号
								int lastRow = range.getLastRow();//结束的列号
								
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
											d_1.put("level1", sheetID);
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
											d_2.put("level1", sheetID);
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
											d_3.put("level1", sheetID);
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
											d_4.put("level1", sheetID);
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
					}//for ,结束数据行循环，证明一个sheet已经完成
					gridPanel.add(h_1);
					gridPanel.add(h_2);
					gridPanel.add(h_3);
					gridPanel.add(h_4);
					
					fileIDVal.put(sheetID, rowcol(gridPanel));
					metTable_index++;
				}//结束了sheet循环，说明一个fileID的
				fileIDVal.put("head", head);
				
				SubsectorVal.put(fileID, fileIDVal);
				
			}//结束了file循环，说明一个行业的结束
			JSONVal.put(Subsector, SubsectorVal);
		}
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
				if(Range_max.equals("100000000")){
					if(Range_min.equals("0")){
						if(Rquired.equals("1")){
							JSONVal.put("validate", "validate_5_3");
						}else{
							JSONVal.put("validate", "validate_5_3_1");
						}
					}else{
						if(Rquired.equals("1")){
							JSONVal.put("validate", "validate_5_6");
						}else{
							JSONVal.put("validate", "validate_5_6_1");
						}
					}
				}else if(Range_max.equals("14")){
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_5_4");
					}else{
						JSONVal.put("validate", "validate_5_4_1");
					}
				}else if(Range_max.equals("50")){
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_5_5");
					}else{
						JSONVal.put("validate", "validate_5_5_1");
					}
				}else if(Range_max.equals("8848.13")){
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_5_7");
					}else{
						JSONVal.put("validate", "validate_5_7_1");
					}
				}else if(Range_max.equals("100")){
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
				//JSONVal.put("validate", "validate_6_1");
				if(Range_max.equals("136")){
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_6_6");
					}else{
						JSONVal.put("validate", "validate_6_6_1");
					}
				}else if(Range_max.equals("60")){
					if(Rquired.equals("1")){JSONVal.put("validate", "validate_6_8");
					}else{
						JSONVal.put("validate", "validate_6_8_1");
					}
				}else if(Range_max.equals("2050")){
					if(Rquired.equals("1")){JSONVal.put("validate", "validate_6_1");
					}else{
						JSONVal.put("validate", "validate_6_1_1");
					}
				}else if(Range_max.equals("54")){
					if(Rquired.equals("1")){JSONVal.put("validate", "validate_6_7");
					}else{
						JSONVal.put("validate", "validate_6_7_1");
					}
				}else if(Range_max.equals("100000000")){
					if(Rquired.equals("1")){JSONVal.put("validate", "validate_6_9");
					}else{
						JSONVal.put("validate", "validate_6_9_1");
					}
				}else{
					if(Rquired.equals("1"))
					{JSONVal.put("validate", "validate_6_10");
					}else{
						JSONVal.put("validate", "validate_6_10_1");
					}
				}
				
				
				JSONVal.put("metTable", metTable_index);
				return JSONVal;
			}else if(Type.equals("string")){
				JSONVal.put("title", Etitle);
				JSONVal.put("type", "text");
				JSONVal.put("field", field);
				if(field.equals("tel")){
						JSONVal.put("validate", "validate_1_2");
				}else if(field.equals("mail")){
					JSONVal.put("validate", "validate_1_3");
				}else{
					if(Rquired.equals("1")){
						JSONVal.put("validate", "validate_1");
					}else{
						JSONVal.put("validate", "validate_1_1");
					}
				} 
				JSONVal.put("metTable", metTable_index);
				return JSONVal;
			}
		}else if(Op.equals("focus")){//不可改
			JSONVal.put("title", Etitle);
			JSONVal.put("type", "text");
			JSONVal.put("disabled","true");
			JSONVal.put("field", field);
			JSONVal.put("metTable", metTable_index);
			return JSONVal;
		}else if(Op.startsWith("list")){//下拉框
			JSONVal.put("title", Etitle);
			JSONVal.put("type", "select");
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
	
	
	
	public String ReadFile1(String path){
		File file = new File(path);
		BufferedReader reader = null;
		String laststr = "";
		try {
			//System.out.println("以行为单位读取文件内容，一次读一整行：");
			reader = new BufferedReader(new FileReader(file));
			String tempString = null;
			int line = 1;
			//一次读入一行，直到读入null为文件结束
			while ((tempString = reader.readLine()) != null) {
				//显示行号
//				System.out.println("line "+line+": "+tempString);
				laststr += tempString;
				line++;
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e1) {
					
				}
			}
		}
		System.out.println(laststr);
		return laststr;
	}
	public String ReadFile(String path){
		String jsonStr = "" ;
		try {
			jsonStr = FileUtils.readFileToString(new File(path));
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		System.out.println(jsonStr);
		return jsonStr;
	}
	
}
