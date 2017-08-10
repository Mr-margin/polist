package com.gistone.util;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class LoginListener implements HttpSessionListener,ServletContextListener {
	
	private ServletContext application = null;
	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		System.out.println("context init");
        application = sce.getServletContext();
        Set<String> onlineUserSet = new HashSet<String>();
        application.setAttribute("onlineUserSet", onlineUserSet);

	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		System.out.println("context destory");

	}

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		// TODO Auto-generated method stub
		System.out.println("session create");

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		// TODO Auto-generated method stub
		HttpSession session = se.getSession();
        Set<String> onlineUserSet = (Set<String>)application.getAttribute("onlineUserSet");
        String username = (String)session.getAttribute("username");
        onlineUserSet.remove(username);
        application.setAttribute("onlineUserSet", onlineUserSet);
        onlineUserSet = (Set<String>)application.getAttribute("onlineUserSet");
        System.out.println(onlineUserSet.toString());
        System.out.println(username + "超时退出");
        System.out.println("session destory");

	}

}
