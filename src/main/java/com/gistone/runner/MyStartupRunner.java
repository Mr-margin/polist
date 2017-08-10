package com.gistone.runner;

import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.gistone.MyBatis.config.GetBySqlMapper;
import com.gistone.controller.QuestTemplate;
import com.gistone.util.OverallSituation;
/**
 * 服务启动执行
 *
 * @author   
 * @myblog  
 * @create   
 */
@Component
@Order(value=1)
public class MyStartupRunner implements CommandLineRunner{
	
	@Autowired
	private GetBySqlMapper getBySqlMapper;
	
	@Autowired
	private QuestTemplate questTemplate;
	
	@Override
    public void run(String... args) throws Exception {
    	
		Date start1 = new Date();
//		FileUtils.readFileToString(file)
		//简单
		OverallSituation.Calculation_Template_p1 = this.questTemplate.getCalculation_Template1();
		OverallSituation.Update_Template_p1 = this.questTemplate.getUpdate_Template1();
		//中等
		OverallSituation.Calculation_Template_p2 = this.questTemplate.getCalculation_Template2();
		OverallSituation.Update_Template_p2 = this.questTemplate.getUpdate_Template2();
		//复杂
		OverallSituation.Calculation_Template_p3 = this.questTemplate.getCalculation_Template3();
		OverallSituation.Update_Template_p3 = this.questTemplate.getUpdate_Template3();
		
		
		//OverallSituation.Update_Template_h = this.questTemplate.getUpdateh_Template();
		
		System.out.println("获取文件........，共用时 " + (new Date().getTime() - start1.getTime())/1000 + " m");
		System.out.println("-------------Load Complete-----------");
		
	//	System.out.println(OverallSituation.Update_Template_h);
		
    }
	
}
