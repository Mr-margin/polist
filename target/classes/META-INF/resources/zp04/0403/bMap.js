jQuery.support.cors = true;
var map = new BMap.Map("map",{enableMapClick:false}); // 创建地图实例
map.setMaxZoom(19);
map.setMinZoom(5);
map.enableScrollWheelZoom(true);
//map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());

var mapType1 = new BMap.MapTypeControl({
	mapTypes : [ BMAP_NORMAL_MAP, BMAP_HYBRID_MAP ]
});
map.addControl(mapType1);

var point = new BMap.Point(116.404, 39.915);// 创建点坐标
map.centerAndZoom(point, 7);

var marker;
function getAttr(){
	var p = marker.getPosition();       //获取marker的位置
	alert("marker的位置是" + p.lng + "," + p.lat);   
}
function getBoundary(){       
	var bdary = new BMap.Boundary();
	bdary.get("河北省", function(rs){       //获取行政区域
		map.clearOverlays();        //清除地图覆盖物       
		var count = rs.boundaries.length; //行政区域的点有多少个
		if (count === 0) {
			alert('未能获取当前输入行政区域');
			return ;
		}
      	var pointArray = [];
		for (var i = 0; i < count; i++) {
			var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
			map.addOverlay(ply);  //添加覆盖物
			pointArray = pointArray.concat(ply.getPath());
		}    
		map.setViewport(pointArray);    //调整视野  
	});   
}
setTimeout(function(){
	getBoundary();
}, 10);

function addlabel() {
	var marker_2 = new BMap.Point(114.524852,38.048002);// 创建点坐标
	marker = new BMap.Marker(marker_2);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	//marker.enableDragging();//可拖动
	marker.disableDragging();//不可拖动
//	marker.addEventListener("click",getAttr);//marker点击事件
}