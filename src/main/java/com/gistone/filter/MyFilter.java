package com.gistone.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.gistone.util.OverallSituation;

/**
 * 使用注解标注过滤器
 * @WebFilter将一个实现了javax.servlet.Filter接口的类定义为过滤器
 * 属性filterName声明过滤器的名称,可选
 * 属性urlPatterns指定要过滤 的URL模式,也可使用属性value来声明.(指定要过滤的URL模式是必选属性)
 */
@WebFilter(filterName="myFilter",urlPatterns="/*")
public class MyFilter implements Filter {
	
	@Override
	public void destroy() {
//        System.out.println("过滤器销毁");
    }
	
	

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        
        
        try {
        	HttpServletRequest hrequest = (HttpServletRequest) request;
            HttpServletResponse hresponse = (HttpServletResponse) response;
            
            String url = hrequest.getServletPath();
        	chain.doFilter(request, response);
		} catch (Exception e) {
		}
        
        
        
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }
    
}
