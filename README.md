各模块与文件结构说明

zp01:在线填报
	0101：电厂
	0102：化石燃烧
	
	9999:模板上传
	
zp0102: 

--------------------------

zp01：在线填报（数据格式诊断）、数据上传。（多用户）。对应数据输入层
	0101.html:企业用户填报详细页面
	0102.html:市级填报部门填报详细页面
	0102_?_d.html: 查看点源详细信息
	0102_?_m.html: 查看面源详细信息
	0102_?_l.html: 查看排放量详细信息
zp02：数据审核
	0201.html:化石燃料固定燃烧源-电力
	0202.html:化石燃料固定燃烧源-工业锅炉
	0203.html:化石燃料固定燃烧源-民用源
	02_3_01.html:移动源-机动车
zp03：数据诊断
	0301.html：数据诊断统一页面
zp04：清单管理（新建、复制、删除、耦合，生成模式）优先级配置
	0403：清单耦合
zp05：统计模块
zp06：用户管理与设置、首页等其他页面
	01home.html:系统首页
	0601.html:用户管理（账号发放）



home页权限说明：
	class="g c01"  g：国家级菜单。   c01：第一个一级菜单，c02：第二个一级菜单。
	id="menu_0"	   menu_0：国家级
