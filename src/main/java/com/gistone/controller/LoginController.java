package com.gistone.controller;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.Cookie;
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
public class LoginController {
	@Autowired
	private GetBySqlMapper getBySqlMapper;
	
	/**
	 * 用户登录
	 * @param request
	 * @param response
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping("getLogin_Controller.do")
	public void getLogin_Controler(HttpServletRequest request, HttpServletResponse response ) throws NoSuchAlgorithmException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String username = request.getParameter("username").trim();//用户名
		String password = request.getParameter("password").trim();//密码
		String ip = request.getParameter("ip");//ip
		String city = request.getParameter("city");//城市
		String city_or_all = request.getParameter("city_or_all");//城市还是总站
		Date date = new Date();
		String user_sql = "SELECT * FROM  POLIST_USER WHERE USER_NAME='"+username+"' AND STATE ='1'";
		JSONArray json = new JSONArray();
		JSONObject obj = new JSONObject();
		try {
			List<Map> Login_list = this.getBySqlMapper.findRecords(user_sql);
			if(Login_list.size()>0){
				Map Login_map = Login_list.get(0);
				if(Tool.md5(password).equals(Login_map.get("PASSWORD"))==true){//密码正确
					HttpSession session = request.getSession();
					
					if ( !"" .equals(city_or_all) ) {
						if(  "1".equals(Login_map.get("TYPE")) || "2".equals(Login_map.get("TYPE"))   || "6".equals(Login_map.get("TYPE"))) {
							obj.put("type", "110");
							response.getWriter().print(obj.toString());
							return ;//没有此用户
						}
					} 
					
					Login_map.remove("PASSWORD");
					SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
					String datetime = simpleDate.format(date);
					String insert_sql = "insert into POLIST_JOURNAL (user_id,datetime,ip,operation,CITY) values ('"+Login_map.get("SOLE")+"','"+datetime+"','"+ip+"','登录','"+city+"')";
					this.getBySqlMapper.insert(insert_sql);
					String cha_sql = "";
					if("5".equals(Login_map.get("TYPE"))){
						cha_sql = "select name,region,b.industry,data_level from  (select region,name,industry,data_level　from USER_ENTERPRICE_INFO where user_id='"+Login_map.get("SOLE")+"' )a"+
									" LEFT JOIN (select pkid,industry from POLIST_INDUSTRY)b on a.industry = b.pkid";  
					} else if("4".equals(Login_map.get("TYPE"))||"6".equals(Login_map.get("TYPE"))||"8".equals(Login_map.get("TYPE"))||"10".equals(Login_map.get("TYPE"))){
						cha_sql = "select *　from USER_CITY_INFO where user_id='"+Login_map.get("SOLE")+"' and status='1'";   
					} else {
						cha_sql = "select t1.*,T2.REGIONNAME from USER_MANAGER_INFO t1 join REGION_MAPPING t2 on T1.REGION=T2.REGIONID where user_id='"+Login_map.get("SOLE")+"'";
					}
					if (!"".equals(cha_sql)){
						List<Map> cha_list = this.getBySqlMapper.findRecords(cha_sql);
						if ( cha_list.size() > 0 ) {
							Map Message_map  = cha_list.get(0);
							session.setAttribute("Message_map", Message_map);//用户信息，行政区划单位
						}
					}
					
					//更新登录状态
					session.setAttribute("Login_map", Login_map);//用户信息，包括角色
					obj.put("type",Login_list.get(0).get("TYPE"));
					obj.put("userId", Login_list.get(0).get("SOLE"));
					json.add(obj);
					response.getWriter().print(obj.toString());//成功
				}else{
					obj.put("type","100");
					response.getWriter().print(obj.toString());//密码不正确
				}
			}else{
				obj.put("type","110");
				response.getWriter().print(obj.toString());//没有此用户
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}
	/**
	 * 取session
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("getLogin_message.do")
	public void getLogin_message(HttpServletRequest request,HttpServletResponse response) throws Exception{

		try {
			HttpSession session = request.getSession();
			JSONObject json = new JSONObject();
//			String sole = request.getParameter("userId");//用户id
			if(session.getAttribute("Login_map")!=null){//验证session不为空
				
				Map<String,String> Login_map = (Map)session.getAttribute("Login_map");//用户信息，包括角色
				Map<String,String> Message_map = (Map) session.getAttribute("Message_map");//行政区划单位
				
				JSONObject Login_map_json = new JSONObject();
				JSONObject Message_map_json = new JSONObject();
				for(String key : Login_map.keySet()){
					Login_map_json.put(key, Login_map.get(key));
				}
				if(session.getAttribute("Message_map")!=null){
					for (String key : Message_map.keySet()){
						Message_map_json.put(key, Message_map.get(key));
					}
					json .put("Message_map", Message_map_json);
				}
				
				json.put("Login_map", Login_map_json);
				response.getWriter().write(json.toString());
			}else{
				response.getWriter().print("0");//没有登录
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	
	}
	/**
	 * 退出
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	//销毁session
	@RequestMapping("login_out.do")
	public void login_out(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String sole = request.getParameter("userId");
		HttpSession session = request.getSession();
		try{
			session.invalidate();
			//更新登录状态
//			String  updata_sql = "update POLIST_USER set V2='' where SOLE ='"+sole+"'";
//			this.getBySqlMapper.update(updata_sql);
			response.getWriter().write("1");
		}catch (Exception e){
			response.getWriter().write("0");
		}
	}
	//获取验证码的方法
	@RequestMapping("img.do")
	@ResponseBody
	public void execute(HttpServletRequest request , HttpServletResponse response) throws Exception {  
       
		CaptchaUtil.outputCaptcha(request, response);
        
    }  
	/**
	 * 对比验证码
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("yzm.do")
	public void yzm(HttpServletRequest request , HttpServletResponse response) throws Exception {  
	       
		String zhi= request.getParameter("zhi");
		HttpSession session = request.getSession();//取session
		String randomString=session.getAttribute("randomString").toString();
		zhi = zhi.toUpperCase();
//		System.out.println(zhi+"----"+randomString);
		if(zhi.equals(randomString)){
			response.getWriter().write("1");
		}else{
			response.getWriter().write("0");
		}
    }  
	/**
	 * 动态菜单
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("menu.do")
	public void menu ( HttpServletRequest request,HttpServletResponse response) throws IOException {
		String level = request.getParameter("level");//几级菜单
		String name = request.getParameter("name");//上级菜单名称
		String city_or_all = request.getParameter("city_or_all");//城市还是总站
		String table = "POLIST_MODULE";//表名
		if ( !"".equals(city_or_all)) table = "POLIST_MODULE1";
		HttpSession session = request.getSession();
		JSONArray json = new JSONArray();
		if(session.getAttribute("Login_map")!=null){//验证session不为空
			
			Map<String,String> Login_map = (Map)session.getAttribute("Login_map");//用户信息，包括角色
			JSONObject Login_map_json = new JSONObject();
			String sql = "select * from "+table+" where USER_TYPE='"+Login_map.get("TYPE")+"'  and \"LEVEL\" ='"+level+"'order by pkid";
			List<Map> list = this.getBySqlMapper.findRecords(sql);
			for ( int i = 0; i < list.size(); i ++ ) {
				String cha_sql ="select * from "+table+" where USER_TYPE='"+Login_map.get("TYPE")+"' and \"LEVEL\" ='2' and M_F ='"+list.get(i).get("PKID")+"'  order by pkid";
				JSONObject obj = new JSONObject();
				obj.put("m_name", list.get(i).get("M_NAME").toString());
				obj.put("url", "".equals(list.get(i).get("URL")) || list.get(i).get("URL") == null ? "" : list.get(i).get("URL").toString());
				obj.put("level", "".equals(list.get(i).get("LEVEL")) || list.get(i).get("LEVEL") == null ? "" : list.get(i).get("LEVEL").toString());
				obj.put("m_f", "".equals(list.get(i).get("M_F")) || list.get(i).get("M_F") == null ? "" : list.get(i).get("M_F").toString());
				JSONArray l_json = new JSONArray();
				List <Map> cha_list = this.getBySqlMapper.findRecords(cha_sql);
				if( cha_list.size()>0){
					for ( int j =0 ;j <cha_list.size(); j++ ) {
						JSONObject l_obj = new JSONObject ();
						
						l_obj.put("m_name",cha_list.get(j).get("M_NAME").toString());
						l_obj.put("url", "".equals(cha_list.get(j).get("URL")) || cha_list.get(j).get("URL") == null ? "" : cha_list.get(j).get("URL").toString());
						l_obj.put("level", "".equals(cha_list.get(j).get("LEVEL")) || cha_list.get(j).get("LEVEL") == null ? "" : cha_list.get(j).get("LEVEL").toString());
						l_obj.put("m_f", "".equals(cha_list.get(j).get("M_F")) || cha_list.get(j).get("M_F") == null ? "" : cha_list.get(j).get("M_F").toString());
						l_json.add(l_obj);
					}
				}
				obj.put("level_xia", l_json);
				json.add(obj);
			}
			response.getWriter().write(json.toString());
		}else{
			response.getWriter().print("0");//没有登录
		}
	}
	/**
	 * 用户修改密码
	 * @param request
	 * @param response
	 * @throws NoSuchAlgorithmException 
	 * @throws IOException 
	 */
	@RequestMapping("updatePassword.do")
	public void updatePassword (HttpServletRequest request,HttpServletResponse response ) throws NoSuchAlgorithmException, IOException {
		
		String old_password = request.getParameter("old_password");//旧密码
		String new_password = request.getParameter("new_password");//新密码
		String u_id = request.getParameter("u_id");//用户sole
		String passord="";
		old_password = Tool.md5(old_password);
		
		HttpSession session = request.getSession();
		if(session.getAttribute("Login_map")!=null){//验证session不为空
			Map<String,String> Login_map = (Map)session.getAttribute("Login_map");
			String sql = "select * from POLIST_USER where SOLE='"+u_id+"'";
			List<Map> list = this.getBySqlMapper.findRecords(sql);
			if ( list.size() > 0 ) {
				passord = list.get(0).get("PASSWORD").toString();
				
			}
			if(old_password.equals(passord)){
				String  update = "update POLIST_USER set PASSWORD='"+Tool.md5(new_password)+"' where SOLE='"+u_id+"'";
				try {
					this.getBySqlMapper.update(update);
					response.getWriter().print("1");//修改成功
				} catch (Exception e) {
					// TODO: handle exception
					response.getWriter().print("2");//修改失败
				}
			} else {//原密码错误
				response.getWriter().print("3");
			}
		}else{
			response.getWriter().print("0");//没有登录
		}
	}
	/**
	 * 用户登录日志
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("login_jouranl.do")
	public void  login_jouranl(HttpServletRequest request ,HttpServletResponse response) throws IOException{
		String user_id = request.getParameter("user_id");
		String sql ="select datetime,ip,operation,city from (select * from  POLIST_JOURNAL where user_id='"+user_id+"' ORDER BY datetime DESC) where   ROWNUM <=3";
		List<Map> list = this.getBySqlMapper.findRecords(sql);
		JSONArray json = new JSONArray();
		if ( list.size() > 0 ) {
			for( int i = 0 ; i < list.size(); i ++ ) {
				JSONObject obj = new JSONObject ();
				obj.put("datetime", "".equals(list.get(i).get("DATETIME")) || list.get(i).get("DATETIME") == null ? "" : list.get(i).get("DATETIME").toString());
				obj.put("ip", "".equals(list.get(i).get("IP")) || list.get(i).get("IP") == null ? "" : list.get(i).get("IP").toString());
				obj.put("operation", "".equals(list.get(i).get("OPERATION")) || list.get(i).get("OPERATION") == null ? "" : list.get(i).get("OPERATION").toString());
				obj.put("city", "".equals(list.get(i).get("CITY")) || list.get(i).get("CITY") == null ? "" : list.get(i).get("CITY").toString());
				json.add(obj);
			}
		}
		response.getWriter().print(json.toString());
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 * @throws MessagingException 
	 */
	@RequestMapping("forgetPassword_Controller.do")
	public void forgetPassword_Controller(HttpServletRequest request, HttpServletResponse response) throws NoSuchAlgorithmException, IOException, MessagingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String email = request.getParameter("email").trim();//用户名
		String userType = request.getParameter("userType").trim();
		String fsql="";
		if(userType.equals("4")||userType.equals("6")){
			fsql="select USER_ID,INFORMANT,PHONE from USER_CITY_INFO where EMAIL = '"+email+"'AND STATUS ='1'";
		}else if(userType.equals("5")){
			fsql="select USER_ID,INFORMANT,PHONE from USER_ENTERPRICE_INFO where EMAIL = '"+email+"'AND STATUS ='1'";
		}
		
		List<Map> list1 = this.getBySqlMapper.findRecords(fsql);
		String auth_code="";
		String userid="";
		String informant="";
		if(list1.size()==1){
			Map userMessage=list1.get(0);
			userid=(String) userMessage.get("USER_ID");
			auth_code = CaptchaUtil.getRandomString();
			informant = (String) userMessage.get("INFORMANT");
			userid = (String) userMessage.get("USER_ID");
			request.getSession(true).setAttribute("yzm", auth_code);
			request.getSession(true).setAttribute("uid", userid);
			Properties props = new Properties();  
	        // 开启debug调试  
	        props.setProperty("mail.debug", "true");  
	        // 发送服务器需要身份验证  
	        props.setProperty("mail.smtp.auth", "true");  
	        // 设置邮件服务器主机名  
	        props.setProperty("mail.host", "smtp.163.com");  
	        // 发送邮件协议名称  
	        props.setProperty("mail.transport.protocol", "smtp");  
	        // 设置环境信息  
	        Session session = Session.getInstance(props);  
	        String nick="";    
	        try {    
	            nick=javax.mail.internet.MimeUtility.encodeText("大气清单");    
	        } catch (UnsupportedEncodingException e) {    
	            e.printStackTrace();    
	        } 
	        // 创建邮件对象  
	        Message msg = new MimeMessage(session);  
	        //设置发送日期    
	        msg.setSentDate(new Date());    
	        msg.setSubject("您的大气账号发起修改密码请求");  
	        // 设置邮件内容  
	        msg.setText("您的验证码："+auth_code);  
	        // 设置发件人  
	        msg.setFrom(new InternetAddress(nick+" <"+"18701476371@163.com"+">"));  
	        Transport transport = session.getTransport();  
	        // 连接邮件服务器  
	        transport.connect("18701476371@163.com", "333963rq");  
	        // 发送邮件  
	        transport.sendMessage(msg, new Address[] {new InternetAddress(email)});  
	        // 关闭连接  
	        transport.close();
	        response.getWriter().print("1");
		}else{
			response.getWriter().print("0");//没有此用户
		}
	
	}
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws IOException 
	 * @throws NoSuchAlgorithmException 
	 * @throws MessagingException 
	 */
	@RequestMapping("checkyzm_Controller")
	public void checkyzm_Controller(HttpServletRequest request, HttpServletResponse response) throws NoSuchAlgorithmException, IOException, MessagingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String yzm = request.getParameter("zhi").trim();//用户名
		HttpSession session = request.getSession();//取session
		String randomString=session.getAttribute("yzm").toString();
		if(yzm.toUpperCase().equals(randomString.toUpperCase())){
			response.getWriter().print("1");
		}else{
			response.getWriter().print("0");
		}
		
	}
	/**
	 * 关闭浏览器更新登录状态
	 * @param request
	 * @param response
	 */
	@RequestMapping("onclose")
	public void onclose (HttpServletRequest request, HttpServletResponse response ) {
		try {
//			String sole = request.getParameter("userId");
//			String  updata_sql = "update POLIST_USER set V2='' where SOLE ='"+sole+"'";
//			this.getBySqlMapper.update(updata_sql);
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	/**
	 * 用户修改密码
	 * @param request
	 * @param response
	 * @throws NoSuchAlgorithmException 
	 * @throws IOException 
	 */
	@RequestMapping("changePassword.do")
	public void changePassword (HttpServletRequest request,HttpServletResponse response ) throws NoSuchAlgorithmException, IOException {
		
		String new_password = request.getParameter("new_password");//新密码
		HttpSession session = request.getSession();//取session
		String u_id=session.getAttribute("uid").toString();
		
		//String  user_sql = "SELECT * FROM  POLIST_USER WHERE SOLE='"+u_id+"' AND STATE ='1'";
		String  update = "update POLIST_USER set PASSWORD='"+Tool.md5(new_password)+"' where SOLE='"+u_id+"'";
		try {
			this.getBySqlMapper.update(update);
			response.getWriter().print("1");//修改成功
		} catch (Exception e) {
			// TODO: handle exception
			response.getWriter().print("0");//修改失败
		}
	}
}

