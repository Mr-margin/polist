package com.gistone.controller;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gistone.MyBatis.config.GetBySqlMapper;
import com.gistone.util.CaptchaUtil;
import com.gistone.util.Tool;


@RestController
@RequestMapping
public class Messages {
	@Autowired
	private GetBySqlMapper getBySqlMapper;
	/**
	 * 发布公告信息
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("saveStak.do")
	public void saveStak(HttpServletRequest request, HttpServletResponse response ) throws IOException {
		String z_user_id = request.getParameter("z_user_id");//发布的用户
		String[] f_user_id = request.getParameterValues("f_user");//发布给的用户
		String title = request.getParameter("title");//发布的标题
		String content = request.getParameter("content");//发布的内容
		Date date = new Date();
		SimpleDateFormat time=new SimpleDateFormat("yyyy-MM-dd"); 
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		try {
			for ( int i = 0 ; i<f_user_id.length ; i ++) {
				String  sql = " insert into POLIST_NOTICE (z_user_id,f_user_id,datetime,content,title,create_time) values"+
								" ('"+z_user_id+"','"+f_user_id[i]+"','"+time.format(date)+"','"+content+"','"+title+"',to_timestamp('"+sdf.format(date)+"','yyyy-mm-dd hh24:mi:ss.ff'))";
				List<Map> list =  this.getBySqlMapper.findRecords(sql);
			}
			response.getWriter().write("0");
		} catch (Exception e) {
			// TODO: handle exception
			response.getWriter().write("1");
		}
	}
	/**
	 * 查看公告信息
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("selectTask.do")
	public void selectTask (HttpServletRequest request,HttpServletResponse response ) throws IOException {
		
		String  type = request.getParameter("type");
		String user_id = request.getParameter("user_id");
		String sql = "";
		
		if ( "1".equals(type)){
			sql = "select DATETIME,\"CONTENT\",title,related_file,z_name,WMSYS.WM_CONCAT(f_name) from (select DATETIME,\"CONTENT\",title,related_file,Z_USER_ID,F_USER_ID,CREATE_TIME from  POLIST_NOTICE "+
				"  WHERE  Z_USER_ID='"+user_id+"' ) a LEFT JOIN (select name z_name,user_id from  USER_MANAGER_INFO) b "+
				" on a.z_USER_ID=b.user_id LEFT JOIN (select name f_name,user_id f from  USER_MANAGER_INFO) c on a.F_USER_ID=c.f  GROUP BY title,DATETIME,\"CONTENT\",z_name,related_file,CREATE_time order by create_time desc ";
		} else if ( "4".equals(type) || "6".equals(type) || "7".equals(type) || "8".equals(type) ) {
			sql = "select DATETIME,\"CONTENT\",title,related_file,z_name,zz_name,jurisdiction from (select DATETIME,\"CONTENT\",title,related_file,Z_USER_ID,F_USER_ID,CREATE_TIME from  POLIST_NOTICE WHERE "+
					" F_USER_ID='"+user_id+"' or Z_USER_ID='"+user_id+"' )a LEFT JOIN (select informant z_name,user_id from  USER_CITY_INFO)b  on a.z_USER_ID=b.user_id "+
					"LEFT JOIN ( select informant zz_name,user_id,jurisdiction from  USER_CITY_INFO )c on a.z_USER_ID= c.user_id GROUP BY title,DATETIME,\"CONTENT\",z_name,related_file,create_time,zz_name,jurisdiction ORDER BY CREATE_TIME DESC";
		}else {
			sql = "select DATETIME,\"CONTENT\",title,related_file,z_name,zz_name,jurisdiction from (select DATETIME,\"CONTENT\",title,related_file,Z_USER_ID,F_USER_ID,CREATE_TIME from  POLIST_NOTICE WHERE "+
					" F_USER_ID='"+user_id+"' or Z_USER_ID='"+user_id+"' )a LEFT JOIN (select name z_name,user_id from  USER_MANAGER_INFO)b  on a.z_USER_ID=b.user_id "+
					" LEFT JOIN ( select informant zz_name,user_id,jurisdiction from  USER_CITY_INFO )c on a.z_USER_ID= c.user_id GROUP BY title,DATETIME,\"CONTENT\",z_name,related_file,create_time,zz_name,jurisdiction ORDER BY CREATE_TIME DESC";
		}
		JSONArray json = new JSONArray ();
		try {
			List<Map> list = this.getBySqlMapper.findRecords(sql);
			for (int i = 0 ; i < list.size(); i ++ ) {
				JSONObject obj = new JSONObject ();
				if ( "".equals(list.get(i).get("Z_NAME")) || list.get(i).get("Z_NAME") == null ) {
					obj.put("z_name", "".equals(list.get(i).get("ZZ_NAME")) || list.get(i).get("ZZ_NAME") == null ? "" : list.get(i).get("JURISDICTION").toString()+":"+list.get(i).get("ZZ_NAME").toString());
				} else {
					obj.put("z_name", "".equals(list.get(i).get("Z_NAME")) || list.get(i).get("Z_NAME") == null ? "" : list.get(i).get("Z_NAME").toString());

				}
				obj.put("datetime", "".equals(list.get(i).get("DATETIME")) || list.get(i).get("DATETIME") == null ? "" : list.get(i).get("DATETIME").toString());
				obj.put("content", "".equals(list.get(i).get("CONTENT")) || list.get(i).get("CONTENT") == null ? "" : list.get(i).get("CONTENT").toString());
				obj.put("title", "".equals(list.get(i).get("TITLE")) || list.get(i).get("TITLE") == null ? "" : list.get(i).get("TITLE").toString());
				obj.put("related_file", "".equals(list.get(i).get("RELATED_FILE")) || list.get(i).get("RELATED_FILE") == null ? "" : list.get(i).get("RELATED_FILE").toString());
				json.add(obj);
			}
			response.getWriter().write(json.toString());
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			response.getWriter().write("0");
		}
		
	}

}
